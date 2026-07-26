// Production server for cool-desk.com (Firebase App Hosting → Cloud Run).
//
// Two jobs:
//   1. /api/* — a thin, cached proxy in front of GitHub Releases, so clients
//      point at cool-desk.com instead of hardcoding github.com. The release
//      host can then change without reshipping installed apps.
//   2. everything else — the static SPA, served by serve-handler with the exact
//      same dist/serve.json config the `serve` CLI used before, so rewrites,
//      cache headers and SPA routing are unchanged.
//
// The GitHub API response is cached in-process for CACHE_TTL so a traffic spike
// can't burn the unauthenticated 60 req/h rate limit.

import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import handler from 'serve-handler';

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = 'dist';

const REPO = 'abhayraghuwanshi/cooldesk-extension';
const GH_API_LATEST = `https://api.github.com/repos/${REPO}/releases/latest`;
const RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`;
// Tauri's updater manifest — a fixed asset name, so this URL is stable.
const UPDATER_MANIFEST = `https://github.com/${REPO}/releases/latest/download/latest.json`;
const CHROME_STORE =
  'https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko';

const CACHE_TTL_MS = 5 * 60 * 1000;

// serve-handler needs the config as an object; `serve` used to read this file
// for us. Missing file (e.g. a partial build) just means defaults.
const staticConfig = (() => {
  try {
    return { public: PUBLIC_DIR, ...JSON.parse(readFileSync(`${PUBLIC_DIR}/serve.json`, 'utf8')) };
  } catch {
    return { public: PUBLIC_DIR };
  }
})();

// ---------------------------------------------------------------- release data

let releaseCache = { at: 0, data: null };

async function getLatestRelease() {
  if (releaseCache.data && Date.now() - releaseCache.at < CACHE_TTL_MS) {
    return releaseCache.data;
  }
  const resp = await fetch(GH_API_LATEST, {
    headers: { 'User-Agent': 'cool-desk.com', Accept: 'application/vnd.github+json' },
  });
  if (!resp.ok) throw new Error(`GitHub ${resp.status}`);
  const data = await resp.json();
  releaseCache = { at: Date.now(), data };
  return data;
}

// Asset name → platform. Names carry the version (CoolDesk_1.7.0_x64-setup.exe)
// so they can't be linked statically; we resolve them per request instead.
const PLATFORM_MATCHERS = {
  windows: [/x64-setup\.exe$/i, /\.msi$/i, /\.exe$/i],
  mac: [/aarch64\.dmg$/i, /\.dmg$/i, /\.app\.tar\.gz$/i],
  linux: [/\.AppImage$/i, /\.deb$/i, /\.rpm$/i],
};

function pickAsset(release, platform) {
  const assets = release?.assets ?? [];
  for (const matcher of PLATFORM_MATCHERS[platform] ?? []) {
    const hit = assets.find((a) => matcher.test(a.name));
    if (hit) return hit.browser_download_url;
  }
  return null;
}

function platformFrom(url, userAgent = '') {
  const explicit = (url.searchParams.get('platform') || '').toLowerCase();
  if (explicit) {
    if (['win', 'windows', 'win64', 'x64'].includes(explicit)) return 'windows';
    if (['mac', 'macos', 'osx', 'darwin'].includes(explicit)) return 'mac';
    if (explicit === 'linux') return 'linux';
  }
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows')) return 'windows';
  if (ua.includes('mac os') || ua.includes('macintosh')) return 'mac';
  if (ua.includes('linux')) return 'linux';
  return null;
}

// ------------------------------------------------------------------- responses

function redirect(res, location, status = 302) {
  res.writeHead(status, {
    Location: location,
    'Cache-Control': 'public, max-age=300',
    'Access-Control-Allow-Origin': '*',
  });
  res.end();
}

function json(res, body, status = 200, maxAge = 300) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': `public, max-age=${maxAge}`,
    'Access-Control-Allow-Origin': '*',
  });
  res.end(payload);
}

// ----------------------------------------------------------------- api routing

/** Returns true if the request was handled as an API route. */
async function handleApi(req, res, url) {
  const path = url.pathname.replace(/\/+$/, '') || '/';
  if (!path.startsWith('/api/')) return false;

  // The desktop updater's endpoint. Tauri fetches this, compares versions and
  // verifies the signature itself — we only proxy the manifest, cached, so the
  // shipped clients depend on cool-desk.com rather than on github.com.
  if (path === '/api/update') {
    try {
      const resp = await fetch(UPDATER_MANIFEST, { headers: { 'User-Agent': 'cool-desk.com' } });
      if (!resp.ok) throw new Error(`manifest ${resp.status}`);
      const manifest = await resp.json();
      json(res, manifest);
    } catch {
      // Never leave the updater without an answer — send it to the origin.
      redirect(res, UPDATER_MANIFEST);
    }
    return true;
  }

  // Machine-readable summary of the current release. Used by the site's
  // download panel and by clients that only need "what's the latest version".
  if (path === '/api/version') {
    try {
      const release = await getLatestRelease();
      json(res, {
        version: String(release.tag_name ?? '').replace(/^v/, ''),
        tag: release.tag_name ?? '',
        // GitHub's own field names, kept as aliases so anything already
        // parsing the raw release JSON can be repointed here unchanged.
        tag_name: release.tag_name ?? '',
        html_url: release.html_url ?? RELEASES_PAGE,
        name: release.name ?? '',
        notes: release.body ?? '',
        notes_url: release.html_url ?? RELEASES_PAGE,
        published_at: release.published_at ?? '',
        downloads: {
          windows: pickAsset(release, 'windows'),
          mac: pickAsset(release, 'mac'),
          linux: pickAsset(release, 'linux'),
        },
      });
    } catch {
      json(res, { error: 'upstream_unavailable', notes_url: RELEASES_PAGE }, 503, 30);
    }
    return true;
  }

  // Stable download links: /api/download/windows, /api/download?platform=mac,
  // or /api/download on its own (platform sniffed from the User-Agent).
  const download = path.match(/^\/api\/download(?:\/([a-z]+))?$/);
  if (download) {
    const platform = download[1] || platformFrom(url, req.headers['user-agent'] || '');
    if (!platform) return redirect(res, RELEASES_PAGE), true;
    try {
      const asset = pickAsset(await getLatestRelease(), platform);
      redirect(res, asset ?? RELEASES_PAGE);
    } catch {
      redirect(res, RELEASES_PAGE);
    }
    return true;
  }

  // The browser extension updates through the Chrome Web Store; this is the
  // human-facing install/update link, not an update manifest.
  if (path === '/api/extension') {
    redirect(res, CHROME_STORE);
    return true;
  }

  if (path === '/api/releases') {
    redirect(res, RELEASES_PAGE);
    return true;
  }

  json(res, { error: 'not_found' }, 404, 0);
  return true;
}

// ------------------------------------------------------------------------ main

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'cool-desk.com'}`);
    if (await handleApi(req, res, url)) return;
  } catch (err) {
    console.error('[server] api error', err);
    if (!res.headersSent) json(res, { error: 'internal' }, 500, 0);
    return;
  }
  return handler(req, res, staticConfig);
}).listen(PORT, '0.0.0.0', () => {
  console.log(`[server] cool-desk.com listening on :${PORT} (static: ${PUBLIC_DIR})`);
});

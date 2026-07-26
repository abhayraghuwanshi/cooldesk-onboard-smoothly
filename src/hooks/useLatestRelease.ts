import { useEffect, useState } from 'react';

const REPO = 'abhayraghuwanshi/cooldesk-extension';
// Our own cached proxy (server.mjs) — one GitHub call per 5 min for the whole
// site instead of one per visitor, which also keeps us off the unauthenticated
// rate limit. Falls back to the GitHub API directly, which is also the path
// taken under `vite dev`, where /api/* isn't served.
const RELEASE_PROXY = '/api/version';
const LATEST_RELEASE_API = `https://api.github.com/repos/${REPO}/releases/latest`;

export interface ReleaseInfo {
    /** Plain version, e.g. "1.3.0" (no leading "v"). */
    version: string;
    /** Direct download URL for the Windows installer (.exe). */
    windows: string;
    /** Direct download URL for the macOS installer (.dmg). */
    mac: string;
    /** Link to the release page on GitHub (tag page as fallback). */
    releaseUrl: string;
    /** Release title, e.g. "CoolDesk v1.6.0". Empty until the fetch resolves. */
    title: string;
    /** Markdown body of the release notes. Empty until the fetch resolves. */
    notes: string;
    /** ISO publish date. Empty until the fetch resolves. */
    publishedAt: string;
}

// Latest known release — used until the live fetch resolves, and as a fallback
// if GitHub is unreachable. Keep roughly current; the runtime fetch self-heals.
const FALLBACK: ReleaseInfo = {
    version: '1.3.0',
    windows: `https://github.com/${REPO}/releases/download/v1.3.0/CoolDesk_1.3.0_x64-setup.exe`,
    mac: `https://github.com/${REPO}/releases/download/v1.3.0/CoolDesk_1.3.0_aarch64.dmg`,
    releaseUrl: `https://github.com/${REPO}/releases/latest`,
    title: '',
    notes: '',
    publishedAt: '',
};

interface GitHubAsset {
    name: string;
    browser_download_url: string;
}

interface GitHubRelease {
    tag_name?: string;
    name?: string;
    body?: string;
    html_url?: string;
    published_at?: string;
    assets?: GitHubAsset[];
}

/** Extra fields /api/version adds on top of the GitHub release shape. */
interface ProxyRelease {
    notes?: string;
    downloads?: { windows?: string | null; mac?: string | null; linux?: string | null };
}

// The hook is used by several components on the same page (downloads panel,
// community panel) — share one request instead of hitting the API per mount.
let releaseFetch: Promise<ReleaseInfo> | null = null;

function parseRelease(data: GitHubRelease & Partial<ProxyRelease>): ReleaseInfo {
    const version = String(data.tag_name ?? '').replace(/^v/, '') || FALLBACK.version;
    // The proxy resolves the per-platform assets for us; the raw GitHub shape
    // needs them picked out of the asset list.
    const assets = data.assets ?? [];
    const windows =
        data.downloads?.windows ?? assets.find((a) => /x64-setup\.exe$/i.test(a.name))?.browser_download_url;
    const mac = data.downloads?.mac ?? assets.find((a) => /aarch64\.dmg$/i.test(a.name))?.browser_download_url;
    return {
        version,
        windows: windows ?? FALLBACK.windows,
        mac: mac ?? FALLBACK.mac,
        releaseUrl: data.html_url ?? FALLBACK.releaseUrl,
        title: data.name ?? '',
        notes: data.body ?? data.notes ?? '',
        publishedAt: data.published_at ?? '',
    };
}

function fetchJson(url: string, headers?: HeadersInit) {
    return fetch(url, headers ? { headers } : undefined).then((r) =>
        r.ok ? r.json() : Promise.reject(r.status),
    );
}

function fetchLatestRelease(): Promise<ReleaseInfo> {
    releaseFetch ??= fetchJson(RELEASE_PROXY)
        .catch(() => fetchJson(LATEST_RELEASE_API, { Accept: 'application/vnd.github+json' }))
        .then(parseRelease)
        .catch(() => FALLBACK);
    return releaseFetch;
}

/**
 * Reads the latest desktop release straight from GitHub Releases so the
 * displayed version, download links and release notes stay in sync with
 * what's published — no code change per release. Falls back to FALLBACK
 * if the fetch fails.
 */
export function useLatestRelease(): ReleaseInfo {
    const [release, setRelease] = useState<ReleaseInfo>(FALLBACK);

    useEffect(() => {
        let cancelled = false;
        fetchLatestRelease().then((info) => {
            if (!cancelled) setRelease(info);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    return release;
}

import { useEffect, useState } from 'react';

const REPO = 'abhayraghuwanshi/cooldesk-extension';
const LATEST_RELEASE_API = `https://api.github.com/repos/${REPO}/releases/latest`;

export interface ReleaseInfo {
    /** Plain version, e.g. "1.3.0" (no leading "v"). */
    version: string;
    /** Direct download URL for the Windows installer (.exe). */
    windows: string;
    /** Direct download URL for the macOS installer (.dmg). */
    mac: string;
}

// Latest known release — used until the live fetch resolves, and as a fallback
// if GitHub is unreachable. Keep roughly current; the runtime fetch self-heals.
const FALLBACK: ReleaseInfo = {
    version: '1.3.0',
    windows: `https://github.com/${REPO}/releases/download/v1.3.0/CoolDesk_1.3.0_x64-setup.exe`,
    mac: `https://github.com/${REPO}/releases/download/v1.3.0/CoolDesk_1.3.0_aarch64.dmg`,
};

interface GitHubAsset {
    name: string;
    browser_download_url: string;
}

/**
 * Reads the latest desktop release straight from GitHub Releases so the
 * displayed version and download links stay in sync with what's published —
 * no code change per release. Falls back to FALLBACK if the fetch fails.
 */
export function useLatestRelease(): ReleaseInfo {
    const [release, setRelease] = useState<ReleaseInfo>(FALLBACK);

    useEffect(() => {
        let cancelled = false;

        fetch(LATEST_RELEASE_API, { headers: { Accept: 'application/vnd.github+json' } })
            .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((data: { tag_name?: string; assets?: GitHubAsset[] }) => {
                if (cancelled) return;
                const version = String(data.tag_name ?? '').replace(/^v/, '') || FALLBACK.version;
                const assets = data.assets ?? [];
                const windows = assets.find((a) => /x64-setup\.exe$/i.test(a.name))?.browser_download_url;
                const mac = assets.find((a) => /aarch64\.dmg$/i.test(a.name))?.browser_download_url;
                setRelease({
                    version,
                    windows: windows ?? FALLBACK.windows,
                    mac: mac ?? FALLBACK.mac,
                });
            })
            .catch(() => {
                /* keep fallback */
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return release;
}

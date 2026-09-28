import type React from "react";
import { GITHUB_REPO, REDDIT_URL } from "@/config/site";
import { releases } from "@/config/releases";
import { useLatestRelease } from "@/hooks/useLatestRelease";
import { Bug, Lightbulb } from "lucide-react";


/**
 * Feature titles from a GitHub release body: the bold lead of each bullet under
 * "Added" / "Fixed" (e.g. "- **Linux desktop app** — ..."), skipping the section
 * headings and the Install table. Used only when GitHub is ahead of
 * config/releases.ts.
 */
function releaseHighlights(body: string, max = 3): { added: string[]; fixed: number } {
    const added: string[] = [];
    let fixed = 0;
    let section: 'added' | 'fixed' | null = null;
    for (const raw of body.split(/\r?\n/)) {
        const line = raw.trim();
        if (/^#{1,6}\s/.test(line)) {
            section = /added|new/i.test(line) ? 'added' : /fix/i.test(line) ? 'fixed' : null;
            continue;
        }
        if (!section || !/^[-*+]\s/.test(line)) continue;
        if (section === 'fixed') { fixed++; continue; }
        const title = line.match(/\*\*(.+?)\*\*/)?.[1] ?? line.replace(/^[-*+]\s+/, '').split(' — ')[0];
        if (added.length < max) added.push(title.replace(/[`*_]/g, '').trim());
    }
    return { added, fixed };
}

/** "2.0.14" vs "2.0.9" — numeric, so 14 > 9. */
function newerThan(a: string, b: string) {
    const pa = a.split('.').map(Number), pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) > (pb[i] ?? 0);
    }
    return false;
}

const shortDate = (iso: string) =>
    new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// Where to go for what. GitHub has Issues and Discussions (with an "Ideas"
// category) enabled on abhayraghuwanshi/cooldesk-extension.
const COMMUNITY = [
    {
        title: 'Report a bug',
        text: 'Something broken? Open an issue on GitHub.',
        action: 'Report',
        href: `${GITHUB_REPO}/issues/new`,
        icon: <Bug className="w-[18px] h-[18px] text-rose-300" strokeWidth={1.75} />,
    },
    {
        title: 'Suggest a feature',
        text: 'Share an idea in GitHub Discussions.',
        action: 'Suggest',
        href: `${GITHUB_REPO}/discussions/new?category=ideas`,
        icon: <Lightbulb className="w-[18px] h-[18px] text-amber-300" strokeWidth={1.75} />,
    },
    {
        title: 'Ask a question',
        text: 'Get help from the community on r/cooldesk.',
        action: 'Ask',
        href: REDDIT_URL,
        icon: <RedditIcon className="w-5 h-5 text-orange-400" />,
    },
];

/** `children` render under the latest release (the homepage puts "Which one do I need?" there). */
function StatsSlideshow({ children }: { children?: React.ReactNode }) {
    const release = useLatestRelease();
    // Prefer the curated notes behind /releases; fall back to the GitHub release
    // only when GitHub has a newer version than config/releases.ts knows about.
    const curated = releases[0];
    const useGitHub = !!release.publishedAt && newerThan(release.version, curated.version);
    const latest = useGitHub
        ? {
            version: release.version,
            date: shortDate(release.publishedAt),
            summary: '',
            ...(() => { const h = releaseHighlights(release.notes); return { added: h.added, fixed: h.fixed }; })(),
            href: release.releaseUrl,
            external: true,
        }
        : {
            version: curated.version,
            date: shortDate(curated.date),
            summary: curated.summary ?? '',
            // "Linux desktop app — .deb, .rpm…" → "Linux desktop app"
            added: (curated.added ?? []).slice(0, 3).map((a) => a.split(' — ')[0]),
            fixed: curated.fixed?.length ?? 0,
            href: '/releases',
            external: false,
        };

    return (
        <div className="h-full min-h-[280px] flex flex-col">
            {/* Section header — mirrors the Browser/Desktop headers on the right */}
            <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/15">
                <p className="label">Community</p>
            </div>

            {COMMUNITY.map((c) => (
                <a
                    key={c.title}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/15"
                >
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                        {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="heading-5">{c.title}</p>
                        <p className="caption mt-0.5">{c.text}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-txt-secondary group-hover:text-white transition-colors shrink-0">
                        {c.action}
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </a>
            ))}

            {/* Latest release — curated notes (config/releases.ts), linking to /releases */}
            <a
                href={latest.href}
                {...(latest.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/15"
            >
                <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                        <TagIcon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="heading-5">Latest release</p>
                        <p className="caption mt-0.5 font-mono">
                            v{latest.version}
                            <span className="text-white/30"> · {latest.date}</span>
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-txt-secondary group-hover:text-white transition-colors shrink-0">
                        All releases
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
                <div className="mt-3 ml-[52px]">
                    {latest.summary && <p className="text-sm text-white/80">{latest.summary}</p>}
                    {latest.added.length > 0 && (
                        <ul className="mt-2 space-y-1">
                            {latest.added.map((line) => (
                                <li key={line} className="caption leading-relaxed flex items-baseline gap-2">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/80 shrink-0">New</span>
                                    <span className="truncate">{line}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {latest.fixed > 0 && (
                        <p className="caption mt-1.5">+ {latest.fixed} fix{latest.fixed === 1 ? '' : 'es'}</p>
                    )}
                </div>
            </a>

            {children}

            {/* Closing note fills the column and stays honest about what we are */}
            <div className="flex-1 flex items-end px-5 py-5">
                <p className="caption leading-relaxed">
                    Built in the open, and we ship updates often.{' '}
                    <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="text-white/70 underline decoration-white/25 underline-offset-2 hover:text-white">
                        See the source on GitHub
                    </a>.
                </p>
            </div>
        </div>
    );
}

function TagIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
    );
}

function RedditIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.385 4.859-7.182 4.859-3.797 0-7.181-2.165-7.181-4.859 0-.179.014-.353.042-.524-.575-.281-1.011-.898-1.011-1.614 0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.491 1.207-.861 2.879-1.42 4.731-1.488l.899-4.228a.34.34 0 0 1 .409-.262l2.93.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm5.5 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
    );
}

export default StatsSlideshow;

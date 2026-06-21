import { GITHUB_REPO } from "@/config/site";

const REDDIT_URL = "https://www.reddit.com/r/cooldesk/";

function StatsSlideshow() {
    return (
        <div className="h-full min-h-[280px] flex flex-col">
            {/* Section header — mirrors the Browser/Desktop headers on the right */}
            <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/15">
                <p className="label">Community</p>
            </div>

            <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/15"
            >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                    <GitHubIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="heading-5">GitHub</p>
                    <p className="caption mt-0.5">Open source · 100+ downloads</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-txt-secondary group-hover:text-white transition-colors shrink-0">
                    View
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            </a>

            <a
                href={REDDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/15"
            >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                    <RedditIcon className="w-5 h-5 text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="heading-5">Reddit</p>
                    <p className="caption mt-0.5 font-mono">r/cooldesk</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-txt-secondary group-hover:text-white transition-colors shrink-0">
                    Join
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            </a>

            {/* Closing note fills the column and stays honest about what we are */}
            <div className="flex-1 flex items-end px-5 py-5">
                <p className="caption leading-relaxed">
                    Built in the open. Bugs, ideas and feature requests are welcome on
                    GitHub or the subreddit — we ship updates often.
                </p>
            </div>
        </div>
    );
}

function RedditIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.385 4.859-7.182 4.859-3.797 0-7.181-2.165-7.181-4.859 0-.179.014-.353.042-.524-.575-.281-1.011-.898-1.011-1.614 0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.491 1.207-.861 2.879-1.42 4.731-1.488l.899-4.228a.34.34 0 0 1 .409-.262l2.93.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm5.5 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
    );
}

function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

export default StatsSlideshow;

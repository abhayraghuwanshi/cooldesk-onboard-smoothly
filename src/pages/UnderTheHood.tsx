import {
    AgentToy,
    BridgeToy,
    CacheChart,
    DownloadToy,
    MacToy,
    NewTabToy,
    RankingToy,
    ScanToy,
    SearchToy,
    SyncToy,
    TimeToy,
} from '@/components/under-the-hood/Toys';
import Footer from '@/components/new/Footer';
import Navbar from '@/components/new/Navbar';
import SEO from '@/components/SEO';
import { GITHUB_REPO } from '@/config/site';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

/**
 * /under-the-hood — how CoolDesk works, for the curious, as a set of small
 * toys (components/under-the-hood/Toys.tsx) that run the real rules. Every
 * number and mechanism is from the code (cooldesk-extension repo), with the
 * file linked under each section so it can be re-checked when the code changes:
 *
 *   src-tauri/src/sidecar/server.rs     local server, 127.0.0.1 only, CORS allowlist
 *   manifest.json                       new tab override, MV3, CSP connect-src allowlist,
 *                                       sandboxed widget page
 *   pages/widget-sandbox.html           custom widgets: opaque origin, MessagePort store relay
 *   src/background/activity.js          browsing time, idle pause, sub-URL labels, ≤50 rows
 *                                       per flush, 30s read cache, circuit breaker 3 fails/1 min,
 *                                       bounded maps (LRU drops oldest 20%)
 *   src/background/bridge.js            push-tabs, jump/close via WS + 1s HTTP poll,
 *                                       reconnect backoff 1.5s → 60s
 *   src/services/jumpGuard.js           10s dedupe of jump deliveries
 *   src/services/searchService.js       fuzzyScore ladder (100/95/90/85/82/75…)
 *   src/services/itemRankingService.js  3-day half-life over 14 days, log-scaled,
 *                                       launches ×1.5, live +2, workspace top-3 1/.6/.4
 *   src-tauri/src/lib.rs                app scan cache 10s + single-flight lock
 *   src-tauri/src/matcher.rs            title-first app ↔ process matching
 *   src-tauri/src/categorize.rs         per-path category cache
 *   src-tauri/src/sidecar/sampler.rs    30s samples, focus/input/audio, decay 120s/300s,
 *                                       flush ~5 min, 90-day retention, 1 file/day
 *   src-tauri/src/folder_index.rs       linked folders, pruned dirs, mdimport nudge
 *   src-tauri/src/dir_watch.rs          non-recursive ref-counted watch, 300ms settle
 *   src-tauri/src/sidecar/local_servers.rs  project scan cached 60s
 *   src-tauri/src/sidecar/sync.rs       merge by id, last-write-wins, URL normalising
 *   src-tauri/src/dock/cgs.rs           private CGS/SkyLight Spaces API
 *   src-tauri/src/sidecar/mcp.rs        read-only MCP, stateless Streamable HTTP
 *   server.mjs (this repo)              /api release proxy, 5-min in-process cache
 */

/** Table of contents: drives the sidebar, the phone pills and each section's number. */
const TOC: { id: string; label: string; kicker: string }[] = [
    { id: 'bridge', label: 'The bridge', kicker: 'Extension ⇄ app' },
    { id: 'new-tab', label: 'The new tab', kicker: 'Extension' },
    { id: 'search', label: 'Search', kicker: 'Spotlight' },
    { id: 'ranking', label: 'Ranking', kicker: 'What comes first' },
    { id: 'apps', label: 'Apps', kicker: 'Apps' },
    { id: 'time', label: 'Time tracking', kicker: 'Your day' },
    { id: 'files', label: 'Files', kicker: 'Files' },
    { id: 'sync', label: 'Sync', kicker: 'Data' },
    { id: 'macos', label: 'The macOS hack', kicker: 'macOS' },
    { id: 'ai', label: 'The AI agent', kicker: 'AI' },
    { id: 'caching', label: 'Every cache', kicker: 'Cheat sheet' },
];

const TOC_IDS = TOC.map((t) => t.id);

/** The section currently being read: the last one whose top has passed the upper third of the screen. */
function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
        const update = () => {
            const line = window.innerHeight * 0.33;
            let current = ids[0];
            for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
            setActive(current);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [ids]);
    return active;
}

/** A section: number + kicker, a punchy title, a line or two, then its toy and source links. */
function Section({ id, title, lead, sources, children }: { id: string; title: string; lead: ReactNode; sources: string[]; children: ReactNode }) {
    const i = TOC.findIndex((t) => t.id === id);
    return (
        <section id={id} className="scroll-mt-24 py-14 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-sky-300/80">
                {String(i + 1).padStart(2, '0')} · {TOC[i]?.kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg [&_strong]:font-semibold [&_strong]:text-white">{lead}</p>
            <div className="mt-7">{children}</div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                {sources.map((p) => (
                    <a
                        key={p}
                        href={`${GITHUB_REPO}/blob/master/${p}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-white/35 transition-colors hover:text-white/80"
                    >
                        {p}
                        <ArrowUpRight className="h-3 w-3" />
                    </a>
                ))}
            </div>
        </section>
    );
}

/** The big picture: browser ⇄ desktop app ⇄ your OS, with the AI agent on the side. */
function ArchitectureDiagram() {
    const box = 'fill-white/[0.04] stroke-white/15';
    return (
        <figure className="mt-10 overflow-x-auto rounded-3xl border border-white/[0.07] bg-white/[0.015] p-4 md:p-8">
            <svg viewBox="0 0 900 360" className="mx-auto w-full min-w-[640px] max-w-[900px]" role="img" aria-labelledby="arch-title arch-desc">
                <title id="arch-title">CoolDesk architecture</title>
                <desc id="arch-desc">
                    The browser extension talks to the desktop app over a WebSocket on localhost. The desktop app is a Rust core with a web UI, and it
                    talks to the operating system. An AI agent can read CoolDesk data through a read-only MCP endpoint.
                </desc>
                <defs>
                    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M0 0 L10 5 L0 10 z" className="fill-white/50" />
                    </marker>
                </defs>

                {/* Browser */}
                <rect x="20" y="40" width="220" height="190" rx="18" className={box} />
                <text x="40" y="72" className="fill-white text-[15px] font-semibold">Your browser</text>
                <text x="40" y="94" className="fill-white/45 text-[12px]">Chrome · Edge · Brave</text>
                <rect x="40" y="112" width="180" height="96" rx="12" className="fill-sky-400/10 stroke-sky-300/30" />
                <text x="56" y="140" className="fill-sky-200 text-[13px] font-semibold">Extension</text>
                <text x="56" y="161" className="fill-white/55 text-[11.5px] font-mono">service worker</text>
                <text x="56" y="180" className="fill-white/55 text-[11.5px] font-mono">IndexedDB</text>
                <text x="56" y="199" className="fill-white/55 text-[11.5px] font-mono">new tab page</text>

                {/* Desktop app */}
                <rect x="340" y="20" width="290" height="230" rx="18" className={box} />
                <text x="360" y="52" className="fill-white text-[15px] font-semibold">Desktop app</text>
                <text x="360" y="74" className="fill-white/45 text-[12px]">Tauri 2</text>
                <rect x="360" y="92" width="120" height="136" rx="12" className="fill-violet-400/10 stroke-violet-300/30" />
                <text x="374" y="118" className="fill-violet-200 text-[13px] font-semibold">Web UI</text>
                <text x="374" y="140" className="fill-white/55 text-[11.5px] font-mono">React</text>
                <text x="374" y="159" className="fill-white/55 text-[11.5px] font-mono">Spotlight</text>
                <text x="374" y="178" className="fill-white/55 text-[11.5px] font-mono">spaces</text>
                <rect x="492" y="92" width="120" height="136" rx="12" className="fill-amber-400/10 stroke-amber-300/30" />
                <text x="506" y="118" className="fill-amber-200 text-[13px] font-semibold">Rust core</text>
                <text x="506" y="140" className="fill-white/55 text-[11.5px] font-mono">axum server</text>
                <text x="506" y="159" className="fill-white/55 text-[11.5px] font-mono">sampler</text>
                <text x="506" y="178" className="fill-white/55 text-[11.5px] font-mono">app scanner</text>
                <text x="506" y="197" className="fill-white/55 text-[11.5px] font-mono">JSON on disk</text>

                {/* OS */}
                <rect x="730" y="40" width="150" height="190" rx="18" className={box} />
                <text x="748" y="72" className="fill-white text-[15px] font-semibold">Your OS</text>
                <text x="748" y="100" className="fill-white/55 text-[11.5px] font-mono">windows + focus</text>
                <text x="748" y="120" className="fill-white/55 text-[11.5px] font-mono">installed apps</text>
                <text x="748" y="140" className="fill-white/55 text-[11.5px] font-mono">file system</text>
                <text x="748" y="160" className="fill-white/55 text-[11.5px] font-mono">audio sessions</text>
                <text x="748" y="180" className="fill-white/55 text-[11.5px] font-mono">Spaces (macOS)</text>

                {/* AI agent */}
                <rect x="340" y="290" width="290" height="56" rx="14" className="fill-emerald-400/[0.07] stroke-emerald-300/30" />
                <text x="360" y="316" className="fill-emerald-200 text-[13px] font-semibold">AI agent (Claude Code CLI)</text>
                <text x="360" y="335" className="fill-white/50 text-[11.5px] font-mono">reads via MCP · read-only</text>

                {/* Arrows */}
                <line x1="244" y1="135" x2="336" y2="135" className="stroke-white/50" strokeWidth="1.5" markerEnd="url(#arr)" markerStart="url(#arr)" />
                <text x="252" y="125" className="fill-white/60 text-[11px] font-mono">WebSocket</text>
                <text x="252" y="156" className="fill-white/40 text-[11px] font-mono">127.0.0.1</text>
                <line x1="244" y1="190" x2="336" y2="190" className="stroke-white/25" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arr)" />
                <text x="252" y="210" className="fill-white/40 text-[11px] font-mono">HTTP poll 1s</text>
                <line x1="634" y1="135" x2="726" y2="135" className="stroke-white/50" strokeWidth="1.5" markerEnd="url(#arr)" markerStart="url(#arr)" />
                <text x="646" y="125" className="fill-white/60 text-[11px] font-mono">native APIs</text>
                <line x1="552" y1="286" x2="552" y2="232" className="stroke-emerald-300/50" strokeWidth="1.5" markerEnd="url(#arr)" />
            </svg>
            <figcaption className="mt-4 text-center text-sm text-white/45">
                Your tabs, history, files and time tracking stay on your computer. Nothing in this picture talks to a CoolDesk server.
            </figcaption>
        </figure>
    );
}

export default function UnderTheHoodPage() {
    const active = useActiveSection(TOC_IDS);
    return (
        <main className="min-h-screen text-white scroll-smooth">
            <SEO
                title="Under the hood — How CoolDesk works | CoolDesk"
                description="How CoolDesk works, as toys you can play with: the local bridge between the extension and the Rust desktop app, real search scoring, ranking decay, time tracking, file watching, sync and every cache."
                canonical="https://cool-desk.com/under-the-hood"
            />
            <Navbar />

            <div className="container mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-40">
                <div className="max-w-4xl">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">For the curious</p>
                    <h1 className="mt-3 font-display text-5xl md:text-7xl font-bold tracking-tight">Under the hood</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
                        Don’t read about how CoolDesk works. Poke it. Every toy below runs the app’s real rules with its real numbers.
                    </p>
                    <ArchitectureDiagram />
                </div>

                {/* Phones and tablets: the contents as pills */}
                <nav aria-label="On this page" className="mt-12 flex flex-wrap gap-2 text-sm lg:hidden">
                    {TOC.map((t) => (
                        <a key={t.id} href={`#${t.id}`} className="rounded-full border border-white/10 px-3 py-1 text-white/60 transition-colors hover:border-white/25 hover:text-white">
                            {t.label}
                        </a>
                    ))}
                </nav>

                <div className="mt-8 lg:mt-16 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
                    {/* Desktop: a sticky table of contents that follows along */}
                    <aside className="hidden lg:block">
                        <nav aria-label="On this page" className="sticky top-28">
                            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Contents</p>
                            <ol className="mt-4 space-y-1 border-l border-white/10">
                                {TOC.map((t, i) => (
                                    <li key={t.id}>
                                        <a
                                            href={`#${t.id}`}
                                            aria-current={active === t.id ? 'location' : undefined}
                                            className={`-ml-px flex gap-2.5 border-l py-1.5 pl-4 text-sm transition-colors ${active === t.id ? 'border-sky-300 text-white' : 'border-transparent text-white/45 hover:text-white/80'}`}
                                        >
                                            <span className="font-mono text-xs leading-5 text-white/30">{String(i + 1).padStart(2, '0')}</span>
                                            {t.label}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </aside>

                    <div>
                        <Section
                            id="bridge"
                            title="One jump, three deliveries"
                            lead={
                                <>
                                    The app and the extension talk over a WebSocket on <strong>127.0.0.1</strong>. Chrome naps idle extensions, so there’s a
                                    once-a-second HTTP poll as backup. Belt, braces, and a gate so the browser doesn’t act three times.
                                </>
                            }
                            sources={['src/background/bridge.js', 'src/services/jumpGuard.js', 'src-tauri/src/sidecar/server.rs']}
                        >
                            <BridgeToy />
                        </Section>

                        <Section
                            id="new-tab"
                            title="The new tab has a guest list"
                            lead={
                                <>
                                    It tracks time only on the tab you’re looking at, pauses when you go idle, and keeps everything in IndexedDB. Custom
                                    widgets run in a sandbox with no browser APIs. And it can only call <strong>seven hosts</strong>.
                                </>
                            }
                            sources={['manifest.json', 'src/background/activity.js', 'pages/widget-sandbox.html']}
                        >
                            <NewTabToy />
                        </Section>

                        <Section
                            id="search"
                            title="Search is a ladder, not a black box"
                            lead="No embeddings, no magic. Eight rules from exact match down to “letters in order”. Type something and watch which rung each app lands on."
                            sources={['src/services/searchService.js']}
                        >
                            <SearchToy />
                        </Section>

                        <Section
                            id="ranking"
                            title="Yesterday matters more than last week"
                            lead={
                                <>
                                    Usage counts half as much every <strong>3 days</strong>, and it’s log-scaled so 5 hours vs 3 barely differs but 20 minutes
                                    vs none does. Drag the sliders.
                                </>
                            }
                            sources={['src/services/itemRankingService.js']}
                        >
                            <RankingToy />
                        </Section>

                        <Section
                            id="apps"
                            title="Ten asks, one scan"
                            lead="Opening Spotlight makes several parts of the UI ask for your apps at the same moment. A lock lets one of them scan; the rest wait and share the answer."
                            sources={['src-tauri/src/lib.rs', 'src-tauri/src/matcher.rs']}
                        >
                            <ScanToy />
                        </Section>

                        <Section
                            id="time"
                            title="Open isn’t used"
                            lead="Every 30 seconds the app checks three things: what’s focused, when you last touched the keyboard or mouse, and what’s making sound. Flip them."
                            sources={['src-tauri/src/sidecar/sampler.rs']}
                        >
                            <TimeToy />
                        </Section>

                        <Section
                            id="files"
                            title="A download is five events pretending to be one"
                            lead="The file manager watches the folder you’re in. It waits for things to go quiet for 300 ms before refreshing, so you see one update, not five."
                            sources={['src-tauri/src/dir_watch.rs', 'src-tauri/src/folder_index.rs']}
                        >
                            <DownloadToy />
                        </Section>

                        <Section
                            id="sync"
                            title="Boring sync, on purpose"
                            lead="Plain JSON on your disk, IndexedDB in the browser. Records merge by id, the newest edit wins, and URLs are normalised first so www and a trailing slash don’t make duplicates."
                            sources={['src-tauri/src/sidecar/sync.rs']}
                        >
                            <SyncToy />
                        </Section>

                        <Section
                            id="macos"
                            title="The hack Apple didn’t document"
                            lead="Apple’s public API can’t put a window over another app’s fullscreen Space. So, like Alfred, Raycast and yabai, CoolDesk uses the private CGS API in SkyLight.framework."
                            sources={['src-tauri/src/dock/cgs.rs']}
                        >
                            <MacToy />
                        </Section>

                        <Section
                            id="ai"
                            title="The agent can look, not touch"
                            lead="The AI agent reads your CoolDesk data through a read-only MCP endpoint. It can propose changes; only you can apply them."
                            sources={['src-tauri/src/sidecar/mcp.rs']}
                        >
                            <AgentToy />
                        </Section>

                        <Section
                            id="caching"
                            title="Every cache, from 300 ms to forever-ish"
                            lead="Each one exists for a reason. Usually that reason is “something was asking too often”."
                            sources={['src-tauri/src/lib.rs', 'src/background/activity.js', 'server.mjs']}
                        >
                            <CacheChart />
                        </Section>

                        {/* Read the code */}
                        <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 md:p-10">
                            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Still curious?</h2>
                            <p className="mt-3 max-w-xl text-white/55">CoolDesk is open source. Everything above is in the repo, comments and all.</p>
                            <a
                                href={GITHUB_REPO}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black transition-transform hover:-translate-y-px"
                            >
                                Read the code on GitHub
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

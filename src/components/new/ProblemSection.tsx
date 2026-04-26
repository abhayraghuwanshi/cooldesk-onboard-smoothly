import { Apple, LayoutGrid, Monitor } from 'lucide-react';

const windowsProblems = [
    {
        shortcut: 'Taskbar',
        pain: 'Every running app in one flat bar. No grouping by project. You scan, guess, click wrong.',
        tags: ['No project context', 'Mixed apps'],
    },
    {
        shortcut: 'Alt + Tab',
        pain: 'Cycles through every open window — VS Code, Chrome, Slack, all 3 Terminals. No way to filter by what you\'re working on.',
        tags: ['All windows mixed', 'No project filter'],
    },
    {
        shortcut: 'Virtual Desktop',
        pain: 'New desktop, new taskbar — but you still wire it up manually. Nothing knows these 4 windows belong to the same project.',
        tags: ['Manual setup', 'Still no project map'],
    },
];

const macProblems = [
    {
        shortcut: '⌘ Space  ·  Spotlight',
        sentiment: 'nice',
        pain: 'Great for launching apps. But once they\'re running, Spotlight steps aside. It can\'t switch you to the right window for a project.',
        tags: ['Launches apps', 'Not window-aware'],
    },
    {
        shortcut: 'Raycast',
        sentiment: 'nice',
        pain: 'Even better launcher. Smart, fast, extensible. Still the same gap: it shows you apps, not running windows organised by project.',
        tags: ['Great launcher', 'No running-window context'],
    },
    {
        shortcut: 'The missing piece',
        sentiment: 'gap',
        pain: '"I need VS Code window for Project A, not Project B" — neither Spotlight nor Raycast can make that distinction. Running apps are invisible to them.',
        tags: ['Which window?', 'Which project?'],
    },
];

function WindowsCard() {
    return (
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-600/[0.03] overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Monitor className="w-5 h-5 text-blue-400" />
                </div>
                <span className="font-semibold text-white/80 text-sm tracking-wide">Windows</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            </div>

            <div className="divide-y divide-white/5">
                {windowsProblems.map((item) => (
                    <div key={item.shortcut} className="px-6 py-5 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <kbd className="px-2 py-0.5 rounded bg-white/8 border border-white/10 text-[11px] font-mono font-semibold text-white/60">
                                {item.shortcut}
                            </kbd>
                        </div>
                        <p className="body-md text-white/65 leading-relaxed mb-3">
                            {item.pain}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                                <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/15 text-red-400/80 font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MacCard() {
    return (
        <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-600/[0.03] overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Apple className="w-5 h-5 text-purple-400" />
                </div>
                <span className="font-semibold text-white/80 text-sm tracking-wide">Mac</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            </div>

            <div className="divide-y divide-white/5">
                {macProblems.map((item) => (
                    <div key={item.shortcut} className="px-6 py-5 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <kbd className="px-2 py-0.5 rounded bg-white/8 border border-white/10 text-[11px] font-mono font-semibold text-white/60">
                                {item.shortcut}
                            </kbd>
                            {item.sentiment === 'nice' && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                                    Nice tool
                                </span>
                            )}
                            {item.sentiment === 'gap' && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
                                    The gap
                                </span>
                            )}
                        </div>
                        <p className="body-md text-white/65 leading-relaxed mb-3">
                            {item.pain}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${
                                        item.sentiment === 'nice'
                                            ? 'bg-emerald-500/8 border-emerald-500/15 text-emerald-400/70'
                                            : 'bg-red-500/10 border-red-500/15 text-red-400/80'
                                    }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ProblemSection() {
    return (
        <section className="relative py-24 overflow-hidden bg-black">
            {/* Red glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                        Sound familiar?
                    </div>
                    <h2 className="heading-1 text-white mb-4 leading-tight">
                        Your OS wasn't{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                            built for projects.
                        </span>
                    </h2>
                    <p className="body-lg text-white/50 max-w-2xl mx-auto">
                        The tools you already use are good. But none of them know which window belongs to which project — and that gap costs you time, every single day.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    <WindowsCard />
                    <MacCard />
                </div>

                {/* Bridge */}
                <div className="text-center mt-14 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/8">
                        <LayoutGrid className="w-4 h-4 text-blue-400 shrink-0" />
                        <p className="text-sm text-white/50">
                            CoolDesk adds the layer that's missing — running windows, organised by project, on every platform.
                        </p>
                    </div>
                    <svg className="w-5 h-5 text-white/20 animate-bounce mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </section>
    );
}

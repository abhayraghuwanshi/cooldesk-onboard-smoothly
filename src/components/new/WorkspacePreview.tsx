import { useState, useEffect } from 'react';

type ResultType = 'workspace' | 'tab' | 'app' | 'note';

type Item = {
    id: number;
    type: ResultType;
    name: string;
    meta: string;
    emoji?: string;
    favicon?: string | null;
};

const ALL_ITEMS: Item[] = [
    { id: 0, type: 'workspace', name: 'Frontend Dev', meta: '6 items · recent', emoji: '💻' },
    { id: 1, type: 'workspace', name: 'Backend API', meta: '5 items · 1h ago', emoji: '⚙️' },
    { id: 2, type: 'workspace', name: 'Research', meta: '4 items · 2h ago', emoji: '🔍' },
    { id: 3, type: 'tab', name: 'GitHub · cooldesk', meta: 'github.com', favicon: 'https://github.com/favicon.ico' },
    { id: 4, type: 'tab', name: 'localhost:3000', meta: 'Active · Chrome', favicon: null },
    { id: 5, type: 'tab', name: 'Figma — UI Kit', meta: 'figma.com', favicon: 'https://www.figma.com/favicon.ico' },
    { id: 6, type: 'app', name: 'VS Code', meta: 'Windows · Running', emoji: '🖥️' },
    { id: 7, type: 'app', name: 'Slack', meta: 'Windows · 3 unread', emoji: '💬' },
    { id: 9, type: 'app', name: 'Postman', meta: 'Windows · Running', emoji: '📮' },
    { id: 8, type: 'note', name: 'API integration plan', meta: '3m ago', emoji: '📝' },
];

const DEMO_QUERIES = ['frontend', 'vs code', 'github', 'notes'];

const TYPE_LABELS: Record<ResultType, string> = {
    workspace: 'Workspaces',
    tab: 'Open Tabs',
    app: 'Windows Apps',
    note: 'Notes',
};

const TYPE_BADGE: Record<ResultType, string> = {
    workspace: 'bg-violet-500/25 text-violet-300',
    tab: 'bg-sky-500/25 text-sky-300',
    app: 'bg-emerald-500/25 text-emerald-300',
    note: 'bg-amber-500/25 text-amber-300',
};

const GROUP_ORDER: ResultType[] = ['workspace', 'tab', 'app', 'note'];

function filterItems(q: string): Item[] {
    if (!q.trim()) return ALL_ITEMS.slice(0, 6);
    const lower = q.toLowerCase();
    return ALL_ITEMS.filter(item =>
        item.name.toLowerCase().includes(lower) ||
        item.meta.toLowerCase().includes(lower) ||
        item.type.toLowerCase().includes(lower)
    );
}

export default function WorkspacePreview() {
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState<number>(0);

    const items = filterItems(query);

    useEffect(() => {
        if (items.length > 0) setSelectedId(items[0].id);
    }, [query]);

    // Typing animation cycling through DEMO_QUERIES
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        let qi = 0;
        let ci = 0;
        let deleting = false;

        const tick = () => {
            const word = DEMO_QUERIES[qi];
            if (!deleting) {
                ci++;
                setQuery(word.slice(0, ci));
                if (ci === word.length) {
                    deleting = true;
                    timeout = setTimeout(tick, 1600);
                    return;
                }
                timeout = setTimeout(tick, 90);
            } else {
                ci--;
                setQuery(word.slice(0, ci));
                if (ci === 0) {
                    deleting = false;
                    qi = (qi + 1) % DEMO_QUERIES.length;
                    timeout = setTimeout(tick, 700);
                    return;
                }
                timeout = setTimeout(tick, 45);
            }
        };

        timeout = setTimeout(tick, 1200);
        return () => clearTimeout(timeout);
    }, []);

    const groups: Partial<Record<ResultType, Item[]>> = {};
    for (const item of items) {
        if (!groups[item.type]) groups[item.type] = [];
        groups[item.type]!.push(item);
    }

    return (
        <div className="w-full max-w-md">
            {/* Shortcut hint */}
            <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xs text-white/30">Press</span>
                <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-xs font-mono text-white/60">Alt+K</kbd>
                <span className="text-xs text-white/30">from anywhere</span>
            </div>

            {/* Spotlight panel */}
            <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/15 rounded-2xl overflow-hidden shadow-2xl shadow-black/70">

                {/* Search bar */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
                    <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <div className="flex-1 flex items-center text-sm font-medium">
                        {query ? (
                            <span className="text-white">{query}</span>
                        ) : (
                            <span className="text-white/25">Search workspaces, tabs, apps…</span>
                        )}
                        <span className="inline-block w-[2px] h-4 bg-blue-400 ml-0.5 animate-blink" />
                    </div>
                    <kbd className="hidden sm:block text-[10px] text-white/20 px-1.5 py-0.5 rounded bg-white/8 font-mono">esc</kbd>
                </div>

                {/* Results */}
                <div className="max-h-72 overflow-y-auto py-1.5">
                    {GROUP_ORDER.map(type => {
                        const group = groups[type];
                        if (!group) return null;
                        return (
                            <div key={type} className="px-1">
                                <div className="px-3 pt-2.5 pb-1 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                    {TYPE_LABELS[type]}
                                </div>
                                {group.map(item => (
                                    <button
                                        key={item.id}
                                        onMouseEnter={() => setSelectedId(item.id)}
                                        onClick={() => setSelectedId(item.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                                            selectedId === item.id
                                                ? 'bg-blue-600/25 border border-blue-500/30'
                                                : 'hover:bg-white/5 border border-transparent'
                                        }`}
                                    >
                                        {/* Icon */}
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm ${selectedId === item.id ? 'bg-white/15' : 'bg-white/8'}`}>
                                            {item.favicon !== undefined ? (
                                                item.favicon ? (
                                                    <img
                                                        src={item.favicon}
                                                        alt=""
                                                        className="w-4 h-4 rounded"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                    />
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                                )
                                            ) : (
                                                item.emoji
                                            )}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-sm font-medium truncate ${selectedId === item.id ? 'text-white' : 'text-white/75'}`}>
                                                {item.name}
                                            </div>
                                            <div className="text-[11px] text-white/35 truncate">{item.meta}</div>
                                        </div>

                                        {/* Type pill */}
                                        <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md shrink-0 ${TYPE_BADGE[item.type]}`}>
                                            {item.type}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        );
                    })}

                    {items.length === 0 && (
                        <div className="py-8 text-center text-sm text-white/25">No results for "{query}"</div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/8 bg-black/20">
                    <div className="flex items-center gap-3 text-[10px] text-white/25">
                        <span className="flex items-center gap-1.5">
                            <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono text-[9px]">↑↓</kbd> navigate
                        </span>
                        <span className="flex items-center gap-1.5">
                            <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono text-[9px]">↵</kbd> open
                        </span>
                        <span className="flex items-center gap-1.5">
                            <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono text-[9px]">tab</kbd> preview
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-white/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        CoolDesk
                    </div>
                </div>
            </div>
        </div>
    );
}

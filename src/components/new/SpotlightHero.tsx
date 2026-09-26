import {
    AppWindow, Bot, Code2, File, FileCode, Folder, FolderPlus, Globe, LayoutGrid, StickyNote, Terminal,
} from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './spotlight-demo.css';

/**
 * Homepage demo of the real CoolDesk Spotlight — the app's markup and styles
 * (see spotlight-demo.css) driven by mock data. Markup, badge labels, scope
 * badges and row hints follow cooldesk-extension/src/features/spotlight:
 * GlobalSpotlight.jsx (search box, footer, getBadgeLabel, SEARCH_SCOPES) and
 * parts/ResultItem.jsx (rows). Icons are lucide stand-ins for the app's
 * FontAwesome/favicon icons.
 *
 * It types a few searches on its own; once a visitor clicks in, it's a real
 * input over the mock data.
 */

// Same shape as the app's result items.
export interface Item {
    id: string;
    type: 'workspace' | 'tab' | 'app' | 'folder' | 'file' | 'note' | 'command';
    title: string;
    url?: string;
    description?: string;
    isRunning?: boolean;
    commandId?: string;
    category?: string;
    icon: typeof Globe;
    /** Quick Look content for files (PreviewPane in the app). */
    preview?: { language: 'ts' | 'md'; size: string; path: string; code: string };
}

const VITE_CONFIG = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev server for my-app
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});`;

const README = `# my-app

Onboarding flow for the new dashboard.

## Getting started
- npm install
- npm run dev → http://localhost:5173

## Notes
- Ship onboarding v2 before Friday`;

const ITEMS: Item[] = [
    { id: 'ws-my-app', type: 'workspace', title: 'my-app', description: '6 links · 2 apps · 3 notes', icon: LayoutGrid },
    { id: 'ws-landing', type: 'workspace', title: 'landing-site', description: '4 links · 1 app', icon: LayoutGrid },
    { id: 'tab-local', type: 'tab', title: 'my-app — Vite + React', url: 'http://localhost:5173', icon: Globe },
    { id: 'tab-pr', type: 'tab', title: 'Pull requests · my-app', url: 'https://github.com/acme/my-app/pulls', icon: Globe },
    { id: 'tab-figma', type: 'tab', title: 'Onboarding flow – Figma', url: 'https://figma.com/file/onboarding', icon: Globe },
    { id: 'app-code-1', type: 'app', title: 'Visual Studio Code — my-app', isRunning: true, icon: Code2 },
    { id: 'app-code-2', type: 'app', title: 'Visual Studio Code — api-server', isRunning: true, icon: Code2 },
    { id: 'app-figma', type: 'app', title: 'Figma', icon: AppWindow },
    { id: 'app-term', type: 'app', title: 'Terminal', isRunning: true, icon: Terminal },
    { id: 'dir-my-app', type: 'folder', title: 'my-app', description: '~/projects/my-app', icon: Folder },
    { id: 'file-vite', type: 'file', title: 'vite.config.ts', description: '~/projects/my-app', icon: FileCode, preview: { language: 'ts', size: '412 B', path: '~/projects/my-app/vite.config.ts', code: VITE_CONFIG } },
    { id: 'file-readme', type: 'file', title: 'README.md', description: '~/projects/my-app', icon: File, preview: { language: 'md', size: '236 B', path: '~/projects/my-app/README.md', code: README } },
    { id: 'note-ship', type: 'note', title: 'Ship onboarding v2 before Friday', description: 'my-app', icon: StickyNote },
];

// The app's recommended leader commands (useSlashCommands.js).
const COMMANDS: Item[] = [
    { id: 'cmd-new', type: 'command', commandId: '/new-workspace', title: 'New Workspace', description: 'Guided setup: name, pick folders, optionally scaffold .cooldesk/', category: 'Workspace', icon: FolderPlus },
    { id: 'cmd-agent', type: 'command', commandId: '/agent', title: 'Agent', description: 'Chat with Claude Code — search/add links, scaffold a shared .cooldesk/ workspace', category: 'AI', icon: Bot },
    { id: 'cmd-u', type: 'command', commandId: '/u', title: 'Search URLs', description: 'Scope search to tabs, history, bookmarks', category: 'Scope', icon: Globe },
    { id: 'cmd-a', type: 'command', commandId: '/a', title: 'Search Apps', description: 'Scope search to applications', category: 'Scope', icon: AppWindow },
    { id: 'cmd-f', type: 'command', commandId: '/f', title: 'Search Files', description: 'Scope search to files and folders', category: 'Scope', icon: File },
];

// GlobalSpotlight.jsx SEARCH_SCOPES
const SCOPES: Record<string, { label: string; types: Item['type'][] }> = {
    u: { label: 'URLs', types: ['tab'] },
    a: { label: 'Apps', types: ['app'] },
    f: { label: 'Files', types: ['file', 'folder'] },
};

const COMMAND_TYPE_CLASSES: Record<string, string> = {
    '/new-workspace': 'command-new-workspace', '/agent': 'command-agent', '/u': 'command-u', '/a': 'command-a', '/f': 'command-f',
};

const SUGGESTED = ['ws-my-app', 'tab-local', 'app-code-1', 'note-ship', 'file-vite'].map((id) => ITEMS.find((i) => i.id === id)!);

/** What the demo types, in order, on a loop. */
const SCRIPT = ['my-app', '/', 'code', '/f vite', 'readme'];

const MAX_ROWS = 6;

function getBadgeLabel(item: Item) {
    if (item.type === 'tab') return 'Tab';
    if (item.type === 'workspace') return 'Space';
    if (item.type === 'file') return 'File';
    if (item.type === 'folder') return 'Folder';
    if (item.type === 'app') return item.isRunning ? 'Running' : 'App';
    if (item.type === 'command') return item.category || 'Command';
    if (item.type === 'note') return 'Note';
    return 'Link';
}

const formatUrl = (url?: string) => (url || '').replace(/^https?:\/\//, '').replace(/\/$/, '');

function search(raw: string): { scope: string | null; items: Item[] } {
    const scopeMatch = raw.match(/^\/([uaf])\s+(.*)$/i);
    const scope = scopeMatch ? scopeMatch[1].toLowerCase() : null;
    const q = (scopeMatch ? scopeMatch[2] : raw).trim().toLowerCase();

    if (!scope && raw.trim().startsWith('/')) {
        const typed = raw.trim().toLowerCase();
        return { scope: null, items: COMMANDS.filter((c) => c.commandId!.startsWith(typed) || typed === '/') };
    }

    const pool = scope ? ITEMS.filter((i) => SCOPES[scope].types.includes(i.type)) : ITEMS;
    if (!q) return { scope, items: scope ? pool : SUGGESTED };

    const tokens = q.split(/\s+/);
    return {
        scope,
        items: pool.filter((i) => {
            const hay = `${i.title} ${i.description ?? ''} ${i.url ?? ''}`.toLowerCase();
            return tokens.every((t) => hay.includes(t));
        }),
    };
}

// A tiny stand-in for the app's Prism highlighting: it emits the same
// `token <kind>` classes, so the app's token palette applies unchanged.
const TS_RULES: [RegExp, string][] = [
    [/^\/\/.*/, 'comment'],
    [/^'[^']*'/, 'string'],
    [/^\b(import|from|export|default|const|return|true|false)\b/, 'keyword'],
    [/^\b\d+\b/, 'number'],
    [/^[A-Za-z_$][\w$]*(?=\()/, 'function'],
    [/^[A-Za-z_$][\w$]*(?=:)/, 'property'],
    [/^[{}()[\],;:.]/, 'punctuation'],
];
const MD_RULES: [RegExp, string][] = [
    [/^#{1,6} .*/, 'keyword bold'],
    [/^- /, 'punctuation'],
    [/^https?:\/\/\S+/, 'url'],
    [/^→/, 'operator'],
];

function highlight(line: string, language: 'ts' | 'md') {
    const rules = language === 'ts' ? TS_RULES : MD_RULES;
    const out: React.ReactNode[] = [];
    let rest = line;
    let plain = '';
    let k = 0;
    const flush = () => { if (plain) { out.push(plain); plain = ''; } };
    while (rest) {
        const hit = rules.find(([re]) => re.test(rest));
        const m = hit && rest.match(hit[0]);
        if (hit && m) {
            flush();
            out.push(<span key={k++} className={`token ${hit[1]}`}>{m[0]}</span>);
            rest = rest.slice(m[0].length);
        } else {
            // Consume a whole word at a time so no rule can match mid-identifier.
            const word = rest.match(/^[\w$]+/)?.[0] ?? rest[0];
            plain += word;
            rest = rest.slice(word.length);
        }
    }
    flush();
    return out;
}

/** Quick Look pane — markup from the app's PreviewPane.jsx (code kind). Shared with FileManagerDemo. */
export function PreviewPane({ item }: { item: Item }) {
    const pv = item.preview!;
    const lines = pv.code.split('\n');
    return (
        <div className="preview-pane" key={item.id}>
            <div className="preview-pane-header">
                <item.icon className="preview-pane-header-icon" />
                <div className="preview-pane-header-text">
                    <div className="preview-pane-title">{item.title}</div>
                    <div className="preview-pane-path">{pv.path}</div>
                </div>
            </div>
            <div className="preview-pane-footer-meta">{lines.length} lines · {pv.size}</div>
            <div className="preview-pane-code-wrap">
                <div className="preview-pane-gutter" aria-hidden="true">
                    {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
                </div>
                <pre className="preview-pane-code">
                    <code>
                        {lines.map((l, i) => (
                            <React.Fragment key={i}>{highlight(l, pv.language)}{'\n'}</React.Fragment>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
}

/** Physical-looking key, used by the hero and the How-it-works steps. */
export const Keycap = ({ children, size = 'md' }: { children: React.ReactNode; size?: 'sm' | 'md' }) => (
    <kbd
        className={`inline-flex items-center justify-center rounded-lg border border-white/15 bg-gradient-to-b from-[#2b2f37] to-[#1a1d23] font-sans font-semibold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.06)_inset,0_4px_12px_rgba(0,0,0,0.4)] ${size === 'md' ? 'min-w-[2.25rem] h-9 px-2.5 text-sm' : 'min-w-[1.5rem] h-6 px-1.5 text-[11px]'}`}
    >
        {children}
    </kbd>
);

function ResultRow({ item, selected, onHover }: { item: Item; selected: boolean; onHover: () => void }) {
    const typeClass = item.type === 'command' ? COMMAND_TYPE_CLASSES[item.commandId!] ?? 'link' : item.type;
    const desc = item.type === 'app'
        ? (item.isRunning ? 'Running' : 'Application')
        : (item.type === 'command' ? `${item.commandId} · ${item.description}` : item.description || formatUrl(item.url));

    return (
        <div
            className={`result-item ${selected ? 'selected' : ''} result-${typeClass}`}
            role="option"
            aria-selected={selected}
            onMouseEnter={onHover}
            onMouseDown={(e) => e.preventDefault()}
        >
            <div className="result-icon">
                <item.icon strokeWidth={2} />
            </div>
            <div className="result-content">
                <span className="result-title">{item.title}</span>
                <span className="result-desc">{desc}</span>
            </div>
            {selected ? (
                <div className="result-hint">
                    <span>{item.type === 'app' ? (item.isRunning ? 'Focus' : 'Launch') : 'Open'}</span>
                    <span className="shortcut-key">↵</span>
                </div>
            ) : (
                <span className={`result-badge ${item.type === 'app' && item.isRunning ? 'badge-running' : ''}`}>
                    {getBadgeLabel(item)}
                </span>
            )}
        </div>
    );
}

interface SpotlightHeroProps {
    /** Searches the demo types on a loop. */
    script?: string[];
    /** Soft purple glow behind the panel (the hero uses it; embedded copies don't). */
    glow?: boolean;
}

export default function SpotlightHero({ script = SCRIPT, glow = true }: SpotlightHeroProps) {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(0);
    const [userActive, setUserActive] = useState(false);
    const [visible, setVisible] = useState(true);
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { scope, items } = useMemo(() => search(query), [query]);
    const rows = items.slice(0, MAX_ROWS);
    // Like the app: once a scope is set, the "/u " prefix moves into the badge.
    const inputValue = scope ? query.replace(/^\/[uaf]\s+/i, '') : query;
    // As in the app, selecting a previewable file opens Quick Look beside the list.
    const previewItem = rows[selected]?.preview ? rows[selected] : null;

    useEffect(() => setSelected(0), [query]);

    // Only animate while on screen.
    useEffect(() => {
        const el = rootRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Auto-typing demo: type → hold → erase → next. Stops once the visitor takes over.
    useEffect(() => {
        if (userActive || !visible) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setQuery(script[0]);
            return;
        }
        let cancelled = false;
        const timers: number[] = [];
        const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));

        (async () => {
            let i = 0;
            while (!cancelled) {
                const word = script[i % script.length];
                for (let n = 1; n <= word.length && !cancelled; n++) {
                    setQuery(word.slice(0, n));
                    await wait(85 + Math.random() * 60);
                }
                await wait(800);
                const count = Math.min(search(word).items.length, MAX_ROWS);
                if (word === '/') {
                    // Walk the command list so each command gets a moment.
                    for (let k = 1; k < count && !cancelled; k++) {
                        setSelected(k);
                        await wait(650);
                    }
                    if (!cancelled) setSelected(0);
                } else if (count > 1) {
                    if (!cancelled) setSelected(1);
                    await wait(800);
                    if (!cancelled) setSelected(0);
                }
                await wait(word.startsWith('/f') ? 1600 : 700);
                for (let n = word.length - 1; n >= 0 && !cancelled; n--) {
                    setQuery(word.slice(0, n));
                    await wait(28);
                }
                await wait(450);
                i++;
            }
        })();

        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [userActive, visible, script]);

    const takeOver = () => {
        if (userActive) return;
        setUserActive(true);
        setQuery('');
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        takeOver();
        setQuery(scope ? `/${scope} ${e.target.value}` : e.target.value);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, rows.length - 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
        if (e.key === 'Escape') { setQuery(''); inputRef.current?.blur(); }
        // Backspace on an empty scoped input drops the scope, as in the app.
        if (e.key === 'Backspace' && scope && !inputValue) { e.preventDefault(); setQuery(''); }
        // Enter on a scope command applies it, so visitors can try /f etc.
        if (e.key === 'Enter') {
            const cmd = rows[selected];
            if (cmd?.type === 'command' && SCOPES[cmd.commandId!.slice(1)]) setQuery(`${cmd.commandId} `);
        }
    };

    return (
        <div ref={rootRef} className="cd-spotlight relative w-full max-w-[760px] mx-auto">
            {glow && <div className="pointer-events-none absolute -inset-x-16 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.22),transparent_60%)] blur-2xl" />}

            <div className="spotlight-container relative">
                <label className="spotlight-search-box cursor-text">
                    <span className="spotlight-prompt">{'>'}</span>
                    {scope && <span className="spotlight-scope-badge">{SCOPES[scope].label}</span>}
                    <input
                        ref={inputRef}
                        className="spotlight-input"
                        value={inputValue}
                        onChange={onChange}
                        onFocus={takeOver}
                        onKeyDown={onKeyDown}
                        placeholder="Search tabs, apps, files… or type / for commands"
                        aria-label="Try the CoolDesk search"
                        spellCheck={false}
                    />
                    {!userActive && (
                        <span className="hidden sm:inline text-[11px] text-white/30 shrink-0">Click to try it</span>
                    )}
                </label>

                <div className={`spotlight-results-row${previewItem ? ' has-preview' : ''}`}>
                <div className="spotlight-results" role="listbox" aria-label="Results">
                    {rows.length === 0 ? (
                        <p className="spotlight-empty">No matches in this demo.<br />Try “my-app”, “code” or “/”.</p>
                    ) : (
                        rows.map((item, i) => (
                            <ResultRow
                                key={item.id}
                                item={item}
                                selected={i === selected}
                                onHover={() => userActive && setSelected(i)}
                            />
                        ))
                    )}
                </div>
                {previewItem && <PreviewPane item={previewItem} />}
                </div>

                <div className="spotlight-footer">
                    <div className="shortcut-hint"><span className="shortcut-key">↵</span> Open</div>
                    <div className="shortcut-hint"><span className="shortcut-key">↑↓</span> Navigate</div>
                    <div className="shortcut-hint hide-sm"><span className="shortcut-key">/u /a /f</span> Scope</div>
                    <div className="shortcut-hint hide-sm"><span className="shortcut-key">Esc</span> Close</div>
                </div>
            </div>
        </div>
    );
}

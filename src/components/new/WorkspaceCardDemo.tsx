import { ChevronLeft, Code2, FileText, FolderOpen, Link2, Monitor, Pin, Plus, Terminal, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import './workspace-card-demo.css';

/**
 * Homepage demo of one workspace in the app's detail view — markup and styles
 * from cooldesk-extension/src:
 *   faces/workspace/WorkspaceList.jsx        (.workspace-detail-view + back button)
 *   faces/workspace/parts/WorkspaceCard.jsx  (compact card, fullView: icon stack + labelled rows)
 *   faces/workspace/parts/WorkspaceContextPanel.jsx (Status, Next Up, Notes)
 * over one mock project. Row colours and status options are the app's.
 * Clicking an item "opens" it (lights the open marker); todos can be ticked
 * and added; status can be switched.
 */

type RowKey = 'links' | 'editors' | 'apps' | 'folders' | 'files';

interface RowItem { label: string; letter?: string; bg?: string; open?: boolean }

const ROWS: { key: RowKey; label: string; icon: typeof Link2; accent: string; items: RowItem[] }[] = [
    {
        key: 'links', label: 'Links', icon: Link2, accent: '#60a5fa', items: [
            { label: 'localhost:5173', letter: 'L', bg: '#10b981', open: true },
            { label: 'GitHub', letter: 'G', bg: '#3f3f46', open: true },
            { label: 'Figma', letter: 'F', bg: '#ec4899' },
            { label: 'Linear', letter: 'L', bg: '#6366f1' },
        ],
    },
    { key: 'editors', label: 'Editors', icon: Code2, accent: '#38bdf8', items: [{ label: 'VS Code', open: true }] },
    { key: 'apps', label: 'Apps', icon: Monitor, accent: '#8b5cf6', items: [{ label: 'Terminal', open: true }, { label: 'Slack' }] },
    { key: 'folders', label: 'Folders', icon: FolderOpen, accent: '#facc15', items: [{ label: 'my-app' }] },
    { key: 'files', label: 'Files', icon: FileText, accent: '#94a3b8', items: [{ label: 'README.md' }] },
];

const ROW_ICON: Record<Exclude<RowKey, 'links'>, typeof Link2> = {
    editors: Code2, apps: Terminal, folders: FolderOpen, files: FileText,
};

// WorkspaceContextPanel STATUS_OPTIONS
const STATUS_OPTIONS = [
    { key: 'active', label: 'Active', color: '#22c55e' },
    { key: 'planning', label: 'Planning', color: '#60a5fa' },
    { key: 'on-hold', label: 'On Hold', color: '#f59e0b' },
];

const NOTES = [
    { id: 1, title: 'Onboarding v2', age: '2h', preview: 'Step 2 needs the new illustration. Ship before Friday.', pinned: true },
    { id: 2, title: 'API questions', age: '1d', preview: 'Ask backend about rate limits on /auth/refresh.' },
];

export default function WorkspaceCardDemo() {
    const [open, setOpen] = useState<Set<string>>(() => new Set(
        ROWS.flatMap((r) => r.items.filter((i) => i.open).map((i) => `${r.key}:${i.label}`)),
    ));
    const [status, setStatus] = useState<string | null>('active');
    const [todos, setTodos] = useState([
        { id: 1, text: 'Fix auth redirect', done: true },
        { id: 2, text: 'Review PR #42', done: false },
        { id: 3, text: 'Write changelog', done: false },
    ]);
    const [draft, setDraft] = useState('');

    const markOpen = (key: string) => setOpen((s) => new Set(s).add(key));
    const addTodo = () => {
        const text = draft.trim();
        if (!text) return;
        setTodos((t) => [...t, { id: Date.now(), text, done: false }]);
        setDraft('');
    };
    const openCount = todos.filter((t) => !t.done).length;

    return (
        <div className="cd-ws cd-ws-wallpaper rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-5">
            <div className="workspace-detail-view">
                <button className="workspace-detail-back" type="button">
                    <ChevronLeft className="w-3 h-3" />
                    All Workspaces
                </button>

                {/* Card — compact + fullView, i.e. panel-open with labelled rows */}
                <div className="cooldesk-workspace-card compact panel-open full-view">
                    <div className="compact-card-inner" style={{ alignItems: 'flex-start' }}>
                        <div className="compact-workspace-stack">
                            <div className="compact-workspace-icon workspace-icon folder-collage">
                                <div className="workspace-folder-grid">
                                    {ROWS[0].items.slice(0, 4).map((l) => (
                                        <div key={l.label} className="folder-grid-cell">
                                            <div className="folder-grid-letter" style={{ background: l.bg }}>{l.letter}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="compact-workspace-label">my-app</div>
                        </div>

                        <div className="compact-icons-scroll">
                            <div className="compact-icons-rows">
                                {ROWS.map((row) => (
                                    <div key={row.key} className="compact-icons-row" style={{ '--row-accent': row.accent } as React.CSSProperties}>
                                        <div className="compact-icons-row-label">
                                            <row.icon />
                                            <span>{row.label}</span>
                                            <span className="compact-icons-row-count">{row.items.length}</span>
                                        </div>
                                        <div className="compact-icons-container">
                                            {row.items.map((item) => {
                                                const key = `${row.key}:${item.label}`;
                                                const isOpen = open.has(key);
                                                if (row.key === 'links') {
                                                    return (
                                                        <div
                                                            key={key}
                                                            className={`compact-url-icon is-labeled${isOpen ? ' is-open' : ''}`}
                                                            onClick={() => markOpen(key)}
                                                            title={`${item.label}${isOpen ? ' — open in browser' : ''}`}
                                                        >
                                                            <div className="letter-avatar" style={{ background: item.bg }}>{item.letter}</div>
                                                            <span className="compact-icon-label">{item.label}</span>
                                                        </div>
                                                    );
                                                }
                                                const Icon = ROW_ICON[row.key];
                                                return (
                                                    <div
                                                        key={key}
                                                        className={`compact-url-icon compact-app-icon is-labeled${isOpen ? ' is-open' : ''}`}
                                                        onClick={() => markOpen(key)}
                                                        title={`${item.label}${isOpen ? ' — running (click to focus)' : ''}`}
                                                        style={{ border: `1px solid ${row.accent}55`, background: `${row.accent}12` }}
                                                    >
                                                        <Icon style={{ color: row.accent, width: 18, height: 18 }} />
                                                        <span className="compact-icon-label" style={{ color: row.accent }}>{item.label}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Context panel — Status + Next Up on the rail, Notes beside */}
                <div className="workspace-context-panel">
                    <div className="wcp-grid">
                        <aside className="wcp-rail">
                            <section className="wcp-section">
                                <header className="wcp-section-head" data-accent="status">
                                    <span className="wcp-section-bar" aria-hidden="true" />
                                    <h4 className="wcp-section-title">Status</h4>
                                </header>
                                <div className="wcp-status-seg" role="radiogroup" aria-label="Workspace status">
                                    {STATUS_OPTIONS.map(({ key, label, color }) => (
                                        <button
                                            key={key}
                                            type="button"
                                            role="radio"
                                            aria-checked={status === key}
                                            className={`wcp-status-pill ${status === key ? 'is-active' : ''}`}
                                            style={{ '--seg-color': color } as React.CSSProperties}
                                            onClick={() => setStatus(status === key ? null : key)}
                                        >
                                            <span className="wcp-status-dot" aria-hidden="true" />
                                            <span className="wcp-status-pill-label">{label}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section className="wcp-section wcp-todos-section">
                                <header className="wcp-section-head" data-accent="todos">
                                    <span className="wcp-section-bar" aria-hidden="true" />
                                    <h4 className="wcp-section-title">Next Up</h4>
                                    {openCount > 0 && <span className="wcp-section-count">{openCount}</span>}
                                </header>
                                <div className="wcp-todos">
                                    <div className="wcp-todo-cat">
                                        {todos.map((todo) => (
                                            <div key={todo.id} className={`wcp-todo-row ${todo.done ? 'is-done' : ''}`}>
                                                <button
                                                    type="button"
                                                    className="wcp-todo-check"
                                                    onClick={() => setTodos((t) => t.map((x) => (x.id === todo.id ? { ...x, done: !x.done } : x)))}
                                                    aria-label={todo.done ? 'Mark undone' : 'Mark done'}
                                                    aria-pressed={todo.done}
                                                >
                                                    <svg viewBox="0 0 14 14" width="9" height="9" aria-hidden="true">
                                                        <path d="M2 7.5L5.5 11L12 3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                <span className="wcp-todo-text">{todo.text}</span>
                                                <button
                                                    type="button"
                                                    className="wcp-todo-del"
                                                    onClick={() => setTodos((t) => t.filter((x) => x.id !== todo.id))}
                                                    aria-label="Delete task"
                                                >×</button>
                                            </div>
                                        ))}
                                    </div>
                                    {todos.length === 0 && <div className="wcp-todos-empty">Nothing queued. Capture one below.</div>}
                                    <div className="wcp-todo-add">
                                        <input
                                            className="wcp-todo-input"
                                            placeholder="What's next…"
                                            value={draft}
                                            onChange={(e) => setDraft(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') addTodo(); }}
                                            aria-label="Add a task"
                                        />
                                        <button type="button" className="wcp-todo-add-btn" onClick={addTodo} disabled={!draft.trim()} aria-label="Add task">
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </aside>

                        <section className="wcp-notes-col">
                            <header className="wcp-section-head" data-accent="notes">
                                <span className="wcp-section-bar" aria-hidden="true" />
                                <h4 className="wcp-section-title">Notes</h4>
                                <span className="wcp-section-count">{NOTES.length}</span>
                                <button type="button" className="wcp-notes-new-btn" title="New note" aria-label="New note">
                                    <Plus className="w-2.5 h-2.5" />
                                    <span>New</span>
                                </button>
                            </header>
                            <div className="wcp-notes-list">
                                {NOTES.map((note) => (
                                    <div key={note.id} className={`wcp-note-card${note.pinned ? ' is-pinned' : ''}`} role="button" tabIndex={0}>
                                        <div className="wcp-note-card-row">
                                            <span className="wcp-note-card-title">{note.title}</span>
                                            <span className="wcp-note-card-age">{note.age}</span>
                                        </div>
                                        <span className="wcp-note-card-preview">{note.preview}</span>
                                        <div className="wcp-note-card-actions">
                                            <button type="button" className={`wcp-note-card-pin${note.pinned ? ' is-pinned' : ''}`} aria-label={note.pinned ? 'Unpin note' : 'Pin note'}>
                                                <Pin className="w-3 h-3" />
                                            </button>
                                            <button type="button" className="wcp-note-card-del" aria-label="Delete note">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

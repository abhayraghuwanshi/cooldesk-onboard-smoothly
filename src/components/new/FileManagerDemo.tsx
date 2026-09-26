import {
    ArrowLeft, ArrowRight, ArrowUp, Check, Copy, ExternalLink, Eye, File, FileCode, Folder, FolderGit2,
    Home, Link2, ListTodo, Monitor, Pin, Play, Search, X,
} from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';
import './file-manager-demo.css';
import { PreviewPane, type Item } from './SpotlightHero';

/**
 * Homepage demo of the app's file manager — its markup and styles
 * (file-manager-demo.css) over a tiny mock file tree. Follows
 * cooldesk-extension/src/features/file-manager/FileManager.jsx: toolbar +
 * crumbs, project bar (run commands, resource folders, live services, todo
 * count), sidebar (Projects / Pinned / Places), list, status bar, and the
 * Quick Look column shared with Spotlight. Hover moves the cursor like the
 * app; folders open on click, files preview.
 */

interface Entry {
    name: string;
    dir?: boolean;
    hidden?: boolean;
    date: string;
    size?: string;
    /** Folder item count badge. */
    count?: number;
    code?: string;
}

const PKG = `{
  "name": "my-app",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1"
  }
}`;

const VITE = `import { defineConfig } from 'vite';
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

const APP = `import { Onboarding } from './components/Onboarding';

export default function App() {
  return <Onboarding step={1} />;
}`;

const MAIN = `import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);`;

const COOLDESK = `{
  "name": "my-app",
  "commands": [
    { "id": "dev", "run": "npm run dev" },
    { "id": "build", "run": "npm run build" }
  ],
  "services": [{ "label": "web", "port": 5173 }]
}`;

const SERVER = `import express from 'express';

const app = express();

app.get('/health', (_req, res) => res.send('ok'));

// API for my-app
app.listen(8080);`;

const FS: Record<string, Entry[]> = {
    '~': [
        { name: 'projects', dir: true, date: 'Today 09:12', count: 2 },
        { name: 'Desktop', dir: true, date: 'Yesterday', count: 4 },
        { name: 'Downloads', dir: true, date: 'Sep 21', count: 12 },
    ],
    '~/Desktop': [],
    '~/Downloads': [],
    '~/projects': [
        { name: 'my-app', dir: true, date: 'Today 10:42', count: 6 },
        { name: 'api-server', dir: true, date: 'Yesterday', count: 3 },
    ],
    '~/projects/my-app': [
        { name: '.cooldesk', dir: true, hidden: true, date: 'Sep 20', count: 1 },
        { name: 'public', dir: true, date: 'Sep 18', count: 0 },
        { name: 'src', dir: true, date: 'Today 10:40', count: 3 },
        { name: 'README.md', date: 'Today 10:15', size: '236 B', code: README },
        { name: 'package.json', date: 'Sep 22', size: '284 B', code: PKG },
        { name: 'vite.config.ts', date: 'Sep 19', size: '412 B', code: VITE },
    ],
    '~/projects/my-app/.cooldesk': [
        { name: 'cooldesk.json', date: 'Sep 20', size: '221 B', code: COOLDESK },
    ],
    '~/projects/my-app/public': [],
    '~/projects/my-app/src': [
        { name: 'App.tsx', date: 'Today 10:40', size: '140 B', code: APP },
        { name: 'main.tsx', date: 'Sep 18', size: '132 B', code: MAIN },
        { name: 'index.css', date: 'Sep 18', size: '1.2 KB', code: ':root {\n  color-scheme: dark;\n}' },
    ],
    '~/projects/api-server': [
        { name: 'README.md', date: 'Yesterday', size: '98 B', code: '# api-server\n\nBackend for my-app.' },
        { name: 'package.json', date: 'Yesterday', size: '190 B', code: '{\n  "name": "api-server",\n  "scripts": { "dev": "tsx server.ts" }\n}' },
        { name: 'server.ts', date: 'Yesterday', size: '164 B', code: SERVER },
    ],
};

interface Project {
    root: string;
    name: string;
    commands: string[];
    resources: string[];
    service: { label: string; port: number; live: boolean };
    todos: number;
}

const PROJECTS: Project[] = [
    { root: '~/projects/my-app', name: 'my-app', commands: ['dev', 'build', 'test'], resources: ['src'], service: { label: 'web', port: 5173, live: true }, todos: 3 },
    { root: '~/projects/api-server', name: 'api-server', commands: ['dev'], resources: [], service: { label: 'api', port: 8080, live: false }, todos: 0 },
];

const START = '~/projects/my-app';

const parentOf = (p: string) => (p === '~' ? null : p.slice(0, p.lastIndexOf('/')) || '~');
const crumbsOf = (p: string) => p.split('/').map((name, i, parts) => ({ name, path: parts.slice(0, i + 1).join('/') }));
const extOf = (name: string) => name.split('.').pop()!.toLowerCase();

/** iconFor() in FileManager.jsx — folders yellow, code files blue, rest slate. */
function iconFor(e: Entry): [typeof File, string] {
    if (e.dir) return [Folder, '#FACC15'];
    if (/\.(js|jsx|ts|tsx|css|html|json|md)$/i.test(e.name)) return [FileCode, '#60A5FA'];
    return [File, '#94A3B8'];
}

export default function FileManagerDemo() {
    const [history, setHistory] = useState<string[]>([START]);
    const [histIndex, setHistIndex] = useState(0);
    const [cursor, setCursor] = useState(5); // vite.config.ts
    const [filter, setFilter] = useState('');
    const [ran, setRan] = useState<string | null>(null);
    // Same guard as the app (hoverGuard / isRealPointerMove): when a folder
    // opens, rows reflow under a stationary cursor and the browser re-fires
    // mouseenter. Only a pointer that actually moved may move the cursor.
    const lastPointer = useRef<{ x: number; y: number } | null>(null);
    const onRowEnter = (i: number, e: React.MouseEvent) => {
        const last = lastPointer.current;
        if (last && last.x === e.clientX && last.y === e.clientY) return;
        lastPointer.current = { x: e.clientX, y: e.clientY };
        setCursor(i);
    };

    const path = history[histIndex];
    const project = PROJECTS.find((p) => path === p.root || path.startsWith(`${p.root}/`)) ?? null;
    const entries = useMemo(() => FS[path] ?? [], [path]);
    const visible = useMemo(
        () => entries.filter((e) => e.name.toLowerCase().includes(filter.toLowerCase())),
        [entries, filter],
    );
    const current = visible[cursor] ?? null;

    const previewItem: Item | null = current && current.code
        ? {
            id: `${path}/${current.name}`,
            type: 'file',
            title: current.name,
            icon: iconFor(current)[0],
            preview: {
                language: extOf(current.name) === 'md' ? 'md' : 'ts',
                size: current.size ?? '',
                path: `${path}/${current.name}`,
                code: current.code,
            },
        }
        : null;

    const navigate = (to: string) => {
        if (!FS[to] || to === path) return;
        const next = [...history.slice(0, histIndex + 1), to];
        setHistory(next);
        setHistIndex(next.length - 1);
        setCursor(0);
        setFilter('');
    };

    const open = (e: Entry) => {
        if (e.dir) navigate(`${path}/${e.name}`);
    };

    const runCommand = (cmd: string) => {
        setRan(cmd);
        window.setTimeout(() => setRan((r) => (r === cmd ? null : r)), 1400);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if ((e.target as HTMLElement).tagName === 'INPUT' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') return;
        if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, visible.length - 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
        if (e.key === 'Enter' && current) { e.preventDefault(); open(current); }
        if (e.key === 'Backspace') { const up = parentOf(path); if (up) { e.preventDefault(); navigate(up); } }
    };

    const sidebar = [
        {
            title: 'Projects', kind: 'linked', items: PROJECTS.map((p) => ({ name: p.name, path: p.root, icon: FolderGit2 })),
        },
        { title: 'Pinned', items: [{ name: 'projects', path: '~/projects', icon: Pin }] },
        {
            title: 'Places', items: [
                { name: 'Home', path: '~', icon: Home },
                { name: 'Desktop', path: '~/Desktop', icon: Monitor },
                { name: 'Downloads', path: '~/Downloads', icon: Folder },
            ],
        },
    ];

    return (
        <div className="cd-fm cd-spotlight" onKeyDown={onKeyDown}>
            <div className="fm-window" tabIndex={0} aria-label="CoolDesk file manager demo">
                {/* Toolbar */}
                <div className="fm-toolbar">
                    <div className="fm-nav">
                        <button className="fm-icon-btn" disabled={histIndex <= 0} onClick={() => { setHistIndex((i) => i - 1); setCursor(0); }} title="Back (Alt+←)"><ArrowLeft /></button>
                        <button className="fm-icon-btn" disabled={histIndex >= history.length - 1} onClick={() => { setHistIndex((i) => i + 1); setCursor(0); }} title="Forward (Alt+→)"><ArrowRight /></button>
                        <button className="fm-icon-btn" disabled={!parentOf(path)} onClick={() => { const up = parentOf(path); if (up) navigate(up); }} title="Up one folder (Backspace)"><ArrowUp /></button>
                    </div>
                    <div className="fm-crumbs">
                        {crumbsOf(path).map((c, i, all) => (
                            <span key={c.path} className="fm-crumb-wrap">
                                <button
                                    className={`fm-crumb ${i === all.length - 1 ? 'current' : ''}`}
                                    onClick={() => navigate(c.path)}
                                >
                                    {c.name}
                                </button>
                                {i < all.length - 1 && <span className="fm-crumb-chev">▸</span>}
                            </span>
                        ))}
                    </div>
                    <div className="fm-search">
                        <Search className="fm-search-icon" />
                        <input
                            value={filter}
                            onChange={(e) => { setFilter(e.target.value); setCursor(0); }}
                            placeholder="Filter"
                            aria-label="Filter this folder"
                        />
                    </div>
                    <div className="fm-toolbar-actions">
                        <button className={`fm-icon-btn ${path === '~/projects' ? 'pinned' : ''}`} title="Pin this folder to the sidebar"><Pin /></button>
                        <button className="fm-icon-btn active" title="Hide hidden files"><Eye /></button>
                        <button className="fm-icon-btn" title="Copy path"><Copy /></button>
                        <button className="fm-icon-btn" title="Open in system file manager"><ExternalLink /></button>
                        <button className="fm-icon-btn fm-close" title="Close (Esc)"><X /></button>
                    </div>
                </div>

                {/* Project bar — only inside a project */}
                {project && (
                    <div className="fm-project-bar">
                        <button className="fm-project-name" onClick={() => navigate(project.root)} title={project.root}>
                            <FolderGit2 className="w-3 h-3" />
                            <span>{project.name}</span>
                        </button>
                        <div className="fm-project-group">
                            {project.commands.map((cmd) => (
                                <button
                                    key={cmd}
                                    className={`fm-cmd-chip ${ran === cmd ? 'ran' : ''}`}
                                    onClick={() => runCommand(cmd)}
                                    title={`npm run ${cmd}  ·  runs in ${project.root}`}
                                >
                                    {ran === cmd ? <Check /> : <Play />}
                                    <span>{cmd}</span>
                                </button>
                            ))}
                        </div>
                        {project.resources.length > 0 && (
                            <div className="fm-project-group">
                                {project.resources.map((r) => (
                                    <button
                                        key={r}
                                        className={`fm-res-chip ${path === `${project.root}/${r}` ? 'current' : ''}`}
                                        onClick={() => navigate(`${project.root}/${r}`)}
                                    >
                                        <Folder />
                                        <span>{r}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="fm-project-group">
                            <span
                                className={`fm-svc-chip ${project.service.live ? 'live' : 'down'}`}
                                title={project.service.live ? `${project.service.label} — listening on ${project.service.port}` : `${project.service.label} — not running`}
                            >
                                <span className="fm-svc-open">
                                    <span className="fm-svc-dot" />
                                    <span>{project.service.label}</span>
                                    <span className="fm-svc-port">:{project.service.port}</span>
                                </span>
                            </span>
                        </div>
                        {project.todos > 0 && (
                            <span className="fm-todo-count" title="Open todos in this project">
                                <ListTodo />
                                {project.todos} todos
                            </span>
                        )}
                    </div>
                )}

                <div className="fm-body">
                    <div className="fm-sidebar">
                        {sidebar.map((section) => (
                            <div key={section.title} className={`fm-side-section ${section.kind === 'linked' ? 'fm-side-linked' : ''}`}>
                                <div className="fm-side-title">
                                    {section.kind === 'linked' && <Link2 className="fm-side-title-icon" />}
                                    {section.title}
                                </div>
                                {section.items.map((item) => {
                                    const active = section.kind === 'linked'
                                        ? path === item.path || path.startsWith(`${item.path}/`)
                                        : path === item.path;
                                    return (
                                        <button
                                            key={item.path}
                                            className={`fm-side-item ${active ? 'active' : ''}`}
                                            onClick={() => navigate(item.path)}
                                        >
                                            <item.icon className="fm-side-icon" />
                                            <span className="fm-side-label">{item.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="fm-main">
                        <div className="fm-col-heads">
                            <span className="fm-col-head fm-col-name active">Name</span>
                            <span className="fm-col-head fm-col-date">Modified</span>
                            <span className="fm-col-head fm-col-size">Size</span>
                        </div>
                        <div className="fm-list" role="listbox" aria-label={`Files in ${path}`}>
                            {visible.length === 0 && (
                                <div className="fm-empty" style={{ padding: '28px 12px', textAlign: 'center', color: '#6b7280' }}>
                                    {filter ? 'Nothing matches that filter' : 'This folder is empty'}
                                </div>
                            )}
                            {visible.map((e, i) => {
                                const [Icon, color] = iconFor(e);
                                return (
                                    <div
                                        key={e.name}
                                        role="option"
                                        aria-selected={i === cursor}
                                        className={`fm-item fm-row ${i === cursor ? 'active' : ''} ${e.hidden ? 'hidden-entry' : ''}`}
                                        onMouseEnter={(ev) => onRowEnter(i, ev)}
                                        onMouseMove={(ev) => { lastPointer.current = { x: ev.clientX, y: ev.clientY }; }}
                                        onClick={() => { setCursor(i); open(e); }}
                                    >
                                        <div className="fm-col-name">
                                            <Icon className="fm-row-icon" style={{ color }} />
                                            <span className="fm-row-name">{e.name}</span>
                                            {e.dir && e.count !== undefined && <span className="fm-row-count">{e.count}</span>}
                                        </div>
                                        <div className="fm-col-date">{e.date}</div>
                                        <div className="fm-col-size">{e.dir ? '' : e.size}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="fm-status">
                            <span>{visible.length} item{visible.length === 1 ? '' : 's'}{filter ? ` of ${entries.length}` : ''}</span>
                            {current && <span className="fm-status-sel">{current.name}</span>}
                            <span className="fm-status-hint">
                                <kbd>↑↓</kbd> move <kbd>↵</kbd> open <kbd>⌫</kbd> up <kbd>Ctrl+L</kbd> path
                            </span>
                        </div>
                    </div>

                    <div className="fm-preview-resize" />
                    <div className="fm-preview">
                        {previewItem
                            ? <PreviewPane item={previewItem} />
                            : <div className="fm-preview-empty">{current?.dir ? 'Open the folder to see inside' : 'No preview'}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

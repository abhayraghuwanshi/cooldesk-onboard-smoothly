import { Code2, FileCode, Folder, Maximize2, PanelBottom, PanelRight, Terminal } from 'lucide-react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './layout-modes-demo.css';

/**
 * The app's three layouts (useLayoutSwitch.js: full → side → bar) as three
 * still previews, each with a line of plain text. No animation.
 * Each desktop is drawn at a real 960×600 and scaled to its card, so the dock,
 * tiles and text keep their true proportions.
 *
 *   Full window — the CoolDesk window over everything
 *   Sidebar     — Notification Center style tiles on the desktop (dock-see-through.css)
 *   Dock        — the dock shelf along the bottom (dockbar.css)
 *
 * Sidebar and dock are drawers in the app (lib.rs "drawer" mode): they tuck
 * away to a handle at the screen edge and slide in over your work on hover.
 */

type Layout = 'full' | 'side' | 'bar';

const DESK_W = 960;
const DESK_H = 600;

// useLayoutEffect in the browser (no flash at the wrong scale), useEffect during prerender.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Editor window geometry per layout (px inside the 960×600 desktop). The
// drawers overlay it, so sidebar and dock leave it full size.
const EDITOR_OPEN: React.CSSProperties = { top: 38, left: 14, width: 932, height: 548 };
const EDITOR: Record<Layout, React.CSSProperties> = {
    full: { top: 46, left: 40, width: 880, height: 520, opacity: 0.5 },
    side: EDITOR_OPEN,
    bar: EDITOR_OPEN,
};

const LAYOUTS: { key: Layout; title: string; icon: typeof Maximize2; text: string }[] = [
    {
        key: 'full',
        title: 'Full window',
        icon: Maximize2,
        text: 'Your whole workspace on one screen: every project, what’s next and a focus timer.',
    },
    {
        key: 'side',
        title: 'Sidebar',
        icon: PanelRight,
        text: 'Your project beside your work. It tucks away to a thin handle on the screen edge; hover it to bring it back.',
    },
    {
        key: 'bar',
        title: 'Dock',
        icon: PanelBottom,
        text: 'A slim bar of the project’s links and apps along the bottom. A dot marks what’s already open.',
    },
];

const LINKS = [
    { label: 'localhost:5173', letter: 'L', bg: '#10b981', open: true },
    { label: 'GitHub', letter: 'G', bg: '#3f3f46', open: true },
    { label: 'Figma', letter: 'F', bg: '#ec4899' },
    { label: 'Linear', letter: 'L', bg: '#6366f1' },
];

const APPS = [
    { label: 'VS Code', icon: Code2, color: '#38bdf8', open: true },
    { label: 'Terminal', icon: Terminal, color: '#8b5cf6', open: true },
];

const TODOS = [
    { text: 'Fix auth redirect', done: true },
    { text: 'Review PR #42' },
    { text: 'Write changelog' },
];

const OTHER_WS = [
    { name: 'landing-site', sub: '4 links · 1 app', cells: ['#ec4899', '#f59e0b', '#0ea5e9', '#27272a'], rows: [['V', '#27272a', 'Vercel'], ['F', '#ec4899', 'Figma · Hero']] },
    { name: 'api-server', sub: '3 links · 1 app', cells: ['#10b981', '#f97316', '#0ea5e9', '#3f3f46'], rows: [['L', '#10b981', 'localhost:8080'], ['P', '#f97316', 'Postman']] },
];

// A few real lines for the editor.
const CODE: React.ReactNode[] = [
    <><span className="k">import</span> {'{ '}<span className="t">Onboarding</span>{' }'} <span className="k">from</span> <span className="s">'./Onboarding'</span>;</>,
    <></>,
    <><span className="c">// Step shown after sign-up</span></>,
    <><span className="k">export default function</span> <span className="f">App</span>() {'{'}</>,
    <>{'  '}<span className="k">const</span> step = <span className="f">useStep</span>(<span className="n">1</span>);</>,
    <>{'  '}<span className="k">return</span> {'<'}<span className="t">Onboarding</span> step={'{'}step{'}'} {'/>'};</>,
    <>{'}'}</>,
    <></>,
    <><span className="k">function</span> <span className="f">useStep</span>(initial: <span className="t">number</span>) {'{'}</>,
    <>{'  '}<span className="k">return</span> <span className="f">useState</span>(initial)[<span className="n">0</span>];</>,
    <>{'}'}</>,
];

const Letter = ({ letter, bg, size = 20 }: { letter: string; bg: string; size?: number }) => (
    <span className="cd-lm-letter" style={{ background: bg, width: size, height: size }}>{letter}</span>
);

function EditorWindow({ layout }: { layout: Layout }) {
    return (
        <div className="cd-lm-editor" style={EDITOR[layout]}>
            <div className="cd-lm-titlebar">
                <span className="cd-lm-dot" style={{ background: '#ff5f57' }} />
                <span className="cd-lm-dot" style={{ background: '#febc2e' }} />
                <span className="cd-lm-dot" style={{ background: '#28c840' }} />
                <span className="title">App.tsx — my-app</span>
            </div>
            <div className="cd-lm-editor-body">
                <div className="cd-lm-explorer">
                    <div className="head">Explorer</div>
                    {[['src', true, false], ['components', true, false], ['App.tsx', false, true], ['main.tsx', false, false], ['README.md', false, false], ['vite.config.ts', false, false]].map(([name, dir, active]) => (
                        <div key={name as string} className={`row${active ? ' active' : ''}`} style={{ paddingLeft: dir ? 6 : 20 }}>
                            {dir ? <Folder style={{ color: '#facc15' }} /> : <FileCode style={{ color: '#60a5fa' }} />}
                            {name as string}
                        </div>
                    ))}
                </div>
                <div className="cd-lm-code">
                    {CODE.map((line, i) => (
                        <div key={i}><span className="ln">{i + 1}</span>{line}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function FullWindow({ shown }: { shown: boolean }) {
    return (
        <div className={`cd-lm-full${shown ? '' : ' is-hidden'}`}>
            <div className="cd-lm-full-top">
                <div className="cd-lm-search"><span className="prompt">{'>'}</span>Search tabs, apps, files… or type /<kbd>Alt K</kbd></div>
            </div>
            <div className="cd-lm-full-grid">
                <div className="cd-lm-glass">
                    <div className="cd-lm-ws-head">
                        <div className="cd-lm-ws-icon">{LINKS.map((l) => <i key={l.label} style={{ background: l.bg }}>{l.letter}</i>)}</div>
                        <div><div className="cd-lm-ws-name">my-app</div><div className="cd-lm-ws-sub">4 links · 2 apps</div></div>
                    </div>
                    {LINKS.slice(0, 3).map((l) => (
                        <div key={l.label} className="cd-lm-row plate"><Letter letter={l.letter} bg={l.bg} />{l.label}{l.open && <span className="open" />}</div>
                    ))}
                    {APPS.map((a) => (
                        <div key={a.label} className="cd-lm-row plate"><a.icon style={{ width: 16, height: 16, color: a.color }} />{a.label}{a.open && <span className="open" />}</div>
                    ))}
                </div>
                {OTHER_WS.map((ws) => (
                    <div key={ws.name} className="cd-lm-glass">
                        <div className="cd-lm-ws-head">
                            <div className="cd-lm-ws-icon">{ws.cells.map((c, i) => <i key={i} style={{ background: c }} />)}</div>
                            <div><div className="cd-lm-ws-name">{ws.name}</div><div className="cd-lm-ws-sub">{ws.sub}</div></div>
                        </div>
                        {ws.rows.map(([letter, bg, label]) => (
                            <div key={label} className="cd-lm-row plate"><Letter letter={letter} bg={bg} />{label}</div>
                        ))}
                    </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="cd-lm-glass">
                        <div className="cd-lm-label"><span className="bar" style={{ background: '#f59e0b' }} />Next up</div>
                        {TODOS.map((t) => <div key={t.text} className={`cd-lm-todo${t.done ? ' done' : ''}`}><span className="box" />{t.text}</div>)}
                    </div>
                    <div className="cd-lm-glass cd-lm-focus">
                        <div className="cd-lm-label" style={{ justifyContent: 'center' }}><span className="bar" style={{ background: '#8b5cf6' }} />Focus</div>
                        <div className="time">24:59</div>
                        <div className="track"><i /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarTiles({ shown }: { shown: boolean }) {
    return (
        <div className={`cd-lm-side${shown ? '' : ' is-hidden'}`}>
            <div className="cd-lm-side-title">my-app</div>
            <div className="cd-lm-tile">
                <div className="cd-lm-label"><span className="bar" style={{ background: '#60a5fa' }} />Links</div>
                {LINKS.map((l) => (
                    <div key={l.label} className="cd-lm-row"><Letter letter={l.letter} bg={l.bg} />{l.label}{l.open && <span className="open" />}</div>
                ))}
            </div>
            <div className="cd-lm-tile">
                <div className="cd-lm-label"><span className="bar" style={{ background: '#8b5cf6' }} />Apps</div>
                {APPS.map((a) => (
                    <div key={a.label} className="cd-lm-row"><a.icon style={{ width: 16, height: 16, color: a.color }} />{a.label}{a.open && <span className="open" />}</div>
                ))}
            </div>
            <div className="cd-lm-tile">
                <div className="cd-lm-label"><span className="bar" style={{ background: '#f59e0b' }} />Next up</div>
                {TODOS.map((t) => <div key={t.text} className={`cd-lm-todo${t.done ? ' done' : ''}`}><span className="box" />{t.text}</div>)}
            </div>
        </div>
    );
}

function DockBar({ shown }: { shown: boolean }) {
    return (
        <div className={`cd-lm-bar${shown ? '' : ' is-hidden'}`}>
            <div className="dockbar-shelf">
                <div className="dockbar-ws-chip">
                    <img src="/cooldesk.png" alt="" className="dockbar-ws-logo" width={30} height={30} />
                    <span className="dockbar-ws-name">my-app</span>
                </div>
                <span className="dockbar-sep" />
                <div className="dockbar-items">
                    {LINKS.map((l) => (
                        <div key={l.label} className={`dockbar-item${l.open ? ' is-active' : ''}`} title={l.label}>
                            <span className="dockbar-letter" style={{ background: l.bg }}>{l.letter}</span>
                        </div>
                    ))}
                    {APPS.map((a) => (
                        <div key={a.label} className={`dockbar-item${a.open ? ' is-active' : ''}`} title={a.label}>
                            <a.icon className="dockbar-app-glyph" style={{ color: a.color }} />
                        </div>
                    ))}
                </div>
                <span className="dockbar-sep" />
                <div className="dockbar-ctrl" title="Switch layout"><Maximize2 /></div>
            </div>
        </div>
    );
}

/** One still desktop in the given layout, scaled to its container. */
function LayoutPreview({ layout }: { layout: Layout }) {
    const [scale, setScale] = useState(0.4);
    const stageRef = useRef<HTMLDivElement>(null);

    useIsoLayoutEffect(() => {
        const el = stageRef.current;
        if (!el) return;
        const fit = () => setScale(el.clientWidth / DESK_W);
        fit();
        if (typeof ResizeObserver === 'undefined') return;
        const ro = new ResizeObserver(fit);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <div ref={stageRef} className="cd-lm-stage" style={{ height: DESK_H * scale }} aria-hidden="true">
            <div className="cd-lm-desktop" style={{ transform: `scale(${scale})` }}>
                <div className="cd-lm-menubar">
                    <b>Code</b><span>File</span><span>Edit</span><span>View</span><span>Go</span>
                    <span className="cd-lm-menubar-right">Wed 10:42</span>
                </div>
                <EditorWindow layout={layout} />
                <FullWindow shown={layout === 'full'} />
                <SidebarTiles shown={layout === 'side'} />
                <DockBar shown={layout === 'bar'} />
            </div>
        </div>
    );
}

export default function LayoutModesDemo() {
    return (
        <div className="cd-lm cd-lm-static">
            <div className="grid md:grid-cols-3 gap-5">
                {LAYOUTS.map((l) => (
                    <figure key={l.key} className="m-0">
                        <LayoutPreview layout={l.key} />
                        <figcaption className="mt-4">
                            <p className="flex items-center gap-2 text-base font-semibold text-white">
                                <l.icon className="w-4 h-4 text-white/60" strokeWidth={1.9} />
                                {l.title}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-white/55">{l.text}</p>
                        </figcaption>
                    </figure>
                ))}
            </div>
            <p className="cd-lm-hint">Switch anytime with <kbd>Ctrl+Shift+D</kbd> in the desktop app.</p>
        </div>
    );
}

import { Code2, FileCode, Folder, Maximize2, PanelBottom, PanelRight, Terminal } from 'lucide-react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './layout-modes-demo.css';

/**
 * The app's three layouts (useLayoutSwitch.js: full → side → bar) on a small
 * desktop. The desktop is built at a real 960×600 and scaled to the column,
 * so the dock, tiles and text keep their true proportions.
 *
 *   Full window — the CoolDesk window over everything
 *   Sidebar     — Notification Center style: separate tiles floating on the
 *                 desktop, no panel (dock-see-through.css)
 *   Bottom bar  — the dock shelf (dockbar.css)
 *
 * Sidebar and bar are drawers, as in the app (lib.rs "drawer" mode): a slim
 * handle waits at the screen edge, hovering it slides the panel in OVER the
 * open windows (nothing reflows), and leaving collapses it again.
 *
 * Auto-plays while on screen: a pointer moves to the handle, the panel opens,
 * the pointer leaves. Picking a segment or hovering a handle takes over.
 * Reduced motion: no autoplay, no transitions.
 */

type Layout = 'full' | 'side' | 'bar';

const ORDER: Layout[] = ['full', 'side', 'bar'];
const DESK_W = 960;
const DESK_H = 600;

// useLayoutEffect in the browser (no flash at the wrong scale), useEffect during prerender.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const TABS: { key: Layout; label: string; icon: typeof Maximize2 }[] = [
    { key: 'full', label: 'Full window', icon: Maximize2 },
    { key: 'side', label: 'Sidebar', icon: PanelRight },
    { key: 'bar', label: 'Bottom bar', icon: PanelBottom },
];

// Editor window geometry per layout (px inside the 960×600 desktop). The
// drawers overlay it, so sidebar and bar leave it full size.
const EDITOR_OPEN: React.CSSProperties = { top: 38, left: 14, width: 932, height: 548, opacity: 1, transform: 'scale(1)' };
const EDITOR: Record<Layout, React.CSSProperties> = {
    full: { top: 46, left: 40, width: 880, height: 520, opacity: 0.5, transform: 'scale(0.97)' },
    side: EDITOR_OPEN,
    bar: EDITOR_OPEN,
};

// Where the pointer rests, and the centre of each edge handle.
const REST = { x: 560, y: 330 };
const HANDLE_AT: Record<'side' | 'bar', { x: number; y: number }> = {
    side: { x: 949, y: 300 },
    bar: { x: 480, y: 589 },
};

const Pointer = ({ x, y, shown }: { x: number; y: number; shown: boolean }) => (
    <svg className="cd-lm-cursor" style={{ left: x - 3, top: y - 2, opacity: shown ? 1 : 0 }} viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3 2l12.5 9.2-5.6.7 3.3 6.3-2.4 1.2-3.2-6.4L3.6 17z" fill="#fff" stroke="#000" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
);

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

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduced(mq.matches);
        const on = (e: MediaQueryListEvent) => setReduced(e.matches);
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, []);
    return reduced;
}

const Letter = ({ letter, bg, size = 20 }: { letter: string; bg: string; size?: number }) => (
    <span className="cd-lm-letter" style={{ background: bg, width: size, height: size }}>{letter}</span>
);

function EditorWindow({ layout }: { layout: Layout }) {
    return (
        <div className="cd-lm-editor cd-lm-anim" style={EDITOR[layout]}>
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
        <div className={`cd-lm-full cd-lm-anim${shown ? '' : ' is-hidden'}`}>
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

function SidebarTiles({ shown, reduced }: { shown: boolean; reduced: boolean }) {
    // Staggered like Notification Center cards sliding in.
    const delay = (i: number) => (reduced ? undefined : { transitionDelay: shown ? `${120 + i * 70}ms` : '0ms' });
    return (
        <div className={`cd-lm-side${shown ? '' : ' is-hidden'}`}>
            <div className="cd-lm-side-title" style={delay(0)}>my-app</div>
            <div className="cd-lm-tile" style={delay(1)}>
                <div className="cd-lm-label"><span className="bar" style={{ background: '#60a5fa' }} />Links</div>
                {LINKS.map((l) => (
                    <div key={l.label} className="cd-lm-row"><Letter letter={l.letter} bg={l.bg} />{l.label}{l.open && <span className="open" />}</div>
                ))}
            </div>
            <div className="cd-lm-tile" style={delay(2)}>
                <div className="cd-lm-label"><span className="bar" style={{ background: '#8b5cf6' }} />Apps</div>
                {APPS.map((a) => (
                    <div key={a.label} className="cd-lm-row"><a.icon style={{ width: 16, height: 16, color: a.color }} />{a.label}{a.open && <span className="open" />}</div>
                ))}
            </div>
            <div className="cd-lm-tile" style={delay(3)}>
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

export default function LayoutModesDemo() {
    const [layout, setLayout] = useState<Layout>('full');
    const [revealed, setRevealed] = useState(false);
    const [hot, setHot] = useState(false);
    const [pointer, setPointer] = useState({ ...REST, shown: false });
    const [userPicked, setUserPicked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [scale, setScale] = useState(0.56);
    const reduced = usePrefersReducedMotion();
    const stageRef = useRef<HTMLDivElement>(null);
    const collapseTimer = useRef<number | null>(null);

    // Scale the 960×600 desktop to the column width.
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

    useEffect(() => {
        const el = stageRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Autoplay: full window, then each drawer opened by a pointer on its handle.
    useEffect(() => {
        if (userPicked || reduced || !visible) return;
        let cancelled = false;
        const timers: number[] = [];
        const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));

        (async () => {
            let i = ORDER.indexOf(layout);
            while (!cancelled) {
                const mode = ORDER[i % ORDER.length];
                setLayout(mode);
                setRevealed(false);
                setHot(false);
                if (mode === 'full') {
                    setPointer({ ...REST, shown: false });
                    await wait(3000);
                } else {
                    setPointer({ ...REST, shown: true });
                    await wait(900);
                    if (cancelled) break;
                    setPointer({ ...HANDLE_AT[mode], shown: true });
                    await wait(800);
                    if (cancelled) break;
                    setHot(true);
                    await wait(220);
                    if (cancelled) break;
                    setRevealed(true);
                    await wait(2400);
                    if (cancelled) break;
                    setPointer({ ...REST, shown: true });
                    await wait(450);
                    if (cancelled) break;
                    setHot(false);
                    setRevealed(false);
                    await wait(1000);
                }
                i++;
            }
        })();

        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
        // `layout` only seeds where the loop starts; re-running on every step would restart it.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userPicked, reduced, visible]);

    const takeOver = () => {
        setUserPicked(true);
        setPointer((p) => ({ ...p, shown: false }));
    };

    const pick = (next: Layout) => {
        takeOver();
        setLayout(next);
        // Picking a drawer opens it so it's visible straight away.
        setRevealed(next !== 'full');
        setHot(false);
    };

    // Real drawer behaviour: hover the handle to open, leave the panel to close.
    const openDrawer = () => {
        takeOver();
        if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
        setHot(true);
        setRevealed(true);
    };
    const keepOpen = () => {
        if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
    };
    const scheduleCollapse = () => {
        if (!userPicked) return;
        if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
        collapseTimer.current = window.setTimeout(() => { setRevealed(false); setHot(false); }, 450);
    };
    useEffect(() => () => { if (collapseTimer.current) window.clearTimeout(collapseTimer.current); }, []);

    const index = ORDER.indexOf(layout);
    const drawer = layout === 'full' ? null : layout;

    return (
        <div className={`cd-lm${reduced ? ' reduced' : ''}`}>
            <div ref={stageRef} className="cd-lm-stage" style={{ height: DESK_H * scale }}>
                <div className="cd-lm-desktop" style={{ transform: `scale(${scale})` }}>
                    <div className="cd-lm-menubar">
                        <b>Code</b><span>File</span><span>Edit</span><span>View</span><span>Go</span>
                        <span className="cd-lm-menubar-right">Wed 10:42</span>
                    </div>
                    <EditorWindow layout={layout} />
                    <FullWindow shown={layout === 'full'} />

                    {/* Edge handles — hover to open, like the app */}
                    <div
                        className={`cd-lm-handle right${drawer === 'side' && !revealed ? '' : ' is-hidden'}${hot && drawer === 'side' ? ' is-hot' : ''}`}
                        onMouseEnter={openDrawer}
                        title="Open CoolDesk"
                    >
                        <span className="cd-lm-grip" />
                    </div>
                    <div
                        className={`cd-lm-handle bottom${drawer === 'bar' && !revealed ? '' : ' is-hidden'}${hot && drawer === 'bar' ? ' is-hot' : ''}`}
                        onMouseEnter={openDrawer}
                        title="Open CoolDesk"
                    >
                        <span className="cd-lm-grip" />
                    </div>

                    <div onMouseEnter={keepOpen} onMouseLeave={scheduleCollapse}>
                        <SidebarTiles shown={drawer === 'side' && revealed} reduced={reduced} />
                        <DockBar shown={drawer === 'bar' && revealed} />
                    </div>

                    <Pointer x={pointer.x} y={pointer.y} shown={pointer.shown && !reduced} />
                </div>
            </div>

            <div className="cd-lm-seg" role="tablist" aria-label="CoolDesk layouts">
                <span className="cd-lm-seg-thumb" style={{ transform: `translateX(${index * 100}%)` }} />
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        type="button"
                        role="tab"
                        aria-selected={layout === t.key}
                        onClick={() => pick(t.key)}
                    >
                        <t.icon />
                        {t.label}
                    </button>
                ))}
            </div>
            <p className="cd-lm-hint">
                {drawer
                    ? <>Sidebar and bar tuck away to a handle at the screen edge. Hover it to slide CoolDesk over your work.</>
                    : <>Switch anytime with <kbd>Ctrl+Shift+D</kbd></>}
            </p>
        </div>
    );
}

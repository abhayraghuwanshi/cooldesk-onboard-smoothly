import { usePrefersReducedMotion } from '@/lib/motion';
import { Check, Play, RotateCcw, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

/**
 * Small interactive models of how CoolDesk works, for /under-the-hood. Each
 * one runs the real rule with the real constants (sources in the page's
 * header comment); only the timing is sped up where waiting would be dull.
 */

// ─── Shared bits ────────────────────────────────────────────────────────────

export function ToyCard({ label, children, footer }: { label: string; children: ReactNode; footer?: ReactNode }) {
    return (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f]">
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">{label}</span>
            </div>
            <div className="p-5 md:p-6">{children}</div>
            {footer && <div className="border-t border-white/[0.07] px-5 py-3 text-sm text-white/45">{footer}</div>}
        </div>
    );
}

function Button({ onClick, children, variant = 'primary' }: { onClick: () => void; children: ReactNode; variant?: 'primary' | 'ghost' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                variant === 'primary'
                    ? 'inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-black transition-transform hover:-translate-y-px'
                    : 'inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-medium text-white/70 transition-colors hover:text-white'
            }
        >
            {children}
        </button>
    );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={on}
            onClick={() => onChange(!on)}
            className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${on ? 'border-sky-300/40 bg-sky-400/10 text-white' : 'border-white/10 bg-white/[0.02] text-white/55'}`}
        >
            {label}
            <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'bg-sky-400' : 'bg-white/15'}`}>
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} />
            </span>
        </button>
    );
}

// ─── 01 · The bridge: one jump, three deliveries, one action ───────────────

const LANES = [
    { name: 'WebSocket push', delay: 0 },
    { name: 'HTTP poll (1 s)', delay: 450 },
    { name: 'Sync socket', delay: 800 },
];
const TRAVEL_MS = 900;

export function BridgeToy() {
    const reduced = usePrefersReducedMotion();
    const [run, setRun] = useState(0);
    const [log, setLog] = useState<{ lane: string; acted: boolean }[]>([]);
    const timers = useRef<number[]>([]);

    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const send = () => {
        timers.current.forEach(clearTimeout);
        setLog([]);
        setRun((r) => r + 1);
        let handled = false;
        LANES.forEach((l) => {
            timers.current.push(
                window.setTimeout(() => {
                    const acted = !handled;
                    handled = true;
                    setLog((prev) => [...prev, { lane: l.name, acted }]);
                }, reduced ? 0 : l.delay + TRAVEL_MS),
            );
        });
    };

    return (
        <ToyCard label="Try it · jump to a tab" footer="The same tab within 10 s counts as already handled.">
            <div className="flex items-center justify-between text-xs font-medium text-white/50">
                <span>Desktop app · Spotlight</span>
                <span>Browser · extension</span>
            </div>
            <div className="mt-3 space-y-3">
                {LANES.map((l, i) => (
                    <div key={l.name} className="relative h-7 rounded-full border border-white/[0.07] bg-white/[0.02]">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-white/35">{l.name}</span>
                        {run > 0 && !reduced && (
                            <span
                                key={`${run}-${i}`}
                                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.9)]"
                                style={{ animation: `uth-travel ${TRAVEL_MS}ms ease-in ${l.delay}ms both` }}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
                <Button onClick={send}>
                    <Play className="h-4 w-4" fill="currentColor" /> Pick a tab in Spotlight
                </Button>
                <span className="text-sm text-white/45">{log.length ? `${log.length} delivered · ${log.filter((e) => e.acted).length} acted on` : 'Nothing sent yet'}</span>
            </div>
            {log.length > 0 && (
                <ul className="mt-4 space-y-1.5 font-mono text-xs">
                    {log.map((e, i) => (
                        <li key={i} className={e.acted ? 'text-emerald-300' : 'text-white/35'}>
                            {e.acted ? '✓ switched to the tab' : '· dropped, already handled'} <span className="text-white/30">via {e.lane}</span>
                        </li>
                    ))}
                </ul>
            )}
        </ToyCard>
    );
}

// ─── 02 · The new tab: who it's allowed to call ────────────────────────────

// connect-src from the extension's manifest.json (plus the extension itself).
const ALLOWED_HOSTS: { host: string; why: string }[] = [
    { host: '127.0.0.1', why: 'the desktop app on your machine' },
    { host: 'localhost', why: 'the desktop app on your machine' },
    { host: 'api.open-meteo.com', why: 'weather widget' },
    { host: 'api.coingecko.com', why: 'crypto widget' },
    { host: 'api.frankfurter.app', why: 'currency widget' },
    { host: 'en.wikipedia.org', why: 'on-this-day widget' },
    { host: 'api.unsplash.com', why: 'wallpapers' },
];
const TRY_HOSTS = ['api.open-meteo.com', 'google-analytics.com', '127.0.0.1', 'tracker.ads.example', 'api.coingecko.com'];

export function NewTabToy() {
    const [value, setValue] = useState('google-analytics.com');
    const host = value.trim().replace(/^https?:\/\//, '').split(/[/:]/)[0].toLowerCase();
    const match = ALLOWED_HOSTS.find((h) => h.host === host);

    return (
        <ToyCard label="Try it · can the new tab call this?" footer="Enforced by the browser through the page’s content security policy, not by our code.">
            <label className="block text-sm text-white/50" htmlFor="uth-host">
                A website the new tab tries to reach
            </label>
            <input
                id="uth-host"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                spellCheck={false}
                className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none focus:border-sky-300/50"
            />
            <div className="mt-3 flex flex-wrap gap-2">
                {TRY_HOSTS.map((h) => (
                    <button key={h} type="button" onClick={() => setValue(h)} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/55 hover:text-white">
                        {h}
                    </button>
                ))}
            </div>
            {host && (
                <div
                    className={`mt-5 flex items-center gap-3 rounded-2xl border px-4 py-3 ${match ? 'border-emerald-300/30 bg-emerald-400/10' : 'border-rose-300/30 bg-rose-400/10'}`}
                    aria-live="polite"
                >
                    {match ? <Check className="h-5 w-5 text-emerald-300" /> : <X className="h-5 w-5 text-rose-300" />}
                    <span className="text-sm text-white/85">
                        {match ? (
                            <>
                                Allowed: <span className="text-white/55">{match.why}</span>
                            </>
                        ) : (
                            <>Blocked. It isn’t on the list, so the browser refuses the connection.</>
                        )}
                    </span>
                </div>
            )}
        </ToyCard>
    );
}

// ─── 03 · Search: the real scoring ladder ──────────────────────────────────

/** Port of fuzzyScore (src/services/searchService.js), returning the rule too. */
function fuzzyScore(text: string, query: string): { score: number; rule: string } {
    if (!text || !query) return { score: 0, rule: '' };
    const t = text.toLowerCase();
    const q = query.toLowerCase();
    if (t === q) return { score: 100, rule: 'exact' };
    if (t.startsWith(q)) return { score: 95, rule: 'starts with' };
    const tw = t.split(/[\s\-_.]+/).filter(Boolean);
    const qw = q.split(/[\s\-_.]+/).filter(Boolean);
    if (qw.length === 1 && tw.some((w) => w.startsWith(q))) return { score: 90, rule: 'word starts with' };
    if (q.length >= 2 && tw.length > 1) {
        const acronym = tw.map((w) => w[0]).join('');
        if (acronym === q) return { score: 85, rule: 'acronym' };
        if (acronym.startsWith(q)) return { score: 82, rule: 'acronym start' };
    }
    if (t.includes(q)) return { score: 75, rule: 'contains' };
    if (qw.length > 1 && qw.every((w) => t.includes(w) || tw.some((x) => x.startsWith(w)))) {
        let last = -1;
        let inOrder = true;
        for (const w of qw) {
            const i = t.indexOf(w, last + 1);
            if (i === -1 || i <= last) {
                inOrder = false;
                break;
            }
            last = i;
        }
        return inOrder ? { score: 70, rule: 'words in order' } : { score: 65, rule: 'words, any order' };
    }
    if (tw.some((w) => w.includes(q))) return { score: 60, rule: 'inside a word' };
    let qi = 0;
    let matched = 0;
    let run = 0;
    let best = 0;
    for (let i = 0; i < t.length && qi < q.length; i++) {
        if (t[i] === q[qi]) {
            matched++;
            run++;
            best = Math.max(best, run);
            qi++;
        } else run = 0;
    }
    if (qi === q.length) return { score: Math.floor(30 + (matched / q.length) * 20 + (best / q.length) * 10), rule: 'letters in order' };
    return { score: 0, rule: '' };
}

const SEARCH_ITEMS = [
    'Visual Studio Code',
    'Visual Studio',
    'Slack',
    'Spotify',
    'Safari',
    'System Settings',
    'Figma',
    'GitHub Pull Requests',
    'Google Calendar',
    'Terminal',
    'Notion',
    'Vercel Dashboard',
];

export function SearchToy() {
    const [q, setQ] = useState('vs');
    const results = useMemo(
        () =>
            SEARCH_ITEMS.map((name) => ({ name, ...fuzzyScore(name, q.trim()) }))
                .filter((r) => r.score > 0)
                .sort((a, b) => b.score - a.score),
        [q],
    );

    return (
        <ToyCard label="Try it · the real scoring" footer="Each result takes the score of the first rule it passes.">
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Type like you would in Spotlight…"
                spellCheck={false}
                aria-label="Search query"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none focus:border-sky-300/50"
            />
            <div className="mt-2 flex flex-wrap gap-2">
                {['vsc', 'vs', 'stu', 'code visual', 'sttngs', 'pr'].map((s) => (
                    <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/55 hover:text-white">
                        {s}
                    </button>
                ))}
            </div>
            <ul className="mt-5 space-y-2" aria-live="polite">
                {results.length === 0 && <li className="text-sm text-white/40">No match: every rule says 0.</li>}
                {results.slice(0, 6).map((r) => (
                    <li key={r.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                        <div className="relative h-9 overflow-hidden rounded-lg bg-white/[0.04]">
                            <div className="absolute inset-y-0 left-0 bg-sky-400/25 transition-all duration-300" style={{ width: `${r.score}%` }} />
                            <span className="relative flex h-full items-center px-3 text-sm text-white">{r.name}</span>
                        </div>
                        <span className="w-36 text-right font-mono text-xs text-white/50">
                            <span className="text-sm font-semibold text-white">{r.score}</span> · {r.rule}
                        </span>
                    </li>
                ))}
            </ul>
        </ToyCard>
    );
}

// ─── 04 · Ranking: half-life and log scaling ───────────────────────────────

const HALF_LIFE = 3;

export function RankingToy() {
    const [minutes, setMinutes] = useState(120);
    const [days, setDays] = useState(2);
    const [open, setOpen] = useState(false);

    const weight = Math.pow(0.5, days / HALF_LIFE);
    const score = Math.log1p(minutes * weight) + (open ? 2 : 0);

    // Decay curve over the 14-day window
    const W = 320;
    const H = 120;
    const pts = Array.from({ length: 57 }, (_, i) => {
        const d = (i / 56) * 14;
        return `${(d / 14) * W},${H - Math.pow(0.5, d / HALF_LIFE) * (H - 8)}`;
    }).join(' ');
    const mx = (days / 14) * W;
    const my = H - weight * (H - 8);

    return (
        <ToyCard label="Try it · how much an item counts" footer="Score = ln(1 + minutes × 0.5^(days ÷ 3)) + 2 if it’s open now.">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="space-y-5">
                    <label className="block text-sm text-white/60">
                        Used for <span className="font-mono text-white">{minutes} min</span>
                        <input type="range" min={0} max={600} step={10} value={minutes} onChange={(e) => setMinutes(+e.target.value)} className="mt-2 w-full accent-sky-300" />
                    </label>
                    <label className="block text-sm text-white/60">
                        …this many days ago: <span className="font-mono text-white">{days}</span>
                        <input type="range" min={0} max={14} step={1} value={days} onChange={(e) => setDays(+e.target.value)} className="mt-2 w-full accent-sky-300" />
                    </label>
                    <Toggle on={open} onChange={setOpen} label="It’s open right now" />
                </div>
                <div>
                    <svg viewBox={`-6 -6 ${W + 12} ${H + 28}`} className="w-full" role="img" aria-label={`Decay curve; ${days} days ago counts ${Math.round(weight * 100)}%`}>
                        <polyline points={pts} fill="none" className="stroke-sky-300/70" strokeWidth="2" />
                        <line x1={mx} y1={my} x2={mx} y2={H} className="stroke-white/20" strokeDasharray="3 3" />
                        <circle cx={mx} cy={my} r="5" className="fill-white" />
                        <text x="0" y={H + 18} className="fill-white/40 text-[10px]">today</text>
                        <text x={W} y={H + 18} textAnchor="end" className="fill-white/40 text-[10px]">14 days</text>
                    </svg>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-white/[0.04] p-3">
                            <div className="font-mono text-xl text-white">{Math.round(weight * 100)}%</div>
                            <div className="text-xs text-white/45">of that time still counts</div>
                        </div>
                        <div className="rounded-xl bg-white/[0.04] p-3">
                            <div className="font-mono text-xl text-white">{score.toFixed(2)}</div>
                            <div className="text-xs text-white/45">ranking score</div>
                        </div>
                    </div>
                </div>
            </div>
        </ToyCard>
    );
}

// ─── 05 · Apps: a scan storm, absorbed ─────────────────────────────────────

const CALLERS = 10;
const SCAN_CACHE_MS = 10_000;

export function ScanToy() {
    const [phase, setPhase] = useState<'idle' | 'scanning' | 'done'>('idle');
    const [fromCache, setFromCache] = useState(false);
    const [scans, setScans] = useState(0);
    const lastScan = useRef(0);
    const timer = useRef<number>();

    useEffect(() => () => clearTimeout(timer.current), []);

    const storm = () => {
        clearTimeout(timer.current);
        if (Date.now() - lastScan.current < SCAN_CACHE_MS) {
            setFromCache(true);
            setPhase('done');
            return;
        }
        setFromCache(false);
        setPhase('scanning');
        timer.current = window.setTimeout(() => {
            lastScan.current = Date.now();
            setScans((n) => n + 1);
            setPhase('done');
        }, 900);
    };

    return (
        <ToyCard label="Try it · 10 parts of the UI ask at once" footer="Click again within 10 s: nobody scans at all.">
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {Array.from({ length: CALLERS }, (_, i) => {
                    const winner = i === 0 && !fromCache;
                    const state = phase === 'idle' ? 'idle' : phase === 'scanning' ? (winner ? 'scan' : 'wait') : 'done';
                    return (
                        <div
                            key={i}
                            className={`flex h-14 flex-col items-center justify-center rounded-xl border text-[10px] font-medium transition-colors ${
                                state === 'scan'
                                    ? 'animate-pulse border-amber-300/50 bg-amber-400/15 text-amber-200'
                                    : state === 'wait'
                                      ? 'border-white/10 bg-white/[0.03] text-white/40'
                                      : state === 'done'
                                        ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-200'
                                        : 'border-white/10 bg-white/[0.02] text-white/30'
                            }`}
                        >
                            <span className="font-mono text-xs">#{i + 1}</span>
                            {state === 'scan' ? 'scanning' : state === 'wait' ? 'waiting' : state === 'done' ? (winner ? 'scanned' : 'cached') : ''}
                        </div>
                    );
                })}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
                <Button onClick={storm}>
                    <Play className="h-4 w-4" fill="currentColor" /> Open Spotlight
                </Button>
                <span className="text-sm text-white/50" aria-live="polite">
                    {phase === 'done' && (fromCache ? '10 answers · 0 scans (cache was fresh)' : '10 answers · 1 scan · 9 waited for it')}
                    {phase === 'scanning' && 'One scan running; the rest wait on the lock…'}
                </span>
                <span className="ml-auto font-mono text-xs text-white/35">total scans: {scans}</span>
            </div>
        </ToyCard>
    );
}

// ─── 06 · Time tracking: the sampler, sped up ──────────────────────────────

/** sampler.rs: full credit ≤120 s idle, half up to 300 s, none after. */
const inputWeight = (idle: number) => (idle <= 120 ? 1 : idle <= 300 ? 0.5 : 0);

function attribute(focused: boolean, idle: number, sound: boolean) {
    const w = inputWeight(idle);
    if (focused && w > 0) return { kind: 'active' as const, credit: 30 * w, text: w === 1 ? 'Active time, full credit' : 'Active time, half credit (you’re probably reading)' };
    if (focused && sound) return { kind: 'media' as const, credit: 30, text: 'Media time: watching something' };
    if (!focused && sound) return { kind: 'passive' as const, credit: 30, text: 'Passive media: music on the side' };
    return { kind: 'none' as const, credit: 0, text: 'Nothing: open isn’t used' };
}

export function TimeToy() {
    const reduced = usePrefersReducedMotion();
    const [focused, setFocused] = useState(true);
    const [idle, setIdle] = useState(20);
    const [sound, setSound] = useState(false);
    const [totals, setTotals] = useState({ active: 0, media: 0, passive: 0 });
    const [tick, setTick] = useState(0);
    const a = attribute(focused, idle, sound);
    const latest = useRef(a);
    latest.current = a;

    // One "30 s" sample every 1.5 s of real time.
    useEffect(() => {
        if (reduced) return;
        const id = window.setInterval(() => {
            const cur = latest.current;
            setTick((t) => t + 1);
            if (cur.kind !== 'none') setTotals((p) => ({ ...p, [cur.kind]: p[cur.kind] + cur.credit }));
        }, 1500);
        return () => clearInterval(id);
    }, [reduced]);

    const fmt = (s: number) => `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;

    return (
        <ToyCard
            label="Try it · one sample every 30 s (sped up)"
            footer={
                <span className="flex items-center justify-between gap-3">
                    <span>Samples taken: {tick}</span>
                    <button type="button" onClick={() => setTotals({ active: 0, media: 0, passive: 0 })} className="inline-flex items-center gap-1 text-white/50 hover:text-white">
                        <RotateCcw className="h-3.5 w-3.5" /> Reset
                    </button>
                </span>
            }
        >
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                    <Toggle on={focused} onChange={setFocused} label="The app’s window is focused" />
                    <Toggle on={sound} onChange={setSound} label="It’s playing sound" />
                    <label className="block rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/60">
                        Last keypress or click: <span className="font-mono text-white">{idle}s ago</span>
                        <input type="range" min={0} max={400} step={10} value={idle} onChange={(e) => setIdle(+e.target.value)} className="mt-2 w-full accent-sky-300" />
                    </label>
                </div>
                <div className="flex flex-col gap-3">
                    <div
                        key={tick}
                        className={`rounded-2xl border px-4 py-4 motion-safe:animate-in motion-safe:fade-in duration-300 ${a.kind === 'none' ? 'border-white/10 text-white/50' : 'border-sky-300/30 bg-sky-400/10 text-white'}`}
                        aria-live="polite"
                    >
                        <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/40">This sample</div>
                        <div className="mt-1 text-base font-semibold">{a.text}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {(['active', 'media', 'passive'] as const).map((k) => (
                            <div key={k} className={`rounded-xl p-3 ${a.kind === k ? 'bg-sky-400/15' : 'bg-white/[0.04]'}`}>
                                <div className="font-mono text-sm text-white">{fmt(totals[k])}</div>
                                <div className="text-xs capitalize text-white/45">{k}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToyCard>
    );
}

// ─── 07 · Files: a download, settled ───────────────────────────────────────

const DOWNLOAD_EVENTS = [
    { at: 0, label: 'create  report.pdf.crdownload' },
    { at: 120, label: 'write   +2 MB' },
    { at: 240, label: 'write   +2 MB' },
    { at: 360, label: 'write   +1 MB' },
    { at: 480, label: 'rename  → report.pdf' },
];
const SETTLE = 300;

export function DownloadToy() {
    const [shown, setShown] = useState(0);
    const [refreshed, setRefreshed] = useState(false);
    const timers = useRef<number[]>([]);
    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const simulate = () => {
        timers.current.forEach(clearTimeout);
        setShown(0);
        setRefreshed(false);
        const slow = 3; // stretch it so you can watch
        DOWNLOAD_EVENTS.forEach((e, i) => timers.current.push(window.setTimeout(() => setShown(i + 1), e.at * slow)));
        const last = DOWNLOAD_EVENTS[DOWNLOAD_EVENTS.length - 1].at;
        timers.current.push(window.setTimeout(() => setRefreshed(true), (last + SETTLE) * slow));
    };

    return (
        <ToyCard label="Try it · a file lands in Downloads" footer="Every event restarts a 300 ms timer; the list refreshes when it runs out.">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_200px]">
                <ol className="space-y-1.5 font-mono text-xs">
                    {DOWNLOAD_EVENTS.map((e, i) => (
                        <li key={i} className={`flex gap-3 transition-opacity ${i < shown ? 'opacity-100' : 'opacity-20'}`}>
                            <span className="w-14 text-right text-white/35">{e.at} ms</span>
                            <span className="text-white/75">{e.label}</span>
                        </li>
                    ))}
                    <li className={`flex gap-3 transition-opacity ${refreshed ? 'opacity-100' : 'opacity-20'}`}>
                        <span className="w-14 text-right text-white/35">{DOWNLOAD_EVENTS[DOWNLOAD_EVENTS.length - 1].at + SETTLE} ms</span>
                        <span className="text-emerald-300">✓ file list refreshes once</span>
                    </li>
                </ol>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                    <div className="rounded-xl bg-white/[0.04] p-3">
                        <div className="font-mono text-xl text-white/40 line-through">5</div>
                        <div className="text-xs text-white/45">refreshes without settling</div>
                    </div>
                    <div className="rounded-xl bg-emerald-400/10 p-3">
                        <div className="font-mono text-xl text-emerald-200">{refreshed ? 1 : 0}</div>
                        <div className="text-xs text-white/45">refreshes with it</div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <Button onClick={simulate}>
                    <Play className="h-4 w-4" fill="currentColor" /> Simulate a download
                </Button>
            </div>
        </ToyCard>
    );
}

// ─── 08 · Sync: merge by id, newest wins, URLs normalised ──────────────────

/** Port of normalize_url (src-tauri/src/sidecar/sync.rs). */
function normalizeUrl(url: string) {
    try {
        const u = new URL(url.startsWith('http') ? url : `https://${url}`);
        return `${u.protocol}//${u.hostname.replace(/^www\./, '').toLowerCase()}${u.pathname.replace(/\/+$/, '')}${u.search}`;
    } catch {
        return url.toLowerCase();
    }
}

export function SyncToy() {
    const [merged, setMerged] = useState(false);
    const ext = { url: 'https://www.github.com/acme/app/', note: 'Ship v2 Friday', at: '10:02' };
    const app = { url: 'github.com/acme/app', note: 'Ship v2 Monday', at: '10:41' };
    const same = normalizeUrl(ext.url) === normalizeUrl(app.url);

    const Card = ({ who, v, win }: { who: string; v: typeof ext; win?: boolean }) => (
        <div className={`rounded-2xl border p-4 transition-colors ${merged ? (win ? 'border-emerald-300/40 bg-emerald-400/10' : 'border-white/5 opacity-40') : 'border-white/10 bg-white/[0.02]'}`}>
            <div className="text-xs font-medium text-white/45">{who}</div>
            <div className="mt-2 break-all font-mono text-xs text-white/70">{v.url}</div>
            <div className="mt-2 text-sm text-white">“{v.note}”</div>
            <div className="mt-1 font-mono text-xs text-white/40">edited {v.at}</div>
        </div>
    );

    return (
        <ToyCard label="Try it · the same note, edited in two places">
            <div className="grid gap-3 sm:grid-cols-2">
                <Card who="In the browser extension" v={ext} />
                <Card who="In the desktop app" v={app} win />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
                <Button onClick={() => setMerged((m) => !m)}>{merged ? 'Undo' : 'Sync them'}</Button>
                {merged && (
                    <span className="text-sm text-white/60" aria-live="polite">
                        {same ? 'Same link once normalised (no www, no trailing slash) → newest edit wins: “Ship v2 Monday”.' : ''}
                    </span>
                )}
            </div>
        </ToyCard>
    );
}

// ─── 09 · macOS: public API vs the private one ─────────────────────────────

export function MacToy() {
    const [privateApi, setPrivateApi] = useState(true);
    return (
        <ToyCard label="Try it · press Alt+K over a fullscreen app">
            <div className="flex gap-2">
                {[
                    { v: false, label: 'Apple’s public API' },
                    { v: true, label: 'Private CGS API' },
                ].map((o) => (
                    <button
                        key={o.label}
                        type="button"
                        onClick={() => setPrivateApi(o.v)}
                        aria-pressed={privateApi === o.v}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${privateApi === o.v ? 'bg-white/[0.12] text-white' : 'text-white/50 hover:text-white/80'}`}
                    >
                        {o.label}
                    </button>
                ))}
            </div>
            <div className="mt-5 grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-3">
                {/* The fullscreen Space you're in */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#1e1e24]">
                    <div className="absolute inset-x-0 top-0 flex h-6 items-center bg-black/40 px-3 font-mono text-[10px] text-white/40">VS Code · fullscreen Space</div>
                    <div className="absolute inset-x-4 top-10 space-y-2">
                        {[70, 45, 60, 35, 52].map((w, i) => (
                            <div key={i} className="h-2 rounded-full bg-white/10" style={{ width: `${w}%` }} />
                        ))}
                    </div>
                    {privateApi && (
                        <div className="absolute left-1/2 top-1/2 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/20 bg-black/80 p-3 shadow-2xl motion-safe:animate-in motion-safe:zoom-in-95 duration-200">
                            <div className="font-mono text-[11px] text-white/80">&gt; my-app</div>
                            <div className="mt-2 h-2 w-4/5 rounded-full bg-sky-400/40" />
                            <div className="mt-1.5 h-2 w-3/5 rounded-full bg-white/10" />
                        </div>
                    )}
                </div>
                {/* Your normal desktop, off to the side */}
                <div className="relative overflow-hidden rounded-xl border border-dashed border-white/10 bg-white/[0.02]">
                    <div className="p-2 font-mono text-[10px] text-white/35">Desktop 1</div>
                    {!privateApi && (
                        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 rounded-lg border border-white/20 bg-black/70 p-2 motion-safe:animate-in motion-safe:fade-in duration-200">
                            <div className="font-mono text-[9px] text-white/70">&gt; my-app</div>
                        </div>
                    )}
                </div>
            </div>
            <p className="mt-4 text-sm text-white/55" aria-live="polite">
                {privateApi
                    ? 'Spotlight joins the Space you’re looking at, right on top of VS Code.'
                    : 'Spotlight opens… on your normal desktop, where you can’t see it.'}
            </p>
        </ToyCard>
    );
}

// ─── 10 · AI: look, don't touch ────────────────────────────────────────────

export function AgentToy() {
    const [applied, setApplied] = useState(false);
    return (
        <ToyCard label="Try it · ask the agent">
            <div className="space-y-3 text-sm">
                <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.08] px-4 py-2.5 text-white">Which of my tabs belong to the launch?</div>
                <div className="w-fit max-w-[90%] rounded-xl border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs text-white/55">
                    → tools/call <span className="text-sky-300">list_tabs</span> <span className="text-white/35">(read-only)</span>
                    <br />← 23 tabs
                </div>
                <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-white/85">These 5 look like the launch: Product Hunt draft, landing page, Stripe, analytics and the changelog.</div>
                    <div className="mt-3 rounded-xl border border-emerald-300/25 bg-emerald-400/[0.07] p-3">
                        <div className="font-mono text-xs text-emerald-200">proposed: add 5 links to “Launch”</div>
                        <div className="mt-3 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setApplied((a) => !a)}
                                className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors ${applied ? 'bg-emerald-400 text-black' : 'bg-white text-black'}`}
                            >
                                {applied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5" /> Applied
                                    </>
                                ) : (
                                    'Apply'
                                )}
                            </button>
                            <span className="text-xs text-white/45">{applied ? 'You did that, not the agent.' : 'Nothing changes until you press it.'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ToyCard>
    );
}

// ─── 11 · Every cache, on one log scale ────────────────────────────────────

const CACHE_BARS: { what: string; ms: number; label: string; why: string }[] = [
    { what: 'Folder change events', ms: 300, label: '300 ms', why: 'A download is create → grow → rename; re-list once.' },
    { what: 'Apps list', ms: 10_000, label: '10 s', why: 'Many parts of the UI ask at once; one scan answers all.' },
    { what: 'Jump-to-tab deliveries', ms: 10_000, label: '10 s', why: 'Three channels may deliver the same jump.' },
    { what: 'Browsing activity reads', ms: 30_000, label: '30 s', why: 'The new tab reads it often.' },
    { what: 'Projects with dev servers', ms: 60_000, label: '60 s', why: 'The Local tab polls; the disk walk needn’t.' },
    { what: 'Usage scores for ranking', ms: 300_000, label: '5 min', why: 'Read on every keystroke.' },
    { what: 'Latest release (this site)', ms: 300_000, label: '5 min', why: 'Keeps spikes off GitHub’s 60 req/h.' },
    { what: 'App categories, shell PATH', ms: 3_600_000, label: 'session', why: 'Looked up once per app / per launch.' },
];

export function CacheChart() {
    const min = Math.log10(100);
    const max = Math.log10(3_600_000);
    const pct = (ms: number) => ((Math.log10(ms) - min) / (max - min)) * 100;
    return (
        <ToyCard label="Every cache · log scale" footer="Hover a row for why it exists.">
            <ul className="space-y-2.5">
                {CACHE_BARS.map((c) => (
                    <li key={c.what} title={c.why} className="group grid grid-cols-[150px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[210px_minmax(0,1fr)]">
                        <span className="truncate text-sm text-white/70 group-hover:text-white">{c.what}</span>
                        <div className="relative h-7 rounded-lg bg-white/[0.03]">
                            <div
                                className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-sky-400/20 to-sky-300/50 transition-all group-hover:to-sky-300/80"
                                style={{ width: `${Math.max(6, pct(c.ms))}%` }}
                            />
                            <span className="absolute inset-y-0 left-2 flex items-center font-mono text-xs text-white">{c.label}</span>
                            <span className="absolute inset-y-0 right-2 hidden items-center text-xs text-white/40 md:group-hover:flex">{c.why}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-3 grid grid-cols-[150px_minmax(0,1fr)] gap-3 sm:grid-cols-[210px_minmax(0,1fr)]">
                <span />
                <div className="relative h-4 font-mono text-[10px] text-white/30">
                    {[
                        [100, '0.1 s'],
                        [1000, '1 s'],
                        [10_000, '10 s'],
                        [60_000, '1 min'],
                        [3_600_000, '1 h'],
                    ].map(([ms, label]) => (
                        <span key={label} className="absolute whitespace-nowrap -translate-x-1/2 last:-translate-x-full first:translate-x-0" style={{ left: `${pct(ms as number)}%` }}>
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </ToyCard>
    );
}

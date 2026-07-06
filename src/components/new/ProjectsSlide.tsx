import React from "react";

/**
 * Projects slide — answers the quiet objection "how much setup will this
 * cost me?" with a three-beat auto-playing demo: name the project, accept
 * the tabs CoolDesk gathered, and (weeks later) reopen everything in one
 * click. Steps on the left double as the scene switcher; the panel is
 * decorative, the step copy carries the content.
 */

const STEPS = [
  {
    tag: "01",
    title: "Create it in the app",
    body: "Name the project in the desktop app. One field — that's the whole form.",
  },
  {
    tag: "02",
    title: "AI does the gathering",
    body: "It groups the tabs and pages that belong together and suggests them. Accept once.",
  },
  {
    tag: "03",
    title: "Find it in Spotlight",
    body: "Alt + K from anywhere — the project and everything in it is one search away, and one click reopens it all.",
  },
];

const SCENE_MS = 4200;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function ProjectsSlide() {
  const [scene, setScene] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const reduced = usePrefersReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!inView || paused || reduced) return;
    const id = setInterval(() => setScene((s) => (s + 1) % STEPS.length), SCENE_MS);
    return () => clearInterval(id);
  }, [inView, paused, reduced]);

  // Entrance animation for elements inside the active scene
  const enter = (delay: number): React.CSSProperties | undefined =>
    reduced ? undefined : { animation: `fadeInUp 0.45s ease-out ${delay}s both` };

  return (
    <div ref={rootRef} className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-10 lg:gap-14 items-center">
      {/* Copy + step switcher */}
      <div>
        <p className="text-[10px] font-mono font-medium text-txt-muted uppercase tracking-[0.25em] mb-3">
          Project workspaces
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Projects take ten seconds.
        </h2>
        <p className="text-sm text-txt-secondary mt-3 max-w-md">
          The catch with every organiser is the filing it demands. CoolDesk
          skips it — create the project in the app, let AI gather what belongs
          to it, and it's in Spotlight from then on.
        </p>

        <div className="mt-8 space-y-2">
          {STEPS.map((step, i) => (
            <button
              key={step.tag}
              type="button"
              onClick={() => setScene(i)}
              aria-pressed={scene === i}
              className={`w-full text-left flex gap-4 rounded-xl border px-4 py-3.5 transition-colors duration-300 ${
                scene === i
                  ? "border-sky-400/40 bg-sky-400/[0.06]"
                  : "border-white/10 bg-transparent hover:bg-white/[0.03]"
              }`}
            >
              <span
                className={`font-mono text-xs pt-0.5 transition-colors duration-300 ${
                  scene === i ? "text-sky-300" : "text-txt-muted"
                }`}
              >
                {step.tag}
              </span>
              <span>
                <span className={`block text-sm font-semibold transition-colors duration-300 ${scene === i ? "text-white" : "text-txt-secondary"}`}>
                  {step.title}
                </span>
                <span className="block text-xs text-txt-muted mt-0.5 leading-relaxed">
                  {step.body}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Demo panel (decorative — the steps carry the content) */}
      <div
        aria-hidden="true"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative rounded-2xl border border-white/15 bg-[#0a0d13] overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
          <span className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
            {STEPS[scene].tag} / {STEPS[scene].title}
          </span>
        </div>

        <div className="relative h-[300px] sm:h-[320px] p-5 sm:p-6">
          {scene === 0 && <SceneName key="s0" enter={enter} />}
          {scene === 1 && <SceneGather key="s1" enter={enter} />}
          {scene === 2 && <SceneRestore key="s2" enter={enter} />}
        </div>
      </div>
    </div>
  );
}

type SceneProps = { enter: (delay: number) => React.CSSProperties | undefined };

/* ————— 01: name it in the desktop app ————— */

function SceneName({ enter }: SceneProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-white/15 bg-[#0c0f16] shadow-2xl overflow-hidden" style={enter(0)}>
        {/* desktop app titlebar */}
        <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border-b border-white/10">
          <span className="text-[10px] font-semibold text-white/60 tracking-wide">CoolDesk</span>
          <span className="font-mono text-[9px] text-white/30 tracking-widest">— ▢ ✕</span>
        </div>
        <div className="p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-txt-muted mb-2">New project</p>
          <div className="flex items-center rounded-lg border border-sky-400/40 bg-white/[0.03] px-3 py-2.5">
            <span className="font-mono text-sm text-white">
              Client redesign
              <span className="inline-block w-[7px] h-[15px] bg-sky-400 align-text-bottom ml-px animate-blink" />
            </span>
          </div>
          <div className="mt-3 inline-flex items-center rounded-lg bg-sky-500/15 border border-sky-400/40 px-3 py-1.5" style={enter(0.4)}>
            <span className="text-xs font-semibold text-sky-300">Create</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-txt-muted mt-4" style={enter(0.7)}>
        One field. That's the whole form.
      </p>
    </div>
  );
}

/* ————— 02: suggested tabs drop in ————— */

const GATHERED = [
  { dot: "bg-orange-400", title: "Figma — Homepage v3", domain: "figma.com" },
  { dot: "bg-white/70", title: "Redesign brief", domain: "notion.so" },
  { dot: "bg-fuchsia-400", title: "#client-redesign", domain: "slack.com" },
  { dot: "bg-white/50", title: "PR #142 — new nav", domain: "github.com" },
  { dot: "bg-green-400", title: "Budget — Q3", domain: "sheets.google.com" },
];

function SceneGather({ enter }: SceneProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2" style={enter(0)}>
        <FolderIcon className="w-4 h-4 text-sky-400" />
        <span className="text-sm font-semibold text-white">Client redesign</span>
        <span className="text-[9px] font-mono uppercase tracking-wider text-sky-300/80 border border-sky-400/30 rounded px-1.5 py-0.5">New</span>
      </div>
      <div className="flex items-center justify-between gap-3 mt-3 rounded-lg border border-sky-400/25 bg-sky-400/[0.06] px-3 py-2" style={enter(0.15)}>
        <span className="text-xs text-sky-200/90">✦ AI grouped 5 tabs that belong here</span>
        <span className="text-[11px] font-semibold text-sky-300 whitespace-nowrap">Add all →</span>
      </div>
      <div className="mt-3 space-y-1.5">
        {GATHERED.map((t, i) => (
          <div
            key={t.title}
            className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
            style={enter(0.5 + i * 0.18)}
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${t.dot}`} />
            <span className="text-xs text-white/85 truncate">{t.title}</span>
            <span className="ml-auto text-[10px] font-mono text-txt-muted shrink-0">{t.domain}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ————— 03: it lives in Spotlight now ————— */

function SceneRestore({ enter }: SceneProps) {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="rounded-xl border border-white/15 bg-[#0c0f16] shadow-2xl overflow-hidden" style={enter(0)}>
        {/* spotlight input */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/10">
          <SearchIcon className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="font-mono text-sm text-white">
            client
            <span className="inline-block w-[7px] h-[15px] bg-sky-400 align-text-bottom ml-px animate-blink" />
          </span>
          <kbd className="ml-auto text-[10px] font-mono text-txt-muted border border-white/15 rounded px-1.5 py-0.5 shrink-0">Alt + K</kbd>
        </div>
        {/* project result + what's inside */}
        <div className="p-1.5">
          <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.06] ring-1 ring-inset ring-white/10 px-2.5 py-2" style={enter(0.3)}>
            <FolderIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="text-[13px] text-white font-semibold truncate">Client redesign</span>
            <span className="ml-auto text-[9px] font-mono uppercase tracking-wider text-sky-300/80 shrink-0">Project · Open all ↵</span>
          </div>
          {GATHERED.slice(0, 3).map((t, i) => (
            <div key={t.title} className="flex items-center gap-2.5 px-2.5 py-2" style={enter(0.5 + i * 0.15)}>
              <span className={`w-2 h-2 rounded-full shrink-0 ${t.dot}`} />
              <span className="text-[13px] text-txt-secondary truncate">{t.title}</span>
              <span className="ml-auto text-[9px] font-mono uppercase tracking-wider text-txt-muted shrink-0">In project</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-txt-muted mt-4 text-center" style={enter(1)}>
        One keystroke from anywhere — enter reopens the whole project.
      </p>
    </div>
  );
}

/* ————— icons ————— */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  );
}

export default ProjectsSlide;

import React from "react";

/**
 * "FIG. 1 — SPOTLIGHT ASSEMBLY" — the architecture as an engineering
 * drawing: hairline strokes, numbered callout balloons, dimension lines,
 * a parts schedule and a title block. Both parts are drawn solid — the
 * extension and desktop app are peers that sync directly with each other
 * (127.0.0.1:4545, per src-tauri/src/sidecar/server.rs) as well as both
 * feeding Spotlight. Lines draft themselves in when scrolled into view.
 */

const INK = "rgba(255,255,255,0.55)"; // primary line work
const INK_FAINT = "rgba(255,255,255,0.22)"; // secondary line work
const INK_TEXT = "rgba(255,255,255,0.85)"; // part names
const INK_LABEL = "rgba(255,255,255,0.45)"; // annotations
const ACCENT = "#7dd3fc"; // drafting cyan — callouts, Alt+K

function ArchitectureDiagram() {
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = React.useState(false);

  React.useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-12">
        <p className="text-[10px] font-mono font-medium text-txt-muted uppercase tracking-[0.25em] mb-3">
          Fig. 1 — how the pieces fit
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Two apps. One Spotlight.
        </h2>
        <p className="text-sm text-txt-secondary mt-2 max-w-md mx-auto">
          The extension organises your browser. The desktop app adds native
          app search, the taskbar and the AI agent — synced locally, both ways.{' '}
          <kbd className="font-mono text-xs text-white/80 border border-white/15 rounded px-1.5 py-0.5 mx-0.5">Alt&thinsp;+&thinsp;K</kbd> searches it all.
        </p>
      </div>

      {/* Drawing sheet */}
      <div
        ref={sheetRef}
        className={`relative border border-white/25 bg-[#0a0d13] [background-image:linear-gradient(rgba(125,211,252,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.04)_1px,transparent_1px)] [background-size:26px_26px] ${
          drawn ? "bp-draw" : "bp-hidden"
        }`}
      >
        {/* inner sheet frame */}
        <div aria-hidden="true" className="absolute inset-1.5 border border-white/10 pointer-events-none" />

        {/* The drawing */}
        <div className="overflow-x-auto scrollbar-hide p-3 sm:p-5">
          <svg
            viewBox="0 0 760 472"
            className="min-w-[600px] w-full h-auto font-mono"
            role="img"
            aria-label="System assembly drawing: the browser extension (item 1) and the desktop app (item 2) sync with each other locally and both feed into Spotlight (item 3), opened with Alt+K"
          >
            <defs>
              <pattern id="bpHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke={ACCENT} strokeOpacity="0.28" strokeWidth="1" />
              </pattern>
            </defs>

            {/* ————— centerline ————— */}
            <text x="380" y="12" textAnchor="middle" fontSize="7.5" fill={INK_FAINT} data-fade style={{ animationDelay: "1.2s" }}>C/L</text>
            <line x1="380" y1="18" x2="380" y2="460" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="14 5 2 5" data-fade style={{ animationDelay: "1s" }} />

            {/* ————— overall dimension (top) ————— */}
            <path d="M70 46 V22 M690 46 V22 M70 27 H300 M460 27 H690" fill="none" stroke={INK_FAINT} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "1s" }} />
            <path d="M70 27 l9 -3.5 v7 z M690 27 l-9 -3.5 v7 z" fill={INK_FAINT} data-fade style={{ animationDelay: "1.1s" }} />
            <text x="380" y="30" textAnchor="middle" fontSize="9" letterSpacing="2" fill={INK_LABEL} data-fade style={{ animationDelay: "1.1s" }}>
              YOUR ENTIRE OS
            </text>

            {/* ————— item 1: browser extension ————— */}
            <rect x="70" y="50" width="250" height="140" fill="none" stroke={INK} strokeWidth="1.2" data-draw pathLength={1} />
            <line x1="70" y1="84" x2="320" y2="84" stroke={INK_FAINT} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "0.3s" }} />
            <text x="85" y="72" fontSize="11" letterSpacing="2" fill={INK_TEXT} data-fade style={{ animationDelay: "0.8s" }}>
              BROWSER EXTENSION
            </text>
            {/* tab strip */}
            <rect x="85" y="96" width="42" height="14" fill="url(#bpHatch)" stroke={INK} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "0.35s" }} />
            <rect x="133" y="96" width="42" height="14" fill="none" stroke={INK_FAINT} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "0.4s" }} />
            <rect x="181" y="96" width="42" height="14" fill="none" stroke={INK_FAINT} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "0.45s" }} />
            <text x="232" y="107" fontSize="10" fill={INK_LABEL} data-fade style={{ animationDelay: "0.8s" }}>+</text>
            <g data-fade style={{ animationDelay: "0.85s" }}>
              <text x="85" y="136" fontSize="9.5" letterSpacing="1" fill={INK_LABEL}>· TABS</text>
              <text x="85" y="156" fontSize="9.5" letterSpacing="1" fill={INK_LABEL}>· NOTES</text>
              <text x="195" y="136" fontSize="9.5" letterSpacing="1" fill={INK_LABEL}>· WORKSPACES</text>
              <text x="195" y="156" fontSize="9.5" letterSpacing="1" fill={INK_LABEL}>· BOOKMARKS</text>
            </g>

            {/* ————— item 2: desktop app — solid outline, peer to item 1 ————— */}
            <rect x="440" y="50" width="250" height="140" fill="none" stroke={INK} strokeWidth="1.2" data-draw pathLength={1} style={{ animationDelay: "0.15s" }} />
            <line x1="440" y1="84" x2="690" y2="84" stroke={INK_FAINT} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "0.4s" }} />
            <text x="455" y="72" fontSize="11" letterSpacing="2" fill={INK_TEXT} data-fade style={{ animationDelay: "0.85s" }}>
              DESKTOP APP
            </text>
            <g data-fade style={{ animationDelay: "0.9s" }}>
              <rect x="455" y="102" width="8" height="8" fill="none" stroke={INK_LABEL} strokeWidth="1" />
              <text x="472" y="110" fontSize="9.5" letterSpacing="1" fill={INK_LABEL}>VS CODE</text>
              <circle cx="665" cy="106" r="2.5" fill={ACCENT} fillOpacity="0.7" />
              <rect x="455" y="126" width="8" height="8" fill="none" stroke={INK_LABEL} strokeWidth="1" />
              <text x="472" y="134" fontSize="9.5" letterSpacing="1" fill={INK_LABEL}>SLACK</text>
              <circle cx="665" cy="130" r="2.5" fill={ACCENT} fillOpacity="0.7" />
              <rect x="455" y="150" width="8" height="8" fill="none" stroke={INK_LABEL} strokeWidth="1" />
              <text x="472" y="158" fontSize="9.5" letterSpacing="1" fill={INK_LABEL}>SPOTIFY</text>
              <circle cx="665" cy="154" r="2.5" fill={ACCENT} fillOpacity="0.7" />
              <text x="675" y="178" textAnchor="end" fontSize="7.5" letterSpacing="1" fill="rgba(255,255,255,0.35)">● = RUNNING</text>
            </g>

            {/* ————— direct sync: extension ⇄ desktop app, both ways ————— */}
            <line x1="322" y1="120" x2="438" y2="120" stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1" strokeDasharray="3 3" data-draw pathLength={1} style={{ animationDelay: "0.6s" }} />
            <path d="M322 120 l6 -3 v6 z" fill={ACCENT} fillOpacity="0.7" data-fade style={{ animationDelay: "0.7s" }} />
            <path d="M438 120 l-6 -3 v6 z" fill={ACCENT} fillOpacity="0.7" data-fade style={{ animationDelay: "0.7s" }} />
            <text x="380" y="112" textAnchor="middle" fontSize="7" letterSpacing="1" fill={ACCENT} fillOpacity="0.9" data-fade style={{ animationDelay: "0.75s" }}>
              LOCAL SYNC
            </text>
            <text x="380" y="133" textAnchor="middle" fontSize="6.5" letterSpacing="0.5" fill={INK_LABEL} data-fade style={{ animationDelay: "0.8s" }}>
              127.0.0.1:4545
            </text>

            {/* ————— callout balloons ————— */}
            <circle cx="48" cy="34" r="11" fill="none" stroke={ACCENT} strokeOpacity="0.9" strokeWidth="1.2" data-draw pathLength={1} style={{ animationDelay: "1.05s" }} />
            <line x1="55" y1="42" x2="70" y2="50" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "1.05s" }} />
            <text x="48" y="38" textAnchor="middle" fontSize="10" fill={ACCENT} data-fade style={{ animationDelay: "1.15s" }}>1</text>

            <circle cx="712" cy="34" r="11" fill="none" stroke={ACCENT} strokeOpacity="0.9" strokeWidth="1.2" data-draw pathLength={1} style={{ animationDelay: "1.1s" }} />
            <line x1="705" y1="42" x2="690" y2="50" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "1.1s" }} />
            <text x="712" y="38" textAnchor="middle" fontSize="10" fill={ACCENT} data-fade style={{ animationDelay: "1.2s" }}>2</text>

            <circle cx="600" cy="262" r="11" fill="none" stroke={ACCENT} strokeOpacity="0.9" strokeWidth="1.2" data-draw pathLength={1} style={{ animationDelay: "1.15s" }} />
            <line x1="591" y1="268" x2="533" y2="288" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "1.15s" }} />
            <text x="600" y="266" textAnchor="middle" fontSize="10" fill={ACCENT} data-fade style={{ animationDelay: "1.25s" }}>3</text>

            {/* ————— connectors (orthogonal, per drafting practice) ————— */}
            <path d="M195 190 V232 H380" fill="none" stroke={INK} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "0.55s" }} />
            <path d="M565 190 V232 H380" fill="none" stroke={INK} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "0.55s" }} />
            <line x1="380" y1="232" x2="380" y2="284" stroke={INK} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "0.7s" }} />
            <circle cx="380" cy="232" r="2.5" fill={INK} data-fade style={{ animationDelay: "0.75s" }} />
            <path d="M380 290 l-4 -9 h8 z" fill={INK} data-fade style={{ animationDelay: "0.8s" }} />
            <text x="284" y="226" textAnchor="middle" fontSize="8" letterSpacing="1.5" fill={INK_LABEL} data-fade style={{ animationDelay: "0.9s" }}>
              TABS · NOTES · BOOKMARKS
            </text>
            <text x="478" y="226" textAnchor="middle" fontSize="8" letterSpacing="1.5" fill={INK_LABEL} data-fade style={{ animationDelay: "0.9s" }}>
              WINDOWS · APPS
            </text>

            {/* ————— item 3: spotlight ————— */}
            <rect x="230" y="290" width="300" height="130" fill="none" stroke={INK} strokeWidth="1.4" data-draw pathLength={1} style={{ animationDelay: "0.7s" }} />
            {/* input row */}
            <circle cx="251" cy="313" r="5" fill="none" stroke={INK} strokeWidth="1.2" data-draw pathLength={1} style={{ animationDelay: "0.85s" }} />
            <line x1="255" y1="317" x2="261" y2="323" stroke={INK} strokeWidth="1.2" data-draw pathLength={1} style={{ animationDelay: "0.85s" }} />
            <line x1="230" y1="332" x2="530" y2="332" stroke={INK_FAINT} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "0.85s" }} />
            <text x="270" y="318" fontSize="11" letterSpacing="2" fill={INK_TEXT} data-fade style={{ animationDelay: "0.95s" }}>SLA</text>
            <rect x="298" y="306" width="6" height="13" fill={ACCENT} className="animate-blink" data-fade style={{ animationDelay: "0.95s" }} />
            <rect x="456" y="303" width="60" height="18" rx="2" fill="none" stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "0.9s" }} />
            <text x="486" y="315" textAnchor="middle" fontSize="9" letterSpacing="1.5" fill={ACCENT} data-fade style={{ animationDelay: "1s" }}>
              ALT + K
            </text>
            {/* results — hatched band = selected row */}
            <rect x="238" y="340" width="284" height="20" fill="url(#bpHatch)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" data-fade style={{ animationDelay: "1.05s" }} />
            <g data-fade style={{ animationDelay: "1.1s" }}>
              <text x="246" y="354" fontSize="9.5" letterSpacing="1" fill={INK_TEXT}>SLACK — #DESIGN</text>
              <text x="514" y="354" textAnchor="end" fontSize="8" letterSpacing="1" fill={INK_LABEL}>REF ①</text>
              <text x="246" y="380" fontSize="9.5" letterSpacing="1" fill={INK_LABEL}>SLACK · RUNNING</text>
              <text x="514" y="380" textAnchor="end" fontSize="8" letterSpacing="1" fill={INK_LABEL}>REF ②</text>
              <text x="246" y="406" fontSize="9.5" letterSpacing="1" fill={INK_LABEL}>SLACK HUDDLE NOTES</text>
              <text x="514" y="406" textAnchor="end" fontSize="8" letterSpacing="1" fill={INK_LABEL}>REF ①</text>
            </g>

            {/* ————— dimension (bottom) ————— */}
            <path d="M230 426 V446 M530 426 V446 M230 440 H310 M450 440 H530" fill="none" stroke={INK_FAINT} strokeWidth="1" data-draw pathLength={1} style={{ animationDelay: "1.1s" }} />
            <path d="M230 440 l9 -3.5 v7 z M530 440 l-9 -3.5 v7 z" fill={INK_FAINT} data-fade style={{ animationDelay: "1.2s" }} />
            <text x="380" y="443" textAnchor="middle" fontSize="8.5" letterSpacing="2" fill={INK_LABEL} data-fade style={{ animationDelay: "1.2s" }}>
              ONE SEARCH BAR
            </text>

            {/* ————— general notes ————— */}
            <g data-fade style={{ animationDelay: "1.3s" }}>
              <text x="70" y="444" fontSize="8" letterSpacing="1" fill="rgba(255,255,255,0.35)">1. DO NOT SCALE DRAWING.</text>
              <text x="70" y="458" fontSize="8" letterSpacing="1" fill="rgba(255,255,255,0.35)">2. ITEMS 1+2 SYNC LOCALLY OVER PORT 4545.</text>
            </g>
          </svg>
        </div>

        {/* Parts schedule + title block */}
        <div className="relative border-t border-white/20 font-mono flex flex-col md:flex-row">
          {/* BOM */}
          <div className="flex-1 text-[9px] sm:text-[10px] tracking-wider">
            <div className="grid grid-cols-[3rem_1fr_5.5rem] sm:grid-cols-[3.5rem_11rem_1fr] text-white/40 border-b border-white/15">
              <span className="px-2 sm:px-3 py-1.5 border-r border-white/15">ITEM</span>
              <span className="px-2 sm:px-3 py-1.5 border-r border-white/15">PART</span>
              <span className="px-2 sm:px-3 py-1.5">NOTES</span>
            </div>
            {[
              ["1", "BROWSER EXTENSION", "TABS · NOTES · BOOKMARKS"],
              ["2", "DESKTOP APP", "APP SEARCH · TASKBAR · AGENT"],
              ["3", "SPOTLIGHT — ALT+K", "SEARCHES ITEMS 1 + 2"],
            ].map(([item, part, notes]) => (
              <div key={item} className="grid grid-cols-[3rem_1fr_5.5rem] sm:grid-cols-[3.5rem_11rem_1fr] border-b border-white/10 last:border-b-0 md:last:border-b-0">
                <span className="px-2 sm:px-3 py-1.5 border-r border-white/15 text-sky-300/90">{item}</span>
                <span className="px-2 sm:px-3 py-1.5 border-r border-white/15 text-white/75">{part}</span>
                <span className="px-2 sm:px-3 py-1.5 text-white/45">{notes}</span>
              </div>
            ))}
          </div>
          {/* Title block */}
          <div className="md:w-64 border-t md:border-t-0 md:border-l border-white/20 text-[9px] tracking-wider shrink-0">
            <p className="px-3 py-2 text-white/80 tracking-[0.2em] border-b border-white/15">
              COOLDESK — SYSTEM ASSEMBLY
            </p>
            <div className="grid grid-cols-3 text-white/40">
              <span className="px-3 py-1.5 border-r border-white/15">FIG. 1</span>
              <span className="px-3 py-1.5 border-r border-white/15">SCALE 1:1</span>
              <span className="px-3 py-1.5">REV 1.4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchitectureDiagram;

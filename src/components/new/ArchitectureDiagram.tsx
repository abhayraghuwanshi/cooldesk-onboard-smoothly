import React from "react";

/**
 * Architecture diagram for the Download section.
 * Shows how the Browser Extension and the optional Desktop App
 * both feed into a single Spotlight (Alt+K) search surface.
 */
function ArchitectureDiagram() {
  return (
    <div className="h-full flex flex-col justify-center p-6 sm:p-8">
      <p className="text-[11px] font-semibold text-txt-muted uppercase tracking-widest mb-6 text-center">
        How the pieces fit
      </p>

      {/* Source nodes */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {/* Browser Extension */}
        <div className="relative rounded-xl border border-blue-400/25 bg-blue-500/[0.06] p-4 text-center">
          <div className="w-9 h-9 mx-auto rounded-lg bg-blue-500/15 flex items-center justify-center mb-2.5">
            <ExtensionIcon className="w-5 h-5 text-blue-400" />
          </div>
          <p className="font-semibold text-white text-sm">Browser Extension</p>
          <p className="text-[11px] text-blue-300/70 mt-0.5">Works standalone</p>
          <p className="text-xs text-txt-muted mt-2 leading-relaxed">
            Tabs · Workspaces<br />Notes · Bookmarks
          </p>
        </div>

        {/* Desktop App */}
        <div className="relative rounded-xl border border-purple-400/25 bg-purple-500/[0.06] p-4 text-center">
          <span className="absolute top-2 right-2 text-[9px] font-semibold uppercase tracking-wider text-purple-300/80 border border-purple-400/30 rounded px-1.5 py-0.5">
            Optional
          </span>
          <div className="w-9 h-9 mx-auto rounded-lg bg-purple-500/15 flex items-center justify-center mb-2.5">
            <DesktopIcon className="w-5 h-5 text-purple-400" />
          </div>
          <p className="font-semibold text-white text-sm">Desktop App</p>
          <p className="text-[11px] text-purple-300/70 mt-0.5">Windows · macOS</p>
          <p className="text-xs text-txt-muted mt-2 leading-relaxed">
            Running native apps<br />VS Code · Slack · Spotify
          </p>
        </div>
      </div>

      {/* Connectors converging downward */}
      <div className="relative h-14">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 56"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="connFlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(96,165,250,0.7)" />
              <stop offset="100%" stopColor="rgba(167,139,250,0.7)" />
            </linearGradient>
          </defs>
          {/* base lines */}
          <path d="M100 0 C100 34, 200 22, 200 56" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M300 0 C300 34, 200 22, 200 56" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          {/* animated flow */}
          <path className="animate-flow" d="M100 0 C100 34, 200 22, 200 56" fill="none" stroke="url(#connFlow)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path className="animate-flow" d="M300 0 C300 34, 200 22, 200 56" fill="none" stroke="url(#connFlow)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* arrowhead at the convergence point */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 text-white/40">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Spotlight node */}
      <div className="relative max-w-sm mx-auto">
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/40 to-purple-600/40 blur-lg opacity-60" />
        <div className="relative rounded-2xl border border-white/10 bg-[#0c0d12] p-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SearchIcon className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-white text-sm">Spotlight</span>
            <kbd className="text-[10px] font-mono text-txt-muted border border-white/15 rounded px-1.5 py-0.5">Alt + K</kbd>
          </div>
          <p className="text-xs text-txt-secondary leading-relaxed">
            One search bar across <span className="text-blue-300">tabs</span> and{" "}
            <span className="text-purple-300">native apps</span> — from anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}

function ExtensionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
    </svg>
  );
}

function DesktopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

export default ArchitectureDiagram;

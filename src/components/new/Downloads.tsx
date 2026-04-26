const VERSIONS = {
  extension: "1.0.0",
  windows: "0.9.0-beta",
};

const DOWNLOAD_LINKS = {
  extension: "https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko",
  windows: "#",
};

function Downloads() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Started with CoolDesk
          </h2>
          <p className="text-txt-secondary text-lg max-w-2xl mx-auto">
            CoolDesk works with <strong className="text-white">two components</strong> — the browser extension
            organises your tabs, and the Windows app unlocks AI Spotlight across all your running apps.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <ExtensionIcon className="w-8 h-8 text-blue-400" />
            <div>
              <p className="font-semibold text-white">Browser Extension</p>
              <p className="text-sm text-txt-muted">Organises tabs & workspaces</p>
            </div>
          </div>

          <div className="flex items-center text-txt-muted">
            <svg className="w-8 h-8 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <WindowsIcon className="w-8 h-8 text-purple-400" />
            <div>
              <p className="font-semibold text-white">Windows App</p>
              <p className="text-sm text-txt-muted">AI Spotlight & running apps</p>
            </div>
          </div>
        </div>

        {/* Download Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Step 1: Extension */}
          <div className="relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-8">
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
              1
            </div>
            <div className="flex items-center gap-3 mb-4">
              <ExtensionIcon className="w-10 h-10 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Browser Extension</h3>
                <p className="text-sm text-txt-muted">v{VERSIONS.extension} · Chrome, Edge, Brave</p>
              </div>
            </div>
            <p className="text-txt-secondary mb-6">
              Replaces your new tab with a project workspace. Save tabs, open workspaces with one click, and search everything with Alt+K.
            </p>
            <a
              href={DOWNLOAD_LINKS.extension}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all hover:-translate-y-0.5"
            >
              <ChromeIcon className="w-5 h-5" />
              Add to Chrome
            </a>
            <p className="text-xs text-txt-muted mt-3">Also works on Edge & Brave</p>
          </div>

          {/* Step 2: Windows App */}
          <div className="relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-8">
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/30">
              2
            </div>
            <div className="flex items-center gap-3 mb-4">
              <WindowsIcon className="w-10 h-10 text-purple-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Windows App</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-sm text-txt-muted">v{VERSIONS.windows}</p>
                  <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full font-medium">Beta</span>
                </div>
              </div>
            </div>
            <p className="text-txt-secondary mb-6">
              Surfaces your running Windows apps (VS Code, Slack, Postman…) directly in AI Spotlight — press Alt+K and find anything instantly.
            </p>
            <a
              href={DOWNLOAD_LINKS.windows}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all hover:-translate-y-0.5"
            >
              <DownloadIcon className="w-5 h-5" />
              Download for Windows
            </a>
            <p className="text-xs text-txt-muted mt-3">macOS & Linux coming soon</p>
          </div>
        </div>

        {/* How it works note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl">
            <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-txt-secondary text-sm">
              <strong className="text-white">The extension works standalone</strong> — install the Windows app only if you want running apps in your Spotlight search.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExtensionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
    </svg>
  );
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z"/>
    </svg>
  );
}

function ChromeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

export default Downloads;

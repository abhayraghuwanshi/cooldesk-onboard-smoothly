const VERSIONS = {
  extension: "1.0.0",
  windows: "1.2.7",
  mac: "1.2.7",
};

const DOWNLOAD_LINKS = {
  extension: "https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko",
  windows: "https://pub-c48321b20c8942d1ad52781d27b6b607.r2.dev/CoolDesk_1.2.7_x64-setup.exe",
  mac: "https://pub-c48321b20c8942d1ad52781d27b6b607.r2.dev/CoolDesk_1.2.7_aarch64.dmg",
};

function Downloads() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-3xl font-bold text-white">Download CoolDesk</h2>
              <span className="text-sm text-txt-muted font-mono">v{VERSIONS.windows}</span>
            </div>
            <p className="text-txt-secondary">
              The extension handles tabs. The desktop app adds AI Spotlight across your native apps.
            </p>
          </div>

          {/* List panel */}
          <div className="rounded-2xl border border-white/10 overflow-hidden">

            {/* Browser section */}
            <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/10">
              <p className="text-[11px] font-semibold text-txt-muted uppercase tracking-widest">Browser</p>
            </div>

            <a
              href={DOWNLOAD_LINKS.extension}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/10"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                <ExtensionIcon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">Browser Extension</p>
                <p className="text-xs text-txt-muted mt-0.5">v{VERSIONS.extension} · Chrome, Edge, Brave</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors shrink-0">
                Add to Chrome
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            {/* Desktop section */}
            <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/10">
              <p className="text-[11px] font-semibold text-txt-muted uppercase tracking-widest">Desktop</p>
            </div>

            <a
              href={DOWNLOAD_LINKS.windows}
              download
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/10"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
                <WindowsIcon className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">Windows</p>
                <p className="text-xs text-txt-muted mt-0.5">v{VERSIONS.windows} · x64</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-txt-secondary group-hover:text-white transition-colors shrink-0">
                <DownloadIcon className="w-3.5 h-3.5" />
                Download
              </span>
            </a>

            <a
              href={DOWNLOAD_LINKS.mac}
              download
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/10"
            >
              <div className="w-9 h-9 rounded-lg bg-zinc-500/15 flex items-center justify-center shrink-0">
                <MacIcon className="w-5 h-5 text-zinc-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">macOS</p>
                <p className="text-xs text-txt-muted mt-0.5">v{VERSIONS.mac} · Apple Silicon</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-txt-secondary group-hover:text-white transition-colors shrink-0">
                <DownloadIcon className="w-3.5 h-3.5" />
                Download
              </span>
            </a>

            {/* Linux — coming soon */}
            <div className="flex items-center gap-4 px-5 py-4 opacity-40 select-none">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <LinuxIcon className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">Linux</p>
                <p className="text-xs text-txt-muted mt-0.5">Coming soon</p>
              </div>
              <span className="text-xs text-txt-muted border border-white/15 rounded-md px-2.5 py-1 shrink-0">Soon</span>
            </div>

          </div>

          {/* Tip */}
          <p className="text-xs text-txt-muted text-center mt-5">
            The extension works standalone — the desktop app is optional, for Spotlight across native apps.
          </p>

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

function MacIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.247 2.048.35 3.049.468.88.794 1.536 1.824 2.977 1.824l.0.001c.71.001 1.555-.238 2.555-.668 1.33.528 2.038.794 2.73.794a2.8 2.8 0 001.768-.633c.492-.395.75-.973.878-1.553.13-.582.117-1.166.063-1.548l.02-.021.013-.021c.156-.362.282-.721.282-1.077 0-.518-.199-.985-.562-1.399a.526.526 0 00.028-.08c.13-.399.209-.812.209-1.225 0-.622-.143-1.211-.391-1.718.035-.126.056-.256.056-.388 0-.571-.237-1.077-.612-1.432.035-.217.072-.449.072-.686 0-.952-.409-1.748-1.072-2.202C16.313 5.4 16.75 3.25 14.7 1.9c-.62-.412-1.37-.6-2.196-.6zm-.404 1.538c.53-.012 1.002.145 1.39.435 1.418 1.05 1.122 2.792.947 4.072-.127.955-.155 1.843.046 2.538.058.2.117.384.177.556H9.34c.063-.172.121-.356.18-.556.201-.695.173-1.583.046-2.538-.175-1.28-.471-3.022.947-4.072.374-.277.823-.427 1.587-.435zm-4.295 8.553c.127 0 .26.024.378.08a.964.964 0 01.48.511c.07.171.089.368.022.558a.966.966 0 01-.509.573.968.968 0 01-.748.028.966.966 0 01-.509-.573.967.967 0 01.022-.558.966.966 0 01.48-.511.968.968 0 01.384-.108zm8.59 0c.127 0 .26.024.378.08a.964.964 0 01.48.511c.07.171.089.368.022.558a.966.966 0 01-.509.573.968.968 0 01-.748.028.966.966 0 01-.509-.573.967.967 0 01.022-.558.966.966 0 01.48-.511.968.968 0 01.384-.108z"/>
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

export default Downloads;

import { useState } from 'react';

// Version config - update these when releasing new versions
const VERSIONS = {
  extension: "1.0.0",
  windows: "0.9.0-beta",
  mac: "1.0.0",
  linux: "1.0.0",
};

const DOWNLOAD_LINKS = {
  extension: "https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko",
  windows: "#", // TODO: Add Windows download link
  mac: "#",     // TODO: Add Mac download link
  linux: "#",   // TODO: Add Linux download link
};

function Downloads() {
  const [activeOS, setActiveOS] = useState<'windows' | 'mac' | 'linux'>('windows');

  const osOptions = [
    { id: 'windows', name: 'Windows', badge: 'Beta', icon: WindowsIcon },
    { id: 'mac', name: 'macOS', badge: null, icon: MacIcon },
    { id: 'linux', name: 'Linux', badge: null, icon: LinuxIcon },
  ] as const;

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Started with CoolDesk
          </h2>
          <p className="text-txt-secondary text-lg max-w-2xl mx-auto">
            CoolDesk works with <strong className="text-white">two components</strong> — the browser extension captures your tabs,
            and the desktop app powers AI search & sync across all your devices.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <ExtensionIcon className="w-8 h-8 text-blue-400" />
            <div>
              <p className="font-semibold text-white">Browser Extension</p>
              <p className="text-sm text-txt-muted">Captures & organizes tabs</p>
            </div>
          </div>

          <div className="flex items-center text-txt-muted">
            <svg className="w-8 h-8 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <DesktopIcon className="w-8 h-8 text-purple-400" />
            <div>
              <p className="font-semibold text-white">Desktop App</p>
              <p className="text-sm text-txt-muted">AI search & cross-device sync</p>
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
                <p className="text-sm text-txt-muted">v{VERSIONS.extension}</p>
              </div>
            </div>
            <p className="text-txt-secondary mb-6">
              Install the extension to capture tabs, organize workspaces, and replace your new tab page.
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

          {/* Step 2: Desktop App */}
          <div className="relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-8">
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/30">
              2
            </div>
            <div className="flex items-center gap-3 mb-4">
              <DesktopIcon className="w-10 h-10 text-purple-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Desktop App</h3>
                <p className="text-sm text-txt-muted">
                  v{VERSIONS[activeOS]}
                  {activeOS === 'windows' && <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Beta</span>}
                </p>
              </div>
            </div>
            <p className="text-txt-secondary mb-6">
              Powers AI-driven search and syncs your workspace across all devices seamlessly.
            </p>

            {/* OS Selector */}
            <div className="flex gap-2 mb-4">
              {osOptions.map((os) => (
                <button
                  key={os.id}
                  onClick={() => setActiveOS(os.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeOS === os.id
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-white/5 text-txt-muted border border-white/10 hover:border-white/20'
                  }`}
                >
                  <os.icon className="w-4 h-4" />
                  {os.name}
                  {os.badge && (
                    <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                      {os.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <a
              href={DOWNLOAD_LINKS[activeOS]}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all hover:-translate-y-0.5"
            >
              <DownloadIcon className="w-5 h-5" />
              Download for {osOptions.find(o => o.id === activeOS)?.name}
            </a>
          </div>
        </div>

        {/* How it works note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-txt-secondary text-sm">
              <strong className="text-white">Both components work together</strong> — the extension handles browser integration while the desktop app provides powerful AI features and sync.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Icons
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.311.001-.465.003-.653.014-1.283.082-1.89.212a6.548 6.548 0 00-.808.217c-.392.122-.767.28-1.116.477a6.27 6.27 0 00-1.32.91 6.42 6.42 0 00-1.077 1.21 6.622 6.622 0 00-.773 1.466 6.83 6.83 0 00-.427 1.64 7.297 7.297 0 00-.085 1.114c0 .316.014.63.042.942.028.312.07.62.127.922.057.303.127.6.212.893.085.292.183.578.296.857.113.28.24.552.38.817.142.265.296.522.465.77.168.247.35.485.545.713.195.228.402.446.622.652.22.207.451.402.694.585.243.183.497.354.76.51.265.157.539.3.822.43.283.128.575.243.873.343.299.1.604.186.915.257.311.07.627.127.948.168.32.04.645.065.973.077.328.011.658.008.99-.008.331-.017.662-.048.99-.092.33-.044.655-.102.976-.172.321-.07.636-.152.944-.247.308-.094.61-.201.902-.319.293-.118.576-.248.85-.39.273-.142.536-.296.787-.461.25-.165.489-.342.716-.529.226-.188.44-.387.64-.597.2-.21.387-.431.56-.662.172-.231.33-.472.472-.723.143-.25.27-.51.382-.777.112-.268.208-.544.288-.828.08-.283.144-.573.192-.868.048-.296.08-.597.095-.903.016-.305.016-.614 0-.927-.016-.312-.048-.62-.095-.922-.048-.303-.112-.6-.192-.89-.08-.29-.176-.574-.288-.85-.112-.275-.239-.542-.382-.8-.142-.257-.3-.505-.472-.743-.173-.237-.36-.465-.56-.682-.2-.217-.414-.423-.64-.618-.227-.194-.466-.377-.716-.548-.251-.17-.514-.33-.787-.478-.274-.147-.557-.283-.85-.407-.292-.124-.594-.236-.902-.336-.308-.1-.623-.186-.944-.26-.32-.073-.646-.133-.976-.18-.33-.047-.661-.08-.99-.1-.33-.02-.66-.026-.99-.02-.331.007-.658.027-.98.06-.322.033-.64.08-.95.14-.312.06-.616.133-.912.22-.297.086-.585.186-.863.3-.278.113-.547.24-.805.38-.257.14-.504.294-.739.46-.235.168-.459.348-.67.541-.211.193-.41.399-.595.617-.186.218-.358.448-.516.69-.158.241-.302.494-.432.758-.13.263-.245.537-.346.822-.1.284-.186.579-.256.883-.07.305-.126.618-.167.939-.04.322-.067.65-.078.984-.012.335-.008.676.011 1.021.019.346.053.695.102 1.045.05.35.114.7.193 1.049.08.348.174.694.283 1.036.11.342.233.68.37 1.011.139.33.29.655.456.973.165.317.343.627.534.929.19.301.393.594.608.877.215.284.442.558.68.82.238.264.487.516.746.757.26.24.53.469.809.684.278.215.566.418.861.607.296.189.6.364.911.525.311.16.63.307.955.438.324.132.654.25.99.353.335.103.677.191 1.022.265.346.074.697.134 1.051.178.355.044.713.074 1.073.089.36.015.723.015 1.087 0 .363-.015.722-.045 1.077-.089.354-.044.706-.104 1.051-.178.346-.074.688-.162 1.023-.265.336-.103.666-.22.99-.353.324-.131.643-.277.955-.438.31-.16.615-.336.91-.525.296-.189.584-.392.861-.607.278-.215.548-.444.808-.684.26-.241.508-.493.747-.757.238-.262.465-.536.68-.82.215-.283.418-.576.609-.877.19-.302.368-.612.533-.929.165-.318.317-.642.455-.973.138-.331.261-.67.37-1.011.11-.342.204-.688.284-1.036.08-.349.143-.699.193-1.049.05-.35.084-.699.103-1.045.019-.345.023-.686.011-1.021-.011-.334-.038-.662-.078-.984-.041-.321-.097-.634-.167-.939-.07-.304-.156-.599-.256-.883-.1-.285-.217-.56-.346-.822-.13-.264-.274-.517-.432-.758-.158-.242-.33-.472-.516-.69-.185-.218-.384-.424-.595-.617-.211-.193-.435-.373-.67-.541-.235-.166-.482-.32-.739-.46-.258-.14-.527-.267-.805-.38-.278-.114-.566-.214-.863-.3-.296-.087-.6-.16-.912-.22-.31-.06-.628-.107-.95-.14-.322-.033-.649-.053-.98-.06z"/>
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

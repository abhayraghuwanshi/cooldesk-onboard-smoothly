import { site } from "@/config/site";
import { useLatestRelease } from "@/hooks/useLatestRelease";
import React from "react";
import DownloadFeedback from "./DownloadFeedback";
import StatsSlideshow from "./StatsSlideshow";

// Extension lives on the Chrome Web Store (versioned separately from the desktop app).
const EXTENSION_VERSION = "1.0.0";
const EXTENSION_LINK = "https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko";

const WINGET_COMMAND = "winget install CoolDesk.CoolDesk";
const BREW_COMMAND =
  "brew tap abhayraghuwanshi/cooldesk https://github.com/abhayraghuwanshi/cooldesk-extension\nbrew install --cask cooldesk";
const DOWNLOADS_SECTION = "downloads_section";

type DownloadTarget = "browser_extension" | "windows_installer" | "winget_command" | "macos_installer" | "brew_command";

type DownloadTrackingParams = {
  action: string;
  download_target?: DownloadTarget;
  download_platform?: string;
  download_version?: string;
  download_method?: string;
};

function trackDownloadEvent(eventName: string, params: DownloadTrackingParams) {
  const payload = {
    event_category: "engagement",
    section: DOWNLOADS_SECTION,
    ...params,
  };

  if (typeof window !== "undefined") {
    window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    }

    window.dataLayer.push({
      event: eventName,
      ...payload,
    });
  }

  if (import.meta.env.DEV) {
    console.log(`[${eventName}]`, payload);
  }
}

function Downloads() {
  const [copied, setCopied] = React.useState(false);
  const [brewCopied, setBrewCopied] = React.useState(false);

  // Desktop version + installer links come live from GitHub Releases; extension is static.
  const release = useLatestRelease();
  const VERSIONS = { extension: EXTENSION_VERSION, windows: release.version, mac: release.version };
  const DOWNLOAD_LINKS = { extension: EXTENSION_LINK, windows: release.windows, mac: release.mac };

  React.useEffect(() => {
    trackDownloadEvent("downloads_section_view", {
      action: "view",
    });
  }, []);

  function trackDownloadClick(params: Omit<DownloadTrackingParams, "action">) {
    trackDownloadEvent("download_cta_click", {
      action: "click",
      ...params,
    });
  }

  function copyWinget() {
    trackDownloadEvent("download_winget_copy", {
      action: "copy",
      download_target: "winget_command",
      download_platform: "windows",
      download_version: VERSIONS.windows,
      download_method: "winget",
    });

    navigator.clipboard.writeText(WINGET_COMMAND).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function copyBrew() {
    trackDownloadEvent("download_brew_copy", {
      action: "copy",
      download_target: "brew_command",
      download_platform: "macos",
      download_version: VERSIONS.mac,
      download_method: "homebrew",
    });

    navigator.clipboard.writeText(BREW_COMMAND).then(() => {
      setBrewCopied(true);
      setTimeout(() => setBrewCopied(false), 2000);
    });
  }

  return (
    <section
      className="py-20 relative"
      data-gtm-section={DOWNLOADS_SECTION}
    >
      <div className="container mx-auto px-6">
        <div>

          {/* Header */}
          <div className="mb-8 max-w-xl">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="heading-2">{site.downloads.heading}</h2>
              {site.downloads.desktop && (
                <span className="text-sm text-txt-muted font-mono">v{VERSIONS.windows}</span>
              )}
            </div>
            <p className="body-lg">
              {site.downloads.blurb}
            </p>
          </div>

          {/* Merged panel: stats + downloads + diagram */}
          <div className="rounded-2xl border border-white/15 overflow-hidden">
            <div className="grid lg:grid-cols-2 lg:divide-x divide-white/15">

              {/* Stats column */}
              <div className="bg-white/[0.015]">
                <StatsSlideshow />
              </div>

              {/* Download column */}
              <div>

                {/* Browser section */}
                <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/15">
                  <p className="label">Browser</p>
                </div>

                <a
                  href={DOWNLOAD_LINKS.extension}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackDownloadClick({
                      download_target: "browser_extension",
                      download_platform: "chrome",
                      download_version: VERSIONS.extension,
                      download_method: "chrome_web_store",
                    })
                  }
                  data-gtm-element="download-cta"
                  data-gtm-action="click"
                  data-gtm-section={DOWNLOADS_SECTION}
                  data-gtm-target="browser_extension"
                  data-gtm-platform="chrome"
                  data-gtm-version={VERSIONS.extension}
                  data-gtm-method="chrome_web_store"
                  className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/15"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                    <ExtensionIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="heading-5">Browser Extension</p>
                    <p className="caption mt-0.5">v{VERSIONS.extension} · Chrome, Edge, Brave</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors shrink-0">
                    Add to Chrome
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>

                {site.downloads.desktop && (
                  <>
                    {/* Desktop section */}
                    <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/15">
                      <p className="label">Desktop</p>
                    </div>

                    <a
                      href={DOWNLOAD_LINKS.windows}
                      download
                      onClick={() =>
                        trackDownloadClick({
                          download_target: "windows_installer",
                          download_platform: "windows",
                          download_version: VERSIONS.windows,
                          download_method: "direct_installer",
                        })
                      }
                      data-gtm-element="download-cta"
                      data-gtm-action="click"
                      data-gtm-section={DOWNLOADS_SECTION}
                      data-gtm-target="windows_installer"
                      data-gtm-platform="windows"
                      data-gtm-version={VERSIONS.windows}
                      data-gtm-method="direct_installer"
                      className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/15"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                        <WindowsIcon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="heading-5">Windows</p>
                        <p className="caption mt-0.5">v{VERSIONS.windows} · x64</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-txt-secondary group-hover:text-white transition-colors shrink-0">
                        <DownloadIcon className="w-3.5 h-3.5" />
                        Download
                      </span>
                    </a>

                    <button
                      onClick={copyWinget}
                      data-gtm-element="download-copy"
                      data-gtm-action="copy"
                      data-gtm-section={DOWNLOADS_SECTION}
                      data-gtm-target="winget_command"
                      data-gtm-platform="windows"
                      data-gtm-version={VERSIONS.windows}
                      data-gtm-method="winget"
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/15 text-left"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                        <WingetIcon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="heading-5">Windows <span className="text-txt-muted font-normal">via Winget</span></p>
                        <p className="caption mt-0.5 font-mono">{WINGET_COMMAND}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-txt-secondary group-hover:text-white transition-colors shrink-0">
                        {copied ? (
                          <>
                            <CheckIcon className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </span>
                    </button>

                    <a
                      href={DOWNLOAD_LINKS.mac}
                      download
                      onClick={() =>
                        trackDownloadClick({
                          download_target: "macos_installer",
                          download_platform: "macos",
                          download_version: VERSIONS.mac,
                          download_method: "direct_dmg",
                        })
                      }
                      data-gtm-element="download-cta"
                      data-gtm-action="click"
                      data-gtm-section={DOWNLOADS_SECTION}
                      data-gtm-target="macos_installer"
                      data-gtm-platform="macos"
                      data-gtm-version={VERSIONS.mac}
                      data-gtm-method="direct_dmg"
                      className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/15"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                        <MacIcon className="w-5 h-5 text-zinc-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="heading-5">macOS</p>
                        <p className="caption mt-0.5">v{VERSIONS.mac} · Apple Silicon</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-txt-secondary group-hover:text-white transition-colors shrink-0">
                        <DownloadIcon className="w-3.5 h-3.5" />
                        Download
                      </span>
                    </a>

                    <button
                      onClick={copyBrew}
                      data-gtm-element="download-copy"
                      data-gtm-action="copy"
                      data-gtm-section={DOWNLOADS_SECTION}
                      data-gtm-target="brew_command"
                      data-gtm-platform="macos"
                      data-gtm-version={VERSIONS.mac}
                      data-gtm-method="homebrew"
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors group border-b border-white/15 text-left"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                        <WingetIcon className="w-5 h-5 text-zinc-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="heading-5">macOS <span className="text-txt-muted font-normal">via Homebrew</span></p>
                        <p className="caption mt-0.5 font-mono truncate">brew install --cask cooldesk</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-txt-secondary group-hover:text-white transition-colors shrink-0">
                        {brewCopied ? (
                          <>
                            <CheckIcon className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </span>
                    </button>

                    {/* Linux — coming soon */}
                    <div
                      className="flex items-center gap-4 px-5 py-4 opacity-40 select-none border-b border-white/15"
                      data-gtm-element="download-unavailable"
                      data-gtm-section={DOWNLOADS_SECTION}
                      data-gtm-target="linux_installer"
                      data-gtm-platform="linux"
                      data-gtm-status="coming_soon"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                        <LinuxIcon className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="heading-5">Linux</p>
                        <p className="caption mt-0.5">Coming soon</p>
                      </div>
                      <span className="caption border border-white/15 rounded-md px-2.5 py-1 shrink-0">Soon</span>
                    </div>
                  </>
                )}

              </div>

            </div>
          </div>

          {/* Tip */}
          <p className="caption text-center mt-5">
            {site.downloads.tip}
          </p>

          {/* Why-not-downloading capture */}
          <DownloadFeedback />

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
      <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z" />
    </svg>
  );
}

function MacIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.247 2.048.35 3.049.468.88.794 1.536 1.824 2.977 1.824l.0.001c.71.001 1.555-.238 2.555-.668 1.33.528 2.038.794 2.73.794a2.8 2.8 0 001.768-.633c.492-.395.75-.973.878-1.553.13-.582.117-1.166.063-1.548l.02-.021.013-.021c.156-.362.282-.721.282-1.077 0-.518-.199-.985-.562-1.399a.526.526 0 00.028-.08c.13-.399.209-.812.209-1.225 0-.622-.143-1.211-.391-1.718.035-.126.056-.256.056-.388 0-.571-.237-1.077-.612-1.432.035-.217.072-.449.072-.686 0-.952-.409-1.748-1.072-2.202C16.313 5.4 16.75 3.25 14.7 1.9c-.62-.412-1.37-.6-2.196-.6zm-.404 1.538c.53-.012 1.002.145 1.39.435 1.418 1.05 1.122 2.792.947 4.072-.127.955-.155 1.843.046 2.538.058.2.117.384.177.556H9.34c.063-.172.121-.356.18-.556.201-.695.173-1.583.046-2.538-.175-1.28-.471-3.022.947-4.072.374-.277.823-.427 1.587-.435zm-4.295 8.553c.127 0 .26.024.378.08a.964.964 0 01.48.511c.07.171.089.368.022.558a.966.966 0 01-.509.573.968.968 0 01-.748.028.966.966 0 01-.509-.573.967.967 0 01.022-.558.966.966 0 01.48-.511.968.968 0 01.384-.108zm8.59 0c.127 0 .26.024.378.08a.964.964 0 01.48.511c.07.171.089.368.022.558a.966.966 0 01-.509.573.968.968 0 01-.748.028.966.966 0 01-.509-.573.967.967 0 01.022-.558.966.966 0 01.48-.511.968.968 0 01.384-.108z" />
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

function WingetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default Downloads;

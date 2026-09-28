import { CHROME_STORE, GITHUB_REPO, site } from "@/config/site";
import { useLatestRelease } from "@/hooks/useLatestRelease";
import React from "react";
import StatsSlideshow from "./StatsSlideshow";
import WhichOne from "./WhichOne";

// Extension lives on the Chrome Web Store and auto-updates there, so no version is shown.
const EXTENSION_LINK = CHROME_STORE;

const WINGET_COMMAND = "winget install CoolDesk.CoolDesk";
// Homebrew 6 requires trusting third-party taps (docs.brew.sh/Tap-Trust): tap,
// trust just this cask, install. The tap needs its URL because the repo isn't
// named homebrew-cooldesk. The cask's postflight clears macOS quarantine, since
// the build isn't notarized yet (Casks/cooldesk.rb in cooldesk-extension).
const BREW_COMMAND = [
  `brew tap abhayraghuwanshi/cooldesk \\\n  ${GITHUB_REPO}`,
  "brew trust --cask abhayraghuwanshi/cooldesk/cooldesk",
  "brew install --cask cooldesk",
].join("\n");
const DOWNLOADS_SECTION = "downloads_section";

type Os = "windows" | "mac" | "linux";

type DownloadTarget = "browser_extension" | "windows_installer" | "winget_command" | "macos_installer" | "brew_command" | "linux_installer";

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

function detectOs(): Os {
  const ua = typeof navigator === "undefined" ? "" : navigator.userAgent;
  if (/Mac/i.test(ua) && !/iPhone|iPad/i.test(ua)) return "mac";
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return "linux";
  return "windows";
}

const OS_TABS: { key: Os; label: string; Icon: (p: { className?: string }) => React.ReactElement }[] = [
  { key: "windows", label: "Windows", Icon: WindowsIcon },
  { key: "mac", label: "macOS", Icon: MacIcon },
  { key: "linux", label: "Linux", Icon: LinuxIcon },
];

/** A command with a Copy button. */
function CommandBox({ command, copied, onCopy }: { command: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="mt-2 flex items-start gap-2 rounded-lg border border-white/10 bg-black/40 pl-3 pr-1.5 py-1.5">
      <code className="flex-1 min-w-0 py-1 font-mono text-[12.5px] leading-relaxed text-white/85 whitespace-pre-wrap [overflow-wrap:anywhere]">{command}</code>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-txt-secondary hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
      >
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
      </button>
    </div>
  );
}

function Downloads() {
  const [os, setOs] = React.useState<Os>("windows"); // prerendered as Windows, corrected on mount
  const [copied, setCopied] = React.useState<string | null>(null);

  // Desktop version + installer links come live from GitHub Releases; extension is static.
  const release = useLatestRelease();
  const version = release.version;

  React.useEffect(() => {
    setOs(detectOs());
    trackDownloadEvent("downloads_section_view", { action: "view" });
  }, []);

  function trackDownloadClick(params: Omit<DownloadTrackingParams, "action">) {
    trackDownloadEvent("download_cta_click", { action: "click", ...params });
  }

  function copy(command: string, target: DownloadTarget, platform: string, method: string) {
    trackDownloadEvent("download_command_copy", {
      action: "copy",
      download_target: target,
      download_platform: platform,
      download_version: version,
      download_method: method,
    });
    navigator.clipboard.writeText(command).then(() => {
      setCopied(command);
      setTimeout(() => setCopied((c) => (c === command ? null : c)), 2000);
    });
  }

  const primary: Record<Os, { href: string; label: string; detail: string; target: DownloadTarget; method: string }> = {
    windows: { href: release.windows, label: "Download for Windows", detail: `v${version} · x64 installer (.exe)`, target: "windows_installer", method: "direct_installer" },
    mac: { href: release.mac, label: "Download for macOS", detail: `v${version} · Apple Silicon (.dmg)`, target: "macos_installer", method: "direct_dmg" },
    linux: { href: release.linux, label: "Download for Linux", detail: `v${version} · AppImage, runs on any distro`, target: "linux_installer", method: "direct_appimage" },
  };
  const p = primary[os];

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
                <span className="text-sm text-txt-muted font-mono">v{version}</span>
              )}
            </div>
            <p className="body-lg">
              {site.downloads.blurb}
            </p>
          </div>

          {/* Merged panel: community + latest release | downloads, then "which one" across both */}
          <div className="rounded-2xl border border-white/15 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-white/15">

              {/* Community column */}
              <div className="bg-white/[0.015] order-2 lg:order-1">
                <StatsSlideshow />
              </div>

              {/* Download column */}
              <div className="order-1 lg:order-2">

                {site.downloads.desktop && (
                  <>
                    <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/15">
                      <p className="label">Desktop app</p>
                    </div>

                    <div className="p-5 border-b border-white/15">
                      {/* OS picker — preselected from the visitor's system */}
                      <div role="tablist" aria-label="Operating system" className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
                        {OS_TABS.map(({ key, label, Icon }) => (
                          <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={os === key}
                            onClick={() => {
                              setOs(key);
                              trackDownloadEvent("download_os_select", { action: "select", download_platform: key });
                            }}
                            className={`inline-flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-colors ${os === key ? "bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" : "text-white/50 hover:text-white/80"}`}
                          >
                            <Icon className="w-4 h-4" />
                            {label}
                          </button>
                        ))}
                      </div>

                      {/* Main download */}
                      <a
                        href={p.href}
                        download
                        onClick={() => trackDownloadClick({ download_target: p.target, download_platform: os, download_version: version, download_method: p.method })}
                        data-gtm-element="download-cta"
                        data-gtm-action="click"
                        data-gtm-section={DOWNLOADS_SECTION}
                        data-gtm-target={p.target}
                        data-gtm-platform={os}
                        data-gtm-version={version}
                        data-gtm-method={p.method}
                        className="group mt-4 flex items-center justify-between gap-4 rounded-xl bg-white px-5 py-3.5 text-black transition-transform hover:-translate-y-px shadow-[0_8px_30px_rgba(56,189,248,0.18)]"
                      >
                        <span className="min-w-0">
                          <span className="block text-[15px] font-semibold">{p.label}</span>
                          <span className="block text-xs text-black/55 mt-0.5 truncate">{p.detail}</span>
                        </span>
                        <DownloadIcon className="w-5 h-5 shrink-0" />
                      </a>

                      {/* One secondary option per OS */}
                      <div className="mt-4">
                        {os === "windows" && (
                          <>
                            <p className="caption">Or install with winget</p>
                            <CommandBox command={WINGET_COMMAND} copied={copied === WINGET_COMMAND} onCopy={() => copy(WINGET_COMMAND, "winget_command", "windows", "winget")} />
                          </>
                        )}
                        {os === "mac" && (
                          <>
                            <p className="caption">Or install with Homebrew (tap, trust, install)</p>
                            <CommandBox command={BREW_COMMAND} copied={copied === BREW_COMMAND} onCopy={() => copy(BREW_COMMAND, "brew_command", "macos", "homebrew")} />
                            <p className="caption leading-relaxed mt-3">
                              <span className="text-amber-300/90 font-medium">Not notarized yet.</span> Using the DMG and macOS
                              says the app is damaged? Open “① RUN THIS FIRST” inside the DMG.
                            </p>
                          </>
                        )}
                        {os === "linux" && (
                          <p className="caption">
                            Or get a package:{" "}
                            <a href={release.deb} download onClick={() => trackDownloadClick({ download_target: "linux_installer", download_platform: "linux", download_version: version, download_method: "deb" })} className="text-white/80 underline decoration-white/30 underline-offset-2 hover:text-white">.deb</a>
                            <span className="text-white/30"> (Debian, Ubuntu) · </span>
                            <a href={release.rpm} download onClick={() => trackDownloadClick({ download_target: "linux_installer", download_platform: "linux", download_version: version, download_method: "rpm" })} className="text-white/80 underline decoration-white/30 underline-offset-2 hover:text-white">.rpm</a>
                            <span className="text-white/30"> (Fedora, RHEL)</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Browser section */}
                <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/15">
                  <p className="label">Browser extension</p>
                </div>

                <a
                  href={EXTENSION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackDownloadClick({
                      download_target: "browser_extension",
                      download_platform: "chrome",
                      download_version: "store",
                      download_method: "chrome_web_store",
                    })
                  }
                  data-gtm-element="download-cta"
                  data-gtm-action="click"
                  data-gtm-section={DOWNLOADS_SECTION}
                  data-gtm-target="browser_extension"
                  data-gtm-platform="chrome"
                  data-gtm-version="store"
                  data-gtm-method="chrome_web_store"
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                    <ExtensionIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="heading-5">New tab extension</p>
                    <p className="caption mt-0.5">Chrome, Edge, Brave · updates itself</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors shrink-0">
                    Add to Chrome
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>

              </div>

            </div>

            {/* Full width under both columns: extension vs app vs both */}
            {site.downloads.desktop && <WhichOne />}
          </div>

          {/* Tip */}
          <p className="caption text-center mt-5">
            {site.downloads.tip}
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

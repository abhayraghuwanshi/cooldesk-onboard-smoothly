import { GITHUB_REPO } from "./site";

// Install commands, shared by the homepage Downloads section and /getting-started.

export const WINGET_COMMAND = "winget install CoolDesk.CoolDesk";
// Homebrew 6 requires trusting third-party taps (docs.brew.sh/Tap-Trust): tap,
// trust just this cask, install. The tap needs its URL because the repo isn't
// named homebrew-cooldesk. The cask's postflight clears macOS quarantine, since
// the build isn't notarized yet (Casks/cooldesk.rb in cooldesk-extension).
export const BREW_COMMAND = [
  `brew tap abhayraghuwanshi/cooldesk \\\n  ${GITHUB_REPO}`,
  "brew trust --cask abhayraghuwanshi/cooldesk/cooldesk",
  "brew install --cask cooldesk",
].join("\n");
// For DMG installs: the build isn't notarized, so macOS flags it as "damaged".
export const QUARANTINE_COMMAND = "xattr -dr com.apple.quarantine /Applications/CoolDesk.app";

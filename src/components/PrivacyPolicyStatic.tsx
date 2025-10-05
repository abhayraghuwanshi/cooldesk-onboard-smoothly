import React from "react";
import { FaBan, FaCheckCircle, FaDatabase, FaEnvelope, FaEye, FaFolder, FaGlobe, FaMicrophone, FaPaintBrush, FaSearch, FaShieldAlt, FaStickyNote, FaThumbtack, FaUser } from 'react-icons/fa';

const SectionTitle: React.FC<{ id?: string; children: React.ReactNode }> = ({ id, children }) => (
  <h2 id={id} className="text-2xl font-semibold tracking-tight text-neutral-100 mt-16 pt-8 border-t border-neutral-800">
    {children}
  </h2>
);

const SubTitle: React.FC<{ id?: string; children: React.ReactNode }> = ({ id, children }) => (
  <h3 id={id} className="text-lg font-semibold text-neutral-200 mt-8">
    {children}
  </h3>
);

const Li: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="list-disc ml-5 leading-relaxed">{children}</li>
);

const PrivacyPolicyStatic: React.FC = () => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-neutral-400 font-sans rounded-2xl glass-card">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tighter text-neutral-100">CoolDesk Privacy & Permissions</h1>
        <p className="mt-3 text-neutral-500">Last Updated: January 2025 • Version: 0.1.0</p>
      </header>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-10 mb-8 p-6 rounded-2xl glass-card glass-hover">
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <li><a href="#overview" className="text-neutral-400 hover:text-white hover:bg-neutral-800/30 px-3 py-2 rounded-lg transition-all duration-200">Overview</a></li>
          <li><a href="#info-we-collect" className="text-neutral-400 hover:text-white hover:bg-neutral-800/30 px-3 py-2 rounded-lg transition-all duration-200">Information We Collect</a></li>
          <li><a href="#how-we-use" className="text-neutral-400 hover:text-white hover:bg-neutral-800/30 px-3 py-2 rounded-lg transition-all duration-200">How We Use Your Data</a></li>
          <li><a href="#security" className="text-neutral-400 hover:text-white hover:bg-neutral-800/30 px-3 py-2 rounded-lg transition-all duration-200">Data Security</a></li>
          <li><a href="#user-rights" className="text-neutral-400 hover:text-white hover:bg-neutral-800/30 px-3 py-2 rounded-lg transition-all duration-200">User Control & Rights</a></li>
          <li><a href="#compliance" className="text-neutral-400 hover:text-white hover:bg-neutral-800/30 px-3 py-2 rounded-lg transition-all duration-200">Compliance</a></li>
          <li><a href="#intl" className="text-neutral-400 hover:text-white hover:bg-neutral-800/30 px-3 py-2 rounded-lg transition-all duration-200">International Users</a></li>
          <li><a href="#contact" className="text-neutral-400 hover:text-white hover:bg-neutral-800/30 px-3 py-2 rounded-lg transition-all duration-200">Contact</a></li>
          <li><a href="#summary" className="text-neutral-400 hover:text-white hover:bg-neutral-800/30 px-3 py-2 rounded-lg transition-all duration-200">Summary</a></li>
        </ul>
      </nav>

      <SectionTitle id="overview">Overview</SectionTitle>
      <p className="mt-4 leading-relaxed">
        CoolDesk is a Chrome extension designed to enhance your browsing productivity through workspace management, daily notes, tab organization, and voice navigation. This document explains what data we collect, how we use it, and your rights regarding your information.
      </p>

      <SectionTitle id="info-we-collect">1. Information We Collect</SectionTitle>
      <SubTitle id="browsing-data">1.1 Browsing Data (Local Storage Only)</SubTitle>
      <p className="mt-4 leading-relaxed">CoolDesk collects and stores the following data locally on your device:</p>

      <SubTitle id="history">Browser History</SubTitle>
      <ul className="mt-4 space-y-2">
        <Li><FaSearch className="inline mr-2 text-neutral-300" />We access your browsing history (configurable, default: last 30 days, max 1000 items) to:</Li>
      </ul>
      <ul className="mt-3 ml-6 space-y-2">
        <Li>Organize URLs into workspaces based on topics and categories</Li>
        <Li>Provide quick access to frequently visited sites</Li>
        <Li>Generate intelligent workspace suggestions</Li>
      </ul>

      <SubTitle id="bookmarks">Bookmarks</SubTitle>
      <ul className="mt-4 space-y-2">
        <Li><FaThumbtack className="inline mr-2 text-neutral-300" />We read your Chrome bookmarks to:</Li>
      </ul>
      <ul className="mt-3 ml-6 space-y-2">
        <Li>Include them in workspace organization</Li>
        <Li>Provide unified access to saved resources</Li>
      </ul>

      <SubTitle id="tabs">Tab Information</SubTitle>
      <ul className="mt-4 space-y-2">
        <Li><FaFolder className="inline mr-2 text-neutral-300" />We track open tabs to:</Li>
      </ul>
      <ul className="mt-3 ml-6 space-y-2">
        <Li>Display current tabs in the side panel</Li>
        <Li>Enable auto-cleanup of inactive tabs (optional, user-controlled)</Li>
        <Li>Restore recently closed tabs</Li>
        <Li>Provide voice-controlled tab switching</Li>
      </ul>

      <SubTitle id="text-selections">Text Selections</SubTitle>
      <ul className="mt-4 space-y-2">
        <Li><FaStickyNote className="inline mr-2 text-neutral-300" />When you select text on web pages (≥15 characters), we capture:</Li>
      </ul>
      <ul className="mt-3 ml-6 space-y-2">
        <Li>Selected text content</Li>
        <Li>Surrounding context (50 characters before/after)</Li>
        <Li>Page URL and timestamp</Li>
      </ul>
      <p className="mt-3 leading-relaxed">
        <span className="font-semibold text-neutral-300">Purpose:</span> Auto-save to Daily Notes for quick reference
      </p>
      <p className="mt-1 leading-relaxed text-sm">Note: This feature can be disabled in settings</p>

      <SubTitle id="page-interactions">Page Interactions (Optional - Disabled by Default)</SubTitle>
      <ul className="mt-4 space-y-2">
        <Li><FaMicrophone className="inline mr-2 text-neutral-300" />Scroll position, clicks, form submissions, page visibility</Li>
      </ul>
      <p className="mt-3 leading-relaxed"><span className="font-semibold text-neutral-300">Purpose:</span> Activity analytics and usage patterns</p>
      <p className="mt-1 leading-relaxed">
        <span className="font-semibold text-neutral-300">Control:</span> Requires explicit opt-in via <code className="bg-neutral-800 text-neutral-300 px-2 py-1 rounded-md text-sm">chrome.storage.local.set(...)</code>
      </p>

      <SubTitle id="user-content">1.2 User-Created Content</SubTitle>
      <ul className="mt-4 space-y-2">
        <Li><FaStickyNote className="inline mr-2 text-neutral-300" />Daily Notes: Text notes you create or auto-captured from selections</Li>
        <Li><FaFolder className="inline mr-2 text-neutral-300" />Workspace Configurations: Custom workspace names, categories, and organization</Li>
        <Li><FaPaintBrush className="inline mr-2 text-neutral-300" />Settings & Preferences: Theme choices, font settings, cleanup rules, excluded domains</Li>
      </ul>

      <SubTitle id="not-collect">1.3 Data We Do NOT Collect</SubTitle>
      <ul className="mt-4 space-y-3">
        <Li><FaBan className="inline mr-2 text-neutral-300" /> <span className="font-medium text-neutral-200">No server transmission:</span> All data stays on your device (Chrome local storage and IndexedDB)</Li>
        <Li><FaBan className="inline mr-2 text-neutral-300" /> <span className="font-medium text-neutral-200">No authentication data:</span> We do not collect passwords, login credentials, or authentication cookies</Li>
        <Li><FaBan className="inline mr-2 text-neutral-300" /> <span className="font-medium text-neutral-200">No financial information:</span> No payment or financial data is accessed</Li>
        <Li><FaBan className="inline mr-2 text-neutral-300" /> <span className="font-medium text-neutral-200">No cross-site tracking:</span> We do not track you across websites for advertising</Li>
        <Li><FaBan className="inline mr-2 text-neutral-300" /> <span className="font-medium text-neutral-200">No third-party sharing:</span> Your data is never sold, shared, or transmitted to third parties</Li>
      </ul>

      <SectionTitle id="how-we-use">2. How We Use Your Data</SectionTitle>
      <SubTitle id="core">2.1 Core Functionality</SubTitle>
      <p className="mt-4 leading-relaxed">All data collection serves user-facing features prominently described in the extension:</p>
      <div className="overflow-x-auto rounded-2xl glass-card glass-hover mt-6">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left p-4 font-semibold text-neutral-300">Data Type</th>
              <th className="text-left p-4 font-semibold text-neutral-300">Purpose</th>
              <th className="text-left p-4 font-semibold text-neutral-300">User Benefit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            <tr>
              <td className="p-4">History & Bookmarks</td>
              <td className="p-4">Workspace auto-creation and organization</td>
              <td className="p-4">Smart categorization of your browsing into topics</td>
            </tr>
            <tr>
              <td className="p-4">Text Selections</td>
              <td className="p-4">Daily Notes auto-capture</td>
              <td className="p-4">Quick reference without manual copy-paste</td>
            </tr>
            <tr>
              <td className="p-4">Tab Information</td>
              <td className="p-4">Tab management and voice navigation</td>
              <td className="p-4">Hands-free browsing and auto-cleanup</td>
            </tr>
            <tr>
              <td className="p-4">Page Interactions</td>
              <td className="p-4">Activity tracking (opt-in)</td>
              <td className="p-4">Personal usage insights</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SubTitle id="storage">2.2 Data Storage</SubTitle>
      <ul className="mt-4 space-y-2">
        <Li><FaDatabase className="inline mr-2 text-neutral-300" />Local Storage: All data is stored in Chrome's local storage (<code className="bg-neutral-800 text-neutral-300 px-2 py-1 rounded-md text-sm">chrome.storage.local</code>) and IndexedDB</Li>
        <Li>No Cloud Sync: Data does not leave your device unless you explicitly enable optional features (currently disabled in this build)</Li>
        <Li>Encryption: Data at rest uses Chrome's built-in storage encryption</Li>
      </ul>

      <SubTitle id="retention">2.3 Data Retention</SubTitle>
      <ul className="mt-4 space-y-2">
        <Li>History/Bookmarks: Refreshed based on your configured settings (default: 30 days)</Li>
        <Li>Daily Notes: Retained until you manually delete them</Li>
        <Li>Activity Data: Stored locally with automatic cleanup of data older than 30 days</Li>
        <Li>Cache: Dashboard data cached for 30 minutes to improve performance</Li>
      </ul>

      <SectionTitle id="permissions">3. Chrome Permissions Explained</SectionTitle>
      <p className="mt-4 leading-relaxed">CoolDesk requests the following permissions. Each is necessary for core functionality:</p>

      <SubTitle id="required-perms">Required Permissions</SubTitle>
      <div className="overflow-x-auto rounded-lg border border-neutral-800 mt-6">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left p-4 font-semibold text-neutral-300">Permission</th>
              <th className="text-left p-4 font-semibold text-neutral-300">Why We Need It</th>
              <th className="text-left p-4 font-semibold text-neutral-300">How We Use It</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            <tr><td className="p-4">storage</td><td className="p-4">Save settings, notes, and workspace data locally</td><td className="p-4">Store all user data in Chrome's local storage</td></tr>
            <tr><td className="p-4">history</td><td className="p-4">Access browsing history for workspace organization</td><td className="p-4">Read history to categorize URLs into workspaces</td></tr>
            <tr><td className="p-4">bookmarks</td><td className="p-4">Include bookmarks in workspace management</td><td className="p-4">Display and organize your saved bookmarks</td></tr>
            <tr><td className="p-4">tabs</td><td className="p-4">Manage open tabs and provide tab switching</td><td className="p-4">Display current tabs, enable voice navigation, tab cleanup</td></tr>
            <tr><td className="p-4">windows</td><td className="p-4">Manage browser windows</td><td className="p-4">Focus windows when switching tabs via voice</td></tr>
            <tr><td className="p-4">sidePanel</td><td className="p-4">Display extension UI in Chrome's side panel</td><td className="p-4">Provide the main CoolDesk interface</td></tr>
            <tr><td className="p-4">search</td><td className="p-4">Enable search functionality</td><td className="p-4">Search through your workspaces and notes</td></tr>
            <tr><td className="p-4">scripting</td><td className="p-4">Inject scripts for voice navigation and DOM interaction</td><td className="p-4">Enable "click button", "scroll down" voice commands on web pages</td></tr>
            <tr><td className="p-4">idle</td><td className="p-4">Detect user inactivity</td><td className="p-4">Trigger auto-cleanup of inactive tabs (optional feature)</td></tr>
            <tr><td className="p-4">activeTab</td><td className="p-4">Access the currently active tab</td><td className="p-4">Execute voice commands on the current page</td></tr>
            <tr><td className="p-4">contextMenus</td><td className="p-4">Add right-click menu options</td><td className="p-4">Quick actions for saving to workspaces</td></tr>
            <tr><td className="p-4">sessions</td><td className="p-4">Access recently closed tabs</td><td className="p-4">Restore recently closed tabs feature</td></tr>
          </tbody>
        </table>
      </div>

      <SubTitle id="content-scripts">Content Scripts</SubTitle>
      <ul className="mt-2">
        <Li>Scope: Runs on http://*/* and https://*/* (all web pages)</Li>
        <Li>Purpose:</Li>
      </ul>
      <ul className="mt-2">
        <Li>Track text selections for Daily Notes auto-capture</Li>
        <Li>Monitor page interactions (scroll, clicks) if telemetry is enabled</Li>
        <Li>Enable voice navigation DOM manipulation</Li>
      </ul>
      <ul className="mt-2">
        <Li>Limitations: Cannot run on chrome://, edge://, or chrome-extension:// pages</Li>
      </ul>

      <SubTitle id="no-host">No Host Permissions</SubTitle>
      <ul className="mt-2">
        <Li>Security: We do not request &lt;all_urls&gt; or broad host permissions</Li>
        <Li>Network: Content Security Policy restricts network requests to 'self' only (no external API calls from extension pages)</Li>
      </ul>

      <SectionTitle id="security">4. Data Security <FaShieldAlt className="inline ml-2 text-neutral-300" /></SectionTitle>
      <SubTitle id="transmission">4.1 Transmission Security</SubTitle>
      <ul className="mt-2">
        <Li>No Network Transmission: Data is not transmitted over the network in this build</Li>
        <Li>Local-Only: All processing happens on your device</Li>
        <Li>CSP Protection: Content Security Policy prevents unauthorized network requests</Li>
      </ul>

      <SubTitle id="storage-security">4.2 Storage Security</SubTitle>
      <ul className="mt-2">
        <Li>Chrome's Built-in Encryption: Leverages Chrome's storage encryption</Li>
        <Li>No Plain-Text Passwords: We do not store or access authentication credentials</Li>
        <Li>Isolated Storage: Extension storage is isolated from web pages</Li>
      </ul>

      <SubTitle id="third-party">4.3 Third-Party Code</SubTitle>
      <ul className="mt-2">
        <Li>Firebase SDK: Included but disabled by default in this build (AUTH_DISABLED = true)</Li>
        <Li>Voice Recognition: Uses browser's native Web Speech API (no external service)</Li>
        <Li>No Analytics: No Google Analytics, tracking pixels, or third-party analytics</Li>
      </ul>

      <SectionTitle id="user-rights">5. User Control & Privacy Rights <FaUser className="inline ml-2 text-neutral-300" /></SectionTitle>
      <SubTitle id="data-access">5.1 Data Access & Deletion <FaEye className="inline ml-2 text-neutral-300" /></SubTitle>
      <ul className="mt-2">
        <Li>View Your Data: All data is stored locally; inspect via Chrome DevTools → Application → Storage</Li>
        <Li>Delete Data:</Li>
      </ul>
      <ul className="mt-2">
        <Li>Individual items: Delete notes, workspaces via the UI</Li>
        <Li>All data: Uninstall the extension or clear Chrome storage</Li>
        <Li>Export: Currently manual (copy from UI); export feature planned</Li>
      </ul>

      <SubTitle id="opt-out">5.2 Opt-Out Options</SubTitle>
      <ul className="mt-2">
        <Li>Text Selection Tracking: Disable in Settings → Privacy (planned)</Li>
        <Li>Page Interaction Telemetry: Disabled by default; requires explicit opt-in</Li>
        <Li>Tab Auto-Cleanup: Toggle on/off via the broom icon in Current Tabs section</Li>
        <Li>Voice Navigation: Only active when you trigger it; no passive listening</Li>
      </ul>

      <SubTitle id="transparency">5.3 Transparency</SubTitle>
      <ul className="mt-2">
        <Li>Open Source: Code is available for inspection</Li>
        <Li>No Hidden Features: All data collection is for described user-facing features</Li>
        <Li>No Monetization: We do not use your data for advertising or sell it to third parties</Li>
      </ul>

      <SectionTitle id="compliance">6. Compliance with Chrome Web Store Policies <FaCheckCircle className="inline ml-2 text-neutral-300" /></SectionTitle>
      <SubTitle id="limited-use">6.1 Limited Use Requirements</SubTitle>
      <ul className="mt-2">
        <Li>✅ Allowed Use: Data is used only to provide user-facing features (workspace management, notes, tab control)</Li>
        <Li>✅ Allowed Transfer: No data is transferred to third parties</Li>
        <Li>✅ Prohibited Advertising: We do not use your data for personalized, re-targeted, or interest-based ads</Li>
        <Li>✅ Prohibited Human Interaction: No humans read your data; all processing is automated and local</Li>
      </ul>

      <SubTitle id="min-perm">6.2 Minimum Permission Principle</SubTitle>
      <ul className="mt-2">
        <Li>We request only the permissions necessary for current functionality</Li>
        <Li>No "future-proofing" with unused permissions</Li>
        <Li>Optional permissions used for add-on features (none currently active)</Li>
      </ul>

      <SubTitle id="disclosure">6.3 Prominent Disclosure</SubTitle>
      <ul className="mt-2">
        <Li>In-Product Notice: Settings panel includes privacy summary</Li>
        <Li>User Consent: Text selection auto-capture requires user awareness (planned: first-run consent dialog)</Li>
        <Li>No Hidden Collection: All data handling is disclosed in this policy and the extension description</Li>
      </ul>

      <SectionTitle id="changes">7. Changes to Disabled Features</SectionTitle>
      <SubTitle id="disabled">7.1 Currently Disabled (This Build)</SubTitle>
      <p className="mt-2 leading-7">The following features are disabled in version 0.1.0 to maintain a minimal, privacy-focused build:</p>
      <ul className="mt-2">
        <Li>Firebase Authentication: AUTH_DISABLED = true in src/services/firebase.js</Li>
        <Li>No Google sign-in or cloud sync</Li>
        <Li>Account tab hidden in Settings</Li>
        <Li>Localhost Host Sync: enableHostSync: false in src/services/syncConfig.js</Li>
        <Li>No communication with local Electron app (127.0.0.1:4000)</Li>
        <Li>WebSocket and HTTP calls gated and disabled</Li>
        <Li>Page Interaction Telemetry: Disabled by default</Li>
        <Li>Scroll/click/form tracking requires explicit opt-in</Li>
      </ul>

      <SubTitle id="future">7.2 If Re-Enabled in Future Builds</SubTitle>
      <ul className="mt-2">
        <Li>Updated Policy: This privacy policy will be updated with clear disclosure</Li>
        <Li>User Consent: Explicit opt-in required before any data transmission</Li>
        <Li>Encryption: All network transmission will use HTTPS/WSS with modern cryptography (TLS 1.2+)</Li>
        <Li>Manifest Update: Chrome will prompt you to review new permissions</Li>
      </ul>

      <SectionTitle id="children">8. Children's Privacy</SectionTitle>
      <p className="mt-2 leading-7">
        CoolDesk is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided data, please contact us to delete it.
      </p>

      <SectionTitle id="intl">9. International Users <FaGlobe className="inline ml-2 text-neutral-300" /></SectionTitle>
      <p className="mt-2 leading-7">
        CoolDesk stores all data locally on your device. No data is transferred internationally. If cloud features are enabled in future builds, we will comply with GDPR, CCPA, and other applicable data protection laws.
      </p>

      <SectionTitle id="contact">10. Contact & Questions <FaEnvelope className="inline ml-2 text-neutral-300" /></SectionTitle>
      <ul className="mt-2">
        <Li>Developer: Raghu (abhayraghuwanshi/cooldesk-extension)</Li>
        <Li>Support: Create an issue on GitHub</Li>
        <Li>Email: [Your contact email - to be added]</Li>
      </ul>
      <p className="mt-2 leading-7">For privacy concerns, data deletion requests, or questions about this policy, please reach out via the channels above.</p>

      <SectionTitle id="updates">11. Policy Updates</SectionTitle>
      <p className="mt-2 leading-7">
        We may update this Privacy Policy to reflect changes in functionality or legal requirements. Updates will be posted here with a new "Last Updated" date. Continued use of CoolDesk after updates constitutes acceptance of the revised policy.
      </p>

      <SectionTitle id="summary">12. Summary (TL;DR) <FaCheckCircle className="inline ml-2 text-neutral-300" /></SectionTitle>
      <ul className="mt-2">
        <Li><FaCheckCircle className="inline mr-2 text-neutral-300" /> All data stays on your device (Chrome local storage)</Li>
        <Li><FaCheckCircle className="inline mr-2 text-neutral-300" /> No cloud sync or external transmission (disabled in this build)</Li>
        <Li><FaCheckCircle className="inline mr-2 text-neutral-300" /> No tracking, ads, or third-party sharing</Li>
        <Li><FaCheckCircle className="inline mr-2 text-neutral-300" /> Permissions used only for described features</Li>
        <Li><FaCheckCircle className="inline mr-2 text-neutral-300" /> You control your data (delete anytime via UI or uninstall)</Li>
        <Li><FaCheckCircle className="inline mr-2 text-neutral-300" /> Open source & transparent</Li>
      </ul>

      <p className="mt-6 leading-7">
        Your privacy is our priority. CoolDesk is designed to enhance your productivity without compromising your data security.
      </p>
    </section>
  );
};

export default PrivacyPolicyStatic;

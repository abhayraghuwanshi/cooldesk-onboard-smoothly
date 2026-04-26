import React from "react";
import Navbar from "@/components/new/Navbar";

interface PolicySectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({ id, title, children }) => (
    <section id={id} className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h2>
        <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
    </section>
);

const PolicyNav: React.FC = () => {
    const sections = [
        { id: "overview", label: "Overview" },
        { id: "info-we-collect", label: "Information We Collect" },
        { id: "how-we-use", label: "How We Use Your Data" },
        { id: "permissions", label: "Chrome Permissions" },
        { id: "desktop-app", label: "Windows Desktop App" },
        { id: "website-analytics", label: "Website Analytics" },
        { id: "security", label: "Data Security" },
        { id: "user-rights", label: "User Control & Rights" },
        { id: "compliance", label: "Compliance" },
        { id: "contact", label: "Contact" },
        { id: "summary", label: "Summary" },
    ];

    return (
        <nav className="hidden lg:block w-64 shrink-0 border-r border-gray-200 p-6 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Contents</p>
            <ul className="space-y-2">
                {sections.map((section) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            className="text-sm text-gray-500 hover:text-gray-900 hover:underline block py-0.5"
                        >
                            {section.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const PrivacyPolicyStatic: React.FC = () => {
    return (
        <main className="bg-white text-gray-800 font-sans min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row pt-20">
                <PolicyNav />

                <div className="flex-1 px-6 py-12 lg:px-16 max-w-3xl">
                    <header className="mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                        <p className="text-gray-500 text-sm">Last updated: April 2026</p>
                        <p className="mt-4 text-gray-600 text-sm bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                            This policy covers both the <strong>CoolDesk browser extension</strong> and the <strong>CoolDesk Windows desktop app</strong>. Website analytics are described separately in the <a href="#website-analytics" className="underline text-blue-600">Website Analytics</a> section.
                        </p>
                    </header>

                    <PolicySection id="overview" title="Overview">
                        <p>
                            CoolDesk helps you organise browser tabs, desktop apps, links, and notes by project — all in one place. This policy explains what data we access, how it stays on your device, and your rights as a user.
                        </p>
                        <p className="font-medium text-gray-900">
                            Core principle: your browsing data never leaves your device. CoolDesk does not operate servers that store your personal data.
                        </p>
                    </PolicySection>

                    <PolicySection id="info-we-collect" title="Information We Collect">
                        <p>CoolDesk stores data <strong>locally on your device</strong> using Chrome's built-in storage. This includes:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Browsing history — limited to 30 days, max 1,000 items, used for Spotlight search</li>
                            <li>Bookmarks — for workspace organisation</li>
                            <li>Open tabs — to enable quick access and workspace grouping</li>
                            <li>Notes — text you explicitly save within the extension</li>
                            <li>Workspace configurations — project names, saved URLs, and preferences</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">
                            None of this data is transmitted to CoolDesk's servers or any third party.
                        </p>
                    </PolicySection>

                    <PolicySection id="how-we-use" title="How We Use Your Data">
                        <p>Locally stored data powers these features:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li><strong>GlobalSpotlight (Alt+K)</strong> — searches your tabs, history, bookmarks, notes, and workspaces instantly</li>
                            <li><strong>Workspaces</strong> — groups your saved URLs and apps by project</li>
                            <li><strong>Smart Tab Management</strong> — auto-groups open tabs by domain or project</li>
                            <li><strong>Notes</strong> — quick capture on new tab, including voice dictation stored locally</li>
                            <li><strong>AI SmartWorkspace</strong> — uses a local AI service to suggest project groupings from your activity; no data is sent to external AI providers</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">All processing happens on your device.</p>
                    </PolicySection>

                    <PolicySection id="permissions" title="Chrome Permissions">
                        <p>CoolDesk requests the following Chrome permissions and uses them only as described:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li><strong>tabs</strong> — read open tabs for workspace grouping and Spotlight search</li>
                            <li><strong>history</strong> — read recent browsing history (30 days) for search suggestions</li>
                            <li><strong>bookmarks</strong> — read bookmarks for workspace organisation</li>
                            <li><strong>storage</strong> — save your workspaces, notes, and preferences locally</li>
                            <li><strong>newtab override</strong> — replace the new tab page with the CoolDesk dashboard</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">
                            We do not request broad host permissions, all-URLs access, or any permission beyond what is necessary for described features.
                        </p>
                    </PolicySection>

                    <PolicySection id="desktop-app" title="Windows Desktop App">
                        <p>
                            The optional CoolDesk Windows app (currently in beta) extends Spotlight search to include your <strong>running Windows applications</strong> (e.g. VS Code, Slack, Postman).
                        </p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>The app reads the list of currently running processes from the Windows OS</li>
                            <li>This data is used only to surface running apps in the Spotlight overlay</li>
                            <li>No process data is stored persistently or transmitted externally</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">
                            The Windows app is not required. The browser extension works fully without it.
                        </p>
                    </PolicySection>

                    <PolicySection id="website-analytics" title="Website Analytics">
                        <p>
                            The <strong>cool-desk.com website</strong> (not the extension) uses Google Analytics (GA4) to collect anonymous usage statistics such as page views and session duration. This helps us understand which content is useful.
                        </p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Analytics apply only to the marketing website, not the extension or desktop app</li>
                            <li>No personally identifiable information is collected via analytics</li>
                            <li>You can opt out using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Google Analytics Opt-out Browser Add-on</a></li>
                        </ul>
                    </PolicySection>

                    <PolicySection id="security" title="Data Security">
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Extension data remains on your device — Chrome handles local storage encryption</li>
                            <li>No external servers receive your browsing, tab, or workspace data</li>
                            <li>Strict Content Security Policy prevents unauthorised network requests</li>
                            <li>The extension does not inject scripts into third-party pages</li>
                        </ul>
                    </PolicySection>

                    <PolicySection id="user-rights" title="User Control & Rights">
                        <p>You have full control over your data:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>View all stored data via Chrome DevTools → Application → Storage</li>
                            <li>Delete individual items or clear all data from within the extension settings</li>
                            <li>Uninstalling CoolDesk removes all locally stored data</li>
                        </ul>
                    </PolicySection>

                    <PolicySection id="compliance" title="Compliance">
                        <p>
                            CoolDesk complies with the <a href="https://chromewebstore.google.com/user_data_faq" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Chrome Web Store User Data Policy</a> and the Limited Use Policy. We do not sell, share, or transfer user data to third parties.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            If cloud sync or cross-device features are added in the future, this policy will be updated and users will be notified before any data leaves their device.
                        </p>
                    </PolicySection>

                    <PolicySection id="contact" title="Contact & Questions">
                        <p>For privacy questions or data requests:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Email: <a href="mailto:raghuwanshi.abhay405@gmail.com" className="underline text-blue-600">raghuwanshi.abhay405@gmail.com</a></li>
                            <li>Contact form: <a href="/contact" className="underline text-blue-600">cool-desk.com/contact</a></li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">We aim to respond within 5 business days.</p>
                    </PolicySection>

                    <PolicySection id="summary" title="Summary">
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Extension and desktop app data stays on your device — never sent to our servers</li>
                            <li>No tracking, ads, or third-party data sharing</li>
                            <li>Chrome permissions used only for the features described above</li>
                            <li>Website uses Google Analytics (anonymous, opt-outable)</li>
                            <li>You can delete all data at any time by uninstalling the extension</li>
                        </ul>
                        <p className="mt-4 font-medium text-gray-800">
                            Your privacy is central to CoolDesk — productivity without compromise.
                        </p>
                    </PolicySection>

                    <footer className="mt-16 pt-8 border-t border-gray-100 text-sm text-gray-400">
                        <p>© {new Date().getFullYear()} CoolDesk. All rights reserved.</p>
                        <p className="mt-1"><a href="/terms" className="underline hover:text-gray-600">Terms of Service</a></p>
                    </footer>
                </div>
            </div>
        </main>
    );
};

export default PrivacyPolicyStatic;

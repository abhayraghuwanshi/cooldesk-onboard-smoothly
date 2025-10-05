import React from "react";
import PolicyHeader from "./PolicyHeader";
import PolicyNav from "./PolicyNav";
import PolicySection from "./PolicySection";

/**
 * Modern Google-style Privacy Policy
 * White theme, collapsible sections, responsive layout
 */
const PrivacyPolicyStatic: React.FC = () => {
    return (
        <main className="bg-white text-gray-800 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
                <PolicyNav />

                <div className="flex-1 px-6 py-10 lg:px-12">
                    <PolicyHeader />

                    {/* Overview */}
                    <PolicySection id="overview" title="Overview">
                        CoolDesk helps you manage tabs, notes, and browsing efficiently. This
                        document explains what information we collect, how we use it, and your
                        choices regarding that information.
                    </PolicySection>

                    {/* Info We Collect */}
                    <PolicySection id="info-we-collect" title="Information We Collect">
                        <p>
                            CoolDesk stores your data <strong>locally</strong> on your device using Chrome’s
                            storage systems. We collect:
                        </p>
                        <ul className="list-disc ml-6 mt-3 space-y-2">
                            <li>Browsing history (limited to 30 days, max 1000 items)</li>
                            <li>Bookmarks for workspace organization</li>
                            <li>Open tabs to enable quick access and restoration</li>
                            <li>Selected text snippets saved to your notes</li>
                            <li>Settings, preferences, and workspace configurations</li>
                        </ul>
                        <p className="mt-4 text-gray-600 text-sm">
                            CoolDesk never transmits your data to external servers.
                        </p>
                    </PolicySection>

                    {/* How We Use */}
                    <PolicySection id="how-we-use" title="How We Use Your Data">
                        <p>We use your locally stored data to power features like:</p>
                        <ul className="list-disc ml-6 mt-3 space-y-2">
                            <li>Smart workspace creation and organization</li>
                            <li>Voice navigation and hands-free browsing</li>
                            <li>Notes and history suggestions</li>
                        </ul>
                        <p className="mt-3 text-gray-600 text-sm">
                            All processing happens on your device.
                        </p>
                    </PolicySection>

                    {/* Permissions */}
                    <PolicySection id="permissions" title="Chrome Permissions">
                        <p>
                            CoolDesk requests only essential Chrome permissions (like history,
                            bookmarks, tabs, and storage) to provide its core features.
                        </p>
                        <p className="mt-2 text-gray-600 text-sm">
                            We do not request all-URLs or any unnecessary permissions.
                        </p>
                    </PolicySection>

                    {/* Security */}
                    <PolicySection id="security" title="Data Security">
                        <ul className="list-disc ml-6 mt-3 space-y-2">
                            <li>Data remains on your device — no external transmission</li>
                            <li>Chrome handles local storage encryption automatically</li>
                            <li>Strict content security policies prevent network misuse</li>
                        </ul>
                    </PolicySection>

                    {/* User Rights */}
                    <PolicySection id="user-rights" title="User Control & Rights">
                        <p>You can:</p>
                        <ul className="list-disc ml-6 mt-3 space-y-2">
                            <li>View all stored data in Chrome DevTools</li>
                            <li>Delete any or all stored information</li>
                            <li>Uninstall CoolDesk to remove all data</li>
                            <li>Disable optional tracking and telemetry</li>
                        </ul>
                    </PolicySection>

                    {/* Compliance */}
                    <PolicySection id="compliance" title="Compliance">
                        <p>
                            CoolDesk complies with Chrome Web Store’s Limited Use Policy, ensuring no
                            unauthorized sharing or sale of user data.
                        </p>
                    </PolicySection>

                    {/* International Users */}
                    <PolicySection id="intl" title="International Users">
                        <p>
                            All processing occurs locally on your device. If cloud sync features are
                            added in the future, we will comply with GDPR, CCPA, and relevant laws.
                        </p>
                    </PolicySection>

                    {/* Contact */}
                    <PolicySection id="contact" title="Contact & Questions">
                        <ul className="list-disc ml-6 mt-3 space-y-2">
                            <li>Developer: abhayraghuwanshi</li>
                            <li>Support: GitHub Issues - <a href="https://github.com/abhayraghuwanshi/cooldesk-help">https://github.com/abhayraghuwanshi/cooldesk-help</a></li>
                            <li>Email: raghuwanshi..abhay405@gmail.com</li>
                        </ul>
                    </PolicySection>

                    {/* Summary */}
                    <PolicySection id="summary" title="Summary">
                        <ul className="list-disc ml-6 mt-3 space-y-2">
                            <li>All data stays on your device</li>
                            <li>No tracking, ads, or third-party sharing</li>
                            <li>Permissions used only for described features</li>
                            <li>You control all your data</li>
                        </ul>
                        <p className="mt-4 text-gray-700">
                            Your privacy is central to CoolDesk — productivity without compromise.
                        </p>
                    </PolicySection>
                </div>
            </div>
        </main>
    );
};

export default PrivacyPolicyStatic;

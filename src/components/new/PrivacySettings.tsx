import {
    FaAd,
    FaChartBar,
    FaDatabase,
    FaFolder,
    FaMicrophone,
    FaMousePointer,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function InfoToggleCard({
    icon,
    label,
    description,
    collected = true,
}: {
    icon: JSX.Element;
    label: string;
    description: string;
    collected?: boolean;
}) {
    return (
        <div className={`relative rounded-xl overflow-hidden p-6 transition-all duration-300 ${collected
                ? 'bg-gradient-to-r from-blue-500/10 via-blue-600/5 to-transparent border-l-4 border-blue-400'
                : 'bg-white/5 border-l-4 border-gray-600'
            }`}>
            {collected && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
            )}

            <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg flex-shrink-0 ${collected ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-700/50 text-gray-400'
                        }`}>
                        <span className="text-xl">{icon}</span>
                    </div>
                    <div className="flex-1">
                        <h3 className={`font-semibold mb-2 ${collected ? 'text-white' : 'text-gray-300'
                            }`}>{label}</h3>
                        <p className={`text-sm leading-relaxed ${collected ? 'text-gray-300' : 'text-gray-500'
                            }`}>{description}</p>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    {collected ? (
                        <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default function PrivacyPermissions() {
    const navigate = useNavigate();
    const permissions = [
        {
            key: "clicks",
            label: "Interaction Events (On‑device)",
            description:
                "No click tracking for profiling. Basic interaction events are processed on‑device only to power features. Nothing is sent externally.",
            icon: <FaMousePointer />,
            collected: true,
        },
        {
            key: "storage",
            label: "Local Storage",
            description:
                "All data stays on your device (history up to 30 days/1000 items, bookmarks, tabs, notes, preferences). Stored via Chrome storage only.",
            icon: <FaDatabase />,
            collected: true,
        },
        {
            key: "analytics",
            label: "Telemetry (On‑device, optional)",
            description:
                "No remote analytics. Optional on‑device telemetry may improve suggestions and performance. You can disable this anytime.",
            icon: <FaChartBar />,
            collected: false,
        },
        {
            key: "ads",
            label: "Advertising Metrics",
            description:
                "No ads or ad tracking. We do not collect advertising metrics or share data with third parties.",
            icon: <FaAd />,
            collected: false,
        },
        {
            key: "voice",
            label: "Voice Commands",
            description:
                "Processed entirely on‑device. We detect command intent (not content) to enable voice navigation.",
            icon: <FaMicrophone />,
            collected: true,
        },
        {
            key: "workspaces",
            label: "Workspace Sync",
            description:
                "Organizes tabs, bookmarks, and layouts locally to power smart workspaces. No data leaves your device.",
            icon: <FaFolder />,
            collected: true,
        },
    ];

    return (
        <div id="privacy" className="mx-auto max-w-5xl px-6 py-16 scroll-mt-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Your <span className="text-blue-400">Privacy</span> Matters
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Everything stays on your device. No tracking, no ads, no data sharing.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-12">
                {permissions.map((p) => (
                    <InfoToggleCard
                        key={p.key}
                        label={p.label}
                        description={p.description}
                        icon={p.icon}
                        collected={p.collected ?? true}
                    />
                ))}
            </div>

            <div className="text-center space-y-4">
                <button
                    onClick={() => navigate('/privacy-details')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                >
                    View Full Privacy Policy
                </button>
                <p className="text-sm text-gray-500">
                    Questions? Read our{" "}
                    <a href="/privacy-details" className="text-blue-400 hover:text-blue-300 underline">
                        detailed privacy policy
                    </a>
                </p>
            </div>
        </div>
    );
}
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
        <div className="flex items-center justify-between gap-4 p-5 rounded-2xl glass-card glass-hover">
            <div className="flex items-start gap-4">
                <div className="text-blue-300 text-3xl mt-1">{icon}</div>
                <div>
                    <h3 className="text-white font-semibold">{label}</h3>
                    <p className="text-gray-200 text-sm">{description}</p>
                </div>
            </div>
            <div
                role="switch"
                aria-checked={collected}
                className={`relative inline-flex h-6 w-12 flex-shrink-0 rounded-full transition-colors duration-200 glass ${collected ? "bg-blue-500/20" : "bg-white/10"}`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${collected ? "translate-x-5" : "translate-x-1"
                        }`}
                />
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
        <div className="mx-auto max-w-4xl px-6 py-16 space-y-8">
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Permissions & Data Collection
            </h2>
            <p className="text-center text-gray-200 max-w-2xl mx-auto">
                CoolDesk collects the following types of data to provide the best user experience in Chrome.
                All data is stored locally unless otherwise stated.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
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

            <div className="mt-10 text-center">
                <button
                    onClick={() => navigate('/privacy-details')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    View Full Privacy Policy
                </button>
            </div>

            <p className="mt-6 text-xs text-gray-300 text-center">
                Learn more in our{" "}
                <a href="/privacy-details" className="underline hover:text-white transition-colors duration-200">
                    Privacy Policy
                </a>
                .
            </p>
        </div>
    );
}
import {
    FaAd,
    FaChartBar,
    FaDatabase,
    FaFolder,
    FaMicrophone,
    FaMousePointer,
} from "react-icons/fa";

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
        <div className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/20 hover:bg-white/15 hover:shadow-blue-400/20 transition-all duration-300">
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
                className={`relative inline-flex h-6 w-12 flex-shrink-0 rounded-full border border-white/20 transition-colors duration-200 ${collected ? "bg-blue-500/80 backdrop-blur-sm" : "bg-white/20 backdrop-blur-sm"
                    }`}
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
    const permissions = [
        {
            key: "clicks",
            label: "Click Tracking",
            description:
                "Collects click events to understand user interaction and improve Chrome UI features.",
            icon: <FaMousePointer />,
        },
        {
            key: "storage",
            label: "Local Storage",
            description:
                "Stores preferences, tabs, and workspace data directly in Chrome.",
            icon: <FaDatabase />,
        },
        {
            key: "analytics",
            label: "Usage Analytics",
            description:
                "Collects anonymized usage metrics to improve feature design and performance.",
            icon: <FaChartBar />,
        },
        {
            key: "ads",
            label: "Advertising Metrics",
            description:
                "Tracks clicks on promotional content to measure campaign performance.",
            icon: <FaAd />,
        },
        {
            key: "voice",
            label: "Voice Commands",
            description:
                "Records basic command input (not content) to enable voice navigation features.",
            icon: <FaMicrophone />,
        },
        {
            key: "workspaces",
            label: "Workspace Sync",
            description:
                "Keeps your workspaces organized by saving tab groups and layout preferences.",
            icon: <FaFolder />,
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
                    />
                ))}
            </div>

            <p className="mt-10 text-xs text-gray-300 text-center">
                Learn more in our{" "}
                <a href="#privacy" className="underline hover:text-white transition-colors duration-200">
                    Privacy Policy
                </a>
                .
            </p>
        </div>
    );
}
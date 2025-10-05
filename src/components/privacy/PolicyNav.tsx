import React from "react";

const sections = [
    { id: "overview", label: "Overview" },
    { id: "info-we-collect", label: "Information We Collect" },
    { id: "how-we-use", label: "How We Use Data" },
    { id: "permissions", label: "Chrome Permissions" },
    { id: "security", label: "Data Security" },
    { id: "user-rights", label: "User Rights" },
    { id: "compliance", label: "Compliance" },
    { id: "intl", label: "International Users" },
    { id: "contact", label: "Contact" },
    { id: "summary", label: "Summary" },
];

const PolicyNav: React.FC = () => (
    <nav className="hidden lg:block w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-200 pr-6">
        <ul className="space-y-2 text-sm text-gray-700">
            {sections.map((sec) => (
                <li key={sec.id}>
                    <a
                        href={`#${sec.id}`}
                        className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors"
                    >
                        {sec.label}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

export default PolicyNav;

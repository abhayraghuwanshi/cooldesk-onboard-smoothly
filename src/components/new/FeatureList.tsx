interface IconProps {
    size?: number;
    className?: string;
}

interface Feature {
    illustration: JSX.Element;
    title: string;
    desc: string;
    gridClasses: string;
    bgClass: string;
}
const SiGooglechromeIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height={size} width={size} className={className} fill="currentColor">
        <title>Google Chrome</title>
        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#4285F4" />
        <path d="M17.152 14.155h-8.31a5.457 5.457 0 01-2.903-10.02l4.155 7.197 4.155-7.197a5.457 5.457 0 012.903 10.02z" fill="#34A853" />
        <path d="M6.848 14.155a5.457 5.457 0 014.152-7.197l-4.155 7.197z" fill="#167EE6" />
        <path d="M12 17.197a5.457 5.457 0 01-5.152-3.042l5.152-8.955 5.152 8.955A5.457 5.457 0 0112 17.197z" fill="#FBBC05" />
        <path d="M12 17.197a5.457 5.457 0 01-2.25-10.239l2.25 3.897 2.25-3.897a5.457 5.457 0 01-2.25 10.239z" fill="#EA4335" />
        <path d="M12 13.04a2.91 2.91S 0 100-5.82 2.91 2.91 0 000 5.82z" fill="#167EE6" />
        <path d="M12 12.155a2.022 2.022 0 100-4.045 2.022 2.022 0 000 4.045z" fill="#FFFFFF" />
    </svg>
);

const SiFirefoxIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height={size} width={size} className={className} fill="currentColor">
        <title>Firefox</title>
        <path d="M22.53 15.322a.64.64 0 0 0-.585-.034c-.21.08-.435.13-.674.148-1.03.075-1.928-.84-2.31-1.844-.344-.895.034-1.936 1.03-2.35 1-.413 2.146.033 2.537.96.223.53.18 1.11-.12 1.58-.135.21-.3.39-.495.53-.015.015-.03.03-.045.045l.135.052zm-3.856-3.322c-.63-.48-1.5-.27-1.935.405-.285.45-.63.855-1.02 1.2a2.38 2.38 0 0 1-.84.6c-.51.15-1.065.06-1.53-.24-.48-.3-1.05-.33-1.605-.12-1.35.495-2.025 1.83-1.515 3.12 1.095 2.76 4.38 4.23 7.215 3.18 2.16-1.335 2.97-4.125 1.83-6.105a3.15 3.15 0 0 0-.405-.345zM8.032 6.758a.565.565 0 0 0-.015-.765c-.09-.075-.21-.105-.33-.105a.434.434 0 0 0-.315.12c-.225.24-.315.6-.21 1.005.15.54.495 1.005.93 1.365.45.375.99.63 1.575.72.63.09 1.245-.015 1.785-.3.12-.06.225-.15.315-.255a.492.492 0 0 0 .15-.36.42.42 0 0 0-.15-.33c-.09-.075-.21-.105-.33-.075-.6.165-1.215.15-1.785-.06a2.7 2.7 0 0 1-1.62-.975z" />
    </svg>
);


// --- Custom Illustrations ---
const IllustrationWorkspaces: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="30" y="50" width="140" height="100" rx="10" fill="#e2e8f0" />
        <rect x="30" y="50" width="140" height="20" rx="5" ry="5" fill="#94a3b8" />
        <circle cx="45" cy="60" r="4" fill="#f87171" />
        <circle cx="60" cy="60" r="4" fill="#fbbd23" />
        <rect x="40" y="80" width="120" height="10" rx="5" fill="#cbd5e1" />
        <rect x="40" y="100" width="100" height="10" rx="5" fill="#cbd5e1" />

        <g transform="translate(20, -20) rotate(5, 100, 100)">
            <rect x="30" y="50" width="140" height="100" rx="10" fill="#e2e8f0" stroke="#f1f5f9" strokeWidth="4" />
            <rect x="30" y="50" width="140" height="20" rx="5" ry="5" fill="#60a5fa" />
            <circle cx="45" cy="60" r="4" fill="#f87171" />
            <circle cx="60" cy="60" r="4" fill="#fbbd23" />
            <rect x="40" y="80" width="120" height="10" rx="5" fill="#cbd5e1" />
            <rect x="40" y="100" width="80" height="10" rx="5" fill="#cbd5e1" />
        </g>
    </svg>
);
const IllustrationVoice: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M100 135 C85 135, 75 125, 75 110 L75 70 C75 55, 85 45, 100 45 C115 45, 125 55, 125 70 L125 110 C125 125, 115 135, 100 135 Z M140 110 C140 132, 122 150, 100 150 C78 150, 60 132, 60 110" fill="none" stroke="#f87171" strokeWidth="8" strokeLinecap="round" />
        <path d="M100 150 L100 165" fill="none" stroke="#f87171" strokeWidth="8" strokeLinecap="round" />
        <path d="M80 165 L120 165" fill="none" stroke="#f87171" strokeWidth="8" strokeLinecap="round" />
        <path d="M 40 100 A 60 60 0 0 1 160 100" fill="none" stroke="#fb923c" strokeWidth="6" strokeLinecap="round" strokeDasharray="5 15" opacity="0.8" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeDasharray="5 15" opacity="0.6" />
    </svg>
);
const IllustrationSearch: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="85" cy="85" r="50" fill="none" stroke="#3b82f6" strokeWidth="12" />
        <line x1="120" y1="125" x2="165" y2="170" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" />
        <rect x="30" y="150" width="60" height="8" rx="4" fill="#a5b4fc" opacity="0.7" />
        <rect x="140" y="40" width="40" height="8" rx="4" fill="#a5b4fc" opacity="0.7" />
        <circle cx="40" cy="40" r="15" fill="#c7d2fe" opacity="0.7" />
    </svg>
);
const IllustrationPins: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="40" y="50" width="120" height="100" rx="10" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2" />
        <path d="M100 20 L100 60" stroke="#4ade80" strokeWidth="6" strokeLinecap="round" />
        <circle cx="100" cy="20" r="10" fill="#4ade80" />
        <rect x="60" y="70" width="80" height="10" rx="5" fill="#d1d5db" />
        <rect x="60" y="90" width="60" height="10" rx="5" fill="#d1d5db" />
        <rect x="60" y="110" width="80" height="10" rx="5" fill="#d1d5db" />
    </svg>
);
const IllustrationThemes: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="30" y="50" width="140" height="100" rx="10" fill="#fff" stroke="#e2e8f0" strokeWidth="4" />
        <path d="M 170 50 A 60 80 0 0 0 110 130 L 170 130 Z" fill="#a78bfa" />
        <path d="M 120 20 C 140 20 140 50 120 50 L 120 20 Z" fill="#7c3aed" />
        <rect x="110" y="35" width="20" height="30" fill="#a78bfa" rx="5" />
        <rect x="100" y="50" width="40" height="10" fill="#7c3aed" rx="5" />
    </svg>
);
const IllustrationNotes: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="40" y="30" width="120" height="150" rx="10" fill="#fef9c3" />
        <line x1="60" y1="60" x2="140" y2="60" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="80" x2="140" y2="80" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="100" x2="110" y2="100" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" />
        <path d="M 60 120 L 75 135 L 100 110" stroke="#fbbf24" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="110" y1="125" x2="140" y2="125" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="150" x2="140" y2="150" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

const IllustrationTabManagement: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="25" y="40" width="150" height="120" rx="10" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M25 50 a10 10 0 0 1 10 -10 H 165 a10 10 0 0 1 10 10 V 50 H 25 Z" fill="#cbd5e1" />
        <rect x="40" y="30" width="30" height="20" rx="4" fill="#60a5fa" />
        <rect x="75" y="30" width="30" height="20" rx="4" fill="#f87171" />
        <rect x="110" y="30" width="30" height="20" rx="4" fill="#4ade80" />
        <path d="M 80 80 L 100 100 L 80 120" stroke="#3b82f6" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="120" y1="90" x2="150" y2="90" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        <line x1="120" y1="110" x2="140" y2="110" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
    </svg>
);


export const features: Feature[] = [
    {
        illustration: <IllustrationWorkspaces />,
        title: 'Automatic Workspaces',
        desc: 'Workspaces? Automatic. Tabs sort themselves by project, context, or vibe. Stay focused without the manual drag.',
        gridClasses: 'md:col-span-2 md:row-span-2',
        bgClass: 'bg-slate-200',
    },
    {
        illustration: <IllustrationVoice />,
        title: 'Voice Navigation',
        desc: 'Voice? Commanded. Talk to your browser.',
        gridClasses: 'md:col-span-1',
        bgClass: 'bg-rose-100',
    },
    {
        illustration: <IllustrationSearch />,
        title: 'Almighty Search',
        desc: 'One bar to find tabs, links, notes, tasks, and more.',
        gridClasses: 'md:col-span-1',
        bgClass: 'bg-blue-100',
    },
    {
        illustration: <IllustrationPins />,
        title: 'Pins & Cool Feed',
        desc: 'Your important links always in sight.',
        gridClasses: 'md:col-span-1',
        bgClass: 'bg-green-100',
    },
    {
        illustration: <IllustrationThemes />,
        title: 'Themes & UI',
        desc: 'Choose your mood — sleek, bold, or minimal.',
        gridClasses: 'md:col-span-2',
        bgClass: 'bg-purple-100',
    },
    {
        illustration: <IllustrationNotes />,
        title: 'Notes & To-Do',
        desc: 'Jot it down. Check it off. Stay sharp.',
        gridClasses: 'md:col-span-1',
        bgClass: 'bg-yellow-100',
    },
    {
        illustration: <IllustrationTabManagement />,
        title: 'Smart Tab Management',
        desc: 'Automatically snooze, group, and archive inactive tabs to save memory.',
        gridClasses: 'md:col-span-2',
        bgClass: 'bg-cyan-100',
    },
];


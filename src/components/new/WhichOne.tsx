import { Chrome, Monitor, Sparkles } from 'lucide-react';

/**
 * "Which one do I need?" — extension vs desktop app vs both, as a full-width
 * strip along the bottom of the Downloads panel, under both columns.
 *
 * Grounded in cooldesk-extension: the extension's new tab is the Overview
 * dashboard (app/ExtensionApp.jsx); it pushes open tabs to the desktop app's
 * local sidecar on 127.0.0.1:4545 (background.js, bridge.js; host sync on by
 * default in services/syncConfig.js), and picking one in Spotlight sends
 * jump-to-tab back (/cmd/jump-to-tab).
 */

const OPTIONS = [
    {
        icon: Chrome,
        name: 'Just the extension',
        where: 'Chrome, Edge, Brave',
        text: 'Your new tab: widgets, favorites, your open tabs and what’s playing.',
    },
    {
        icon: Monitor,
        name: 'Just the desktop app',
        where: 'Windows, macOS, Linux',
        text: 'Spotlight on Alt+K, projects, the file manager, layouts and the AI agent.',
    },
    {
        icon: Sparkles,
        name: 'Both together',
        where: 'Recommended',
        best: true,
        text: 'Spotlight also finds your browser tabs and jumps straight to one. They connect on their own, locally.',
    },
];

export default function WhichOne() {
    return (
        <div className="border-t border-white/15">
            <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/15">
                <p className="label">Which one do I need?</p>
            </div>
            <div className="grid md:grid-cols-3 md:divide-x divide-y md:divide-y-0 divide-white/15">
                {OPTIONS.map((o) => (
                    <div key={o.name} className={`flex items-start gap-4 px-5 py-4 ${o.best ? 'bg-sky-400/[0.04]' : ''}`}>
                        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${o.best ? 'bg-sky-400/10 border-sky-400/30' : 'bg-white/5 border-white/15'}`}>
                            <o.icon className={`w-[18px] h-[18px] ${o.best ? 'text-sky-300' : 'text-white/70'}`} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="heading-5 flex flex-wrap items-baseline gap-x-2">
                                {o.name}
                                <span className={`text-[11px] font-medium ${o.best ? 'text-sky-300' : 'text-white/40'}`}>{o.where}</span>
                            </p>
                            <p className="caption mt-1 leading-relaxed">{o.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

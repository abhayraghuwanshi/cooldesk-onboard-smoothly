import { Check, Chrome, Monitor, Sparkles } from 'lucide-react';

/**
 * "Which one do I need?" — the extension vs the desktop app vs both, shown at
 * the top of Downloads where people make that choice.
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
        points: ['Replaces your new tab', 'Widgets, favorites and a resume card', 'Your open tabs and what’s playing'],
    },
    {
        icon: Monitor,
        name: 'Just the desktop app',
        where: 'Windows, macOS, Linux',
        points: ['Spotlight on Alt+K, from anywhere', 'Projects, file manager, layouts', 'AI agent with /agent'],
    },
    {
        icon: Sparkles,
        name: 'Both together',
        where: 'Recommended',
        best: true,
        points: ['Spotlight finds your browser tabs too', 'Picking one jumps straight to it', 'They connect on their own, locally'],
    },
];

export default function WhichOne() {
    return (
        <div className="mb-10">
            <h3 className="text-sm font-semibold text-white/80 mb-4">Which one do I need?</h3>
            <div className="grid md:grid-cols-3 gap-4">
                {OPTIONS.map((o) => (
                    <div
                        key={o.name}
                        className={`rounded-2xl border p-5 ${o.best ? 'border-sky-400/30 bg-gradient-to-b from-sky-400/[0.08] to-transparent' : 'border-white/10 bg-white/[0.02]'}`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center gap-2 font-semibold text-white">
                                <o.icon className={`w-4 h-4 ${o.best ? 'text-sky-300' : 'text-white/60'}`} />
                                {o.name}
                            </span>
                            <span className={`text-[11px] font-medium ${o.best ? 'text-sky-300' : 'text-white/40'}`}>{o.where}</span>
                        </div>
                        <ul className="space-y-1.5">
                            {o.points.map((p) => (
                                <li key={p} className="flex items-start gap-2 text-sm text-white/60">
                                    <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${o.best ? 'text-sky-300' : 'text-white/35'}`} />
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

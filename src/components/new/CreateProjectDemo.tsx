import { Bot, Check, Code2, Folder, Globe, Sparkles } from 'lucide-react';
import React from 'react';
import './spotlight-demo.css';

/**
 * How a project gets made: the app's `/new-workspace` wizard, shown as three
 * still Spotlight panels (name → add what it needs → create). Wording, badge
 * and hints are the app's own — cooldesk-extension/src/features/spotlight:
 * useNewWorkspaceMode.js (steps), GlobalSpotlight.jsx (placeholders, the
 * "New workspace" badge), parts/NewWorkspacePanel.jsx (hints, confirm panel).
 * Styles: spotlight-demo.css.
 */

function Panel({ query, placeholder, children }: { query?: string; placeholder: string; children: React.ReactNode }) {
    return (
        <div className="cd-spotlight h-full" aria-hidden="true">
            <div className="spotlight-container h-full" style={{ maxWidth: 'none' }}>
                <div className="spotlight-search-box">
                    <span className="spotlight-prompt">{'>'}</span>
                    <span className="spotlight-mode-badge">New workspace</span>
                    <span className="spotlight-input truncate" style={{ lineHeight: 1.3, color: query ? undefined : 'rgba(255, 255, 255, 0.3)' }}>
                        {query || placeholder}
                    </span>
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}

const Chip = ({ icon: Icon, label }: { icon: typeof Folder; label: string }) => (
    <span className="spotlight-agent-chip inline-flex items-center gap-1.5">
        <Icon className="w-3 h-3" strokeWidth={2} />
        {label}
    </span>
);

const STEPS: { n: string; title: string; text: string; panel: React.ReactNode }[] = [
    {
        n: '1',
        title: 'Name it',
        text: 'Open Spotlight, type /new-workspace and give the project a name.',
        panel: (
            <Panel query="my-app" placeholder="Name this workspace…">
                <div className="spotlight-ai-hint">Type a name for the workspace, then press Enter.</div>
            </Panel>
        ),
    },
    {
        n: '2',
        title: 'Add what it needs',
        text: 'Search and click to attach its folders, apps and links from your open tabs. All optional.',
        panel: (
            <Panel query="vite" placeholder="Search for a folder, app, or link to add (Enter to skip)…">
                <div className="spotlight-agent-chips">
                    <Chip icon={Folder} label="my-app" />
                    <Chip icon={Code2} label="VS Code" />
                    <Chip icon={Globe} label="localhost:5173" />
                </div>
                <div className="spotlight-results" style={{ height: 'auto' }}>
                    <div className="result-item selected result-folder">
                        <div className="result-icon"><Folder /></div>
                        <div className="result-content">
                            <span className="result-title">my-app</span>
                            <span className="result-desc">~/projects/my-app</span>
                        </div>
                        <div className="result-hint"><span>Add</span><span className="shortcut-key">↵</span></div>
                    </div>
                    <div className="result-item result-tab">
                        <div className="result-icon"><Globe /></div>
                        <div className="result-content">
                            <span className="result-title">my-app — Vite + React</span>
                            <span className="result-desc">localhost:5173</span>
                        </div>
                        <span className="result-badge">Tab</span>
                    </div>
                </div>
            </Panel>
        ),
    },
    {
        n: '3',
        title: 'Create',
        text: 'Press Enter. The project opens straight away, and you can keep adding to it later.',
        panel: (
            <Panel placeholder="Press Enter to create…">
                <div className="spotlight-agent-proposal">
                    <div className="spotlight-agent-proposal-head">2 folders and 1 link attached.</div>
                    <label>
                        <span className="spotlight-agent-checkbox"><Check className="w-2.5 h-2.5 text-[#052e16]" strokeWidth={3} /></span>
                        <span>Also set up <code>.cooldesk/</code></span>
                    </label>
                    <div className="spotlight-agent-confirm">
                        <span className="spotlight-agent-apply">Create</span>
                        <span className="spotlight-agent-discard">Back</span>
                    </div>
                </div>
            </Panel>
        ),
    },
];

export default function CreateProjectDemo() {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#0b0c0f] p-4 sm:p-6">
            <div className="grid md:grid-cols-3 gap-5">
                {STEPS.map((s) => (
                    <figure key={s.n} className="m-0 flex flex-col">
                        <div className="h-[196px]">{s.panel}</div>
                        <figcaption className="mt-4">
                            <p className="flex items-center gap-2 text-base font-semibold text-white">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/15 text-[11px] font-mono text-white/70">{s.n}</span>
                                {s.title}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-white/55">{s.text}</p>
                        </figcaption>
                    </figure>
                ))}
            </div>
            {/* Or let the AI do it. /agent returns a proposal you Apply or Discard
                (parts/AgentPanel.jsx); "group by project" is SmartWorkspace. */}
            <div className="mt-6 pt-5 border-t border-white/[0.07] grid md:grid-cols-2 gap-4 text-sm text-white/55">
                <p className="flex items-start gap-2.5">
                    <Bot className="w-4 h-4 mt-0.5 shrink-0 text-white/40" strokeWidth={1.75} />
                    <span>
                        <b className="font-semibold text-white/85">Or ask the AI.</b> Type <code className="font-mono text-[13px] text-white/80">/agent</code> and
                        say “make a project for my-app with the links I use for it”. It finds them in your tabs, history and
                        bookmarks and sets it up; you check the change before applying it.
                    </span>
                </p>
                <p className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-white/40" strokeWidth={1.75} />
                    <span>
                        <b className="font-semibold text-white/85">Already have a pile of tabs?</b> Open the AI workspace
                        manager and type “group by project”. It sorts them into projects for you.
                    </span>
                </p>
            </div>
        </div>
    );
}

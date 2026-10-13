import { useSectionView } from '@/lib/analytics';
import { CheckSquare, Database, ShieldCheck, Terminal } from 'lucide-react';

/**
 * How /agent works. Claims follow cooldesk-extension:
 * - src/features/spotlight/aiAdapters.js — the agent is the user's own
 *   terminal CLI (claude -p, opencode run --standalone, codex exec, or a
 *   custom one from Settings); Claude Code is only allowed WebSearch,
 *   WebFetch and the cooldesk MCP tools (no shell, no file edits).
 * - src-tauri/src/sidecar/mcp.rs — read-only MCP server on 127.0.0.1:4545:
 *   open_tabs, visited_sites, unfiled_pages, site_usage, app_usage,
 *   list_apps, suggest_workspace.
 * - src/features/spotlight/useAiCli.js — proposed changes are a checklist
 *   the user Applies; nothing changes on its own.
 */

const CLIS = ['Claude Code', 'opencode', 'Codex CLI', 'Any CLI you add'];

const STEPS = [
    { Icon: Terminal, title: 'Your own AI', text: 'No extra subscription or API key.' },
    { Icon: Database, title: 'Knows your tabs', text: 'Reads your tabs, history and apps.' },
    { Icon: ShieldCheck, title: 'Read-only', text: 'It can look, not change.' },
    { Icon: CheckSquare, title: 'You approve', text: 'Nothing changes until you Apply.' },
];

export default function AgentShowcase() {
    const sectionRef = useSectionView<HTMLElement>('agent_showcase');

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Bring your own AI</h2>
                    <p className="mt-3 text-white/55 text-base md:text-lg">
                        Type /agent and the AI you already use organizes your work.
                    </p>
                </div>

                {/* Supported CLIs */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {CLIS.map((name) => (
                        <span
                            key={name}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-white/70"
                        >
                            {name}
                        </span>
                    ))}
                </div>

                {/* The flow, in one line */}
                <div className="mx-auto mt-8 flex w-fit max-w-full flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-center font-mono text-[12.5px] text-white/70 md:flex-row md:gap-3">
                    <span className="text-sky-300">/agent group my tabs</span>
                    <span className="text-white/30">→</span>
                    <span>AI proposes spaces</span>
                    <span className="text-white/30">→</span>
                    <span className="text-green-400">you Apply</span>
                </div>

                <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {STEPS.map(({ Icon, title, text }) => (
                        <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-center">
                            <span className="mx-auto grid h-9 w-9 place-items-center rounded-xl bg-sky-400/10 text-sky-300">
                                <Icon className="h-4 w-4" />
                            </span>
                            <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-white/50">{text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

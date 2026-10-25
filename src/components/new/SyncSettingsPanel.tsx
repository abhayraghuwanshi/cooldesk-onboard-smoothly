import { trackEvent } from '@/lib/analytics';
import { Cog, Database, Palette, Rocket } from 'lucide-react';
import { useState } from 'react';

/**
 * The extension's Settings → General → Sync card, drawn in HTML so the
 * getting-started guide can show exactly where Desktop Sync lives. Labels,
 * hints and status colours are copied from cooldesk-extension
 * src/features/settings/SettingsModal.jsx (the "Sync" section); the sidebar
 * shows the tabs the extension has (General, Appearance, Local AI).
 * Used on /getting-started (step 3) and /new-tab (Connect); `pageType`
 * tells the two apart in analytics.
 * Keep in step with that file when it changes.
 */

type Status = 'connected' | 'missing' | 'off';

const STATUS: Record<Status, { dot: string; hint: string; label: string }> = {
    connected: { dot: '#4ade80', hint: 'App connected', label: 'App running' },
    missing: { dot: '#ef4444', hint: 'App not found — is it running?', label: 'App not running' },
    off: { dot: '#475569', hint: 'Sync disabled', label: 'Sync off' },
};

const TABS = [
    { label: 'General', Icon: Cog },
    { label: 'Appearance', Icon: Palette },
    { label: 'Local AI', Icon: Rocket },
];

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label="Desktop Sync"
            onClick={onClick}
            className={`relative h-[22px] w-10 shrink-0 rounded-full transition-colors ${on ? 'bg-sky-500' : 'bg-white/15'}`}
        >
            <span className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-[left] ${on ? 'left-[21px]' : 'left-[3px]'}`} />
        </button>
    );
}

function Row({ label, hint, right, last = false }: { label: React.ReactNode; hint: string; right: React.ReactNode; last?: boolean }) {
    return (
        <div className={`flex items-center justify-between gap-4 px-4 py-3 ${last ? '' : 'border-b border-white/[0.07]'}`}>
            <div className="min-w-0">
                <div className="text-[14px] font-medium text-white">{label}</div>
                <div className="mt-0.5 text-[12.5px] text-white/50">{hint}</div>
            </div>
            {right}
        </div>
    );
}

const smallBtn = 'inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-[12px] font-medium';

export default function SyncSettingsPanel({ pageType = 'guide' }: { pageType?: string }) {
    const [status, setStatus] = useState<Status>('connected');
    const on = status !== 'off';
    const s = STATUS[status];

    const show = (next: Status) => {
        setStatus(next);
        trackEvent('sync_status_preview', { page_type: pageType, status: next });
    };

    return (
        <figure className="not-prose">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                    <span className="text-[13px] font-semibold text-white/85">Settings</span>
                    <span aria-hidden="true" className="text-white/35">✕</span>
                </div>
                <div className="grid grid-cols-[auto_1fr]">
                    <ul className="space-y-1 border-r border-white/10 p-2 sm:w-40">
                        {TABS.map(({ label, Icon }, i) => (
                            <li
                                key={label}
                                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] ${i === 0 ? 'bg-white/[0.08] font-medium text-white' : 'text-white/45'}`}
                            >
                                <Icon className="h-3.5 w-3.5 shrink-0" />
                                <span className="hidden sm:inline">{label}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="min-w-0 space-y-2 p-3 sm:p-4">
                        <p aria-hidden="true" className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25">Behaviour · · ·</p>
                        <p className="px-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">Sync</p>
                        <div className="rounded-xl border border-sky-300/30 bg-white/[0.03] ring-1 ring-sky-300/15">
                            <Row
                                label="Desktop Sync"
                                hint="Connect to the CoolDesk desktop app on port 4545"
                                right={<Toggle on={on} onClick={() => show(on ? 'off' : 'connected')} />}
                            />
                            <Row
                                label={
                                    <span className="flex items-center gap-1.5">
                                        Status
                                        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
                                    </span>
                                }
                                hint={s.hint}
                                last
                                right={
                                    <div className="flex shrink-0 gap-1.5">
                                        {status === 'missing' && <span className={`${smallBtn} border-white/15 text-white/75`}>Retry</span>}
                                        <span className={`${smallBtn} ${status === 'connected' ? 'border-sky-300/40 bg-sky-400/10 text-sky-200' : 'border-white/10 text-white/30'}`}>
                                            <Database className="h-3 w-3" />
                                            Sync Now
                                        </span>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center gap-2 text-[13.5px] text-white/50">
                <span>See each status:</span>
                {(Object.keys(STATUS) as Status[]).map((k) => (
                    <button
                        key={k}
                        type="button"
                        aria-pressed={status === k}
                        onClick={() => show(k)}
                        className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 text-[13px] ${status === k ? 'border-white/30 text-white' : 'border-white/10 text-white/60 hover:text-white'}`}
                    >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[k].dot }} />
                        {STATUS[k].label}
                    </button>
                ))}
            </figcaption>
        </figure>
    );
}

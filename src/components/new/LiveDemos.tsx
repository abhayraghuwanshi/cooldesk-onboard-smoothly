import { trackEvent, useSectionView } from '@/lib/analytics';
import { useId, useState } from 'react';
import FileManagerDemo from './FileManagerDemo';
import SpotlightHero from './SpotlightHero';
import WorkspaceCardDemo from './WorkspaceCardDemo';

/**
 * "Try it right here": live, interactive copies of the app's own screens,
 * one at a time behind three tabs. Each demo is the app's markup and styles
 * over mock data (see the demo components' headers for their sources), so
 * what visitors click here behaves like the real thing.
 *
 * Only the open tab's demo is mounted, so the others cost nothing. Every tab's
 * name and description is in the HTML for search engines.
 */

// The Spotlight demo plays through "/" commands and the /f, /a, /u scopes
// until someone clicks into it. Module-level so the array is stable.
const COMMAND_SCRIPT = ['/', '/f vite', '/a code', '/u local'];

function SearchDemo() {
    return (
        <div className="rounded-xl bg-[#101114] px-4 py-10 md:py-14">
            <SpotlightHero script={COMMAND_SCRIPT} glow={false} />
        </div>
    );
}

const DEMOS: { key: string; label: string; title: string; hint: string; Demo: () => React.ReactElement }[] = [
    {
        key: 'search',
        label: 'Search',
        title: 'Find anything with one shortcut',
        hint: 'Click into it and type: tabs, apps and files come up in one list. Start with / for commands, or use /f, /a and /u to search only files, apps or tabs.',
        Demo: SearchDemo,
    },
    {
        key: 'space',
        label: 'A space',
        title: 'Everything for one project, in one space',
        hint: 'Change the status, tick off a to-do, or write a note. Anything already open is marked, so one click takes you back to it.',
        Demo: WorkspaceCardDemo,
    },
    {
        key: 'files',
        label: 'File manager',
        title: 'Browse files without leaving CoolDesk',
        hint: 'Click through the folders and open a file to preview it. The space’s commands sit along the top.',
        Demo: FileManagerDemo,
    },
];

export default function LiveDemos() {
    const sectionRef = useSectionView<HTMLElement>('live_demos');
    const [active, setActive] = useState(DEMOS[0].key);
    const tabsId = useId();

    const choose = (key: string) => {
        setActive(key);
        trackEvent('live_demo_tab', { demo: key });
    };

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6 pt-12">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Try it right here</h2>
                    <p className="mt-3 text-white/55 text-base md:text-lg">
                        Live copies of the app’s own screens. Type, click and explore. Nothing to install.
                    </p>

                    <div role="tablist" aria-label="Live demos" className="mt-8 inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                        {DEMOS.map((d) => (
                            <button
                                key={d.key}
                                id={`${tabsId}-tab-${d.key}`}
                                type="button"
                                role="tab"
                                aria-selected={active === d.key}
                                aria-controls={`${tabsId}-panel-${d.key}`}
                                onClick={() => choose(d.key)}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${active === d.key ? 'bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]' : 'text-white/50 hover:text-white/80'}`}
                            >
                                {d.label}
                            </button>
                        ))}
                    </div>
                </div>

                {DEMOS.map((d) => (
                    <div
                        key={d.key}
                        id={`${tabsId}-panel-${d.key}`}
                        role="tabpanel"
                        aria-labelledby={`${tabsId}-tab-${d.key}`}
                        hidden={active !== d.key}
                        className="mt-10 max-w-5xl mx-auto"
                    >
                        <div className="text-center max-w-2xl mx-auto mb-6">
                            <h3 className="text-lg md:text-xl font-semibold">{d.title}</h3>
                            <p className="mt-1 text-sm text-white/50 leading-relaxed">{d.hint}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#07080a] p-2 sm:p-3 overflow-x-auto">
                            {active === d.key && <d.Demo />}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

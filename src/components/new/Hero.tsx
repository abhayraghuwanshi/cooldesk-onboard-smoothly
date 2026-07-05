import { useSectionView } from '@/lib/analytics';


const POINTS = [
    {
        title: 'Search',
        desc: 'One Alt+K spotlight across tabs, history, files, folders, apps and workspaces — reaching your whole machine, not just the active window.',
    },
    {
        title: 'Organise',
        desc: 'Group tabs, links, notes and running apps by project into one new-tab workspace — everything for a task in a single place.',
    },
    {
        title: 'Share',
        desc: 'Publish a curated workspace and hand it over as a link — a ready-made set of tabs and resources anyone can open.',
    },
];

function Hero() {

    const sectionRef = useSectionView<HTMLElement>('hero');



    return (
        <section ref={sectionRef} id="home" className="relative text-white overflow-hidden isolate z-20 scroll-mt-20">

            <div className="absolute inset-0 z-0 bg-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-transparent to-blue-500/3" />

            <div className="relative z-20 w-full container mx-auto px-6 pt-28 pb-16 md:py-24">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

                    <div className="flex-1 text-left">
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                            Launchers open apps. CoolDesk opens your work.
                        </h1>
                        <p className="text-base md:text-lg text-white/60 max-w-md mb-8 leading-relaxed">
                            CoolDesk knows what project you're on. Press Alt+K to find any tab, app, file or note — or switch projects and get everything back exactly where you left it. Across browser and desktop, on Windows and Mac.
                        </p>

                        <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-white/40">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                100% Free
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                No Sign-in Required
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                100% Local
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center md:justify-end">
                        <div className="relative group w-full max-w-xl">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-[20px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative rounded-[20px] overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A]">
                                <img
                                    src="/cooldesk-new.png"
                                    alt="CoolDesk Spotlight — search workspaces, tabs and apps from anywhere"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* What makes CoolDesk cool */}
                <div className="mt-20 md:mt-28">

                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-8">
                        What makes CoolDesk cool
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
                        {POINTS.map((p) => (
                            <div key={p.title} className="flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-1.5">{p.title}</h3>
                                <p className="text-[13px] text-gray-400 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Hero;

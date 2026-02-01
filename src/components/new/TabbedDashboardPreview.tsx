import { useEffect, useRef, useState } from 'react';

const navItems = [
    {
        id: 'projects', label: 'Projects', src: '/a2.png', icon: (
            <svg className="w-6 h-6 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" /></svg>
        )
    },
    {
        id: 'overview', label: 'Overview', src: '/a0.png', icon: (
            <svg className="w-6 h-6 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
        )
    },
    {
        id: 'workspaces', label: 'Workspaces', src: '/a3.png', icon: (
            <svg className="w-6 h-6 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" /></svg>
        )
    },
    {
        id: 'team', label: 'Team', src: '/a5.png', icon: (
            <svg className="w-6 h-6 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
        )
    },
    {
        id: 'notes', label: 'Quick Notes', src: '/a4.png', icon: (
            <svg className="w-6 h-6 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
        )
    },
];

export default function TabbedDashboardPreview() {
    const [activeId, setActiveId] = useState(navItems[0].id);
    const [hasScrolled, setHasScrolled] = useState(false);
    const viewportRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const activeItem = navItems.find(t => t.id === activeId) || navItems[0];

    useEffect(() => {
        const viewport = viewportRef.current;
        const container = containerRef.current;
        if (!viewport || !container) return;

        const handleWheel = (e: WheelEvent) => {
            if (container.contains(e.target as Node)) {
                const canScrollDown = viewport.scrollHeight > viewport.scrollTop + viewport.clientHeight;
                const canScrollUp = viewport.scrollTop > 0;

                if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
                    e.preventDefault();
                    viewport.scrollTop += e.deltaY;
                    if (!hasScrolled) setHasScrolled(true);
                }
            }
        };

        const handleKeydown = (e: KeyboardEvent) => {
            if (container.contains(document.activeElement) || container.contains(e.target as Node)) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    const scrollAmount = e.key === 'ArrowDown' ? 60 : -60;
                    const canScrollDown = viewport.scrollHeight > viewport.scrollTop + viewport.clientHeight;
                    const canScrollUp = viewport.scrollTop > 0;

                    if ((scrollAmount > 0 && canScrollDown) || (scrollAmount < 0 && canScrollUp)) {
                        e.preventDefault();
                        viewport.scrollTop += scrollAmount;
                        if (!hasScrolled) setHasScrolled(true);
                    }
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [hasScrolled]);

    return (
        <section className="py-24 bg-black relative overflow-hidden isolate">
            {/* Dynamic Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="heading-2 mb-4 text-white">Your <span className="text-gradient">Smart Nav Center</span></h2>
                    <p className="body-lg max-w-2xl mx-auto text-txt-secondary">
                        Experience the frictionless transition between search, focus, and organization. Everything you need, one single tab.
                    </p>
                </div>

                {/* Ultra-Premium Browser Mockup */}
                <div
                    ref={containerRef}
                    tabIndex={0}
                    className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#121212] shadow-[0_0_120px_-30px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-500 group/browser"
                >

                    {/* Glassy Browser Chrome Header */}
                    <div className="bg-zinc-900/80 backdrop-blur-xl flex items-end px-2 md:px-4 pt-3 border-b border-white/5">
                        <div className="hidden md:flex gap-2 px-4 pb-4 w-32 shrink-0">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-lg shadow-red-500/20" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-lg shadow-yellow-500/20" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-lg shadow-green-500/20" />
                        </div>

                        {/* Realistic Single Tab */}
                        <div className="flex-1 flex max-w-[240px] md:max-w-sm">
                            <div className="relative bg-[#1a1a1a] text-white px-4 md:px-10 py-3 rounded-t-2xl text-[10px] md:text-xs font-bold flex items-center gap-2 md:gap-3 border-t border-x border-white/5 shadow-2xl">
                                <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded shadow-md" />
                                <span className="tracking-tight truncate">new tab</span>
                                <svg className="w-3.5 h-3.5 ml-auto text-white/30 cursor-pointer hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>

                                {/* Refined Slants */}
                                <div className="absolute -left-[10px] bottom-0 w-[10px] h-[10px] bg-[#1a1a1a]" />
                                <div className="absolute -left-[10px] bottom-0 w-[10px] h-[10px] bg-zinc-900/80 rounded-br-[10px]" />
                                <div className="absolute -right-[10px] bottom-0 w-[10px] h-[10px] bg-[#1a1a1a]" />
                                <div className="absolute -right-[10px] bottom-0 w-[10px] h-[10px] bg-zinc-900/80 rounded-bl-[10px]" />
                            </div>
                        </div>

                        <div className="ml-auto flex items-center gap-2 md:gap-4 px-2 md:px-6 pb-4 text-white/20">
                            <svg className="hidden md:block w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <div className="hidden md:block w-px h-6 bg-white/5 mx-2" />
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>

                    {/* Dashboard Internal Container */}
                    <div className="flex bg-[#0a0a0a] min-h-[500px] md:aspect-[16/9] relative overflow-hidden">

                        {/* Immersive Content Viewport */}
                        <div className="flex-1 relative overflow-hidden bg-zinc-950/20 group/content">
                            {/* Premium Floating Dock Navigation */}
                            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-40 transition-transform duration-500 hover:scale-105">
                                <div className="flex items-center gap-1.5 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                    {navItems.map(item => (
                                        <div key={item.id} className="relative group/dock-item">
                                            {/* Active Label Bubble */}
                                            {activeId === item.id && (
                                                <div className="absolute -top-12 md:-top-14 left-1/2 -translate-x-1/2 bg-[#5fffd7] text-[#0a0a0a] px-3 md:px-5 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-black whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                    {item.label}
                                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#5fffd7] rotate-45" />
                                                </div>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setActiveId(item.id);
                                                    if (viewportRef.current) viewportRef.current.scrollTop = 0;
                                                }}
                                                className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${activeId === item.id
                                                    ? 'bg-white/10 text-white border border-white/20 scale-110'
                                                    : 'text-white/40 hover:bg-white/5 hover:text-white/60 border border-transparent'
                                                    }`}
                                            >
                                                {item.icon}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Floating Glows */}
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                                <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] transition-opacity duration-1000 ${activeId === 'search' ? 'opacity-100' : 'opacity-0'}`} />
                                <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] transition-opacity duration-1000 ${activeId === 'dashboard' ? 'opacity-100' : 'opacity-0'}`} />
                            </div>

                            <div
                                ref={viewportRef}
                                className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth relative z-10"
                            >
                                <img
                                    key={activeId}
                                    src={activeItem.src}
                                    alt={activeItem.label}
                                    className="w-full h-auto object-top animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out shadow-2xl"
                                />
                            </div>

                            {/* Compact Context Card */}
                            <div className="absolute top-4 right-4 md:top-6 md:right-6 max-w-[180px] md:max-w-[240px] animate-in slide-in-from-top-4 duration-1000 pointer-events-none z-30">
                                <div className="bg-black/60 backdrop-blur-3xl border border-white/10 p-3 md:p-5 rounded-xl md:rounded-2xl shadow-2xl relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
                                        <span className="text-[8px] md:text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">Context</span>
                                    </div>
                                    <h3 className="text-sm md:text-lg font-bold text-white mb-0.5 md:mb-1 tracking-tight">{activeItem.label}</h3>
                                    <p className="text-[11px] md:text-[13px] text-white/50 leading-snug font-medium">
                                        Experience lightning-fast access to your workspace in one unified, high-performance view.
                                    </p>
                                </div>
                            </div>

                            {/* Refined Scroll Interaction Hint */}
                            {!hasScrolled && (
                                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 opacity-0 group-browser/browser:opacity-100 transition-opacity duration-700 animate-bounce">
                                    <div className="w-10 h-14 rounded-full border-2 border-white/10 flex justify-center p-2 backdrop-blur-md bg-white/5">
                                        <div className="w-1.5 h-4 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                                    </div>
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Explore Dashboard</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}

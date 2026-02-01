import React from 'react';

interface BrowserMockupProps {
    children: React.ReactNode;
    url?: string;
    className?: string;
    height?: string;
}

export default function BrowserMockup({ children, url = "cool-desk.com", className = "", height = "400px" }: BrowserMockupProps) {
    return (
        <div className={`relative rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-2xl flex flex-col ${className}`}>
            {/* Browser Header / Controls */}
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-black/20">
                <div className="flex gap-1.5 w-1/4">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm shadow-[#ff5f56]/20" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm shadow-[#ffbd2e]/20" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm shadow-[#27c93f]/20" />
                </div>

                {/* Mock Address Bar */}
                <div className="flex-1 max-w-md mx-4">
                    <div className="bg-black/20 rounded-md px-3 py-1 flex items-center gap-2 border border-white/5">
                        <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2h12zm-6-4h.01M12 11V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-[10px] text-white/40 font-medium tracking-tight truncate">{url}</span>
                    </div>
                </div>

                <div className="w-1/4 flex justify-end">
                    <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </div>

            {/* Viewport / Scrollable Content */}
            <div className="relative flex-1 overflow-hidden" style={{ height }}>
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar bg-zinc-900">
                    {children}
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}

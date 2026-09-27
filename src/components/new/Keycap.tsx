import React from 'react';

/** Physical-looking key, used for shortcuts across the homepage (Alt, K, ↵, /…). */
export const Keycap = ({ children, size = 'md' }: { children: React.ReactNode; size?: 'sm' | 'md' }) => (
    <kbd
        className={`inline-flex items-center justify-center rounded-lg border border-white/15 bg-gradient-to-b from-[#2b2f37] to-[#1a1d23] font-sans font-semibold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.06)_inset,0_4px_12px_rgba(0,0,0,0.4)] ${size === 'md' ? 'min-w-[2.25rem] h-9 px-2.5 text-sm' : 'min-w-[1.5rem] h-6 px-1.5 text-[11px]'}`}
    >
        {children}
    </kbd>
);

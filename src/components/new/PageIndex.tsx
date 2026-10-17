import { useEffect, useState } from 'react';

/**
 * "On this page": a sticky index for the left column of long pages
 * (/getting-started, blog articles). Desktop only; pages give phones their
 * own row of links. The section nearest the top of the screen is marked.
 */

export type IndexItem = {
    id: string;
    label: string;
    /** Shown as 01, 02… before the label. */
    step?: number;
    /** Indent one level, e.g. a tool inside a group. */
    nested?: boolean;
};

function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    const key = ids.join('|');
    useEffect(() => {
        const els = key
            .split('|')
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => !!el);
        const io = new IntersectionObserver(
            (entries) => {
                const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (hit) setActive(hit.target.id);
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [key]);
    return active;
}

export default function PageIndex({ items, accent = 'indigo' }: { items: IndexItem[]; accent?: 'indigo' | 'sky' }) {
    const active = useActiveSection(items.map((i) => i.id));
    const on = accent === 'sky' ? 'border-sky-300 text-white' : 'border-indigo-300 text-white';
    const num = accent === 'sky' ? 'text-sky-300' : 'text-indigo-300';
    return (
        <nav aria-label="On this page" className="sticky top-28 hidden max-h-[calc(100vh-8rem)] self-start overflow-y-auto lg:block">
            <p className="mb-3 text-sm font-medium text-white/45">On this page</p>
            <ul className="space-y-0.5 border-l border-white/10">
                {items.map((i) => {
                    const isOn = i.id === active;
                    return (
                        <li key={i.id}>
                            <a
                                href={`#${i.id}`}
                                aria-current={isOn ? 'location' : undefined}
                                className={`-ml-px flex min-h-9 items-center gap-2.5 border-l-2 py-1 text-[14px] leading-snug transition-colors ${i.nested ? 'pl-7' : 'pl-4'} ${isOn ? on : 'border-transparent text-white/55 hover:text-white'}`}
                            >
                                {i.step && <span className={`font-mono text-[11.5px] ${isOn ? num : 'text-white/35'}`}>{String(i.step).padStart(2, '0')}</span>}
                                {i.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

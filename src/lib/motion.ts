import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** One-off check, for code that reads it inside an effect. False during prerender. */
export function prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && window.matchMedia(QUERY).matches;
}

/** Live value that follows the OS setting. False during prerender and first render. */
export function usePrefersReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia(QUERY);
        setReduced(mq.matches);
        const on = (e: MediaQueryListEvent) => setReduced(e.matches);
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, []);
    return reduced;
}

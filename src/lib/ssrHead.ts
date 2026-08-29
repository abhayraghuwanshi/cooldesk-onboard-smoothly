// Build-time-only bridge between page components and the prerender script
// (scripts/prerender.tsx). There's no `document` during a Node SSR render, so
// SEO.tsx and FAQ.tsx can't upsert into the DOM the way they do in the
// browser — instead they hand their values here, and the prerender script
// reads them right after `renderToString` for each route.
//
// No-ops in the browser (isSsr is false there), so this has zero effect on
// the live client-side app.

export const isSsr = typeof document === 'undefined';

export interface SsrHeadData {
    title?: string;
    description?: string;
    canonical?: string;
    noindex?: boolean;
}

export const ssrHead: { current: SsrHeadData | null } = { current: null };

export const ssrJsonLd: object[] = [];

export function pushSsrJsonLd(schema: object) {
    if (isSsr) ssrJsonLd.push(schema);
}

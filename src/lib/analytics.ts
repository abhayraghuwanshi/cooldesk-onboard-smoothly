import { useEffect, useRef } from "react";

// Shared GA / GTM event helper. Mirrors the pattern used in Downloads.tsx:
// push to gtag (GA4) and window.dataLayer (GTM), and log in dev.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type EventParams = Record<string, unknown>;

export function trackEvent(eventName: string, params: EventParams = {}) {
  const payload = {
    event_category: "engagement",
    ...params,
  };

  if (typeof window !== "undefined") {
    window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    }

    window.dataLayer.push({
      event: eventName,
      ...payload,
    });
  }

  if (import.meta.env.DEV) {
    console.log(`[${eventName}]`, payload);
  }
}

/**
 * Fires a one-time `section_view` event the first time a section scrolls
 * into view — i.e. when the user actually reaches it, not just on page load.
 * Attach the returned ref to the section's root element.
 */
export function useSectionView<T extends Element = HTMLElement>(
  section: string,
  params: EventParams = {},
) {
  const ref = useRef<T | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            trackEvent("section_view", { action: "view", section, ...params });
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  return ref;
}

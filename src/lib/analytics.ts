import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

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
  // Re-arm when the params change, e.g. the footer staying mounted while
  // /vs/a → /vs/b swaps the page under it.
  const key = JSON.stringify(params);
  const lastKey = useRef(key);
  if (lastKey.current !== key) {
    lastKey.current = key;
    fired.current = false;
  }

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
  }, [section, key]);

  return ref;
}

// The page that sent someone to /#downloads, so the download event on the
// homepage can say which article or comparison earned it. Session-scoped.
const SOURCE_KEY = "cd_source_page";

export function rememberSourcePage(path: string) {
  try {
    sessionStorage.setItem(SOURCE_KEY, path);
  } catch {
    // storage blocked: the download event just goes out without a source
  }
}

export function getSourcePage(): string | undefined {
  try {
    return sessionStorage.getItem(SOURCE_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

/**
 * Tags a Chrome Web Store link with UTM params so the store's own analytics
 * shows which page sent the install; GA can't see past the store.
 */
export function withStoreUtm(href: string, medium: string, campaign: string) {
  if (!href.includes("chromewebstore.google.com")) return href;
  try {
    const url = new URL(href);
    url.searchParams.set("utm_source", "cool-desk.com");
    url.searchParams.set("utm_medium", medium);
    url.searchParams.set("utm_campaign", campaign);
    return url.toString();
  } catch {
    return href;
  }
}

/** Which part of the page a link sits in: an explicit data-track-area wins. */
function linkArea(a: Element) {
  const tagged = a.closest<HTMLElement>("[data-track-area]");
  if (tagged) return tagged.dataset.trackArea;
  if (a.closest("footer")) return "footer";
  if (a.closest("nav")) return "nav";
  return "page";
}

/**
 * One delegated listener for every link on the site, so new pages and
 * markdown posts are covered without wiring each anchor:
 *   download_intent_click  — anything pointing at /#downloads or the Chrome Web Store
 *   outbound_click         — other links leaving the site
 *   internal_link_click    — links to other pages (footer, article body, CTAs…)
 * Links that already send their own event (data-gtm-element, data-track-skip,
 * the navbar) are skipped.
 */
export function useLinkTracking() {
  const { pathname } = useLocation();
  const path = useRef(pathname);
  path.current = pathname;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.closest("[data-gtm-element], [data-track-skip]")) return;
      const area = linkArea(a);
      if (area === "nav") return;

      let url: URL;
      try {
        url = new URL(a.href);
      } catch {
        return;
      }

      const params = {
        source_page: path.current,
        link_area: area,
        link_text: (a.textContent ?? "").trim().slice(0, 80),
        link_url: url.origin === location.origin ? url.pathname + url.hash : url.href,
      };

      const toDownloads = url.origin === location.origin && url.pathname === "/" && url.hash === "#downloads";
      const toStore = url.hostname === "chromewebstore.google.com";
      if (toDownloads || toStore) {
        if (path.current !== "/") rememberSourcePage(path.current);
        // Runs in the capture phase, before the browser follows the link.
        if (toStore && !url.searchParams.has("utm_source")) {
          a.href = withStoreUtm(a.href, area ?? "page", path.current);
        }
        trackEvent("download_intent_click", { ...params, intent: toStore ? "chrome_web_store" : "downloads_section" });
      } else if (url.origin !== location.origin) {
        trackEvent("outbound_click", { ...params, link_domain: url.hostname });
      } else if (url.pathname !== path.current) {
        trackEvent("internal_link_click", params);
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
}

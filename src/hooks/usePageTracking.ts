import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// window.gtag is declared (as optional) in lib/analytics.ts.
import '@/lib/analytics';

const GA_MEASUREMENT_ID = 'G-F1YM216TKY';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
}

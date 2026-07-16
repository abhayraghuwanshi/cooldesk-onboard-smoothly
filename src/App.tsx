import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import PrivacyPolicyStatic from "./components/privacy/PrivacyPolicyStatic";
import { usePageTracking } from "./hooks/usePageTracking";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import Contact from "./pages/Contact";
import FounderPage from "./pages/Founder";
import GalleryPage from "./pages/Gallery";
import HowToUse from "./pages/HowToUse";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PricingPage from "./pages/Pricing";
import ReleasesPage from "./pages/Releases";
import Library from "./pages/Library";
import TermsPage from "./pages/terms";
import VersusPage from "./pages/Versus";
import WidgetStorePage from "./pages/WidgetStore";

const queryClient = new QueryClient();

// Component to track page views - must be inside BrowserRouter
function PageTracker() {
  usePageTracking();
  return null;
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/pricing" element={<PricingPage />} />
            {/* /resources retired — links now live in the navbar Resources dropdown */}
            <Route path="/resources" element={<Navigate to="/how-to-use" replace />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Navigate to="/library" replace />} />
            <Route path="/founder" element={<FounderPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-details" element={<PrivacyPolicyStatic />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/releases" element={<ReleasesPage />} />
            <Route path="/vs/:slug" element={<VersusPage />} />
            <Route path="/widgets" element={<WidgetStorePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivacyPolicyStatic from "./components/privacy/PrivacyPolicyStatic";
import BlogPage from "./pages/Blog";
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
import UninstallPage from "./pages/Uninstall";
import VersusPage from "./pages/Versus";
import WidgetStorePage from "./pages/WidgetStore";

// react-markdown + remark-gfm + react-syntax-highlighter (for code blocks in
// post content) are only needed on this one page, and together they're the
// single biggest contributor to the shared bundle every other route was
// paying for. Split out so the homepage/comparisons/widgets don't ship it.
const BlogPostPage = lazy(() => import("./pages/BlogPost"));

// The route table, shared between the live client app (App.tsx, wrapped in
// BrowserRouter) and the build-time prerender script (scripts/prerender.tsx,
// wrapped in StaticRouter) — one source of truth for what pages exist.
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/pricing" element={<PricingPage />} />
            {/* /resources retired — links now live in the navbar Resources dropdown */}
            <Route path="/resources" element={<Navigate to="/how-to-use" replace />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route
                path="/blog/:slug"
                element={
                    <Suspense fallback={null}>
                        <BlogPostPage />
                    </Suspense>
                }
            />
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
            {/* Chrome opens this when the extension is removed
                (setUninstallURL in the extension's background script). */}
            <Route path="/uninstall" element={<UninstallPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

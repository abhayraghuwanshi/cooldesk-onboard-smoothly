import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivacyPolicyStatic from "./components/privacy/PrivacyPolicyStatic";
import Contact from "./pages/Contact";
import FounderPage from "./pages/Founder";
import GalleryPage from "./pages/Gallery";
import HowToUse from "./pages/HowToUse";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PricingPage from "./pages/Pricing";
import ResourcesPage from "./pages/Resources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-details" element={<PrivacyPolicyStatic />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

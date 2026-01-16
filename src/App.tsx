import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/landing/Header";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Apoie from "./pages/Apoie";
import NotFound from "./pages/NotFound";
import { DonationProvider } from "./contexts/DonationContext";
import DonationToast from "./components/landing/DonationToast";
import DonationPopup from "./components/landing/DonationPopup";
import DonationFullscreenPopup from "./components/landing/DonationFullscreenPopup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DonationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calcular" element={<Calculator />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/apoie" element={<Apoie />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <DonationToast />
          <DonationPopup />
          <DonationFullscreenPopup />
        </BrowserRouter>
      </DonationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

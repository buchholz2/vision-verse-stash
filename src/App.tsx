import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { localPages } from "./data/localPages.ts";
import { LocalSeoPage } from "./pages/LocalSeoPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ortodontista-em-ijui" element={<LocalSeoPage page={localPages["ortodontista-em-ijui"]} />} />
          <Route path="/invisalign-em-ijui" element={<LocalSeoPage page={localPages["invisalign-em-ijui"]} />} />
          <Route path="/aparelho-transparente-em-ijui" element={<LocalSeoPage page={localPages["aparelho-transparente-em-ijui"]} />} />
          <Route path="/dentista-em-ijui" element={<LocalSeoPage page={localPages["dentista-em-ijui"]} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

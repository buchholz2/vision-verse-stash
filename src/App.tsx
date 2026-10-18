import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { localPages } from "./data/localPages.ts";
import { LocalSeoPage } from "./pages/LocalSeoPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import { lazy, Suspense, type ReactNode } from "react";

// Rota de desenvolvimento para capturar quadros da cena 3D (não existe no build de produção).
const DevAlignerCapture = import.meta.env.DEV ? lazy(() => import("./pages/DevAlignerCapture.tsx")) : null;

// Sem provedores globais: o site não usa toasts, tooltips nem cache de dados, e cada um deles pesava no JavaScript inicial.
export const AppProviders = ({ children }: { children: ReactNode }) => <>{children}</>;

/** Rotas compartilhadas pelo navegador (BrowserRouter) e pela pré-renderização no build (StaticRouter). */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/ortodontista-em-ijui" element={<LocalSeoPage page={localPages["ortodontista-em-ijui"]} />} />
    <Route path="/invisalign-em-ijui" element={<LocalSeoPage page={localPages["invisalign-em-ijui"]} />} />
    <Route path="/aparelho-transparente-em-ijui" element={<LocalSeoPage page={localPages["aparelho-transparente-em-ijui"]} />} />
    <Route path="/dentista-em-ijui" element={<LocalSeoPage page={localPages["dentista-em-ijui"]} />} />
    <Route path="/politica-de-privacidade" element={<PrivacyPage />} />
    {DevAlignerCapture && (
      <Route path="/dev/aligner" element={<Suspense fallback={null}><DevAlignerCapture /></Suspense>} />
    )}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;

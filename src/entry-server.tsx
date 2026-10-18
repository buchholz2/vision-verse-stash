import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App.tsx";

/** Usado só pelo scripts/generate-static-routes.mjs (build SSR de `vite build --ssr`): devolve o HTML do #root de uma rota. */
export function render(path: string) {
  return renderToString(
    <AppProviders>
      <StaticRouter location={path}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
}

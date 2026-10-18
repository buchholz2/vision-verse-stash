import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

// O build grava o conteúdo pré-renderizado de cada rota em #root (data-prerendered-path). Só hidrata quando ele
// corresponde à rota atual; qualquer outra URL (404, rota de desenvolvimento) renderiza do zero.
if (container.hasChildNodes() && container.dataset.prerenderedPath === currentPath) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}

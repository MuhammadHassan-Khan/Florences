import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { createAppRouter } from "@/app/router";
import "@/styles/global.css";
import "@/styles/tokens.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element "root" was not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={createAppRouter()} />
  </StrictMode>,
);

import { createBrowserRouter, type RouteObject } from "react-router-dom";

import App from "@/app/App";
import EnquiryPage from "@/pages/EnquiryPage";
import GalleryPage from "@/pages/GalleryPage";
import NotFoundPage from "@/pages/NotFoundPage";
import TemplateDemoPage from "@/pages/TemplateDemoPage";

/**
 * Central route model (see ARCHITECTURE.md §4).
 * Stable, explicit template ids are used in `/templates/:templateId`;
 * unknown ids must render a friendly fallback rather than crash.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <GalleryPage /> },
      { path: "templates/:templateId", element: <TemplateDemoPage /> },
      { path: "enquire", element: <EnquiryPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export function createAppRouter() {
  return createBrowserRouter(routes);
}

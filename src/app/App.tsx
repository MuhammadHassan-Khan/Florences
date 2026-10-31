import { Outlet } from "react-router-dom";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";

/**
 * Application shell: skip link, header, routed main region, footer.
 * Page-level content is rendered through the router's <Outlet />.
 */
export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="app-main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

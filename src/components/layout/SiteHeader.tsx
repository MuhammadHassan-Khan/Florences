import { NavLink, Link } from "react-router-dom";

import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          to="/"
          className={styles.brand}
          /* The accessible name must contain the visible text ("Digital
             Wedding Invitations") — WCAG 2.5.3 Label in Name. */
          aria-label="Digital Wedding Invitations — gallery home"
        >
          <span className={styles.brandMark} aria-hidden="true">
            <svg viewBox="0 0 64 64" width="28" height="28" focusable="false">
              <g fill="none" stroke="currentColor" strokeWidth="5">
                <circle cx="24" cy="36" r="15" />
                <circle cx="40" cy="36" r="15" />
              </g>
            </svg>
          </span>
          <span className={styles.brandText}>
            Digital Wedding <span className={styles.brandAccent}>Invitations</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/enquire"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Enquire
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

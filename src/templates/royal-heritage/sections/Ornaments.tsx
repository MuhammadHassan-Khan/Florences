import { useId } from "react";

import styles from "../styles/RoyalHeritage.module.css";

/**
 * Decorative SVG ornaments shared by the Royal Heritage sections —
 * presentation only, hidden from assistive technology. The jaali band is
 * a repeating lattice strip used as a symmetrical divider between
 * sections and around the invitation panel.
 */
export function JaaliBand({ className }: { className?: string }) {
  // Unique, CSS-safe pattern id per instance (useId output may contain
  // characters that are illegal inside url(#…) references).
  const patternId = `rh-jaali-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const rootClass = className ? `${styles.jaaliBand} ${className}` : styles.jaaliBand;

  return (
    <div className={rootClass} aria-hidden="true">
      <svg
        className={styles.jaaliSvg}
        width="100%"
        height="48"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern id={patternId} width="48" height="48" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="1.1">
              <circle cx="24" cy="24" r="15" />
              <rect x="13" y="13" width="22" height="22" transform="rotate(45 24 24)" />
              <path d="M0 24 H 48 M24 0 V 48" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

import { elegantDemoData } from "@/data/demoElegantData";
import type { CoupleNames } from "@/templates/types";

import styles from "../styles/ElegantClassic.module.css";

/**
 * Engraved-plate hero: a double-rule stationery plate holding the demo
 * badge, a monogram medallion, the couple's single <h1> and the date
 * line. Hairline rules draw across on load unless motion is reduced.
 */
export default function EngravedHero({ displayNames }: { displayNames: CoupleNames }) {
  const initialOne = displayNames.partnerOne.trim().charAt(0).toUpperCase();
  const initialTwo = displayNames.partnerTwo.trim().charAt(0).toUpperCase();

  return (
    <header className={styles.hero}>
      <div className={styles.plate}>
        <div className={styles.plateInner}>
          <p className={styles.demoBadge}>{elegantDemoData.demoNotice}</p>

          <p className={styles.heroEyebrow}>The wedding of</p>

          <Monogram initialOne={initialOne} initialTwo={initialTwo} />

          <h1 className={styles.heroNames}>
            <span>{displayNames.partnerOne}</span>
            <span className={styles.heroAmp} aria-hidden="true">
              &amp;
            </span>
            <span>{displayNames.partnerTwo}</span>
          </h1>

          <p className={styles.heroDate}>
            {elegantDemoData.dateLine} · {elegantDemoData.regionLabel}
          </p>

          <span className={styles.heroRule} aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}

/**
 * Decorative monogram medallion (inline SVG). It repeats the couple's
 * initials for engraved charm only, so it is hidden from assistive
 * technology — the names are already announced by the <h1>.
 */
function Monogram({ initialOne, initialTwo }: { initialOne: string; initialTwo: string }) {
  return (
    <span className={styles.monogram} aria-hidden="true">
      <svg
        viewBox="0 0 120 120"
        width="120"
        height="120"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="currentColor">
          <circle cx="60" cy="60" r="54" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="47" strokeWidth="0.75" />
        </g>
        <g fill="currentColor">
          <path d="M60 2 64 7.5 60 13 56 7.5Z" />
          <path d="M60 107 64 112.5 60 118 56 112.5Z" />
        </g>
        <text
          x="41"
          y="72"
          textAnchor="middle"
          fontFamily="'Iowan Old Style', Palatino, Georgia, 'Times New Roman', serif"
          fontSize="32"
          fill="currentColor"
        >
          {initialOne}
        </text>
        <text
          x="60"
          y="70"
          textAnchor="middle"
          fontFamily="'Iowan Old Style', Palatino, Georgia, 'Times New Roman', serif"
          fontSize="22"
          fontStyle="italic"
          fill="currentColor"
        >
          &amp;
        </text>
        <text
          x="79"
          y="72"
          textAnchor="middle"
          fontFamily="'Iowan Old Style', Palatino, Georgia, 'Times New Roman', serif"
          fontSize="32"
          fill="currentColor"
        >
          {initialTwo}
        </text>
      </svg>
    </span>
  );
}

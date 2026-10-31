import type { CoupleNames } from "@/templates/types";
import { royalDemoData } from "@/data/demoRoyalData";

import styles from "../styles/RoyalHeritage.module.css";

/**
 * Arched opening: an inline SVG Mughal arch frames the couple's monogram,
 * names, date and the on-screen demo badge. The arch linework draws
 * itself in on load; under reduced motion everything renders fully
 * visible and static.
 */
export default function Hero({ displayNames }: { displayNames: CoupleNames }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroArch} aria-hidden="true">
        <svg viewBox="0 0 400 520" width="400" height="520" focusable="false">
          <g className={styles.archLines} fill="none" stroke="currentColor" strokeWidth="2">
            <path pathLength={1} d="M60 500 V 252 Q 60 128 200 44 Q 340 128 340 252 V 500" />
            <path pathLength={1} d="M86 500 V 258 Q 86 146 200 72 Q 314 146 314 258 V 500" />
            <path pathLength={1} d="M36 500 H 364" />
          </g>
          <g className={styles.archSpandrels} fill="currentColor">
            <circle cx="132" cy="158" r="5" />
            <circle cx="268" cy="158" r="5" />
          </g>
          <circle className={styles.archFinial} cx="200" cy="28" r="8" fill="currentColor" />
        </svg>
      </div>

      <div className={styles.heroContent}>
        <p className={styles.demoBadge}>{royalDemoData.demoNotice}</p>
        <p className={styles.monogram} aria-hidden="true">
          <span>{displayNames.partnerOne.slice(0, 1)}</span>
          <span className={styles.monogramStar}>✦</span>
          <span>{displayNames.partnerTwo.slice(0, 1)}</span>
        </p>
        <p className={styles.heroEyebrow}>The wedding of</p>
        <h1 className={styles.heroNames}>
          <span>{displayNames.partnerOne}</span>
          <span className={styles.heroAmp} aria-hidden="true">
            &
          </span>
          <span>{displayNames.partnerTwo}</span>
        </h1>
        <p className={styles.heroDate}>
          {royalDemoData.dateLine} · {royalDemoData.regionLabel}
        </p>
        <a className={styles.scrollCue} href="#royal-invitation">
          Continue to the invitation
          <span className={styles.scrollArrow} aria-hidden="true">
            ↓
          </span>
        </a>
      </div>
    </header>
  );
}

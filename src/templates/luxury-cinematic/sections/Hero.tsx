import type { CoupleNames } from "@/templates/types";
import { demoWeddingData } from "@/data/demoWeddingData";

import styles from "../styles/LuxuryCinematic.module.css";

/** Full-viewport cinematic opening with the couple's names. */
export default function Hero({ displayNames }: { displayNames: CoupleNames }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBackdrop} aria-hidden="true">
        <span className={styles.sweep} />
        <span className={`${styles.bokeh} ${styles.bokehOne}`} />
        <span className={`${styles.bokeh} ${styles.bokehTwo}`} />
        <span className={`${styles.bokeh} ${styles.bokehThree}`} />
        <span className={styles.heroRings}>
          <svg viewBox="0 0 120 64" width="120" height="64" focusable="false">
            <g fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="44" cy="36" r="24" />
              <circle cx="76" cy="36" r="24" />
            </g>
          </svg>
        </span>
      </div>

      <div className={styles.heroContent}>
        <p className={styles.demoBadge}>{demoWeddingData.demoNotice}</p>
        <p className={styles.heroEyebrow}>The wedding of</p>
        <h1 className={styles.heroNames}>
          <span>{displayNames.partnerOne}</span>
          <span className={styles.heroAmp} aria-hidden="true">
            &
          </span>
          <span>{displayNames.partnerTwo}</span>
        </h1>
        <p className={styles.heroDate}>
          {demoWeddingData.dateLine} · {demoWeddingData.regionLabel}
        </p>
        <a className={styles.scrollCue} href="#invitation-intro">
          Scroll to open
          <span className={styles.scrollArrow} aria-hidden="true">
            ↓
          </span>
        </a>
      </div>
    </header>
  );
}

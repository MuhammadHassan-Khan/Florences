/* Typographic hero — the couple's names ARE the artwork (no imagery). */
import { minimalDemoData } from "@/data/demoMinimalData";
import type { CoupleNames } from "@/templates/types";

import styles from "../styles/MinimalModern.module.css";

/**
 * Editorial masthead: demo badge and date across the top rule, oversized
 * names set in the display serif, and a quiet footnote row. Hairlines and
 * whitespace frame the type; there is no imagery.
 */
export default function Hero({ displayNames }: { displayNames: CoupleNames }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroMasthead}>
        <p className={styles.demoBadge}>{minimalDemoData.demoNotice}</p>
        <p className={styles.mastheadDate}>{minimalDemoData.dateLine}</p>
      </div>

      <div className={styles.heroBody}>
        <p className={styles.heroEyebrow}>The wedding of</p>
        <h1 className={styles.heroNames}>
          <span className={styles.heroName}>{displayNames.partnerOne}</span>
          <span className={styles.heroSecond}>
            <span className={styles.heroJoin} aria-hidden="true">
              &amp;
            </span>
            {displayNames.partnerTwo}
          </span>
        </h1>
        <p className={styles.heroPlace}>{minimalDemoData.regionLabel}</p>
      </div>

      <div className={styles.heroFoot}>
        <p className={styles.heroIssue}>Invitation no. 01</p>
        <a className={styles.heroJump} href="#invitation-index">
          Read the invitation<span aria-hidden="true"> ↓</span>
        </a>
      </div>
    </header>
  );
}

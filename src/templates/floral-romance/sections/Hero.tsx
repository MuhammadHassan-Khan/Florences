/* Floral Romance — botanical hero: names, date, monogram and demo badge. */
import { floralDemoData } from "@/data/demoFloralData";
import type { CoupleNames } from "@/templates/types";

import styles from "../styles/FloralRomance.module.css";

/**
 * Botanical opening panel: a framed sprig backdrop with slowly drifting
 * petals, the on-screen demo badge, a monogram seal and the single <h1>
 * carrying the couple's resolved names.
 */
export default function Hero({ displayNames }: { displayNames: CoupleNames }) {
  const firstInitial = displayNames.partnerOne.charAt(0);
  const secondInitial = displayNames.partnerTwo.charAt(0);
  const monogram = `${firstInitial}${secondInitial}`;

  return (
    <header className={styles.hero}>
      <div className={styles.heroBackdrop} aria-hidden="true">
        <HeroSprig className={styles.sprigTop} />
        <HeroSprig className={styles.sprigBottom} />
        <span className={`${styles.petal} ${styles.petalOne}`} />
        <span className={`${styles.petal} ${styles.petalTwo}`} />
        <span className={`${styles.petal} ${styles.petalThree}`} />
        <span className={`${styles.petal} ${styles.petalFour}`} />
      </div>

      <div className={styles.heroContent}>
        <p className={styles.demoBadge}>{floralDemoData.demoNotice}</p>
        <p className={styles.monogram} aria-hidden="true">
          {monogram}
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
          {floralDemoData.dateLine} · {floralDemoData.regionLabel}
        </p>
        <a className={styles.scrollCue} href="#invitation">
          Save the date
          <span className={styles.scrollArrow} aria-hidden="true">
            ↓
          </span>
        </a>
      </div>
    </header>
  );
}

/**
 * Hand-drawn botanical sprig used as hero corner ornamentation. Strictly
 * decorative: hidden from assistive tech and not focusable.
 */
function HeroSprig({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      width="200"
      height="200"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 12 C 76 48, 126 102, 158 190" />
        <path d="M56 40 C 84 50, 106 70, 116 98" />
        <path d="M104 92 C 122 100, 138 114, 146 134" />
        <path d="M88 66 C 92 92, 86 116, 68 134" />
      </g>
      <g fill="currentColor">
        <path d="M56 40 C 46 22, 52 6, 72 2 C 78 20, 72 34, 56 40 Z" />
        <path d="M56 40 C 40 44, 30 36, 30 20 C 48 18, 58 26, 56 40 Z" />
        <path d="M104 92 C 96 74, 104 58, 124 56 C 128 74, 120 88, 104 92 Z" />
        <path d="M104 92 C 88 96, 78 88, 78 72 C 96 70, 106 78, 104 92 Z" />
        <path d="M88 66 C 74 62, 68 50, 74 36 C 90 42, 96 54, 88 66 Z" />
        <path d="M68 134 C 54 130, 46 118, 52 104 C 68 110, 76 122, 68 134 Z" />
      </g>
      <g className={styles.sprigBloom}>
        <circle cx="72" cy="4" r="6" />
        <circle cx="146" cy="134" r="5" />
        <circle cx="158" cy="188" r="9" />
      </g>
    </svg>
  );
}

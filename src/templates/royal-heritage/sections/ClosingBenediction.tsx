import EnquiryCta from "@/components/invitation/EnquiryCta";
import Reveal from "@/components/invitation/Reveal";
import { royalDemoData } from "@/data/demoRoyalData";
import type { CoupleNames, TemplateMeta } from "@/templates/types";

import { JaaliBand } from "./Ornaments";
import styles from "../styles/RoyalHeritage.module.css";

/**
 * Closing benediction: monogram, the couple's names, the closing line
 * and the on-screen demo notice, followed by the enquiry hand-off —
 * every element centred inside the same ornamental language.
 */
export default function ClosingBenediction({
  displayNames,
  meta,
}: {
  displayNames: CoupleNames;
  meta: TemplateMeta;
}) {
  return (
    <section className={`${styles.section} ${styles.sectionRaised}`} aria-label="Closing">
      <JaaliBand />

      <Reveal className={styles.closing}>
        <p className={styles.closingMonogram} aria-hidden="true">
          {displayNames.partnerOne.slice(0, 1)}
          <span className={styles.closingMonogramAmp}>&amp;</span>
          {displayNames.partnerTwo.slice(0, 1)}
        </p>
        <p className={styles.closingNames}>
          {displayNames.partnerOne} <span aria-hidden="true">&amp;</span>{" "}
          {displayNames.partnerTwo}
        </p>
        <p className={styles.closingLine}>{royalDemoData.closingLine}</p>
        <p className={styles.closingDemoNote}>{royalDemoData.demoNotice}</p>
      </Reveal>

      <Reveal delay={100}>
        <EnquiryCta templateId={meta.id} templateTitle={meta.title} />
      </Reveal>
    </section>
  );
}

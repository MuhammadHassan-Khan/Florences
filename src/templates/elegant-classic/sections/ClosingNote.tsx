import EnquiryCta from "@/components/invitation/EnquiryCta";
import Reveal from "@/components/invitation/Reveal";
import { elegantDemoData } from "@/data/demoElegantData";
import type { CoupleNames, TemplateMeta } from "@/templates/types";

import styles from "../styles/ElegantClassic.module.css";

/** Closing compliment, repeat of the demo notice, and the enquiry hand-off. */
export default function ClosingNote({
  displayNames,
  meta,
}: {
  displayNames: CoupleNames;
  meta: TemplateMeta;
}) {
  return (
    <section
      className={`${styles.section} ${styles.sectionAlt}`}
      aria-label="Closing"
    >
      <Reveal className={styles.closing}>
        <span className={styles.heroRule} aria-hidden="true" />
        <h2 className={styles.closingNames}>
          {displayNames.partnerOne} <span aria-hidden="true">&amp;</span>{" "}
          {displayNames.partnerTwo}
        </h2>
        <p className={styles.closingLine}>{elegantDemoData.closingLine}</p>
        <p className={styles.closingDemoNote}>{elegantDemoData.demoNotice}</p>
      </Reveal>

      <Reveal delay={100}>
        <EnquiryCta templateId={meta.id} templateTitle={meta.title} />
      </Reveal>
    </section>
  );
}

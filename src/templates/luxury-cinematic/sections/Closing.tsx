import EnquiryCta from "@/components/invitation/EnquiryCta";
import Reveal from "@/components/invitation/Reveal";
import { demoWeddingData } from "@/data/demoWeddingData";
import type { CoupleNames, TemplateMeta } from "@/templates/types";

import styles from "../styles/LuxuryCinematic.module.css";

/** Closing note + handoff to the enquiry form. */
export default function Closing({
  displayNames,
  meta,
}: {
  displayNames: CoupleNames;
  meta: TemplateMeta;
}) {
  return (
    <section className={`${styles.section} ${styles.sectionRaised}`} aria-label="Closing">
      <Reveal className={styles.closing}>
        <p className={styles.closingNames}>
          {displayNames.partnerOne} <span aria-hidden="true">&amp;</span>{" "}
          {displayNames.partnerTwo}
        </p>
        <p className={styles.closingLine}>{demoWeddingData.closingLine}</p>
        <p className={styles.closingDemoNote}>{demoWeddingData.demoNotice}</p>
      </Reveal>

      <Reveal delay={100}>
        <EnquiryCta templateId={meta.id} templateTitle={meta.title} />
      </Reveal>
    </section>
  );
}

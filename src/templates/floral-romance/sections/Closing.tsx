/* Floral Romance — closing blessing, demo notice and enquiry handoff. */
import EnquiryCta from "@/components/invitation/EnquiryCta";
import Reveal from "@/components/invitation/Reveal";
import { floralDemoData } from "@/data/demoFloralData";
import type { CoupleNames, TemplateMeta } from "@/templates/types";

import styles from "../styles/FloralRomance.module.css";

/** Closing blessing with the couple's names, the demo notice and the CTA. */
export default function Closing({
  displayNames,
  meta,
}: {
  displayNames: CoupleNames;
  meta: TemplateMeta;
}) {
  return (
    <section className={styles.section} aria-label="Closing">
      <Reveal className={styles.closing}>
        <p className={styles.demoBadge}>{floralDemoData.demoNotice}</p>
        <p className={styles.closingNames}>
          {displayNames.partnerOne} <span aria-hidden="true">&amp;</span>{" "}
          {displayNames.partnerTwo}
        </p>
        <p className={styles.closingLine}>{floralDemoData.closingLine}</p>
      </Reveal>

      <Reveal delay={120} className={styles.closingCta}>
        <EnquiryCta templateId={meta.id} templateTitle={meta.title} />
      </Reveal>
    </section>
  );
}

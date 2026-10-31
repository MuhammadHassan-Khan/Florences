/* Closing note, second demo badge and the enquiry handoff. */
import EnquiryCta from "@/components/invitation/EnquiryCta";
import SectionHeading from "@/components/invitation/SectionHeading";
import { minimalDemoData } from "@/data/demoMinimalData";
import type { CoupleNames, TemplateMeta } from "@/templates/types";

import styles from "../styles/MinimalModern.module.css";

/** Closing line, sample-data notice and the handoff to the enquiry form. */
export default function Closing({
  displayNames,
  meta,
}: {
  displayNames: CoupleNames;
  meta: TemplateMeta;
}) {
  return (
    <section className={styles.section} aria-label="Closing">
      <div className={styles.frame}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex} aria-hidden="true">
            04
          </span>
          <SectionHeading
            align="start"
            ornament={false}
            eyebrow="Closing"
            title="Until then"
          />
        </div>

        <div className={styles.closingBlock}>
          <p className={styles.closingNames}>
            {displayNames.partnerOne}{" "}
            <span className={styles.closingJoin} aria-hidden="true">
              &amp;
            </span>{" "}
            {displayNames.partnerTwo}
          </p>
          <p className={styles.closingLine}>{minimalDemoData.closingLine}</p>
          <p className={styles.demoBadge}>{minimalDemoData.demoNotice}</p>
          <EnquiryCta
            templateId={meta.id}
            templateTitle={meta.title}
            className={styles.enquiry}
          />
        </div>
      </div>
    </section>
  );
}

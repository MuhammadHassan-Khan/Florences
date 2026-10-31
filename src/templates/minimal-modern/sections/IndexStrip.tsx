/* Invitation wording + numbered index of the celebrations + countdown. */
import Countdown from "@/components/invitation/Countdown";
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";
import { minimalDemoData } from "@/data/demoMinimalData";
import type { CoupleNames } from "@/templates/types";

import styles from "../styles/MinimalModern.module.css";

/**
 * The index/date strip: invitation wording and the (editable) names on
 * the left, a numbered "01 / 02" index of the two gatherings and the live
 * countdown on the right — an editorial contents page, not a card.
 */
export default function IndexStrip({ displayNames }: { displayNames: CoupleNames }) {
  return (
    <section
      id="invitation-index"
      className={styles.section}
      aria-label="Invitation and index"
    >
      <div className={styles.frame}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex} aria-hidden="true">
            01
          </span>
          <SectionHeading
            align="start"
            ornament={false}
            eyebrow="Invitation"
            title={minimalDemoData.inviteLead}
          />
        </div>

        <Reveal className={`${styles.indexGrid} ${styles.revealQuick}`}>
          <div className={styles.inviteBlock}>
            <p className={styles.inviteRequest}>{minimalDemoData.inviteRequest}</p>
            <p className={styles.inviteNames}>
              {displayNames.partnerOne}{" "}
              <span className={styles.inviteJoin} aria-hidden="true">
                &amp;
              </span>{" "}
              {displayNames.partnerTwo}
            </p>
            <p className={styles.inviteDate}>
              {minimalDemoData.dateLine} · {minimalDemoData.regionLabel}
            </p>
          </div>

          <div className={styles.indexPanel}>
            <p className={styles.indexLegend} aria-hidden="true">
              <span>No.</span>
              <span>Event</span>
            </p>
            <ol className={styles.indexList}>
              {minimalDemoData.events.map((event, index) => (
                <li key={event.id} className={styles.indexItem}>
                  <span className={styles.indexNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.indexTitle}>{event.title}</span>
                  <span className={styles.indexDate}>
                    {event.dayLabel} · {event.dateLabel}
                  </span>
                </li>
              ))}
            </ol>
            <Countdown
              target={minimalDemoData.countdownTarget}
              className={styles.indexCountdown}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

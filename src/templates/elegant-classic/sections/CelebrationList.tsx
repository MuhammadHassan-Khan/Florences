import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";
import VenueLink from "@/components/invitation/VenueLink";
import { elegantDemoData } from "@/data/demoElegantData";

import styles from "../styles/ElegantClassic.module.css";

/**
 * The celebrations as a formal engraved list. Each event is an item of
 * the ordered list; its details are dotted-leader rows (label … value)
 * in the manner of a printed order of service, plus a map action.
 */
export default function CelebrationList() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`} aria-label="Events">
      <Reveal>
        <SectionHeading eyebrow="Order of celebration" title="The Celebrations" />
      </Reveal>

      <Reveal delay={100} className={styles.narrow}>
        <ol className={styles.celebrationList}>
          {elegantDemoData.events.map((event) => (
            <li key={event.id} className={styles.eventEntry}>
              <h3 className={styles.eventTitle}>
                <span className={styles.eventTitleRule} aria-hidden="true" />
                {event.title}
                <span className={styles.eventTitleRule} aria-hidden="true" />
              </h3>
              <dl className={styles.leaderList}>
                <LeaderRow label="Day" value={event.dayLabel} />
                <LeaderRow label="Date" value={event.dateLabel} />
                <LeaderRow label="Time" value={event.timeLabel} />
                <LeaderRow label="Venue" value={event.venue} />
              </dl>
              {event.note ? <p className={styles.eventNote}>{event.note}</p> : null}
              <VenueLink venue={event.venue} />
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/** One dotted-leader row: small-caps label, flexible leaders, value. */
function LeaderRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.leaderRow}>
      <dt className={styles.leaderLabel}>{label}</dt>
      <dd className={styles.leaderValue}>
        <span className={styles.leaderDots} aria-hidden="true" />
        {value}
      </dd>
    </div>
  );
}

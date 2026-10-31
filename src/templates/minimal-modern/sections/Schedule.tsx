/* Events as a tabular editorial schedule with quiet map actions. */
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";
import VenueLink from "@/components/invitation/VenueLink";
import { minimalDemoData } from "@/data/demoMinimalData";

import styles from "../styles/MinimalModern.module.css";

/**
 * The schedule: each celebration is a row of a hairline-ruled table
 * (day/date, index number, title, time, venue, note) ending in a quiet
 * VenueLink — a contents-style list rather than the shared card layout.
 * The column labels are decorative (the row markup carries the meaning).
 */
export default function Schedule() {
  return (
    <section className={styles.section} aria-label="Schedule of events">
      <div className={styles.frame}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex} aria-hidden="true">
            02
          </span>
          <SectionHeading
            align="start"
            ornament={false}
            eyebrow="Events"
            title="The schedule"
          />
        </div>

        <Reveal className={`${styles.scheduleBlock} ${styles.revealQuick}`}>
          <p className={styles.scheduleLegend} aria-hidden="true">
            <span>Day</span>
            <span>Event</span>
            <span>Venue</span>
            <span>Map</span>
          </p>

          <ol className={styles.schedule}>
            {minimalDemoData.events.map((event, index) => (
              <li key={event.id} className={styles.scheduleRow}>
                <div className={styles.rowWhen}>
                  <span className={styles.rowNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.rowDay}>{event.dayLabel}</span>
                  <span className={styles.rowDate}>{event.dateLabel}</span>
                </div>

                <div className={styles.rowEvent}>
                  <h3 className={styles.rowTitle}>{event.title}</h3>
                  <p className={styles.rowTime}>{event.timeLabel}</p>
                </div>

                <div className={styles.rowVenue}>
                  <p className={styles.rowVenueName}>{event.venue}</p>
                  {event.note ? <p className={styles.rowNote}>{event.note}</p> : null}
                </div>

                <div className={styles.rowAction}>
                  <VenueLink venue={event.venue} />
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

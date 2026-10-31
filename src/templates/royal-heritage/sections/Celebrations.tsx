import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";
import VenueLink from "@/components/invitation/VenueLink";
import { royalDemoData } from "@/data/demoRoyalData";

import styles from "../styles/RoyalHeritage.module.css";

/**
 * Ceremonial event cards under arches — this template owns its own card
 * markup (the shared list component is intentionally not used). Each
 * celebration shows day, date, time, venue, optional note and a map
 * action, symmetrically centred beneath a domed, finial-topped frame.
 */
export default function Celebrations() {
  return (
    <section className={`${styles.section} ${styles.sectionRaised}`} aria-label="Events">
      <Reveal>
        <SectionHeading eyebrow="Save the dates" title="The Celebrations" />
      </Reveal>

      <ol className={styles.eventGrid}>
        {royalDemoData.events.map((event, index) => (
          <li key={event.id} className={styles.eventItem}>
            <Reveal delay={index * 100} className={styles.eventCard}>
              <span className={styles.eventFinial} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
                  <circle cx="12" cy="13" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 1 L14 5 L12 9 L10 5 Z" fill="currentColor" />
                </svg>
              </span>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <p className={styles.eventDay}>{event.dayLabel}</p>
              <p className={styles.eventDate}>{event.dateLabel}</p>
              <p className={styles.eventTime}>{event.timeLabel}</p>
              <p className={styles.eventVenue}>{event.venue}</p>
              {event.note ? <p className={styles.eventNote}>{event.note}</p> : null}
              <VenueLink venue={event.venue} />
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

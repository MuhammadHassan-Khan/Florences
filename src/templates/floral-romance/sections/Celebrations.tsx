/* Floral Romance — template-owned soft event cards with map actions. */
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";
import VenueLink from "@/components/invitation/VenueLink";
import { floralDemoData } from "@/data/demoFloralData";

import styles from "../styles/FloralRomance.module.css";

/**
 * Template-owned event cards (the shared EventDetails list is deliberately
 * not used): soft paper panels in a two-column grid on desktop, each with
 * day, date, time, venue, optional note and its own map action.
 */
export default function Celebrations() {
  return (
    <section className={`${styles.section} ${styles.sectionTinted}`} aria-label="Events">
      <Reveal>
        <SectionHeading eyebrow="Mark your calendars" title="Three Days of Celebration" />
      </Reveal>

      <Reveal delay={100} className={styles.fullWidth}>
        <ol className={styles.eventGrid}>
          {floralDemoData.events.map((event) => (
            <li key={event.id} className={styles.eventItem}>
              <article className={styles.eventCard}>
                <svg
                  className={styles.eventSprig}
                  viewBox="0 0 96 36"
                  aria-hidden="true"
                  focusable="false"
                  width="96"
                  height="36"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 24 C 32 24, 60 20, 90 8" />
                    <path d="M40 23 C 44 15, 52 10, 62 9" />
                  </g>
                  <g fill="currentColor">
                    <path d="M62 9 C 72 0, 84 1, 88 10 C 80 19, 68 18, 62 9 Z" />
                    <path d="M40 23 C 30 15, 18 16, 14 25 C 22 33, 34 32, 40 23 Z" />
                  </g>
                  <circle cx="90" cy="8" r="5" className={styles.sprigBloom} />
                </svg>

                <p className={styles.eventDay}>
                  {event.dayLabel} · {event.dateLabel}
                </p>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventTime}>{event.timeLabel}</p>
                <p className={styles.eventVenue}>{event.venue}</p>
                {event.note ? <p className={styles.eventNote}>{event.note}</p> : null}
                <p className={styles.eventMap}>
                  <VenueLink venue={event.venue} />
                </p>
              </article>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

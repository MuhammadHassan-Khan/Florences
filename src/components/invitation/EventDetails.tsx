import VenueLink from "@/components/invitation/VenueLink";
import type { WeddingEvent } from "@/templates/types";

import styles from "./EventDetails.module.css";

/**
 * Event schedule (semantic ordered list). Data-agnostic: any template can
 * supply its own event list; layout stays in this component's own scope.
 */
export default function EventDetails({ events }: { events: readonly WeddingEvent[] }) {
  return (
    <ol className={styles.list}>
      {events.map((event) => (
        <li key={event.id} className={styles.item}>
          <article className={styles.card}>
            <p className={styles.day}>
              {event.dayLabel} · {event.dateLabel}
            </p>
            <h3 className={styles.title}>{event.title}</h3>
            <p className={styles.time}>{event.timeLabel}</p>
            <p className={styles.venue}>{event.venue}</p>
            {event.note ? <p className={styles.note}>{event.note}</p> : null}
            <VenueLink venue={event.venue} />
          </article>
        </li>
      ))}
    </ol>
  );
}

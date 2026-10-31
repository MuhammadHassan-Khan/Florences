import { buildMapUrl } from "@/utils/buildMapUrl";

import styles from "./VenueLink.module.css";

/**
 * Venue/map action. Opens the map through explicit user interaction in a
 * new tab; no embedded map, no tracking scripts.
 */
export default function VenueLink({ venue }: { venue: string }) {
  return (
    <a
      className={styles.link}
      href={buildMapUrl(venue)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span aria-hidden="true">◈</span> View on map
      <span className={styles.srOnly}> (opens Google Maps in a new tab)</span>
    </a>
  );
}

import EventDetails from "@/components/invitation/EventDetails";
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";
import { demoWeddingData } from "@/data/demoWeddingData";

import styles from "../styles/LuxuryCinematic.module.css";

/** The three sample celebrations with venue/map actions. */
export default function Celebrations() {
  return (
    <section className={`${styles.section} ${styles.sectionRaised}`} aria-label="Events">
      <Reveal>
        <SectionHeading eyebrow="Save the dates" title="The Celebrations" />
      </Reveal>
      <Reveal delay={100} className={styles.fullWidth}>
        <EventDetails events={demoWeddingData.events} />
      </Reveal>
    </section>
  );
}

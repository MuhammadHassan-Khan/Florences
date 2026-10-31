import Countdown from "@/components/invitation/Countdown";
import Reveal from "@/components/invitation/Reveal";
import { demoWeddingData } from "@/data/demoWeddingData";
import type { CoupleNames } from "@/templates/types";

import styles from "../styles/LuxuryCinematic.module.css";

/** Formal invitation wording + date + live countdown. */
export default function InvitationIntro({ displayNames }: { displayNames: CoupleNames }) {
  return (
    <section id="invitation-intro" className={styles.section} aria-label="Invitation">
      <Reveal className={styles.introFrame}>
        <p className={styles.sectionEyebrow}>Invitation</p>
        <p className={styles.inviteLead}>{demoWeddingData.inviteLead}</p>
        <p className={styles.inviteNames}>
          {displayNames.partnerOne} <span aria-hidden="true">&amp;</span>{" "}
          {displayNames.partnerTwo}
        </p>
        <p className={styles.inviteRequest}>{demoWeddingData.inviteRequest}</p>
        <p className={styles.inviteDate}>{demoWeddingData.dateLine}</p>
      </Reveal>

      <Reveal delay={120}>
        <Countdown target={demoWeddingData.countdownTarget} />
      </Reveal>
    </section>
  );
}

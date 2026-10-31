import Countdown from "@/components/invitation/Countdown";
import Reveal from "@/components/invitation/Reveal";
import { royalDemoData } from "@/data/demoRoyalData";
import type { CoupleNames } from "@/templates/types";

import { JaaliBand } from "./Ornaments";
import styles from "../styles/RoyalHeritage.module.css";

/**
 * Formal invitation wording inside a jaali-bordered panel: lead-in,
 * couple's names, request line, date and the live countdown — all
 * strictly centred and framed by lattice bands above and below.
 */
export default function InvitationPanel({ displayNames }: { displayNames: CoupleNames }) {
  return (
    <section id="royal-invitation" className={styles.section} aria-label="Invitation">
      <JaaliBand />

      <Reveal className={styles.invitePanel}>
        <p className={styles.sectionEyebrow}>The invitation</p>
        <p className={styles.inviteLead}>{royalDemoData.inviteLead}</p>
        <p className={styles.inviteNames}>
          {displayNames.partnerOne} <span aria-hidden="true">&amp;</span>{" "}
          {displayNames.partnerTwo}
        </p>
        <p className={styles.inviteRequest}>{royalDemoData.inviteRequest}</p>
        <p className={styles.inviteDate}>{royalDemoData.dateLine}</p>
        <span className={styles.panelRule} aria-hidden="true" />
        <Countdown target={royalDemoData.countdownTarget} className={styles.countdown} />
      </Reveal>

      <JaaliBand />
    </section>
  );
}

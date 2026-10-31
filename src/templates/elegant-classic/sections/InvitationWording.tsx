import Countdown from "@/components/invitation/Countdown";
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";
import { elegantDemoData } from "@/data/demoElegantData";
import type { CoupleNames } from "@/templates/types";

import styles from "../styles/ElegantClassic.module.css";

/** Formal invitation wording set as stationery, with the live countdown. */
export default function InvitationWording({ displayNames }: { displayNames: CoupleNames }) {
  return (
    <section className={styles.section} aria-label="Invitation">
      <Reveal>
        <SectionHeading eyebrow="You are cordially invited" title="The Invitation" />
      </Reveal>

      <Reveal delay={100} className={styles.narrow}>
        <div className={styles.invitationCard}>
          <p className={styles.inviteLead}>{elegantDemoData.inviteLead}</p>
          <p className={styles.inviteNames}>
            {displayNames.partnerOne} <span aria-hidden="true">&amp;</span>{" "}
            {displayNames.partnerTwo}
          </p>
          <p className={styles.inviteRequest}>{elegantDemoData.inviteRequest}</p>
          <span className={styles.heroRule} aria-hidden="true" />
          <p className={styles.inviteDate}>{elegantDemoData.dateLine}</p>
          <p className={styles.inviteRegion}>{elegantDemoData.regionLabel}</p>
        </div>
      </Reveal>

      <Reveal delay={160} className={styles.countdownPanel}>
        <Countdown target={elegantDemoData.countdownTarget} />
      </Reveal>
    </section>
  );
}

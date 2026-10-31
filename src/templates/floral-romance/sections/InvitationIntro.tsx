/* Floral Romance — invitation wording, wedding date and live countdown. */
import Countdown from "@/components/invitation/Countdown";
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";
import { floralDemoData } from "@/data/demoFloralData";
import type { CoupleNames } from "@/templates/types";

import styles from "../styles/FloralRomance.module.css";

/**
 * "Save the date" introduction: formal wording on a paper panel, the
 * wedding date, and the live countdown to the sample target.
 */
export default function InvitationIntro({ displayNames }: { displayNames: CoupleNames }) {
  return (
    <section id="invitation" className={styles.section} aria-label="Invitation">
      <Reveal>
        <SectionHeading eyebrow="Save the date" title="You Are Invited" />
      </Reveal>

      <Reveal delay={100} className={styles.inviteCard}>
        <svg
          className={styles.inviteSprig}
          viewBox="0 0 240 52"
          aria-hidden="true"
          focusable="false"
          width="240"
          height="52"
        >
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 30 C 70 30, 150 26, 232 12" />
            <path d="M74 29 C 78 20, 88 14, 100 12" />
            <path d="M150 26 C 154 34, 164 38, 176 36" />
          </g>
          <g fill="currentColor">
            <path d="M100 12 C 112 2, 126 2, 132 12 C 122 22, 108 22, 100 12 Z" />
            <path d="M74 29 C 62 20, 48 20, 42 30 C 52 40, 66 40, 74 29 Z" />
            <path d="M176 36 C 188 26, 202 26, 208 36 C 198 46, 184 46, 176 36 Z" />
          </g>
          <circle cx="120" cy="26" r="7" className={styles.sprigBloom} />
        </svg>

        <p className={styles.inviteLead}>{floralDemoData.inviteLead}</p>
        <p className={styles.inviteNames}>
          {displayNames.partnerOne} <span aria-hidden="true">&amp;</span>{" "}
          {displayNames.partnerTwo}
        </p>
        <p className={styles.inviteRequest}>{floralDemoData.inviteRequest}</p>
        <p className={styles.inviteDate}>{floralDemoData.dateLine}</p>
        <p className={styles.inviteRegion}>{floralDemoData.regionLabel}</p>
      </Reveal>

      <Reveal delay={180} className={styles.countdownWrap}>
        <Countdown target={floralDemoData.countdownTarget} />
      </Reveal>
    </section>
  );
}

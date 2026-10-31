import MusicControl from "@/components/invitation/MusicControl";
import { demoWeddingData } from "@/data/demoWeddingData";
import type { CoupleNames, TemplateRenderProps } from "@/templates/types";
import { resolveNames } from "@/utils/names";

import { luxuryAssets } from "./assets";
import Celebrations from "./sections/Celebrations";
import Closing from "./sections/Closing";
import Hero from "./sections/Hero";
import InvitationIntro from "./sections/InvitationIntro";
import SampleMoments from "./sections/SampleMoments";
import styles from "./styles/LuxuryCinematic.module.css";

/**
 * Luxury Cinematic — a dark, gold-lit, film-style Pakistani wedding
 * invitation. Owns its layout and motion identity; shares only
 * data-agnostic primitives (event list, countdown, music control…).
 *
 * Temporary name overrides are resolved at render time; the sample data
 * object is never mutated (PRODUCT_SPEC §6).
 */
export default function LuxuryCinematicTemplate({ meta, names }: TemplateRenderProps) {
  const displayNames: CoupleNames = resolveNames(demoWeddingData.couple, names);

  return (
    <article className={styles.template} aria-label={`${meta.title} invitation demo`}>
      <Hero displayNames={displayNames} />
      <InvitationIntro displayNames={displayNames} />
      <Celebrations />
      <SampleMoments />
      <Closing displayNames={displayNames} meta={meta} />
      <MusicControl src={luxuryAssets.music.src} title={luxuryAssets.music.title} />
    </article>
  );
}

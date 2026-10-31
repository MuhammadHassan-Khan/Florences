import MusicControl from "@/components/invitation/MusicControl";
import { elegantDemoData } from "@/data/demoElegantData";
import type { CoupleNames, TemplateRenderProps } from "@/templates/types";
import { resolveNames } from "@/utils/names";

import { elegantAssets } from "./assets";
import CelebrationList from "./sections/CelebrationList";
import ClosingNote from "./sections/ClosingNote";
import EngravedHero from "./sections/EngravedHero";
import FramedGallery from "./sections/FramedGallery";
import InvitationWording from "./sections/InvitationWording";
import styles from "./styles/ElegantClassic.module.css";

/**
 * Elegant Classic — a timeless ivory-and-champagne-gold, engraved
 * stationery-style Pakistani wedding invitation. Centred formal
 * composition, hairline rules and dotted-leader lists; it shares only
 * data-agnostic primitives (countdown, venue links, music control…).
 *
 * Temporary name overrides are resolved at render time; the sample data
 * object is never mutated (PRODUCT_SPEC §6).
 */
export default function ElegantClassicTemplate({ meta, names }: TemplateRenderProps) {
  const displayNames: CoupleNames = resolveNames(elegantDemoData.couple, names);

  return (
    <article className={styles.template} aria-label={`${meta.title} invitation demo`}>
      <EngravedHero displayNames={displayNames} />
      <InvitationWording displayNames={displayNames} />
      <CelebrationList />
      <FramedGallery />
      <ClosingNote displayNames={displayNames} meta={meta} />
      <MusicControl src={elegantAssets.music.src} title={elegantAssets.music.title} />
    </article>
  );
}

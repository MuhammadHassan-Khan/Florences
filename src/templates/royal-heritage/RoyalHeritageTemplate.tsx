import MusicControl from "@/components/invitation/MusicControl";
import { royalDemoData } from "@/data/demoRoyalData";
import type { CoupleNames, TemplateRenderProps } from "@/templates/types";
import { resolveNames } from "@/utils/names";

import { royalAssets } from "./assets";
import Celebrations from "./sections/Celebrations";
import ClosingBenediction from "./sections/ClosingBenediction";
import GalleryArches from "./sections/GalleryArches";
import Hero from "./sections/Hero";
import InvitationPanel from "./sections/InvitationPanel";
import styles from "./styles/RoyalHeritage.module.css";

/**
 * Royal Heritage — a regal Mughal-arch, jaali-lattice Pakistani wedding
 * invitation in emerald and antique gold. Strictly symmetric: ornamental
 * framing (arches, lattice bands, medallions) is the layout device.
 *
 * Shared components provide behaviour only; every visual decision — the
 * ceremonial event cards, the arched gallery frames, the palette — lives
 * in this module. Identity custom properties on the template root theme
 * the shared heading/CTA components without touching their CSS.
 *
 * Temporary name overrides are resolved at render time; the sample data
 * object is never mutated (PRODUCT_SPEC §6).
 */
export default function RoyalHeritageTemplate({ meta, names }: TemplateRenderProps) {
  const displayNames: CoupleNames = resolveNames(royalDemoData.couple, names);

  return (
    <article className={styles.template} aria-label={`${meta.title} invitation demo`}>
      <Hero displayNames={displayNames} />
      <InvitationPanel displayNames={displayNames} />
      <Celebrations />
      <GalleryArches />
      <ClosingBenediction displayNames={displayNames} meta={meta} />
      <MusicControl src={royalAssets.music.src} title={royalAssets.music.title} />
    </article>
  );
}

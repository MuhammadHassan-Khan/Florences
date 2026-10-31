/* Minimal Modern — editorial, ink-on-paper wedding invitation renderer. */
import type { CSSProperties } from "react";

import MusicControl from "@/components/invitation/MusicControl";
import { minimalDemoData } from "@/data/demoMinimalData";
import type { CoupleNames, TemplateRenderProps } from "@/templates/types";
import { resolveNames } from "@/utils/names";

import { minimalAssets } from "./assets";
import Closing from "./sections/Closing";
import GalleryStrip from "./sections/GalleryStrip";
import Hero from "./sections/Hero";
import IndexStrip from "./sections/IndexStrip";
import Schedule from "./sections/Schedule";
import styles from "./styles/MinimalModern.module.css";

/**
 * Identity theming, applied to the template ROOT element. The shared
 * SectionHeading and EnquiryCta components read these custom properties,
 * so the ink/paper identity carries into them without touching their CSS.
 * The remaining local tokens (accent, rules, measures) are defined in the
 * module stylesheet on the same element.
 */
const identityVars = {
  "--heading-accent": "var(--mm-accent)",
  "--cta-bg": "var(--color-ink)",
  "--cta-fg": "var(--color-paper)",
  "--cta-bg-hover": "var(--mm-accent)",
  "--cta-fg-hover": "var(--color-paper)",
} as CSSProperties;

/**
 * Minimal Modern — an editorial, typographic Pakistani wedding invitation:
 * paper white, hairline rules, index numbers and generous whitespace. The
 * body font leads and the display serif is reserved for the couple's
 * names; the absence of motion is the signature.
 *
 * Temporary name overrides are resolved at render time; the sample data
 * object is never mutated (PRODUCT_SPEC §6).
 */
export default function MinimalModernTemplate({ meta, names }: TemplateRenderProps) {
  const displayNames: CoupleNames = resolveNames(minimalDemoData.couple, names);

  return (
    <article
      className={styles.template}
      aria-label={`${meta.title} invitation demo`}
      style={identityVars}
    >
      <Hero displayNames={displayNames} />
      <IndexStrip displayNames={displayNames} />
      <Schedule />
      <GalleryStrip />
      <Closing displayNames={displayNames} meta={meta} />
      <MusicControl src={minimalAssets.music.src} title={minimalAssets.music.title} />
    </article>
  );
}

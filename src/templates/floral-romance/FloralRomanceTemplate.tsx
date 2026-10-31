/* Floral Romance — light botanical wedding invitation renderer. */
import type { CSSProperties } from "react";

import MusicControl from "@/components/invitation/MusicControl";
import { floralDemoData } from "@/data/demoFloralData";
import type { CoupleNames, TemplateRenderProps } from "@/templates/types";
import { resolveNames } from "@/utils/names";

import { floralAssets } from "./assets";
import Celebrations from "./sections/Celebrations";
import Closing from "./sections/Closing";
import Gallery from "./sections/Gallery";
import Hero from "./sections/Hero";
import InvitationIntro from "./sections/InvitationIntro";
import styles from "./styles/FloralRomance.module.css";

/**
 * Identity tokens set on the template root so shared components (section
 * headings, the enquiry CTA) inherit this template's palette. Nothing
 * global is modified — custom properties scope to the <article> subtree.
 */
const identityTokens = {
  "--heading-accent": "#8f4a5c",
  "--cta-bg": "#8f4a5c",
  "--cta-fg": "#faf7f1",
  "--cta-bg-hover": "#6f3343",
  "--cta-fg-hover": "#faf7f1",
} as CSSProperties;

/**
 * Floral Romance — the light, botanical counterpart to Luxury Cinematic:
 * an ivory/rose/sage Pakistani wedding invitation with airy typography,
 * hand-drawn SVG sprigs and gentle petal drift. It owns its layout, palette
 * and motion identity; only data-agnostic behaviour is shared.
 *
 * Temporary name overrides are resolved at render time; the sample data
 * object is never mutated (PRODUCT_SPEC §6).
 */
export default function FloralRomanceTemplate({ meta, names }: TemplateRenderProps) {
  const displayNames: CoupleNames = resolveNames(floralDemoData.couple, names);

  return (
    <article
      className={styles.template}
      aria-label={`${meta.title} invitation demo`}
      style={identityTokens}
    >
      <Hero displayNames={displayNames} />
      <InvitationIntro displayNames={displayNames} />
      <Celebrations />
      <Gallery />
      <Closing displayNames={displayNames} meta={meta} />
      <MusicControl src={floralAssets.music.src} title={floralAssets.music.title} />
    </article>
  );
}

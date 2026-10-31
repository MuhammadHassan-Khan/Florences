/* Floral Romance — botanical gallery of four original SVG artworks. */
import ArtworkImage from "@/components/invitation/ArtworkImage";
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";

import { floralAssets } from "../assets";
import styles from "../styles/FloralRomance.module.css";

/**
 * Botanical gallery. Four original placeholder drawings with reserved
 * dimensions (no layout shift), lazy-loaded below the fold and an inline
 * labelled fallback if a file ever fails to load.
 */
export default function Gallery() {
  return (
    <section className={styles.section} aria-label="Gallery">
      <Reveal>
        <SectionHeading eyebrow="Gallery" title="In Bloom" />
      </Reveal>

      <Reveal delay={100} className={styles.fullWidth}>
        <ul className={styles.galleryGrid}>
          {floralAssets.gallery.map((item) => (
            <li key={item.src} className={styles.galleryItem}>
              <ArtworkImage
                className={styles.galleryImage}
                src={item.src}
                alt={item.alt}
                width={800}
                height={600}
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

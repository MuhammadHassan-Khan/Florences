import ArtworkImage from "@/components/invitation/ArtworkImage";
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";

import { luxuryAssets } from "../assets";
import styles from "../styles/LuxuryCinematic.module.css";

/**
 * Sample media gallery. Original placeholder artwork with reserved
 * dimensions (no layout shift), lazy-loaded below the fold, and an
 * inline fallback if an image fails to load.
 */
export default function SampleMoments() {
  return (
    <section className={styles.section} aria-label="Gallery">
      <Reveal>
        <SectionHeading eyebrow="Gallery" title="Moments" />
      </Reveal>

      <Reveal delay={100} className={styles.fullWidth}>
        <ul className={styles.galleryGrid}>
          {luxuryAssets.gallery.map((item) => (
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

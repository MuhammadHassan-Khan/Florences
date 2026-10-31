import ArtworkImage from "@/components/invitation/ArtworkImage";
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";

import { elegantAssets } from "../assets";
import styles from "../styles/ElegantClassic.module.css";

/**
 * Gallery of engraved placeholder plates in thin gold frames. Images
 * reserve their dimensions (no layout shift), lazy-load below the fold
 * and fall back inline if a file fails to load.
 */
export default function FramedGallery() {
  return (
    <section className={styles.section} aria-label="Gallery">
      <Reveal>
        <SectionHeading eyebrow="Engraved keepsakes" title="The Gallery" />
      </Reveal>

      <Reveal delay={100} className={styles.narrow}>
        <ul className={styles.galleryGrid}>
          {elegantAssets.gallery.map((item) => (
            <li key={item.src} className={styles.galleryFrame}>
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

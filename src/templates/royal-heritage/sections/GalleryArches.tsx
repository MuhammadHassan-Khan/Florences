import ArtworkImage from "@/components/invitation/ArtworkImage";
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";

import { royalAssets } from "../assets";
import styles from "../styles/RoyalHeritage.module.css";

/**
 * Gallery of the template's original placeholder artwork, each piece set
 * inside a symmetric arched frame. Dimensions are reserved and images
 * lazy-load below the fold (shared ArtworkImage behaviour); the frames
 * carry the ornament, the artwork only fills them.
 */
export default function GalleryArches() {
  return (
    <section className={styles.section} aria-label="Gallery">
      <Reveal>
        <SectionHeading eyebrow="Gallery" title="Ornament & Light" />
      </Reveal>

      <Reveal delay={100} className={styles.fullWidth}>
        <ul className={styles.galleryGrid}>
          {royalAssets.gallery.map((item) => (
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

/* Compact gallery strip of the four original placeholder plates. */
import ArtworkImage from "@/components/invitation/ArtworkImage";
import Reveal from "@/components/invitation/Reveal";
import SectionHeading from "@/components/invitation/SectionHeading";

import { minimalAssets } from "../assets";
import styles from "../styles/MinimalModern.module.css";

/**
 * Four plates in a compact strip: reserved dimensions (no layout shift),
 * lazy-loading below the fold and an inline fallback if a file fails to
 * load. Captions stay typographic — the alt text describes the artwork.
 */
export default function GalleryStrip() {
  return (
    <section className={styles.section} aria-label="Gallery of studies">
      <div className={styles.frame}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex} aria-hidden="true">
            03
          </span>
          <SectionHeading
            align="start"
            ornament={false}
            eyebrow="Gallery"
            title="The studies"
          />
        </div>

        <Reveal className={styles.revealQuick}>
          <ul className={styles.platesGrid}>
            {minimalAssets.gallery.map((item, index) => (
              <li key={item.src} className={styles.plate}>
                <span className={styles.plateFrame}>
                  <ArtworkImage
                    className={styles.plateImage}
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={600}
                  />
                </span>
                <span className={styles.plateCaption}>
                  <span className={styles.plateLabel}>Plate</span>{" "}
                  <span className={styles.plateNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

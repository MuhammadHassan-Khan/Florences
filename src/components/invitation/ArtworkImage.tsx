import { useState } from "react";

import styles from "./ArtworkImage.module.css";

/**
 * Gallery artwork with reserved dimensions (no layout shift), lazy loading
 * below the fold, and an inline labelled fallback if the file fails to
 * load — shared *behaviour*; sizing, framing and animation stay with each
 * template's own layout.
 */
export default function ArtworkImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Class for template-specific cropping/framing. */
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${styles.fallback} ${className ?? ""}`}
        role="img"
        aria-label={alt}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <span className={styles.fallbackMark} aria-hidden="true">
          ✦
        </span>
        <span className={styles.fallbackText}>Sample artwork</span>
      </div>
    );
  }

  return (
    <img
      className={className ? `${styles.image} ${className}` : styles.image}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

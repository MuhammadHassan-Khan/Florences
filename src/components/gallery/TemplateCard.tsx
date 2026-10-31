import { useState } from "react";
import { Link } from "react-router-dom";

import { getTemplateStatus } from "@/templates/registry";
import type { TemplateMeta } from "@/templates/types";

import styles from "./TemplateCard.module.css";

/**
 * Gallery card. The whole card is a link to the template's stable route;
 * the status badge is derived from the registry so a placeholder template
 * is never presented as a finished demo.
 */
export default function TemplateCard({ meta }: { meta: TemplateMeta }) {
  const [imageFailed, setImageFailed] = useState(false);
  const status = getTemplateStatus(meta.id);
  const isAvailable = status === "available";

  return (
    <Link to={meta.route} className={styles.card}>
      <div className={styles.thumbWrap}>
        {imageFailed ? (
          <div className={styles.thumbFallback} role="img" aria-label={`${meta.title} preview`}>
            <span className={styles.thumbFallbackMark} aria-hidden="true">
              ✦
            </span>
          </div>
        ) : (
          <img
            className={styles.thumb}
            src={meta.thumbnail}
            alt=""
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        )}
        <span
          className={
            isAvailable ? `${styles.badge} ${styles.badgeAvailable}` : styles.badge
          }
        >
          {isAvailable ? "Live demo" : "In preparation"}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.styleLabel}>{meta.styleLabel}</p>
        <h2 className={styles.title}>{meta.title}</h2>
        <p className={styles.description}>{meta.description}</p>
        <span className={styles.cta}>
          {isAvailable ? "Open demo" : "Preview coming soon"}
          <span className={styles.ctaArrow} aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

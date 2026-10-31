import styles from "./SectionHeading.module.css";

/**
 * Shared section heading: eyebrow + title + optional ornament.
 * Presentation only — templates decide placement and order.
 */
export default function SectionHeading({
  eyebrow,
  title,
  ornament = true,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  ornament?: boolean;
  align?: "center" | "start";
  /** Extra class for template-specific layout/typography overrides. */
  className?: string;
}) {
  const base = align === "center" ? `${styles.heading} ${styles.center}` : styles.heading;
  return (
    <div className={className ? `${base} ${className}` : base}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={styles.title}>{title}</h2>
      {ornament ? (
        <span className={styles.ornament} aria-hidden="true">
          <span className={styles.ornamentLine} />
          <span className={styles.ornamentDiamond} />
          <span className={styles.ornamentLine} />
        </span>
      ) : null}
    </div>
  );
}

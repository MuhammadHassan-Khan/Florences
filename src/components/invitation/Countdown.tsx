import { useEffect, useState } from "react";

import { partsUntil, type CountdownParts } from "@/utils/partsUntil";

import styles from "./Countdown.module.css";

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;

/**
 * Live countdown to the sample celebration target. Text updates once per
 * second with no animated motion, so reduced-motion users are unaffected.
 * Invalid targets render nothing instead of misleading values.
 */
export default function Countdown({
  target,
  className,
}: {
  target: string;
  /** Extra class for template-specific layout/typography overrides. */
  className?: string;
}) {
  const [parts, setParts] = useState<CountdownParts | null>(() =>
    partsUntil(target, new Date()),
  );

  useEffect(() => {
    const id = window.setInterval(() => setParts(partsUntil(target, new Date())), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!parts) return null;

  const reached = parts.days + parts.hours + parts.minutes + parts.seconds === 0;
  const values = [parts.days, parts.hours, parts.minutes, parts.seconds];
  const rootClass = className ? `${styles.countdown} ${className}` : styles.countdown;

  return (
    <div className={rootClass} role="timer" aria-label="Countdown to the celebration">
      <p className={styles.caption}>
        {reached ? "The celebrations have begun" : "Celebrations begin in"}
      </p>
      <ul className={styles.grid}>
        {values.map((value, index) => (
          <li key={UNITS[index]} className={styles.unit}>
            <span className={styles.value}>
              {String(value).padStart(2, "0")}
              <span className={styles.srOnly}> {UNITS[index].toLowerCase()}</span>
            </span>
            <span className={styles.label} aria-hidden="true">
              {UNITS[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

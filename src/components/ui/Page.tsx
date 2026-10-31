import type { ReactNode } from "react";

import styles from "./Page.module.css";

/**
 * Shared page-level primitives (heading block + centred content column)
 * used by the simple pages. Template demos carry their own layouts.
 */
export default function Page({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
    </div>
  );
}

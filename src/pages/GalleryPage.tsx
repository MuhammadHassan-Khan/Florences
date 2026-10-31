import TemplateCard from "@/components/gallery/TemplateCard";
import { listTemplates } from "@/templates/registry";

import styles from "./GalleryPage.module.css";

/**
 * Landing gallery: five template cards rendered from the single
 * registry data source (Phase 2 scope).
 */
export default function GalleryPage() {
  const templates = listTemplates();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Demo showcase</p>
        <h1 className={styles.title}>Digital wedding invitations</h1>
        <p className={styles.lede}>
          Explore five interactive invitation templates, preview each experience end to
          end, and continue your enquiry on WhatsApp.
        </p>
      </header>

      <ul className={styles.grid}>
        {templates.map((meta) => (
          <li key={meta.id} className={styles.gridItem}>
            <TemplateCard meta={meta} />
          </li>
        ))}
      </ul>
    </div>
  );
}

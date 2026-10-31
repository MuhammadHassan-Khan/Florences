import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.note}>
          Demo showcase — all names, dates and venues shown are sample content.
        </p>
        <p className={styles.legal}>
          Enquiries are continued manually over WhatsApp. This site does not process
          payments or create accounts.
        </p>
      </div>
    </footer>
  );
}

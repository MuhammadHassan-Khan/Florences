import { Link } from "react-router-dom";

import styles from "./EnquiryCta.module.css";

/**
 * Closing call-to-action. Hands off to the enquiry form with the current
 * template preselected; it never implies an order or message was sent.
 */
export default function EnquiryCta({
  templateId,
  templateTitle,
  note,
  className,
}: {
  templateId: string;
  templateTitle: string;
  note?: string;
  /** Extra class for template-specific layout overrides. */
  className?: string;
}) {
  return (
    <div className={className ? `${styles.cta} ${className}` : styles.cta}>
      <p className={styles.kicker}>Love this design?</p>
      <Link className={styles.button} to={`/enquire?template=${templateId}`}>
        Enquire about “{templateTitle}”
      </Link>
      <p className={styles.note}>
        {note ?? "Opens the enquiry form — nothing is sent until you confirm in WhatsApp."}
      </p>
    </div>
  );
}

import type { CoupleNames } from "@/templates/types";

import styles from "./DemoNameEditor.module.css";

/**
 * Temporary personalization panel (PRODUCT_SPEC §6): values update the
 * preview immediately, stay in local state, and are never persisted.
 */
export default function DemoNameEditor({
  value,
  onChange,
}: {
  value: CoupleNames;
  onChange: (next: CoupleNames) => void;
}) {
  const isPristine = value.partnerOne.trim() === "" && value.partnerTwo.trim() === "";

  return (
    <section className={styles.panel} aria-label="Demo personalization">
      <div className={styles.head}>
        <p className={styles.chip}>Demo personalization</p>
        <p className={styles.hint}>Temporary preview — changes are not saved.</p>
      </div>

      <div className={styles.fields}>
        <p className={styles.field}>
          <label className={styles.label} htmlFor="demo-name-one">
            Partner one
          </label>
          <input
            id="demo-name-one"
            className={styles.input}
            type="text"
            value={value.partnerOne}
            maxLength={40}
            autoComplete="off"
            placeholder="e.g. Noor"
            onChange={(event) => onChange({ ...value, partnerOne: event.target.value })}
          />
        </p>

        <p className={styles.field}>
          <label className={styles.label} htmlFor="demo-name-two">
            Partner two
          </label>
          <input
            id="demo-name-two"
            className={styles.input}
            type="text"
            value={value.partnerTwo}
            maxLength={40}
            autoComplete="off"
            placeholder="e.g. Zayn"
            onChange={(event) => onChange({ ...value, partnerTwo: event.target.value })}
          />
        </p>

        <button
          type="button"
          className={styles.reset}
          onClick={() => onChange({ partnerOne: "", partnerTwo: "" })}
          disabled={isPristine}
        >
          Reset to sample
        </button>
      </div>
    </section>
  );
}

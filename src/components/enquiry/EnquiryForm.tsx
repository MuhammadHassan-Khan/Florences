import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { isPlaceholderWhatsAppNumber } from "@/config/site";
import { listTemplates } from "@/templates/registry";
import {
  buildEnquiryMessage,
  buildWhatsAppUrl,
  EVENT_OPTIONS,
  eventLabel,
  type EnquiryMessageValues,
} from "@/utils/buildWhatsAppUrl";
import {
  MAX_MESSAGE_LENGTH,
  normaliseEnquiry,
  validateEnquiry,
  type EnquiryFieldErrors,
  type EnquiryFields,
} from "@/utils/enquiryValidation";

import styles from "./EnquiryForm.module.css";

const EMPTY_FIELDS: EnquiryFields = {
  customerName: "",
  phone: "",
  templateId: "",
  weddingDate: "",
  eventTypes: [],
  message: "",
};

/**
 * The enquiry handoff form (PRODUCT_SPEC §7, ARCHITECTURE.md §8).
 *
 * Behaviour contract:
 * - Values are local component state only — nothing is persisted.
 * - Validation is inline and keeps entered values on failure.
 * - A valid submit does NOT send anything: it prepares a labelled
 *   WhatsApp message and hands the visitor to an explicit link.
 * - While the business number is still the configured placeholder the
 *   handoff link is withheld and a notice explains why.
 */
export default function EnquiryForm({
  initialTemplateId = "",
}: {
  /** Preselected template id from ?template= (validated below). */
  initialTemplateId?: string;
}) {
  const templates = listTemplates();
  const ids = templates.map((t) => t.id);
  const preselected = ids.includes(initialTemplateId) ? initialTemplateId : "";

  const [fields, setFields] = useState<EnquiryFields>({
    ...EMPTY_FIELDS,
    templateId: preselected,
  });
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);
  const [preparedMessage, setPreparedMessage] = useState("");

  const baseId = useId();
  const idFor = (field: string) => `${baseId}-${field}`;

  const placeholderNumber = isPlaceholderWhatsAppNumber();

  function update<K extends keyof EnquiryFields>(key: K, value: EnquiryFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
    // Clear the field's error as soon as the visitor edits it again.
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function toggleEvent(id: string, checked: boolean) {
    setFields((prev) => ({
      ...prev,
      eventTypes: checked
        ? [...prev.eventTypes, id]
        : prev.eventTypes.filter((e) => e !== id),
    }));
    setErrors((prev) => {
      if (!("eventTypes" in prev)) return prev;
      const next = { ...prev };
      delete next.eventTypes;
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateEnquiry(fields, (id) => ids.includes(id));
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Never claim anything was prepared; focus the first bad field.
      setPreparedUrl(null);
      const firstBad = document.getElementById(idFor(firstErrorKey(nextErrors)));
      firstBad?.focus();
      return;
    }

    const normalised = normaliseEnquiry(fields, EVENT_OPTIONS);
    const template = templates.find((t) => t.id === normalised.templateId)!;
    const messageValues: EnquiryMessageValues = {
      customerName: normalised.customerName,
      phone: normalised.phoneDigits,
      templateTitle: template.title,
      templateId: template.id,
      weddingDate: normalised.weddingDate,
      eventTypes: normalised.eventTypes,
      message: normalised.message,
    };

    const message = buildEnquiryMessage(messageValues);
    const url = buildWhatsAppUrl(normalised.phoneDigits, message);
    setPreparedMessage(message);
    setPreparedUrl(url);
  }

  const errorList = Object.entries(errors) as [keyof EnquiryFields, string][];

  return (
    <div className={styles.wrapper}>
      <p className={styles.intro}>
        Fill in the details below and we will prepare a WhatsApp message for
        you. Nothing is sent automatically — you will review the message and
        send it yourself in WhatsApp.
      </p>

      {preselected === "" && initialTemplateId !== "" ? (
        <p className={styles.notice} role="status">
          The link you followed referenced an unknown template, so no template
          was preselected. Please choose one below.{" "}
          <Link to="/gallery">Back to the gallery</Link>
        </p>
      ) : null}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* --- Name --------------------------------------------------- */}
        <div className={styles.field}>
          <label htmlFor={idFor("customerName")}>
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id={idFor("customerName")}
            name="customerName"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="e.g. Ayesha Khan"
            value={fields.customerName}
            onChange={(e) => update("customerName", e.target.value)}
            aria-invalid={errors.customerName ? true : undefined}
            aria-describedby={errors.customerName ? idFor("customerName-error") : undefined}
          />
          {errors.customerName ? (
            <p className={styles.error} id={idFor("customerName-error")}>
              {errors.customerName}
            </p>
          ) : null}
        </div>

        {/* --- Phone -------------------------------------------------- */}
        <div className={styles.field}>
          <label htmlFor={idFor("phone")}>
            WhatsApp / phone number <span aria-hidden="true">*</span>
          </label>
          <input
            id={idFor("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="e.g. 923001234567"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={`${idFor("phone-hint")}${errors.phone ? ` ${idFor("phone-error")}` : ""}`}
          />
          <p className={styles.hint} id={idFor("phone-hint")}>
            Include the country code, digits only — e.g. 923001234567.
          </p>
          {errors.phone ? (
            <p className={styles.error} id={idFor("phone-error")}>
              {errors.phone}
            </p>
          ) : null}
        </div>

        {/* --- Template ----------------------------------------------- */}
        <div className={styles.field}>
          <label htmlFor={idFor("templateId")}>
            Template <span aria-hidden="true">*</span>
          </label>
          <select
            id={idFor("templateId")}
            name="templateId"
            required
            value={fields.templateId}
            onChange={(e) => update("templateId", e.target.value)}
            aria-invalid={errors.templateId ? true : undefined}
            aria-describedby={errors.templateId ? idFor("templateId-error") : undefined}
          >
            <option value="">Choose a template…</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          {errors.templateId ? (
            <p className={styles.error} id={idFor("templateId-error")}>
              {errors.templateId}
            </p>
          ) : null}
        </div>

        {/* --- Wedding date (optional) -------------------------------- */}
        <div className={styles.field}>
          <label htmlFor={idFor("weddingDate")}>
            Wedding date <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id={idFor("weddingDate")}
            name="weddingDate"
            type="date"
            value={fields.weddingDate}
            onChange={(e) => update("weddingDate", e.target.value)}
            aria-invalid={errors.weddingDate ? true : undefined}
            aria-describedby={errors.weddingDate ? idFor("weddingDate-error") : undefined}
          />
          {errors.weddingDate ? (
            <p className={styles.error} id={idFor("weddingDate-error")}>
              {errors.weddingDate}
            </p>
          ) : null}
        </div>

        {/* --- Event types (optional) --------------------------------- */}
        <fieldset className={styles.fieldset}>
          <legend>
            Event types <span className={styles.optional}>(optional)</span>
          </legend>
          <div className={styles.checkboxes}>
            {EVENT_OPTIONS.map((id) => {
              const checked = fields.eventTypes.includes(id);
              return (
                <label
                  key={id}
                  className={`${styles.checkbox} ${checked ? styles.checkboxOn : ""}`}
                >
                  <input
                    type="checkbox"
                    name="eventTypes"
                    value={id}
                    checked={checked}
                    onChange={(e) => toggleEvent(id, e.target.checked)}
                  />
                  <span>{eventLabel(id)}</span>
                </label>
              );
            })}
          </div>
          {errors.eventTypes ? (
            <p className={styles.error} role="alert">
              {errors.eventTypes}
            </p>
          ) : null}
        </fieldset>

        {/* --- Message (optional) ------------------------------------- */}
        <div className={styles.field}>
          <label htmlFor={idFor("message")}>
            Requirements / message{" "}
            <span className={styles.optional}>(optional)</span>
          </label>
          <textarea
            id={idFor("message")}
            name="message"
            rows={5}
            maxLength={MAX_MESSAGE_LENGTH + 100}
            placeholder="e.g. We loved the gold cinematic look and would like a Urdu/English bilingual invitation."
            value={fields.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={`${idFor("message-hint")}${errors.message ? ` ${idFor("message-error")}` : ""}`}
          />
          <p className={styles.hint} id={idFor("message-hint")}>
            {fields.message.length}/{MAX_MESSAGE_LENGTH} characters
          </p>
          {errors.message ? (
            <p className={styles.error} id={idFor("message-error")}>
              {errors.message}
            </p>
          ) : null}
        </div>

        {errorList.length > 0 ? (
          <p className={styles.errorSummary} role="alert">
            Please fix the highlighted {errorList.length === 1 ? "field" : "fields"}{" "}
            above and try again. Nothing has been sent.
          </p>
        ) : null}

        <div className={styles.actions}>
          <button type="submit" className={styles.submit}>
            Prepare WhatsApp message
          </button>
        </div>
      </form>

      {/* --- Prepared handoff ----------------------------------------- */}
      {preparedUrl !== null && !placeholderNumber ? (
        <section className={styles.handoff} aria-labelledby={idFor("handoff-title")}>
          <h2 id={idFor("handoff-title")}>Your message is ready</h2>
          <p>
            WhatsApp will open with this message. Nothing has been sent yet —
            please review it and press send inside WhatsApp.
          </p>
          <pre className={styles.preview}>{preparedMessage}</pre>
          <a
            className={styles.whatsappLink}
            href={preparedUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open WhatsApp
          </a>
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              setPreparedUrl(null);
              setPreparedMessage("");
            }}
          >
            Edit my details
          </button>
        </section>
      ) : null}

      {preparedUrl !== null && placeholderNumber ? (
        <section className={styles.handoff} aria-labelledby={idFor("handoff-title")}>
          <h2 id={idFor("handoff-title")}>Demo build — WhatsApp not connected</h2>
          <p role="status">
            This site is running with a placeholder WhatsApp number, so the
            handoff link is disabled. Once the business number is configured in{" "}
            <code>src/config/site.ts</code> the same message will open in
            WhatsApp. Here is the message that would be sent:
          </p>
          <pre className={styles.preview}>{preparedMessage}</pre>
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              setPreparedUrl(null);
              setPreparedMessage("");
            }}
          >
            Edit my details
          </button>
        </section>
      ) : null}
    </div>
  );
}

/** First field (in declaration order) that has an error, for focus management. */
function firstErrorKey(errors: EnquiryFieldErrors): keyof EnquiryFields {
  const order: (keyof EnquiryFields)[] = [
    "customerName",
    "phone",
    "templateId",
    "weddingDate",
    "eventTypes",
    "message",
  ];
  return order.find((key) => errors[key]) ?? "customerName";
}

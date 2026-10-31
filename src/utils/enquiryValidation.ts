/**
 * Enquiry form validation (PRODUCT_SPEC §7, ARCHITECTURE.md §10).
 *
 * Pure functions over plain objects so they can be unit-tested without
 * rendering. All checks deliberately mirror the inline messages shown to
 * the visitor: the same strings drive the UI and the tests.
 */

/** Raw field values as edited in the form. */
export type EnquiryFields = {
  customerName: string;
  phone: string;
  templateId: string;
  weddingDate: string;
  /** Ids from EVENT_OPTIONS. */
  eventTypes: string[];
  message: string;
};

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryFields, string>>;

/** Free-text message length cap so the prepared WhatsApp message stays sane. */
export const MAX_MESSAGE_LENGTH = 500;
export const MAX_NAME_LENGTH = 80;
export const MAX_PHONE_LENGTH = 25;

const REQUIRED_FIELDS_MESSAGE = "This field is required.";

export const enquiryFieldErrors: Record<string, string> = {
  customerNameRequired: "Please enter your name.",
  customerNameLong: `Please keep your name under ${MAX_NAME_LENGTH + 1} characters.`,
  phoneRequired: "Please enter a WhatsApp or phone number.",
  phoneInvalid:
    "Please enter a valid phone number with country code, e.g. 923001234567.",
  templateRequired: "Please choose a template.",
  weddingDateInvalid: "Please choose a valid wedding date.",
  messageLong: `Please keep your message under ${MAX_MESSAGE_LENGTH + 1} characters.`,
  tooManyEvents: "Please select at most 5 events.",
};

/**
 * Accepts common human input (spaces, dashes, brackets, a leading "+")
 * and returns digits-only international format, or "" when the input is
 * not plausibly a phone number.
 */
export function normalisePhoneInput(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed === "") return "";
  // Reject obvious non-phone input before stripping anything.
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) return "";
  return trimmed.replace(/\D/g, "");
}

/** A plausible international number: 7–15 digits (E.164 maximum). */
export function isPlausiblePhone(digits: string): boolean {
  return /^\d{7,15}$/.test(digits);
}

export function validateEnquiry(
  fields: EnquiryFields,
  isKnownTemplate: (id: string) => boolean,
): EnquiryFieldErrors {
  const errors: EnquiryFieldErrors = {};

  const name = fields.customerName.trim();
  if (name === "") {
    errors.customerName = enquiryFieldErrors.customerNameRequired;
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.customerName = enquiryFieldErrors.customerNameLong;
  }

  const digits = normalisePhoneInput(fields.phone);
  if (digits === "") {
    errors.phone =
      fields.phone.trim() === ""
        ? enquiryFieldErrors.phoneRequired
        : enquiryFieldErrors.phoneInvalid;
  } else if (!isPlausiblePhone(digits) || digits.length > MAX_PHONE_LENGTH) {
    errors.phone = enquiryFieldErrors.phoneInvalid;
  }

  const templateId = fields.templateId.trim();
  if (templateId === "") {
    errors.templateId = enquiryFieldErrors.templateRequired;
  } else if (!isKnownTemplate(templateId)) {
    errors.templateId = "That template is not available. Please choose one.";
  }

  if (fields.weddingDate !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(fields.weddingDate)) {
    errors.weddingDate = enquiryFieldErrors.weddingDateInvalid;
  }

  if (fields.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = enquiryFieldErrors.messageLong;
  }

  if (fields.eventTypes.length > 5) {
    errors.eventTypes = enquiryFieldErrors.tooManyEvents;
  }

  return errors;
}

/** The submitted values, normalised and safe to place into a message. */
export type ValidatedEnquiry = {
  customerName: string;
  phoneDigits: string;
  templateId: string;
  weddingDate: string;
  eventTypes: string[];
  message: string;
};

/**
 * Normalises fields after successful validation. Phone numbers are
 * digits-only; names and messages are trimmed; unknown event ids are
 * dropped so only our own labelled options reach the message.
 */
export function normaliseEnquiry(
  fields: EnquiryFields,
  knownEventIds: readonly string[],
): ValidatedEnquiry {
  return {
    customerName: fields.customerName.trim(),
    phoneDigits: normalisePhoneInput(fields.phone),
    templateId: fields.templateId.trim(),
    weddingDate: fields.weddingDate,
    eventTypes: fields.eventTypes.filter((id) => knownEventIds.includes(id)),
    message: fields.message.trim(),
  };
}

export { REQUIRED_FIELDS_MESSAGE };

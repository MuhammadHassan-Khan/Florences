/** Workshop / waitlist registration validation (pure, unit-tested). */

export const ROLE_OPTIONS = [
  { value: '', label: 'Select your current role' },
  { value: 'student', label: 'Student' },
  { value: 'creator', label: 'Creator' },
  { value: 'professional', label: 'Professional' },
  { value: 'business-owner', label: 'Business owner' },
] as const;

export const EXPERIENCE_OPTIONS = [
  { value: '', label: 'Select your AI experience level' },
  { value: 'none', label: 'Never used AI tools' },
  { value: 'beginner', label: 'Beginner — I have tried a few tools' },
  { value: 'intermediate', label: 'Intermediate — I use AI regularly' },
  { value: 'advanced', label: 'Advanced — I build with AI' },
] as const;

export type RegistrationInput = {
  fullName: string;
  email: string;
  whatsapp: string;
  role: string;
  experience: string;
  interest: string;
  message: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof RegistrationInput, string>>;

/** Loose international phone check: optional +, 7–15 digits after stripping separators. */
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const cleaned = value.replace(/[\s()-]/g, '');
  if (!PHONE_PATTERN.test(value.trim())) return false;
  const digits = cleaned.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function validateRegistration(input: RegistrationInput): FieldErrors {
  const errors: FieldErrors = {};

  if (input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!input.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!isEmail(input.email)) {
    errors.email = 'That email address does not look right.';
  }

  if (!input.whatsapp.trim()) {
    errors.whatsapp = 'Please enter your WhatsApp number.';
  } else if (!isValidPhone(input.whatsapp)) {
    errors.whatsapp = 'Enter a valid number with 7–15 digits (you can include the country code).';
  }

  if (!input.role) {
    errors.role = 'Please select your current role.';
  }

  if (!input.experience) {
    errors.experience = 'Please select your AI experience level.';
  }

  if (!input.interest) {
    errors.interest = 'Please choose what you are interested in.';
  }

  if (!input.consent) {
    errors.consent = 'Please confirm you agree to receive workshop updates.';
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

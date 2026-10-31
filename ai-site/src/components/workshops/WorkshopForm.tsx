import { useMemo, useRef, useState, type FormEvent } from 'react';

import { Notice } from '@/components/ui/Notice';
import { IconCheck } from '@/components/ui/icons';
import { site } from '@/config/site';
import { trainingCourses } from '@/data/training';
import { workshops } from '@/data/workshops';
import {
  EXPERIENCE_OPTIONS,
  ROLE_OPTIONS,
  hasErrors,
  validateRegistration,
  type FieldErrors,
  type RegistrationInput,
} from '@/lib/validation';

const EMPTY: RegistrationInput = {
  fullName: '',
  email: '',
  whatsapp: '',
  role: '',
  experience: '',
  interest: '',
  message: '',
  consent: false,
};

const LAST_EMAIL_KEY = 'hassan-ai-registration-last-email';

type Phase = 'idle' | 'submitting' | 'unconfigured' | 'failed' | 'success';

function readSession(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Session storage blocked — duplicate guard degrades gracefully.
  }
}

/**
 * Workshop / waitlist registration form.
 *
 * Delivery model (documented in README.md):
 *  - endpoint configured  → JSON POST; success is only claimed after a
 *                           2xx response;
 *  - endpoint missing     → validation runs, then an explicit notice says
 *                           the details were NOT sent (never a fake save).
 */
export function WorkshopForm() {
  const [values, setValues] = useState<RegistrationInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [phase, setPhase] = useState<Phase>('idle');
  const [failureMessage, setFailureMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const endpoint = site.registration.endpoint;
  const configured = endpoint.length > 0;

  const interestGroups = useMemo(
    () => [
      {
        label: 'Workshops',
        options: workshops.map((workshop) => workshop.title),
      },
      {
        label: 'Training courses',
        options: trainingCourses.map((course) => course.title),
      },
      {
        label: 'Waitlist',
        options: ['Future training — general waitlist'],
      },
    ],
    [],
  );

  const setValue = <K extends keyof RegistrationInput>(key: K, value: RegistrationInput[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase === 'submitting') return; // double-submit guard

    const found = validateRegistration(values);
    setErrors(found);
    if (hasErrors(found)) {
      const firstKey = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    const emailKey = values.email.trim().toLowerCase();
    if (readSession(LAST_EMAIL_KEY) === emailKey) {
      setPhase('failed');
      setFailureMessage(
        'This email address was already registered from this browser session. Use “Register someone else” below if that was a different person.',
      );
      return;
    }

    if (!configured) {
      setPhase('unconfigured');
      return;
    }

    setPhase('submitting');
    setFailureMessage('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          source: 'workshop-registration',
          submittedAt: new Date().toISOString(),
          ...values,
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          whatsapp: values.whatsapp.trim(),
          consent: values.consent === true,
        }),
      });

      if (!response.ok) {
        throw new Error(`The form endpoint responded with HTTP ${response.status}.`);
      }

      writeSession(LAST_EMAIL_KEY, emailKey);
      setPhase('success');
    } catch (error) {
      setPhase('failed');
      setFailureMessage(
        error instanceof Error
          ? `Your details were not delivered: ${error.message}`
          : 'Your details were not delivered. Please try again in a moment.',
      );
    }
  };

  /* ---------- Success state (only after a real 2xx delivery) ---------- */
  if (phase === 'success') {
    return (
      <div className="card p-8 text-center md:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
          <IconCheck width={26} height={26} />
        </span>
        <h4 className="mt-5 text-xl font-semibold tracking-tight">
          Your registration was submitted
        </h4>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-bone-dim">
          Thanks, {values.fullName.trim().split(' ')[0]}. Your interest has been sent — workshop
          details (date, time, and format) will be shared at{' '}
          <span className="text-bone">{values.email.trim()}</span> or on WhatsApp when they are
          confirmed.
        </p>
        <button
          type="button"
          className="btn btn-ghost btn-sm mt-6"
          onClick={() => {
            setValues(EMPTY);
            setErrors({});
            setPhase('idle');
          }}
        >
          Register someone else
        </button>
      </div>
    );
  }

  const errorFor = (key: keyof RegistrationInput) => errors[key];
  const describedBy = (key: keyof RegistrationInput) => (errors[key] ? `${key}-error` : undefined);

  return (
    <div>
      {!configured && (
        <Notice tone="warn" className="mb-6">
          <strong className="font-semibold">Registration is not connected yet.</strong> The form
          validates your details, but nothing is delivered until a form endpoint is configured (
          <code className="font-mono text-xs text-accent">VITE_REGISTRATION_ENDPOINT</code> in{' '}
          <code className="font-mono text-xs text-accent">.env.local</code> — see README.md).
          Submissions are never claimed as saved when no endpoint exists.
        </Notice>
      )}

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div>
          <label className="field-label" htmlFor="reg-fullName">
            Full name{' '}
            <span aria-hidden="true" className="text-accent">
              *
            </span>
          </label>
          <input
            id="reg-fullName"
            name="fullName"
            type="text"
            className="field"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errorFor('fullName') ? true : undefined}
            aria-describedby={describedBy('fullName')}
            placeholder="Your full name"
            value={values.fullName}
            onChange={(event) => setValue('fullName', event.target.value)}
          />
          {errors.fullName && (
            <span className="field-error" id="fullName-error">
              {errors.fullName}
            </span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="field-label" htmlFor="reg-email">
            Email address{' '}
            <span aria-hidden="true" className="text-accent">
              *
            </span>
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            className="field"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errorFor('email') ? true : undefined}
            aria-describedby={describedBy('email')}
            placeholder="you@example.com"
            value={values.email}
            onChange={(event) => setValue('email', event.target.value)}
          />
          {errors.email && (
            <span className="field-error" id="email-error">
              {errors.email}
            </span>
          )}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="field-label" htmlFor="reg-whatsapp">
            WhatsApp number{' '}
            <span aria-hidden="true" className="text-accent">
              *
            </span>
          </label>
          <input
            id="reg-whatsapp"
            name="whatsapp"
            type="tel"
            className="field"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-required="true"
            aria-invalid={errorFor('whatsapp') ? true : undefined}
            aria-describedby={describedBy('whatsapp')}
            placeholder="923001234567"
            value={values.whatsapp}
            onChange={(event) => setValue('whatsapp', event.target.value)}
          />
          {errors.whatsapp && (
            <span className="field-error" id="whatsapp-error">
              {errors.whatsapp}
            </span>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="field-label" htmlFor="reg-role">
            Current role{' '}
            <span aria-hidden="true" className="text-accent">
              *
            </span>
          </label>
          <select
            id="reg-role"
            name="role"
            className="field"
            required
            aria-required="true"
            aria-invalid={errorFor('role') ? true : undefined}
            aria-describedby={describedBy('role')}
            value={values.role}
            onChange={(event) => setValue('role', event.target.value)}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.role && (
            <span className="field-error" id="role-error">
              {errors.role}
            </span>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="field-label" htmlFor="reg-experience">
            AI experience level{' '}
            <span aria-hidden="true" className="text-accent">
              *
            </span>
          </label>
          <select
            id="reg-experience"
            name="experience"
            className="field"
            required
            aria-required="true"
            aria-invalid={errorFor('experience') ? true : undefined}
            aria-describedby={describedBy('experience')}
            value={values.experience}
            onChange={(event) => setValue('experience', event.target.value)}
          >
            {EXPERIENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.experience && (
            <span className="field-error" id="experience-error">
              {errors.experience}
            </span>
          )}
        </div>

        {/* Interest */}
        <div>
          <label className="field-label" htmlFor="reg-interest">
            Workshop or training interest{' '}
            <span aria-hidden="true" className="text-accent">
              *
            </span>
          </label>
          <select
            id="reg-interest"
            name="interest"
            className="field"
            required
            aria-required="true"
            aria-invalid={errorFor('interest') ? true : undefined}
            aria-describedby={describedBy('interest')}
            value={values.interest}
            onChange={(event) => setValue('interest', event.target.value)}
          >
            <option value="">Choose what you are interested in</option>
            {interestGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {errors.interest && (
            <span className="field-error" id="interest-error">
              {errors.interest}
            </span>
          )}
        </div>

        {/* Message (optional) */}
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="reg-message">
            Message <span className="font-normal text-bone-faint">(optional)</span>
          </label>
          <textarea
            id="reg-message"
            name="message"
            className="field min-h-28 resize-y"
            placeholder="Anything you would like Hassan to know — questions, goals, or your city."
            value={values.message}
            onChange={(event) => setValue('message', event.target.value)}
          />
        </div>

        {/* Consent */}
        <div className="sm:col-span-2">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-ink-850 p-4">
            <input
              id="reg-consent"
              name="consent"
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 accent-accent"
              required
              aria-required="true"
              aria-invalid={errorFor('consent') ? true : undefined}
              aria-describedby={describedBy('consent')}
              checked={values.consent}
              onChange={(event) => setValue('consent', event.target.checked)}
            />
            <label htmlFor="reg-consent" className="text-sm leading-relaxed text-bone-dim">
              I agree to receive relevant workshop and training updates from Hassan Khan. I can opt
              out at any time, and my details will not be shared.{' '}
              <span aria-hidden="true" className="text-accent">
                *
              </span>
            </label>
          </div>
          {errors.consent && (
            <span className="field-error" id="consent-error">
              {errors.consent}
            </span>
          )}
        </div>

        {/* Status */}
        {phase === 'unconfigured' && (
          <div className="sm:col-span-2">
            <Notice tone="warn" live>
              Your details passed validation but were{' '}
              <strong className="font-semibold">not sent anywhere</strong> — no form endpoint is
              configured yet. Connect{' '}
              <code className="font-mono text-xs text-accent">VITE_REGISTRATION_ENDPOINT</code>{' '}
              (README.md, “Form backend setup”) to start receiving registrations.
            </Notice>
          </div>
        )}

        {phase === 'failed' && (
          <div className="sm:col-span-2">
            <Notice tone="error" live>
              {failureMessage}
            </Notice>
          </div>
        )}

        <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
            disabled={phase === 'submitting'}
          >
            {phase === 'submitting' ? 'Sending…' : 'Register my interest'}
          </button>
          <p className="text-xs leading-relaxed text-bone-faint">
            Fields marked <span className="text-accent">*</span> are required. Free registration for
            launch workshops, waitlist for future training.
          </p>
        </div>
      </form>
    </div>
  );
}

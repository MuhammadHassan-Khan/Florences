import { describe, expect, it } from 'vitest';

import {
  hasErrors,
  isEmail,
  isValidPhone,
  validateRegistration,
  type RegistrationInput,
} from '@/lib/validation';

const valid: RegistrationInput = {
  fullName: 'Test User',
  email: 'user@example.com',
  whatsapp: '923001234567',
  role: 'student',
  experience: 'beginner',
  interest: 'AI Fundamentals',
  message: '',
  consent: true,
};

describe('validateRegistration', () => {
  it('accepts a fully valid submission', () => {
    expect(hasErrors(validateRegistration(valid))).toBe(false);
  });

  it('requires every mandatory field', () => {
    const errors = validateRegistration({
      fullName: '',
      email: '',
      whatsapp: '',
      role: '',
      experience: '',
      interest: '',
      message: '',
      consent: false,
    });

    expect(Object.keys(errors).sort()).toEqual([
      'consent',
      'email',
      'experience',
      'fullName',
      'interest',
      'role',
      'whatsapp',
    ]);
  });

  it('rejects malformed email addresses', () => {
    expect(validateRegistration({ ...valid, email: 'not-an-email' })).toHaveProperty('email');
    expect(validateRegistration({ ...valid, email: 'a@b' })).toHaveProperty('email');
    expect(validateRegistration({ ...valid, email: 'user@example.com' })).not.toHaveProperty(
      'email',
    );
  });

  it('rejects invalid phone numbers but accepts international formats', () => {
    expect(validateRegistration({ ...valid, whatsapp: 'abc' })).toHaveProperty('whatsapp');
    expect(validateRegistration({ ...valid, whatsapp: '12345' })).toHaveProperty('whatsapp');
    expect(validateRegistration({ ...valid, whatsapp: '+92 300 1234567' })).not.toHaveProperty(
      'whatsapp',
    );
    expect(validateRegistration({ ...valid, whatsapp: '(051) 123-4567' })).not.toHaveProperty(
      'whatsapp',
    );
  });

  it('requires consent', () => {
    expect(validateRegistration({ ...valid, consent: false })).toHaveProperty('consent');
  });

  it('treats a message as optional', () => {
    expect(validateRegistration({ ...valid, message: '' })).not.toHaveProperty('message');
  });

  it('flags a name shorter than two characters', () => {
    expect(validateRegistration({ ...valid, fullName: 'A' })).toHaveProperty('fullName');
  });
});

describe('isEmail / isValidPhone', () => {
  it('validates emails', () => {
    expect(isEmail(' a@b.co ')).toBe(true);
    expect(isEmail('a@b')).toBe(false);
    expect(isEmail('a b@c.com')).toBe(false);
  });

  it('validates phone numbers', () => {
    expect(isValidPhone('+92-300-1234567')).toBe(true);
    expect(isValidPhone('000')).toBe(false);
    expect(isValidPhone('')).toBe(false);
  });
});

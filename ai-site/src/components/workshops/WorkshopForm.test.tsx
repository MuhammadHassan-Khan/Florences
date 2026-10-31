import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { WorkshopForm } from '@/components/workshops/WorkshopForm';

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Full name/), 'Test User');
  await user.type(screen.getByLabelText(/^Email address/), 'user@example.com');
  await user.type(screen.getByLabelText(/^WhatsApp number/), '923001234567');
  await user.selectOptions(screen.getByLabelText(/^Current role/), 'student');
  await user.selectOptions(screen.getByLabelText(/^AI experience level/), 'beginner');
  await user.selectOptions(
    screen.getByLabelText(/^Workshop or training interest/),
    'AI Fundamentals',
  );
  await user.click(screen.getByLabelText(/^I agree to receive/));
}

describe('WorkshopForm', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('shows clear validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    render(<WorkshopForm />);

    await user.click(screen.getByRole('button', { name: 'Register my interest' }));

    expect(await screen.findByText('Please enter your full name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your WhatsApp number.')).toBeInTheDocument();
    expect(screen.getByText('Please select your current role.')).toBeInTheDocument();
    expect(
      screen.getByText('Please confirm you agree to receive workshop updates.'),
    ).toBeInTheDocument();

    // Failing fields are marked invalid for assistive technology.
    expect(screen.getByLabelText(/^Full name/)).toHaveAttribute('aria-invalid', 'true');

    // Validation failures never claim delivery or show success.
    expect(screen.queryByText('Your registration was submitted')).not.toBeInTheDocument();
    expect(screen.queryByText(/not sent anywhere/)).not.toBeInTheDocument();
  });

  it('clears a field error as soon as the field is corrected', async () => {
    const user = userEvent.setup();
    render(<WorkshopForm />);

    await user.click(screen.getByRole('button', { name: 'Register my interest' }));
    expect(screen.getByText('Please enter your full name.')).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^Full name/), 'Test User');
    expect(screen.queryByText('Please enter your full name.')).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^Full name/)).not.toHaveAttribute('aria-invalid');
  });

  it('states honestly that nothing was sent when no endpoint is configured', async () => {
    const user = userEvent.setup();
    render(<WorkshopForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Register my interest' }));

    // Explicit non-delivery notice — never a fake success.
    expect(await screen.findByText(/not sent anywhere/)).toBeInTheDocument();
    expect(screen.queryByText('Your registration was submitted')).not.toBeInTheDocument();
  });

  it('warns about the missing endpoint before the form is used', () => {
    render(<WorkshopForm />);
    expect(screen.getByText(/Registration is not connected yet/)).toBeInTheDocument();
  });
});

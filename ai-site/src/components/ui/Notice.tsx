import type { ReactNode } from 'react';

type NoticeProps = {
  tone?: 'info' | 'warn' | 'success' | 'error';
  children: ReactNode;
  /** Announce the message to screen readers when it appears. */
  live?: boolean;
  className?: string;
};

const TONES: Record<NonNullable<NoticeProps['tone']>, string> = {
  info: 'border-accent/30 bg-accent/8 text-bone',
  warn: 'border-amber-400/40 bg-amber-400/8 text-bone',
  success: 'border-success/40 bg-success/8 text-bone',
  error: 'border-danger/50 bg-danger/8 text-bone',
};

const LABELS: Record<NonNullable<NoticeProps['tone']>, string> = {
  info: 'Note',
  warn: 'Heads up',
  success: 'Success',
  error: 'Error',
};

/** Inline status/notice panel used by forms and demo states. */
export function Notice({ tone = 'info', children, live = false, className = '' }: NoticeProps) {
  return (
    <div
      className={`flex gap-3 rounded-xl border px-4 py-3.5 text-sm leading-relaxed ${TONES[tone]} ${className}`.trim()}
      role={live ? 'status' : undefined}
      aria-live={live ? 'polite' : undefined}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-widest opacity-70"
      >
        {LABELS[tone]}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

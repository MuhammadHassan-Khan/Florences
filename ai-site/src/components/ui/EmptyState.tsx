import type { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
};

/** Honest empty/loading/error placeholder panel. */
export function EmptyState({ title, children, action, className = '' }: EmptyStateProps) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-white/15 bg-ink-900/60 px-6 py-10 text-center ${className}`.trim()}
    >
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      {children && (
        <div className="mx-auto mt-2.5 max-w-xl text-sm leading-relaxed text-bone-dim">
          {children}
        </div>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

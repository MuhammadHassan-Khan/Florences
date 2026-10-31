import type { ReactNode } from 'react';

import { Reveal } from '@/components/ui/Reveal';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Extra classes for the inner container (e.g. wider content). */
  containerClassName?: string;
};

/**
 * Consistent section shell: stable container width, mono eyebrow,
 * section heading, optional lead paragraph, then content.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = '',
  containerClassName = '',
}: SectionProps) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className}`}>
      <div className={`container-page ${containerClassName}`}>
        {(eyebrow || title || lead) && (
          <Reveal className="max-w-3xl">
            <header>
              {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
              {title && (
                <h2 className="text-balance text-[clamp(1.75rem,1.35rem+2vw,2.6rem)] font-semibold leading-[1.12] tracking-tight">
                  {title}
                </h2>
              )}
              {lead && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone-dim md:text-lg">
                  {lead}
                </p>
              )}
            </header>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

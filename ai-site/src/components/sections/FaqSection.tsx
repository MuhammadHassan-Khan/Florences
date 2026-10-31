import { useId, useState } from 'react';

import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { IconChevron } from '@/components/ui/icons';
import { faqs } from '@/data/faqs';
import type { Faq } from '@/data/types';

function FaqItem({ faq, defaultOpen }: { faq: Faq; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const buttonId = useId();
  const panelId = useId();

  return (
    <div className="border-b border-white/10">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-5 py-5 text-left transition-colors hover:text-accent"
        >
          <span className="text-base font-medium tracking-tight md:text-[1.05rem]">
            {faq.question}
          </span>
          <IconChevron
            width={17}
            height={17}
            className={`shrink-0 text-accent transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="max-w-3xl pb-6 text-sm leading-relaxed text-bone-dim"
      >
        {faq.answer}
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Honest answers to common questions."
      lead="Straight answers about who this is for, how sessions work, and what is (and is not) available today."
    >
      <Reveal className="mt-10 border-t border-white/10">
        <div>
          {faqs.map((faq, index) => (
            <FaqItem key={faq.question} faq={faq} defaultOpen={index === 0} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

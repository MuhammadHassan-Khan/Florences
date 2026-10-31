import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Notice } from '@/components/ui/Notice';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { IconPlay } from '@/components/ui/icons';
import { site } from '@/config/site';
import { resolveVideoUrl } from '@/lib/video';

/**
 * Video demonstration section.
 *
 * With a configured URL (src/config/site.ts → demoVideo.url) the poster
 * loads the real video lazily on click. With no URL supplied it shows a
 * clearly labelled placeholder plus setup instructions — it never embeds
 * an unrelated or fabricated demonstration video.
 */
export function DemoSection() {
  const [playing, setPlaying] = useState(false);
  const { url, title, description, workflow } = site.demoVideo;
  const resolved = resolveVideoUrl(url);

  const showPlaceholder = !resolved || resolved.kind === 'unsupported';

  return (
    <Section
      id="demo"
      eyebrow="Live demo"
      title="See what you can build with AI."
      lead={description}
      className="border-y border-white/5 bg-ink-900"
    >
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Video panel */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-850">
            {showPlaceholder ? (
              <div className="grid-bg flex aspect-video flex-col items-center justify-center px-6 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/5 text-bone-faint">
                  <IconPlay width={26} height={26} />
                </span>
                <p className="mt-5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  Demo video placeholder
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-bone-dim">
                  Add your demonstration video URL — YouTube, Vimeo, or a direct MP4 — in{' '}
                  <code className="font-mono text-xs text-accent">src/config/site.ts</code> under{' '}
                  <code className="font-mono text-xs text-accent">demoVideo.url</code>. It will
                  appear here with a working play button.
                </p>
                {resolved?.kind === 'unsupported' && (
                  <p className="mt-3 text-xs text-bone-faint">
                    The configured URL is not a supported video source (YouTube, Vimeo, or a direct
                    video file).
                  </p>
                )}
              </div>
            ) : playing && resolved.kind === 'file' ? (
              <video
                className="aspect-video w-full bg-black"
                controls
                autoPlay
                src={resolved.embedUrl}
                title={title}
              />
            ) : playing ? (
              <iframe
                className="aspect-video w-full"
                src={resolved.embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="grid-bg group flex aspect-video w-full flex-col items-center justify-center px-6 text-center transition-colors hover:bg-white/[0.03]"
                aria-label={`Play video: ${title}`}
              >
                <span className="grid h-20 w-20 place-items-center rounded-full border border-accent/60 bg-accent/15 text-accent transition-transform duration-200 group-hover:scale-105 group-hover:bg-accent/25">
                  <IconPlay width={30} height={30} />
                </span>
                <span className="mt-5 max-w-md text-base font-semibold tracking-tight text-bone">
                  {title}
                </span>
                <span className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-bone-faint">
                  Click to play
                </span>
              </button>
            )}

            {/* Always-visible caption bar */}
            <div className="border-t border-white/8 px-5 py-4">
              <p className="text-sm font-medium">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-bone-faint">
                The demonstration follows the same five steps below — a real problem, a real prompt,
                a real result.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Workflow steps */}
        <Reveal delay={90}>
          <div className="rounded-2xl border border-white/10 bg-ink-850 p-6 md:p-7">
            <h3 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-accent">
              The workflow you will see
            </h3>
            <ol className="mt-5 space-y-5">
              {workflow.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="font-mono text-sm font-semibold text-accent">{`0${index + 1}`}</span>
                  <span className="text-sm leading-relaxed text-bone-dim">{step}</span>
                </li>
              ))}
            </ol>

            <Link to="/#training" className="btn btn-primary btn-sm mt-7 w-full">
              Explore related training
            </Link>

            {!resolved && (
              <p className="mt-4 text-center text-[0.72rem] text-bone-faint">
                Related training: Prompt Engineering, Modern AI Tools, AI Automation.
              </p>
            )}
          </div>
        </Reveal>
      </div>

      {!resolved && (
        <Reveal className="mt-8">
          <Notice tone="info">
            No demonstration video has been supplied yet, so none is shown. Add your own recording
            and it appears here — the site will not embed someone else's video as if it were your
            demonstration.
          </Notice>
        </Reveal>
      )}
    </Section>
  );
}

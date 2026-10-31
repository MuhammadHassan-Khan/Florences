import { Link } from 'react-router-dom';

import { FounderPortrait } from '@/components/ui/FounderPortrait';
import { IconPlay } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/config/site';

const HIGHLIGHTS = ['Beginner-friendly', 'Urdu & simple English', 'Real projects, not theory'];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Technical backdrop: grid + a single restrained lime glow */}
      <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-80" />
      <div aria-hidden="true" className="glow-lime absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950"
      />

      <div className="container-page relative flex flex-col justify-center pb-20 pt-32 md:pb-24 md:pt-40 lg:min-h-[94svh] lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
          {/* Left: copy */}
          <div>
            <Reveal>
              <p className="eyebrow">Practical AI education</p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="mt-6 text-balance text-[clamp(2.1rem,1.35rem+3.4vw,3.75rem)] font-semibold leading-[1.07] tracking-tight">
                AI is changing the world. Learn how to use it. Build what comes next.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-bone-dim md:text-lg">
                Learn AI tools, master practical workflows, and build real projects.
                Beginner-friendly training in Urdu and simple English, focused on skills you can
                actually use.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 font-mono text-[0.72rem] uppercase leading-relaxed tracking-[0.16em] text-bone-faint">
                Learn by doing <span className="text-accent">·</span> Build through practice{' '}
                <span className="text-accent">·</span> Solve real problems
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/#training" className="btn btn-primary">
                  Explore AI Training
                </Link>
                <Link to="/#demo" className="btn btn-ghost">
                  <IconPlay width={16} height={16} />
                  Watch a Demo
                </Link>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul
                className="mt-8 flex flex-wrap gap-2.5"
                aria-label="What makes this training different"
              >
                {HIGHLIGHTS.map((highlight) => (
                  <li key={highlight} className="chip">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right: founder portrait — the primary visual element */}
          <Reveal delay={160} className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
            <div className="relative">
              <FounderPortrait className="aspect-4/5 w-full" />

              {/* Instructor card */}
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-ink-950/90 px-4 py-3 backdrop-blur-sm">
                <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  Your instructor
                </p>
                <p className="mt-1 text-sm font-semibold">{site.founder.name}</p>
                <p className="text-xs text-bone-dim">{site.founder.role}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

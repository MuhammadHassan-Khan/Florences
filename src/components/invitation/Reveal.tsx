import { useEffect, useRef, useState, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";

import styles from "./Reveal.module.css";

/**
 * Scroll-reveal wrapper: content fades/slides in once when it enters the
 * viewport. Reduced-motion users and environments without
 * IntersectionObserver see the content immediately — content is never
 * hidden behind an observer that might not fire.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal transition starts. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);

  const supportsObserver =
    typeof window !== "undefined" && "IntersectionObserver" in window;
  // Content is visible immediately when motion is reduced, when no observer
  // is available, or once the observer has fired — never hidden by a missing
  // or unsupported observer.
  const visible = revealed || reducedMotion || !supportsObserver;

  useEffect(() => {
    if (visible || !supportsObserver) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible, supportsObserver]);

  const classes = [styles.reveal, visible ? styles.visible : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classes}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

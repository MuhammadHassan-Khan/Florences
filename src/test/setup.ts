import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";

// React Testing Library's automatic cleanup only registers when Vitest
// globals are enabled; this project imports test APIs explicitly, so
// cleanup is wired up manually to avoid renders accumulating across tests.
afterEach(() => {
  cleanup();
});

/**
 * jsdom does not implement matchMedia. Reduced-motion checks and any
 * `prefers-reduced-motion` listeners rely on this stub.
 */
if (!window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

/**
 * jsdom does not implement IntersectionObserver. Scroll-reveal content
 * would otherwise never appear in tests, so a minimal observer that
 * reports "intersecting" immediately is provided when missing.
 */
if (typeof window.IntersectionObserver === "undefined") {
  class ImmediateIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds = [0];
    readonly scrollMargin = "0px";
    private readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    observe(target: Element): void {
      this.callback(
        [{ isIntersecting: true, intersectionRatio: 1, target } as IntersectionObserverEntry],
        this,
      );
    }

    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    writable: true,
    value: ImmediateIntersectionObserver,
  });
}

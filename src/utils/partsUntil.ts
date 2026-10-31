export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Breaks the time between `now` and `target` into day/hour/minute/second
 * parts. Returns `null` for an unparsable target (renders nothing rather
 * than misleading values) and all zeros once the target has passed.
 */
export function partsUntil(target: string, now: Date): CountdownParts | null {
  const targetTime = new Date(target).getTime();
  if (Number.isNaN(targetTime)) return null;
  const diff = targetTime - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
  };
}

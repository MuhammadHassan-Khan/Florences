/** Builds a Google Maps search URL for a free-text venue. */
export function buildMapUrl(venue: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;
}

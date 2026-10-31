import type { ProductPrice } from '@/data/types';

/**
 * Price display helpers.
 *
 * Example prices are clearly labelled as examples by the calling UI;
 * `null` prices render as an explicit "to be announced" placeholder.
 */
export function formatPrice(price: ProductPrice | null): string {
  if (!price) return 'Price: to be announced';
  return `${price.currency} ${price.amount.toLocaleString('en-PK')}`;
}

/** Compact form used inside the cart rows (never claims a real price). */
export function formatLinePrice(price: ProductPrice | null, quantity: number): string | null {
  if (!price) return null;
  return `${price.currency} ${(price.amount * quantity).toLocaleString('en-PK')}`;
}

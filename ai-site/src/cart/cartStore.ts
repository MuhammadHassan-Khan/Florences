import { getProduct } from '@/data/products';
import type { Product } from '@/data/types';

export const CART_STORAGE_KEY = 'hassan-ai-cart-v1';
export const MAX_QUANTITY = 99;

export type CartLine = {
  slug: string;
  quantity: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  /** null when the product has no price yet (excluded from subtotal). */
  lineTotal: number | null;
};

/* ------------------------------------------------------------------ */
/* Pure helpers (unit-tested)                                          */
/* ------------------------------------------------------------------ */

export function addLine(lines: CartLine[], slug: string): CartLine[] {
  if (!getProduct(slug)) return lines;
  const existing = lines.find((line) => line.slug === slug);
  if (existing) {
    return lines.map((line) =>
      line.slug === slug ? { ...line, quantity: Math.min(line.quantity + 1, MAX_QUANTITY) } : line,
    );
  }
  return [...lines, { slug, quantity: 1 }];
}

export function setLineQuantity(lines: CartLine[], slug: string, quantity: number): CartLine[] {
  if (quantity <= 0) return removeLine(lines, slug);
  const clamped = Math.min(quantity, MAX_QUANTITY);
  return lines.map((line) => (line.slug === slug ? { ...line, quantity: clamped } : line));
}

export function removeLine(lines: CartLine[], slug: string): CartLine[] {
  return lines.filter((line) => line.slug !== slug);
}

/** Drops lines whose product no longer exists (e.g. stale storage). */
export function sanitizeLines(lines: CartLine[]): CartLine[] {
  return lines.filter(
    (line) =>
      typeof line.slug === 'string' &&
      Number.isFinite(line.quantity) &&
      line.quantity > 0 &&
      getProduct(line.slug),
  );
}

export function countItems(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

export function buildItems(lines: CartLine[]): CartItem[] {
  const items: CartItem[] = [];
  for (const line of lines) {
    const product = getProduct(line.slug);
    if (!product) continue;
    items.push({
      product,
      quantity: line.quantity,
      lineTotal: product.price ? product.price.amount * line.quantity : null,
    });
  }
  return items;
}

/** Sum of all known prices. Items without a price are excluded. */
export function subtotalOf(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.lineTotal ?? 0), 0);
}

export function hasUnpricedItems(items: CartItem[]): boolean {
  return items.some((item) => item.lineTotal === null);
}

/* ------------------------------------------------------------------ */
/* Storage (never throws — private browsing can block localStorage)     */
/* ------------------------------------------------------------------ */

export function loadLines(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const lines = parsed
      .filter(
        (entry): entry is CartLine =>
          Boolean(entry) &&
          typeof (entry as CartLine).slug === 'string' &&
          typeof (entry as CartLine).quantity === 'number',
      )
      .map((entry) => ({
        slug: entry.slug,
        quantity: Math.min(Math.round(entry.quantity), MAX_QUANTITY),
      }));
    return sanitizeLines(lines);
  } catch {
    return [];
  }
}

export function saveLines(lines: CartLine[]): void {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage unavailable — cart still works for the current session.
  }
}

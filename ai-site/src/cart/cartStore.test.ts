import { beforeEach, describe, expect, it } from 'vitest';

import {
  CART_STORAGE_KEY,
  MAX_QUANTITY,
  addLine,
  buildItems,
  countItems,
  hasUnpricedItems,
  loadLines,
  removeLine,
  sanitizeLines,
  saveLines,
  setLineQuantity,
  subtotalOf,
  type CartLine,
} from '@/cart/cartStore';

// Example products from src/data/products.ts
const PRICED = 'ultimate-prompt-library'; // PKR 1,500
const UNPRICED = 'student-learning-resources'; // price: null

describe('cart line operations', () => {
  it('adds a new line with quantity 1', () => {
    expect(addLine([], PRICED)).toEqual([{ slug: PRICED, quantity: 1 }]);
  });

  it('increments an existing line and caps at MAX_QUANTITY', () => {
    let lines: CartLine[] = [{ slug: PRICED, quantity: MAX_QUANTITY }];
    lines = addLine(lines, PRICED);
    expect(lines[0].quantity).toBe(MAX_QUANTITY);
    lines = setLineQuantity(lines, PRICED, MAX_QUANTITY + 50);
    expect(lines[0].quantity).toBe(MAX_QUANTITY);
  });

  it('ignores unknown product slugs', () => {
    expect(addLine([], 'does-not-exist')).toEqual([]);
  });

  it('removes a line when quantity drops to zero', () => {
    const start: CartLine[] = [{ slug: PRICED, quantity: 2 }];
    expect(setLineQuantity(start, PRICED, 0)).toEqual([]);
    expect(removeLine(start, PRICED)).toEqual([]);
  });

  it('sanitises stale or corrupt lines', () => {
    const dirty: CartLine[] = [
      { slug: PRICED, quantity: 2 },
      { slug: 'ghost-product', quantity: 1 },
      { slug: UNPRICED, quantity: 0 },
    ];
    expect(sanitizeLines(dirty)).toEqual([{ slug: PRICED, quantity: 2 }]);
  });
});

describe('cart totals', () => {
  it('counts units across lines', () => {
    expect(
      countItems([
        { slug: PRICED, quantity: 3 },
        { slug: UNPRICED, quantity: 2 },
      ]),
    ).toBe(5);
  });

  it('sums only known prices and reports unpriced items', () => {
    const items = buildItems([
      { slug: PRICED, quantity: 2 }, // 1,500 × 2
      { slug: UNPRICED, quantity: 1 }, // price: null
    ]);

    expect(items).toHaveLength(2);
    expect(subtotalOf(items)).toBe(3000);
    expect(hasUnpricedItems(items)).toBe(true);
  });

  it('returns zero subtotal for priced-only carts without unpriced flags', () => {
    const items = buildItems([{ slug: PRICED, quantity: 1 }]);
    expect(hasUnpricedItems(items)).toBe(false);
  });

  it('skips unknown slugs when building items', () => {
    expect(buildItems([{ slug: 'ghost', quantity: 4 }])).toEqual([]);
  });
});

describe('cart persistence', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('round-trips lines through localStorage', () => {
    const lines: CartLine[] = [{ slug: PRICED, quantity: 2 }];
    saveLines(lines);
    expect(loadLines()).toEqual(lines);
  });

  it('returns an empty cart for missing, corrupt, or non-array storage', () => {
    expect(loadLines()).toEqual([]);
    window.localStorage.setItem(CART_STORAGE_KEY, 'not-json{');
    expect(loadLines()).toEqual([]);
    window.localStorage.setItem(CART_STORAGE_KEY, '{"hello":1}');
    expect(loadLines()).toEqual([]);
  });
});

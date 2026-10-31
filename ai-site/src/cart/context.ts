import { createContext } from 'react';

import type { CartItem, CartLine } from './cartStore';

export type CartContextValue = {
  lines: CartLine[];
  items: CartItem[];
  /** Total number of units across all lines. */
  count: number;
  /** Sum of example prices; excludes items without a price. */
  subtotal: number;
  /** True when at least one cart item has no price yet. */
  hasUnpricedItems: boolean;
  add: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

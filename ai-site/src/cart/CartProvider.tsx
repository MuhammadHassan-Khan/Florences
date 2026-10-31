import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { CartContext } from './context';
import {
  addLine,
  buildItems,
  countItems,
  hasUnpricedItems,
  loadLines,
  removeLine,
  saveLines,
  setLineQuantity,
  subtotalOf,
  type CartLine,
} from './cartStore';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => loadLines());

  // Persist on every change (loadLines/saveLines already fail safe).
  useEffect(() => {
    saveLines(lines);
  }, [lines]);

  const add = useCallback((slug: string) => {
    setLines((current) => addLine(current, slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((current) => setLineQuantity(current, slug, quantity));
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((current) => removeLine(current, slug));
  }, []);

  const clear = useCallback(() => {
    setLines([]);
  }, []);

  const value = useMemo(() => {
    const items = buildItems(lines);
    return {
      lines,
      items,
      count: countItems(lines),
      subtotal: subtotalOf(items),
      hasUnpricedItems: hasUnpricedItems(items),
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [lines, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

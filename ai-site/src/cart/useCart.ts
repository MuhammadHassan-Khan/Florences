import { useContext } from 'react';

import { CartContext, type CartContextValue } from './context';

/** Access cart state. Must be used inside `<CartProvider>`. */
export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error('useCart must be used within <CartProvider>');
  }
  return value;
}

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '@/cart/useCart';
import { EmptyState } from '@/components/ui/EmptyState';
import { Notice } from '@/components/ui/Notice';
import { ProductCover } from '@/components/ui/ProductCover';
import { IconMinus, IconPlus, IconCart } from '@/components/ui/icons';
import { site } from '@/config/site';
import { formatLinePrice, formatPrice } from '@/lib/format';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { MAX_QUANTITY } from '@/cart/cartStore';

export function CartPage() {
  const { items, subtotal, count, hasUnpricedItems, setQuantity, remove, clear } = useCart();
  const [showCheckoutNotice, setShowCheckoutNotice] = useState(false);
  const checkoutConfigured = site.checkout.url.length > 0;

  useDocumentTitle(`Cart${count > 0 ? ` (${count})` : ''} | ${site.brand.name}`);

  /* ------------------------------ Empty state ------------------------------ */
  if (items.length === 0) {
    return (
      <div className="container-page pb-24 pt-40">
        <h1 className="mb-8 text-[clamp(1.75rem,1.4rem+2vw,2.5rem)] font-semibold tracking-tight">
          Your cart
        </h1>
        <EmptyState
          title="Your cart is empty"
          action={
            <Link to="/#products" className="btn btn-primary btn-sm">
              Browse digital products
            </Link>
          }
        >
          Add a product from the shop and it will appear here. The cart is saved in this browser
          only — nothing is ordered or charged.
        </EmptyState>
      </div>
    );
  }

  /* -------------------------------- Filled -------------------------------- */
  const handleCheckout = () => {
    if (checkoutConfigured) {
      window.open(site.checkout.url, '_blank', 'noopener,noreferrer');
      return;
    }
    setShowCheckoutNotice(true);
  };

  return (
    <div className="container-page pb-24 pt-32 md:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-4">Digital products</p>
          <h1 className="text-[clamp(1.75rem,1.4rem+2vw,2.5rem)] font-semibold tracking-tight">
            Your cart
          </h1>
        </div>
        <button type="button" onClick={clear} className="btn btn-ghost btn-sm">
          Clear cart
        </button>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
        {/* Line items */}
        <ul className="space-y-4">
          {items.map(({ product, quantity, lineTotal }) => (
            <li key={product.slug} className="card p-4 md:p-5">
              <div className="flex gap-4">
                <Link
                  to={`/products/${product.slug}`}
                  className="w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:w-36"
                  aria-label={`View details for ${product.name}`}
                >
                  <div className="[&>div]:aspect-[16/10] [&>div]:rounded-none [&>div]:border-b-0">
                    <ProductCover product={product} />
                  </div>
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold leading-snug tracking-tight">
                        <Link
                          to={`/products/${product.slug}`}
                          className="transition-colors hover:text-accent"
                        >
                          {product.name}
                        </Link>
                      </h2>
                      <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-bone-faint">
                        {product.category}
                        {product.isExample && <span className="text-accent"> · example</span>}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold">
                      {lineTotal !== null
                        ? formatLinePrice(product.price, quantity)
                        : formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 rounded-full border border-white/15 p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.slug, quantity - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="grid h-8 w-8 place-items-center rounded-full text-bone-dim transition-colors hover:bg-white/5 hover:text-bone"
                      >
                        <IconMinus width={14} height={14} />
                      </button>
                      <span
                        aria-live="polite"
                        className="min-w-8 text-center font-mono text-sm font-semibold"
                        aria-label={`Quantity of ${product.name}: ${quantity}`}
                      >
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.slug, quantity + 1)}
                        disabled={quantity >= MAX_QUANTITY}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="grid h-8 w-8 place-items-center rounded-full text-bone-dim transition-colors hover:bg-white/5 hover:text-bone disabled:opacity-40"
                      >
                        <IconPlus width={14} height={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(product.slug)}
                      className="text-xs font-medium text-bone-faint underline-offset-4 transition-colors hover:text-danger hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside aria-label="Order summary" className="lg:sticky lg:top-28 lg:self-start">
          <div className="card p-6">
            <h2 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Order summary
            </h2>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-bone-dim">Items</dt>
                <dd className="font-semibold">{count}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-white/8 pt-3">
                <dt className="text-bone-dim">Subtotal (example prices)</dt>
                <dd className="font-semibold">PKR {subtotal.toLocaleString('en-PK')}</dd>
              </div>
            </dl>

            {hasUnpricedItems && (
              <p className="mt-3 text-xs leading-relaxed text-bone-faint">
                Items marked “price to be announced” are not included in the subtotal yet.
              </p>
            )}

            <button type="button" onClick={handleCheckout} className="btn btn-primary mt-6 w-full">
              <IconCart width={16} height={16} />
              {checkoutConfigured ? 'Continue to checkout' : 'Checkout'}
            </button>

            {showCheckoutNotice && (
              <Notice tone="warn" live className="mt-4">
                {checkoutConfigured ? (
                  'Checkout would open in a new tab.'
                ) : (
                  <>
                    <strong className="font-semibold">
                      Demo storefront — checkout is not connected.
                    </strong>{' '}
                    No payment is taken and no order is placed. To enable checkout, set{' '}
                    <code className="font-mono text-xs text-accent">VITE_CHECKOUT_URL</code> to your
                    payment provider link (README.md, “Payments”).
                  </>
                )}
              </Notice>
            )}

            <p className="mt-4 text-xs leading-relaxed text-bone-faint">
              Your cart is stored locally in this browser. Products are labelled examples and are
              not for sale yet.
            </p>

            <Link to="/#products" className="btn btn-ghost btn-sm mt-5 w-full">
              Continue browsing
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

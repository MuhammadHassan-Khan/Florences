import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '@/cart/useCart';
import { ProductCover } from '@/components/ui/ProductCover';
import { IconCheck } from '@/components/ui/icons';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/data/types';

/**
 * Product card for the demo storefront. Adding to cart is a real local
 * action (persisted in the browser); no purchase is implied anywhere.
 */
export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleAdd = () => {
    add(product.slug);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2200);
  };

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <Link
        to={`/products/${product.slug}`}
        className="block"
        aria-label={`View details for ${product.name}`}
      >
        <ProductCover product={product} />
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip">{product.category}</span>
          {product.isExample && <span className="badge-example">Example</span>}
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
          <Link to={`/products/${product.slug}`} className="transition-colors hover:text-accent">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-bone-dim">{product.description}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="min-w-0">
            <span
              className={`block text-base font-semibold ${product.price ? '' : 'text-bone-faint'}`}
            >
              {formatPrice(product.price)}
            </span>
            {product.price?.isExample && (
              <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone-faint">
                example price
              </span>
            )}
          </p>
        </div>

        <div className="mt-4 flex gap-2.5">
          <Link to={`/products/${product.slug}`} className="btn btn-ghost btn-sm flex-1">
            Details
          </Link>
          <button type="button" onClick={handleAdd} className="btn btn-primary btn-sm flex-1">
            {added ? (
              <>
                <IconCheck width={14} height={14} /> Added
              </>
            ) : (
              'Add to cart'
            )}
          </button>
        </div>

        <span role="status" className="sr-only">
          {added ? `${product.name} added to cart` : ''}
        </span>
      </div>
    </article>
  );
}

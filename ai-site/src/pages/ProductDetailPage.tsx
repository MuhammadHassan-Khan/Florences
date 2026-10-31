import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useCart } from '@/cart/useCart';
import { EmptyState } from '@/components/ui/EmptyState';
import { Notice } from '@/components/ui/Notice';
import { ProductCover } from '@/components/ui/ProductCover';
import { IconArrow, IconCart, IconCheck } from '@/components/ui/icons';
import { site } from '@/config/site';
import { getProduct } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function ProductDetailPage() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useDocumentTitle(
    product
      ? `${product.name} — Digital Products | ${site.brand.name}`
      : `Product not found | ${site.brand.name}`,
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  if (!product) {
    return (
      <div className="container-page pb-24 pt-40">
        <EmptyState
          title="Product not found"
          action={
            <Link to="/#products" className="btn btn-primary btn-sm">
              Browse the shop
            </Link>
          }
        >
          There is no product with this address. It may have been renamed, or the link may be wrong.
        </EmptyState>
      </div>
    );
  }

  const handleAdd = () => {
    add(product.slug);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="container-page pb-24 pt-32 md:pt-40">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone-faint"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/#home" className="transition-colors hover:text-accent">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/#products" className="transition-colors hover:text-accent">
              Digital products
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-bone-dim">{product.name}</li>
        </ol>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        {/* Cover */}
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="[&>div]:aspect-[4/3] [&>div]:rounded-none [&>div]:border-b-0">
            <ProductCover product={product} />
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">{product.category}</span>
            {product.isExample && <span className="badge-example">Example product</span>}
          </div>

          <h1 className="mt-4 text-balance text-[clamp(1.75rem,1.4rem+2vw,2.5rem)] font-semibold leading-tight tracking-tight">
            {product.name}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-bone-dim md:text-lg">
            {product.details}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-ink-850 px-5 py-4">
            <p className={`text-xl font-semibold ${product.price ? '' : 'text-bone-faint'}`}>
              {formatPrice(product.price)}
            </p>
            {product.price?.isExample && <span className="badge-example">Example price</span>}
            <span className="ml-auto text-xs text-bone-faint">
              {product.price ? 'Not charged — payments not configured' : 'To be announced'}
            </span>
          </div>

          <div className="mt-7">
            <h2 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
              What is included
            </h2>
            <ul className="mt-4 space-y-2.5">
              {product.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-bone-dim">
                  <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={handleAdd} className="btn btn-primary">
              {added ? (
                <>
                  <IconCheck width={16} height={16} /> Added to cart
                </>
              ) : (
                <>
                  <IconCart width={16} height={16} /> Add to cart
                </>
              )}
            </button>
            <Link to="/cart" className="btn btn-ghost">
              View cart
            </Link>
            <Link to="/#products" className="btn btn-ghost">
              <IconArrow width={15} height={15} />
              Back to shop
            </Link>
          </div>

          <span role="status" className="sr-only">
            {added ? `${product.name} added to cart` : ''}
          </span>

          {product.isExample && (
            <Notice tone="warn" className="mt-7">
              <strong className="font-semibold">Example listing.</strong> This is sample content
              that demonstrates the storefront. It is not a real product for sale — connect a
              payment provider and publish real products before taking orders (README.md,
              “Payments”).
            </Notice>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';

import { useCart } from '@/cart/useCart';
import { Notice } from '@/components/ui/Notice';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { ProductCard } from '@/components/products/ProductCard';
import { IconCart } from '@/components/ui/icons';
import { products } from '@/data/products';

export function ProductsSection() {
  const { count } = useCart();

  return (
    <Section
      id="products"
      eyebrow="Digital products"
      title="Tools and templates for practical AI work."
      lead="Prompt libraries, workflow templates, guides, and starter kits — built around the same idea as the training: practical, editable, and made to be used."
    >
      <Reveal className="mt-8">
        <Notice tone="info">
          <strong className="font-semibold">Demo storefront.</strong> The products below are
          clearly-labelled examples — they are not for sale yet. You can browse details and try the
          cart, but checkout stays disabled until a real payment provider is connected (README.md,
          “Payments”).
        </Notice>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.slug} delay={(index % 3) * 80}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-ink-850 px-6 py-5 sm:flex-row sm:items-center">
          <p className="text-sm text-bone-dim">
            {count > 0 ? (
              <>
                You have <span className="font-semibold text-bone">{count}</span>{' '}
                {count === 1 ? 'item' : 'items'} in your cart.
              </>
            ) : (
              'Your cart is empty — add a product to see how checkout will work.'
            )}
          </p>
          <Link to="/cart" className="btn btn-ghost btn-sm">
            <IconCart width={15} height={15} />
            Open cart
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}

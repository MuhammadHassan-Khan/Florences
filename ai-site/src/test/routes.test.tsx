import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { routes } from '@/app/router';

function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

describe('routes', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('renders the home page with the hero headline, nav, and CTAs', async () => {
    renderRoute('/');

    expect(
      await screen.findByRole('heading', { level: 1, name: /AI is changing the world/ }),
    ).toBeInTheDocument();

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Explore AI Training' })[0]).toHaveAttribute(
      'href',
      '/#training',
    );
    expect(screen.getAllByRole('link', { name: /Watch a Demo/ })[0]).toHaveAttribute(
      'href',
      '/#demo',
    );
    expect(screen.getAllByRole('link', { name: 'Join a Workshop' }).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('heading', { level: 2, name: /Learn AI by building with it/ }),
    ).toBeInTheDocument();
    expect(document.title).toContain('Practical AI Education');
  });

  it('renders the cart empty state', async () => {
    renderRoute('/cart');
    expect(await screen.findByRole('heading', { level: 1, name: 'Your cart' })).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders a product detail page for a known product', async () => {
    renderRoute('/products/ultimate-prompt-library');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Ultimate Prompt Library' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
    expect(screen.getByText(/Example listing/)).toBeInTheDocument();
  });

  it('falls back friendly for an unknown product slug', async () => {
    renderRoute('/products/does-not-exist');
    expect(await screen.findByRole('heading', { name: 'Product not found' })).toBeInTheDocument();
  });

  it('renders the privacy page', async () => {
    renderRoute('/privacy');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Privacy policy' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Draft policy for review/)).toBeInTheDocument();
  });

  it('renders a friendly not-found page for unknown routes', async () => {
    renderRoute('/definitely/not/a/page');
    expect(
      await screen.findByRole('heading', { level: 1, name: /This page does not exist/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/#home');
  });
});

import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { SiteLayout } from '@/components/layout/SiteLayout';
import { CartPage } from '@/pages/CartPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { TermsPage } from '@/pages/TermsPage';

/**
 * Central route model.
 *  /                    → one-page site with anchored sections (/#section)
 *  /products/:slug      → product detail (friendly fallback for unknown slugs)
 *  /cart                → cart with empty / filled / demo-checkout states
 *  /privacy, /terms     → honest draft legal pages
 *  anything else        → friendly not-found page
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products/:slug', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export function createAppRouter() {
  return createBrowserRouter(routes);
}

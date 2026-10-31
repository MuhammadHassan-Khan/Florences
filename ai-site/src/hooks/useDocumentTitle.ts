import { useEffect } from 'react';

/** Sets `document.title` for the current page (SSR-safe no-op on server). */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

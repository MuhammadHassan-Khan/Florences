/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Form backend endpoint for the workshop registration form (optional). */
  readonly VITE_REGISTRATION_ENDPOINT?: string;
  /** Real checkout/payment URL handed off from the cart (optional). */
  readonly VITE_CHECKOUT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import '@testing-library/jest-dom/vitest';

/* JSDOM does not implement window.matchMedia — provide a stub that simulates
   a desktop-sized viewport (all min-width queries match). */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});


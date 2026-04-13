import { createContext, useContext, type ReactNode } from 'react';
import type { BannerLabels, DialogLabels, NotificationPopupLabels, TableLabels } from '../labels';

/* -------------------------------------------------------------------------- */
/*  Public types                                                               */
/* -------------------------------------------------------------------------- */

/** All per-component string overrides accepted by {@link ComponentLibraryProvider}. */
export interface ComponentLibraryStrings {
  /** Overrides for {@link Dialog} strings. */
  dialog?: DialogLabels;
  /** Overrides for {@link Banner} strings. */
  banner?: BannerLabels;
  /** Overrides for {@link NotificationPopup} strings. */
  notificationPopup?: NotificationPopupLabels;
  /** Overrides for {@link Table} strings. */
  table?: TableLabels;
}

export interface ComponentLibraryProviderProps {
  /**
   * Per-component string overrides. Pass translated values from your own i18n
   * solution — the library itself has no i18n runtime dependency.
   */
  strings?: ComponentLibraryStrings;
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

const ComponentLibraryContext = createContext<ComponentLibraryStrings>({});

/* -------------------------------------------------------------------------- */
/*  Provider                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Optional root-level provider that sets default translated strings for **all**
 * component-library components in the subtree.
 *
 * **Merge order (last wins):**
 * built-in English defaults → `<ComponentLibraryProvider strings>` → per-instance `labels` prop
 *
 * The library has no i18n runtime dependency. Wire in `react-i18next`, `react-intl`,
 * `lingui`, or any other solution and pass the resolved strings here.
 *
 * @example
 * ```tsx
 * // app/root.tsx — wire your i18n solution once at the app root
 * import { useTranslation } from 'react-i18next';
 * import { ComponentLibraryProvider } from '@pigna/component-library';
 *
 * function Root() {
 *   const { t } = useTranslation('components');
 *   return (
 *     <ComponentLibraryProvider
 *       strings={{
 *         table: {
 *           noData: t('table.noData'),
 *           clearSearch: t('table.clearSearch'),
 *           showingRange: (s, e, n) => t('table.showingRange', { start: s, end: e, total: n }),
 *         },
 *         dialog: { closeButtonAriaLabel: t('dialog.close') },
 *         banner: { dismissAriaLabel: t('banner.dismiss') },
 *         notificationPopup: { dismissAriaLabel: t('notification.dismiss') },
 *       }}
 *     >
 *       <App />
 *     </ComponentLibraryProvider>
 *   );
 * }
 * ```
 */
export function ComponentLibraryProvider({
  strings = {},
  children,
}: ComponentLibraryProviderProps) {
  return (
    <ComponentLibraryContext value={strings}>
      {children}
    </ComponentLibraryContext>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hook                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Returns the current library-wide string overrides set by the nearest
 * {@link ComponentLibraryProvider}.
 *
 * Used internally by components — consumers rarely need to call this directly.
 */
export function useComponentLibraryStrings(): ComponentLibraryStrings {
  return useContext(ComponentLibraryContext);
}



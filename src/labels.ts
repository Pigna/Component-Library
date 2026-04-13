/**
 * Localization interfaces for @pigna/component-library components.
 *
 * Each interface lists every translatable string for one component. All fields
 * are optional — omitting a field falls back to the built-in English default.
 *
 * Pass overrides either per-instance via the component's `labels` prop, or
 * app-wide via `<ComponentLibraryProvider strings={…}>`.
 *
 * @example
 * ```ts
 * import type { TableLabels } from '@pigna/component-library';
 *
 * const tableLabels: TableLabels = {
 *   noData: t('table.noData'),
 *   showingRange: (s, e, n) => t('table.showingRange', { start: s, end: e, total: n }),
 * };
 * ```
 */

/* -------------------------------------------------------------------------- */
/*  Dialog                                                                     */
/* -------------------------------------------------------------------------- */

/** Translatable strings for the {@link Dialog} component. */
export interface DialogLabels {
  /** `aria-label` for the internal close (×) button.
   * @default "Close dialog" */
  closeButtonAriaLabel?: string;
}

/* -------------------------------------------------------------------------- */
/*  Banner                                                                     */
/* -------------------------------------------------------------------------- */

/** Translatable strings for the {@link Banner} component. */
export interface BannerLabels {
  /** `aria-label` for the dismiss (×) button shown when `dismissible` is true.
   * @default "Dismiss banner" */
  dismissAriaLabel?: string;
}

/* -------------------------------------------------------------------------- */
/*  NotificationPopup                                                          */
/* -------------------------------------------------------------------------- */

/** Translatable strings for the {@link NotificationPopup} component. */
export interface NotificationPopupLabels {
  /** `aria-label` for the dismiss (×) button.
   * @default "Dismiss notification" */
  dismissAriaLabel?: string;
}

/* -------------------------------------------------------------------------- */
/*  Table                                                                      */
/* -------------------------------------------------------------------------- */

/** Translatable strings for the {@link Table} component. */
export interface TableLabels {
  /** `aria-label` on the search `<input>`.
   * @default "Search table" */
  searchAriaLabel?: string;

  /** `aria-label` on the pagination `<nav>` element.
   * @default "Table pagination" */
  paginationAriaLabel?: string;

  /** Visible text inside the "Previous page" button.
   * @default "Previous" */
  previousPageText?: string;

  /** `aria-label` on the "Previous page" button.
   * @default "Previous page" */
  previousPageAriaLabel?: string;

  /** Visible text inside the "Next page" button.
   * @default "Next" */
  nextPageText?: string;

  /** `aria-label` on the "Next page" button.
   * @default "Next page" */
  nextPageAriaLabel?: string;

  /** Returns the `aria-label` for a sortable column's sort button.
   * Receives the column's `label` string.
   * @default (col) => `Sort by ${col}` */
  sortByAriaLabel?: (columnLabel: string) => string;

  /** Returns the `aria-label` for a resizable column's resize handle.
   * Receives the column's `label` string.
   * @default (col) => `Resize ${col} column` */
  resizeColumnAriaLabel?: (columnLabel: string) => string;

  /** Visible result count shown in the toolbar and screen-reader announcement
   * after a search. Receives the number of matching rows.
   * @default (n) => `${n} result${n !== 1 ? 's' : ''}` */
  resultCount?: (count: number) => string;

  /** Screen-reader announcement after search updates, read from the live region.
   * Receives the number of matching rows.
   * @default (n) => `${n} result${n !== 1 ? 's' : ''} found` */
  resultsFound?: (count: number) => string;

  /** Screen-reader announcement when a row becomes selected.
   * @default "Row selected" */
  rowSelected?: string;

  /** Screen-reader announcement when row selection is cleared.
   * @default "Selection cleared" */
  selectionCleared?: string;

  /** Screen-reader announcement when the search field is cleared.
   * @default "Search cleared" */
  searchCleared?: string;

  /** Empty-state message shown when no rows match the current search query.
   * Receives the current query string.
   * @default (q) => `No results for \u201c${q}\u201d.` */
  noResults?: (query: string) => string;

  /** Label for the "Clear search" button inside the no-results empty state.
   * @default "Clear search" */
  clearSearch?: string;

  /** Empty-state message shown when the table has no rows and no active search.
   * @default "No data found." */
  noData?: string;

  /** Pagination range summary rendered between the Previous / Next buttons.
   * Receives the first visible row number, the last visible row number, and
   * the total filtered row count.
   * @default (start, end, total) => `Showing ${start}\u2013${end} of ${total}` */
  showingRange?: (start: number, end: number, total: number) => string;

  /** Page indicator rendered between the Previous / Next buttons.
   * Receives the current 1-based page number and the total page count.
   * @default (page, total) => `Page ${page} of ${total}` */
  pageOf?: (page: number, total: number) => string;
}



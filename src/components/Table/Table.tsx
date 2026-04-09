import {
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  type CSSProperties,
  type KeyboardEvent,
  useState,
  useMemo,
  useCallback,
  useId,
} from 'react';
import styles from './Table.module.scss';

/* ---- SVG Icons ---- */

function SortNeutralIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="10" height="12" viewBox="0 0 10 12" fill="none">
      <path d="M5 1L2 4.5H8L5 1Z" fill="currentColor" opacity="0.4" />
      <path d="M5 11L8 7.5H2L5 11Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function SortAscIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="10" height="12" viewBox="0 0 10 12" fill="none">
      <path d="M5 1L2 4.5H8L5 1Z" fill="currentColor" />
      <path d="M5 11L8 7.5H2L5 11Z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function SortDescIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="10" height="12" viewBox="0 0 10 12" fill="none">
      <path d="M5 1L2 4.5H8L5 1Z" fill="currentColor" opacity="0.3" />
      <path d="M5 11L8 7.5H2L5 11Z" fill="currentColor" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---- Types ---- */

export type SortDirection = 'asc' | 'desc' | 'none';

export interface TableColumn<T = Record<string, unknown>> {
  /** Unique key matching a property on data rows. */
  key: string;
  /** Column header label. */
  label: string;
  /** Enable sorting on this column. */
  sortable?: boolean;
  /** Enable resizing on this column. */
  resizable?: boolean;
  /** Custom cell renderer. */
  render?: (value: unknown, row: T) => ReactNode;
  /** Initial width (CSS value). */
  width?: string;
}

export interface TableProps<T = Record<string, unknown>> extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container. */
  ref?: Ref<HTMLDivElement>;
  /** Column definitions. */
  columns: TableColumn<T>[];
  /** Data rows. Each row must have properties matching column `key`s. */
  data: T[];
  /** Enable row striping via colored odd/even rows. */
  stripedRows?: boolean;
  /** Enable column striping via colored odd/even columns. */
  stripedColumns?: boolean;
  /** Enable text filtering/search. */
  searchable?: boolean;
  /** Placeholder for the search field. */
  searchPlaceholder?: string;
  /** Enable pagination. */
  paginated?: boolean;
  /** Rows per page (when paginated). */
  pageSize?: number;
  /** Custom table color accent. */
  accentColor?: string;
  /** Custom header background color. */
  headerColor?: string;
  /** Custom header text color. */
  headerTextColor?: string;
  /** Enable row selection via click or keyboard (Enter/Space). Selected row is toggled; Escape clears selection. */
  selectable?: boolean;
  /** Derive a stable string key from a row — prevents DOM thrash on sort/filter. Defaults to row index. */
  rowKey?: (row: T, index: number) => string;
  /** Accessible caption for the table. */
  caption?: string;
  /** Footer content. */
  footer?: ReactNode;
  /** Show a skeleton loading state. Renders placeholder rows and sets aria-busy on the table. */
  loading?: boolean;
  /** Display an error in place of table data. */
  error?: ReactNode;
  /** Called when any row is clicked or activated. Does not require selectable. */
  onRowClick?: (row: T, index: number) => void;
}

/**
 * Feature-rich data table with sorting, searching, pagination,
 * resizable columns, row/column striping, keyboard row selection,
 * and loading/error states.
 *
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'email', label: 'Email' },
 *   ]}
 *   data={users}
 *   searchable
 *   paginated
 *   pageSize={10}
 *   stripedRows
 * />
 * ```
 */
export function Table<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  stripedRows = false,
  stripedColumns = false,
  searchable = false,
  searchPlaceholder = 'Search…',
  paginated = false,
  pageSize = 10,
  accentColor,
  headerColor,
  headerTextColor,
  selectable = false,
  rowKey,
  caption,
  footer,
  loading = false,
  error,
  onRowClick,
  className,
  ref,
  onKeyDown,
  ...rest
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('none');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [colWidths, setColWidths] = useState<Record<string, number>>({});
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const liveRegionId = useId();

  /* Sorting */
  const handleSort = useCallback(
    (key: string) => {
      if (sortKey === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? 'none' : 'asc'));
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
      setPage(0);
    },
    [sortKey],
  );

  /* Filtering */
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(q)),
    );
  }, [data, search, columns]);

  /* Sorted */
  const sorted = useMemo(() => {
    if (!sortKey || sortDir === 'none') return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null || bVal == null) return 0;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  /* Pagination */
  const totalPages = paginated ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const paged = paginated ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted;

  /* Search handler — announces result count to screen readers */
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      setPage(0);
      if (value.trim()) {
        const q = value.toLowerCase();
        const count = data.filter((row) =>
          columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(q)),
        ).length;
        setAnnouncement(`${count} result${count !== 1 ? 's' : ''} found`);
      } else {
        setAnnouncement('');
      }
    },
    [data, columns],
  );

  /* Row interaction — selection toggle + optional onRowClick callback */
  const handleRowInteraction = useCallback(
    (row: T, globalIdx: number) => {
      if (selectable) {
        setSelectedRow((prev) => {
          const next = prev === globalIdx ? null : globalIdx;
          setAnnouncement(next !== null ? 'Row selected' : 'Selection cleared');
          return next;
        });
      }
      onRowClick?.(row, globalIdx);
    },
    [selectable, onRowClick],
  );

  const handleRowKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTableRowElement>, row: T, globalIdx: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleRowInteraction(row, globalIdx);
      }
    },
    [handleRowInteraction],
  );

  /* Escape on the wrapper clears row selection */
  const handleWrapperKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' && selectedRow !== null) {
        setSelectedRow(null);
        setAnnouncement('Selection cleared');
      }
      onKeyDown?.(e);
    },
    [selectedRow, onKeyDown],
  );

  /* Resize handler */
  const handleResizeStart = useCallback(
    (key: string, startX: number, startWidth: number) => {
      const onMove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        setColWidths((prev) => ({ ...prev, [key]: Math.max(60, startWidth + diff) }));
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [],
  );

  /* Aria sort value */
  const ariaSort = (col: TableColumn<T>): 'ascending' | 'descending' | 'none' | undefined => {
    if (!col.sortable) return undefined;
    if (sortKey !== col.key || sortDir === 'none') return 'none';
    return sortDir === 'asc' ? 'ascending' : 'descending';
  };

  /* Skeleton row count — mirrors pageSize but capped to avoid excessively tall placeholders */
  const skeletonCount = Math.min(pageSize, 8);

  /* Pagination showing-range values */
  const showingStart = page * pageSize + 1;
  const showingEnd = Math.min((page + 1) * pageSize, sorted.length);

  const classNames = [styles.wrapper, className].filter(Boolean).join(' ');
  const tableStyle = {
    ...(accentColor ? { '--table-accent': accentColor } : {}),
    ...(headerColor ? { '--table-header-bg': headerColor } : {}),
    ...(headerTextColor ? { '--table-header-color': headerTextColor } : {}),
  } as CSSProperties;

  return (
    <div ref={ref} className={classNames} onKeyDown={handleWrapperKeyDown} {...rest}>
      {/* Screen reader live region for search results and selection state */}
      <div
        id={liveRegionId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={styles.srOnly}
      >
        {announcement}
      </div>

      {searchable && (
        <div className={styles.toolbar}>
          <input
            type="search"
            className={styles.search}
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search table"
          />
        </div>
      )}

      <div className={styles.scrollContainer}>
        <table
          className={[
            styles.table,
            stripedRows ? styles.stripedRows : '',
            stripedColumns ? styles.stripedColumns : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={tableStyle}
          aria-busy={loading || undefined}
        >
          {caption && <caption className={styles.caption}>{caption}</caption>}
          <thead className={styles.thead}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={styles.th}
                  scope="col"
                  aria-sort={ariaSort(col)}
                  style={{
                    width: colWidths[col.key] ? `${colWidths[col.key]}px` : col.width,
                  }}
                >
                  <span className={styles.thContent}>
                    {col.sortable ? (
                      <button
                        type="button"
                        className={styles.sortButton}
                        onClick={() => handleSort(col.key)}
                        aria-label={`Sort by ${col.label}`}
                      >
                        {col.label}
                        <span className={styles.sortIcon}>
                          {sortKey === col.key && sortDir === 'asc' ? (
                            <SortAscIcon />
                          ) : sortKey === col.key && sortDir === 'desc' ? (
                            <SortDescIcon />
                          ) : (
                            <SortNeutralIcon />
                          )}
                        </span>
                      </button>
                    ) : (
                      col.label
                    )}
                  </span>
                  {col.resizable && (
                    <button
                      type="button"
                      className={styles.resizeHandle}
                      aria-label={`Resize ${col.label} column`}
                      tabIndex={-1}
                      onClick={(e) => e.preventDefault()}
                      onMouseDown={(e) => {
                        const th = (e.target as HTMLElement).closest('th');
                        if (th) {
                          handleResizeStart(col.key, e.clientX, th.offsetWidth);
                        }
                      }}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {loading ? (
              Array.from({ length: skeletonCount }).map((_, i) => (
                <tr key={i} className={styles.skeletonRow} aria-hidden="true">
                  {columns.map((col) => (
                    <td key={col.key} className={styles.td}>
                      <span className={styles.skeletonCell} />
                    </td>
                  ))}
                </tr>
              ))
            ) : paged.length === 0 ? (
              <tr>
                <td className={styles.empty} colSpan={columns.length}>
                  {error ? (
                    error
                  ) : search.trim() ? (
                    <>
                      No results for &ldquo;{search}&rdquo;.{' '}
                      <button
                        type="button"
                        className={styles.clearSearchButton}
                        onClick={() => {
                          setSearch('');
                          setPage(0);
                          setAnnouncement('Search cleared');
                        }}
                      >
                        Clear search
                      </button>
                    </>
                  ) : (
                    'No data found.'
                  )}
                </td>
              </tr>
            ) : (
              paged.map((row, rowIdx) => {
                const globalIdx = paginated ? page * pageSize + rowIdx : rowIdx;
                const key = rowKey ? rowKey(row, globalIdx) : String(globalIdx);
                const isSelected = selectable && selectedRow === globalIdx;
                const isInteractive = selectable || !!onRowClick;
                return (
                  <tr
                    key={key}
                    className={[
                      styles.tr,
                      isInteractive ? styles.selectable : '',
                      isSelected ? styles.selected : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-selected={selectable ? isSelected : undefined}
                    tabIndex={selectable ? 0 : undefined}
                    onClick={isInteractive ? () => handleRowInteraction(row, globalIdx) : undefined}
                    onKeyDown={selectable ? (e) => handleRowKeyDown(e, row, globalIdx) : undefined}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className={styles.td}>
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
          {footer && (
            <tfoot className={styles.tfoot}>
              <tr>
                <td colSpan={columns.length}>{footer}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {paginated && totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Table pagination">
          <button
            type="button"
            className={styles.pageButton}
            disabled={page <= 0}
            onClick={() => setPage((p) => p - 1)}
            aria-label="Previous page"
          >
            <ChevronLeftIcon />
            Previous
          </button>
          <span className={styles.pageInfo}>
            <span className={styles.showingInfo}>
              Showing {showingStart}–{showingEnd} of {sorted.length}
            </span>
            <span aria-hidden="true">·</span>
            <span>Page {page + 1} of {totalPages}</span>
          </span>
          <button
            type="button"
            className={styles.pageButton}
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next page"
          >
            Next
            <ChevronRightIcon />
          </button>
        </nav>
      )}
    </div>
  );
}

import {
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  useState,
  useMemo,
  useCallback,
} from 'react';
import styles from './Table.module.scss';

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
  /** Accessible caption for the table. */
  caption?: string;
  /** Footer content. */
  footer?: ReactNode;
  /** Background color for column headers. */
  headerColor?: string;
  /** Text color for column headers (use with dark headerColor). */
  headerTextColor?: string;
  /** Enable row selection highlight on click. */
  selectable?: boolean;
}

/**
 * Feature-rich data table with sorting, searching, pagination,
 * resizable columns, and row/column striping.
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
  caption,
  footer,
  headerColor,
  headerTextColor,
  selectable = false,
  className,
  ref,
  ...rest
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('none');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [colWidths, setColWidths] = useState<Record<string, number>>({});
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

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

  const classNames = [styles.wrapper, className].filter(Boolean).join(' ');
  const tableStyle = {
    ...(accentColor ? { '--table-accent': accentColor } : {}),
    ...(headerColor ? { '--table-header-bg': headerColor } : {}),
    ...(headerTextColor ? { '--table-header-color': headerTextColor } : {}),
  } as React.CSSProperties;

  const ariaSort = (col: TableColumn<T>): 'ascending' | 'descending' | 'none' | undefined => {
    if (!col.sortable) return undefined;
    if (sortKey !== col.key || sortDir === 'none') return 'none';
    return sortDir === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <div ref={ref} className={classNames} {...rest}>
      {searchable && (
        <div className={styles.toolbar}>
          <input
            type="search"
            className={styles.search}
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            aria-label="Filter table"
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
                        <span className={styles.sortIcon} aria-hidden="true">
                          {sortKey === col.key && sortDir === 'asc'
                            ? '▲'
                            : sortKey === col.key && sortDir === 'desc'
                              ? '▼'
                              : '⇅'}
                        </span>
                      </button>
                    ) : (
                      col.label
                    )}
                  </span>
                  {col.resizable && (
                    <span
                      className={styles.resizeHandle}
                      role="separator"
                      aria-orientation="vertical"
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
            {paged.length === 0 ? (
              <tr>
                <td className={styles.empty} colSpan={columns.length}>
                  No data found.
                </td>
              </tr>
            ) : (
              paged.map((row, rowIdx) => {
                const globalIdx = paginated ? page * pageSize + rowIdx : rowIdx;
                return (
                  <tr
                    key={rowIdx}
                    className={[
                      styles.tr,
                      selectable ? styles.selectable : '',
                      selectable && selectedRow === globalIdx ? styles.selected : '',
                    ].filter(Boolean).join(' ')}
                    onClick={selectable ? () => setSelectedRow(globalIdx) : undefined}
                    aria-selected={selectable ? selectedRow === globalIdx : undefined}
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
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            aria-label="Previous page"
          >
            ← Prev
          </button>
          <span className={styles.pageInfo}>
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            className={styles.pageButton}
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}


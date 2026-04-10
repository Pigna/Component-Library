import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Table } from './Table';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
];

const data = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

describe('Table', () => {
  it('renders a table with column headers', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders all data rows', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('shows "No data found." for empty data', () => {
    render(<Table columns={columns} data={[]} />);
    expect(screen.getByText('No data found.')).toBeInTheDocument();
  });

  it('renders caption as sr-only', () => {
    render(<Table columns={columns} data={data} caption="User table" />);
    expect(screen.getByText('User table')).toBeInTheDocument();
  });

  it('sorts ascending then descending on header click', async () => {
    render(<Table columns={columns} data={data} />);
    const sortBtn = screen.getByRole('button', { name: 'Sort by Name' });

    await userEvent.click(sortBtn);
    const cells = screen.getAllByRole('cell');
    const names = cells.filter((_, i) => i % 2 === 0).map((c) => c.textContent);
    expect(names).toEqual(['Alice', 'Bob', 'Charlie']);

    await userEvent.click(sortBtn);
    const cells2 = screen.getAllByRole('cell');
    const names2 = cells2.filter((_, i) => i % 2 === 0).map((c) => c.textContent);
    expect(names2).toEqual(['Charlie', 'Bob', 'Alice']);
  });

  it('sets aria-sort on sorted column header', async () => {
    render(<Table columns={columns} data={data} />);
    const th = screen.getByText('Name').closest('th')!;
    expect(th).toHaveAttribute('aria-sort', 'none');

    await userEvent.click(screen.getByRole('button', { name: 'Sort by Name' }));
    expect(th).toHaveAttribute('aria-sort', 'ascending');
  });

  it('filters data when search is used', async () => {
    render(<Table columns={columns} data={data} searchable />);
    const searchInput = screen.getByRole('searchbox');

    await userEvent.type(searchInput, 'Alice');
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('uses "Search table" as the search input accessible label', () => {
    render(<Table columns={columns} data={data} searchable />);
    expect(screen.getByRole('searchbox', { name: 'Search table' })).toBeInTheDocument();
  });

  it('shows contextual empty state when search returns no results', async () => {
    render(<Table columns={columns} data={data} searchable />);
    await userEvent.type(screen.getByRole('searchbox'), 'zzz');
    expect(screen.getByText(/No results for/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('clears search and restores rows when "Clear search" is clicked', async () => {
    render(<Table columns={columns} data={data} searchable />);
    await userEvent.type(screen.getByRole('searchbox'), 'zzz');
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('paginates data', async () => {
    render(<Table columns={columns} data={data} paginated pageSize={2} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('shows page info', () => {
    render(<Table columns={columns} data={data} paginated pageSize={2} />);
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('shows showing-range info in pagination', () => {
    render(<Table columns={columns} data={data} paginated pageSize={2} />);
    expect(screen.getByText('Showing 1–2 of 3')).toBeInTheDocument();
  });

  it('renders footer content', () => {
    render(<Table columns={columns} data={data} footer={<span>Total: 3</span>} />);
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });

  /* --- Loading state --- */

  it('renders skeleton rows when loading is true', () => {
    render(<Table columns={columns} data={[]} loading />);
    const hiddenRows = document.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenRows.length).toBeGreaterThan(0);
  });

  it('sets aria-busy on the table when loading', () => {
    render(<Table columns={columns} data={[]} loading />);
    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not set aria-busy when not loading', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByRole('table')).not.toHaveAttribute('aria-busy');
  });

  /* --- Error state --- */

  it('renders error content in place of data', () => {
    render(<Table columns={columns} data={[]} error={<span>Failed to load</span>} />);
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  it('wraps error content in an error-styled container', () => {
    render(<Table columns={columns} data={[]} error="Something went wrong" />);
    const errorText = screen.getByText('Something went wrong');
    expect(errorText.closest('[class*="errorContent"]')).toBeInTheDocument();
  });

  it('sets role="grid" on the table when selectable', () => {
    render(<Table columns={columns} data={data} selectable />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('does not set role="grid" when not selectable', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  /* --- Visible result count in toolbar --- */

  it('shows result count in toolbar when search is active', async () => {
    render(<Table columns={columns} data={data} searchable />);
    await userEvent.type(screen.getByRole('searchbox'), 'Alice');
    expect(screen.getByText('1 result')).toBeInTheDocument();
  });

  it('shows plural result count for multiple matches', async () => {
    render(<Table columns={columns} data={data} searchable />);
    await userEvent.type(screen.getByRole('searchbox'), 'a');
    // The visible toolbar span shows e.g. "2 results" (live region shows "2 results found")
    expect(screen.getByText(/^\d+ results$/)).toBeInTheDocument();
  });

  it('hides result count when search is empty', () => {
    render(<Table columns={columns} data={data} searchable />);
    expect(screen.queryByText(/result/)).not.toBeInTheDocument();
  });

  it('selects a row on click when selectable', async () => {
    render(<Table columns={columns} data={data} selectable />);
    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];

    await userEvent.click(firstDataRow);
    expect(firstDataRow).toHaveAttribute('aria-selected', 'true');
  });

  it('deselects a row on second click', async () => {
    render(<Table columns={columns} data={data} selectable />);
    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];

    await userEvent.click(firstDataRow);
    expect(firstDataRow).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(firstDataRow);
    expect(firstDataRow).toHaveAttribute('aria-selected', 'false');
  });

  it('selects a row via Enter key when selectable', async () => {
    render(<Table columns={columns} data={data} selectable />);
    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];

    firstDataRow.focus();
    await userEvent.keyboard('{Enter}');
    expect(firstDataRow).toHaveAttribute('aria-selected', 'true');
  });

  it('selects a row via Space key when selectable', async () => {
    render(<Table columns={columns} data={data} selectable />);
    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];

    firstDataRow.focus();
    await userEvent.keyboard(' ');
    expect(firstDataRow).toHaveAttribute('aria-selected', 'true');
  });

  it('clears selection on Escape', async () => {
    render(<Table columns={columns} data={data} selectable />);
    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];

    await userEvent.click(firstDataRow);
    expect(firstDataRow).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{Escape}');
    expect(firstDataRow).toHaveAttribute('aria-selected', 'false');
  });

  it('makes rows focusable when selectable', () => {
    render(<Table columns={columns} data={data} selectable />);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveAttribute('tabindex', '0');
  });

  it('does not make rows focusable when not selectable', () => {
    render(<Table columns={columns} data={data} />);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).not.toHaveAttribute('tabindex');
  });

  /* --- onRowClick callback --- */

  it('fires onRowClick when a row is clicked', async () => {
    const onRowClick = vi.fn();
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />);
    const rows = screen.getAllByRole('row');

    await userEvent.click(rows[1]);
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it('fires onRowClick alongside selection when both are active', async () => {
    const onRowClick = vi.fn();
    render(<Table columns={columns} data={data} selectable onRowClick={onRowClick} />);
    const rows = screen.getAllByRole('row');

    await userEvent.click(rows[1]);
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
    expect(rows[1]).toHaveAttribute('aria-selected', 'true');
  });

  /* --- Live region --- */

  it('has a polite live region for announcements', () => {
    render(<Table columns={columns} data={data} />);
    const region = document.querySelector('[aria-live="polite"]');
    expect(region).toBeInTheDocument();
  });

  it('announces search result count', async () => {
    render(<Table columns={columns} data={data} searchable />);
    await userEvent.type(screen.getByRole('searchbox'), 'Alice');
    const region = document.querySelector('[aria-live="polite"]')!;
    expect(within(region as HTMLElement).getByText(/result/i)).toBeInTheDocument();
  });
});



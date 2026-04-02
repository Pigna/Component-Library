import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
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

  it('renders footer content', () => {
    render(<Table columns={columns} data={data} footer={<span>Total: 3</span>} />);
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });
});


import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with a label', () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByLabelText('Accept')).toBeInTheDocument();
  });

  it('renders as a checkbox input', () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Accept" onChange={handleChange} />);

    await userEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('sets indeterminate state', () => {
    render(<Checkbox label="All" indeterminate />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it('sets aria-checked="mixed" when indeterminate', () => {
    render(<Checkbox label="All" indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('shows error message', () => {
    render(<Checkbox label="Accept" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Checkbox label="Accept" error="Required" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Checkbox label="Accept" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('toggles via Space key (native)', async () => {
    render(<Checkbox label="Accept" />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(checkbox).toBeChecked();
  });
});


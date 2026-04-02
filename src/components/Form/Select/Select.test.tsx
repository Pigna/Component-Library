import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

const options = [
  { value: 'us', label: 'United States' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'de', label: 'Germany', disabled: true },
];

describe('Select', () => {
  it('renders with a label', () => {
    render(<Select label="Country" options={options} />);
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select label="Country" options={options} />);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Netherlands')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });

  it('renders placeholder as disabled option', () => {
    render(<Select label="Country" options={options} placeholder="Choose…" />);
    const placeholder = screen.getByText('Choose…') as HTMLOptionElement;
    expect(placeholder.disabled).toBe(true);
  });

  it('marks disabled options', () => {
    render(<Select label="Country" options={options} />);
    const germany = screen.getByText('Germany') as HTMLOptionElement;
    expect(germany.disabled).toBe(true);
  });

  it('shows error message', () => {
    render(<Select label="Country" options={options} error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Select label="Country" options={options} error="Required" />);
    expect(screen.getByLabelText('Country')).toHaveAttribute('aria-invalid', 'true');
  });

  it('calls onChange when option is selected', async () => {
    const handleChange = vi.fn();
    render(<Select label="Country" options={options} onChange={handleChange} />);

    await userEvent.selectOptions(screen.getByLabelText('Country'), 'nl');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});


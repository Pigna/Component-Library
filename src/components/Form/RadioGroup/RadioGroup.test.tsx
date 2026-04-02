import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
];

describe('RadioGroup', () => {
  it('renders a fieldset with legend', () => {
    render(<RadioGroup legend="Pick one" name="test" options={options} />);
    expect(screen.getByRole('group', { name: 'Pick one' })).toBeInTheDocument();
  });

  it('renders all radio options', () => {
    render(<RadioGroup legend="Pick one" name="test" options={options} />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('renders labels for each option', () => {
    render(<RadioGroup legend="Pick one" name="test" options={options} />);
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
    expect(screen.getByLabelText('Option B')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', async () => {
    const handleChange = vi.fn();
    render(<RadioGroup legend="Pick" name="test" options={options} onChange={handleChange} />);

    await userEvent.click(screen.getByLabelText('Option B'));
    expect(handleChange).toHaveBeenCalledWith('b');
  });

  it('marks disabled options', () => {
    render(<RadioGroup legend="Pick" name="test" options={options} />);
    expect(screen.getByLabelText('Option C')).toBeDisabled();
  });

  it('shows error message', () => {
    render(<RadioGroup legend="Pick" name="test" options={options} error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('sets aria-invalid on fieldset when error is present', () => {
    render(<RadioGroup legend="Pick" name="test" options={options} error="Required" />);
    expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'true');
  });

  it('supports controlled value', () => {
    render(<RadioGroup legend="Pick" name="test" options={options} value="b" />);
    expect(screen.getByLabelText('Option B')).toBeChecked();
    expect(screen.getByLabelText('Option A')).not.toBeChecked();
  });
});


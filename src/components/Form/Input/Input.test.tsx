import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with a label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders as the correct type', () => {
    render(<Input label="Email" inputType="email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('shows error message', () => {
    render(<Input label="Email" error="Invalid" />);
    expect(screen.getByText('Invalid')).toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Input label="Email" error="Invalid" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows helper text', () => {
    render(<Input label="Email" helperText="We won't share it" />);
    expect(screen.getByText("We won't share it")).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Input label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('calls onChange when typed into', async () => {
    const handleChange = vi.fn();
    render(<Input label="Name" onChange={handleChange} />);

    await userEvent.type(screen.getByLabelText('Name'), 'abc');
    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input label="Name" disabled />);
    expect(screen.getByLabelText('Name')).toBeDisabled();
  });

  it('defaults to text type', () => {
    render(<Input label="Name" />);
    expect(screen.getByLabelText('Name')).toHaveAttribute('type', 'text');
  });
});


import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders with a label', () => {
    render(<Textarea label="Bio" />);
    expect(screen.getByLabelText('Bio')).toBeInTheDocument();
  });

  it('renders as a textarea element', () => {
    render(<Textarea label="Bio" />);
    expect(screen.getByLabelText('Bio').tagName).toBe('TEXTAREA');
  });

  it('shows error message', () => {
    render(<Textarea label="Bio" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Textarea label="Bio" error="Required" />);
    expect(screen.getByLabelText('Bio')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows helper text', () => {
    render(<Textarea label="Bio" helperText="Max 500 chars" />);
    expect(screen.getByText('Max 500 chars')).toBeInTheDocument();
  });

  it('shows helper text alongside an error', () => {
    render(<Textarea label="Bio" error="Too short" helperText="Max 500 chars" />);
    expect(screen.getByText('Too short')).toBeInTheDocument();
    expect(screen.getByText('Max 500 chars')).toBeInTheDocument();
  });

  it('shows character count with only maxLength set (uncontrolled)', () => {
    render(<Textarea label="Bio" maxLength={200} />);
    expect(screen.getByText('0 of 200')).toBeInTheDocument();
  });

  it('shows correct character count for a controlled value', () => {
    render(<Textarea label="Bio" maxLength={200} value="Hello" onChange={() => {}} />);
    expect(screen.getByText('5 of 200')).toBeInTheDocument();
  });

  it('updates character count as the user types', async () => {
    render(<Textarea label="Bio" maxLength={50} />);
    await userEvent.type(screen.getByLabelText('Bio'), 'Hi');
    expect(screen.getByText('2 of 50')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Textarea label="Bio" disabled />);
    expect(screen.getByLabelText('Bio')).toBeDisabled();
  });
});


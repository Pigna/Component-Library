import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormField, useFormField } from './FormField';

/* Helper component to read context values */
function ContextReader() {
  const ctx = useFormField();
  return <span data-testid="ctx">{JSON.stringify(ctx)}</span>;
}

describe('FormField', () => {
  it('renders label with htmlFor', () => {
    render(
      <FormField label="Email" htmlFor="email">
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(
      <FormField label="Email" htmlFor="email" required>
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message with role="alert"', () => {
    render(
      <FormField label="Email" htmlFor="email" error="Invalid email">
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });

  it('shows helper text when no error', () => {
    render(
      <FormField label="Email" htmlFor="email" helperText="Enter your email">
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('shows helper text alongside an error', () => {
    render(
      <FormField label="Email" htmlFor="email" error="Bad" helperText="Enter your email">
        <input id="email" />
      </FormField>,
    );
    // Helper text remains visible so users retain guidance while fixing the error.
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Bad')).toBeInTheDocument();
  });

  it('provides context via useFormField including hasHelper', () => {
    render(
      <FormField label="Name" htmlFor="name" error="Required" helperText="Hint">
        <ContextReader />
      </FormField>,
    );
    const ctx = JSON.parse(screen.getByTestId('ctx').textContent!);
    expect(ctx.inputId).toBe('name');
    expect(ctx.errorId).toBe('name-error');
    expect(ctx.helperId).toBe('name-helper');
    expect(ctx.hasError).toBe(true);
    expect(ctx.hasHelper).toBe(true);
  });

  it('useFormField throws outside FormField', () => {
    expect(() => render(<ContextReader />)).toThrow('useFormField must be used within a <FormField>');
  });
});


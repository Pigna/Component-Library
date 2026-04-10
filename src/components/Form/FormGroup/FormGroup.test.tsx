import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormGroup } from './FormGroup';

describe('FormGroup', () => {
  it('renders a fieldset with legend', () => {
    render(<FormGroup title="Personal Info"><input /></FormGroup>);
    expect(screen.getByRole('group', { name: 'Personal Info' })).toBeInTheDocument();
  });

  it('renders legend text', () => {
    render(<FormGroup title="Address"><input /></FormGroup>);
    expect(screen.getByText('Address')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <FormGroup title="Settings" description="Adjust your preferences">
        <input />
      </FormGroup>,
    );
    expect(screen.getByText('Adjust your preferences')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    render(<FormGroup title="Settings"><input /></FormGroup>);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('renders children inside the fields wrapper', () => {
    render(
      <FormGroup title="Test">
        <input data-testid="child-input" />
      </FormGroup>,
    );
    expect(screen.getByTestId('child-input')).toBeInTheDocument();
  });

  it('forwards className to fieldset', () => {
    const { container } = render(
      <FormGroup title="Test" className="custom">
        <input />
      </FormGroup>,
    );
    expect(container.querySelector('fieldset')).toHaveClass('custom');
  });
});

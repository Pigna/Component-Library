import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ConditionalField } from './ConditionalField';

describe('ConditionalField', () => {
  it('renders children when show is true', () => {
    render(
      <ConditionalField show>
        <span data-testid="content">hello</span>
      </ConditionalField>,
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('does not render children when show is false (default unmount)', () => {
    render(
      <ConditionalField show={false}>
        <span data-testid="content">hello</span>
      </ConditionalField>,
    );
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('keeps children in DOM when keepMounted and show is false', () => {
    render(
      <ConditionalField show={false} keepMounted>
        <span data-testid="content">hello</span>
      </ConditionalField>,
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('sets aria-hidden on wrapper when keepMounted and hidden', () => {
    const { container } = render(
      <ConditionalField show={false} keepMounted>
        <span>inner</span>
      </ConditionalField>,
    );
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not set aria-hidden when keepMounted and visible', () => {
    const { container } = render(
      <ConditionalField show keepMounted>
        <span>inner</span>
      </ConditionalField>,
    );
    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('renders nothing (null) when show is false without keepMounted', () => {
    const { container } = render(
      <ConditionalField show={false}>
        <span>inner</span>
      </ConditionalField>,
    );
    expect(container.firstChild).toBeNull();
  });
});

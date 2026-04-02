import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressIndicator } from './ProgressIndicator';

describe('ProgressIndicator', () => {
  it('renders with role="progressbar"', () => {
    render(<ProgressIndicator value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow, aria-valuemin, aria-valuemax', () => {
    render(<ProgressIndicator value={65} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '65');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('sets aria-label', () => {
    render(<ProgressIndicator value={50} label="Upload progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Upload progress');
  });

  it('displays percentage text by default', () => {
    render(<ProgressIndicator value={65} />);
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('displays steps text when displayMode is steps', () => {
    render(
      <ProgressIndicator value={40} displayMode="steps" currentStep={2} totalSteps={5} />,
    );
    expect(screen.getByText('2 / 5')).toBeInTheDocument();
  });

  it('clamps value to max', () => {
    render(<ProgressIndicator value={150} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('clamps value to min 0', () => {
    render(<ProgressIndicator value={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders circle variant', () => {
    const { container } = render(<ProgressIndicator variant="circle" value={75} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders bar variant by default', () => {
    const { container } = render(<ProgressIndicator value={50} />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});


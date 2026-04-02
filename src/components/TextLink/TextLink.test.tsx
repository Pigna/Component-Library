import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { TextLink } from './TextLink';

describe('TextLink', () => {
  it('renders as an anchor element', () => {
    render(<TextLink href="/about">About</TextLink>);
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('forwards the href attribute', () => {
    render(<TextLink href="/contact">Contact</TextLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/contact');
  });

  it('does not set target or rel by default', () => {
    render(<TextLink href="/about">About</TextLink>);
    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('sets target="_blank" and rel="noopener noreferrer" when external', () => {
    render(
      <TextLink href="https://example.com" external>
        Example
      </TextLink>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('adds sr-only "(opens in new tab)" text when external', () => {
    render(
      <TextLink href="https://example.com" external>
        Example
      </TextLink>,
    );
    expect(screen.getByText('(opens in new tab)')).toBeInTheDocument();
  });

  it('does not add sr-only text when not external', () => {
    render(<TextLink href="/about">About</TextLink>);
    expect(screen.queryByText('(opens in new tab)')).not.toBeInTheDocument();
  });

  it('is focusable via keyboard', async () => {
    render(<TextLink href="/about">About</TextLink>);

    await userEvent.tab();
    expect(screen.getByRole('link')).toHaveFocus();
  });

  it('forwards native anchor attributes', () => {
    render(
      <TextLink href="/download" download="file.pdf">
        Download
      </TextLink>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('download', 'file.pdf');
  });
});


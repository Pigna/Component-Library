import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MenuItem } from './MenuItem';

describe('MenuItem', () => {
  it('renders as a link when href is provided', () => {
    render(<ul><MenuItem href="/home">Home</MenuItem></ul>);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' }).tagName).toBe('A');
  });

  it('renders as a button when href is omitted', () => {
    render(<ul><MenuItem>Settings</MenuItem></ul>);
    expect(screen.getByRole('button', { name: 'Settings' }).tagName).toBe('BUTTON');
  });

  it('sets aria-current="page" when active', () => {
    render(<ul><MenuItem href="/home" active>Home</MenuItem></ul>);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when not active', () => {
    render(<ul><MenuItem href="/home">Home</MenuItem></ul>);
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('sets aria-disabled when disabled (link)', () => {
    render(<ul><MenuItem href="/locked" disabled>Locked</MenuItem></ul>);
    expect(screen.getByRole('link', { name: 'Locked' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('disables the button natively when disabled', () => {
    render(<ul><MenuItem disabled>Locked</MenuItem></ul>);
    expect(screen.getByRole('button', { name: 'Locked' })).toBeDisabled();
  });

  it('renders icon with aria-hidden', () => {
    const { container } = render(
      <ul><MenuItem icon={<span>★</span>}>Starred</MenuItem></ul>,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('renders children as label text', () => {
    render(<ul><MenuItem href="/x">My Page</MenuItem></ul>);
    expect(screen.getByText('My Page')).toBeInTheDocument();
  });
});


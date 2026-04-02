import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MenuItem } from './MenuItem';

describe('MenuItem', () => {
  it('renders as a link when href is provided', () => {
    render(<ul role="menu"><MenuItem href="/home">Home</MenuItem></ul>);
    expect(screen.getByRole('menuitem', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem').tagName).toBe('A');
  });

  it('renders as a button when href is omitted', () => {
    render(<ul role="menu"><MenuItem>Settings</MenuItem></ul>);
    expect(screen.getByRole('menuitem').tagName).toBe('BUTTON');
  });

  it('sets aria-current="page" when active', () => {
    render(<ul role="menu"><MenuItem href="/home" active>Home</MenuItem></ul>);
    expect(screen.getByRole('menuitem')).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when not active', () => {
    render(<ul role="menu"><MenuItem href="/home">Home</MenuItem></ul>);
    expect(screen.getByRole('menuitem')).not.toHaveAttribute('aria-current');
  });

  it('sets aria-disabled when disabled', () => {
    render(<ul role="menu"><MenuItem disabled>Locked</MenuItem></ul>);
    expect(screen.getByRole('menuitem')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders icon with aria-hidden', () => {
    const { container } = render(
      <ul role="menu"><MenuItem icon={<span>★</span>}>Starred</MenuItem></ul>,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('renders children as label text', () => {
    render(<ul role="menu"><MenuItem href="/x">My Page</MenuItem></ul>);
    expect(screen.getByText('My Page')).toBeInTheDocument();
  });
});


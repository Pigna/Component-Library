import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SideMenu } from './SideMenu';

/* SideMenu is display:none below lg breakpoint in CSS */
describe('SideMenu', () => {
  it('renders as a nav with default aria-label', () => {
    const { container } = render(<SideMenu><li>Item</li></SideMenu>);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Side navigation');
  });

  it('supports custom aria-label', () => {
    const { container } = render(<SideMenu ariaLabel="Main navigation"><li>Item</li></SideMenu>);
    const nav = container.querySelector('nav');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('renders an inner list with role="menu"', () => {
    const { container } = render(<SideMenu><li>Item</li></SideMenu>);
    const list = container.querySelector('[role="menu"]');
    expect(list).toBeInTheDocument();
    expect(list!.tagName).toBe('UL');
  });

  it('renders children', () => {
    render(<SideMenu><li>Dashboard</li></SideMenu>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});




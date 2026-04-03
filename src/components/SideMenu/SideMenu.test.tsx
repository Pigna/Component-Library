import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
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

  /* ---------- collapsible (uncontrolled) ---------- */

  it('does not render collapse toggle when collapsible is false', () => {
    render(<SideMenu><li>Item</li></SideMenu>);
    expect(screen.queryByRole('button', { name: /collapse/i })).not.toBeInTheDocument();
  });

  it('renders collapse toggle when collapsible is true', () => {
    render(<SideMenu collapsible><li>Item</li></SideMenu>);
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument();
  });

  it('toggles collapsed state on button click', async () => {
    render(<SideMenu collapsible><li>Item</li></SideMenu>);
    const btn = screen.getByRole('button', { name: 'Collapse sidebar' });

    await userEvent.click(btn);
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Expand sidebar' }));
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument();
  });

  it('calls onCollapsedChange with the new state', async () => {
    const handleChange = vi.fn();
    render(
      <SideMenu collapsible onCollapsedChange={handleChange}>
        <li>Item</li>
      </SideMenu>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    expect(handleChange).toHaveBeenCalledWith(true);

    await userEvent.click(screen.getByRole('button', { name: 'Expand sidebar' }));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  /* ---------- collapsible (controlled) ---------- */

  it('respects controlled collapsed=true', () => {
    render(
      <SideMenu collapsible collapsed>
        <li>Item</li>
      </SideMenu>,
    );
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument();
  });

  it('respects controlled collapsed=false', () => {
    render(
      <SideMenu collapsible collapsed={false}>
        <li>Item</li>
      </SideMenu>,
    );
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument();
  });

  it('does not change internal state when controlled', async () => {
    const handleChange = vi.fn();
    render(
      <SideMenu collapsible collapsed={false} onCollapsedChange={handleChange}>
        <li>Item</li>
      </SideMenu>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    // Label should remain "Collapse sidebar" because collapsed is controlled to false
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});


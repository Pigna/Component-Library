import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { HamburgerMenu } from './HamburgerMenu';

describe('HamburgerMenu', () => {
  it('renders toggle button with aria-label "Open menu"', () => {
    render(<HamburgerMenu><nav>Content</nav></HamburgerMenu>);
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('opens panel on toggle click', async () => {
    render(<HamburgerMenu><nav>Content</nav></HamburgerMenu>);

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('sets aria-expanded on toggle button', async () => {
    render(<HamburgerMenu><nav>Content</nav></HamburgerMenu>);
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('panel has role="dialog" and aria-modal', async () => {
    render(<HamburgerMenu><nav>Content</nav></HamburgerMenu>);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('renders close button inside panel', async () => {
    render(<HamburgerMenu><nav>Content</nav></HamburgerMenu>);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
  });

  it('closes on close button click', async () => {
    render(<HamburgerMenu><nav>Content</nav></HamburgerMenu>);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const dialog = screen.getByRole('dialog');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Close menu' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    render(<HamburgerMenu><nav>Content</nav></HamburgerMenu>);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when state changes', async () => {
    const handleChange = vi.fn();
    render(<HamburgerMenu onOpenChange={handleChange}><nav>Content</nav></HamburgerMenu>);

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

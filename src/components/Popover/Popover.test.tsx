import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Popover } from './Popover';

describe('Popover', () => {
  it('renders trigger element', () => {
    render(
      <Popover trigger={<button>Open</button>} content={<p>Content</p>} />,
    );
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('does not render panel by default', () => {
    render(
      <Popover trigger={<button>Open</button>} content={<p>Content</p>} />,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens panel on click', async () => {
    render(
      <Popover trigger={<button>Open</button>} content={<p>Content</p>} />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('sets aria-expanded on trigger', async () => {
    render(
      <Popover trigger={<button>Open</button>} content={<p>Content</p>} />,
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-haspopup="dialog" on trigger', () => {
    render(
      <Popover trigger={<button>Open</button>} content={<p>Content</p>} />,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('closes on Escape', async () => {
    render(
      <Popover trigger={<button>Open</button>} content={<p>Content</p>} />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when state changes', async () => {
    const handleOpenChange = vi.fn();
    render(
      <Popover
        trigger={<button>Open</button>}
        content={<p>Content</p>}
        onOpenChange={handleOpenChange}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });

  it('supports controlled open prop', () => {
    render(
      <Popover
        trigger={<button>Open</button>}
        content={<p>Content</p>}
        open={true}
        onOpenChange={() => {}}
      />,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});


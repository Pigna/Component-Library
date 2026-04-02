import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders with a label', () => {
    render(<Toggle label="Dark mode" />);
    expect(screen.getByLabelText('Dark mode')).toBeInTheDocument();
  });

  it('has role="switch"', () => {
    render(<Toggle label="Dark mode" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const handleChange = vi.fn();
    render(<Toggle label="Toggle" onChange={handleChange} />);

    await userEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('supports defaultChecked', () => {
    render(<Toggle label="On" defaultChecked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Toggle label="Locked" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('toggles via Space key', async () => {
    render(<Toggle label="Toggle" />);
    const toggle = screen.getByRole('switch');
    toggle.focus();
    await userEvent.keyboard(' ');
    expect(toggle).toBeChecked();
  });

  it('shows off text when unchecked', () => {
    render(<Toggle label="Sync" onText="On" offText="Off" />);
    expect(screen.getByText('Off')).toBeInTheDocument();
  });
});


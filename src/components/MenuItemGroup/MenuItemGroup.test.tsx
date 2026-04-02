import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MenuItemGroup } from './MenuItemGroup';

describe('MenuItemGroup', () => {
  it('renders label as a button when collapsible', () => {
    render(<MenuItemGroup label="Settings"><li>Item</li></MenuItemGroup>);
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
  });

  it('renders content in a group with aria-labelledby', () => {
    render(<MenuItemGroup label="Settings"><li>Item</li></MenuItemGroup>);
    expect(screen.getByRole('group', { name: 'Settings' })).toBeInTheDocument();
  });

  it('shows content when defaultOpen is true', () => {
    render(<MenuItemGroup label="Nav" defaultOpen><li>Visible</li></MenuItemGroup>);
    expect(screen.getByText('Visible')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Nav' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('marks as collapsed when defaultOpen is false', () => {
    render(<MenuItemGroup label="Nav" defaultOpen={false}><li>Hidden</li></MenuItemGroup>);
    expect(screen.getByRole('button', { name: 'Nav' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles aria-expanded on button click', async () => {
    render(<MenuItemGroup label="Nav"><li>Content</li></MenuItemGroup>);
    const btn = screen.getByRole('button', { name: 'Nav' });
    expect(btn).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-expanded on trigger button', async () => {
    render(<MenuItemGroup label="Nav"><li>X</li></MenuItemGroup>);
    const btn = screen.getByRole('button', { name: 'Nav' });
    expect(btn).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('always shows content when collapsible is false', () => {
    render(<MenuItemGroup label="Main" collapsible={false}><li>Always</li></MenuItemGroup>);
    expect(screen.getByText('Always')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});


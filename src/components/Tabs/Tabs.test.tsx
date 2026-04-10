import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

function SimpleTabs({ defaultTab = 'a', onTabChange }: { defaultTab?: string; onTabChange?: (id: string) => void }) {
  return (
    <Tabs defaultTab={defaultTab} onTabChange={onTabChange}>
      <TabList aria-label="test tabs">
        <Tab id="a">Tab A</Tab>
        <Tab id="b">Tab B</Tab>
        <Tab id="c" disabled>Tab C</Tab>
      </TabList>
      <TabPanel id="a"><p>Panel A</p></TabPanel>
      <TabPanel id="b"><p>Panel B</p></TabPanel>
      <TabPanel id="c"><p>Panel C</p></TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders tab buttons with correct roles', () => {
    render(<SimpleTabs />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('renders the default active tab panel', () => {
    render(<SimpleTabs defaultTab="a" />);
    expect(screen.getByText('Panel A')).toBeInTheDocument();
    expect(screen.queryByText('Panel B')).not.toBeInTheDocument();
  });

  it('activates a tab on click', async () => {
    const user = userEvent.setup();
    render(<SimpleTabs defaultTab="a" />);
    await user.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(screen.getByText('Panel B')).toBeInTheDocument();
    expect(screen.queryByText('Panel A')).not.toBeInTheDocument();
  });

  it('calls onTabChange when tab is clicked', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(<SimpleTabs onTabChange={onTabChange} />);
    await user.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(onTabChange).toHaveBeenCalledWith('b');
  });

  it('marks active tab with aria-selected="true"', async () => {
    const user = userEvent.setup();
    render(<SimpleTabs defaultTab="a" />);
    const tabA = screen.getByRole('tab', { name: 'Tab A' });
    const tabB = screen.getByRole('tab', { name: 'Tab B' });
    expect(tabA).toHaveAttribute('aria-selected', 'true');
    expect(tabB).toHaveAttribute('aria-selected', 'false');
    await user.click(tabB);
    expect(tabB).toHaveAttribute('aria-selected', 'true');
    expect(tabA).toHaveAttribute('aria-selected', 'false');
  });

  it('disabled tab cannot be clicked', async () => {
    const user = userEvent.setup();
    render(<SimpleTabs defaultTab="a" />);
    await user.click(screen.getByRole('tab', { name: 'Tab C' }));
    expect(screen.queryByText('Panel C')).not.toBeInTheDocument();
    expect(screen.getByText('Panel A')).toBeInTheDocument();
  });

  it('navigates with ArrowRight key', async () => {
    const user = userEvent.setup();
    render(<SimpleTabs defaultTab="a" />);
    const tabA = screen.getByRole('tab', { name: 'Tab A' });
    tabA.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Panel B')).toBeInTheDocument();
  });

  it('navigates with ArrowLeft key', async () => {
    const user = userEvent.setup();
    render(<SimpleTabs defaultTab="b" />);
    const tabB = screen.getByRole('tab', { name: 'Tab B' });
    tabB.focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByText('Panel A')).toBeInTheDocument();
  });

  it('arrow key navigation skips disabled tabs', async () => {
    const user = userEvent.setup();
    render(<SimpleTabs defaultTab="b" />);
    const tabB = screen.getByRole('tab', { name: 'Tab B' });
    tabB.focus();
    // ArrowRight from B would normally go to C (disabled) — should skip to A (wraps)
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Panel A')).toBeInTheDocument();
    expect(screen.queryByText('Panel C')).not.toBeInTheDocument();
  });

  it('throws when Tab is used outside Tabs', () => {
    expect(() =>
      render(<Tab id="x">orphan</Tab>),
    ).toThrow('Tab/TabList/TabPanel must be used within a <Tabs>');
  });
});

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo } from 'react';
import styles from './ThemeColors.module.scss';

interface TokenSwatch {
  varName: string;
  value: string;
}

const tokenGroups: Record<string, string[]> = {
  Primary: ['--color-primary', '--color-primary-hover', '--color-primary-active'],
  Secondary: ['--color-secondary', '--color-secondary-hover', '--color-secondary-active'],
  Semantic: ['--color-success', '--color-warning', '--color-error', '--color-info'],
  'Semantic Subtle': [
    '--color-info-subtle',
    '--color-success-subtle',
    '--color-warning-subtle',
    '--color-error-subtle',
  ],
  Surface: ['--color-background', '--color-surface', '--color-surface-raised'],
  Text: [
    '--color-text-primary',
    '--color-text-secondary',
    '--color-text-disabled',
    '--color-text-inverse',
  ],
  Border: ['--color-border', '--color-border-focus', '--color-overlay'],
  'Focus Ring': ['--focus-ring-color'],
};

function useComputedTokens(vars: string[]): TokenSwatch[] {
  return useMemo(() => {
    if (typeof document === 'undefined') return [];
    const computed = getComputedStyle(document.documentElement);
    return vars.map((v) => ({
      varName: v,
      value: computed.getPropertyValue(v).trim() || '—',
    }));
  }, [vars]);
}

function SwatchGrid({ title, vars }: { title: string; vars: string[] }) {
  const tokens = useComputedTokens(vars);

  return (
    <>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.grid}>
        {tokens.map(({ varName, value }) => (
          <div key={varName} className={styles.swatch}>
            <div className={styles.color} style={{ backgroundColor: `var(${varName})` }} />
            <div className={styles.info}>
              <span className={styles.varName}>{varName}</span>
              <span className={styles.hexValue}>{value}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ThemeColorsPage() {
  return (
    <div>
      {Object.entries(tokenGroups).map(([title, vars]) => (
        <SwatchGrid key={title} title={title} vars={vars} />
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Documentation/Theme Colors',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/** All design tokens rendered as color swatches. Toggle Storybook's theme to see dark mode values. */
export const AllTokens: Story = {
  render: () => <ThemeColorsPage />,
};


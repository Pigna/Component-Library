import type { IconProps } from './types';

/** Sort indicator — neutral state (no active sort direction). */
export function SortNeutralIcon(props: IconProps) {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 1L2 4.5H8L5 1Z" fill="currentColor" opacity="0.4" />
      <path d="M5 11L8 7.5H2L5 11Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}


import type { HTMLAttributes, Ref } from 'react';
import styles from './Spinner.module.scss';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** Spinner diameter: sm=16px, md=24px, lg=40px. */
  size?: SpinnerSize;
  /** Screen-reader announcement text. */
  label?: string;
}

/**
 * An animated loading spinner with screen-reader announcement.
 *
 * Renders a spinning circular indicator with `role="status"` and
 * `aria-live="polite"` for screen-reader compatibility. The animation
 * is automatically disabled when `prefers-reduced-motion: reduce` is active.
 *
 * @example
 * ```tsx
 * <Spinner size="md" label="Loading content" />
 * ```
 */
export function Spinner({
  size = 'md',
  label = 'Loading',
  className,
  ref,
  ...rest
}: SpinnerProps) {
  const classNames = [styles.spinner, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classNames}
      role="status"
      aria-live="polite"
      {...rest}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
        />
      </svg>
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}


import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ref forwarded to the underlying `<button>` element. */
  ref?: Ref<HTMLButtonElement>;
  /** The visual style variant of the button. */
  variant?: ButtonVariant;
  /** The size of the button. */
  size?: ButtonSize;
  /** Whether the button is in a loading state. Disables interaction and shows a spinner. */
  loading?: boolean;
  /** Whether the button should take the full width of its container. */
  fullWidth?: boolean;
  /** The content inside the button. */
  children: ReactNode;
}

/**
 * A versatile, accessible button component.
 *
 * Supports multiple visual variants, sizes, loading state, and full-width layout.
 * Forwards all native `<button>` attributes. Uses `aria-busy` for loading state
 * and `aria-disabled` for disabled state to maintain screen reader compatibility.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Save changes
 * </Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled = false,
  children,
  className,
  ref,
  ...rest
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      className={classNames}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          <svg
            className={styles.spinnerIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        </span>
      )}
      <span className={loading ? styles.hiddenText : undefined}>{children}</span>
    </button>
  );
}


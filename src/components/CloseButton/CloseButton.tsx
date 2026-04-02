import type { ButtonHTMLAttributes, Ref } from 'react';
import styles from './CloseButton.module.scss';

export type CloseButtonSize = 'sm' | 'md' | 'lg';

export interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ref forwarded to the underlying `<button>` element. */
  ref?: Ref<HTMLButtonElement>;
  /** The size of the close button. */
  size?: CloseButtonSize;
}

/**
 * A reusable close/dismiss button with an × icon.
 * Used in Dialog, Banner, NotificationPopup, and Tags.
 *
 * @example
 * ```tsx
 * <CloseButton onClick={handleClose} aria-label="Close dialog" />
 * ```
 */
export function CloseButton({
  size = 'md',
  ref,
  className,
  'aria-label': ariaLabel = 'Close',
  ...rest
}: CloseButtonProps) {
  const classNames = [styles.closeButton, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type="button"
      className={classNames}
      aria-label={ariaLabel}
      {...rest}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}


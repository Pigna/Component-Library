import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { CloseButton } from '../CloseButton';
import styles from './Banner.module.scss';

export type BannerVariant = 'info' | 'warning' | 'error' | 'success';

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** Semantic style variant. */
  variant: BannerVariant;
  /** Show a close button. */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void;
  /** Banner content. */
  children: ReactNode;
}

const variantIcons: Record<BannerVariant, string> = {
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
  success: '✓',
};

/**
 * Full-width informational banner with semantic variants and optional dismiss.
 *
 * Uses `role="alert"` for the `error` variant (assertive — interrupts screen reader)
 * and `role="status"` for `info`, `warning`, and `success` (polite).
 *
 * @example
 * ```tsx
 * <Banner variant="info" dismissible onDismiss={handleDismiss}>
 *   Your session will expire in 5 minutes.
 * </Banner>
 * ```
 */
export function Banner({
  variant,
  dismissible = false,
  onDismiss,
  children,
  className,
  ref,
  ...rest
}: BannerProps) {
  const classNames = [styles.banner, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classNames}
      role={variant === 'error' ? 'alert' : 'status'}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        {variantIcons[variant]}
      </span>
      <div className={styles.content}>{children}</div>
      {dismissible && (
        <CloseButton
          size="sm"
          aria-label="Dismiss banner"
          onClick={onDismiss}
          className={styles.dismiss}
        />
      )}
    </div>
  );
}


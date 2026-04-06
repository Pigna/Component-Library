import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { useEffect, useRef, useState } from 'react';
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
  /**
   * Called after the dismiss animation completes.
   * If omitted the banner manages its own visibility internally —
   * no handler is required for the dismiss button to work.
   */
  onDismiss?: () => void;
  /** Banner content. */
  children: ReactNode;
}

/** Inline SVG icons — consistent rendering across every platform and font stack. */
const variantIcons: Record<BannerVariant, ReactNode> = {
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  // Octagon — visually distinct from the × close button.
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
};

/** Duration matches `--transition-normal` (250 ms). */
const DISMISS_DURATION_MS = 250;

/**
 * Full-width informational banner with semantic variants and optional dismiss.
 *
 * Uses `role="alert"` for the `error` variant (assertive — interrupts screen reader)
 * and `role="status"` for `info`, `warning`, and `success` (polite).
 *
 * Dismiss is self-contained: if `onDismiss` is omitted the banner hides itself
 * after the exit animation. Provide `onDismiss` when the parent needs to react
 * (e.g. to remove the component from the tree entirely).
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
  const [dismissing, setDismissing] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Keep a ref so the effect closure always calls the latest onDismiss.
  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  });

  // Trigger banner removal after the CSS exit animation completes.
  useEffect(() => {
    if (!dismissing) return;
    const timer = setTimeout(() => {
      setDismissed(true);
      onDismissRef.current?.();
    }, DISMISS_DURATION_MS);
    return () => clearTimeout(timer);
  }, [dismissing]);

  if (dismissed) return null;

  const classNames = [styles.banner, styles[variant], dismissing && styles.dismissing, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classNames}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-atomic="true"
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
          onClick={() => setDismissing(true)}
          className={styles.dismiss}
        />
      )}
    </div>
  );
}


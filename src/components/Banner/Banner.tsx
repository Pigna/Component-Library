import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { useEffect, useRef, useState } from 'react';
import { CloseButton } from '../CloseButton';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../../icons';
import type { BannerLabels } from '../../labels';
import { useComponentLibraryStrings } from '../../providers';
import styles from './Banner.module.scss';

export type BannerVariant = 'info' | 'warning' | 'error' | 'success';

const DEFAULT_BANNER_LABELS: Required<BannerLabels> = {
  dismissAriaLabel: 'Dismiss banner',
};

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
  /**
   * Override individual translatable strings inside the banner.
   * Values set here take priority over any `<ComponentLibraryProvider strings>` defaults.
   */
  labels?: BannerLabels;
}

/** Inline SVG icons — consistent rendering across every platform and font stack. */
const variantIcons: Record<BannerVariant, ReactNode> = {
  info: <InfoIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  success: <SuccessIcon />,
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
  labels,
  ...rest
}: BannerProps) {
  const ctx = useComponentLibraryStrings();
  const l = { ...DEFAULT_BANNER_LABELS, ...ctx.banner, ...labels };

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
          aria-label={l.dismissAriaLabel}
          onClick={() => setDismissing(true)}
          className={styles.dismiss}
        />
      )}
    </div>
  );
}


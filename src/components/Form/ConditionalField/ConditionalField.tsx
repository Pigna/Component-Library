import type { ReactNode } from 'react';
import styles from './ConditionalField.module.scss';

export interface ConditionalFieldProps {
  /** When true, children are shown. When false, they are hidden (or unmounted). */
  show: boolean;
  /**
   * When true, children remain in the DOM and animate in/out instead of mounting/unmounting.
   * Useful for preserving controlled input state across visibility toggles.
   * @default false
   */
  keepMounted?: boolean;
  /**
   * When true (and keepMounted is false), wraps children in a div with a fade-in entrance
   * animation on mount. Adds one wrapper element to the DOM.
   * @default false
   */
  animated?: boolean;
  /** Additional class name for the wrapper element (only rendered when keepMounted or animated). */
  className?: string;
  children: ReactNode;
}

/**
 * Conditionally shows or hides content based on a boolean expression.
 *
 * By default, children are **unmounted** when `show` is false — this is the
 * accessible default (hidden content is not in the DOM or focus order).
 *
 * Set `keepMounted` to preserve DOM state (e.g. controlled inputs that must
 * retain their value while hidden). Content animates in and out smoothly.
 *
 * Set `animated` (with default mode) to get a fade-in entrance animation on mount.
 * Note: this wraps children in a `<div>` — be aware of layout implications.
 *
 * @example
 * ```tsx
 * // Default: unmounts when false
 * <ConditionalField show={country === 'us'}>
 *   <Input label="State" />
 * </ConditionalField>
 *
 * // Keeps mounted, animates in/out
 * <ConditionalField show={hasBillingAddress} keepMounted>
 *   <FormGroup title="Billing Address">...</FormGroup>
 * </ConditionalField>
 * ```
 */
export function ConditionalField({
  show,
  keepMounted = false,
  animated = false,
  className,
  children,
}: ConditionalFieldProps) {
  if (keepMounted) {
    const wrapperClasses = [styles.keepMounted, !show ? styles.hidden : '', className]
      .filter(Boolean)
      .join(' ');
    // inert implicitly applies aria-hidden — no need to set both
    return (
      <div className={wrapperClasses} inert={!show || undefined}>
        <div className={styles.inner}>{children}</div>
      </div>
    );
  }

  if (!show) return null;

  if (animated) {
    return <div className={[styles.enter, className].filter(Boolean).join(' ')}>{children}</div>;
  }

  return <>{children}</>;
}


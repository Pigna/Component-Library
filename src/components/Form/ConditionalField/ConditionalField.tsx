import type { ReactNode } from 'react';
import styles from './ConditionalField.module.scss';

export interface ConditionalFieldProps {
  /** When true, children are shown. When false, they are hidden (or unmounted). */
  show: boolean;
  /**
   * When true, children remain in the DOM but are visually hidden when `show` is false.
   * Useful for preserving controlled input state across visibility toggles.
   * @default false
   */
  keepMounted?: boolean;
  /** Additional class name for the wrapper element (only rendered when keepMounted). */
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
 * retain their value while hidden).
 *
 * @example
 * ```tsx
 * // Unmounts when condition is false (default)
 * <ConditionalField show={country === 'us'}>
 *   <Input label="State" />
 * </ConditionalField>
 *
 * // Keeps mounted but visually hidden
 * <ConditionalField show={hasBillingAddress} keepMounted>
 *   <FormGroup title="Billing Address">...</FormGroup>
 * </ConditionalField>
 * ```
 */
export function ConditionalField({
  show,
  keepMounted = false,
  className,
  children,
}: ConditionalFieldProps) {
  if (keepMounted) {
    const wrapperClasses = [styles.keepMounted, !show ? styles.hidden : '', className]
      .filter(Boolean)
      .join(' ');
    return (
      <div className={wrapperClasses} aria-hidden={!show || undefined} inert={!show || undefined}>
        {children}
      </div>
    );
  }

  return show ? <>{children}</> : null;
}

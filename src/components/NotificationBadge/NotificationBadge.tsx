import type { HTMLAttributes, ReactNode, Ref } from 'react';
import styles from './NotificationBadge.module.scss';

export interface NotificationBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Ref forwarded to the wrapper `<span>`. */
  ref?: Ref<HTMLSpanElement>;
  /** Numeric count to display. */
  count?: number;
  /** Maximum before displaying `{max}+`. */
  max?: number;
  /** Show a dot instead of a count. */
  dot?: boolean;
  /** The anchor element the badge overlays. */
  children?: ReactNode;
}

/**
 * Small count/dot badge overlaid on a child element (e.g. a bell icon).
 *
 * When `count` is 0 (or not provided and `dot` is false), the badge is hidden.
 * When `count` exceeds `max`, it displays `{max}+`.
 *
 * @example
 * ```tsx
 * <NotificationBadge count={5}>
 *   <BellIcon />
 * </NotificationBadge>
 *
 * <NotificationBadge dot>
 *   <BellIcon />
 * </NotificationBadge>
 * ```
 */
export function NotificationBadge({
  count,
  max = 99,
  dot = false,
  children,
  className,
  ref,
  ...rest
}: NotificationBadgeProps) {
  const showBadge = dot || (count != null && count > 0);
  const displayText = dot ? '' : count != null && count > max ? `${max}+` : count?.toString() ?? '';
  const ariaLabel = dot
    ? 'New notifications'
    : count != null && count > 0
      ? `${count} notifications`
      : undefined;

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ');
  const badgeClasses = [styles.badge, dot ? styles.dot : styles.count]
    .filter(Boolean)
    .join(' ');

  // Changing the key remounts the badge span, restarting the ping animation
  const badgeKey = dot ? 'dot' : count;

  return (
    <span ref={ref} className={wrapperClasses} {...rest}>
      {children}
      {showBadge && (
        <span key={badgeKey} className={badgeClasses} aria-label={ariaLabel} role="status">
          {!dot && displayText}
          {dot && <span className={styles.srOnly}>New notifications</span>}
        </span>
      )}
    </span>
  );
}


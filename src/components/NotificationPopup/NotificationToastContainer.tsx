import type { HTMLAttributes } from 'react';
import styles from './NotificationToastContainer.module.scss';

export interface NotificationToastContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the notification region. Defaults to "Notifications". */
  label?: string;
}

/**
 * Fixed-position container that stacks `NotificationPopup` instances in the
 * bottom-right corner (top full-width on mobile).
 *
 * Separating positioning from the popup component means `NotificationPopup`
 * can also be used inline or inside custom layouts without fighting CSS.
 *
 * @example
 * ```tsx
 * <NotificationToastContainer>
 *   {toasts.map((t) => (
 *     <NotificationPopup key={t.id} variant={t.variant} visible onDismiss={() => dismiss(t.id)}>
 *       {t.message}
 *     </NotificationPopup>
 *   ))}
 * </NotificationToastContainer>
 * ```
 */
export function NotificationToastContainer({
  children,
  className,
  label = 'Notifications',
  ...rest
}: NotificationToastContainerProps) {
  const classNames = [styles.container, className].filter(Boolean).join(' ');

  return (
    <div role="region" aria-label={label} className={classNames} {...rest}>
      {children}
    </div>
  );
}

import { type HTMLAttributes, type ReactNode, type Ref, useEffect, useRef, useCallback } from 'react';
import { CloseButton } from '../CloseButton';
import styles from './NotificationPopup.module.scss';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

export interface NotificationPopupProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container. */
  ref?: Ref<HTMLDivElement>;
  /** Semantic variant. */
  variant?: NotificationVariant;
  /** Optional heading. */
  title?: string;
  /** Notification body. */
  children?: ReactNode;
  /** Controls visibility. */
  visible: boolean;
  /** Auto-dismiss after timeout. */
  autoDismiss?: boolean;
  /** Milliseconds before auto-dismiss. */
  autoDismissMs?: number;
  /** Called when dismissed. */
  onDismiss?: () => void;
}

const variantIcons: Record<NotificationVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

/**
 * Toast notification with pop-in animation, auto-dismiss, and close button.
 *
 * Auto-dismiss pauses on hover/focus to give users time to read.
 *
 * @example
 * ```tsx
 * <NotificationPopup variant="success" visible={show} onDismiss={() => setShow(false)}>
 *   Changes saved successfully.
 * </NotificationPopup>
 * ```
 */
export function NotificationPopup({
  variant = 'info',
  title,
  children,
  visible,
  autoDismiss = true,
  autoDismissMs = 5000,
  onDismiss,
  className,
  ref,
  ...rest
}: NotificationPopupProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!autoDismiss || !visible || pausedRef.current) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      onDismiss?.();
    }, autoDismissMs);
  }, [autoDismiss, visible, autoDismissMs, onDismiss, clearTimer]);

  useEffect(() => {
    if (visible && autoDismiss) {
      startTimer();
    }
    return clearTimer;
  }, [visible, autoDismiss, startTimer, clearTimer]);

  const handlePause = useCallback(() => {
    pausedRef.current = true;
    clearTimer();
  }, [clearTimer]);

  const handleResume = useCallback(() => {
    pausedRef.current = false;
    startTimer();
  }, [startTimer]);

  if (!visible) return null;

  const classNames = [styles.popup, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classNames}
      role="alert"
      aria-live="assertive"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        {variantIcons[variant]}
      </span>
      <div className={styles.content}>
        {title && <strong className={styles.title}>{title}</strong>}
        {children && <div className={styles.body}>{children}</div>}
      </div>
      <CloseButton
        size="sm"
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className={styles.dismiss}
      />
    </div>
  );
}


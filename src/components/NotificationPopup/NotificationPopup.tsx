import { type HTMLAttributes, type ReactNode, type Ref, useEffect, useRef, useCallback, useState } from 'react';
import { CloseButton } from '../CloseButton';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../../icons';
import type { NotificationPopupLabels } from '../../labels';
import { useComponentLibraryStrings } from '../../providers';
import styles from './NotificationPopup.module.scss';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

const DEFAULT_NOTIFICATION_LABELS: Required<NotificationPopupLabels> = {
  dismissAriaLabel: 'Dismiss notification',
};

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
  /** Called when dismissed (by user click or auto-dismiss). */
  onDismiss?: () => void;
  /** Called only when dismissed automatically — use to differentiate from user-initiated dismiss. */
  onAutoDismiss?: () => void;
  /** Called after the exit animation finishes and the element is removed from the DOM.
   *  Use this in list/stack patterns to remove the item from state only after it has animated out. */
  onExited?: () => void;
  /**
   * Override individual translatable strings inside the notification.
   * Values set here take priority over any `<ComponentLibraryProvider strings>` defaults.
   */
  labels?: NotificationPopupLabels;
}

const ANIMATION_DURATION = 250;

/** error and warning interrupt; info and success queue politely */
const URGENT_VARIANTS = new Set<NotificationVariant>(['error', 'warning']);

/**
 * Toast notification with pop-in/out animation, auto-dismiss, and close button.
 *
 * - `error` and `warning` use `role="alert"` (assertive) — interrupts screen readers.
 * - `info` and `success` use `role="status"` (polite) — queues the announcement.
 * - Auto-dismiss pauses on hover/focus to give users time to read.
 * - Use inside `NotificationToastContainer` for fixed-position viewport stacking.
 *
 * @example
 * ```tsx
 * <NotificationToastContainer>
 *   <NotificationPopup variant="success" visible={show} onDismiss={() => setShow(false)}>
 *     Changes saved successfully.
 *   </NotificationPopup>
 * </NotificationToastContainer>
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
  onAutoDismiss,
  onExited,
  className,
  ref,
  labels,
  ...rest
}: NotificationPopupProps) {
  const ctx = useComponentLibraryStrings();
  const l = { ...DEFAULT_NOTIFICATION_LABELS, ...ctx.notificationPopup, ...labels };

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);
  const prevVisibleRef = useRef(visible);

  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(visible);
  const [leaving, setLeaving] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  // Derive mount/leave state from the `visible` prop during render.
  // Calling setState here uses React's "update during render" pattern: React immediately
  // discards the current output and retries — no cascading renders, no effect involvement.
  if (prevVisibleRef.current !== visible) {
    prevVisibleRef.current = visible;
    if (visible) {
      if (!mounted) setMounted(true);
      if (leaving) setLeaving(false);
    } else if (mounted && !leaving) {
      setLeaving(true);
    }
  }

  // Effect only schedules the async exit timer — no synchronous setState in the body.
  // The setState calls inside the timeout callback are deferred, not synchronous.
  useEffect(() => {
    if (!leaving) return;
    const id = setTimeout(() => {
      setMounted(false);
      setLeaving(false);
      onExited?.();
    }, ANIMATION_DURATION);
    return () => clearTimeout(id);
  }, [leaving, onExited]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // startTimer only schedules a timeout — no synchronous setState.
  const startTimer = useCallback(() => {
    if (!autoDismiss || !visible || pausedRef.current) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      onAutoDismiss?.();
      onDismiss?.();
    }, autoDismissMs);
  }, [autoDismiss, visible, autoDismissMs, onAutoDismiss, onDismiss, clearTimer]);

  useEffect(() => {
    if (visible && autoDismiss) {
      startTimer();
    }
    return clearTimer;
  }, [visible, autoDismiss, startTimer, clearTimer]);

  const handlePause = useCallback(() => {
    pausedRef.current = true;
    setPaused(true);
    clearTimer();
  }, [clearTimer]);

  const handleResume = useCallback(() => {
    pausedRef.current = false;
    setPaused(false);
    setProgressKey((k) => k + 1); // restart progress animation — event handler, not effect
    startTimer();
  }, [startTimer]);

  if (!mounted) return null;

  const variantIcons: Record<NotificationVariant, ReactNode> = {
    info: <InfoIcon />,
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
  };

  const isUrgent = URGENT_VARIANTS.has(variant);
  const classNames = [styles.popup, styles[variant], leaving && styles.leaving, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classNames}
      role={isUrgent ? 'alert' : 'status'}
      aria-live={isUrgent ? 'assertive' : 'polite'}
      aria-atomic="true"
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
        aria-label={l.dismissAriaLabel}
        onClick={onDismiss}
        className={styles.dismiss}
      />
      {autoDismiss && !leaving && (
        <div
          key={progressKey}
          className={styles.progress}
          style={{
            animationDuration: `${autoDismissMs}ms`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}


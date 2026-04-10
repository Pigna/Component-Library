import { type HTMLAttributes, type ReactNode, type Ref, useEffect, useRef, useCallback, useState } from 'react';
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
  /** Called when dismissed (by user click or auto-dismiss). */
  onDismiss?: () => void;
  /** Called only when dismissed automatically — use to differentiate from user-initiated dismiss. */
  onAutoDismiss?: () => void;
  /** Called after the exit animation finishes and the element is removed from the DOM.
   *  Use this in list/stack patterns to remove the item from state only after it has animated out. */
  onExited?: () => void;
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
  ...rest
}: NotificationPopupProps) {
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
    info: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm9 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-.25-6.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5z" />
      </svg>
    ),
    success: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.78-2.28a.75.75 0 0 0-1.06-1.06L7 8.37 5.28 6.65a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l4.25-4.24z" />
      </svg>
    ),
    warning: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
        <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368L8.22 1.754zM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-.25-5.25a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0v-2.5z" />
      </svg>
    ),
    error: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
        <path d="M2.343 13.657A8 8 0 1 1 13.657 2.343 8 8 0 0 1 2.343 13.657zm1.06-1.06A6.5 6.5 0 1 0 12.596 3.404 6.5 6.5 0 0 0 3.404 12.596zM6.22 4.97a.75.75 0 0 0-1.06 1.06L6.94 8l-1.78 1.97a.75.75 0 1 0 1.06 1.06L8 9.06l1.97 1.97a.75.75 0 1 0 1.06-1.06L9.06 8l1.97-1.97a.75.75 0 0 0-1.06-1.06L8 6.94 6.22 4.97z" />
      </svg>
    ),
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
        aria-label="Dismiss notification"
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


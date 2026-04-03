import {
  type ReactElement,
  type ReactNode,
  type Ref,
  type HTMLAttributes,
  useState,
  useCallback,
  cloneElement,
} from 'react';
import { Popover } from '../Popover';
import { Button } from '../Button';
import type { PopoverPlacement } from '../Popover';
import styles from './ConfirmPopover.module.scss';

export interface ConfirmPopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Ref forwarded to the wrapper element. */
  ref?: Ref<HTMLDivElement>;
  /** The element that triggers the confirmation popover (e.g. a delete button). */
  trigger: ReactElement;
  /** Short message displayed in the popover (e.g. "Delete this item?"). */
  message: ReactNode;
  /** Label for the confirm button. @default "Confirm" */
  confirmLabel?: string;
  /** Label for the cancel button. @default "Cancel" */
  cancelLabel?: string;
  /** Called when the user confirms the action. */
  onConfirm: () => void;
  /** Called when the user cancels the action. */
  onCancel?: () => void;
  /** Preferred placement relative to trigger. @default "bottom" */
  placement?: PopoverPlacement;
  /** Controlled open state. */
  open?: boolean;
  /** Called when open state should change. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * A popover that asks the user to confirm or cancel an action.
 *
 * Wraps the existing `Popover` component and renders a warning icon,
 * a message, and Confirm / Cancel buttons inside the panel. The original
 * trigger button's `onClick` is intercepted — the actual action only fires
 * when the user clicks Confirm.
 *
 * @example
 * ```tsx
 * <ConfirmPopover
 *   trigger={<Button variant="outline">Delete</Button>}
 *   message="Are you sure you want to delete this item?"
 *   onConfirm={handleDelete}
 * />
 * ```
 */
export function ConfirmPopover({
  trigger,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  placement = 'bottom',
  open: controlledOpen,
  onOpenChange,
  className,
  ref,
  ...rest
}: ConfirmPopoverProps) {
  /* Always use controlled mode internally so we can close the popover
     programmatically when Confirm or Cancel is clicked. */
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const handleConfirm = useCallback(() => {
    onConfirm();
    setOpen(false);
  }, [onConfirm, setOpen]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    setOpen(false);
  }, [onCancel, setOpen]);

  /* Strip the original onClick from the trigger so clicking it only opens the
     popover (the Popover component itself wires the open/close toggle). */
  const sanitizedTrigger = cloneElement(trigger, { onClick: undefined } as Record<string, unknown>);

  const content = (
    <div className={styles.body}>
      <div className={styles.messageRow}>
        {/* Inline warning icon (triangle with exclamation mark) */}
        <svg
          className={styles.warningIcon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span className={styles.message}>{message}</span>
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          {cancelLabel}
        </Button>
        <Button variant="primary" size="sm" onClick={handleConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      ref={ref}
      trigger={sanitizedTrigger}
      content={content}
      triggerOn="click"
      placement={placement}
      open={isOpen}
      onOpenChange={setOpen}
      className={className}
      {...rest}
    />
  );
}






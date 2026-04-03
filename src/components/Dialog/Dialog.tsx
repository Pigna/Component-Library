import {
  type ReactNode,
  type Ref,
  type HTMLAttributes,
  type RefObject,
  type SyntheticEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { CloseButton } from '../CloseButton';
import { Button } from '../Button';
import styles from './Dialog.module.scss';

export interface DialogProps extends Omit<HTMLAttributes<HTMLDialogElement>, 'title'> {
  /** Ref forwarded to the native `<dialog>`. */
  ref?: Ref<HTMLDialogElement>;
  /** Controls dialog visibility. */
  open: boolean;
  /** Called on Escape, backdrop click, or close button. */
  onClose: () => void;
  /** Dialog heading (linked via `aria-labelledby`). */
  title: string;
  /** Custom dialog body content. */
  children?: ReactNode;
  /** Label for the confirm action button. */
  confirmLabel?: string;
  /** Label for the cancel action button. */
  cancelLabel?: string;
  /** Called when confirm button is clicked. */
  onConfirm?: () => void;
  /** Called when cancel button is clicked. */
  onCancel?: () => void;
  /** Hide the confirm/cancel footer entirely. */
  hideActions?: boolean;
}

/**
 * Modal dialog using the native `<dialog>` element for built-in focus
 * trapping and Escape-to-close.
 *
 * @example
 * ```tsx
 * <Dialog open={isOpen} onClose={close} title="Confirm deletion">
 *   <p>Are you sure?</p>
 * </Dialog>
 * ```
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  hideActions = false,
  className,
  ref,
  ...rest
}: DialogProps) {
  const internalRef = useRef<HTMLDialogElement | null>(null);

  const setRef = useCallback(
    (node: HTMLDialogElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object') {
        (ref as RefObject<HTMLDialogElement | null>).current = node;
      }
    },
    [ref],
  );

  useEffect(() => {
    const dialog = internalRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleCancel = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  const handleBackdropKey = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  const handleCancelClick = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onCancel, onClose]);

  const classNames = [styles.dialog, className].filter(Boolean).join(' ');
  const titleId = 'dialog-title';
  const contentId = 'dialog-content';

  return (
    <dialog
      ref={setRef}
      className={classNames}
      onCancel={handleCancel}
      aria-labelledby={titleId}
      aria-describedby={contentId}
      {...rest}
    >
      {/*
       * Backdrop button: captures mouse clicks outside the panel to close the dialog.
       * tabIndex={-1} keeps it out of the tab order; keyboard users rely on Escape (onCancel).
       */}
      <button
        type="button"
        className={styles.backdropOverlay}
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
        onKeyDown={handleBackdropKey}
      />
      <div role="document" className={styles.panel}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <CloseButton
            size="sm"
            aria-label="Close dialog"
            onClick={onClose}
          />
        </header>

        <div id={contentId} className={styles.content}>
          {children}
        </div>

        {!hideActions && (
          <footer className={styles.footer}>
            <Button variant="ghost" size="md" onClick={handleCancelClick}>
              {cancelLabel}
            </Button>
            <Button variant="primary" size="md" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </footer>
        )}
      </div>
    </dialog>
  );
}


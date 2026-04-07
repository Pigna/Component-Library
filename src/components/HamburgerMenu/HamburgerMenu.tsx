import {
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { CloseButton } from '../CloseButton';
import styles from './HamburgerMenu.module.scss';
import { HamburgerMenuContext } from './HamburgerMenuContext';

export interface HamburgerMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container. */
  ref?: Ref<HTMLDivElement>;
  /** Controlled open state. */
  open?: boolean;
  /** Called when open state should change. */
  onOpenChange?: (open: boolean) => void;
  /** Menu content (typically SideMenu). */
  children: ReactNode;
}

/**
 * Mobile hamburger toggle + slide-in menu panel with focus trapping.
 *
 * Only visible below the `lg` breakpoint. Uses an overlay + slide-in panel
 * with Escape-to-close and overlay-click-to-close.
 *
 * @example
 * ```tsx
 * <HamburgerMenu>
 *   <SideMenu>…</SideMenu>
 * </HamburgerMenu>
 * ```
 */
export function HamburgerMenu({
  open: controlledOpen,
  onOpenChange,
  children,
  className,
  ref,
  ...rest
}: HamburgerMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  /* Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  /* Focus trap — keep focus inside panel */
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusableEls = panel.querySelectorAll<HTMLElement>(focusableSelector);
    if (focusableEls.length) focusableEls[0].focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const els = panel.querySelectorAll<HTMLElement>(focusableSelector);
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={wrapperClasses} {...rest}>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={toggle}
      >
        <svg
          className={styles.hamburgerIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={close} aria-hidden="true" />
          <div
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className={styles.panelHeader}>
              <CloseButton aria-label="Close menu" onClick={close} />
            </div>
            <div className={styles.panelContent}>
              <HamburgerMenuContext.Provider value={true}>
                {children}
              </HamburgerMenuContext.Provider>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


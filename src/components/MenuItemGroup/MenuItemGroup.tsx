import { type HTMLAttributes, type ReactNode, type Ref, useState, useId, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './MenuItemGroup.module.scss';
import { useSideMenu, SideMenuContext } from '../SideMenu/SideMenuContext';

export interface MenuItemGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container. */
  ref?: Ref<HTMLDivElement>;
  /** Group label (rendered as a button). */
  label: string;
  /** Leading icon — shown in trigger and as the collapsed icon. */
  icon?: ReactNode;
  /** Initial expanded state. */
  defaultOpen?: boolean;
  /** Whether the group can be collapsed. */
  collapsible?: boolean;
  /** `MenuItem` children. */
  children: ReactNode;
}

/** Generic fallback icon rendered when the group has no icon and sidebar is collapsed. */
function FallbackGroupIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

/**
 * Collapsible group of MenuItems with a label/header.
 *
 * @example
 * ```tsx
 * <MenuItemGroup label="Settings" icon={<SettingsIcon />}>
 *   <MenuItem href="/profile">Profile</MenuItem>
 *   <MenuItem href="/security">Security</MenuItem>
 * </MenuItemGroup>
 * ```
 */
export function MenuItemGroup({
  label,
  icon,
  defaultOpen = true,
  collapsible = true,
  children,
  className,
  ref,
  ...rest
}: MenuItemGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const { isCollapsed } = useSideMenu();
  const triggerId = useId();
  const contentId = useId();
  const isOpen = collapsible ? open : true;

  /* Collapsed flyout state */
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [flyoutPos, setFlyoutPos] = useState({ top: 0, left: 0 });
  const iconTriggerRef = useRef<HTMLButtonElement | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openFlyout = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current);
    const rect = iconTriggerRef.current?.getBoundingClientRect();
    if (rect) {
      setFlyoutPos({ top: rect.top, left: rect.right + 4 });
    }
    setFlyoutOpen(true);
  }, []);

  const closeFlyout = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setFlyoutOpen(false), 150);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current);
  }, []);

  /* Reposition flyout on scroll/resize while open */
  useEffect(() => {
    if (!flyoutOpen) return;
    const reposition = () => {
      const rect = iconTriggerRef.current?.getBoundingClientRect();
      if (rect) setFlyoutPos({ top: rect.top, left: rect.right + 4 });
    };
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [flyoutOpen]);

  /* Close flyout on Escape */
  useEffect(() => {
    if (!flyoutOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFlyoutOpen(false);
        iconTriggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [flyoutOpen]);

  useEffect(() => {
    return () => clearTimeout(hoverTimeoutRef.current);
  }, []);

  const classNames = [styles.group, className].filter(Boolean).join(' ');

  /* ── Collapsed (icon-only) mode ── */
  if (isCollapsed) {
    return (
      <div className={classNames} {...rest}>
        <button
          ref={iconTriggerRef}
          type="button"
          className={styles.collapsedTrigger}
          aria-label={label}
          title={label}
          onMouseEnter={openFlyout}
          onMouseLeave={closeFlyout}
          onFocus={openFlyout}
          onBlur={closeFlyout}
        >
          <span className={styles.icon} aria-hidden="true">
            {icon ?? <FallbackGroupIcon />}
          </span>
        </button>

        {flyoutOpen && createPortal(
          <SideMenuContext.Provider value={{ isCollapsed: false }}>
            <div
              className={styles.flyout}
              style={{ top: flyoutPos.top, left: flyoutPos.left }}
              role="group"
              aria-label={label}
              onMouseEnter={cancelClose}
              onMouseLeave={closeFlyout}
            >
              <p className={styles.flyoutLabel}>{label}</p>
              <ul className={styles.flyoutList}>
                {children}
              </ul>
            </div>
          </SideMenuContext.Provider>,
          document.body,
        )}
      </div>
    );
  }

  /* ── Expanded mode ── */
  return (
    <div ref={ref} className={classNames} {...rest}>
      {collapsible ? (
        <button
          id={triggerId}
          type="button"
          className={styles.trigger}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setOpen(!open)}
        >
          {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
          <span className={styles.triggerLabel}>{label}</span>
          <svg
            className={[styles.chevron, isOpen ? styles.chevronOpen : ''].filter(Boolean).join(' ')}
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      ) : (
        <span id={triggerId} className={styles.staticLabel}>
          {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
          {label}
        </span>
      )}

      <div
        id={contentId}
        className={[styles.contentWrapper, isOpen ? styles.open : styles.closed].join(' ')}
        role="group"
        aria-labelledby={triggerId}
      >
        <ul className={styles.content}>
          {children}
        </ul>
      </div>
    </div>
  );
}


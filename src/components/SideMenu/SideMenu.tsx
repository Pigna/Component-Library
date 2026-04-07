import {type HTMLAttributes, type ReactNode, type Ref, useCallback, useContext, useEffect, useState} from 'react';
import styles from './SideMenu.module.scss';
import { SideMenuContext } from './SideMenuContext';
import { HamburgerMenuContext } from '../HamburgerMenu/HamburgerMenuContext';

export interface SideMenuProps extends HTMLAttributes<HTMLElement> {
  /** Ref forwarded to `<nav>`. */
  ref?: Ref<HTMLElement>;
  /** Accessible label for the nav. */
  ariaLabel?: string;
  /** Allow collapsing to icon-only mode. */
  collapsible?: boolean;
  /** Controlled collapsed state. */
  collapsed?: boolean;
  /** Called when collapsed state changes. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** `MenuItem` and `MenuItemGroup` children. */
  children: ReactNode;
}

/**
 * Sidebar navigation composed of MenuItems and MenuItemGroups.
 *
 * Hidden below the `lg` breakpoint — replaced by HamburgerMenu on mobile.
 * When `collapsible` is true, a toggle button appears to collapse the sidebar
 * to icon-only mode.
 *
 * @example
 * ```tsx
 * <SideMenu collapsible>
 *   <MenuItem href="/dashboard" icon={<DashIcon />} active>Dashboard</MenuItem>
 * </SideMenu>
 * ```
 */
export function SideMenu({
  ariaLabel = 'Side navigation',
  collapsible = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  children,
  className,
  ref,
  ...rest
}: SideMenuProps) {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(false);
  const isControlled = controlledCollapsed !== undefined;
  const insideHamburger = useContext(HamburgerMenuContext);

  /* Auto-collapse below the lg breakpoint (md–lg shows icon-only sidebar).
     Disabled inside HamburgerMenu panel where full labels are always shown. */
  const [autoCollapsed, setAutoCollapsed] = useState(() => {
    if (insideHamburger || typeof window === 'undefined') return false;
    return !(window.matchMedia?.('(min-width: 1024px)').matches ?? true);
  });

  useEffect(() => {
    if (insideHamburger) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setAutoCollapsed(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [insideHamburger]);

  const isCollapsed = isControlled
    ? controlledCollapsed
    : (uncontrolledCollapsed || autoCollapsed);

  const toggleCollapse = useCallback(() => {
    if (autoCollapsed) return; // ignore manual toggle when auto-collapsed by viewport
    const next = !isCollapsed;
    if (!isControlled) setUncontrolledCollapsed(next);
    onCollapsedChange?.(next);
  }, [autoCollapsed, isCollapsed, isControlled, onCollapsedChange]);

  const classNames = [
    styles.sideMenu,
    isCollapsed ? styles.collapsed : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <SideMenuContext.Provider value={{ isCollapsed }}>
      <nav ref={ref} className={classNames} aria-label={ariaLabel} {...rest}>
        {collapsible && !autoCollapsed && (
          <button
            type="button"
            className={styles.collapseToggle}
            onClick={toggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
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
              className={isCollapsed ? styles.chevronRight : styles.chevronLeft}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <ul className={styles.list}>
          {children}
        </ul>
      </nav>
    </SideMenuContext.Provider>
  );
}


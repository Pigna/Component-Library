import {type HTMLAttributes, type ReactNode, type Ref, useCallback, useState} from 'react';
import styles from './SideMenu.module.scss';

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
  const isCollapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed;

  const toggleCollapse = useCallback(() => {
    const next = !isCollapsed;
    if (!isControlled) setUncontrolledCollapsed(next);
    onCollapsedChange?.(next);
  }, [isCollapsed, isControlled, onCollapsedChange]);

  const classNames = [
    styles.sideMenu,
    isCollapsed ? styles.collapsed : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav ref={ref} className={classNames} aria-label={ariaLabel} {...rest}>
      {collapsible && (
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
      <ul className={styles.list} role="menu">
        {children}
      </ul>
    </nav>
  );
}


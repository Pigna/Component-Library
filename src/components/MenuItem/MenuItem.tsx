import type { HTMLAttributes, ReactNode, Ref } from 'react';
import styles from './MenuItem.module.scss';
import { useSideMenu } from '../SideMenu/SideMenuContext';

export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Ref forwarded to the `<li>`. */
  ref?: Ref<HTMLLIElement>;
  /** Renders as `<a>`. Omit for `<button>`. */
  href?: string;
  /** Leading icon. */
  icon?: ReactNode;
  /** Current page state. */
  active?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  /** Item label. */
  children: ReactNode;
}

/**
 * Single navigation item for use in menus. Renders as a link or button.
 *
 * @example
 * ```tsx
 * <MenuItem href="/dashboard" icon={<DashboardIcon />} active>
 *   Dashboard
 * </MenuItem>
 * ```
 */
export function MenuItem({
  href,
  icon,
  active = false,
  disabled = false,
  children,
  className,
  ref,
  ...rest
}: MenuItemProps) {
  const { isCollapsed } = useSideMenu();

  const classNames = [
    styles.item,
    active ? styles.active : '',
    disabled ? styles.disabled : '',
    isCollapsed ? styles.collapsed : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelText = typeof children === 'string' ? children : undefined;

  const content = (
    <>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.label}>{children}</span>
    </>
  );

  return (
    <li ref={ref} className={classNames} {...rest}>
      {href ? (
        <a
          href={href}
          className={styles.link}
          aria-current={active ? 'page' : undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          title={isCollapsed ? labelText : undefined}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          className={styles.link}
          aria-current={active ? 'page' : undefined}
          disabled={disabled}
          title={isCollapsed ? labelText : undefined}
        >
          {content}
        </button>
      )}
    </li>
  );
}


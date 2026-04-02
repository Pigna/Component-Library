import type { HTMLAttributes, ReactNode, Ref } from 'react';
import styles from './MenuItem.module.scss';

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
  const classNames = [
    styles.item,
    active ? styles.active : '',
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.label}>{children}</span>
    </>
  );

  return (
    <li ref={ref} className={classNames} role="none" {...rest}>
      {href ? (
        <a
          href={href}
          className={styles.link}
          role="menuitem"
          aria-current={active ? 'page' : undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          className={styles.link}
          role="menuitem"
          aria-current={active ? 'page' : undefined}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          {content}
        </button>
      )}
    </li>
  );
}


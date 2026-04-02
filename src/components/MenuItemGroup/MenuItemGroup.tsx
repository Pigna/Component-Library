import { type HTMLAttributes, type ReactNode, type Ref, useState, useId } from 'react';
import styles from './MenuItemGroup.module.scss';

export interface MenuItemGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container. */
  ref?: Ref<HTMLDivElement>;
  /** Group label (rendered as a button). */
  label: string;
  /** Initial expanded state. */
  defaultOpen?: boolean;
  /** Whether the group can be collapsed. */
  collapsible?: boolean;
  /** `MenuItem` children. */
  children: ReactNode;
}

/**
 * Collapsible group of MenuItems with a label/header.
 *
 * @example
 * ```tsx
 * <MenuItemGroup label="Settings">
 *   <MenuItem href="/profile">Profile</MenuItem>
 *   <MenuItem href="/security">Security</MenuItem>
 * </MenuItemGroup>
 * ```
 */
export function MenuItemGroup({
  label,
  defaultOpen = true,
  collapsible = true,
  children,
  className,
  ref,
  ...rest
}: MenuItemGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const triggerId = useId();
  const contentId = useId();
  const isOpen = collapsible ? open : true;

  const classNames = [styles.group, className].filter(Boolean).join(' ');

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
          <span className={styles.triggerLabel}>{label}</span>
          <span className={[styles.chevron, isOpen ? styles.chevronOpen : ''].filter(Boolean).join(' ')} aria-hidden="true">
            ▸
          </span>
        </button>
      ) : (
        <span id={triggerId} className={styles.staticLabel}>
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


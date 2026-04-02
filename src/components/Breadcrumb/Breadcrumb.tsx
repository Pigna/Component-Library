import { Children, type HTMLAttributes, type ReactNode, type Ref, isValidElement } from 'react';
import { TextLink } from '../TextLink';
import styles from './Breadcrumb.module.scss';

/* ---- BreadcrumbItem ---- */

export interface BreadcrumbItemProps {
  /** Link URL. Omit for the current (last) page. */
  href?: string;
  /** Item label. */
  children: ReactNode;
}

/**
 * A single breadcrumb entry. Used as a direct child of `<Breadcrumb>`.
 *
 * When `href` is provided, renders as a link. When omitted (current page),
 * renders as a `<span>` with `aria-current="page"`.
 */
export function BreadcrumbItem({ href, children }: BreadcrumbItemProps) {
  if (href) {
    return <TextLink href={href}>{children}</TextLink>;
  }

  return (
    <span className={styles.current} aria-current="page">
      {children}
    </span>
  );
}

/* ---- Breadcrumb ---- */

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Ref forwarded to `<nav>`. */
  ref?: Ref<HTMLElement>;
  /** Expects `BreadcrumbItem` children. */
  children: ReactNode;
  /** Custom separator between items. */
  separator?: ReactNode;
}

/**
 * Navigation breadcrumb trail composed of `BreadcrumbItem` children.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem href="/products">Products</BreadcrumbItem>
 *   <BreadcrumbItem>Current Page</BreadcrumbItem>
 * </Breadcrumb>
 * ```
 */
export function Breadcrumb({
  children,
  separator = '/',
  className,
  ref,
  ...rest
}: BreadcrumbProps) {
  const classNames = [styles.breadcrumb, className].filter(Boolean).join(' ');
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <nav ref={ref} className={classNames} aria-label="Breadcrumb" {...rest}>
      <ol className={styles.list}>
        {items.map((child, index) => (
          <li key={index} className={styles.entry}>
            {child}
            {index < items.length - 1 && (
              <span className={styles.separator} aria-hidden="true">
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}



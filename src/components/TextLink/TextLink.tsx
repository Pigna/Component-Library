import type { AnchorHTMLAttributes, ReactNode, Ref } from 'react';
import styles from './TextLink.module.scss';

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Ref forwarded to the underlying `<a>` element. */
  ref?: Ref<HTMLAnchorElement>;
  /** Adds `target="_blank"`, `rel="noopener noreferrer"`, and a screen-reader "(opens in new tab)" announcement. */
  external?: boolean;
  /** Link content. */
  children: ReactNode;
}

/**
 * A styled anchor component with external link support.
 *
 * When `external` is true, automatically adds `target="_blank"`,
 * `rel="noopener noreferrer"`, and a screen-reader-only "(opens in new tab)"
 * announcement for accessibility.
 *
 * @example
 * ```tsx
 * <TextLink href="/about">About us</TextLink>
 * <TextLink href="https://example.com" external>Visit Example</TextLink>
 * ```
 */
export function TextLink({
  external = false,
  children,
  className,
  ref,
  ...rest
}: TextLinkProps) {
  const classNames = [styles.textLink, className].filter(Boolean).join(' ');

  return (
    <a
      ref={ref}
      className={classNames}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      {...rest}
    >
      {children}
      {external && <span className={styles.srOnly}>(opens in new tab)</span>}
    </a>
  );
}


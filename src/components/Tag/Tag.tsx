import type { HTMLAttributes, Ref } from 'react';
import { CloseButton } from '../CloseButton';
import { TextLink } from '../TextLink';
import styles from './Tag.module.scss';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Ref forwarded to the container `<span>`. */
  ref?: Ref<HTMLSpanElement>;
  /** Tag text. */
  label: string;
  /** CSS color for background tint (rendered with low opacity). */
  color?: string;
  /** Makes the tag a link (renders label as an anchor via TextLink). */
  href?: string;
  /** Shows a remove × button. */
  removable?: boolean;
  /** Called when remove button is clicked. */
  onRemove?: () => void;
}

/**
 * Informational tag/chip with optional color, link, and remove action.
 *
 * @example
 * ```tsx
 * <Tag label="React" />
 * <Tag label="Docs" href="/docs" />
 * <Tag label="Removable" removable onRemove={handleRemove} />
 * <Tag label="Custom Color" color="#4d94ff" />
 * ```
 */
export function Tag({
  label,
  color,
  href,
  removable = false,
  onRemove,
  className,
  ref,
  style,
  ...rest
}: TagProps) {
  const classNames = [styles.tag, className].filter(Boolean).join(' ');
  const tagStyle = color
    ? { ...style, '--tag-color': color } as React.CSSProperties
    : style;

  return (
    <span
      ref={ref}
      className={classNames}
      style={tagStyle}
      {...rest}
    >
      {href ? (
        <TextLink href={href} className={styles.link}>
          {label}
        </TextLink>
      ) : (
        <span className={styles.label}>{label}</span>
      )}
      {removable && (
        <CloseButton
          size="sm"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          className={styles.remove}
        />
      )}
    </span>
  );
}


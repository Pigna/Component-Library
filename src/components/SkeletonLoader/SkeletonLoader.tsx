import type { HTMLAttributes, Ref } from 'react';
import styles from './SkeletonLoader.module.scss';

export type SkeletonVariant = 'text' | 'circle' | 'rectangle';

export interface SkeletonLoaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** Shape of the skeleton. */
  variant?: SkeletonVariant;
  /** CSS width. Defaults: text=`100%`, circle=`48px`, rectangle=`100%`. */
  width?: string;
  /** CSS height. Defaults: text=`1em`, circle=`48px`, rectangle=`200px`. */
  height?: string;
  /** Number of lines for the `text` variant. */
  lines?: number;
}

const defaultDimensions: Record<SkeletonVariant, { width: string; height: string }> = {
  text: { width: '100%', height: '1em' },
  circle: { width: '48px', height: '48px' },
  rectangle: { width: '100%', height: '200px' },
};

/**
 * Placeholder loading shapes with a pulse animation.
 *
 * Supports text (multi-line), circle, and rectangle variants. The pulse
 * animation is automatically disabled when `prefers-reduced-motion: reduce`
 * is active.
 *
 * @example
 * ```tsx
 * <SkeletonLoader variant="text" lines={3} />
 * <SkeletonLoader variant="circle" />
 * <SkeletonLoader variant="rectangle" height="120px" />
 * ```
 */
export function SkeletonLoader({
  variant = 'text',
  width,
  height,
  lines = 1,
  className,
  ref,
  ...rest
}: SkeletonLoaderProps) {
  const classNames = [styles.skeleton, className].filter(Boolean).join(' ');
  const defaults = defaultDimensions[variant];
  const resolvedWidth = width ?? defaults.width;
  const resolvedHeight = height ?? defaults.height;

  const lineCount = variant === 'text' ? Math.max(1, lines) : 1;

  return (
    <div
      ref={ref}
      className={classNames}
      role="status"
      aria-busy="true"
      {...rest}
    >
      <span className={styles.srOnly}>Loading…</span>
      {Array.from({ length: lineCount }, (_, i) => (
        <div
          key={i}
          className={[styles.shape, styles[variant]].join(' ')}
          aria-hidden="true"
          style={{
            width: i === lineCount - 1 && lineCount > 1 ? '75%' : resolvedWidth,
            height: resolvedHeight,
          }}
        />
      ))}
    </div>
  );
}


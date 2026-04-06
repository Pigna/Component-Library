import { type InputHTMLAttributes, type MutableRefObject, type Ref, useEffect, useRef, useCallback } from 'react';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Ref forwarded to the `<input>`. */
  ref?: Ref<HTMLInputElement>;
  /** Checkbox label. */
  label: string;
  /** Error message. */
  error?: string;
  /** Indeterminate state (e.g. "select all" partially checked). */
  indeterminate?: boolean;
}

/**
 * Custom-styled checkbox with indeterminate support.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" required />
 * <Checkbox label="Select all" indeterminate />
 * ```
 */
export function Checkbox({
  label,
  error,
  indeterminate = false,
  id,
  className,
  ref,
  ...rest
}: CheckboxProps) {
  const inputId = id ?? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const internalRef = useRef<HTMLInputElement | null>(null);

  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object') {
        (ref as MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [ref],
  );

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ');
  const inputClasses = [styles.checkbox, error ? styles.error : '']
    .filter(Boolean)
    .join(' ');

  const ariaChecked = indeterminate ? 'mixed' : undefined;
  const errorId = `${inputId}-error`;

  return (
    <div className={wrapperClasses}>
      <label className={styles.label} htmlFor={inputId}>
        <input
          ref={setRef}
          id={inputId}
          type="checkbox"
          className={inputClasses}
          aria-checked={ariaChecked}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        <span className={styles.labelText}>{label}</span>
      </label>
      {error && (
        <span id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}


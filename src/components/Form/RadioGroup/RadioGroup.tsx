import type { FieldsetHTMLAttributes, Ref } from 'react';
import styles from './RadioGroup.module.scss';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'type' | 'onChange'> {
  /** Ref forwarded to the `<fieldset>`. */
  ref?: Ref<HTMLFieldSetElement>;
  /** Group label rendered as `<legend>`. */
  legend: string;
  /** Shared `name` attribute for all radios. */
  name: string;
  /** Radio options. */
  options: RadioOption[];
  /** Controlled selected value. */
  value?: string;
  /** Called when selection changes. */
  onChange?: (value: string) => void;
  /** Error message. */
  error?: string;
  /** Layout direction. */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Group of radio buttons in a native `<fieldset>` with `<legend>`.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   legend="Preferred contact"
 *   name="contact"
 *   options={[
 *     { value: 'email', label: 'Email' },
 *     { value: 'phone', label: 'Phone' },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 */
export function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  orientation = 'vertical',
  className,
  ref,
  ...rest
}: RadioGroupProps) {
  const errorId = `${name}-error`;
  const classNames = [styles.fieldset, className].filter(Boolean).join(' ');
  const groupClasses = [styles.group, styles[orientation]].join(' ');

  return (
    <fieldset
      ref={ref}
      className={classNames}
      aria-invalid={!!error || undefined}
      aria-describedby={error ? errorId : undefined}
      {...rest}
    >
      <legend className={styles.legend}>{legend}</legend>
      <div className={groupClasses}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={[styles.option, opt.disabled ? styles.disabled : '']
              .filter(Boolean)
              .join(' ')}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value !== undefined ? value === opt.value : undefined}
              disabled={opt.disabled}
              onChange={() => onChange?.(opt.value)}
              className={styles.radio}
              aria-describedby={error ? errorId : undefined}
            />
            <span className={styles.label}>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </fieldset>
  );
}


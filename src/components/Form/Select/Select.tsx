import type { SelectHTMLAttributes, Ref } from 'react';
import { FormField, useFormField } from '../FormField';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Ref forwarded to the `<select>`. */
  ref?: Ref<HTMLSelectElement>;
  /** Select label. */
  label: string;
  /** Dropdown options. */
  options: SelectOption[];
  /** Disabled first option text. */
  placeholder?: string;
  /** Error message. */
  error?: string;
  /** Helper text. */
  helperText?: string;
}

/**
 * Native dropdown select wrapped by FormField.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   placeholder="Select a country…"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'nl', label: 'Netherlands' },
 *   ]}
 * />
 * ```
 */
export function Select({
  label,
  options,
  placeholder,
  error,
  helperText,
  required,
  id,
  className,
  ref,
  ...rest
}: SelectProps) {
  const inputId = id ?? `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <FormField
      label={label}
      htmlFor={inputId}
      error={error}
      helperText={helperText}
      required={required}
    >
      <SelectInner
        ref={ref}
        id={inputId}
        options={options}
        placeholder={placeholder}
        required={required}
        className={className}
        {...rest}
      />
    </FormField>
  );
}

function SelectInner({
  ref,
  options,
  placeholder,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  ref?: Ref<HTMLSelectElement>;
  options: SelectOption[];
  placeholder?: string;
}) {
  const { errorId, helperId, hasError } = useFormField();

  const describedBy = [hasError ? errorId : helperId].filter(Boolean).join(' ') || undefined;

  const classNames = [styles.select, hasError ? styles.error : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <select
      ref={ref}
      className={classNames}
      aria-invalid={hasError || undefined}
      aria-describedby={describedBy}
      {...props}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}


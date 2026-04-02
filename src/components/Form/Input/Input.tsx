import type { InputHTMLAttributes, Ref } from 'react';
import { FormField, useFormField } from '../FormField';
import styles from './Input.module.scss';

export type InputType = 'text' | 'email' | 'url' | 'tel' | 'number' | 'password';

const builtInPatterns: Partial<Record<InputType, string>> = {
  email: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}",
  url: "https?://.+",
  tel: "[+]?[\\d\\s\\-().]+",
};

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Ref forwarded to the `<input>`. */
  ref?: Ref<HTMLInputElement>;
  /** Input label (passed to FormField). */
  label: string;
  /** Maps to native `type`. */
  inputType?: InputType;
  /** Error message. */
  error?: string;
  /** Helper text. */
  helperText?: string;
}

/**
 * Text input with built-in validation patterns, wrapped by FormField.
 *
 * @example
 * ```tsx
 * <Input label="Email" inputType="email" required />
 * <Input label="Website" inputType="url" error="Invalid URL" />
 * ```
 */
export function Input({
  label,
  inputType = 'text',
  error,
  helperText,
  required,
  id,
  className,
  pattern,
  ref,
  ...rest
}: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const resolvedPattern = pattern ?? builtInPatterns[inputType];

  return (
    <FormField
      label={label}
      htmlFor={inputId}
      error={error}
      helperText={helperText}
      required={required}
    >
      <InputInner
        ref={ref}
        id={inputId}
        type={inputType}
        pattern={resolvedPattern}
        required={required}
        className={className}
        {...rest}
      />
    </FormField>
  );
}

/** Inner input that reads FormField context for ARIA wiring. */
function InputInner({
  ref,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }) {
  const { errorId, helperId, hasError } = useFormField();

  const describedBy = [hasError ? errorId : helperId].filter(Boolean).join(' ') || undefined;

  const classNames = [styles.input, hasError ? styles.error : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <input
      ref={ref}
      className={classNames}
      aria-invalid={hasError || undefined}
      aria-describedby={describedBy}
      {...props}
    />
  );
}


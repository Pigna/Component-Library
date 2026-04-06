import type { InputHTMLAttributes, Ref } from 'react';
import { useId } from 'react';
import { FormField, useFormField } from '../FormField';
import styles from './Input.module.scss';

export type InputType = 'text' | 'email' | 'url' | 'tel' | 'number' | 'password';

const builtInPatterns: Partial<Record<InputType, string>> = {
  email: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}",
  url: "https?://.+",
  tel: "[+]?[\\d\\s\\-().]+",
};

/** Shown as the browser tooltip / validation message when a built-in pattern is used. */
const builtInTitles: Partial<Record<InputType, string>> = {
  email: 'Enter a valid email address (e.g. name@example.com)',
  url: 'Enter a full URL starting with http:// or https://',
  tel: 'Enter a phone number (e.g. +1 555 123 4567)',
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
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const resolvedPattern = pattern ?? builtInPatterns[inputType];
  // Only attach a title for built-in patterns — consumer-provided patterns should supply their own title.
  const resolvedTitle = !pattern ? builtInTitles[inputType] : undefined;

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
        title={resolvedTitle}
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
  const { errorId, helperId, hasError, hasHelper } = useFormField();

  const describedBy =
    [hasError ? errorId : null, hasHelper ? helperId : null].filter(Boolean).join(' ') || undefined;

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


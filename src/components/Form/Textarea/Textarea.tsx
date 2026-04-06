import type { TextareaHTMLAttributes, Ref } from 'react';
import { useId, useState } from 'react';
import { FormField, useFormField } from '../FormField';
import styles from './Textarea.module.scss';

export type TextareaResize = 'none' | 'vertical' | 'both';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Ref forwarded to the `<textarea>`. */
  ref?: Ref<HTMLTextAreaElement>;
  /** Textarea label. */
  label: string;
  /** Error message. */
  error?: string;
  /** Helper text. */
  helperText?: string;
  /** CSS resize behavior. */
  resize?: TextareaResize;
}

/**
 * Multi-line text input with optional character count, wrapped by FormField.
 *
 * @example
 * ```tsx
 * <Textarea label="Bio" maxLength={200} helperText="Brief description" />
 * ```
 */
export function Textarea({
  label,
  error,
  helperText,
  resize = 'vertical',
  required,
  id,
  className,
  ref,
  ...rest
}: TextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <FormField
      label={label}
      htmlFor={inputId}
      error={error}
      helperText={helperText}
      required={required}
    >
      <TextareaInner
        ref={ref}
        id={inputId}
        resize={resize}
        required={required}
        className={className}
        {...rest}
      />
    </FormField>
  );
}

/** Returns the character length of a textarea value regardless of its type. */
function getLength(v: string | ReadonlyArray<string> | number | undefined): number {
  if (typeof v === 'string') return v.length;
  if (typeof v === 'number') return String(v).length;
  return 0;
}

function TextareaInner({
  ref,
  resize = 'vertical',
  className,
  maxLength,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: Ref<HTMLTextAreaElement>;
  resize?: TextareaResize;
}) {
  const { errorId, helperId, hasError, hasHelper } = useFormField();

  const describedBy =
    [hasError ? errorId : null, hasHelper ? helperId : null].filter(Boolean).join(' ') || undefined;

  const classNames = [styles.textarea, hasError ? styles.error : '', className]
    .filter(Boolean)
    .join(' ');

  // For uncontrolled usage, track length in local state via onChange.
  // For controlled usage, derive length directly from the value prop — no effect needed.
  const [uncontrolledLength, setUncontrolledLength] = useState<number>(() =>
    getLength(defaultValue),
  );
  const displayLength = value !== undefined ? getLength(value) : uncontrolledLength;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) {
      setUncontrolledLength(e.target.value.length);
    }
    onChange?.(e);
  };

  return (
    <div className={styles.wrapper}>
      <textarea
        ref={ref}
        className={classNames}
        style={{ resize }}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...props}
      />
      {maxLength != null && (
        <span className={styles.charCount} aria-live="polite">
          {displayLength} of {maxLength}
        </span>
      )}
    </div>
  );
}

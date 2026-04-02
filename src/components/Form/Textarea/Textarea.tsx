import type { TextareaHTMLAttributes, Ref } from 'react';
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
  const inputId = id ?? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

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

function TextareaInner({
  ref,
  resize = 'vertical',
  className,
  maxLength,
  value,
  defaultValue,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: Ref<HTMLTextAreaElement>;
  resize?: TextareaResize;
}) {
  const { errorId, helperId, hasError } = useFormField();

  const describedBy = [hasError ? errorId : helperId].filter(Boolean).join(' ') || undefined;

  const classNames = [styles.textarea, hasError ? styles.error : '', className]
    .filter(Boolean)
    .join(' ');

  const currentLength =
    typeof value === 'string'
      ? value.length
      : typeof defaultValue === 'string'
        ? defaultValue.length
        : undefined;

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
        {...props}
      />
      {maxLength != null && currentLength != null && (
        <span className={styles.charCount} aria-live="polite">
          {currentLength}/{maxLength}
        </span>
      )}
    </div>
  );
}


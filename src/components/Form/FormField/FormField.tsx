import { createContext, useContext, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import styles from './FormField.module.scss';

/* ---- Context ---- */

interface FormFieldContextValue {
  inputId: string;
  errorId: string;
  helperId: string;
  hasError: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/**
 * Hook for child input components to access FormField ARIA wiring.
 * Returns `{ inputId, errorId, helperId, hasError }`.
 */
export function useFormField() {
  const ctx = useContext(FormFieldContext);
  if (!ctx) {
    throw new Error('useFormField must be used within a <FormField>');
  }
  return ctx;
}

/* ---- FormField ---- */

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** Label text. */
  label: string;
  /** ID of the associated input element. */
  htmlFor: string;
  /** Error message (shown below input in red). */
  error?: string;
  /** Helper/description text (shown below input). */
  helperText?: string;
  /** Show required indicator (*) after label. */
  required?: boolean;
  /** The input element. */
  children: ReactNode;
}

/**
 * Wrapper that links a label, input, error message, and helper text via ARIA.
 *
 * Provides a `useFormField()` context hook that child inputs use to wire
 * `aria-describedby`, `aria-invalid`, etc. automatically.
 *
 * @example
 * ```tsx
 * <FormField label="Email" htmlFor="email" error={errors.email} required>
 *   <input id="email" type="email" />
 * </FormField>
 * ```
 */
export function FormField({
  label,
  htmlFor,
  error,
  helperText,
  required = false,
  children,
  className,
  ref,
  ...rest
}: FormFieldProps) {
  const errorId = `${htmlFor}-error`;
  const helperId = `${htmlFor}-helper`;
  const hasError = !!error;

  const classNames = [styles.field, className].filter(Boolean).join(' ');

  const contextValue: FormFieldContextValue = {
    inputId: htmlFor,
    errorId,
    helperId,
    hasError,
  };

  return (
    <FormFieldContext value={contextValue}>
      <div ref={ref} className={classNames} {...rest}>
        <label htmlFor={htmlFor} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>

        {children}

        {error && (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={helperId} className={styles.helper}>
            {helperText}
          </span>
        )}
      </div>
    </FormFieldContext>
  );
}


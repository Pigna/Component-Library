import type { InputHTMLAttributes, Ref } from 'react';
import { useId, useState } from 'react';
import styles from './Toggle.module.scss';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Ref forwarded to the `<input>`. */
  ref?: Ref<HTMLInputElement>;
  /** Accessible label. */
  label: string;
  /** Text shown when on (optional). */
  onText?: string;
  /** Text shown when off (optional). */
  offText?: string;
  /** Validation error message. */
  error?: string;
}

/**
 * Toggle/switch input with optional on/off labels and error support.
 *
 * Uses `role="switch"` for proper screen-reader semantics.
 * Supports both controlled (`checked`) and uncontrolled (`defaultChecked`) usage —
 * `aria-checked` always reflects the true current state.
 *
 * @example
 * ```tsx
 * <Toggle label="Dark mode" />
 * <Toggle label="Notifications" onText="On" offText="Off" />
 * <Toggle label="Agree to terms" error="You must accept the terms" />
 * ```
 */
export function Toggle({
  label,
  onText,
  offText,
  error,
  id,
  className,
  ref,
  checked,
  defaultChecked,
  onChange,
  ...rest
}: ToggleProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  // For uncontrolled usage, track the actual checked state internally so that
  // aria-checked and the state text always reflect reality after user interaction.
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isOn = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <label htmlFor={inputId} className={styles.label}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          aria-checked={isOn}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          className={styles.input}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          {...rest}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
        <span className={styles.labelText}>{label}</span>
      </label>
      {(onText || offText) && (
        <span className={styles.stateText} aria-hidden="true">
          {isOn ? onText : offText}
        </span>
      )}
      {error && (
        <span id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}


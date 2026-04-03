import type { InputHTMLAttributes, Ref } from 'react';
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
}

/**
 * Toggle/switch input with optional on/off labels.
 *
 * Uses `role="switch"` for proper screen-reader semantics.
 *
 * @example
 * ```tsx
 * <Toggle label="Dark mode" />
 * <Toggle label="Notifications" onText="On" offText="Off" />
 * ```
 */
export function Toggle({
  label,
  onText,
  offText,
  id,
  className,
  ref,
  checked,
  defaultChecked,
  ...rest
}: ToggleProps) {
  const inputId = id ?? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const isOn = checked ?? defaultChecked ?? false;

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
          className={styles.input}
          checked={checked}
          defaultChecked={defaultChecked}
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
    </div>
  );
}


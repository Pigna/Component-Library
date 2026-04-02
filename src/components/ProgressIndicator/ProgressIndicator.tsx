import type { HTMLAttributes, Ref } from 'react';
import styles from './ProgressIndicator.module.scss';

export type ProgressVariant = 'bar' | 'circle';
export type ProgressDisplayMode = 'percentage' | 'steps';

export interface ProgressIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** Visual shape. */
  variant?: ProgressVariant;
  /** Current progress (0–100). */
  value: number;
  /** Maximum value. */
  max?: number;
  /** How to show progress text. */
  displayMode?: ProgressDisplayMode;
  /** Current step (required when displayMode='steps'). */
  currentStep?: number;
  /** Total steps (required when displayMode='steps'). */
  totalSteps?: number;
  /** Accessible label for the progress bar. */
  label?: string;
}

const CIRCLE_RADIUS = 40;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

/**
 * Progress display in bar or circle form with percentage or step count.
 *
 * @example
 * ```tsx
 * <ProgressIndicator value={65} label="Upload progress" />
 * <ProgressIndicator variant="circle" value={75} />
 * <ProgressIndicator value={2} displayMode="steps" currentStep={2} totalSteps={5} />
 * ```
 */
export function ProgressIndicator({
  variant = 'bar',
  value,
  max = 100,
  displayMode = 'percentage',
  currentStep,
  totalSteps,
  label,
  className,
  ref,
  ...rest
}: ProgressIndicatorProps) {
  const clampedValue = Math.min(Math.max(0, value), max);
  const percentage = Math.round((clampedValue / max) * 100);

  const displayText =
    displayMode === 'steps' && currentStep != null && totalSteps != null
      ? `${currentStep} / ${totalSteps}`
      : `${percentage}%`;

  const classNames = [styles.container, className].filter(Boolean).join(' ');

  if (variant === 'circle') {
    const offset = CIRCLE_CIRCUMFERENCE - (percentage / 100) * CIRCLE_CIRCUMFERENCE;
    return (
      <div
        ref={ref}
        className={classNames}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        {...rest}
      >
        <div className={styles.circleWrapper}>
          <svg className={styles.circleSvg} viewBox="0 0 100 100">
            <circle
              className={styles.circleTrack}
              cx="50"
              cy="50"
              r={CIRCLE_RADIUS}
              fill="none"
              strokeWidth="8"
            />
            <circle
              className={styles.circleFill}
              cx="50"
              cy="50"
              r={CIRCLE_RADIUS}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <span className={styles.circleText}>{displayText}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={classNames}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      {...rest}
    >
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={styles.barText}>{displayText}</span>
    </div>
  );
}


import type { FieldsetHTMLAttributes, Ref } from 'react';
import styles from './FormGroup.module.scss';

export interface FormGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Ref forwarded to the `<fieldset>`. */
  ref?: Ref<HTMLFieldSetElement>;
  /** Legend text — displayed as the group heading. */
  title: string;
  /** Optional description rendered below the legend. */
  description?: string;
}

/**
 * Semantic grouping of related form controls using `<fieldset>` + `<legend>`.
 *
 * Use inside a `<FormSection>` to build structured multi-group forms.
 *
 * @example
 * ```tsx
 * <FormGroup title="Personal Information" description="Required fields are marked *">
 *   <Input label="First name" required />
 *   <Input label="Last name" required />
 * </FormGroup>
 * ```
 */
export function FormGroup({
  title,
  description,
  children,
  className,
  ref,
  ...rest
}: FormGroupProps) {
  const classNames = [styles.group, className].filter(Boolean).join(' ');

  return (
    <fieldset ref={ref} className={classNames} {...rest}>
      <legend className={styles.legend}>{title}</legend>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.fields}>{children}</div>
    </fieldset>
  );
}

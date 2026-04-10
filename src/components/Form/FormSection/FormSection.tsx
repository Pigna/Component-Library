import type { HTMLAttributes, Ref } from 'react';
import { useId } from 'react';
import styles from './FormSection.module.scss';

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface FormSectionProps extends HTMLAttributes<HTMLElement> {
  /** Ref forwarded to the `<section>` element. */
  ref?: Ref<HTMLElement>;
  /** Section heading text. */
  title: string;
  /** Optional description rendered below the heading. */
  description?: string;
  /**
   * Heading level for the section title.
   * @default 3
   */
  headingLevel?: HeadingLevel;
}

/**
 * A named section that groups one or more `<FormGroup>` components.
 *
 * Use multiple `<FormSection>` components inside a `<TabPanel>` to split
 * a long form into logical pages.
 *
 * @example
 * ```tsx
 * <FormSection title="Account Settings" description="Manage your preferences">
 *   <FormGroup title="Profile">...</FormGroup>
 *   <FormGroup title="Security">...</FormGroup>
 * </FormSection>
 * ```
 */
export function FormSection({
  title,
  description,
  headingLevel = 3,
  children,
  className,
  ref,
  ...rest
}: FormSectionProps) {
  const headingId = useId();
  const classNames = [styles.section, className].filter(Boolean).join(' ');
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <section ref={ref} className={classNames} aria-labelledby={headingId} {...rest}>
      <div className={styles.header}>
        <Heading id={headingId} className={styles.title}>{title}</Heading>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

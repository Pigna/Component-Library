import {
  type ReactElement,
  type ReactNode,
  type Ref,
  type HTMLAttributes,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  cloneElement,
} from 'react';
import styles from './Popover.module.scss';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Ref forwarded to the popover panel. */
  ref?: Ref<HTMLDivElement>;
  /** The element that anchors the popover. */
  trigger: ReactElement;
  /** Content rendered inside the popover panel. */
  content: ReactNode;
  /** Interaction mode. */
  triggerOn?: 'click' | 'hover';
  /** Preferred position relative to trigger. */
  placement?: PopoverPlacement;
  /** Controlled open state. */
  open?: boolean;
  /** Called when open state should change. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Floating content panel triggered by click or hover.
 *
 * Supports both controlled (`open` + `onOpenChange`) and uncontrolled usage.
 * Click mode closes on Escape and outside click. Hover mode closes on mouse
 * leave (with delay) and on Escape.
 *
 * @example
 * ```tsx
 * <Popover
 *   trigger={<Button>Show info</Button>}
 *   content={<p>Some extra details here.</p>}
 * />
 * ```
 */
export function Popover({
  trigger,
  content,
  triggerOn = 'click',
  placement = 'bottom',
  open: controlledOpen,
  onOpenChange,
  className,
  ref,
  ...rest
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const panelId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  /* Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  /* Outside click (click mode) */
  useEffect(() => {
    if (!isOpen || triggerOn !== 'click') return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, triggerOn, close]);

  /* Focus first focusable element in panel on open */
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const focusable = panelRef.current.querySelector<HTMLElement>(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
  }, [isOpen]);

  /* Hover handlers */
  const handleMouseEnter = useCallback(() => {
    if (triggerOn !== 'hover') return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpen(true);
  }, [triggerOn, setOpen]);

  const handleMouseLeave = useCallback(() => {
    if (triggerOn !== 'hover') return;
    hoverTimeoutRef.current = setTimeout(() => setOpen(false), 200);
  }, [triggerOn, setOpen]);

  /* Cleanup hover timeout */
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const triggerProps: Record<string, unknown> = {
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog' as const,
    'aria-controls': panelId,
  };

  if (triggerOn === 'click') {
    triggerProps.onClick = toggle;
  }

  const classNames = [styles.container, className].filter(Boolean).join(' ');
  const panelClassNames = [styles.panel, styles[placement]].filter(Boolean).join(' ');

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref && typeof ref === 'object') {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className={classNames}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {cloneElement(trigger, triggerProps)}
      {isOpen && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          className={panelClassNames}
        >
          {content}
        </div>
      )}
    </div>
  );
}


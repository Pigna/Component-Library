import {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type RefObject,
  type ReactNode,
  type Ref,
} from 'react';
import styles from './Tabs.module.scss';

/* ---- Context ---- */

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  registerTab: (id: string) => void;
  tabIds: RefObject<string[]>;
  /** Stable prefix generated once per Tabs instance — shared by Tab and TabPanel
   *  so aria-controls / aria-labelledby IDs always match. */
  instanceId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab/TabList/TabPanel must be used within a <Tabs>');
  return ctx;
}

/* ---- Tabs (root) ---- */

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** Uncontrolled: the tab id that is active on first render. */
  defaultTab?: string;
  /** Controlled: the currently active tab id. */
  activeTab?: string;
  /** Controlled: called when the active tab changes. */
  onTabChange?: (id: string) => void;
  children: ReactNode;
}

/**
 * Root component of the Tabs compound. Manages active tab state and provides
 * context to `TabList`, `Tab`, and `TabPanel`.
 *
 * Supports both **uncontrolled** (`defaultTab`) and **controlled**
 * (`activeTab` + `onTabChange`) usage.
 *
 * @example
 * ```tsx
 * <Tabs defaultTab="profile">
 *   <TabList>
 *     <Tab id="profile">Profile</Tab>
 *     <Tab id="security">Security</Tab>
 *   </TabList>
 *   <TabPanel id="profile"><FormSection title="Profile">...</FormSection></TabPanel>
 *   <TabPanel id="security"><FormSection title="Security">...</FormSection></TabPanel>
 * </Tabs>
 * ```
 */
export function Tabs({
  defaultTab,
  activeTab: controlledTab,
  onTabChange,
  children,
  className,
  ref,
  ...rest
}: TabsProps) {
  const instanceId = useId();
  const tabIds = useRef<string[]>([]);
  const [internalTab, setInternalTab] = useState(defaultTab ?? '');

  const isControlled = controlledTab !== undefined;
  const activeTab = isControlled ? controlledTab : internalTab;

  const setActiveTab = (id: string) => {
    if (!isControlled) setInternalTab(id);
    onTabChange?.(id);
  };

  const registerTab = (id: string) => {
    if (!tabIds.current.includes(id)) {
      tabIds.current.push(id);
      // Set first registered tab as active if none is set
      if (!isControlled && !internalTab) {
        setInternalTab(id);
      }
    }
  };

  const classNames = [styles.tabs, className].filter(Boolean).join(' ');

  return (
    <TabsContext value={{ activeTab, setActiveTab, registerTab, tabIds, instanceId }}>
      <div ref={ref} className={classNames} {...rest}>
        {children}
      </div>
    </TabsContext>
  );
}

/* ---- TabList ---- */

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the `<div role="tablist">`. */
  ref?: Ref<HTMLDivElement>;
  /** Accessible label for the tab list (e.g. "Form sections"). */
  'aria-label'?: string;
  children: ReactNode;
}

/**
 * Container for `<Tab>` components. Renders as `role="tablist"`.
 *
 * @example
 * ```tsx
 * <TabList aria-label="Form sections">
 *   <Tab id="profile">Profile</Tab>
 *   <Tab id="security">Security</Tab>
 * </TabList>
 * ```
 */
export function TabList({ children, className, ref, ...rest }: TabListProps) {
  const classNames = [styles.tabList, className].filter(Boolean).join(' ');
  return (
    <div ref={ref} role="tablist" className={classNames} {...rest}>
      {children}
    </div>
  );
}

/* ---- Tab ---- */

export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'id'> {
  /** Ref forwarded to the `<button>`. */
  ref?: Ref<HTMLButtonElement>;
  /** Unique tab identifier — must match the corresponding `<TabPanel id>`. */
  id: string;
  /** Disables the tab. */
  disabled?: boolean;
  children: ReactNode;
}

/**
 * An individual tab button. Must be a direct child of `<TabList>`.
 *
 * Keyboard navigation:
 * - `ArrowLeft` / `ArrowRight` — move focus between tabs (skips disabled tabs)
 * - `Home` — focus first enabled tab
 * - `End` — focus last enabled tab
 * - `Enter` / `Space` — activate focused tab (native button behaviour)
 */
export function Tab({ id, disabled = false, children, className, ref, ...rest }: TabProps) {
  const { activeTab, setActiveTab, registerTab, tabIds, instanceId } = useTabsContext();

  // IDs derived from the shared instanceId so Tab and TabPanel always agree
  const buttonId = `tab-${instanceId}-${id}`;
  const panelId = `tabpanel-${instanceId}-${id}`;

  registerTab(id);

  const isActive = activeTab === id;
  const classNames = [styles.tab, isActive ? styles.active : '', className].filter(Boolean).join(' ');

  const isTabDisabled = (tabId: string) => {
    const btn = document.querySelector<HTMLButtonElement>(`[data-tab-id="${tabId}"]`);
    return btn?.disabled ?? false;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const ids = tabIds.current;
    const currentIndex = ids.indexOf(id);

    const findNext = (startIdx: number, direction: 1 | -1): number | null => {
      for (let i = 1; i < ids.length; i++) {
        const idx = (startIdx + direction * i + ids.length) % ids.length;
        if (!isTabDisabled(ids[idx])) return idx;
      }
      return null;
    };

    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') nextIndex = findNext(currentIndex, 1);
    else if (e.key === 'ArrowLeft') nextIndex = findNext(currentIndex, -1);
    else if (e.key === 'Home') nextIndex = ids.findIndex((tid) => !isTabDisabled(tid));
    else if (e.key === 'End') {
      for (let i = ids.length - 1; i >= 0; i--) {
        if (!isTabDisabled(ids[i])) { nextIndex = i; break; }
      }
    }

    if (nextIndex !== null && nextIndex >= 0) {
      e.preventDefault();
      const nextId = ids[nextIndex];
      setActiveTab(nextId);
      document.querySelector<HTMLButtonElement>(`[data-tab-id="${nextId}"]`)?.focus();
    }

    rest.onKeyDown?.(e);
  };

  return (
    <button
      ref={ref}
      id={buttonId}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={classNames}
      onClick={() => !disabled && setActiveTab(id)}
      onKeyDown={handleKeyDown}
      data-tab-id={id}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---- TabPanel ---- */

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the `<div role="tabpanel">`. */
  ref?: Ref<HTMLDivElement>;
  /** Must match the `id` of the corresponding `<Tab>`. */
  id: string;
  children: ReactNode;
}

/**
 * Content panel associated with a `<Tab>`. Only renders when its tab is active.
 *
 * @example
 * ```tsx
 * <TabPanel id="profile">
 *   <FormSection title="Profile">...</FormSection>
 * </TabPanel>
 * ```
 */
export function TabPanel({ id, children, className, ref, ...rest }: TabPanelProps) {
  const { activeTab, instanceId } = useTabsContext();

  // IDs derived from the shared instanceId — must mirror what Tab produces
  const panelId = `tabpanel-${instanceId}-${id}`;
  const buttonId = `tab-${instanceId}-${id}`;

  if (activeTab !== id) return null;

  const classNames = [styles.tabPanel, className].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      id={panelId}
      role="tabpanel"
      aria-labelledby={buttonId}
      tabIndex={0}
      className={classNames}
      {...rest}
    >
      {children}
    </div>
  );
}


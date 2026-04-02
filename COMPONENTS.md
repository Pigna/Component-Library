# Component Specifications

> **Auto-generated reference for @pigna/component-library**
> Every component follows the same folder convention, uses SCSS Modules with CSS custom properties from `_tokens.scss`, and is WCAG 2.2 AA compliant.

---

## Table of Contents

- [Conventions](#conventions)
- [Build Order](#build-order)
- [Phase 1 — Leaf Components](#phase-1--leaf-components)
  - [CloseButton](#closebutton)
  - [TextLink](#textlink)
  - [Spinner](#spinner)
  - [SkeletonLoader](#skeletonloader)
  - [NotificationBadge](#notificationbadge)
  - [ProfilePicture](#profilepicture)
- [Phase 2 — Composite Components](#phase-2--composite-components)
  - [Banner](#banner)
  - [Dialog](#dialog)
  - [Tag](#tag)
  - [Breadcrumb](#breadcrumb)
  - [Popover](#popover)
  - [ProgressIndicator](#progressindicator)
- [Phase 3 — Form Components](#phase-3--form-components)
  - [FormField](#formfield)
  - [Input](#input)
  - [Textarea](#textarea)
  - [Select](#select)
  - [Checkbox](#checkbox)
  - [RadioGroup](#radiogroup)
  - [Toggle](#toggle)
- [Phase 4 — Navigation & Notifications](#phase-4--navigation--notifications)
  - [MenuItem](#menuitem)
  - [MenuItemGroup](#menuitemgroup)
  - [SideMenu](#sidemenu)
  - [HamburgerMenu](#hamburgermenu)
  - [NotificationPopup](#notificationpopup)
- [Phase 5 — Documentation](#phase-5--documentation)
  - [ThemeColors](#themecolors)
  - [Tables](#tables)

---

## Conventions

### Folder structure per component

```
src/components/ComponentName/
  ├── ComponentName.tsx            # Component with typed props, JSDoc, ARIA
  ├── ComponentName.module.scss    # Scoped styles using CSS custom properties
  ├── ComponentName.stories.tsx    # Storybook stories with controls + a11y
  ├── ComponentName.test.tsx       # Vitest + Testing Library tests
  └── index.ts                     # Named re-export
```

### Form components are grouped

```
src/components/Form/
  ├── FormField/
  ├── Input/
  ├── Textarea/
  ├── Select/
  ├── Checkbox/
  ├── RadioGroup/
  ├── Toggle/
  └── index.ts                     # Barrel re-export for all form components
```

### Props pattern

- Extend native HTML attributes where possible (e.g. `ButtonHTMLAttributes<HTMLButtonElement>`)
- Always include `ref?: Ref<HTMLElement>` (React 19 — no `forwardRef` needed)
- Use JSDoc comments on every prop
- Export the interface and any union types

### Styling pattern

- Import `@use '../../styles/mixins' as *;` in every `.module.scss`
- Use CSS custom properties from `_tokens.scss` (never hardcode colors, spacing, etc.)
- Use `@include focus-ring` on all interactive elements
- Use `@include sr-only` for screen-reader-only text
- Use `@include reduced-motion` to disable animations for users who prefer it
- Use `@include breakpoint-sm/md/lg/xl` for mobile-first responsive styles

### Storybook pattern

- Import types from `@storybook/react-vite`
- Use `tags: ['autodocs']` for auto-generated docs
- Create individual stories for each variant/state
- Create a composite "All Variants" story

### Test pattern

- Use `vitest` + `@testing-library/react` + `@testing-library/user-event`
- Test: renders correctly, ARIA attributes present, keyboard interaction, event callbacks, disabled/loading states

---

## Build Order

Components are built in dependency order. Phase 1 components have no internal dependencies. Each subsequent phase may depend on components from prior phases.

| Phase | Components | Reason |
|-------|-----------|--------|
| 1 | CloseButton, TextLink, Spinner, SkeletonLoader, NotificationBadge, ProfilePicture | Leaf nodes — no internal deps |
| 2 | Banner, Dialog, Tag, Breadcrumb, Popover, ProgressIndicator | Use Phase 1 components |
| 3 | FormField, Input, Textarea, Select, Checkbox, RadioGroup, Toggle | Grouped form elements |
| 4 | MenuItem, MenuItemGroup, SideMenu, HamburgerMenu, NotificationPopup | Navigation + notifications |
| 5 | ThemeColors | Storybook-only documentation page |

---

## Phase 1 — Leaf Components

### CloseButton

> Reusable close/dismiss button with an × icon. Used by Dialog, Banner, NotificationPopup, Tag.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/CloseButton/` |
| **Extends** | `ButtonHTMLAttributes<HTMLButtonElement>` |
| **Status** | ✅ Implemented |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size. All sizes meet WCAG 2.5.8 minimum touch target. |
| `aria-label` | `string` | `'Close'` | Accessible label — override per context (e.g. `"Dismiss banner"`). |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded to the native `<button>`. |

#### Accessibility

- Renders as `<button type="button">` with `aria-label`
- SVG icon has `aria-hidden="true"`
- Keyboard focusable with visible `:focus-visible` ring

#### Theming

- Icon color: `--color-text-secondary` → `--color-text-primary` on hover
- Background: transparent → `--color-surface` on hover

---

### TextLink

> Styled anchor component. Supports external links with automatic `target="_blank"`, `rel="noopener noreferrer"`, and a screen-reader "(opens in new tab)" announcement.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/TextLink/` |
| **Extends** | `AnchorHTMLAttributes<HTMLAnchorElement>` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `external` | `boolean` | `false` | Adds `target="_blank"`, `rel="noopener noreferrer"`, and sr-only text. |
| `children` | `ReactNode` | — | Link content. |
| `ref` | `Ref<HTMLAnchorElement>` | — | Forwarded to the native `<a>`. |

#### Accessibility

- Renders as native `<a>` element
- External links append `<span class="sr-only">(opens in new tab)</span>` for screen readers
- Visible `:focus-visible` ring via `@include focus-ring`

#### Theming

- Color: `--color-primary`
- Underline on hover
- Dark mode automatically adapts via `--color-primary` token

---

### Spinner

> Animated loading spinner with screen-reader announcement.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Spinner/` |
| **Extends** | `HTMLAttributes<HTMLDivElement>` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner diameter: sm=16px, md=24px, lg=40px. |
| `label` | `string` | `'Loading'` | Screen-reader announcement text. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the container `<div>`. |

#### Accessibility

- Container: `role="status"`, `aria-live="polite"`
- Hidden sr-only `<span>` with `label` text
- Animation disabled when `prefers-reduced-motion: reduce`

#### Theming

- Spinner stroke: `--color-primary`

---

### SkeletonLoader

> Placeholder loading shapes with a pulse animation. Supports text (multi-line), circle, and rectangle variants.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/SkeletonLoader/` |
| **Extends** | `HTMLAttributes<HTMLDivElement>` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'circle' \| 'rectangle'` | `'text'` | Shape of the skeleton. |
| `width` | `string` | varies | CSS width. Defaults: text=`100%`, circle=`48px`, rectangle=`100%`. |
| `height` | `string` | varies | CSS height. Defaults: text=`1em`, circle=`48px`, rectangle=`200px`. |
| `lines` | `number` | `1` | Number of lines for `text` variant. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the container. |

#### Accessibility

- Container: `role="status"`, `aria-busy="true"`
- Sr-only `<span>` with `"Loading…"` text
- Visual skeleton elements: `aria-hidden="true"`
- Pulse animation disabled when `prefers-reduced-motion: reduce`

#### Theming

- Background pulse between `--color-surface` and `--color-surface-raised`

---

### NotificationBadge

> Small count/dot badge overlaid on a child element (e.g. a bell icon).

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/NotificationBadge/` |
| **Extends** | `HTMLAttributes<HTMLSpanElement>` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | — | Numeric count to display. |
| `max` | `number` | `99` | Maximum before displaying `{max}+`. |
| `dot` | `boolean` | `false` | Show a dot instead of a count. |
| `children` | `ReactNode` | — | The anchor element the badge overlays. |
| `ref` | `Ref<HTMLSpanElement>` | — | Forwarded to the wrapper `<span>`. |

#### Accessibility

- Badge `<span>` has `aria-label` (e.g. `"5 notifications"`)
- When `dot`, sr-only text `"New notifications"` is used
- When `count` is 0, badge is hidden and `aria-label` is omitted

#### Theming

- Background: `--color-error`
- Text: `--color-text-inverse`
- Positioned `absolute` relative to wrapper

---

### ProfilePicture

> Avatar component with image, fallback initials, and optional status indicator.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/ProfilePicture/` |
| **Extends** | `HTMLAttributes<HTMLDivElement>` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL. Falls back to initials on error or when omitted. |
| `alt` | `string` | **required** | Accessible alt text for the image. |
| `initials` | `string` | — | 1–2 character fallback when image is unavailable. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Sizes: sm=32px, md=40px, lg=56px, xl=80px. |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | — | Optional status dot indicator. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the container. |

#### Accessibility

- `<img>` has the `alt` prop
- Initials fallback: `<span role="img" aria-label="{alt}">`
- Status indicator: sr-only `<span>` with status text (e.g. `"Status: online"`)

#### Theming

- Fallback background: `--color-surface-raised`
- Fallback text: `--color-text-secondary`
- Status colors: online=`--color-success`, away=`--color-warning`, busy=`--color-error`, offline=`--color-secondary`
- Circle shape: `border-radius: var(--radius-full)`

---

## Phase 2 — Composite Components

### Banner

> Full-width informational banner with semantic variants and optional dismiss.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Banner/` |
| **Depends on** | `CloseButton` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'warning' \| 'error' \| 'success'` | **required** | Semantic style variant. |
| `dismissible` | `boolean` | `false` | Show a close button. |
| `onDismiss` | `() => void` | — | Called when the dismiss button is clicked. |
| `children` | `ReactNode` | — | Banner content. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the container. |

#### Accessibility

- `role="alert"` for `error` variant (assertive, interrupts screen reader)
- `role="status"` for `info`, `warning`, `success` (polite)
- CloseButton: `aria-label="Dismiss banner"`

#### Theming

- Left border accent: `--color-info/warning/error/success`
- Background: `--color-info-subtle/warning-subtle/error-subtle/success-subtle`
- Icon color matches the variant color

#### Responsive

- Stacks icon + text vertically on mobile, inline on `@include breakpoint-sm`

---

### Dialog

> Modal dialog using the native `<dialog>` element for built-in focus trapping and Escape-to-close.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Dialog/` |
| **Depends on** | `CloseButton`, `Button` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Controls dialog visibility. |
| `onClose` | `() => void` | **required** | Called on Escape, backdrop click, or close button. |
| `title` | `string` | **required** | Dialog heading (linked via `aria-labelledby`). |
| `children` | `ReactNode` | — | Custom dialog body content. |
| `confirmLabel` | `string` | `'Confirm'` | Label for the confirm action button. |
| `cancelLabel` | `string` | `'Cancel'` | Label for the cancel action button. |
| `onConfirm` | `() => void` | — | Called when confirm button is clicked. |
| `onCancel` | `() => void` | — | Called when cancel button is clicked. |
| `hideActions` | `boolean` | `false` | Hide the confirm/cancel footer entirely. |
| `ref` | `Ref<HTMLDialogElement>` | — | Forwarded to the `<dialog>`. |

#### Accessibility

- Native `<dialog>` with `.showModal()` — automatic focus trap, Escape handling, `aria-modal="true"`
- `aria-labelledby` pointing to the title element
- `aria-describedby` pointing to the content element
- Backdrop click calls `onClose`
- Focus returns to trigger element on close

#### Theming

- `::backdrop` uses `--color-overlay`
- Surface: `--color-surface-raised`
- Shadow: `--shadow-xl`
- Z-index: `--z-index-dialog`

#### Responsive

- Full screen on mobile (`width: 100vw; height: 100vh`)
- Centered card with `max-width` on `@include breakpoint-sm`

---

### Tag

> Informational tag/chip with optional color, link, and remove action.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Tag/` |
| **Depends on** | `CloseButton` (sm), `TextLink` (for link variant) |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Tag text. |
| `color` | `string` | — | CSS color for background tint (rendered with low opacity). |
| `href` | `string` | — | Makes the tag a link (renders as `<a>` via TextLink). |
| `removable` | `boolean` | `false` | Shows a remove × button. |
| `onRemove` | `() => void` | — | Called when remove button is clicked. |
| `ref` | `Ref<HTMLSpanElement>` | — | Forwarded to the container. |

#### Accessibility

- Remove button: `aria-label="Remove {label}"`
- Link variant: full anchor semantics via TextLink
- Keyboard: remove button focusable, Enter/Space triggers remove

#### Theming

- Default: `--color-surface` background, `--color-border` border
- Custom `color` prop overrides background with reduced opacity
- Text: `--color-text-primary`

---

### Breadcrumb

> Navigation breadcrumb trail. Compound component: `Breadcrumb` + `BreadcrumbItem`.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Breadcrumb/` |
| **Depends on** | `TextLink` |

#### Props — Breadcrumb

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Expects `BreadcrumbItem` children. |
| `separator` | `ReactNode` | `'/'` | Custom separator between items. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to `<nav>`. |

#### Props — BreadcrumbItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | Link URL. Omit for the current (last) page. |
| `children` | `ReactNode` | — | Item label. |

#### Accessibility

- `<nav aria-label="Breadcrumb">`
- `<ol>` ordered list
- Last item (no `href`): `aria-current="page"`
- Separators: `aria-hidden="true"`

#### Theming

- Separator + inactive text: `--color-text-secondary`
- Active link: `--color-primary`
- Current page: `--color-text-primary`, `--font-weight-semibold`

#### Responsive

- Horizontal scroll with `overflow-x: auto` on narrow screens
- Items truncated with `@include truncate` when constrained

---

### Popover

> Floating content panel triggered by click or hover, positioned relative to a trigger element.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Popover/` |
| **Depends on** | none |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactElement` | **required** | The element that anchors the popover. |
| `content` | `ReactNode` | **required** | Content rendered inside the popover panel. |
| `triggerOn` | `'click' \| 'hover'` | `'click'` | Interaction mode. |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred position relative to trigger. |
| `open` | `boolean` | — | Controlled open state (makes component controlled). |
| `onOpenChange` | `(open: boolean) => void` | — | Called when open state should change. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the popover panel. |

#### Accessibility

- Trigger: `aria-expanded`, `aria-haspopup="dialog"`, `aria-controls="{panelId}"`
- Panel: `role="dialog"`, `id="{panelId}"`
- Click mode: close on Escape, close on outside click
- Hover mode: close on mouse leave (with delay), close on Escape
- Focus management: first focusable element in panel receives focus on open

#### Theming

- Background: `--color-surface-raised`
- Border: `--color-border`
- Shadow: `--shadow-lg`
- Z-index: `--z-index-popover`

#### Responsive

- Position flips when near viewport edge (CSS-based or JS fallback)
- Consider full-width on very small screens

---

### ProgressIndicator

> Progress display in bar or circle form with percentage or step count.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/ProgressIndicator/` |
| **Depends on** | none |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'bar' \| 'circle'` | `'bar'` | Visual shape. |
| `value` | `number` | **required** | Current progress (0–100). |
| `max` | `number` | `100` | Maximum value. |
| `displayMode` | `'percentage' \| 'steps'` | `'percentage'` | How to show progress text. |
| `currentStep` | `number` | — | Current step (required when `displayMode='steps'`). |
| `totalSteps` | `number` | — | Total steps (required when `displayMode='steps'`). |
| `label` | `string` | — | Accessible label for the progress bar. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the container. |

#### Accessibility

- `role="progressbar"`
- `aria-valuenow={value}`, `aria-valuemin={0}`, `aria-valuemax={max}`
- `aria-label` for screen readers

#### Theming

- Track: `--color-surface`
- Fill: `--color-primary`
- Circle: SVG with `stroke-dasharray` animation
- Text: `--color-text-secondary`

---

## Phase 3 — Form Components

All form components live under `src/components/Form/` and share a common `FormField` wrapper that connects labels, error messages, and helper text via ARIA.

### FormField

> Wrapper component that links a label, input, error message, and helper text using ARIA attributes. Provides a `useFormField()` context hook for child inputs.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Form/FormField/` |
| **Depends on** | none (consumed by all form inputs) |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Label text. |
| `htmlFor` | `string` | **required** | ID of the associated input element. |
| `error` | `string` | — | Error message (shown below input in red). |
| `helperText` | `string` | — | Helper/description text (shown below input). |
| `required` | `boolean` | `false` | Show required indicator (`*`) after label. |
| `children` | `ReactNode` | — | The input element. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the container. |

#### Context hook: `useFormField()`

Returns `{ inputId, errorId, helperId, hasError }` — used by child input components to wire `aria-describedby` and `aria-invalid` automatically.

#### Accessibility

- `<label htmlFor="{inputId}">`
- Error `<span id="{errorId}">` — input links via `aria-describedby`
- Helper `<span id="{helperId}">` — input links via `aria-describedby`
- Required: `aria-required="true"` on input, visible `*` indicator

#### Theming

- Label: `--color-text-primary`, `--font-weight-medium`
- Helper: `--color-text-secondary`, `--font-size-sm`
- Error: `--color-error`, `--font-size-sm`
- Required indicator: `--color-error`

---

### Input

> Text input supporting multiple types with built-in validation patterns (overridable).

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Form/Input/` |
| **Depends on** | `FormField` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Input label (passed to FormField). |
| `inputType` | `'text' \| 'email' \| 'url' \| 'tel' \| 'number' \| 'password'` | `'text'` | Maps to native `type`. |
| `error` | `string` | — | Error message. |
| `helperText` | `string` | — | Helper text. |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded to the `<input>`. |
| _...all native `InputHTMLAttributes`_ | | | |

#### Built-in validation (overridable via `pattern` prop)

| inputType | Pattern | Description |
|-----------|---------|-------------|
| `email` | RFC 5322 simplified | Basic email validation |
| `url` | `https?://...` | Requires http/https prefix |
| `tel` | `[+]?[\d\s\-().]+` | Allows digits, spaces, hyphens, parens, optional `+` |

#### Accessibility

- Wraps with `FormField` — all ARIA wiring automatic
- `aria-invalid="true"` when `error` is present
- `aria-describedby` linked to error + helper spans
- `aria-required` when `required`

#### Theming

- Border: `--color-border` → `--color-border-focus` on focus → `--color-error` on error
- Background: `--color-background`
- Placeholder: `--color-text-disabled`
- Full-width by default

---

### Textarea

> Multi-line text input with optional character count.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Form/Textarea/` |
| **Depends on** | `FormField` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Textarea label. |
| `error` | `string` | — | Error message. |
| `helperText` | `string` | — | Helper text. |
| `resize` | `'none' \| 'vertical' \| 'both'` | `'vertical'` | CSS resize behavior. |
| `ref` | `Ref<HTMLTextAreaElement>` | — | Forwarded to the `<textarea>`. |
| _...all native `TextareaHTMLAttributes`_ | | | |

#### Accessibility

- Same ARIA wiring as Input via `FormField`
- When `maxLength` is set, display character count (e.g. `"45/200"`)

---

### Select

> Native dropdown select with options array.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Form/Select/` |
| **Depends on** | `FormField` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Select label. |
| `options` | `Array<{ value: string; label: string; disabled?: boolean }>` | **required** | Dropdown options. |
| `placeholder` | `string` | — | Disabled first option text (e.g. `"Select an option…"`). |
| `error` | `string` | — | Error message. |
| `helperText` | `string` | — | Helper text. |
| `ref` | `Ref<HTMLSelectElement>` | — | Forwarded to the `<select>`. |
| _...all native `SelectHTMLAttributes`_ | | | |

#### Accessibility

- Native `<select>` — full keyboard support built-in
- Placeholder rendered as `<option disabled selected hidden>`

---

### Checkbox

> Single checkbox with custom styling and indeterminate support.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Form/Checkbox/` |
| **Depends on** | `FormField` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Checkbox label. |
| `error` | `string` | — | Error message. |
| `indeterminate` | `boolean` | `false` | Indeterminate state (e.g. "select all" partially checked). |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded to the `<input>`. |
| _...all native `InputHTMLAttributes`_ | | | |

#### Accessibility

- Native `<input type="checkbox">` with `aria-checked` (including `"mixed"` for indeterminate)
- `aria-invalid` when error
- Label via `<label>` wrapping the input
- Toggle via Space key (native)

#### Theming

- Custom styled via `appearance: none` + `::before` pseudo-element
- Checked: `--color-primary` background with white checkmark
- Indeterminate: `--color-primary` background with `–` dash

---

### RadioGroup

> Group of radio buttons rendered as a `<fieldset>` with `<legend>`.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Form/RadioGroup/` |
| **Depends on** | `FormField` concepts |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `string` | **required** | Group label rendered as `<legend>`. |
| `name` | `string` | **required** | Shared `name` attribute for all radios. |
| `options` | `Array<{ value: string; label: string; disabled?: boolean }>` | **required** | Radio options. |
| `value` | `string` | — | Controlled selected value. |
| `onChange` | `(value: string) => void` | — | Called when selection changes. |
| `error` | `string` | — | Error message. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction. |
| `ref` | `Ref<HTMLFieldSetElement>` | — | Forwarded to the `<fieldset>`. |

#### Accessibility

- `<fieldset>` + `<legend>` (native group labeling)
- Native `<input type="radio">` — arrow key navigation built-in
- `aria-invalid` on fieldset when error
- Error linked via `aria-describedby`

---

### Toggle

> Toggle/switch input with on/off labels.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/Form/Toggle/` |
| **Depends on** | none |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Accessible label. |
| `onText` | `string` | — | Text shown when on (optional). |
| `offText` | `string` | — | Text shown when off (optional). |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded to the `<input>`. |
| _...all native `InputHTMLAttributes` (except `type`)_ | | | |

#### Accessibility

- `role="switch"` on the `<input>`
- `aria-checked` reflects state
- `<label>` association
- Toggle via Space or Enter key

#### Theming

- Track off: `--color-secondary`
- Track on: `--color-primary`
- Thumb: `--color-text-inverse`
- Transition: `--transition-fast`
- Min touch target: 44×24px

---

## Phase 4 — Navigation & Notifications

### MenuItem

> Single navigation item for use in menus. Renders as a link or button depending on props.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/MenuItem/` |
| **Depends on** | none |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | Renders as `<a>`. Omit for `<button>`. |
| `icon` | `ReactNode` | — | Leading icon. |
| `active` | `boolean` | `false` | Current page state. |
| `disabled` | `boolean` | `false` | Disabled state. |
| `children` | `ReactNode` | — | Item label. |
| `ref` | `Ref<HTMLLIElement>` | — | Forwarded to the `<li>`. |

#### Accessibility

- `role="menuitem"`
- Active: `aria-current="page"`
- Disabled: `aria-disabled="true"`
- Keyboard focus management via `tabIndex`

#### Theming

- Active: `--color-primary` text, `--color-surface` background
- Hover: `--color-surface` background
- Disabled: `--color-text-disabled`, `cursor: not-allowed`

---

### MenuItemGroup

> Collapsible group of MenuItems with a label/header.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/MenuItemGroup/` |
| **Depends on** | `MenuItem` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Group label (rendered as a button). |
| `defaultOpen` | `boolean` | `true` | Initial expanded state. |
| `collapsible` | `boolean` | `true` | Whether the group can be collapsed. |
| `children` | `ReactNode` | — | `MenuItem` children. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the container. |

#### Accessibility

- Trigger `<button>`: `aria-expanded`, toggles on click/Enter/Space
- Content region: `role="group"`, `aria-labelledby="{triggerId}"`
- Collapse/expand animated with `max-height` transition

#### Theming

- Label: `--font-weight-semibold`, `--color-text-secondary`
- Separator: `--color-border`

---

### SideMenu

> Sidebar navigation composed of MenuItems and MenuItemGroups.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/SideMenu/` |
| **Depends on** | `MenuItem`, `MenuItemGroup` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | `MenuItem` and `MenuItemGroup` children. |
| `ariaLabel` | `string` | `'Side navigation'` | Accessible label for the `<nav>`. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to `<nav>`. |

#### Accessibility

- `<nav aria-label="{ariaLabel}">`
- Inner `<ul role="menu">`

#### Theming

- Background: `--color-surface`
- Border-right: `--color-border`
- Width: fixed `260px` on desktop

#### Responsive

- Hidden below `@include breakpoint-lg` — replaced by HamburgerMenu

---

### HamburgerMenu

> Mobile hamburger toggle button + slide-in menu panel with focus trapping.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/HamburgerMenu/` |
| **Depends on** | `CloseButton`, typically wraps `SideMenu` as children |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when open state should change. |
| `children` | `ReactNode` | — | Menu content (typically `SideMenu`). |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the container. |

#### Accessibility

- Toggle `<button>`: `aria-expanded`, `aria-label="Open menu"` / `"Close menu"`
- Panel: `role="dialog"`, `aria-modal="true"`
- Custom focus trap (no external dependency)
- Close on Escape
- Close on overlay click

#### Theming

- Overlay: `--color-overlay`
- Panel background: `--color-surface`
- Slide-in: `transform: translateX(-100%)` → `translateX(0)`
- Animation disabled via `@include reduced-motion`

#### Responsive

- Only visible below `@include breakpoint-lg`
- Hidden on desktop (SideMenu shown directly)

---

### NotificationPopup

> Toast notification card with pop-in animation, auto-dismiss, and close button.

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/NotificationPopup/` |
| **Depends on** | `CloseButton` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Semantic variant (matches Banner). |
| `title` | `string` | — | Optional notification heading. |
| `children` | `ReactNode` | — | Notification body content. |
| `visible` | `boolean` | **required** | Controls visibility. |
| `autoDismiss` | `boolean` | `true` | Auto-dismiss after timeout. |
| `autoDismissMs` | `number` | `5000` | Milliseconds before auto-dismiss. |
| `onDismiss` | `() => void` | — | Called when dismissed (auto or manual). |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the container. |

#### Accessibility

- `role="alert"`, `aria-live="assertive"`
- CloseButton: `aria-label="Dismiss notification"`
- Auto-dismiss pauses on hover/focus (gives user time to read)
- Animation disabled via `@include reduced-motion`

#### Theming

- Background: `--color-surface-raised`
- Shadow: `--shadow-lg`
- Left accent color: `--color-info/success/warning/error` (matches variant)
- Z-index: `--z-index-notification`
- Pop-in: `@keyframes slideIn` from right
- Fade-out: `opacity` transition

#### Responsive

- Fixed bottom-right on desktop
- Full-width top on mobile

---

## Phase 5 — Documentation

### ThemeColors

> Storybook-only documentation page that displays all design tokens from `_tokens.scss` as visual swatches. **Not exported from the public API.**

| Property | Detail |
|----------|--------|
| **Folder** | `src/components/ThemeColors/` |
| **Files** | `ThemeColors.stories.tsx` + `ThemeColors.module.scss` only (no `.tsx` component) |
| **Exported** | ❌ Not included in `src/index.ts` |

### Tables
> A component that renders a table.
- Table can have header, body, footer sections
- Table can be sortable
- Table can be paginated
- Table can be searchable
- Table can be filtered
- Columns can be resizable
- Columns can be colored (Odd or even columns)
- Rows can be colored (Odd or even rows)
- Table can have a color
- 

#### Story structure

- `title: 'Documentation/Theme Colors'`
- Groups: Primary, Secondary, Semantic (success/warning/error/info), Surface, Text, Border
- Each swatch shows: color sample box, CSS variable name, computed hex value
- Renders in both light and dark themes (side by side or via Storybook theme toggle)
- Uses `getComputedStyle(document.documentElement).getPropertyValue('--color-*')` to read live values

---

## Dependency Graph

```
CloseButton ─────┬── Banner
                  ├── Dialog (+ Button)
                  ├── Tag (+ TextLink)
                  ├── HamburgerMenu (+ SideMenu)
                  └── NotificationPopup

TextLink ─────────┬── Tag
                  └── Breadcrumb

FormField ────────┬── Input
                  ├── Textarea
                  ├── Select
                  └── Checkbox

MenuItem ─────────┬── MenuItemGroup
                  └── SideMenu ──── HamburgerMenu

(standalone)       Spinner, SkeletonLoader, NotificationBadge,
                   ProfilePicture, Popover, ProgressIndicator,
                   RadioGroup, Toggle, ThemeColors
```

---

## Barrel Export Plan (`src/index.ts`)

After all components are built, the root barrel file exports everything:

```ts
// Existing
export { Button } from './components/Button';
export { CloseButton } from './components/CloseButton';

// Phase 1
export { TextLink } from './components/TextLink';
export { Spinner } from './components/Spinner';
export { SkeletonLoader } from './components/SkeletonLoader';
export { NotificationBadge } from './components/NotificationBadge';
export { ProfilePicture } from './components/ProfilePicture';

// Phase 2
export { Banner } from './components/Banner';
export { Dialog } from './components/Dialog';
export { Tag } from './components/Tag';
export { Breadcrumb, BreadcrumbItem } from './components/Breadcrumb';
export { Popover } from './components/Popover';
export { ProgressIndicator } from './components/ProgressIndicator';

// Phase 3 — Form
export {
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Toggle,
} from './components/Form';

// Phase 4
export { MenuItem } from './components/MenuItem';
export { MenuItemGroup } from './components/MenuItemGroup';
export { SideMenu } from './components/SideMenu';
export { HamburgerMenu } from './components/HamburgerMenu';
export { NotificationPopup } from './components/NotificationPopup';

// + all type exports
```

> **ThemeColors is NOT exported** — it only exists as a Storybook documentation page.


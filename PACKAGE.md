# @pigna/component-library

A generic, accessible React component library with dark/light theme support.

Built with **React 19**, **TypeScript**, and **SCSS Modules**.

## Features

- **WCAG 2.2 AA compliant** — semantic HTML, ARIA attributes, keyboard navigation, and color contrast out of the box
- **Dark & light mode** — CSS custom properties with `data-theme` attribute switching
- **Fully themeable** — override any visual decision through CSS custom properties
- **Tree-shakeable** — ESM and CJS output with per-component imports
- **Fully typed** — TypeScript declarations included

## Prerequisites

- **React** `^19.2.4`
- **React DOM** `^19.2.4`
- Node.js **>=20.19.0** or **>=22.12.0**

## Installation

Since this package is hosted on **GitHub Packages**, configure your project's `.npmrc` first:

```ini
@pigna:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

Set the `NPM_TOKEN` environment variable to a GitHub Personal Access Token with `read:packages` scope, then install:

```bash
npm install @pigna/component-library
```

## Quick Start

```tsx
// Import global styles (reset + design tokens) — do this once in your app entry
import '@pigna/component-library/styles';
// Import components
import { Button } from '@pigna/component-library';

function App() {
  return (
    <Button variant="primary" size="md" onClick={() => alert('Clicked!')}>
      Click me
    </Button>
  );
}
```

## Theming

The library supports three theming modes:

### Automatic (OS preference)

Works out of the box. If the user's OS is set to dark mode, components render in dark mode automatically.

### Manual override

Set `data-theme` on `<html>` to force a specific theme:

```html
<html data-theme="dark" lang="en-GB">
<html data-theme="light" lang="en-GB">
```

### JavaScript toggle

```ts
document.documentElement.setAttribute('data-theme', 'dark');   // Force dark
document.documentElement.setAttribute('data-theme', 'light');  // Force light
document.documentElement.removeAttribute('data-theme');         // Follow OS
```

### Custom tokens

All visual decisions flow through CSS custom properties. Override them in your own stylesheet to match your brand:

```css
:root {
  --color-primary: #0066cc;
  --color-primary-hover: #0052a3;
  --radius-md: 6px;
  /* ... */
}
```

## Available Components

### Layout & Navigation

| Component | Description |
|---|---|
| `Breadcrumb` | Navigation breadcrumb trail with `BreadcrumbItem` children |
| `HamburgerMenu` | Collapsible mobile navigation menu |
| `MenuItem` | Clickable navigation item |
| `MenuItemGroup` | Grouped collection of menu items |
| `SideMenu` | Sidebar navigation container |
| `Tabs` | Tabbed interface with `TabList`, `Tab`, and `TabPanel` |

### Actions

| Component | Description |
|---|---|
| `Button` | Primary action element with `primary`, `secondary`, `tertiary`, and `danger` variants |
| `CloseButton` | Accessible close/dismiss button |
| `TextLink` | Styled anchor link |

### Feedback

| Component | Description |
|---|---|
| `Banner` | Inline notification banner (`info`, `success`, `warning`, `error`) |
| `Dialog` | Modal dialog with focus trapping |
| `ConfirmPopover` | Confirmation prompt in a popover |
| `NotificationPopup` | Toast notification with auto-dismiss |
| `NotificationToastContainer` | Container for stacking toast notifications |
| `Popover` | Floating content anchored to a trigger |
| `ProgressIndicator` | Progress bar / indicator |
| `Spinner` | Loading spinner |
| `SkeletonLoader` | Placeholder skeleton for loading states |

### Data Display

| Component | Description |
|---|---|
| `NotificationBadge` | Numeric badge for unread counts |
| `ProfilePicture` | Avatar with optional status indicator |
| `Table` | Data table with sorting support |
| `Tag` | Label tag / chip |

### Form

| Component | Description |
|---|---|
| `FormField` | Field wrapper with label, description, and error messaging |
| `FormGroup` | Groups related form fields |
| `FormSection` | Titled section within a form |
| `Input` | Text input field |
| `Textarea` | Multi-line text input |
| `Select` | Dropdown select |
| `Checkbox` | Checkbox input |
| `RadioGroup` | Radio button group |
| `Toggle` | Toggle switch |
| `ConditionalField` | Conditionally visible form field |

### Utilities

| Export | Description |
|---|---|
| `ComponentLibraryProvider` | Localization provider for overriding built-in strings |

### Icons

`ChevronDownIcon` · `ChevronLeftIcon` · `ChevronRightIcon` · `CloseIcon` · `ErrorIcon` · `FolderIcon` · `HamburgerIcon` · `InfoIcon` · `SortAscIcon` · `SortDescIcon` · `SortNeutralIcon` · `SuccessIcon` · `WarningIcon`

## Localization

Wrap your app in `ComponentLibraryProvider` to override built-in strings:

```tsx
import { ComponentLibraryProvider } from '@pigna/component-library';

<ComponentLibraryProvider strings={{ dialog: { close: 'Sluiten' } }}>
  <App />
</ComponentLibraryProvider>
```

## Browser Support

Chrome, Edge, Firefox, and Safari (last 2 versions).

## License

MIT


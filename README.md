# @pigna/component-library

A generic, accessible React component library with dark/light theme support.

Built with **React 19**, **TypeScript**, **SCSS Modules**, and documented with **Storybook 10**.

## Features

- **WCAG 2.2 AA compliant** — enforced via `eslint-plugin-jsx-a11y` and `@storybook/addon-a11y` (axe-core)
- **Screen-reader friendly** — proper ARIA attributes, semantic HTML, and `VisuallyHidden` utility
- **Dark & light mode** — CSS custom properties with `data-theme` attribute switching
- **Mobile-first** — responsive breakpoints using `min-width` media queries
- **Modern browser support** — Chrome, Edge, Firefox, Safari (last 2 versions)
- **Tree-shakeable** — ESM and CJS output with per-component imports
- **Fully typed** — TypeScript declarations included

## Getting Started

### Prerequisites

- Node.js **>=20.19.0** or **>=22.12.0**
- npm **>=10**

### Install

```bash
npm install @pigna/component-library
```

### Usage

```tsx
// Import components
import { Button } from '@pigna/component-library';
// Import global styles (reset + design tokens) — opt-in, do this once in your app entry
import '@pigna/component-library/styles';

function App() {
  return (
    <Button variant="primary" size="md" onClick={() => alert('Clicked!')}>
      Click me
    </Button>
  );
}
```

### Theming

The library supports three theming modes:

**1. Automatic (OS preference)** — Works out of the box. If the user's OS is set to dark mode, components render in dark mode automatically.

**2. Manual override** — Set `data-theme` on `<html>` to force a specific theme:

```html
<html data-theme="dark" lang="en-GB">   <!-- Force dark -->
<html data-theme="light" lang="en-GB">  <!-- Force light -->
```

**3. JavaScript toggle:**

```ts
// Force dark
document.documentElement.setAttribute('data-theme', 'dark');
// Force light
document.documentElement.setAttribute('data-theme', 'light');
// Follow OS preference (remove override)
document.documentElement.removeAttribute('data-theme');
```

## Development

### Setup

```bash
git clone https://github.com/Pigna/Component-Library.git
cd Component-Library
npm install
```

### Run Storybook

```bash
npm run dev
```

Opens Storybook at [http://localhost:6006](http://localhost:6006).

### Build the library

```bash
npm run build
```

Outputs ESM, CJS, and type declarations to `dist/`.

### Run tests

```bash
npm run test         # single run
npm run test:watch   # watch mode
```

### Lint & format

```bash
npm run lint          # ESLint (TypeScript + accessibility)
npm run lint:styles   # Stylelint (SCSS)
npm run format        # Prettier
```

## Component Folder Convention

Each component lives in its own folder under `src/components/`:

```
src/components/Button/
  ├── Button.tsx            # Component with typed props and JSDoc
  ├── Button.module.scss    # Scoped styles using CSS custom properties
  ├── Button.stories.tsx    # Storybook stories with controls
  ├── Button.test.tsx       # Vitest + Testing Library tests
  └── index.ts              # Named re-export
```

Then re-export from `src/index.ts`:

```ts
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Storybook dev server on port 6006 |
| `npm run build` | Build the library (ESM + CJS + types) |
| `npm run build:storybook` | Build static Storybook site |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint TypeScript with ESLint + a11y rules |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run lint:styles` | Lint SCSS with Stylelint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without writing |

## CI/CD

This project uses GitHub Actions for continuous integration and publishing.

### CI (`.github/workflows/ci.yml`)

Runs automatically on every **push to `main`** and on **pull requests** targeting `main`. It runs lint, tests, and build to catch issues early.

### Publishing (`.github/workflows/publish.yml`)

Runs when you push a **version tag** (e.g. `v0.2.0`). The version in `package.json` is set automatically from the tag name — no need to update it manually. The workflow will:

1. Lint, test, and build the library
2. Publish the package to **GitHub Packages**
3. Create a **GitHub Release** with a consumer-ready ZIP (`pigna-component-library-<version>.zip`) containing `dist/`, `package.json`, `README.md`, and `LICENSE`

> **Note:** The repo `README.md` is for contributors. The consumer-facing readme lives in `PACKAGE.md` and is copied into the npm package and release ZIP at publish time.

To publish a new version:

```bash
git tag v0.2.0
git push origin v0.2.0
```

## Installing in a Consuming Project

Since this package is hosted on GitHub Packages, the consuming project needs a one-time setup.

### 1. Create a GitHub Personal Access Token

Go to [GitHub → Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens) and create a **classic** token with the **`read:packages`** scope.

### 2. Add a `.npmrc` to the consuming project root

```ini
@pigna:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

> **Do not commit a real token.** The `.npmrc` references an environment variable (`NPM_TOKEN`).

### 3. Set the token

- **Locally:** export the token in your shell before running `npm install`:
  ```bash
  export NPM_TOKEN=ghp_your_token_here   # macOS/Linux
  $env:NPM_TOKEN="ghp_your_token_here"   # PowerShell
  ```
  Alternatively, add the token to your **user-level** `~/.npmrc` so it applies globally without polluting the project.

- **In CI:** add `NPM_TOKEN` as a **repository secret** in the consuming project's GitHub settings. Then pass it as an environment variable in your workflow.

### 4. Install the package

```bash
npm install @pigna/component-library
```

## Other tools
- ```npx skills add pbakaus/impeccable``` - Styling tool by **pbakaus/impeccable** https://impeccable.style/

## License

MIT

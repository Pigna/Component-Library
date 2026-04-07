# Copilot Instructions

## Design Context

### Users
Developers building consumer-facing SaaS products and web portals with React. They consume the component library as a foundation and layer their own brand on top. They care deeply about accessibility, predictability, and not fighting the library.

### Brand Personality
**Professional · Cozy · Warm · Clean**

The library should feel trustworthy and polished without being cold or sterile. Components should radiate quiet competence — approachable enough that adopters feel comfortable, structured enough that their apps feel credible.

### Aesthetic Direction
**Neutral & Adaptive** — the library stays out of the way.

Components use CSS custom properties throughout so adopters can retheme with minimal effort. The default palette (blue primary, light/dark surface tones) is a safe, professional baseline — not a statement. Every visual choice should be a sensible default, not a brand decision.

Anti-references: avoid anything flashy, opinionated, or hard to override — no gradient text, no neon dark-mode accents, no signature glassmorphism that would clash with adopters' own aesthetics.

### Design Principles
1. **Accessibility is non-negotiable** — every component ships WCAG 2.2 AA compliant by default. Keyboard navigation, focus indicators, ARIA semantics, and color contrast are baseline requirements, not enhancements.
2. **Tokens over hardcoded values** — all visual decisions (color, spacing, typography, radius, shadow) flow through CSS custom properties. Nothing is magic-numbered in component styles.
3. **Predictable over clever** — components behave exactly as developers expect. Consistent prop patterns, standard HTML semantics, and no surprising side effects.
4. **Progressive disclosure** — components expose simple APIs by default; power-user options (controlled state, callbacks, refs) are available but never required.
5. **Motion respects the user** — all animations honor `prefers-reduced-motion`. Transitions are functional (communicating state), never decorative.

import type { SVGAttributes } from 'react';

/**
 * Base props for all library icon components.
 *
 * Every icon defaults to `aria-hidden="true"` and uses `currentColor`
 * so it inherits the parent's text colour automatically.
 * All standard SVG attributes can be overridden via the spread.
 */
export type IconProps = SVGAttributes<SVGSVGElement>;


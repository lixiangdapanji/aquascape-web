import type { Config } from 'tailwindcss';
import { tailwindTheme } from '@aquascape/ui/theme/tailwind';

/**
 * Tailwind config derived from the ink-green tokens.
 *
 * We don't redefine colors here. All palette, spacing, radius, font, and
 * motion values come from `@aquascape/ui/theme/tailwind`, which is generated
 * from `packages/ui/src/theme/tokens.ts`.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './node_modules/@aquascape/ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    colors: tailwindTheme.colors,
    borderRadius: tailwindTheme.borderRadius,
    fontFamily: tailwindTheme.fontFamily,
    extend: {
      spacing: tailwindTheme.spacing,
      fontSize: tailwindTheme.fontSize,
      lineHeight: tailwindTheme.lineHeight,
      transitionDuration: tailwindTheme.transitionDuration,
      transitionTimingFunction: tailwindTheme.transitionTimingFunction,
    },
  },
  plugins: [],
};

export default config;

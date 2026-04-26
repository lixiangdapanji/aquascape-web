import type { Config } from 'tailwindcss';

/**
 * Tailwind config using inline ink-green design tokens.
 *
 * Will be replaced by `@aquascape-studio/ui/theme/tailwind` once that package
 * is published and stable. Tokens are kept in sync with globals.css.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink-900': '#0A1F18',
        'ink-800': '#0F2A20',
        'ink-700': '#163B2D',
        'moss-500': '#2F6E55',
        'moss-300': '#6FAE8E',
        'bone-100': '#EDE7D9',
        'bone-300': '#CFC7B4',
        'stone-500': '#6F7A6E',
        background: '#0A1F18',
        surface: '#0F2A20',
        'surface-hover': '#163B2D',
        primary: '#2F6E55',
        accent: '#6FAE8E',
        foreground: '#EDE7D9',
        'muted-foreground': '#CFC7B4',
        border: '#6F7A6E',
        'focus-ring': '#6FAE8E',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
      transitionDuration: {
        hover: '160ms',
        transition: '240ms',
      },
    },
  },
  plugins: [],
};

export default config;

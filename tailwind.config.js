/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Print is ~690px wide on A4, which would otherwise render the mobile layout.
    // Treating `print` as "wide enough" for sm/md/lg gives the PDF the desktop grid.
    screens: {
      sm: { raw: '(min-width: 640px), print' },
      md: { raw: '(min-width: 768px), print' },
      lg: { raw: '(min-width: 1024px), print' },
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        ink: {
          primary: 'var(--ink-primary)',
          secondary: 'var(--ink-secondary)',
        },
        hairline: 'var(--border-hairline)',
        bronze: 'var(--accent-bronze)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};

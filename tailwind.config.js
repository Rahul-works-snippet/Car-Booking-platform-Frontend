/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)', // gray-50 / slate-900
        foreground: 'var(--color-foreground)', // gray-800 / white/90

        card: {
          DEFAULT: 'var(--color-card)', // white / slate-800
          foreground: 'var(--color-card-foreground)', // gray-800 / white/90
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white / slate-800
          foreground: 'var(--color-popover-foreground)', // gray-800 / white/90
        },
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-600 / blue-500
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // slate-500 / slate-400
          foreground: 'var(--color-secondary-foreground)', // white / slate-900
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // amber-400
          foreground: 'var(--color-accent-foreground)', // gray-800
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-100 / slate-700
          foreground: 'var(--color-muted-foreground)', // gray-500 / white/70
        },
        border: 'var(--color-border)', // gray-500/20 / white/10
        input: 'var(--color-input)', // gray-500/20 / white/10
        ring: 'var(--color-ring)', // blue-600 / blue-500

        success: {
          DEFAULT: 'var(--color-success)', // emerald-600 / emerald-500
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-600 / amber-400
          foreground: 'var(--color-warning-foreground)', // white / gray-800
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-600 / red-500
          foreground: 'var(--color-error-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600 / red-500
          foreground: 'var(--color-destructive-foreground)', // white
        },
        surface: {
          DEFAULT: 'var(--color-surface)', // white / slate-800
          foreground: 'var(--color-surface-foreground)', // gray-800 / white/90
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
        sans: ['Source Sans 3', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'automotive-sm': '6px',
        'automotive': '12px',
        'automotive-md': '18px',
        'automotive-lg': '24px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionTimingFunction: {
        'automotive': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        'automotive': '250ms',
      },
      zIndex: {
        'nav': '100',
        'dropdown': '200',
        'modal': '300',
        'notification': '400',
        'support': '150',
      },
      boxShadow: {
        'automotive-sm': '0 2px 4px rgba(0, 0, 0, 0.08)',
        'automotive': '0 3px 6px rgba(0, 0, 0, 0.10)',
        'automotive-md': '0 6px 12px rgba(0, 0, 0, 0.12)',
        'automotive-lg': '0 12px 24px rgba(0, 0, 0, 0.15)',
        'automotive-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'card': '0 3px 6px rgba(0,0,0,0.08)',
        'glow-primary': '0 0 0 3px rgba(37, 99, 235, 0.15)',
      },
      maxWidth: {
        'prose-automotive': '70ch',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
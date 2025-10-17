import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/domains/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // DFRNT Brand Colors
        brand: {
          black: '#000000',
          'jet-graphite': '#1F1F1F',
          'red-orange': '#FF4A1A',
          'off-white': '#F7F6F5',
          'warm-grey': '#BDB9B6',
        },
        // Semantic color mapping
        primary: {
          DEFAULT: '#000000', // Black
          dark: '#1F1F1F', // Jet Graphite
        },
        accent: {
          DEFAULT: '#FF4A1A', // Red-Orange
          hover: '#E63D0F',
          light: '#FF6B47',
          dark: '#CC3B15',
        },
        neutral: {
          50: '#F7F6F5', // Off-White
          100: '#E8E7E6',
          200: '#D1CFCD',
          300: '#BDB9B6', // Warm Grey
          400: '#A19E9B',
          500: '#858280',
          600: '#696664',
          700: '#4D4A49',
          800: '#1F1F1F', // Jet Graphite
          900: '#000000', // Black
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dark-gradient': 'linear-gradient(180deg, #000000 0%, #1F1F1F 100%)',
        'accent-glow': 'radial-gradient(circle at center, rgba(255, 74, 26, 0.1) 0%, transparent 70%)',
      },
      boxShadow: {
        'accent-sm': '0 1px 2px 0 rgba(255, 74, 26, 0.05)',
        'accent': '0 4px 6px -1px rgba(255, 74, 26, 0.1)',
        'accent-lg': '0 10px 15px -3px rgba(255, 74, 26, 0.1)',
        'accent-glow': '0 0 20px rgba(255, 74, 26, 0.3)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        'brand': '-0.02em', // Tight tracking for wordmark-like authority
      },
      lineHeight: {
        'relaxed-reading': '1.75', // 1.4x+ for comfortable reading
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config

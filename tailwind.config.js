/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0A0A',
          card: '#121212',
          cardHover: '#181818',
          border: '#262626',
          muted: '#888888',
          text: '#F5F5F5',
        },
        light: {
          bg: '#FAFAFA',
          card: '#FFFFFF',
          cardHover: '#F4F4F5',
          border: '#E5E5E5',
          muted: '#666666',
          text: '#111111',
        },
        accent: {
          emerald: '#10B981',
          teal: '#14B8A6',
          indigo: '#6366F1',
          amber: '#F59E0B',
          cyan: '#06B6D4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
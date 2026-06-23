/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B121C',
          surface: '#121B27',
          raised: '#1A2531',
          border: '#27343F',
        },
        amber: {
          DEFAULT: '#F2A93B',
          dim: '#C98A2C',
        },
        danger: {
          DEFAULT: '#E5484D',
          dim: '#7A2A2C',
        },
        safe: {
          DEFAULT: '#3DD68C',
          dim: '#1F5C42',
        },
        ash: {
          50: '#EDEFF2',
          200: '#C3CBD4',
          400: '#8B98A9',
          600: '#5C6B7C',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        panel: '0 8px 30px -10px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}

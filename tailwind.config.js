/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          50: '#ECEFFE',
          100: '#D9DFFF',
          200: '#B5BFFC',
          300: '#919FFB',
          400: '#6D7FF9',
          500: '#6366F1',
          600: '#2F3FD8',
          700: '#2430A6',
          800: '#1A2174',
          900: '#111342',
        },
        secondary: {
          DEFAULT: '#10B981',
          50: '#E6F9F1',
          100: '#CCF3E3',
          200: '#99E7C7',
          300: '#66DBAB',
          400: '#33CF8F',
          500: '#10B981',
          600: '#0D9461',
          700: '#0A6E49',
          800: '#074931',
          900: '#042519',
        },
        accent: {
          DEFAULT: '#F59E0B',
          50: '#FFF8E7',
          100: '#FFF1CF',
          200: '#FFE39F',
          300: '#FFD56F',
          400: '#FFC73F',
          500: '#F59E0B',
          600: '#C47F09',
          700: '#935F07',
          800: '#624005',
          900: '#312003',
        },
        dark: {
          DEFAULT: '#1E293B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        cjk: ['Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

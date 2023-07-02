/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: {
        50: '#D1D5DB',
        100: '#9CA3AF',
        200: '#6B7280',
        300: '#4B5563',
        400: '#374151',
        500: '#111827',
        600: '#111827',
        700: '#0D121D',
        800: '#0A0E17',
        900: '#101010',
      },
      neutral: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#101010',
      },
      white: '#fff',
    },
    fontFamily: {
      cal: 'Cal sans',
    },
  },
  plugins: [],
};

import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#14181D',
        panel: '#1C2128',
        line: '#2D343D',
        ink: '#E6E9ED',
        dim: '#8B95A1',
        signal: '#4FD1A5',
        amber: '#E8A33D',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [typography],
};

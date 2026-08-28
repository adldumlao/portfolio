import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#04123F',      // deep navy — primary background
        panel: '#0A1B4A',   // slightly lighter navy — rack unit face
        line: '#16295E',    // rack seam / border
        ink: '#EAF0FA',     // near-white, cool tint — body text
        dim: '#8496C9',     // muted blue-gray — secondary text
        signal: '#FEC40B',  // gold — primary accent, "online" status
        accent2: '#5B8DEF', // soft blue — secondary status ("in progress")
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [typography],
};

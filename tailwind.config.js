/** @type {import('tailwindcss').Config} */

/*
 * Palette: "Electric Aurora"
 * - Deep midnight-navy neutrals, cool ice-white text
 * - Cyan    = primary accent  (token name "ember" kept for compatibility)
 * - Violet  = secondary       (token name "brass")
 * - Indigo  = data / charts   (token name "cobalt")
 * - Magenta = highlight       (token name "clay")
 * Legacy token names (void-*, cyber-*, ember, brass...) are kept so existing
 * components pick up the new palette without a rename.
 */
const ink = {
  950: '#060914', // page background
  900: '#0A0F22', // raised surface
  850: '#0F1630', // card
  800: '#1A2342', // border
  700: '#2B3763', // strong border / hover
};

const ember = '#3DDCFF';   // aurora cyan
const brass = '#A78BFA';   // aurora violet
const cobalt = '#7C8CFF';  // indigo
const sage = '#5EEAB4';    // mint
const clay = '#FF5CAA';    // magenta

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: ink,
        ink,
        ember: { DEFAULT: ember, soft: '#8FEAFF', deep: '#0EA5D0' },
        brass: { DEFAULT: brass, soft: '#CDBDFD' },
        cobalt: { DEFAULT: cobalt, soft: '#B0BAFF' },
        sage: { DEFAULT: sage },
        clay: { DEFAULT: clay },
        // Legacy aliases -> new palette
        cyber: {
          cyan: ember,
          blue: cobalt,
          violet: brass,
          purple: brass,
          emerald: sage,
          amber: brass,
          rose: clay,
        },
        // Bone white instead of pure white
        white: '#EEF2FF',
        // Warm stone greys replace Tailwind's cool slate
        slate: {
          100: '#E6EBFB',
          200: '#CDD5EE',
          300: '#A9B4D6',
          400: '#8591B8',
          500: '#636F96',
          600: '#46517A',
          700: '#323C60',
          800: '#1E2745',
          900: '#121830',
        },
        emerald: { 400: sage, 500: sage, 950: '#08201A' },
        rose: { 300: '#FFA3CF', 500: clay, 950: '#2A0F20' },
        amber: { 400: brass, 500: brass },
        indigo: { 950: '#0E1230' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        // "Glows" are now quiet, warm elevation, not neon halos
        'glow-cyan': '0 12px 40px -12px rgba(61, 220, 255, 0.55)',
        'glow-purple': '0 12px 40px -12px rgba(167, 139, 250, 0.5)',
        'glow-blue': '0 12px 40px -12px rgba(124, 140, 255, 0.5)',
        'inner-glow': 'inset 0 1px 0 0 rgba(238, 242, 255, 0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

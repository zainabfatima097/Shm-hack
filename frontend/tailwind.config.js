// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Feminine colors
        'primary': '#d4a5e8', // Lavender
        'secondary': '#ffb6c1', // Blush pink
        'accent': '#98d8c8', // Mint green
        'danger': '#ff6b8b', // Coral pink
        'warning': '#ffb347', // Peach orange
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'Inter', 'sans-serif'],
        // ADD THESE:
        'press-start': ['"Press Start 2P"', 'cursive', 'monospace'],
        'arcade': ['"Arcade Classic"', '"Press Start 2P"', 'cursive', 'monospace'],
        'courier': [' "Courier Prime" '],
        'vt323': [' "VT323" ']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(11) 1s 1 normal both',
        'typing-cursor': 'typing-cursor 750ms steps(11) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        'typing-cursor': {
          from: { borderColor: 'transparent' },
          to: { borderColor: 'black' },
        }
      }
    },
  },
  plugins: [],
}
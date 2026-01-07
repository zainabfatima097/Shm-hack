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
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                    // Include HTML
    "./src/**/*.{js,ts,jsx,tsx}",      // Include all React component files
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slide-in': 'slide-in 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};

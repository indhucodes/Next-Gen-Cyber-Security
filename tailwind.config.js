/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0F172A',     // Deep Navy
          card: '#1E293B',   // Slate Gray
          neon: '#10B981',   // Emerald Green (Safe)
          alert: '#EF4444',  // Red (Phishing)
        }
      }
    },
  },
  plugins: [],
}
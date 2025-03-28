/** @type {import('tailwindcss').Config} */
module.exports = {
       darkMode: 'class', // Enable class-based dark mode
       content: [
              "./app/**/*.{js,ts,jsx,tsx,mdx}",
              "./components/**/*.{js,ts,jsx,tsx,mdx}",
       ],
       theme: {
              extend: {
                     colors: {
                            primary: {
                                   DEFAULT: '#e84545',
                            },
                            secondary: {
                                   DEFAULT: '#ffd061',
                            },
                            dark: {
                                   DEFAULT: '#222222',
                                   900: '#111827', // Add this for dark mode background
                            },
                     },
              },
       },
       plugins: [],
}
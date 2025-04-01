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
                            accent: {
                                   DEFAULT: 'hsl(240 4.8% 95.9%)',
                                   foreground: 'hsl(240 5.9% 10%)',
                            },
                            dark: {
                                   DEFAULT: '#222222',
                                   900: '#111827', // Add this for dark mode background
                            },
                            destructive: {
                                   DEFAULT: 'hsl(0 84.2% 60.2%)',
                                   foreground: 'hsl(0 0% 98%)',
                            },
                            input: 'hsl(240 5.9% 90%)',
                            ring: 'hsl(222.2 47.4% 11.2%)',
                            background: 'hsl(0 0% 100%)',
                            foreground: 'hsl(240 10% 3.9%)',
                     },
              },
       },
       plugins: [],
}
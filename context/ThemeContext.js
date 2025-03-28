'use client'
import { createContext, useContext, useEffect, useState } from 'react'

// Create context
const ThemeContext = createContext()

// Main provider component (default export)
export default function ThemeProvider({ children }) {
       const [theme, setTheme] = useState('light')

       useEffect(() => {
              const savedTheme = localStorage.getItem('theme') ||
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
              setTheme(savedTheme)
              document.documentElement.classList.add(savedTheme)
       }, [])

       const toggleTheme = () => {
              const newTheme = theme === 'light' ? 'dark' : 'light'
              setTheme(newTheme)
              localStorage.setItem('theme', newTheme)
              document.documentElement.classList.remove(theme)
              document.documentElement.classList.add(newTheme)
       }

       return (
              <ThemeContext.Provider value={{ theme, toggleTheme }}>
                     {children}
              </ThemeContext.Provider>
       )
}

// Named export for the hook
export function useTheme() {
       const context = useContext(ThemeContext)
       if (!context) {
              throw new Error('useTheme must be used within a ThemeProvider')
       }
       return context
}
// components/ThemeToggle.jsx
'use client'
import { useTheme } from '@/context/ThemeContext' // Named import
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
       const { theme, toggleTheme } = useTheme()

       return (
              <button
                     onClick={toggleTheme}
                     className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                     aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                     {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
       )
}
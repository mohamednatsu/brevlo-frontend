'use client'

import { Palette, Globe, Clock, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { useState } from 'react'

export default function PreferenceSettings() {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    darkMode: theme === 'dark',
    language: 'en',
    timezone: 'UTC',
    autoSave: true
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Preferences updated successfully')
    } catch (error) {
      toast.error('Failed to update preferences')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Application Preferences</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Palette className="h-4 w-4 mr-2" />
                  Dark Mode
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark theme
                </p>
              </div>
              <Switch
                checked={preferences.darkMode}
                onCheckedChange={(checked) => {
                  setPreferences({...preferences, darkMode: checked})
                  setTheme(checked ? 'dark' : 'light')
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <Globe className="h-4 w-4 mr-2" />
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ar">Arabic</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                Timezone
              </label>
              <select
                value={preferences.timezone}
                onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="CET">Central European Time (CET)</option>
                <option value="GMT">Greenwich Mean Time (GMT)</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2" />
                  Auto-save Changes
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically save your work as you go
                </p>
              </div>
              <Switch
                checked={preferences.autoSave}
                onCheckedChange={(checked) => setPreferences({...preferences, autoSave: checked})}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setPreferences({
                darkMode: theme === 'dark',
                language: 'en',
                timezone: 'UTC',
                autoSave: true
              })}
              disabled={isLoading}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
'use client'

import { Bell, Mail, Smartphone, CheckCircle } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState } from 'react'

export default function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    summaryReady: true,
    weeklyDigest: false,
    promotions: false
  })

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Notification preferences updated')
    } catch (error) {
      toast.error('Failed to update notifications')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notification Preferences</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive important updates via email
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={() => handleToggle('email')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Push Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get alerts on your mobile device
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={() => handleToggle('push')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Summary Ready Alerts
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Notify when your lecture summaries are ready
                </p>
              </div>
              <Switch
                checked={notifications.summaryReady}
                onCheckedChange={() => handleToggle('summaryReady')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Bell className="h-4 w-4 mr-2" />
                  Weekly Digest
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive a weekly summary of your activity
                </p>
              </div>
              <Switch
                checked={notifications.weeklyDigest}
                onCheckedChange={() => handleToggle('weeklyDigest')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Mail className="h-4 w-4 mr-2" />
                  Promotional Emails
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get updates about new features and offers
                </p>
              </div>
              <Switch
                checked={notifications.promotions}
                onCheckedChange={() => handleToggle('promotions')}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setNotifications({
                email: true,
                push: true,
                summaryReady: true,
                weeklyDigest: false,
                promotions: false
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
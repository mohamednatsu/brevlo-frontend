'use client'

import { useState } from 'react'
import { Settings, User, Lock, Bell, CreditCard, Globe } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const settingsItems = [
  {
    name: 'Profile',
    href: '/dashboard/settings/profile',
    icon: User,
    current: false
  },
  {
    name: 'Security',
    href: '/dashboard/settings/security',
    icon: Lock,
    current: false
  },
  {
    name: 'Notifications',
    href: '/dashboard/settings/notifications',
    icon: Bell,
    current: false
  },
  {
    name: 'Billing',
    href: '/dashboard/settings/billing',
    icon: CreditCard,
    current: false
  },
  {
    name: 'Preferences',
    href: '/dashboard/settings/preferences',
    icon: Globe,
    current: false
  }
]

export default function SettingsLayout({ children }) {
  const pathname = usePathname()
  
  // Update current state based on active path
  const updatedItems = settingsItems.map(item => ({
    ...item,
    current: pathname === item.href
  }))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account preferences and application settings
          </p>
        </div>
      </div>

      {/* Settings Navigation and Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="md:col-span-1">
          <nav className="space-y-1">
            {updatedItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  item.current
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Settings Content */}
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  )
}
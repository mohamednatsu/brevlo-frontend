// app/dashboard/DashboardMainLayout.js (Client Component)
'use client';

import { Sidebar, MobileSidebar } from '@/components/Sidebar'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import RequestCounter from '@/components/RequestCounter'

export default function DashboardMainLayout({ children }) {
       const router = useRouter()
       const { user, logout } = useAuth();

       return (
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                     <Sidebar />

                     {/* Main content area */}
                     <div className="md:pl-64 flex flex-col">
                            {/* User Profile Bar */}
                            <div className="bg-white dark:bg-gray-800 shadow-sm">
                                   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                          <div className="flex justify-between items-center py-4">
                                                 <div className="flex items-center space-x-4">
                                                        <ThemeToggle />
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                                               {user?.avatar ? (
                                                                      <Image
                                                                             src={user.avatar}
                                                                             alt={user.name}
                                                                             width={40}
                                                                             height={40}
                                                                             className="object-cover"
                                                                      />
                                                               ) : (
                                                                      <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                                               )}
                                                        </div>
                                                        <div>
                                                               <p className="font-medium text-gray-900 dark:text-white">
                                                                      {user?.name || 'Guest'}
                                                               </p>
                                                               <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                                                      {user?.email || 'No email'}
                                                               </p>
                                                        </div>
                                                 </div>
                                                 <div className="flex items-center space-x-6">
                                                        <div className="flex justify-end items-center gap-2">
                                                               <RequestCounter />
                                                               {!user?.isPro && (
                                                                      <Link
                                                                             href="/pricing"
                                                                             className="ml-4 md:px-2 md:text-sm text-[10px] md:py-2 px-1 py-1 text-center bg-gradient-to-br from-primary via-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
                                                                      >
                                                                             Upgrade to Pro
                                                                      </Link>
                                                               )}
                                                        </div>
                                                        <button
                                                               onClick={logout}
                                                               className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                                        >
                                                               <LogOut className="h-4 w-4" />
                                                               <span>Sign Out</span>
                                                        </button>
                                                 </div>
                                          </div>
                                   </div>
                            </div>

                            {/* Page content */}
                            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 pb-20 md:pb-8">
                                   {children}
                            </main>
                     </div>

                     {/* Mobile navigation */}
                     <MobileSidebar />
              </div>
       )
}
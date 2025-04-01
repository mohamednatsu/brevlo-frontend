// components/RequestCounter.js
'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function RequestCounter() {
       const { user } = useAuth()

       // Check if requests are exhausted
       useEffect(() => {
              if (user?.remainingRequests === 0 && !user?.isPro) {
                     toast.warning(
                            <div>
                                   <p>Your free requests are exhausted!</p>
                                   <Link href="/pricing" className="underline text-blue-500">
                                          Upgrade to Pro for unlimited requests
                                   </Link>
                            </div>,
                            { duration: 10000 }
                     )
              }
       }, [user])

       return (
              <div className="flex items-center space-x-2">
                     {!user?.isPro && (
                            <>
                                   <span className="text-sm text-gray-500 dark:text-gray-400">
                                          Free requests:
                                   </span>
                                   <span
                                          className={`px-2 py-1 rounded-full text-sm font-medium ${user?.remainingRequests === 0
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                 }`}
                                   >
                                          {user?.remainingRequests || 0}/15
                                   </span>
                            </>
                     )}
              </div>
       )
}
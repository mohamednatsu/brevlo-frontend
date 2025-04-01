'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Upload, History, Settings, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import logo from "@/assets/logo.png"
import { motion } from 'framer-motion'
import Image from 'next/image'

const sidebarItems = [
       {
              name: 'Upload',
              href: '/dashboard/upload',
              icon: Upload,
       },
       {
              name: 'History',
              href: '/dashboard/history',
              icon: History,
       },
       {
              name: 'Settings',
              href: '/dashboard/settings',
              icon: Settings,
       },
       {
              name: 'Help',
              href: '/dashboard/help',
              icon: HelpCircle,
       },
]

export function Sidebar() {
       const pathname = usePathname()

       return (
              
              <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                     <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                            <motion.div
                                   initial={{ scale: 0.8, opacity: 0 }}
                                   animate={{ scale: 1, opacity: 1 }}
                                   transition={{ delay: 0.2 }}
                                   className='cursor-pointe flex justify-center items-center mt-3 mb-7 bg-white rounded-lg w-3/4 mx-auto'
                            >
                                   <Image
                                          alt='logo'
                                          quality={100}
                                          src={logo}
                                          className='w-[70px] h-[70px] hover:translate-y-[-2]  transition-all duration-300 rounded-lg'
                                   />
                            </motion.div>
                            <div className="flex-grow flex flex-col">
                                   <nav className="flex-1 px-2 pb-4 space-y-1">
                                          {sidebarItems.map((item) => (
                                                 <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={cn(
                                                               pathname === item.href
                                                                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700',
                                                               'group flex items-center px-3 py-3 text-sm font-medium rounded-md'
                                                        )}
                                                 >
                                                        <item.icon
                                                               className={cn(
                                                                      pathname === item.href
                                                                             ? 'text-gray-500 dark:text-gray-300'
                                                                             : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                                                                      'flex-shrink-0 h-5 w-5 mr-3'
                                                               )}
                                                               aria-hidden="true"
                                                        />
                                                        {item.name}
                                                 </Link>
                                          ))}
                                   </nav>
                            </div>
                     </div>
              </div>
       )
}

export function MobileSidebar() {
       const pathname = usePathname()

       return (
              <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
                     
                     <nav className="flex justify-around">
                            {sidebarItems.map((item) => (
                                   <Link
                                          key={item.name}
                                          href={item.href}
                                          className={cn(
                                                 pathname === item.href
                                                        ? 'text-primary'
                                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
                                                 'flex flex-col items-center justify-center py-3 px-4 text-xs font-medium'
                                          )}
                                   >
                                          <item.icon className="h-5 w-5 mb-1" />
                                          <span>{item.name}</span>
                                   </Link>
                            ))}
                     </nav>
              </div>
       )
}
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logoDark from '@/assets/logo.png'

export default function Loading() {
       const [progress, setProgress] = useState(0)
       const [message, setMessage] = useState('Initializing application')

       const messages = [
              'Securing your connection',
              'Preparing your dashboard',
              'Almost there',
              'Just a moment longer'
       ]

       useEffect(() => {
              const interval = setInterval(() => {
                     setProgress(prev => {
                            const newProgress = prev + Math.random() * 10
                            return newProgress > 100 ? 100 : newProgress
                     })

                     // Cycle through messages
                     setMessage(messages[Math.floor(Math.random() * messages.length)])
              }, 300)

              return () => clearInterval(interval)
       }, [])

       return (
              <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
                     {/* Logo with animation */}
                     <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                     >
                            <Image
                                   src={logoDark}
                                   alt="Logo"
                                   width={180}
                                   height={40}
                                   className="rounded-lg"
                                   priority
                            />
                     </motion.div>

                     {/* Loading container */}
                     <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            {/* Animated progress bar */}
                            <div className="mb-6">
                                   <div className="flex justify-between items-center mb-2">
                                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                 {message}...
                                          </span>
                                          <span className="text-sm font-medium text-primary">
                                                 {Math.min(100, Math.floor(progress))}%
                                          </span>
                                   </div>
                                   <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                          <motion.div
                                                 className="bg-primary h-2.5 rounded-full"
                                                 initial={{ width: 0 }}
                                                 animate={{ width: `${progress}%` }}
                                                 transition={{ duration: 0.3 }}
                                          />
                                   </div>
                            </div>

                            {/* Animated dots */}
                            <div className="flex justify-center space-x-2">
                                   {[...Array(3)].map((_, i) => (
                                          <motion.div
                                                 key={i}
                                                 className="w-3 h-3 bg-primary rounded-full"
                                                 animate={{
                                                        y: [0, -10, 0],
                                                        opacity: [0.6, 1, 0.6]
                                                 }}
                                                 transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        delay: i * 0.2
                                                 }}
                                          />
                                   ))}
                            </div>

                            {/* Status message */}
                            <motion.p
                                   className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ delay: 0.3 }}
                            >
                                   This will just take a moment. Please don't close this window.
                            </motion.p>
                     </div>

                     {/* Footer */}
                     <motion.div
                            className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                     >
                            <p>© {new Date().getFullYear()} SummarizeAI. All rights reserved.</p>
                     </motion.div>

                     {/* Background animation elements */}
                     <div className="fixed inset-0 overflow-hidden -z-10">
                            {[...Array(20)].map((_, i) => (
                                   <motion.div
                                          key={i}
                                          className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
                                          style={{
                                                 width: Math.random() * 100 + 50,
                                                 height: Math.random() * 100 + 50,
                                                 left: `${Math.random() * 100}%`,
                                                 top: `${Math.random() * 100}%`,
                                          }}
                                          animate={{
                                                 x: [0, (Math.random() - 0.5) * 100],
                                                 y: [0, (Math.random() - 0.5) * 100],
                                                 opacity: [0.1, 0.3, 0.1]
                                          }}
                                          transition={{
                                                 duration: Math.random() * 10 + 10,
                                                 repeat: Infinity,
                                                 repeatType: 'reverse'
                                          }}
                                   />
                            ))}
                     </div>
              </div>
       )
}
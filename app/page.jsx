'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroSection from '@/components/hero'
import FeaturesSection from '@/components/features'
import ProcessSection from '@/components/process'
import PricingPage from '@/components/pricing'
import TestimonialsSection from '@/components/testimonials'
import { useTheme } from '@/context/ThemeContext' // Assuming you have this
import ContactSection from '@/components/contact'


export default function Home() {
  const containerRef = useRef()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const { theme } = useTheme() // Get current theme

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const backgroundOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0])

  return (
    <div className="relative overflow-x-hidden flex flex-col justify-around items-center pt-20 transition-colors duration-300">
      {/* Dynamic background based on theme */}
      <motion.div
        className={`fixed inset-0 z-0 ${theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 to-gray-800'
            : 'bg-gradient-to-br from-[#f9fafb] to-gray-100'
          }`}
        style={{
          scale: backgroundScale,
          opacity: backgroundOpacity
        }}
      />

      <HeroSection />

      <div
        ref={containerRef}
        className="relative z-10 space-y-32 pb-32 w-full"
      >
        <FeaturesSection />
        <ProcessSection />
        <PricingPage />
        <TestimonialsSection />
        <ContactSection />
      </div>

      {/* Smooth transition overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-difference">
        <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-5' : 'opacity-0'
          } bg-white`}></div>
      </div>
    </div>
  )
}
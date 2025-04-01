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
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Head from "next/head";

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
    <div className="">
      <Head>

        {/* Primary Meta Tags */}
        <title>Brevlo | AI-Powered Lecture Summaries in Seconds | Study Smarter</title>
        <meta name="description" content="Brevlo transforms 1-hour lectures into concise AI summaries. Perfect for students & professionals. Supports videos, podcasts, PDFs & live notes." />
        <meta name="keywords" content="Brevlo, AI lecture summaries, study assistant, note-taking app, student productivity, video summarizer, podcast notes" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brevlo.com" />
        <meta property="og:title" content="Brevlo: AI That Cuts Lectures to 5-Minute Summaries" />
        <meta property="og:description" content="Stop rewatching lectures. Brevlo extracts key points from any format (YouTube, Zoom, PDFs). Free trial available." />
        <meta property="og:image" content="https://brevlo.com/images/og-preview.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://brevlo.com" />
        <meta property="twitter:title" content="Brevlo: Smarter Studying with AI" />
        <meta property="twitter:description" content="From 1-hour lecture → 5-minute AI summary. Try Brevlo today!" />
        <meta property="twitter:image" content="https://brevlo.com/images/twitter-preview.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://brevlo.com" />

        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Brevlo",
            "description": "AI-powered tool that summarizes lectures, videos, and documents",
            "applicationCategory": "Education",
            "operatingSystem": "Android, iOS, Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Head>

      <Navbar />
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
      <Footer />
    </div>
  )
}
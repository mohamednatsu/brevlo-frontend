import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ThemeProvider from "@/context/ThemeContext";
import { AuthProvider } from '@/context/AuthContext'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Brevlo | AI-Powered Lecture Summaries in Seconds | Study Smarter',
  description: 'Brevlo transforms 1-hour lectures into concise AI summaries. Supports videos, podcasts, PDFs & live notes.',
  keywords: ['Brevlo', 'AI lecture summaries', 'study assistant', 'note-taking app'],
  
  // Open Graph (Social Media)
  openGraph: {
    title: 'Brevlo: AI That Cuts Lectures to 5-Minute Summaries',
    description: 'Stop rewatching lectures. Brevlo extracts key points from any format (YouTube, Zoom, PDFs).',
    url: 'https://brevlo.com',
    images: [
      {
        url: 'https://brevlo.com/images/og-preview.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Brevlo: Smarter Studying with AI',
    description: 'From 1-hour lecture → 5-minute AI summary. Try Brevlo today!',
    images: ['https://brevlo.com/images/twitter-preview.jpg'],
  },

  // Favicons (optional)
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // Canonical URL
  metadataBase: new URL('https://brevlo.com'),
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900`}
      >
        <AuthProvider>

          <ThemeProvider>

            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

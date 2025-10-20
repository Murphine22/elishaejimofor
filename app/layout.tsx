import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminProvider } from "@/components/admin-context"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: "Elisha Ejimofor - Web Developer | Graphics Designer | AI Expert",
    template: "%s | Elisha Ejimofor"
  },
  description:
    "Portfolio of Elisha Ejimofor - Expert in web development, graphics design, content creation, and AI prompt engineering. Creating innovative digital solutions with cutting-edge technology.",
  keywords: [
    "web developer",
    "frontend developer",
    "graphics designer",
    "content creator",
    "prompt engineer",
    "React developer",
    "Next.js developer",
    "UI/UX designer",
    "digital marketer",
    "Nigeria developer"
  ],
  authors: [{ name: "Elisha Ejimofor" }],
  creator: "Elisha Ejimofor",
  publisher: "Elisha Ejimofor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://elishaejimofor.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://elishaejimofor.com',
    title: 'Elisha Ejimofor - Web Developer | Graphics Designer | AI Expert',
    description: 'Creating innovative digital solutions with cutting-edge technology',
    siteName: 'Elisha Ejimofor Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elisha Ejimofor - Web Developer | Graphics Designer',
    description: 'Creating innovative digital solutions with cutting-edge technology',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.imgur.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AdminProvider>
            {children}
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
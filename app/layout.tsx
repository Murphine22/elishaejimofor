import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminProvider } from "@/components/admin-context";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Elisha Ejimofor - Web Developer | Graphics Designer | Content Creator | Prompt Engineer",
  description:
    "Portfolio website of Elisha Ejimofor, showcasing web development, graphics design, content creation, and prompt engineering projects.",
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AdminProvider>
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}


import './globals.css'
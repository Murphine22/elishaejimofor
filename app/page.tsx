"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedButton } from "@/components/ui/animated-button"
import { ImageGallery } from "@/components/image-gallery"
import { Navigation } from "@/components/navigation"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Services } from "@/components/services"
import { BlogRedesigned as Blog } from "@/components/blog"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ArrowRight, ChevronDown } from "lucide-react"
import { ScrollProgress } from "@/components/scroll-progress"
import { TypeAnimation } from "react-type-animation"
import { DigitalClock } from "@/components/digital-clock"
import { FeaturedAdvertisements } from "@/components/featured-advertisements"
import Image from "next/image"
import { UserAuthButton } from "@/components/user-auth-button"
import { SettingsButton } from "@/components/settings-button"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import { AdminControlPanel } from "@/components/admin-control-panel"
import { MobileMenu } from "@/components/mobile-menu"
import { ClientReviews } from "@/components/client-reviews"

export default function Home() {
  const [activePage, setActivePage] = useState("home")
  const [floatingButtons, setFloatingButtons] = useState([
    { id: "whatsapp", name: "WhatsApp", visible: true },
    { id: "chatbot", name: "AI Chatbot", visible: true },
    { id: "settings", name: "Settings", visible: true }
  ])

  useEffect(() => {
    // Get the hash from the URL (if any)
    const hash = window.location.hash.replace("#", "")
    if (hash && ["about", "skills", "projects", "services", "blog", "contact"].includes(hash)) {
      setActivePage(hash)
    }
    
    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "")
      if (newHash && ["about", "skills", "projects", "services", "blog", "contact"].includes(newHash)) {
        setActivePage(newHash)
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    // Load floating button configuration from localStorage
    const loadButtonConfig = () => {
      const config = localStorage.getItem("floatingButtons")
      if (config) {
        try {
          const parsedConfig = JSON.parse(config)
          setFloatingButtons(parsedConfig)
        } catch (e) {
          console.error("Failed to parse floating button configuration")
        }
      }
    }

    loadButtonConfig()
    window.addEventListener("storage", loadButtonConfig)
    return () => window.removeEventListener("storage", loadButtonConfig)
  }, [])

  const handleNavigation = (page: string) => {
    console.log('Navigating to:', page)
    setActivePage(page)
    window.history.pushState(null, "", `#${page}`)
    // Scroll to top smoothly when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderFloatingButton = (id: string) => {
    const button = floatingButtons.find(b => b.id === id)
    if (!button?.visible) return null

    switch (id) {
      case "whatsapp":
        return <WhatsAppButton phoneNumber="+2348160589186" />
      case "chatbot":
        return <Chatbot />
      case "settings":
        return <SettingsButton />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/80 relative overflow-hidden">
      <ScrollProgress />

      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10 -z-10" />
        <div className="container flex h-16 items-center justify-between px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigation("home")}
          >
            <motion.div
              initial={{ rotate: -20, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-8 h-8 overflow-hidden rounded-full"
            >
              <Image
                src="https://i.imgur.com/QwVIarl.jpeg"
                alt="Elisha Ejimofor Logo"
                width={32}
                height={32}
                className="object-cover"
              />
            </motion.div>
            <motion.span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Elisha Ejimofor
            </motion.span>
          </motion.div>

          <Navigation activePage={activePage} setActivePage={handleNavigation} />

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <DigitalClock />
            </div>
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 0.3, delay: 0.6 }}
              className="hidden sm:block"
            >
              <ThemeToggle />
            </motion.div>
            <div className="hidden sm:flex flex-col sm:flex-row gap-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.7 }}>
                <button
                  onClick={() => handleNavigation("contact")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl flex items-center justify-center text-sm md:text-base"
                >
                  <span className="mr-2">Get in Touch</span>
                  <FaArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </button>
              </motion.div>
            </div>
            <MobileMenu onNavigate={handleNavigation} />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 md:px-8 py-4 md:py-8">
        <AnimatePresence mode="wait">
          {activePage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="min-h-[calc(100vh-4rem)]"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                <motion.div
                  className="w-full md:w-1/2"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    <TypeAnimation
                      sequence={[
                        "Hi, I'm Elisha Ejimofor",
                        1000,
                        "A Frontend Developer",
                        1000,
                        "Web Developer",
                        1000,
                        "Graphics Designer",
                        1000,
                        "Digital Marketer",
                        1000,
                        "AI Enthusiast",
                        1000,
                        "Content Creator",
                        1000,
                        "Prompt Engineer",
                        1000,
                        "Digital skills Tutor",
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Number.POSITIVE_INFINITY}
                    />
                  </h1>
                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-bold mt-3 md:mt-4">My Vision</h2>
                    <p className="text-base md:text-lg">
                      To create innovative digital solutions that inspire, engage, and transform. I strive to blend
                      cutting-edge technology with creative design to deliver exceptional user experiences and drive
                      business growth.
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold mt-3 md:mt-4">What I Do</h2>
                    <p className="text-base md:text-lg">
                      I specialize in creating responsive, user-friendly websites and applications using modern
                      front-end technologies. My expertise includes React, Next.js, TypeScript, and UI/UX design
                      principles that ensure your digital presence stands out in today's competitive landscape.
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <AnimatedButton
                      onClick={() => handleNavigation("projects")}
                      icon={<ChevronDown className="h-4 w-4" />}
                    >
                      Explore My Work
                    </AnimatedButton>
                  </div>
                  <button
                    onClick={() => handleNavigation("projects")}
                    className="w-full sm:hidden bg-gradient-to-r from-primary to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    Explore My Work
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </motion.div>
                <motion.div
                  className="w-full md:w-1/2 mt-6 md:mt-0"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <ImageGallery />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 md:mt-16"
              >
                <FeaturedAdvertisements />
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-8 md:mt-16"
              >
                <ClientReviews />
              </motion.div>
            </motion.div>
          )}
          {activePage === "about" && <About onNavigate={handleNavigation} />}
          {activePage === "skills" && <Skills />}
          {activePage === "projects" && <Projects />}
          {activePage === "services" && <Services />}
          {activePage === "blog" && <Blog />}
          {activePage === "contact" && <Contact />}
        </AnimatePresence>
      </main>

      <Footer setActivePage={handleNavigation} />
      
      {/* Fixed buttons with responsive positioning */}
      <div className="fixed right-2 sm:right-4 bottom-16 sm:bottom-24 flex flex-col items-center gap-2 sm:gap-4 z-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="transform-gpu"
        >
          <WhatsAppButton phoneNumber="+2348160589186" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="transform-gpu"
        >
          <Chatbot />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="transform-gpu"
        >
          <SettingsButton />
        </motion.div>
      </div>

      {/* Mobile bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t py-2 px-4 flex justify-between items-center sm:hidden z-30">
        <ThemeToggle />
        <button
          onClick={() => handleNavigation("contact")}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-2"
        >
          <span>Get in Touch</span>
          <FaArrowRight className="h-3 w-3" />
        </button>
      </div>
      
      <AdminControlPanel />
    </div>
  )
}


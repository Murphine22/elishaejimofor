"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
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
import { ArrowRight, ChevronDown, Sparkles, Target, Zap, Code2, Palette, TrendingUp, Lightbulb, Rocket, Star, Cpu, Globe, Database, Shield, Brain, Infinity, Hexagon, Triangle, Circle } from "lucide-react"
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
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${activePage === "home" ? "bg-gradient-to-br from-slate-400 via-purple-400/40 to-slate-400" : "bg-gradient-to-br from-slate-100 via-purple-100/30 to-slate-100"}`}>
      {/* Animated background grid - PATTERN INTERRUPTION - Only on home page */}
      {activePage === "home" && (
        <div className="fixed inset-0 -z-10">
          <motion.div 
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(120, 119, 198, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(120, 119, 198, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Floating geometric shapes - EMOTIONAL TRIGGER */}
          {[...Array(20)].map((_, i) => {
            const shapes = ['circle', 'triangle', 'hexagon']
            const shape = shapes[i % 3]
            const size = Math.random() * 100 + 50
            
            return (
              <motion.div
                key={i}
                className={`absolute ${shape === 'circle' ? 'rounded-full' : shape === 'triangle' ? 'clip-triangle' : 'clip-hexagon'}`}
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `linear-gradient(135deg, ${i % 2 === 0 ? 'rgba(120, 119, 198, 0.1)' : 'rgba(236, 72, 153, 0.1)'}, ${i % 2 === 0 ? 'rgba(236, 72, 153, 0.05)' : 'rgba(120, 119, 198, 0.05)'})`,
                }}
                animate={{
                  y: [0, -100, 0],
                  rotate: [0, 360, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
              />
            )
          })}
        </div>
      )}

      <ScrollProgress />

      <header className="sticky top-0 z-40 w-full border-b bg-slate-300/90 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-300/80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-cyan-500/5 -z-10" />
        <div className="container flex h-16 items-center justify-between px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNavigation("home")}
          >
            <motion.div
              initial={{ rotate: -20, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative w-10 h-10 overflow-hidden rounded-2xl group-hover:rotate-12 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600" />
              <Image
                src="https://i.imgur.com/QwVIarl.jpeg"
                alt="Elisha Ejimofor Logo"
                width={40}
                height={40}
                className="object-cover mix-blend-overlay"
              />
            </motion.div>
            <motion.span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600 group-hover:scale-105 transition-transform">
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
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.7, type: "spring", stiffness: 200 }}>
                <button
                  onClick={() => handleNavigation("contact")}
                  className="relative group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-black py-2.5 px-6 md:py-3 md:px-8 rounded-2xl shadow-2xl transform transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-3xl flex items-center justify-center text-sm md:text-base overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear"
                    }}
                  />
                  <motion.div
                    animate={{ rotate: [0, 360, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="relative z-10"
                  >
                    <Zap className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                  <span className="mr-2 relative z-10">Get in Touch</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <FaArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.div>
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
              {/* Hero Section - ULTRA MODERN & CAPTIVATING */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-8 lg:py-16">
                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                >
                  {/* Glowing badge - EMOTIONAL TRIGGER */}
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-3 mb-8"
                  >
                    <motion.div
                      className="relative"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(120, 119, 198, 0.5)",
                          "0 0 40px rgba(236, 72, 153, 0.5)",
                          "0 0 20px rgba(120, 119, 198, 0.5)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-xl" />
                      <div className="relative bg-gradient-to-r from-primary/20 via-purple-600/20 to-pink-600/20 px-6 py-3 rounded-full border-2 border-primary/30 backdrop-blur-sm">
                        <motion.div
                          animate={{ rotate: [0, 360, 0] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Sparkles className="h-5 w-5 text-yellow-400" />
                        </motion.div>
                        <span className="text-sm font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 uppercase tracking-widest ml-2">
                          ✨ Welcome to the Future ✨
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Main Headline - EMOTIONAL TRIGGER */}
                  <motion.h1 
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                  >
                    <motion.span 
                      className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                      animate={{
                        backgroundPosition: ['0%', '50%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear"
                      }}
                      style={{ backgroundSize: '200% auto' }}
                    >
                      I Build
                    </motion.span>
                    <br />
                    <motion.span 
                      className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                      animate={{
                        backgroundPosition: ['0%', '50%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: 0.5
                      }}
                      style={{ backgroundSize: '200% auto' }}
                    >
                      <TypeAnimation
                        sequence={[
                          "Digital Dreams",
                          1000,
                          "Innovative Solutions",
                          1000,
                          "Captivating Experiences",
                          1000,
                          "Future Technology",
                          1000,
                          "Mind-Blowing Apps",
                          1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Number.POSITIVE_INFINITY}
                      />
                    </motion.span>
                  </motion.h1>

                  {/* Subheadline - EMOTIONAL TRIGGER */}
                  <motion.p 
                    className="text-lg md:text-xl text-muted-foreground mb-8 font-medium leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                  >
                    <span className="text-primary font-black">Full-Stack Developer</span> • <span className="text-purple-600 font-black">AI Generalist</span> • <span className="text-pink-600 font-black">Digital Innovator</span>
                    <br />
                    <span className="text-base md:text-lg mt-2 block">
                      Transforming <span className="text-cyan-600 font-bold">ideas</span> into <span className="text-blue-600 font-bold">reality</span> with cutting-edge <span className="text-purple-600 font-bold">technology</span> and <span className="text-pink-600 font-bold">creative excellence</span>
                    </span>
                  </motion.p>

                  {/* Tech Stack Pills - EMOTIONAL TRIGGER */}
                  <motion.div 
                    className="flex flex-wrap gap-3 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                  >
                    {[
                      { icon: Cpu, label: "Full-Stack", color: "from-blue-500 to-cyan-500" },
                      { icon: Brain, label: "AI/ML", color: "from-purple-500 to-pink-500" },
                      { icon: Database, label: "Backend", color: "from-green-500 to-emerald-500" },
                      { icon: Globe, label: "Web", color: "from-orange-500 to-red-500" },
                      { icon: Shield, label: "Security", color: "from-indigo-500 to-purple-500" },
                    ].map((tech, idx) => (
                      <motion.div
                        key={idx}
                        className="group relative"
                        whileHover={{ scale: 1.1, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${tech.color} text-white font-bold text-sm shadow-lg hover:shadow-2xl transition-all cursor-pointer`}>
                          <motion.div
                            animate={{ rotate: [0, 360, 0] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: idx * 0.2 }}
                          >
                            <tech.icon className="h-4 w-4" />
                          </motion.div>
                          <span>{tech.label}</span>
                        </div>
                        <motion.div 
                          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA Buttons - EMOTIONAL TRIGGER */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, type: "spring", stiffness: 100 }}
                  >
                    <motion.button
                      onClick={() => handleNavigation("projects")}
                      className="relative group bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 text-white font-black py-4 px-8 rounded-2xl shadow-2xl transform transition-all duration-500 overflow-hidden"
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear"
                        }}
                      />
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 360, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Rocket className="h-5 w-5" />
                        </motion.div>
                        <span>Explore My Work</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </div>
                    </motion.button>
                    <motion.button
                      onClick={() => handleNavigation("contact")}
                      className="relative group bg-transparent border-2 border-primary/30 hover:border-primary text-foreground font-black py-4 px-8 rounded-2xl transform transition-all duration-500 overflow-hidden"
                      whileHover={{ scale: 1.05, rotate: -1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, -360, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Sparkles className="h-5 w-5" />
                        </motion.div>
                        <span>Let's Talk</span>
                      </div>
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Right Side - Interactive 3D-like Image Gallery */}
                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    {/* Glowing background effect - PATTERN INTERRUPTION */}
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Main image container */}
                    <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border-2 border-primary/20 overflow-hidden">
                      <ImageGallery />
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Featured Advertisements - MODERNIZED */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 100 }}
                className="mt-12 lg:mt-20"
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-primary/20">
                    <motion.div
                      className="flex items-center gap-3 mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                    >
                      <motion.div
                        className="p-3 bg-gradient-to-br from-primary to-purple-600 rounded-2xl shadow-2xl"
                        animate={{
                          rotate: [0, 360, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <Star className="h-6 w-6 text-white" />
                      </motion.div>
                      <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Featured Projects
                      </h2>
                    </motion.div>
                    <FeaturedAdvertisements />
                  </div>
                </motion.div>
              </motion.div>

              {/* Client Reviews - MODERNIZED */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.8, type: "spring", stiffness: 100 }}
                className="mt-12 lg:mt-20"
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-primary/20">
                    <motion.div
                      className="flex items-center gap-3 mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, type: "spring", stiffness: 100 }}
                    >
                      <motion.div
                        className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl"
                        animate={{
                          rotate: [0, -360, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <Sparkles className="h-6 w-6 text-white" />
                      </motion.div>
                      <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
                        Client Testimonials
                      </h2>
                    </motion.div>
                    <ClientReviews />
                  </div>
                </motion.div>
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
      <div className="fixed bottom-0 left-0 right-0 bg-slate-300/95 backdrop-blur border-t py-2 px-4 flex justify-between items-center sm:hidden z-30">
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


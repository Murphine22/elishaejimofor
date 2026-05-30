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
import { ArrowRight, ChevronDown, Sparkles, Target, Zap, Code2, Palette, TrendingUp, Lightbulb, Rocket, Star } from "lucide-react"
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
                  {/* Enhanced TypeAnimation Section - EMOTIONAL TRIGGER */}
                  <motion.div 
                    className="relative mb-6 md:mb-8 p-6 md:p-8 rounded-3xl overflow-hidden group"
                    whileHover={{ scale: 1.03, rotate: 0.5 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    {/* Animated gradient background - PATTERN INTERRUPTION */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/30 to-pink-600/20 opacity-60"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{ backgroundSize: '300% 300%' }}
                    />
                    
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
                      {[...Array(6)].map((_, i) => {
                        // Use deterministic integer values to avoid floating point precision issues
                        const positions = [
                          { x: 10, y: 15 }, // i=0
                          { x: 85, y: 25 }, // i=1
                          { x: 30, y: 70 }, // i=2
                          { x: 75, y: 85 }, // i=3
                          { x: 15, y: 55 }, // i=4
                          { x: 60, y: 35 }, // i=5
                        ]
                        const pos = positions[i]
                        const duration = 3 + (i % 2) // 3 or 4 seconds
                        
                        return (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                            animate={{
                              x: [pos.x, (pos.x + 30) % 100, pos.x],
                              y: [pos.y, (pos.y + 20) % 100, pos.y],
                              opacity: [0.2, 0.5, 0.2],
                              scale: [1, 1.5, 1],
                            }}
                            transition={{
                              duration: duration,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                            style={{
                              left: `${pos.x}%`,
                              top: `${pos.y}%`,
                            }}
                          />
                        )
                      })}
                    </div>

                    <div className="relative z-10">
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="flex items-center gap-2 mb-3"
                      >
                        <motion.div
                          animate={{ rotate: [0, 360, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="h-5 w-5 text-yellow-500" />
                        </motion.div>
                        <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 uppercase tracking-widest">✨ WELCOME TO MY DIGITAL UNIVERSE ✨</span>
                      </motion.div>
                      
                      <motion.h1 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 relative leading-tight"
                        initial={{ width: "auto" }}
                        animate={{ width: ["auto", "100%", "auto"] }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <motion.span 
                          className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 inline-block"
                          animate={{
                            backgroundPosition: ['0%', '50%', '100%'],
                            x: [0, 20, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          style={{ backgroundSize: '200% auto' }}
                        >
                          <TypeAnimation
                            sequence={[
                              "Hi, I'm Elisha 👋",
                              1000,
                              "I Build Dreams Into Reality 💫",
                              1000,
                              "Full-Stack Developer </>",
                              1000,
                              "Web Manager 🌐",
                              1000,
                              "Graphics Designer 🎨",
                              1000,
                              "Digital Marketer 📱",
                              1000,
                              "AI Generalist  🤖",
                              1000,
                              "Content Creator 📝",
                              1000,
                              "Prompt Engineer 🚀",
                              1000,
                              "Digital Skills Tutor 📚",
                              1000,
                              "Let's Create Something Amazing! ⚡",
                              1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Number.POSITIVE_INFINITY}
                          />
                        </motion.span>
                      </motion.h1>
                      
                      <motion.p 
                        className="text-base md:text-lg text-muted-foreground mt-3 font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                      >
                        <span className="text-primary font-bold">Transforming ideas</span> into <span className="text-purple-600 font-bold">captivating digital experiences</span> that <span className="text-pink-600 font-bold">inspire, engage, and convert</span>
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Enhanced My Vision Section - EMOTIONAL TRIGGER */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                    className="mb-6 md:mb-8"
                  >
                    <motion.div 
                      className="relative group"
                      whileHover={{ scale: 1.02, rotateY: 2 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse" />
                      <div className="relative bg-background/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl border-2 border-primary/30 overflow-hidden">
                        {/* Animated corner accent - PATTERN INTERRUPTION */}
                        <motion.div
                          className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-bl-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 45, 0],
                            opacity: [0.4, 0.7, 0.4],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                          }}
                        />
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <motion.div
                              className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.6, type: "spring" }}
                            >
                              <Target className="h-6 w-6 text-white" />
                            </motion.div>
                            <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                              My Vision
                            </h2>
                          </div>
                          
                          <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 font-medium">
                            To create <span className="text-primary font-bold">innovative digital solutions</span> that <span className="text-purple-600 font-bold">inspire, engage, and transform</span>. I strive to blend cutting-edge technology with creative design to deliver <span className="text-pink-600 font-bold">exceptional user experiences</span> and drive business growth.
                          </p>
                          
                          {/* Vision pillars - EMOTIONAL TRIGGERS */}
                          <div className="grid grid-cols-3 gap-3 mt-4">
                            {[
                              { icon: Lightbulb, label: "Innovate", color: "from-yellow-500 to-orange-500", desc: "Think Different" },
                              { icon: Rocket, label: "Transform", color: "from-blue-500 to-cyan-500", desc: "Scale Fast" },
                              { icon: Star, label: "Excel", color: "from-purple-500 to-pink-500", desc: "Be Best" },
                            ].map((pillar, idx) => (
                              <motion.div
                                key={idx}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-background to-muted/30 border-2 border-primary/20 hover:border-primary/60 transition-all cursor-pointer"
                                whileHover={{ y: -8, scale: 1.1, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1, type: "spring", stiffness: 200 }}
                              >
                                <motion.div 
                                  className={`p-2 rounded-lg bg-gradient-to-br ${pillar.color}`}
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.6 }}
                                >
                                  <pillar.icon className="h-4 w-4 text-white" />
                                </motion.div>
                                <span className="text-xs font-bold text-primary">{pillar.label}</span>
                                <span className="text-[10px] text-muted-foreground">{pillar.desc}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced What I Do Section - EMOTIONAL TRIGGER */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                    className="mb-6 md:mb-8"
                  >
                    <motion.div 
                      className="relative group"
                      whileHover={{ scale: 1.02, rotateY: -2 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse" />
                      <div className="relative bg-background/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl border-2 border-primary/30 overflow-hidden">
                        {/* Animated background pattern - PATTERN INTERRUPTION */}
                        <div className="absolute inset-0 opacity-10">
                          <motion.div 
                            className="absolute inset-0"
                            animate={{
                              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                            }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            style={{
                              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                              backgroundSize: '32px 32px'
                            }}
                          />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <motion.div
                              className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg"
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.6, type: "spring" }}
                            >
                              <Zap className="h-6 w-6 text-white" />
                            </motion.div>
                            <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
                              What I Do
                            </h2>
                          </div>
                          
                          <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 font-medium">
                            I specialize in creating <span className="text-cyan-600 font-bold">responsive, user-friendly websites</span> and applications using modern <span className="text-blue-600 font-bold">full-stack technologies</span>. My expertise includes <span className="text-blue-600 font-bold">React, Next.js, TypeScript</span>, <span className="text-purple-600 font-bold">Node.js, NestJS</span>, <span className="text-green-600 font-bold">PostgreSQL, MongoDB</span>, and <span className="text-pink-600 font-bold">UI/UX design</span> principles that ensure your digital presence <span className="text-pink-600 font-bold">stands out</span> in today's competitive landscape.
                          </p>
                          
                          {/* Skill badges - EMOTIONAL TRIGGERS */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {[
                              { name: "React", icon: Code2, color: "from-blue-400 to-cyan-400", desc: "Build Fast" },
                              { name: "Next.js", icon: Rocket, color: "from-gray-700 to-gray-900", desc: "Scale Easy" },
                              { name: "TypeScript", icon: Code2, color: "from-blue-600 to-blue-800", desc: "Code Safe" },
                              { name: "Node.js", icon: Code2, color: "from-green-600 to-green-800", desc: "Backend" },
                              { name: "NestJS", icon: Code2, color: "from-red-600 to-red-800", desc: "API Framework" },
                              { name: "PostgreSQL", icon: Code2, color: "from-blue-700 to-indigo-800", desc: "Database" },
                              { name: "MongoDB", icon: Code2, color: "from-green-700 to-emerald-800", desc: "NoSQL" },
                              { name: "UI/UX", icon: Palette, color: "from-purple-500 to-pink-500", desc: "Design Wow" },
                              { name: "Design", icon: Sparkles, color: "from-yellow-500 to-orange-500", desc: "Create Magic" },
                              { name: "Growth", icon: TrendingUp, color: "from-green-500 to-emerald-500", desc: "Grow Fast" },
                            ].map((skill, idx) => (
                              <motion.div
                                key={idx}
                                className="group/badge relative"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + idx * 0.05, type: "spring", stiffness: 200 }}
                                whileHover={{ scale: 1.15, y: -4, rotate: 3 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r ${skill.color} text-white text-sm font-bold shadow-lg hover:shadow-2xl transition-all cursor-pointer`}>
                                  <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                  >
                                    <skill.icon className="h-4 w-4" />
                                  </motion.div>
                                  <span>{skill.name}</span>
                                </div>
                                <motion.div 
                                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-muted-foreground font-medium opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap"
                                  initial={{ y: 5 }}
                                  animate={{ y: 0 }}
                                >
                                  {skill.desc}
                                </motion.div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* CTA Buttons - EMOTIONAL TRIGGER */}
                  <div className="hidden sm:block">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimatedButton
                        onClick={() => handleNavigation("projects")}
                        icon={<ChevronDown className="h-4 w-4" />}
                      >
                        Explore My Work
                      </AnimatedButton>
                    </motion.div>
                  </div>
                  <motion.button
                    onClick={() => handleNavigation("projects")}
                    className="w-full sm:hidden bg-gradient-to-r from-primary to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore My Work
                    <ChevronDown className="h-4 w-4" />
                  </motion.button>
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


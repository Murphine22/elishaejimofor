"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Sparkles,
  Zap,
  Code2,
  Palette,
  Rocket,
  Star,
  TrendingUp,
  Award,
  Users,
  Target,
  Lightbulb,
  Brain,
  Globe,
  MessageCircle
} from "lucide-react"
import Image from "next/image"
import { TypeAnimation } from "react-type-animation"

interface InteractiveHeroProps {
  onNavigate: (page: string) => void
}

export const InteractiveHero = ({ onNavigate }: InteractiveHeroProps) => {
  const [currentRole, setCurrentRole] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])
  
  const springConfig = { stiffness: 300, damping: 30 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const roles = [
    { title: "Frontend Developer", icon: Code2, color: "from-blue-500 to-cyan-500" },
    { title: "UI/UX Designer", icon: Palette, color: "from-purple-500 to-pink-500" },
    { title: "AI Engineer", icon: Brain, color: "from-orange-500 to-red-500" },
    { title: "Digital Creator", icon: Rocket, color: "from-green-500 to-emerald-500" },
    { title: "Problem Solver", icon: Lightbulb, color: "from-yellow-500 to-orange-500" }
  ]

  const stats = [
    { icon: Award, value: "10+", label: "Years Experience", gradient: "from-blue-500 to-cyan-500" },
    { icon: Users, value: "50+", label: "Happy Clients", gradient: "from-purple-500 to-pink-500" },
    { icon: Target, value: "100+", label: "Projects Completed", gradient: "from-orange-500 to-red-500" },
    { icon: TrendingUp, value: "95%", label: "Client Satisfaction", gradient: "from-green-500 to-emerald-500" }
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/Murphine22", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/elisha-ejimofor", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/elisha_dev", label: "Twitter" },
    { icon: Mail, href: "mailto:elisha@example.com", label: "Email" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentRole((prev) => (prev + 1) % roles.length)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [isPlaying, roles.length])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" ref={containerRef}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
        
        {/* Interactive Floating Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30"
            style={{
              left: `${(i * 137.5) % 100}%`,
              top: `${(i * 89.3) % 100}%`,
              background: `linear-gradient(45deg, ${['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'][i % 4]}, transparent)`,
            }}
            animate={{
              x: [0, (i * 50) % 200 - 100, 0],
              y: [0, -(i * 30) % 100 - 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + (i * 2) % 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col gap-4">
          {['home', 'about', 'projects', 'skills', 'contact'].map((section, index) => (
            <motion.button
              key={section}
              className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => onNavigate(section)}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex"
            >
              <Badge className="px-6 py-3 text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                Welcome to my digital universe
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
                  Elisha Ejimofor
                </span>
              </h1>
              
              {/* Dynamic Role Display */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
                  {(() => {
                    const CurrentIcon = roles[currentRole].icon
                    return (
                      <motion.div
                        key={currentRole}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <CurrentIcon className="w-5 h-5 text-blue-400" />
                        <span className="text-lg font-semibold text-white">{roles[currentRole].title}</span>
                      </motion.div>
                    )
                  })()}
                </div>
                
                {/* Play/Pause Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 text-lg text-gray-300 max-w-2xl"
            >
              <p className="leading-relaxed">
                Crafting <span className="font-bold text-white">extraordinary digital experiences</span> that blend 
                creativity with cutting-edge technology. I transform bold ideas into 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                  {" "}beautiful, functional realities{" "}
                </span>
                that make a difference.
              </p>
              
              <TypeAnimation
                sequence={[
                  "Let's build something amazing together",
                  2000,
                  "Ready to bring your vision to life?",
                  2000,
                  "Your next project starts here...",
                  2000,
                ]}
                wrapper="p"
                cursor={true}
                repeat={Infinity}
                className="text-blue-400 font-medium"
              />
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-full group"
                onClick={() => onNavigate("projects")}
              >
                View My Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full backdrop-blur-sm"
                onClick={() => onNavigate("contact")}
              >
                Let's Connect
                <MessageCircle className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative perspective-1000"
          >
            <motion.div
              style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
              }}
              className="relative"
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
                <div className="relative h-[600px] w-full">
                  {/* Profile Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="relative"
                    >
                      <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                          <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            EE
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Floating Badges */}
                  {[
                    { icon: Code2, label: "Frontend Expert", position: "top-8 left-8" },
                    { icon: Palette, label: "UI/UX Designer", position: "top-8 right-8" },
                    { icon: Brain, label: "AI Enthusiast", position: "bottom-8 left-8" },
                    { icon: Rocket, label: "Fast Learner", position: "bottom-8 right-8" },
                  ].map((badge, index) => (
                    <motion.div
                      key={badge.label}
                      className={`absolute ${badge.position}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.2 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <badge.icon className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-white">{badge.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  ExternalLink, 
  Code2, 
  Palette, 
  Sparkles,
  Zap,
  Heart,
  Coffee,
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
import { useState, useEffect, useRef } from "react"
import { EditableContent } from "@/components/editable-content"

interface AboutHeroProps {
  onNavigate: (page: string) => void
}

export const AboutHero = ({ onNavigate }: AboutHeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeSkill, setActiveSkill] = useState(0)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])
  
  const springConfig = { stiffness: 300, damping: 30 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const profileImages = [
    "https://i.imgur.com/QwVIarl.jpeg",
    "https://i.imgur.com/vPOk177.jpeg",
    "https://i.imgur.com/L8HmeD3.jpeg",
    "https://i.imgur.com/6M86mxE.jpeg",
    "https://i.imgur.com/cTIFMyY.jpeg",
    "https://i.imgur.com/8Blt9Eo.jpeg"
  ]

  const skills = [
    { icon: Code2, label: "Frontend Dev", color: "from-blue-500 to-cyan-500", count: "20+" },
    { icon: Palette, label: "UI/UX Design", color: "from-purple-500 to-pink-500", count: "30+" },
    { icon: Brain, label: "AI Generalist", color: "from-orange-500 to-red-500", count: "15+" },
    { icon: Rocket, label: "Digital Marketing", color: "from-green-500 to-emerald-500", count: "15+" },
  ]

  const stats = [
    { icon: Award, value: "8+", label: "Years Experience", gradient: "from-blue-500 to-cyan-500" },
    { icon: Users, value: "20+", label: "Students Trained", gradient: "from-purple-500 to-pink-500" },
    { icon: Target, value: "40+", label: "Projects Completed", gradient: "from-orange-500 to-red-500" },
    { icon: TrendingUp, value: "60%", label: "Client Growth", gradient: "from-green-500 to-emerald-500" },
  ]

  const passions = [
    { icon: Lightbulb, text: "Innovation", color: "text-yellow-500" },
    { icon: Heart, text: "User Experience", color: "text-red-500" },
    { icon: Coffee, text: "Problem Solving", color: "text-amber-600" },
    { icon: Globe, text: "Global Impact", color: "text-blue-500" },
  ]

  // Image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % profileImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Skill rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill(prev => (prev + 1) % skills.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-64 h-64 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${
              i % 3 === 0 ? 'from-blue-500 to-cyan-500' : 
              i % 3 === 1 ? 'from-purple-500 to-pink-500' : 
              'from-orange-500 to-red-500'
            }`}
            animate={{
              x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="px-4 py-2 text-sm bg-gradient-to-r from-primary to-purple-600 border-none">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to My World
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600 animate-gradient">
                  Elisha Ejimofor
                </span>
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <AnimatePresence mode="wait">
                  {(() => {
                    const ActiveIcon = skills[activeSkill].icon
                    return (
                      <motion.div
                        key={activeSkill}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${skills[activeSkill].color} text-white font-semibold`}
                      >
                        <ActiveIcon className="w-5 h-5" />
                        {skills[activeSkill].label}
                      </motion.div>
                    )
                  })()}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 text-lg text-muted-foreground"
            >
              <EditableContent section="about" field="vision" type="text" multiline defaultValue="My vision is to create innovative digital solutions that make a positive impact on people's lives.">
                <p className="leading-relaxed">
                  Hey there — I'm <span className="font-bold text-foreground">Elisha Ejimofor</span>, the creative mind behind{" "}
                  <span className="font-bold text-primary">Murphine Technologies</span>. I'm a Frontend Developer, Digital Creator, 
                  and AI Prompt Engineer with a relentless drive to turn bold ideas into beautiful, functional realities.
                </p>
              </EditableContent>

              <EditableContent section="about" field="mission" type="text" multiline defaultValue="My mission is to build intelligent, human-centered digital experiences.">
                <p className="leading-relaxed">
                  My mission? To build <span className="font-bold text-foreground">intelligent, human-centered digital experiences</span> that 
                  empower businesses and inspire people across the globe. Every pixel matters. Every interaction counts. 
                  Every line of code is a story waiting to be told.
                </p>
              </EditableContent>
            </motion.div>

            {/* Passions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {passions.map((passion, index) => (
                <motion.div
                  key={passion.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                >
                  <passion.icon className={`w-4 h-4 ${passion.color}`} />
                  <span className="text-sm font-medium">{passion.text}</span>
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
                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 group"
                onClick={() => {
                  window.open("https://www.dropbox.com/scl/fi/vnfp18qd73ezquk5fad9y/Elisha-s-Frontend-CV-Updated.pdf?rlkey=s7x2z9j6bvv4ag9mbxotq1mk3&st=sao2augz&dl=0")
                }}
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download CV
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary hover:bg-primary/10 group"
                onClick={() => onNavigate("projects")}
              >
                <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform" />
                View Portfolio
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-500 hover:bg-purple-500/10 group"
                onClick={() => onNavigate("contact")}
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Let's Talk
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: 3D Image Card */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30"
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

              <Card className="relative overflow-hidden border-none shadow-2xl rounded-3xl">
                <CardContent className="p-0">
                  <div className="relative h-[600px] w-full">
                    {/* Image Carousel */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={profileImages[currentImageIndex]}
                          alt="Elisha Ejimofor"
                          fill
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 mix-blend-overlay" />

                    {/* Floating Status Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="absolute top-6 right-6 z-10"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-green-500"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-white text-sm font-semibold">Let's Collaborate</span>
                      </div>
                    </motion.div>

                    {/* Skill Pills Floating */}
                    <div className="absolute top-6 left-6 z-10 space-y-2">
                      {skills.slice(0, 2).map((skill, index) => {
                        const SkillIcon = skill.icon
                        return (
                          <motion.div
                            key={skill.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            whileHover={{ scale: 1.05, x: 5 }}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${skill.color} text-white text-xs font-semibold shadow-lg`}
                          >
                            <SkillIcon className="w-3 h-3" />
                            {skill.count} {skill.label}
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Bottom Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent"
                    >
                      <h3 className="text-white text-2xl font-bold mb-1">Elisha Ejimofor</h3>
                      <p className="text-white/80 text-sm mb-3">Frontend Developer & Digital Creator</p>
                      
                      {/* Image Indicators */}
                      <div className="flex gap-2">
                        {profileImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              index === currentImageIndex 
                                ? 'w-8 bg-white' 
                                : 'w-1.5 bg-white/40 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        initial={{
                          x: Math.random() * 100 + "%",
                          y: Math.random() * 100 + "%",
                        }}
                        animate={{
                          y: [null, Math.random() * -50 - 20 + "%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: Math.random() * 2 + 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative group cursor-pointer"
            >
              <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <CardContent className="p-6 text-center relative z-10">
                  <motion.div
                    animate={{
                      rotate: hoveredStat === index ? 360 : 0,
                      scale: hoveredStat === index ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <motion.div
                    className={`text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`}
                    animate={{
                      scale: hoveredStat === index ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>

                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: hoveredStat === index ? '100%' : '-100%' }}
                  transition={{ duration: 0.6 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

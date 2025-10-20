"use client"

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, CheckCircle, Loader2, Send, ArrowRight, AlertCircle, MessageSquare, Sparkles, Zap, Clock } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"

// Tech-related images with descriptions
const techImages = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    alt: "Web Development",
    description: "Building modern web applications",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Mobile Development",
    description: "Creating cross-platform experiences",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    src: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    alt: "UI/UX Design",
    description: "Crafting beautiful interfaces",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "AI Development",
    description: "Implementing AI solutions",
    gradient: "from-green-500 to-emerald-500"
  }
]

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Interactive input field with magnetic effect
const MagneticInput = ({ label, ...props }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) / 10)
    y.set((e.clientY - rect.top - rect.height / 2) / 10)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Input {...props} />
    </motion.div>
  )
}

export const Contact = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % techImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative space-y-8 bg-background/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl overflow-hidden"
      id="contact"
    >
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Enhanced Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/5 -z-10" />
      <motion.div 
        className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <div className="relative">
            <MessageSquare className="h-16 w-16 text-primary" />
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <MessageSquare className="h-16 w-16 text-primary" />
            </motion.div>
          </div>
        </motion.div>
        <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-cyan-500">
          Let's Connect
        </h2>
        <p className="text-muted-foreground text-lg">
          Have an exciting project in mind? Let's collaborate and bring your vision to life with cutting-edge technology and creative solutions.
        </p>
      </motion.div>

      {/* Interactive Tech Showcase */}
      <motion.div variants={itemVariants} className="mb-12 relative z-10">
        <Card className="overflow-hidden border-none bg-background/50 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-0 relative h-[350px]">
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
                  src={techImages[currentImageIndex].src}
                  alt={techImages[currentImageIndex].alt}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${techImages[currentImageIndex].gradient} opacity-40 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <Sparkles className="h-6 w-6" />
                    <h3 className="text-3xl font-bold">
                      {techImages[currentImageIndex].alt}
                    </h3>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/90 text-lg"
                  >
                    {techImages[currentImageIndex].description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Enhanced Image indicators */}
            <div className="absolute bottom-6 right-6 flex space-x-3 z-10">
              {techImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border-none bg-background/60 backdrop-blur-md shadow-2xl">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="relative inline-block mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-24 h-24 text-green-500" />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 border-4 border-green-500 rounded-full"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                    <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out! I'll get back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => setSubmitStatus('idle')}
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-5">
                      <div className="relative">
                        <motion.div
                          animate={{
                            height: focusedField === 'name' ? '100%' : '0%',
                            opacity: focusedField === 'name' ? 0.15 : 0
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-lg"
                        />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name *"
                          required
                          className="bg-background/50 relative z-10 border-primary/20 focus:border-primary transition-all duration-300 h-12"
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      
                      <div className="relative">
                        <motion.div
                          animate={{
                            height: focusedField === 'email' ? '100%' : '0%',
                            opacity: focusedField === 'email' ? 0.15 : 0
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-lg"
                        />
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your Email *"
                          required
                          className="bg-background/50 relative z-10 border-primary/20 focus:border-primary transition-all duration-300 h-12"
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      
                      <div className="relative">
                        <motion.div
                          animate={{
                            height: focusedField === 'subject' ? '100%' : '0%',
                            opacity: focusedField === 'subject' ? 0.15 : 0
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-lg"
                        />
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Subject"
                          className="bg-background/50 relative z-10 border-primary/20 focus:border-primary transition-all duration-300 h-12"
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      
                      <div className="relative">
                        <motion.div
                          animate={{
                            height: focusedField === 'message' ? '100%' : '0%',
                            opacity: focusedField === 'message' ? 0.15 : 0
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-lg"
                        />
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Your Message *"
                          required
                          className="min-h-[180px] bg-background/50 relative z-10 border-primary/20 focus:border-primary transition-all duration-300 resize-none"
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                    </div>
                    
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"
                      >
                        <AlertCircle className="h-5 w-5" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 relative group overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-cyan-500 hover:shadow-2xl transition-all duration-300 text-lg font-semibold"
                      disabled={isSubmitting}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Zap className="mr-2 h-5 w-5" />
                          Send Message
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <Card className="h-full border-none bg-background/60 backdrop-blur-md shadow-2xl overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/5" />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Contact Info
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <motion.a
                    href="mailto:elishaejimofor@gmail.com"
                    className="flex items-center space-x-4 p-5 rounded-xl bg-gradient-to-r from-background/60 to-background/40 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="p-4 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 text-primary group-hover:from-primary/30 group-hover:to-purple-600/30 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Mail className="h-6 w-6" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-semibold text-lg">elishaejimofor@gmail.com</p>
                    </div>
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>

                  <motion.a
                    href="tel:+2348160589186"
                    className="flex items-center space-x-4 p-5 rounded-xl bg-gradient-to-r from-background/60 to-background/40 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="p-4 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 text-primary group-hover:from-primary/30 group-hover:to-purple-600/30 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Phone className="h-6 w-6" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="font-semibold text-lg">+234 816 058 9186</p>
                    </div>
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>

                  <motion.div
                    className="flex items-center space-x-4 p-5 rounded-xl bg-gradient-to-r from-background/60 to-background/40 backdrop-blur-sm border border-primary/10"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-4 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="font-semibold text-lg">Abuja, Nigeria</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-cyan-500/10 border border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <h4 className="font-bold text-lg">Business Hours</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium text-red-500">Closed</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-6 p-5 rounded-xl bg-gradient-to-r from-primary/5 to-purple-600/5 border border-primary/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-sm text-muted-foreground text-center">
                    <span className="font-semibold text-foreground">Quick Response Guaranteed!</span><br />
                    I typically respond within 24 hours during business days.
                  </p>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

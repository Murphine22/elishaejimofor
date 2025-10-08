"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, CheckCircle, Loader2, Send, ArrowRight } from "lucide-react"
// @ts-ignore: Cannot find module '@formspree/react' or its corresponding type declarations.
import { useForm, ValidationError } from '@formspree/react'
import { useEffect, useState } from "react"
import Image from "next/image"

// Tech-related images with descriptions
const techImages = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    alt: "Web Development",
    description: "Building modern web applications"
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Mobile Development",
    description: "Creating cross-platform experiences"
  },
  {
    src: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    alt: "UI/UX Design",
    description: "Crafting beautiful interfaces"
  },
  {
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "AI Development",
    description: "Implementing AI solutions"
  }
]

export const Contact = () => {
  const [state, handleSubmit] = useForm("xldrraok")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % techImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Add Formspree button script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://formspree.io/js/formbutton-v1.min.js"
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      // @ts-ignore
      window.formbutton = window.formbutton || function() { (window.formbutton.q = window.formbutton.q || []).push(arguments) }
      // @ts-ignore
      window.formbutton("create", {
        action: "https://formspree.io/f/xldrraok",
        title: "How can we help?",
        fields: [
          { 
            type: "email", 
            label: "Email:", 
            name: "email",
            required: true,
            placeholder: "your@email.com"
          },
          {
            type: "textarea",
            label: "Message:",
            name: "message",
            placeholder: "What's on your mind?",
          },
          { type: "submit" }      
        ],
        styles: {
          title: {
            backgroundColor: "gray"
          },
          button: {
            backgroundColor: "gray"
          }
        }
      })
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

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

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  const imageVariants = {
    enter: { opacity: 0, scale: 1.2 },
    center: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative space-y-6 bg-background/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl overflow-hidden"
      id="contact"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Get in Touch
        </h2>
        <p className="text-muted-foreground">
          Have a question or want to work together? I'd love to hear from you.
        </p>
      </motion.div>

      {/* Tech Image Card */}
      <motion.div variants={itemVariants} className="mb-12">
        <Card className="overflow-hidden border-none bg-background/50 backdrop-blur-sm">
          <CardContent className="p-0 relative h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={techImages[currentImageIndex].src}
                  alt={techImages[currentImageIndex].alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold mb-2"
                  >
                    {techImages[currentImageIndex].alt}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/80"
                  >
                    {techImages[currentImageIndex].description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Image indicators */}
            <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
              {techImages.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  animate={{
                    scale: index === currentImageIndex ? 1.2 : 1,
                    opacity: index === currentImageIndex ? 1 : 0.5
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border-none bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {state.succeeded ? (
                  <motion.div
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center py-12"
                  >
                    <div className="relative inline-block">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-20 h-20 text-green-500" />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 border-4 border-green-500 rounded-full"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                    <motion.h3 
                      className="text-2xl font-bold mt-6 mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Thank You!
                    </motion.h3>
                    <motion.p 
                      className="text-muted-foreground"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Your message has been sent successfully. I'll get back to you soon!
                    </motion.p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <motion.div
                          animate={{
                            height: focusedField === 'name' ? '100%' : '0%',
                            opacity: focusedField === 'name' ? 0.1 : 0
                          }}
                          className="absolute inset-0 bg-primary rounded-lg"
                        />
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          required
                          className="bg-transparent relative z-10 border-primary/20 focus:border-primary transition-colors duration-300"
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm" />
                      
                      <div className="relative">
                        <motion.div
                          animate={{
                            height: focusedField === 'email' ? '100%' : '0%',
                            opacity: focusedField === 'email' ? 0.1 : 0
                          }}
                          className="absolute inset-0 bg-primary rounded-lg"
                        />
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          required
                          className="bg-transparent relative z-10 border-primary/20 focus:border-primary transition-colors duration-300"
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm" />
                      
                      <div className="relative">
                        <motion.div
                          animate={{
                            height: focusedField === 'subject' ? '100%' : '0%',
                            opacity: focusedField === 'subject' ? 0.1 : 0
                          }}
                          className="absolute inset-0 bg-primary rounded-lg"
                        />
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Subject"
                          className="bg-transparent relative z-10 border-primary/20 focus:border-primary transition-colors duration-300"
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-500 text-sm" />
                      
                      <div className="relative">
                        <motion.div
                          animate={{
                            height: focusedField === 'message' ? '100%' : '0%',
                            opacity: focusedField === 'message' ? 0.1 : 0
                          }}
                          className="absolute inset-0 bg-primary rounded-lg"
                        />
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your Message"
                          required
                          className="min-h-[150px] bg-transparent relative z-10 border-primary/20 focus:border-primary transition-colors duration-300"
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm" />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300"
                      disabled={state.submitting}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                      {state.submitting ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="h-full border-none bg-background/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <motion.a
                    href="mailto:elishaejimofor@gmail.com"
                    className="flex items-center space-x-4 p-4 rounded-lg bg-background/40 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">elishaejimofor@gmail.com</p>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>

                  <motion.a
                    href="tel:+2348160589186"
                    className="flex items-center space-x-4 p-4 rounded-lg bg-background/40 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">+234 816 058 9186</p>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>

                  <motion.div
                    className="flex items-center space-x-4 p-4 rounded-lg bg-background/40 backdrop-blur-sm border border-primary/10"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">Abuja, Nigeria</p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8 p-6 rounded-lg bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10">
                  <h4 className="font-semibold mb-2">Business Hours</h4>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM (WAT)<br />
                    Saturday: 10:00 AM - 4:00 PM (WAT)<br />
                    Sunday: Closed
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}


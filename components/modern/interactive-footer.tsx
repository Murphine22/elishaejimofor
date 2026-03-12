"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Send, 
  Heart, 
  ArrowUp,
  Code2,
  Palette,
  Rocket,
  Brain,
  Globe,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Users,
  MessageCircle,
  Calendar,
  MapPin,
  Phone,
  ExternalLink,
  Copy,
  CheckCircle
} from "lucide-react"

interface InteractiveFooterProps {
  onNavigate?: (page: string) => void
}

export const InteractiveFooter = ({ onNavigate }: InteractiveFooterProps) => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [copiedText, setCopiedText] = useState("")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (copiedText) {
      const timer = setTimeout(() => setCopiedText(""), 2000)
      return () => clearTimeout(timer)
    }
  }, [copiedText])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" }
  ]

  const services = [
    { name: "Web Development", icon: Code2 },
    { name: "UI/UX Design", icon: Palette },
    { name: "Mobile Apps", icon: Rocket },
    { name: "AI Solutions", icon: Brain },
    { name: "Consulting", icon: Users }
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/Murphine22", label: "GitHub", color: "hover:text-gray-400" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/murphine22", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Twitter, href: "https://twitter.com/elisha_dev", label: "Twitter", color: "hover:text-sky-400" },
    { icon: Instagram, href: "https://instagram.com/elisha_dev", label: "Instagram", color: "hover:text-pink-400" },
    { icon: Youtube, href: "https://youtube.com/@elisha_dev", label: "YouTube", color: "hover:text-red-400" }
  ]

  const contactInfo = [
    { icon: Mail, value: "elisha@example.com", label: "Email" },
    { icon: Phone, value: "+234 123 456 7890", label: "Phone" },
    { icon: MapPin, value: "Abuja, Nigeria", label: "Location" }
  ]

  const stats = [
    { icon: Users, value: "50+", label: "Clients" },
    { icon: Award, value: "100+", label: "Projects" },
    { icon: TrendingUp, value: "10+", label: "Years" },
    { icon: Heart, value: "100%", label: "Dedication" }
  ]

  return (
    <footer className="relative bg-slate-900 border-t border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      {/* Animated Orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl"
          style={{
            left: `${(i * 137.5) % 100}%`,
            top: `${(i * 89.3) % 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10 + (i * 2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 py-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <Mail className="w-4 h-4 mr-2" />
                Stay Connected
              </Badge>
              
              <h3 className="text-3xl font-bold text-white mb-4">
                Get the Latest Updates
              </h3>
              
              <p className="text-gray-300 mb-8">
                Subscribe to my newsletter for exclusive content, latest projects, and tech insights.
                No spam, unsubscribe anytime.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 flex-1"
                  required
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  {isSubscribed ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Elisha Ejimofor</h4>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                Crafting extraordinary digital experiences that blend creativity with cutting-edge technology. 
                Transforming bold ideas into beautiful, functional realities.
              </p>
              
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-white">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-4 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-white">Services</h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <button
                      onClick={() => onNavigate?.("services")}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group w-full text-left"
                    >
                      <service.icon className="w-4 h-4" />
                      {service.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-white">Get In Touch</h4>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="group"
                  >
                    <button
                      onClick={() => copyToClipboard(info.value, info.label)}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 w-full text-left"
                    >
                      <info.icon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{info.value}</span>
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    {copiedText === info.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-green-400 ml-7"
                      >
                        Copied!
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-white/10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-purple-400" />
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="text-center md:text-left">
                <p className="text-gray-300 text-sm">
                  © {currentYear} Elisha Ejimofor. All rights reserved.
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Built with <Heart className="w-3 h-3 inline text-red-500" /> using Next.js & Tailwind CSS
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <a
                  href="/privacy"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate?.("contact")}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg flex items-center justify-center z-50"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

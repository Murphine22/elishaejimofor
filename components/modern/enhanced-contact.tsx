"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Send, 
  MessageCircle, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap,
  Globe,
  Smartphone,
  Calendar,
  Users,
  ArrowRight,
  ExternalLink,
  Copy,
  Share2,
  Heart,
  Star,
  Award,
  Rocket,
  Lightbulb,
  Target,
  TrendingUp
} from "lucide-react"

interface EnhancedContactProps {
  onNavigate?: (page: string) => void
}

export const EnhancedContact = ({ onNavigate }: EnhancedContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [copiedEmail, setCopiedEmail] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "elisha@example.com",
      href: "mailto:elisha@example.com",
      color: "from-blue-500 to-cyan-500",
      description: "Get in touch for project inquiries"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+234 123 456 7890",
      href: "tel:+2341234567890",
      color: "from-green-500 to-emerald-500",
      description: "Available for urgent matters"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Abuja, Nigeria",
      href: "#",
      color: "from-purple-500 to-pink-500",
      description: "Open to remote collaboration"
    }
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/Murphine22", label: "GitHub", followers: "1.2k" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/murphine22", label: "LinkedIn", followers: "500+" },
    { icon: Twitter, href: "https://twitter.com/elisha_dev", label: "Twitter", followers: "2.5k" },
  ]

  const projectTypes = [
    "Web Application",
    "Mobile App",
    "UI/UX Design",
    "AI/ML Project",
    "E-commerce Platform",
    "API Development",
    "Consulting",
    "Other"
  ]

  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Discuss in person"
  ]

  const timelines = [
    "ASAP",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3-6 months",
    "6+ months"
  ]

  const faqs = [
    {
      question: "What's your typical response time?",
      answer: "I usually respond within 24 hours for project inquiries and within 48 hours for general questions."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! I work with clients globally and am comfortable with different time zones."
    },
    {
      question: "What's your availability for new projects?",
      answer: "I'm currently accepting new projects. Let's discuss your timeline and requirements."
    },
    {
      question: "Can you help with project maintenance?",
      answer: "Yes, I offer ongoing support and maintenance services for all projects I build."
    }
  ]

  const stats = [
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
    { icon: Clock, value: "24h", label: "Response Time" },
    { icon: Award, value: "10+", label: "Years Experience" }
  ]

  useEffect(() => {
    if (copiedEmail) {
      const timer = setTimeout(() => setCopiedEmail(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copiedEmail])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectType: "",
        budget: "",
        timeline: ""
      })
      setIsSubmitting(false)
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }, 2000)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText("elisha@example.com")
    setCopiedEmail(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div 
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      {/* Animated Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
          style={{
            left: `${(i * 137.5) % 100}%`,
            top: `${(i * 89.3) % 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + (i * 2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
            <MessageCircle className="w-4 h-4 mr-2" />
            Get In Touch
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Let's Create Something Amazing
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? I'm here to help bring your ideas to life. 
            Reach out and let's discuss how we can work together.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center"
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                
                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-gray-400">I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Name *
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Budget Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                          className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none"
                        >
                          <option value="">Select timeline</option>
                          {timelines.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
                        placeholder="Tell me about your project..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                        />
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Info */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center`}>
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-400">{info.label}</div>
                          <div className="text-white font-medium">{info.value}</div>
                          <div className="text-xs text-gray-500">{info.description}</div>
                        </div>
                        {info.label === "Email" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyEmail}
                            className="text-gray-400 hover:text-white"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <social.icon className="w-6 h-6 text-blue-400" />
                      <div className="flex-1">
                        <div className="text-white font-medium">{social.label}</div>
                        <div className="text-sm text-gray-400">{social.followers} followers</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Why Work With Me</h3>
                <div className="space-y-3">
                  {[
                    "✓ 10+ years of experience",
                    "✓ 50+ happy clients worldwide",
                    "✓ 24/7 support availability",
                    "✓ Competitive pricing",
                    "✓ On-time delivery guarantee",
                    "✓ Post-launch support"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-300"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                    <p className="text-gray-400">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Success Message */}
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            Email copied to clipboard!
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

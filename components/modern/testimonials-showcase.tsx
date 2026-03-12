"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Star, 
  Quote, 
  ArrowLeft, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Award, 
  Heart,
  MessageCircle,
  ThumbsUp,
  Calendar,
  Globe,
  Briefcase,
  CheckCircle,
  Sparkles,
  Zap,
  ExternalLink,
  Linkedin,
  Twitter
} from "lucide-react"
import Image from "next/image"

interface TestimonialsShowcaseProps {
  onNavigate?: (page: string) => void
}

export const TestimonialsShowcase = ({ onNavigate }: TestimonialsShowcaseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      company: "TechStart Inc.",
      avatar: "https://i.imgur.com/DQmY4hT.jpg",
      rating: 5,
      testimonial: "Elisha is an exceptional developer who transformed our vision into reality. His attention to detail and innovative approach exceeded our expectations. The project was delivered on time and the quality was outstanding.",
      project: "E-commerce Platform",
      duration: "3 months",
      tags: ["Frontend", "UI/UX", "Performance"],
      date: "March 2024",
      verified: true,
      social: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahj_tech"
      }
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "Innovate Solutions",
      avatar: "https://i.imgur.com/8Blt9Eo.jpg",
      rating: 5,
      testimonial: "Working with Elisha was a game-changer for our team. His expertise in modern web technologies and ability to understand complex requirements made the entire process smooth and efficient.",
      project: "SaaS Dashboard",
      duration: "2 months",
      tags: ["React", "Dashboard", "Analytics"],
      date: "February 2024",
      verified: true,
      social: {
        linkedin: "https://linkedin.com/in/michaelchen",
        twitter: "https://twitter.com/michaelc_dev"
      }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Creative Agency",
      avatar: "https://i.imgur.com/L8HmeD3.jpeg",
      rating: 5,
      testimonial: "Elisha's creative approach to web development helped us create a stunning online presence. His ability to blend aesthetics with functionality is remarkable. Highly recommended!",
      project: "Portfolio Website",
      duration: "6 weeks",
      tags: ["Design", "Portfolio", "Animation"],
      date: "January 2024",
      verified: true,
      social: {
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        twitter: "https://twitter.com/emilyr_creative"
      }
    },
    {
      id: 4,
      name: "David Kim",
      role: "CTO",
      company: "StartupHub",
      avatar: "https://i.imgur.com/6M86mxE.jpeg",
      rating: 5,
      testimonial: "Elisha's technical skills and problem-solving abilities are top-notch. He helped us optimize our application performance by 40% and implemented features that our users love.",
      project: "Performance Optimization",
      duration: "1 month",
      tags: ["Performance", "Optimization", "Backend"],
      date: "December 2023",
      verified: true,
      social: {
        linkedin: "https://linkedin.com/in/davidkim",
        twitter: "https://twitter.com/davidk_tech"
      }
    },
    {
      id: 5,
      name: "Amanda Foster",
      role: "Founder",
      company: "Wellness Co.",
      avatar: "https://i.imgur.com/pkfYrx1.jpeg",
      rating: 5,
      testimonial: "Elisha brought our wellness app to life with his expertise in mobile development. The user feedback has been overwhelmingly positive, and we couldn't be happier with the results.",
      project: "Mobile App",
      duration: "4 months",
      tags: ["Mobile", "React Native", "Health"],
      date: "November 2023",
      verified: true,
      social: {
        linkedin: "https://linkedin.com/in/amandafoster",
        twitter: "https://twitter.com/amandaf_wellness"
      }
    }
  ]

  const stats = [
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
    { icon: TrendingUp, value: "95%", label: "Client Satisfaction" },
    { icon: Award, value: "10+", label: "Years Experience" }
  ]

  const industries = [
    { name: "Technology", count: 15, icon: "💻" },
    { name: "E-commerce", count: 12, icon: "🛒" },
    { name: "Healthcare", count: 8, icon: "🏥" },
    { name: "Education", count: 10, icon: "📚" },
    { name: "Finance", count: 7, icon: "💰" },
    { name: "Real Estate", count: 6, icon: "🏠" }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
      />
    ))
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
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 blur-3xl"
          style={{
            left: `${(i * 137.5) % 100}%`,
            top: `${(i * 89.3) % 100}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
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
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
            <Heart className="w-4 h-4 mr-2" />
            Client Testimonials
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
              What Clients Say
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take my word for it. Here's what amazing clients and collaborators 
            have to say about working together on various projects.
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
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    {/* Quote Icon */}
                    <Quote className="w-16 h-16 text-yellow-400/20 mx-auto mb-8" />
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-2xl md:text-3xl text-white font-medium mb-8 leading-relaxed">
                      "{testimonials[currentIndex].testimonial}"
                    </blockquote>
                    
                    {/* Client Info */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="relative mb-4">
                        <Image
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          width={80}
                          height={80}
                          className="rounded-full border-4 border-yellow-400/20"
                        />
                        {testimonials[currentIndex].verified && (
                          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-white mb-1">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-gray-400 mb-2">
                          {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                        </p>
                        
                        {/* Rating */}
                        <div className="flex justify-center mb-4">
                          {renderStars(testimonials[currentIndex].rating)}
                        </div>
                        
                        {/* Project Info */}
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                            {testimonials[currentIndex].project}
                          </Badge>
                          <Badge className="bg-white/10 text-gray-300 border border-white/20">
                            {testimonials[currentIndex].duration}
                          </Badge>
                          <Badge className="bg-white/10 text-gray-300 border border-white/20">
                            {testimonials[currentIndex].date}
                          </Badge>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {testimonials[currentIndex].tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-white/10 text-gray-300 border border-white/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Social Links */}
                        <div className="flex justify-center gap-4">
                          {testimonials[currentIndex].social.linkedin && (
                            <a
                              href={testimonials[currentIndex].social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                          {testimonials[currentIndex].social.twitter && (
                            <a
                              href={testimonials[currentIndex].social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <Twitter className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-8">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevTestimonial}
                    className="text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-yellow-400 w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextTestimonial}
                    className="text-white hover:bg-white/10"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                {/* Auto-play Toggle */}
                <div className="flex justify-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="text-white/60 hover:text-white"
                  >
                    {isAutoPlaying ? 'Pause' : 'Play'} Auto-play
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Industries Grid */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Industries Served</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="text-2xl mb-2">{industry.icon}</div>
                    <div className="text-white font-medium">{industry.name}</div>
                    <div className="text-sm text-gray-400">{industry.count} projects</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center">
          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Join These Happy Clients?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Let's discuss your project and create something amazing together. 
                Your success story could be the next one here!
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-full"
                onClick={() => onNavigate?.("contact")}
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

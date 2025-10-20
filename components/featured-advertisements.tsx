"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Star,
  ArrowRight,
  Play,
  Pause,
  Eye,
  Heart,
  Share2
} from "lucide-react"
import Image from "next/image"

// Enhanced advertisement data with more details
const advertisements = [
  {
    id: 1,
    title: "Premium Web Development",
    subtitle: "Transform Your Digital Presence",
    description: "Get your business online with our professional web development services using cutting-edge technologies",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    link: "#contact",
    badge: "Popular",
    color: "from-blue-500 to-cyan-500",
    icon: Sparkles,
    stats: { views: "2.5K", likes: "890" }
  },
  {
    id: 2,
    title: "UI/UX Design Workshop",
    subtitle: "Master the Art of Design",
    description: "Join our exclusive workshop and learn the secrets of effective UI/UX design from industry experts",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    link: "#contact",
    badge: "Trending",
    color: "from-purple-500 to-pink-500",
    icon: TrendingUp,
    stats: { views: "3.2K", likes: "1.2K" }
  },
  {
    id: 3,
    title: "Digital Marketing Solutions",
    subtitle: "Amplify Your Brand",
    description: "Boost your online presence with our comprehensive digital marketing packages and strategies",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    link: "#contact",
    badge: "Hot",
    color: "from-orange-500 to-red-500",
    icon: Zap,
    stats: { views: "1.8K", likes: "650" }
  },
  {
    id: 4,
    title: "E-commerce Platform",
    subtitle: "Sell Smarter, Grow Faster",
    description: "Launch your online store with our secure and scalable e-commerce solutions tailored for success",
    image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "#contact",
    badge: "New",
    color: "from-green-500 to-emerald-500",
    icon: Star,
    stats: { views: "2.1K", likes: "780" }
  },
  {
    id: 5,
    title: "SEO Optimization",
    subtitle: "Rank Higher, Reach More",
    description: "Improve your search engine rankings and drive more organic traffic with proven SEO strategies",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    link: "#contact",
    badge: "Featured",
    color: "from-indigo-500 to-purple-500",
    icon: TrendingUp,
    stats: { views: "2.9K", likes: "950" }
  },
  {
    id: 6,
    title: "AI Implementation",
    subtitle: "Future-Proof Your Business",
    description: "Integrate artificial intelligence into your business processes and stay ahead of the competition",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "#contact",
    badge: "Premium",
    color: "from-cyan-500 to-blue-500",
    icon: Sparkles,
    stats: { views: "4.1K", likes: "1.5K" }
  },
]

export const FeaturedAdvertisements = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])
  
  const springConfig = { stiffness: 300, damping: 30 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

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

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + advertisements.length) % advertisements.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.length)
  }

  const currentAd = advertisements[currentIndex]
  const Icon = currentAd.icon

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }

  const thumbnailVariants = {
    inactive: { scale: 0.85, opacity: 0.5, filter: "grayscale(50%)" },
    active: { scale: 1, opacity: 1, filter: "grayscale(0%)" },
  }

  return (
    <div className="relative space-y-8">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            Featured Services
          </h2>
          <p className="text-muted-foreground">Discover our premium offerings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="rounded-full"
          >
            {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </motion.div>
      </div>

      {/* Main showcase with 3D effect */}
      <div 
        ref={containerRef}
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
          className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden"
        >
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                opacity: { duration: 0.3 }
              }}
              className="absolute inset-0"
            >
              <Card className="h-full border-none shadow-2xl overflow-hidden group">
                <CardContent className="p-0 h-full relative">
                  {/* Background Image with Parallax */}
                  <motion.div 
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={currentAd.image}
                      alt={currentAd.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Gradient Overlays */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentAd.color} opacity-40 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </motion.div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                        initial={{ 
                          x: Math.random() * 100 + "%", 
                          y: Math.random() * 100 + "%",
                          scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                          y: [null, Math.random() * -100 - 50 + "%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8 md:p-12 z-10">
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-4"
                    >
                      <Badge className={`bg-gradient-to-r ${currentAd.color} border-none text-white px-4 py-1.5 text-sm font-semibold`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {currentAd.badge}
                      </Badge>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-6xl font-bold text-white mb-2"
                    >
                      {currentAd.title}
                    </motion.h3>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl md:text-2xl text-white/90 mb-4"
                    >
                      {currentAd.subtitle}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-white/80 text-base md:text-lg mb-6 max-w-2xl"
                    >
                      {currentAd.description}
                    </motion.p>

                    {/* Stats and CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap items-center gap-4"
                    >
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-white/70">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{currentAd.stats.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{currentAd.stats.likes}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        asChild
                        size="lg"
                        className={`bg-gradient-to-r ${currentAd.color} hover:opacity-90 border-none text-white font-semibold group/btn`}
                      >
                        <a href={currentAd.link} className="flex items-center gap-2">
                          Get Started
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <Button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 z-20"
            onClick={handlePrevious}
            size="icon"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>

          <Button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 z-20"
            onClick={handleNext}
            size="icon"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </motion.div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {advertisements.map((ad, index) => {
            const isActive = index === currentIndex
            return (
              <motion.button
                key={ad.id}
                variants={thumbnailVariants}
                animate={isActive ? "active" : "inactive"}
                whileHover={{ scale: 0.95, opacity: 1, filter: "grayscale(0%)" }}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative flex-shrink-0 w-32 h-20 md:w-40 md:h-24 rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={ad.image}
                  alt={ad.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${ad.color} opacity-30`} />
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 border-4 border-white rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Hover overlay */}
                <AnimatePresence>
                  {hoveredCard === index && !isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center"
                    >
                      <Play className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-xs font-semibold truncate">{ad.title}</p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${currentAd.color}`}
          initial={{ width: "0%" }}
          animate={{ width: isAutoPlay ? "100%" : "0%" }}
          transition={{ duration: 6, ease: "linear" }}
          key={currentIndex}
        />
      </div>
    </div>
  )
}

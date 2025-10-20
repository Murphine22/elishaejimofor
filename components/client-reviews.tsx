"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, Sparkles, TrendingUp, Award, ChevronLeft, ChevronRight } from "lucide-react"

interface Review {
  id: number
  name: string
  role: string
  company: string
  rating: number
  comment: string
  avatar: string
  color: string
  achievement?: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Deacon Chinedu",
    role: "Leader",
    company: "DIGC (Ushering Department)",
    rating: 5,
    comment: "Elisha's work on our website redesign was exceptional. The attention to detail and modern design elements transformed our online presence. His creative approach and technical expertise exceeded all expectations.",
    avatar: "DC",
    color: "from-blue-500 to-cyan-500",
    achievement: "300% Traffic Increase"
  },
  {
    id: 2,
    name: "Ossy Onuzuike",
    role: "Marketing Director",
    company: "Forgo Battery Company Ltd.",
    rating: 5,
    comment: "Elisha's expertise in marketing strategy is truly top-tier! His ability to craft compelling campaigns and leverage digital channels effectively has significantly boosted our brand visibility and customer engagement.",
    avatar: "OO",
    color: "from-purple-500 to-pink-500",
    achievement: "250% ROI Growth"
  },
  {
    id: 3,
    name: "Obinna Oleribe",
    role: "CEO",
    company: "CFHI",
    rating: 5,
    comment: "Elisha brought our vision to life with exceptional design implementation. The user engagement has increased significantly, and our brand now stands out in the competitive healthcare industry.",
    avatar: "OO",
    color: "from-green-500 to-emerald-500",
    achievement: "400% User Engagement"
  },
  {
    id: 4,
    name: "Adeyemi David",
    role: "Brand Manager",
    company: "Timoyex Int'l",
    rating: 5,
    comment: "Professional, creative, and highly skilled. The interactive features and animations added a premium feel to our website. Elisha's work has elevated our brand to new heights.",
    avatar: "AD",
    color: "from-orange-500 to-red-500",
    achievement: "Premium Brand Status"
  }
]

export const ClientReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const currentReview = reviews[currentIndex]

  const nextReview = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevReview = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-600/10 px-4 py-2 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Client Success Stories</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600">
            What Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by industry leaders and innovative brands worldwide
          </p>
        </motion.div>

        {/* Review Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentReview.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 300 : -300, rotateY: direction > 0 ? 45 : -45 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -300 : 300, rotateY: direction > 0 ? -45 : 45 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="w-full"
              >
                <motion.div
                  className="relative bg-gradient-to-br from-card via-card to-card/80 rounded-3xl shadow-2xl overflow-hidden border border-primary/20"
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, rgba(120, 119, 198, 0.1) 50%, transparent 100%)`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Top accent bar */}
                  <div className={`h-2 bg-gradient-to-r ${currentReview.color}`} />

                  <div className="relative p-8 md:p-12">
                    {/* Quote icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="absolute top-8 right-8 opacity-10"
                    >
                      <Quote className="w-24 h-24 md:w-32 md:h-32" />
                    </motion.div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* Avatar Section */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="flex-shrink-0"
                      >
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${currentReview.color} flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-xl relative overflow-hidden group`}>
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="relative z-10">{currentReview.avatar}</span>
                        </div>
                      </motion.div>

                      {/* Content Section */}
                      <div className="flex-1 space-y-6">
                        {/* Client Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            {currentReview.name}
                          </h3>
                          <p className="text-base md:text-lg text-muted-foreground font-medium">
                            {currentReview.role} • {currentReview.company}
                          </p>
                        </motion.div>

                        {/* Rating */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex gap-1"
                        >
                          {[...Array(currentReview.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0, rotate: -180 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                            >
                              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Comment */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <p className="text-lg md:text-xl leading-relaxed text-foreground/90 relative z-10">
                            "{currentReview.comment}"
                          </p>
                        </motion.div>

                        {/* Achievement Badge */}
                        {currentReview.achievement && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 px-4 py-2 rounded-full"
                          >
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">
                              {currentReview.achievement}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
              <motion.button
                onClick={prevReview}
                className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={nextReview}
                className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {reviews.map((review, index) => (
              <motion.button
                key={review.id}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className="group relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-12 bg-gradient-to-r from-primary to-purple-600 shadow-lg"
                      : "w-3 bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { icon: Award, label: "Happy Clients", value: "20+" },
              { icon: Star, label: "5-Star Reviews", value: "20" },
              { icon: TrendingUp, label: "Success Rate", value: "98%" },
              { icon: Sparkles, label: "Projects Done", value: "30+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-primary/5 to-purple-600/5 rounded-2xl p-4 text-center border border-primary/10 hover:border-primary/30 transition-all"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
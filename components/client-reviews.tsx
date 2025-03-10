"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronDown, ChevronUp } from "lucide-react"

interface Review {
  id: number
  name: string
  role: string
  company: string
  rating: number
  comment: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Deacon Chinedu",
    role: "Leader",
    company: "DIGC (Ushering Department)",
    rating: 5,
    comment: "Elisha's work on our website redesign was exceptional. The attention to detail and modern design elements transformed our online presence."
  },
  {
    id: 2,
    name: "Ossy Onuzuike",
    role: "Marketing Director",
    company: "Forgo Battery Company Ltd.",
    rating: 4,
    comment: "Elisha's expertise in marketing strategy is truly top-tier! His ability to craft compelling campaigns and leverage digital channels effectively has significantly boosted our brand visibility."
  },
  {
    id: 3,
    name: "Obinna Oleribe",
    role: "CEO",
    company: "CFHI",
    rating: 5,
    comment: "Elisha brought our vision to life with exceptional design implementation. The user engagement has increased significantly."
  },
  {
    id: 4,
    name: "Adeyemi David",
    role: "Brand Manager",
    company: "Timoyex Int'l",
    rating: 5,
    comment: "Professional, creative, and highly skilled. The interactive features and animations added a premium feel to our website."
  }
]

export const ClientReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isExpanded) {
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [isExpanded])

  const currentReview = reviews[currentIndex]

  return (
    <section className="py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
      >
        Client Reviews
      </motion.h2>
      
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentReview.id}
              custom={direction}
              initial={{ opacity: 0, x: direction ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction ? -100 : 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full"
            >
              <motion.div
                className={`bg-card rounded-xl shadow-lg relative overflow-hidden transition-all duration-300 ${
                  isExpanded ? "min-h-[400px]" : "h-[300px]"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-purple-500 to-primary" />
                
                <div className="p-8">
                  <div className="flex flex-col">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="font-bold text-2xl mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        {currentReview.name}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground mb-4">
                        {currentReview.role} at {currentReview.company}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className={`relative ${!isExpanded && "max-h-32 overflow-hidden"}`}
                    >
                      <p className="text-lg italic leading-relaxed">
                        "{currentReview.comment}"
                      </p>
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 flex items-center justify-between"
                    >
                      <div className="flex gap-1">
                        {[...Array(currentReview.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>

                      <motion.button
                        className="sm:hidden flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        onClick={() => setIsExpanded(!isExpanded)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isExpanded ? (
                          <>
                            Show Less <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {reviews.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 
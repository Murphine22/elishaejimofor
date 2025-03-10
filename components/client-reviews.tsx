"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface Review {
  id: number
  name: string
  role: string
  company: string
  rating: number
  comment: string
  image: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechVision Inc.",
    rating: 5,
    comment: "Elisha's work on our website redesign was exceptional. The attention to detail and modern design elements transformed our online presence.",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    company: "Digital Spark",
    rating: 5,
    comment: "Outstanding frontend development skills! The responsive design and smooth animations made our platform stand out from competitors.",
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Product Manager",
    company: "InnovateLab",
    rating: 5,
    comment: "Elisha brought our vision to life with exceptional UI/UX implementation. The user engagement has increased significantly.",
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Founder",
    company: "CreativeFlow Studio",
    rating: 5,
    comment: "Professional, creative, and highly skilled. The interactive features and animations added a premium feel to our website.",
    image: "https://i.pravatar.cc/150?img=4"
  }
]

export const ClientReviews = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
              animate={{ scale: [0.95, 1] }}
              transition={{ duration: 0.3 }}
            />
            <div className="flex items-start gap-4 relative z-10">
              <motion.img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {review.role} at {review.company}
                </p>
                <div className="flex gap-1 my-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <motion.p
                  className="text-muted-foreground mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  "{review.comment}"
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 
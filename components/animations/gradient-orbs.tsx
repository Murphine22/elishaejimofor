"use client"

import { motion } from "framer-motion"

export const GradientOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1 - Purple */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "10%" }}
      />

      {/* Orb 2 - Cyan */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "50%", right: "10%" }}
      />

      {/* Orb 3 - Orange */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "10%", left: "30%" }}
      />

      {/* Orb 4 - Green */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "30%", left: "50%" }}
      />
    </div>
  )
}

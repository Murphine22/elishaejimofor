"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-50 hidden md:block"
          animate={{
            x: mousePosition.x - 250,
            y: mousePosition.y - 250,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5,
          }}
        >
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 via-purple-500/20 to-cyan-500/20 blur-3xl opacity-50" />
        </motion.div>
      )}
    </>
  )
}

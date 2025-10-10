"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export const DigitalClock = () => {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

  const formatDate = (date: Date) =>
    date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric", year: "numeric" })

  if (!time) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-[hsl(var(--primary)/0.3)] bg-gradient-to-r from-[hsl(var(--primary)/0.15)] to-[hsl(var(--primary)/0.3)] backdrop-blur-md shadow-md hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-500 ease-out"
    >
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-sm sm:text-base font-mono font-semibold text-[hsl(var(--primary))]"
      >
        {formatTime(time)}
      </motion.div>
      <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{formatDate(time)}</div>
    </motion.div>
  )
}

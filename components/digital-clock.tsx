"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export const DigitalClock = () => {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
  }

  if (!time) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="hidden md:flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg p-2 border border-border"
    >
      <div className="text-sm font-mono font-bold text-primary">{formatTime(time)}</div>
      <div className="text-xs font-mono text-muted-foreground">{formatDate(time)}</div>
    </motion.div>
  )
}


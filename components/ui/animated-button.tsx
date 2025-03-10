"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  href?: string
  icon?: ReactNode
}

export function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  href,
  icon,
}: AnimatedButtonProps) {
  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && <span className="relative z-10 ml-2">{icon}</span>}
      <motion.span
        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-md"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </>
  )

  if (href) {
    return (
      <Button variant={variant} size={size} className={cn("relative overflow-hidden", className)} asChild>
        <a href={href}>{buttonContent}</a>
      </Button>
    )
  }

  return (
    <Button variant={variant} size={size} className={cn("relative overflow-hidden", className)} onClick={onClick}>
      {buttonContent}
    </Button>
  )
}


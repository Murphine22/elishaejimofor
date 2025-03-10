"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PhoneIcon as WhatsappLogo, MessageCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-media-query"

interface WhatsAppButtonProps {
  phoneNumber: string
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <motion.div className="relative">
            {/* Ripple effect background */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-500/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-green-500/25 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: isDesktop ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Inner glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
              
              {/* Icon container with rotation */}
              <motion.div
                className="relative z-10"
                whileHover={{ rotate: isDesktop ? [0, -10, 10, -10, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <WhatsappLogo className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>

              {/* Text that slides in on hover - Only on desktop */}
              {isDesktop && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileHover={{ width: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <span className="text-sm sm:text-base text-white font-medium">Chat with me</span>
                </motion.div>
              )}

              {/* Message icon with bounce effect - Only on desktop */}
              {isDesktop && (
                <motion.div
                  className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.div>
              )}
            </motion.a>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          side={isDesktop ? "left" : "top"} 
          className="bg-green-500 text-white border-green-600 text-xs sm:text-sm"
        >
          <p>Message me on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  onNavigate: (page: string) => void
}

const menuItems = [
  { id: "about", label: "About", icon: "👤" },
  { id: "services", label: "Services", icon: "🛠️" },
  { id: "skills", label: "Skills", icon: "💡" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "blog", label: "Blog", icon: "📝" }
]

export const MobileMenu = ({ onNavigate }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleNavigation = (page: string) => {
    onNavigate(page)
    setIsOpen(false)
  }

  return (
    <div className="block sm:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="relative z-[100] hover:bg-transparent"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90]"
              onClick={toggleMenu}
            />

            {/* Menu content */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-gradient-to-b from-background via-background/95 to-background border-l shadow-2xl z-[95] p-6"
            >
              <div className="mt-12 space-y-1">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 300,
                      delay: index * 0.1,
                    }}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => handleNavigation(item.id)}
                      className="w-full p-3 flex items-center space-x-4 rounded-lg relative overflow-hidden group"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                        animate={{
                          scale: hoveredItem === item.id ? 1 : 0.95,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                      <span className="relative z-10 text-xl">{item.icon}</span>
                      <span className="relative z-10 text-lg font-medium">{item.label}</span>
                      <motion.div
                        className="absolute right-3 opacity-0 group-hover:opacity-100"
                        initial={{ x: -10 }}
                        animate={{ x: hoveredItem === item.id ? 0 : -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
              
              <motion.div
                className="absolute bottom-8 left-6 right-6 h-1 bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50 rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
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

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when menu is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'
  }

  const handleNavigation = (page: string) => {
    onNavigate(page)
    setIsOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="block sm:hidden">
      <Button
        variant="ghost"
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm border shadow-md hover:bg-accent"
      >
        <span className="font-medium">Menu</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
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
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 right-4 w-64 rounded-lg bg-background border shadow-lg z-50"
            >
              <nav className="py-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className="w-full px-6 py-4 text-left hover:bg-accent/50 active:bg-accent transition-colors flex items-center gap-4 group border-b last:border-none"
                    onClick={() => handleNavigation(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div className="flex-1">
                      <span className="block text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        {item.label}
                      </span>
                    </div>
                    <motion.div
                      className="text-primary opacity-0 group-hover:opacity-100 transition-all"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                ))}
              </nav>

              {/* Decorative gradient line */}
              <motion.div
                className="absolute bottom-0 left-2 right-2 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full"
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
"use client"

import { useState, useEffect } from "react"
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
  const [selectedPage, setSelectedPage] = useState<string | null>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest('.mobile-menu-container')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigation = (page: string) => {
    setSelectedPage(page)
    onNavigate(page)
    setIsOpen(false)
  }

  return (
    <div className="block sm:hidden mobile-menu-container">
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-background/95 backdrop-blur-sm border-b px-4 py-2">
        <Button
          variant="ghost"
          onClick={toggleMenu}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent w-full justify-between"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className="font-medium">Navigation Menu</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[1001]"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[60px] left-4 right-4 bg-popover rounded-lg border shadow-lg z-[1002] overflow-hidden"
            >
              <nav className="py-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 group
                      ${selectedPage === item.id ? 'bg-accent/50' : 'hover:bg-accent/80'}`}
                    onClick={() => handleNavigation(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    <motion.span
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Spacer for fixed header */}
      <div className="h-[60px]" />
    </div>
  )
} 
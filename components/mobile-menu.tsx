"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  onNavigate: (page: string) => void
}

const menuItems = [
  { id: "about", label: "About", description: "Learn more about me" },
  { id: "services", label: "Services", description: "Explore my services" },
  { id: "skills", label: "Skills", description: "View my expertise" },
  { id: "projects", label: "Projects", description: "See my work" },
  { id: "blog", label: "Blog", description: "Read my articles" },
  { id: "contact", label: "Contact", description: "Get in touch" }
]

export const MobileMenu = ({ onNavigate }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto'
  }

  const handleNavigation = (page: string) => {
    setActiveItem(page)
    onNavigate(page)
    setIsOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="block sm:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-[9999] hover:bg-transparent"
        aria-label="Toggle navigation menu"
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
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ 
                opacity: 1,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)"
              }}
              exit={{ 
                opacity: 0,
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)"
              }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/60 z-[9990]"
              onClick={toggleMenu}
            />

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-16 right-4 w-64 bg-background/95 backdrop-blur-md rounded-lg border shadow-xl z-[9995] overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              />

              <nav className="p-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full p-3 flex items-center text-left rounded-md relative overflow-hidden group ${
                      activeItem === item.id ? 'bg-primary/10' : ''
                    }`}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 300,
                      delay: index * 0.1,
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 opacity-0 group-hover:opacity-100"
                      initial={false}
                      animate={{ scale: activeItem === item.id ? 1 : 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                    
                    <div className="flex-1 relative z-10">
                      <span className="block text-base font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>

                    <motion.div
                      className="relative z-10 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </motion.div>
                  </motion.button>
                ))}
              </nav>

              <motion.div
                className="h-1 bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 
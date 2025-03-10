"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  onNavigate: (page: string) => void
}

const menuItems = [
  { id: "about", label: "About", icon: "👤", description: "Learn more about me" },
  { id: "services", label: "Services", icon: "🛠️", description: "What I offer" },
  { id: "skills", label: "Skills", icon: "💡", description: "My expertise" },
  { id: "projects", label: "Projects", icon: "🚀", description: "View my work" },
  { id: "blog", label: "Blog", icon: "📝", description: "Read my articles" }
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
        className="relative z-[200] hover:bg-transparent"
        aria-label="Toggle mobile menu"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[150]"
              onClick={toggleMenu}
            />

            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-gradient-to-b from-background via-background/95 to-background border-l shadow-2xl z-[175]"
            >
              <div className="p-6">
                <motion.h2 
                  className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Menu
                </motion.h2>

                <nav className="space-y-2">
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
                      <motion.button
                        onClick={() => handleNavigation(item.id)}
                        className="w-full p-4 flex items-center space-x-4 rounded-lg relative overflow-hidden group"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 opacity-0 group-hover:opacity-100"
                          initial={false}
                          animate={{ scale: hoveredItem === item.id ? 1 : 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                        
                        <span className="relative z-10 text-2xl">{item.icon}</span>
                        
                        <div className="flex-1 relative z-10">
                          <span className="block text-lg font-medium">{item.label}</span>
                          <span className="text-sm text-muted-foreground">{item.description}</span>
                        </div>

                        <motion.div
                          className="relative z-10 opacity-0 group-hover:opacity-100 transform transition-all"
                          initial={{ x: -10 }}
                          animate={{ x: hoveredItem === item.id ? 0 : -10 }}
                        >
                          <ChevronRight className="h-5 w-5 text-primary" />
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  ))}
                </nav>
              </div>

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
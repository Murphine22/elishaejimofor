"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight, Home, User, Briefcase, Code, BookOpen, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  onNavigate: (page: string) => void
}

const menuSections = [
  {
    title: "Main",
    items: [
      { id: "home", label: "Home", icon: <Home className="w-5 h-5" />, description: "Back to homepage" },
      { id: "about", label: "About", icon: <User className="w-5 h-5" />, description: "Learn more about me" },
    ]
  },
  {
    title: "Professional",
    items: [
      { id: "services", label: "Services", icon: <Briefcase className="w-5 h-5" />, description: "What I offer" },
      { id: "skills", label: "Skills", icon: <Code className="w-5 h-5" />, description: "My expertise" },
      { id: "projects", label: "Projects", icon: "🚀", description: "View my work" },
    ]
  },
  {
    title: "Content",
    items: [
      { id: "blog", label: "Blog", icon: <BookOpen className="w-5 h-5" />, description: "Read my articles" },
      { id: "contact", label: "Contact", icon: <Mail className="w-5 h-5" />, description: "Get in touch" },
    ]
  }
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
        className="fixed top-4 right-4 z-[1000] hover:bg-transparent"
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
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[900]"
              onClick={toggleMenu}
            />

            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-gradient-to-b from-background via-background/95 to-background border-l shadow-2xl z-[950] overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <motion.h2 
                  className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Menu
                </motion.h2>

                <nav className="space-y-6">
                  {menuSections.map((section, sectionIndex) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sectionIndex * 0.1 }}
                    >
                      <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">
                        {section.title}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <motion.div
                            key={item.id}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 300,
                              delay: (sectionIndex * section.items.length + itemIndex) * 0.1,
                            }}
                          >
                            <motion.button
                              onClick={() => handleNavigation(item.id)}
                              className={`w-full p-3 flex items-center space-x-4 rounded-lg relative overflow-hidden group ${
                                activeItem === item.id ? 'bg-primary/10' : ''
                              }`}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 opacity-0 group-hover:opacity-100"
                                initial={false}
                                animate={{ scale: activeItem === item.id ? 1 : 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              />
                              
                              <span className="relative z-10 flex items-center justify-center transform transition-transform group-hover:scale-110">
                                {typeof item.icon === 'string' ? (
                                  <span className="text-2xl">{item.icon}</span>
                                ) : (
                                  item.icon
                                )}
                              </span>
                              
                              <div className="flex-1 relative z-10">
                                <span className="block text-base font-medium">{item.label}</span>
                                <span className="text-xs text-muted-foreground">{item.description}</span>
                              </div>

                              <motion.div
                                className="relative z-10 opacity-0 group-hover:opacity-100 transform transition-all duration-200"
                                initial={{ x: -10 }}
                                whileHover={{ x: 0 }}
                              >
                                <ChevronRight className="h-4 w-4 text-primary" />
                              </motion.div>
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
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
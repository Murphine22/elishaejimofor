"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ChevronRight,
  User,
  Briefcase,
  Sparkles,
  FolderGit2,
  PenLine,
  Mail,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createPortal } from "react-dom"

interface MobileMenuProps {
  onNavigate: (page: string) => void
}

type MenuIcon = React.ComponentType<{ className?: string }>

const menuItems: { id: string; label: string; description: string; icon: MenuIcon }[] = [
  { id: "about", label: "About", description: "Learn more about me", icon: User },
  { id: "services", label: "Services", description: "Explore my services", icon: Briefcase },
  { id: "skills", label: "Skills", description: "View my expertise", icon: Sparkles },
  { id: "projects", label: "Projects", description: "See my work", icon: FolderGit2 },
  { id: "blog", label: "Blog", description: "Read my articles", icon: PenLine },
  { id: "contact", label: "Contact", description: "Get in touch", icon: Mail },
]

export const MobileMenu = ({ onNavigate }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [indicatorY, setIndicatorY] = useState<number>(0)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleNavigation = (page: string, index: number) => {
    setActiveItem(page)
    onNavigate(page)
    setIsOpen(false)
    setIndicatorY(index * 60)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const filteredItems = menuItems.filter((item) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      item.label.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q)
    )
  })

  // Render the menu portal
  const menuContent = isOpen ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.97 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        ref={menuRef}
        className="fixed top-16 right-4 w-[88vw] max-w-[22rem] bg-background/95 backdrop-blur-lg rounded-xl border border-border/50 shadow-2xl overflow-hidden z-[100000]"
        role="menu"
      >
        {/* Caret pointer */}
        <div className="absolute -top-2 right-6 h-4 w-4 rotate-45 bg-background/95 border border-border/40" />

        {/* Header */}
        <div className="px-3 pt-3 pb-2 border-b border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold">Navigate</span>
            <span className="text-xs text-muted-foreground">Jump to a section</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages..."
              className="pl-9 h-9 text-sm bg-background/70"
              aria-label="Search pages"
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="relative">
          {/* Sliding indicator */}
          <AnimatePresence>
            {activeItem && (
              <motion.div
                layoutId="indicator"
                className="absolute left-2 right-2 h-[2.5rem] rounded-md bg-gradient-to-r from-primary/15 via-purple-500/15 to-primary/15"
                initial={false}
                animate={{ y: indicatorY }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
          </AnimatePresence>

          <nav className="relative z-10 px-2 pb-4 max-h-80 overflow-y-auto">
            {filteredItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id, index)}
                className={`w-full p-3 flex items-center text-left rounded-md relative overflow-hidden group ${
                  activeItem === item.id ? "text-primary" : ""
                }`}
                initial={{ x: 15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                  delay: index * 0.05,
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10 mr-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
                  <item.icon className="h-4 w-4" />
                </div>

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
            {filteredItems.length === 0 && (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                No pages found
              </div>
            )}
          </nav>

          {/* Bottom Fade Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background/90 to-transparent pointer-events-none rounded-b-xl" />
        </div>
      </motion.div>
    </AnimatePresence>
  ) : null

  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="fixed top-4 right-4 z-[100001] hover:bg-transparent shadow-md bg-background/80 backdrop-blur-sm"
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

      {/* Render dropdown above all other elements via portal */}
      {typeof window !== "undefined" && createPortal(menuContent, document.body)}
    </>
  )
}

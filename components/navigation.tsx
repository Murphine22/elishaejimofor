"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"


interface NavigationProps {
  activePage: string
  setActivePage: (page: string) => void
}

export const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage }) => {
  const pages = ["about", "skills", "projects", "services", "blog"]

  return (
    <div className="flex items-center gap-2">
      {activePage !== "home" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActivePage("home")}
          className="mr-2 relative overflow-hidden group"
          aria-label="Back to home"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <ChevronLeft className="h-5 w-5 relative z-10" />
        </Button>
      )}
      <nav className="hidden md:flex gap-2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-cyan-500/5 rounded-lg -z-10" />
        {pages.map((page) => (
          <Button
            key={page}
            variant={activePage === page ? "default" : "ghost"}
            onClick={() => setActivePage(page)}
            className="relative overflow-hidden group"
          >
            {activePage === page && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 opacity-20 z-[-1]"
                layoutId="activePageHighlight"
                initial={false}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]" />
            <span className="relative z-10 capitalize">{page}</span>
          </Button>
        ))}
      </nav>
    </div>
  )
}


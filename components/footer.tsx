"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Facebook, Instagram } from "lucide-react"

interface FooterProps {
  setActivePage: (page: string) => void
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full overflow-hidden border-t border-border/30 bg-gradient-to-b from-background via-background/70 to-background/90 backdrop-blur-xl"
    >
      {/* Animated background gradient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-2xl opacity-70"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <div className="relative z-10 container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {/* LEFT: Brand Identity */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">Elisha Ejimofor</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed max-w-sm">
            Crafting timeless digital experiences that spark connection, inspire action, and elevate brands in the modern world.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActivePage("contact")}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all"
          >
            Let’s Collaborate
          </motion.button>
        </motion.div>

        {/* MIDDLE: Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-2">
            {["home", "about", "services", "skills", "projects", "blog", "contact"].map((page) => (
              <motion.li
                key={page}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <button
                  onClick={() => setActivePage(page)}
                  className="capitalize text-muted-foreground hover:text-primary transition-all duration-200"
                >
                  {page}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT: Social & Contact */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-foreground">Let’s Connect</h3>
          <div className="flex flex-wrap gap-5 mb-6">
            {[
              { Icon: Github, link: "https://github.com/Murphine22", label: "GitHub" },
              { Icon: Linkedin, link: "https://linkedin.com/in/murphine22", label: "LinkedIn" },
              { Icon: Facebook, link: "https://facebook.com/yourusername", label: "Facebook" },
              { Icon: Instagram, link: "https://instagram.com/yourusername", label: "Instagram" },
              { Icon: Mail, link: "mailto:elishaejimofor@gmail.com", label: "Email" },
            ].map(({ Icon, link, label }) => (
              <motion.a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="p-3 rounded-full bg-background border border-border hover:border-primary/50 shadow-sm group-hover:shadow-lg transition-all">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute text-xs text-muted-foreground left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100"
                >
                  {label}
                </motion.span>
              </motion.a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} <span className="font-medium text-foreground">Elisha Ejimofor</span>. Built with passion & purpose.
          </p>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-purple-500 to-primary"
      />
    </motion.footer>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { 
  User, 
  LogIn, 
  LogOut, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  ArrowRight,
  Github,
  Google
} from "lucide-react"

export const UserAuthButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoggedIn(true)
    setIsLoading(false)
    setIsOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail("")
    setPassword("")
    setName("")
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={isLoggedIn ? handleLogout : () => setIsOpen(true)}
        className="relative overflow-hidden group"
      >
        <motion.div
          className="flex items-center gap-2"
          initial={false}
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
        >
          {isLoggedIn ? (
            <>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </>
          ) : (
            <>
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-lg border-primary/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "signup" : "signin"}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={formVariants}
              className="space-y-6 py-4"
            >
              <motion.div 
                className="flex flex-col items-center gap-2 mb-8"
                variants={itemVariants}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSignUp ? (
                    <UserPlus className="h-6 w-6 text-primary" />
                  ) : (
                    <LogIn className="h-6 w-6 text-primary" />
                  )}
                </motion.div>
                <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-sm text-muted-foreground text-center">
                  {isSignUp 
                    ? "Sign up to access all features" 
                    : "Sign in to continue to your account"}
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        placeholder="John Doe"
                        required
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="you@example.com"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full relative overflow-hidden group"
                    disabled={isLoading}
                  >
                    <motion.div
                      className="flex items-center justify-center gap-2"
                      animate={{ opacity: isLoading ? 0 : 1 }}
                    >
                      {isSignUp ? "Create Account" : "Sign In"}
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </Button>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="relative flex items-center gap-4 py-4"
                >
                  <div className="flex-grow h-px bg-border" />
                  <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
                  <div className="flex-grow h-px bg-border" />
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-4"
                >
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Google className="h-4 w-4" />
                      <span className="hidden sm:inline">Google</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Github className="h-4 w-4" />
                      <span className="hidden sm:inline">GitHub</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-black/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </form>

              <motion.p 
                variants={itemVariants}
                className="text-sm text-center text-muted-foreground"
              >
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:underline font-medium"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  )
}


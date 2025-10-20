"use client"

import { useState } from "react"
import { useAdmin } from "@/components/admin-context"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Mail, Eye, EyeOff, LogIn, Shield } from "lucide-react"

export function AdminLogin() {
  const { isAdmin, loginAsAdmin } = useAdmin()
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (isAdmin) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const success = loginAsAdmin(email, password)
    if (success) {
      setShowLogin(false)
      setEmail("")
      setPassword("")
    }
    setIsLoading(false)
  }

  return (
    <>
      {/* Floating Admin Button */}
      {!showLogin && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setShowLogin(true)}
          className="fixed bottom-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110"
          title="Admin Login"
        >
          <Shield className="w-5 h-5" />
        </motion.button>
      )}

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="bg-background border-2 border-primary/20 rounded-2xl shadow-2xl p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                    Admin Login
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sign in to manage your website content
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Default Credentials Info */}
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      <strong>Default Credentials:</strong><br />
                      Email: elishaejimofor@gmail.com<br />
                      Password: admin123
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowLogin(false)}
                      className="flex-1 py-3 px-4 border-2 rounded-lg font-medium hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="w-5 h-5" />
                          <span>Sign In</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

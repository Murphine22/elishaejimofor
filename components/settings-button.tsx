"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export const SettingsButton = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  // Check if user is admin and logged in status (simplified for demo)
  useEffect(() => {
    const checkUserStatus = () => {
      const user = localStorage.getItem("user")
      if (user) {
        try {
          const userData = JSON.parse(user)
          setIsAdmin(userData.email === "elishaejimofor@gmail.com")
          setIsLoggedIn(true)
          setUserEmail(userData.email)
        } catch (e) {
          setIsAdmin(false)
          setIsLoggedIn(false)
          setUserEmail("")
        }
      } else {
        setIsAdmin(false)
        setIsLoggedIn(false)
        setUserEmail("")
      }
    }

    checkUserStatus()
    window.addEventListener("storage", checkUserStatus)
    return () => window.removeEventListener("storage", checkUserStatus)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Simple login logic for demo
    if (email === "elishaejimofor@gmail.com" && password === "Murphine22fb") {
      localStorage.setItem("user", JSON.stringify({ email, isAdmin: true }))
      setIsAdmin(true)
      setIsLoggedIn(true)
      setUserEmail(email)
      alert("Admin login successful!")
    } else if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email, isAdmin: false }))
      setIsLoggedIn(true)
      setUserEmail(email)
      alert("User login successful!")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const email = formData.get("email") as string

    // Simple registration logic for demo
    if (email) {
      localStorage.setItem("user", JSON.stringify({ email, isAdmin: false }))
      setIsLoggedIn(true)
      setUserEmail(email)
      alert("Registration successful!")
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("user")
    setIsAdmin(false)
    setIsLoggedIn(false)
    setUserEmail("")
    alert("You have been signed out successfully!")
  }

  const handleSubmitAd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin) {
      alert("Only administrators can submit advertisements directly.")
      return
    }

    alert("Advertisement submitted successfully!")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="relative group bg-gradient-to-r from-primary to-purple-600 p-3 rounded-full shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="absolute inset-0 bg-white/25 rounded-full"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <Settings className="w-6 h-6 text-white relative z-10" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            {isAdmin && <TabsTrigger value="advertisements">Advertisements</TabsTrigger>}
          </TabsList>

          <TabsContent value="account" className="space-y-4 py-4">
            {isLoggedIn ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-1">Logged in as:</h3>
                  <p className="text-primary">{userEmail}</p>
                  {isAdmin && <Badge className="mt-2">Administrator</Badge>}
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 pt-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4 pt-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm Password</Label>
                      <Input id="confirm" name="confirm" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Register
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </TabsContent>

          {isAdmin && (
            <TabsContent value="advertisements" className="space-y-4 py-4">
              <form onSubmit={handleSubmitAd} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adTitle">Advertisement Title</Label>
                  <Input id="adTitle" placeholder="Enter a catchy title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adDescription">Advertisement Description</Label>
                  <Textarea id="adDescription" placeholder="Describe your product or service" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input id="imageUrl" placeholder="https://example.com/image.jpg" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adLink">Link URL</Label>
                  <Input id="adLink" placeholder="https://example.com/product" required />
                </div>
                <Button type="submit" className="w-full">
                  Add Advertisement
                </Button>
              </form>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">Advertisement Requests</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Digital Marketing Services</span>
                      <Button variant="outline" size="sm">
                        Approve
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">From: marketing@example.com</p>
                  </div>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Web Development Course</span>
                      <Button variant="outline" size="sm">
                        Approve
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">From: academy@example.com</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}


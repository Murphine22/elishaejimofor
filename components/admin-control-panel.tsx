"use client"

import { useAdmin } from "@/components/admin-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Edit, 
  Save, 
  X, 
  Eye, 
  Lock, 
  ImagePlus, 
  FileText, 
  Move, 
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

interface FloatingButton {
  id: string;
  name: string;
  icon: string;
  visible: boolean;
}

interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  timestamp: string;
}

export const AdminControlPanel = () => {
  const { isAdmin, isEditMode, toggleEditMode, saveChanges, discardChanges } = useAdmin()
  const [isRealAdmin, setIsRealAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState<"posts" | "images" | "buttons">("posts")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState<Partial<Post>>({})
  const [floatingButtons, setFloatingButtons] = useState<FloatingButton[]>([
    { id: "whatsapp", name: "WhatsApp", icon: "whatsapp.svg", visible: true },
    { id: "chatbot", name: "AI Chatbot", icon: "chatbot.svg", visible: true },
    { id: "settings", name: "Settings", icon: "settings.svg", visible: true }
  ])
  
  // Additional security check to verify admin status
  useEffect(() => {
    const verifyAdminStatus = () => {
      const user = localStorage.getItem("user")
      if (!user) {
        setIsRealAdmin(false)
        return
      }
      
      try {
        const userData = JSON.parse(user)
        setIsRealAdmin(
          userData.email === "elishaejimofor@gmail.com" && 
          userData.isAdmin === true
        )
      } catch (e) {
        setIsRealAdmin(false)
      }
    }
    
    verifyAdminStatus()
    window.addEventListener("storage", verifyAdminStatus)
    const intervalCheck = setInterval(verifyAdminStatus, 10000)
    
    return () => {
      window.removeEventListener("storage", verifyAdminStatus)
      clearInterval(intervalCheck)
    }
  }, [])

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      const post: Post = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        image: newPost.image || "",
        timestamp: new Date().toISOString()
      }
      setPosts([...posts, post])
      setNewPost({})
      setIsDialogOpen(false)
    }
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const handleButtonVisibility = (id: string) => {
    setFloatingButtons(buttons =>
      buttons.map(button =>
        button.id === id ? { ...button, visible: !button.visible } : button
      )
    )
  }

  const handleButtonMove = (id: string, direction: "up" | "down") => {
    const index = floatingButtons.findIndex(button => button.id === id)
    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < floatingButtons.length - 1)
    ) {
      const newButtons = [...floatingButtons]
      const temp = newButtons[index]
      newButtons[index] = newButtons[direction === "up" ? index - 1 : index + 1]
      newButtons[direction === "up" ? index - 1 : index + 1] = temp
      setFloatingButtons(newButtons)
    }
  }

  // Only show the panel if the user is a verified admin
  if (!isAdmin || !isRealAdmin) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-4 left-4 z-50 bg-background/95 backdrop-blur-md p-4 rounded-lg shadow-lg border border-primary/20 w-[300px]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm">Admin Controls</h3>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={activeTab === "posts" ? "default" : "outline"}
              onClick={() => setActiveTab("posts")}
              className="flex-1"
            >
              <FileText className="h-4 w-4 mr-1" />
              Posts
            </Button>
            <Button
              size="sm"
              variant={activeTab === "images" ? "default" : "outline"}
              onClick={() => setActiveTab("images")}
              className="flex-1"
            >
              <ImagePlus className="h-4 w-4 mr-1" />
              Images
            </Button>
            <Button
              size="sm"
              variant={activeTab === "buttons" ? "default" : "outline"}
              onClick={() => setActiveTab("buttons")}
              className="flex-1"
            >
              <Move className="h-4 w-4 mr-1" />
              Buttons
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "posts" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Post
                </Button>
                <div className="max-h-[300px] overflow-y-auto space-y-2">
                  {posts.map(post => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-background/50 p-2 rounded-md border border-border"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{post.title}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "buttons" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {floatingButtons.map((button, index) => (
                  <motion.div
                    key={button.id}
                    className="flex items-center gap-2 bg-background/50 p-2 rounded-md border border-border"
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleButtonVisibility(button.id)}
                      className={!button.visible ? "text-muted-foreground" : ""}
                    >
                      {button.visible ? "Hide" : "Show"}
                    </Button>
                    <span className="flex-grow font-medium">{button.name}</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleButtonMove(button.id, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleButtonMove(button.id, "down")}
                        disabled={index === floatingButtons.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-2 mt-4">
            {isEditMode ? (
              <>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/30"
                  onClick={saveChanges}
                >
                  <Save className="h-3 w-3" />
                  <span className="text-xs">Save</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/30"
                  onClick={discardChanges}
                >
                  <X className="h-3 w-3" />
                  <span className="text-xs">Cancel</span>
                </Button>
              </>
            ) : (
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-blue-500/30"
                onClick={toggleEditMode}
              >
                <Edit className="h-3 w-3" />
                <span className="text-xs">Edit Content</span>
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newPost.title || ""}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Enter post title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newPost.content || ""}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Enter post content"
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={newPost.image || ""}
                onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPost}>
                Add Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 
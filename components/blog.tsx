"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Heart, MessageSquare, Bookmark, Share2, Edit, Trash2, Send, Search } from "lucide-react"
import Image from "next/image"

// Define the post and comment types
interface Comment {
  id: number
  user: string
  content: string
  timestamp: string
}

interface Post {
  id: number
  title: string
  location: string
  image: string
  content: string
  publisher: string
  timestamp: string
  likes: number
  comments: Comment[]
  isPremium: boolean
  category: string
  categoryColor: string
}

// Sample blog posts
const initialPosts: Post[] = [
  {
    id: 1,
    title: "Nigeria's Tech Ecosystem Sees 40% Growth in 2023",
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    content:
      "The Nigerian tech ecosystem has experienced unprecedented growth in 2023, with investments reaching an all-time high. Startups in fintech, healthtech, and edtech sectors have been the primary beneficiaries of this surge in funding and support.",
    publisher: "TechAfrica News",
    timestamp: "2023-11-15T10:30:00",
    likes: 245,
    comments: [
      {
        id: 1,
        user: "John Doe",
        content: "This is fantastic news for our tech industry!",
        timestamp: "2023-11-15T11:45:00",
      },
      {
        id: 2,
        user: "Jane Smith",
        content: "I'm excited to see what innovations come next.",
        timestamp: "2023-11-15T13:20:00",
      },
    ],
    isPremium: false,
    category: "Business",
    categoryColor: "from-green-500 to-green-600",
  },
  {
    id: 2,
    title: "Revolutionary AI Solution Developed by Kenyan Startup",
    location: "Nairobi, Kenya",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    content:
      "A Kenyan startup has developed an AI solution that addresses unique African challenges in agriculture. The system uses machine learning to predict crop diseases and recommend preventive measures, potentially increasing yields by up to 30%.",
    publisher: "African Innovation Digest",
    timestamp: "2023-11-10T14:15:00",
    likes: 189,
    comments: [
      {
        id: 1,
        user: "Robert Johnson",
        content: "This could revolutionize farming across the continent!",
        timestamp: "2023-11-10T16:30:00",
      },
    ],
    isPremium: true,
    category: "Technology",
    categoryColor: "from-blue-500 to-blue-600",
  },
  {
    id: 3,
    title: "South Africa Launches First Quantum Computing Research Center",
    location: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    content:
      "South Africa has inaugurated its first quantum computing research center, marking a significant milestone in the continent's scientific advancement. The center aims to explore quantum applications in cryptography, drug discovery, and climate modeling.",
    publisher: "Science & Tech Africa",
    timestamp: "2023-11-05T09:45:00",
    likes: 312,
    comments: [],
    isPremium: true,
    category: "Science",
    categoryColor: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    title: "Nigerian Fintech Startup Secures $10M in Series A Funding",
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    content:
      "A Lagos-based fintech startup has secured $10 million in Series A funding to expand its digital banking services across West Africa. The company aims to provide accessible financial services to the unbanked population through innovative mobile solutions.",
    publisher: "African Business Review",
    timestamp: "2023-11-02T08:30:00",
    likes: 178,
    comments: [],
    isPremium: false,
    category: "Finance",
    categoryColor: "from-amber-500 to-amber-600",
  },
  {
    id: 5,
    title: "East African Tech Hub Launches Coding Bootcamp for Women",
    location: "Kigali, Rwanda",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    content:
      "A prominent tech hub in Kigali has launched a specialized coding bootcamp aimed at increasing female representation in the tech industry. The program offers full scholarships to 100 women and includes mentorship from leading tech professionals.",
    publisher: "East African Tech News",
    timestamp: "2023-10-28T11:20:00",
    likes: 256,
    comments: [],
    isPremium: false,
    category: "Education",
    categoryColor: "from-pink-500 to-pink-600",
  },
  {
    id: 6,
    title: "Ghana's Solar Energy Initiative Brings Power to Rural Communities",
    location: "Accra, Ghana",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    content:
      "A groundbreaking solar energy initiative in Ghana has successfully brought electricity to over 50 rural communities previously without power. The project utilizes innovative micro-grid technology and pay-as-you-go financing to make clean energy accessible.",
    publisher: "Renewable Energy Africa",
    timestamp: "2023-10-25T13:45:00",
    likes: 423,
    comments: [],
    isPremium: false,
    category: "Energy",
    categoryColor: "from-yellow-500 to-yellow-600",
  },
  {
    id: 7,
    title: "African E-commerce Platform Expands to 10 New Countries",
    location: "Nairobi, Kenya",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    content:
      "A leading African e-commerce platform has announced its expansion into 10 additional countries across the continent. The company's growth is fueled by a recent $50 million investment and strategic partnerships with local logistics providers.",
    publisher: "Pan-African Business",
    timestamp: "2023-10-20T09:15:00",
    likes: 198,
    comments: [],
    isPremium: true,
    category: "Business",
    categoryColor: "from-green-500 to-green-600",
  },
  {
    id: 8,
    title: "New Cybersecurity Center Established to Protect African Digital Infrastructure",
    location: "Johannesburg, South Africa",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    content:
      "A state-of-the-art cybersecurity center has been established in Johannesburg to protect Africa's growing digital infrastructure. The center will provide threat intelligence, incident response, and security training to organizations across the continent.",
    publisher: "African Tech Security",
    timestamp: "2023-10-15T11:30:00",
    likes: 276,
    comments: [],
    isPremium: true,
    category: "Technology",
    categoryColor: "from-blue-500 to-blue-600",
  },
  {
    id: 9,
    title: "Morocco Unveils Ambitious Tech City Project",
    location: "Casablanca, Morocco",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    content:
      "Morocco has unveiled plans for a new tech city near Casablanca, designed to become a hub for technology innovation in North Africa. The project includes research facilities, startup incubators, and educational institutions focused on emerging technologies.",
    publisher: "North African Tech Review",
    timestamp: "2023-10-10T10:00:00",
    likes: 312,
    comments: [],
    isPremium: false,
    category: "Infrastructure",
    categoryColor: "from-indigo-500 to-indigo-600",
  },
  {
    id: 10,
    title: "African Drone Delivery Network Expands Healthcare Access",
    location: "Kigali, Rwanda",
    image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    content:
      "A drone delivery network in Rwanda has expanded its operations to deliver medical supplies to remote healthcare facilities. The initiative has reduced delivery times from hours to minutes, potentially saving countless lives in emergency situations.",
    publisher: "Healthcare Innovation Africa",
    timestamp: "2023-10-05T14:20:00",
    likes: 405,
    comments: [],
    isPremium: true,
    category: "Healthcare",
    categoryColor: "from-red-500 to-red-600",
  },
  {
    id: 11,
    title: "Pan-African Coding Competition Attracts Record Participation",
    location: "Virtual Event",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    content:
      "The annual Pan-African Coding Competition has attracted a record number of participants this year, with over 10,000 developers from 30 African countries. The competition aims to showcase African tech talent and connect participants with global opportunities.",
    publisher: "Code Africa",
    timestamp: "2023-10-01T09:30:00",
    likes: 287,
    comments: [],
    isPremium: false,
    category: "Education",
    categoryColor: "from-pink-500 to-pink-600",
  },
  {
    id: 12,
    title: "Egyptian AI Startup Develops Arabic Natural Language Processing Tool",
    location: "Cairo, Egypt",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    content:
      "An Egyptian AI startup has developed an advanced natural language processing tool specifically designed for Arabic dialects. The technology improves machine understanding of Arabic text and speech, with applications in customer service, education, and content moderation.",
    publisher: "MENA Tech Journal",
    timestamp: "2023-09-28T11:15:00",
    likes: 198,
    comments: [],
    isPremium: true,
    category: "Technology",
    categoryColor: "from-blue-500 to-blue-600",
  },
  {
    id: 13,
    title: "Senegalese Entrepreneur Launches Sustainable Tech Manufacturing Facility",
    location: "Dakar, Senegal",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    content:
      "A Senegalese entrepreneur has launched West Africa's first sustainable tech manufacturing facility in Dakar. The factory produces solar-powered devices and employs circular economy principles to minimize environmental impact while creating local jobs.",
    publisher: "West African Business",
    timestamp: "2023-09-25T10:45:00",
    likes: 342,
    comments: [],
    isPremium: false,
    category: "Manufacturing",
    categoryColor: "from-orange-500 to-orange-600",
  },
  {
    id: 14,
    title: "Web Assembly: The Future of Browser-Based Computing",
    location: "Virtual Conference",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
    content: "Web Assembly (Wasm) is revolutionizing browser-based computing by enabling high-performance applications to run natively in web browsers. This technology is making it possible to run complex applications like video editors, 3D games, and scientific simulations directly in the browser with near-native performance.",
    publisher: "Tech Frontiers",
    timestamp: "2024-03-15T09:30:00",
    likes: 156,
    comments: [],
    isPremium: true,
    category: "Technology",
    categoryColor: "from-blue-500 to-blue-600"
  },
  {
    id: 15,
    title: "The Rise of Edge Computing in IoT Applications",
    location: "San Francisco, USA",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: "Edge computing is transforming IoT implementations by processing data closer to its source, reducing latency and bandwidth usage. This approach is particularly beneficial for real-time applications in smart cities, industrial automation, and autonomous vehicles where immediate data processing is crucial.",
    publisher: "IoT Weekly",
    timestamp: "2024-03-14T11:45:00",
    likes: 203,
    comments: [],
    isPremium: false,
    category: "Infrastructure",
    categoryColor: "from-indigo-500 to-indigo-600"
  },
  {
    id: 16,
    title: "Quantum Computing Breakthrough in Error Correction",
    location: "Cambridge, UK",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: "Researchers have achieved a significant breakthrough in quantum error correction, bringing us closer to practical quantum computers. The new technique allows quantum systems to maintain coherence for longer periods, making complex quantum computations more feasible.",
    publisher: "Quantum Tech Review",
    timestamp: "2024-03-13T14:20:00",
    likes: 289,
    comments: [],
    isPremium: true,
    category: "Science",
    categoryColor: "from-purple-500 to-purple-600"
  },
  {
    id: 17,
    title: "The Evolution of DevOps: GitOps and Platform Engineering",
    location: "Berlin, Germany",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: "DevOps practices are evolving with the adoption of GitOps and the emergence of platform engineering. These approaches are streamlining deployment processes and improving collaboration between development and operations teams, leading to faster and more reliable software delivery.",
    publisher: "DevOps Insights",
    timestamp: "2024-03-12T10:15:00",
    likes: 178,
    comments: [],
    isPremium: false,
    category: "Technology",
    categoryColor: "from-blue-500 to-blue-600"
  },
  {
    id: 18,
    title: "AI-Powered Code Generation: The Future of Programming",
    location: "Toronto, Canada",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: "AI-powered code generation tools are revolutionizing software development by automating routine coding tasks and suggesting optimizations. These tools are becoming increasingly sophisticated, learning from vast repositories of code to provide context-aware suggestions and complete functional implementations.",
    publisher: "AI Developer Weekly",
    timestamp: "2024-03-11T13:30:00",
    likes: 345,
    comments: [],
    isPremium: true,
    category: "AI/ML",
    categoryColor: "from-green-500 to-green-600"
  },
  {
    id: 19,
    title: "The Rise of Web3 and Decentralized Applications",
    location: "Miami, USA",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: "Web3 technologies and decentralized applications (dApps) are gaining momentum, offering new possibilities for digital ownership and peer-to-peer interactions. This shift towards decentralization is creating opportunities for innovative business models and user-owned platforms.",
    publisher: "Blockchain Times",
    timestamp: "2024-03-10T15:45:00",
    likes: 267,
    comments: [],
    isPremium: false,
    category: "Blockchain",
    categoryColor: "from-yellow-500 to-yellow-600"
  },
  {
    id: 20,
    title: "The Impact of 5G on Mobile App Development",
    location: "Seoul, South Korea",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: "5G technology is enabling a new generation of mobile applications with enhanced capabilities. Developers are leveraging high-speed, low-latency connections to create immersive AR experiences, real-time multiplayer games, and bandwidth-intensive applications that weren't possible before.",
    publisher: "Mobile Tech Review",
    timestamp: "2024-03-09T12:00:00",
    likes: 198,
    comments: [],
    isPremium: false,
    category: "Mobile",
    categoryColor: "from-red-500 to-red-600"
  }
]

export const Blog = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [savedPosts, setSavedPosts] = useState<number[]>([])
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [commentingOnPost, setCommentingOnPost] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  // Get unique categories from posts
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))]

  // Filter posts based on search term and active category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Check if user is admin or premium
  const isAdmin = true // For demo purposes
  const isPremiumUser = true // For demo purposes
  const isLoggedIn = true // For demo purposes

  const handleLike = (postId: number) => {
    if (!isLoggedIn) return

    setLikedPosts((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId)
      } else {
        return [...prev, postId]
      }
    })
  }

  const handleComment = (postId: number) => {
    if (!isLoggedIn) return
    setCommentingOnPost(commentingOnPost === postId ? null : postId)
  }

  const handleDeletePost = (postId: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
    setPosts(posts.filter((post) => post.id !== postId))
    }
  }

  const handleDeleteComment = (postId: number, commentId: number) => {
    if (confirm("Are you sure you want to delete this comment?")) {
    setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.filter((comment) => comment.id !== commentId),
            }
          }
          return post
        })
      )
    }
  }

  const handleSavePost = (post: Post) => {
    setSavedPosts((prev) => {
      if (prev.includes(post.id)) {
        return prev.filter((id) => id !== post.id)
    } else {
        return [...prev, post.id]
      }
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 bg-background p-8 rounded-lg shadow-lg"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Tech News & Innovations</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {isAdmin && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() =>
                    setEditingPost({
                      id: 0,
                      title: "",
                      location: "",
                      image: "",
                      content: "",
                      publisher: "",
                      timestamp: new Date().toISOString(),
                      likes: 0,
                      comments: [],
                      isPremium: false,
                      category: "Technology",
                      categoryColor: "from-blue-500 to-blue-600",
                    })
                  }
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  Add New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editingPost?.id ? "Edit Post" : "Add New Post"}</DialogTitle>
                </DialogHeader>
                <form
                  className="space-y-4 py-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    // Form submission logic would go here
                  }}
                >
                  {/* Form fields would go here */}
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap ${
              activeCategory === category 
                ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" 
                : "hover:bg-primary/10"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden h-full flex flex-col border-t-4 border-t-primary hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-black/50 text-white backdrop-blur-sm`}>
                    {post.category}
                  </span>
                </div>
                {post.isPremium && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-white">
                      Premium
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="flex-grow p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <span>{post.location}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(post.timestamp)}</span>
                </div>
                <p className="text-muted-foreground line-clamp-3 mb-4">{post.content}</p>
                <div className="flex items-center text-sm">
                  <span className="font-medium">By {post.publisher}</span>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 bg-muted/30">
                <div className="flex justify-between items-center w-full">
                    <div className="flex space-x-4">
                    <button
                      className={`flex items-center space-x-1 ${
                        likedPosts.includes(post.id) ? "text-red-500" : "text-muted-foreground hover:text-primary"
                      }`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className="h-4 w-4" fill={likedPosts.includes(post.id) ? "currentColor" : "none"} />
                      <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </button>
                    <button
                      className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
                      onClick={() => handleComment(post.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments.length}</span>
                    </button>
                  </div>
                    <div className="flex space-x-2">
                    <button
                      className={`text-muted-foreground hover:text-primary ${
                        savedPosts.includes(post.id) ? "text-primary" : ""
                      }`}
                      onClick={() => handleSavePost(post)}
                    >
                      <Bookmark
                        className="h-4 w-4"
                        fill={savedPosts.includes(post.id) ? "currentColor" : "none"}
                      />
                    </button>
                    <button className="text-muted-foreground hover:text-primary">
                      <Share2 className="h-4 w-4" />
                    </button>
                            {isAdmin && (
                      <>
                        <button
                          className="text-muted-foreground hover:text-primary"
                          onClick={() => setEditingPost(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-muted-foreground hover:text-red-500"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                            )}
                          </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}


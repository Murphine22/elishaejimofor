"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ExternalLink, 
  Github, 
  Star, 
  ArrowRight, 
  Filter, 
  X, 
  Search, 
  Sparkles, 
  Zap, 
  Eye, 
  Layers,
  Heart,
  Share2,
  Download,
  Play,
  Maximize2,
  Code2,
  Globe,
  Smartphone,
  Palette,
  Database,
  Cloud,
  Shield,
  TrendingUp,
  Award,
  MessageCircle,
  Rocket
} from "lucide-react"
import Image from "next/image"

interface EnhancedProjectsProps {
  onNavigate?: (page: string) => void
}

export const EnhancedProjects = ({ onNavigate }: EnhancedProjectsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set())
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const categories = [
    { id: "All", label: "All Projects", icon: Globe },
    { id: "Web", label: "Web Apps", icon: Code2 },
    { id: "Mobile", label: "Mobile Apps", icon: Smartphone },
    { id: "AI/ML", label: "AI & ML", icon: Sparkles },
    { id: "Design", label: "Design", icon: Palette },
    { id: "Backend", label: "Backend", icon: Database },
    { id: "Cloud", label: "Cloud", icon: Cloud },
  ]

  const projects = [
    {
      id: "murphnet",
      title: "MurphNet Search Engine",
      description: "A powerful AI-powered search engine that delivers intelligent, context-aware search results with advanced filtering and real-time indexing capabilities.",
      image: "https://i.imgur.com/wG8qA8t.png",
      tags: ["Next.js", "AI Integration", "Search Algorithms", "TypeScript", "Tailwind CSS"],
      link: "https://murphnet.space.z.ai",
      github: "https://github.com/Murphine22/murphnet",
      category: "AI/ML",
      color: "from-purple-600 to-indigo-600",
      featured: false,
      stats: { stars: 127, forks: 23, views: 1200 },
      technologies: ["Next.js", "OpenAI API", "Vector Search", "TypeScript"],
      duration: "3 months",
      team: "Solo Project",
      status: "Live"
    },
    {
      id: "koinder-crm",
      title: "Koinder CRM App",
      description: "A comprehensive CRM application for managing tasks, tracking KPIs, and facilitating team communication with real-time analytics.",
      image: "https://i.imgur.com/WNJc94c.png",
      tags: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      link: "https://koinder-crm.base44.app",
      github: "#",
      category: "App",
      color: "from-green-500 to-emerald-600",
      featured: false,
      stats: { stars: 89, forks: 15, views: 800 },
      technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
      duration: "2 months",
      team: "Team of 3",
      status: "Live"
    },
    {
      id: "ush-app",
      title: "Ush-App Finance App",
      description: "A full-stack Financial Overview App with React and Node.js, featuring real-time financial tracking and analytics.",
      image: "https://i.imgur.com/TND5b3C.jpeg",
      tags: ["React", "Node.js", "Superbase", "Stackblitz"],
      link: "https://ush-app.vercel.app",
      github: "https://github.com/Murphine22/Ush-App",
      category: "Web",
      color: "from-blue-500 to-cyan-500",
      featured: false,
      stats: { stars: 156, forks: 34, views: 1500 },
      technologies: ["React", "Node.js", "Supabase", "Chart.js"],
      duration: "4 months",
      team: "Team of 2",
      status: "Live"
    },
    {
      id: "task-master",
      title: "Task Master (To-Do App)",
      description: "A responsive To-Do App showcasing creative work with GSAP animations and local storage persistence.",
      image: "https://i.imgur.com/HWandg8.jpeg",
      tags: ["GSAP", "Local Storage", "JavaScript", "Tailwind CSS"],
      link: "https://spy-day-to-do-app.vercel.app",
      github: "https://github.com/Murphine22/spyday",
      category: "Mobile",
      color: "from-amber-500 to-orange-500",
      featured: false,
      stats: { stars: 78, forks: 12, views: 600 },
      technologies: ["JavaScript", "GSAP", "Local Storage", "CSS3"],
      duration: "1 month",
      team: "Solo Project",
      status: "Live"
    },
    {
      id: "cfhi",
      title: "Centre For Family Health Initiative",
      description: "An NGO platform featuring secure payments, multilingual support, and responsive design for health initiatives.",
      image: "https://i.imgur.com/Qx3z2m8.jpeg",
      tags: ["Next.js", "Tailwind CSS", "TypeScript", "SEO", "Sanity.io"],
      link: "https://www.cfhi.com.ng",
      github: "https://github.com/Murphine22/cfhi",
      category: "Web",
      color: "from-pink-500 to-rose-500",
      featured: true,
      stats: { stars: 234, forks: 45, views: 2000 },
      technologies: ["Next.js", "Sanity.io", "Stripe", "SEO"],
      duration: "3 months",
      team: "Team of 4",
      status: "Live"
    },
    {
      id: "portfolio",
      title: "Interactive Portfolio Website",
      description: "A dynamic portfolio website with React, showcasing expertise in web development and UI/UX design.",
      image: "https://i.imgur.com/IZ9y09E.jpeg",
      tags: ["React", "Node.js", "Supabase", "Tailwind CSS"],
      link: "https://startling-licorice-9807b3.netlify.app",
      github: "https://github.com/Murphine22/Elisha-Dev-Vault",
      category: "Web",
      color: "from-blue-600 to-indigo-500",
      featured: false,
      stats: { stars: 189, forks: 28, views: 1800 },
      technologies: ["React", "Node.js", "Tailwind CSS", "Framer Motion"],
      duration: "2 months",
      team: "Solo Project",
      status: "Live"
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const toggleLike = (projectId: string) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  const shareProject = (project: any) => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: project.link,
      })
    } else {
      navigator.clipboard.writeText(project.link)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div 
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      {/* Animated Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
          style={{
            left: `${(i * 137.5) % 100}%`,
            top: `${(i * 89.3) % 100}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + (i * 2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Project Showcase
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Featured Projects
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A curated collection of innovative digital solutions spanning web applications, 
            mobile apps, AI-powered tools, and cutting-edge user experiences.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search projects by name, tech, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-white"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="bg-white/5 backdrop-blur-sm border border-white/10">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
                    >
                      <category.icon className="w-4 h-4 mr-2" />
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center gap-2">
            <Badge className="bg-white/10 text-white border border-white/20">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
            </Badge>
            {searchQuery && (
              <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Searching: "{searchQuery}"
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="mt-4 text-gray-400">Loading amazing projects...</p>
                </div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="flex flex-col items-center">
                  <X className="w-16 h-16 text-gray-400" />
                  <p className="mt-4 text-gray-400">No projects found</p>
                  <Button 
                    className="mt-4 bg-purple-500 hover:bg-purple-600"
                    onClick={() => {
                      setSelectedCategory("All")
                      setSearchQuery("")
                    }}
                  >
                    Show all projects
                  </Button>
                </div>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 h-full">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                          onClick={() => window.open(project.link, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-500/20 text-green-300 border border-green-500/30">
                          {project.status}
                        </Badge>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`p-1 ${likedProjects.has(project.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                          onClick={() => toggleLike(project.id)}
                        >
                          <Heart className={`w-4 h-4 ${likedProjects.has(project.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-white/10 text-gray-300 border border-white/20">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {project.stats.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {project.stats.views}
                          </span>
                        </div>
                        <span>{project.duration}</span>
                      </div>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="p-6 pt-0">
                      <div className="flex gap-2 w-full">
                        <Button
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          onClick={() => window.open(project.link, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-white/20 hover:bg-white/10 text-white"
                          onClick={() => shareProject(project)}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-slate-900 rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent`} />
                  
                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                      <p className="text-gray-400">{selectedProject.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-green-500/20 text-green-300 border border-green-500/30">
                        {selectedProject.status}
                      </Badge>
                      {selectedProject.featured && (
                        <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech: string) => (
                          <Badge key={tech} className="bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Project Info</h3>
                      <div className="space-y-2 text-gray-400">
                        <p><span className="text-white">Duration:</span> {selectedProject.duration}</p>
                        <p><span className="text-white">Team:</span> {selectedProject.team}</p>
                        <p><span className="text-white">Category:</span> {selectedProject.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      onClick={() => window.open(selectedProject.link, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Project
                    </Button>
                    {selectedProject.github && selectedProject.github !== "#" && (
                      <Button
                        variant="outline"
                        className="flex-1 border-white/20 hover:bg-white/10 text-white"
                        onClick={() => window.open(selectedProject.github, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
            <Rocket className="w-4 h-4 mr-2" />
            Want to collaborate?
          </Badge>
          
          <p className="text-xl text-gray-300 mb-6">
            Have a project in mind? Let's discuss how we can bring it to life
          </p>
          
          <button
            onClick={() => onNavigate?.("contact")}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            Start a Conversation
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

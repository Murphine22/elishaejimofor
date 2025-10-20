"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { ExternalLink, Github, Star, ArrowRight, Filter, X, Search, Sparkles, Zap, Eye, Layers } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Project categories
const categories = ["All", "Web", "Mobile", "AI/ML", "Blockchain", "UI/UX"];

const projects = [
  {
    title: "Ush-App Finance app",
    description: "A full-stack Financial Overview App with React and Node.js",
    image: "https://i.imgur.com/zwu5LOp.jpeg",
    tags: ["React", "Node.js", "Superbase","Stackblitz"],
    link: "https://ush-app.vercel.app",
    github: "https://github.com/Murphine22/Ush-App",
    category: "Web",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Task Master(To-Do App)",
    description: "A responsive To-Do App showcasing creative work",
    image: "https://i.pinimg.com/736x/62/eb/a5/62eba5d391173b208ec2e0beb1476dfe.jpg",
    tags: [ "GreenSock Animation Platform(GSAP)", "Local Storage API", "JavaScript", "HTML 5", "Tailwind CSS", "Animation CSS" , ],
    link: "https://spy-day-to-do-app.vercel.app",
    github: "https://github.com/Murphine22/spyday",
    category: "Mobile",
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Mobile Fitness App(Fitopia)",
    description: "A cross-platform mobile app for tracking fitness goals",
    image: "https://i.pinimg.com/474x/4f/c9/7d/4fc97dcfc787aa1b897276b832b883c8.jpg",
    tags: ["React Native", "Firebase", "Redux"],
    link: "https://fitopia-mu.vercel.app",
    github: "https://github.com/Murphine22/fitopia-interaction",
    category: "Mobile",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Centre For Family Health Initiative(CFHI)",
    description: "An NGO for family health. This platform features secure payments for donations, multilingual support, and a responsive design to ensure accessibility across various devices.",
    image: "https://i.pinimg.com/736x/16/72/58/167258965aaee55855abd9e885dd6593.jpg",
    tags: ["Elementor, WordPress Themes and Pluggins, CSS & SEO"],
    link: "https://www.cfhealthinitiative.org",
    featured: true,
    category: "WordPress",
    color: "from-primary to-purple-600"
  },
  {
    title: "Snapcode (QR Scanner App)",
    description: "Advance QR Scanner that supports Code Generation for text and files ",
    image: "https://i.pinimg.com/474x/4b/eb/a0/4beba0ddc14a71bd5197c4ee9ca05927.jpg",
    tags: ["TypeScript","Shadecn Ui", "React", "Vite","Tailwind CSS",],
    link: "https://snapcode-genius.vercel.app",
    github: "https://github.com/Murphine22/snapcode-genius",
    category: "Mobile and Web",
    color: "from-red-500 to-pink-500"
  },
  {
    "title": "Interactive Portfolio Website",
    "description": "A dynamic and visually stunning portfolio website built with React, showcasing expertise in web development, UI/UX design, and digital solutions. Designed with seamless animations, an interactive interface, and a modern aesthetic, this portfolio highlights projects, skills, and achievements while providing a smooth user experience. Features include dark mode, responsive layouts, a project showcase, and contact forms for seamless communication.",
    "image": "https://i.pinimg.com/474x/34/ce/09/34ce096bc9ce52f3a4e7d47100f143e8.jpg",
    "tags": ["React", "Node.js", "Supabase", "Tailwind CSS", "FormSprea"],
    "link": "https://startling-licorice-9807b3.netlify.app",
    "github": "https://github.com/Murphine22/Elisha-Dev-Vault",
    "category": "Web",
    "color": "from-blue-600 to-indigo-500"
  },
  {
    "title": "Scientific Calculator",
    "description": "A powerful and user-friendly scientific calculator designed for complex mathematical computations. Featuring advanced functions such as trigonometry, logarithms, exponentiation, and equation solving, it provides a seamless experience for students, engineers, and professionals.",
    "image": "https://i.pinimg.com/474x/96/af/d9/96afd9b62e569b65d5a7f43ee13e424e.jpg",
    "tags": ["Vite", "TypeScript", "React", "shadcn-ui", "Tailwind CSS","Mathematics", "Scientific Computing"],
    "link": "https://mindful-scicalc.vercel.app",
    "github": "https://github.com/Murphine22/mindful-calc",
    "category": "Mobile",
    "color": "from-blue-600 to-cyan-500"
  },
  {
    title: "Daily Gist News Blog",
    description: "Interactive news website for visualizing complex news post, API Integration, Bootstrap 5,",
    image: "https://i.pinimg.com/736x/b9/4a/cf/b94acfae367733e224bbcd2cdb4f2001.jpg",
    tags: ["HTML 5", "CSS","JavaScript", "Bootstrap 5", "API Integration" ],
    link: "https://daily-gist-4m69.vercel.app",
    github: "https://github.com/Murphine22/Daily-Gist",
    category: "Web",
    color: "from-blue-500 to-indigo-500"
  },
  {
    "title": "Fin-Ex App",
    "description": "A smart and intuitive finance tracking app that helps users manage expenses, monitor income, and visualize financial trends. Featuring interactive charts, real-time budget insights, and seamless data storage, Fin-Ex empowers users to take full control of their financial well-being with ease.",
    "image": "https://i.pinimg.com/474x/98/21/c0/9821c0e854413145390d4dcd4d59d0b0.jpg",
    "tags": ["Chart.js for data visualization", "JavaScript (ES6+)", "Local Storage API", "CSS3 with modern features", "HTML5", "FontAwesome icons"],
    "link": "https://fin-ex.vercel.app/",
    "github": "https://github.com/Murphine22/FinEx",
    "category": "Finance Management",
    "color": "from-violet-500 to-purple-500"
  },
  {
    title: "Consciousness AI Chatbot",
    description: "An intelligent chatbot using natural language processing",
    image: "https://i.pinimg.com/736x/2d/ef/ac/2defac27a10d7b5c73f14bc45b67227f.jpg",
    tags: ["Character AI",],
    link: "https://character.ai/chat/YpiOlZJ_M9XC-LGQtvNnaH-opABWiVo2vXFdXiG5Q4M",
    category: "AI/ML",
    color: "from-purple-500 to-pink-500"
  },
]

// 3D Card Tilt Component
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full"
    >
      {children}
    </motion.div>
  )
}

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [featuredProject, setFeaturedProject] = useState(projects.find(p => p.featured) || projects[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on selected category and search
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      let filtered = projects;
      
      if (selectedCategory !== "All") {
        filtered = filtered.filter(project => project.category === selectedCategory);
      }
      
      if (searchQuery) {
        filtered = filtered.filter(project => 
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      setFilteredProjects(filtered);
      setIsLoading(false);
    }, 300);
  }, [selectedCategory, searchQuery]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 bg-background p-8 rounded-lg shadow-lg relative overflow-hidden"
    >
      {/* Enhanced Background decoration with animations */}
      <motion.div 
        className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-cyan-500">
            Creative Projects
          </h2>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-8 max-w-2xl text-lg"
        >
          Discover a curated collection of innovative digital experiences. Each project showcases cutting-edge technology, creative design, and seamless functionality.
        </motion.p>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mb-8"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search projects by name, description, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </motion.div>
      </div>

      {/* Featured Project - Enhanced with 3D effects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={featuredProject.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-600/20 to-cyan-500/20 rounded-xl blur-xl -z-10"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <Card className="border-none shadow-2xl overflow-hidden bg-background/80 backdrop-blur-sm group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div 
                className="relative h-[400px] lg:h-auto overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 animate-pulse"></div>
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-4 left-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                  >
                    <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 flex items-center gap-2 shadow-lg">
                      <Star className="h-4 w-4 animate-pulse" /> Featured Project
                    </Badge>
                  </motion.div>
                </div>
                <motion.div
                  className="absolute bottom-4 right-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Badge className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 flex items-center gap-1">
                    <Eye className="h-3 w-3" /> Showcase
                  </Badge>
                </motion.div>
              </motion.div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <motion.h3 
                    className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {featuredProject.title}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground mb-6 text-lg leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {featuredProject.description}
                  </motion.p>
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {featuredProject.tags.map((tag, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                      >
                        <Badge className="bg-gradient-to-r from-primary/10 to-purple-600/10 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 group" asChild>
                    <a href={featuredProject.link} target="_blank" rel="noopener noreferrer">
                      <Zap className="mr-2 h-4 w-4 group-hover:animate-pulse" /> Live Demo
                    </a>
                  </Button>
                  {featuredProject.github && (
                    <Button 
                      className="flex-1 border-2 border-primary bg-background hover:bg-primary hover:text-white transition-all duration-300" 
                      asChild
                    >
                      <a href={featuredProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Source Code
                      </a>
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Category Filter */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Filter className="h-6 w-6 text-primary" />
          </motion.div>
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Browse Projects
          </h3>
          <Badge className="bg-primary/10 text-primary border border-primary/20">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
          </Badge>
        </div>
        <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="bg-background/50 backdrop-blur-sm border border-primary/20 shadow-lg">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <TabsTrigger 
                  value={category} 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
                >
                  {category}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Projects Grid with 3D Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex justify-center py-20"
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-muted-foreground">Loading projects...</p>
              </div>
            </motion.div>
          ) : filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex justify-center py-20"
            >
              <div className="flex flex-col items-center">
                <X className="w-16 h-16 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">No projects found in this category</p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Show all projects
                </Button>
              </div>
            </motion.div>
          ) : (
            filteredProjects
              .filter(project => !project.featured || selectedCategory !== "All")
              .map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <TiltCard>
                  <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 relative group bg-background/80 backdrop-blur-sm">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10"></div>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-background/80 backdrop-blur-sm text-foreground border border-primary/20">
                          {project.category}
                        </Badge>
                      </div>
                      <motion.div
                        className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                      >
                        <Button size="sm" className="flex-1 bg-primary/90 backdrop-blur-sm" asChild>
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" /> View
                          </a>
                        </Button>
                        {project.github && (
                          <Button size="sm" variant="secondary" className="flex-1 bg-background/90 backdrop-blur-sm" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3 mr-1" /> Code
                            </a>
                          </Button>
                        )}
                      </motion.div>
                    </div>
                    <CardContent className="p-5 relative z-10">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-5 pt-0">
                      <Button 
                        className="w-full bg-transparent hover:bg-primary hover:text-white border border-primary/20 hover:border-primary group-hover:translate-y-[-2px] transition-all duration-300"
                        onClick={() => setFeaturedProject(project)}
                      >
                        <Layers className="mr-2 h-4 w-4" />
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TiltCard>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

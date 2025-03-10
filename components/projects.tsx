"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink, Github, Star, Code, ArrowRight, Filter, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Project categories
const categories = ["All", "Web", "Mobile", "AI/ML", "Blockchain", "UI/UX"];

const projects = [
  {
    title: "Udacu Finance app",
    description: "A full-stack Financial Overview App with React and Node.js",
    image: "https://i.pinimg.com/474x/4f/36/86/4f3686ae86e1b29c94b776c7a300e160.jpg",
    tags: ["React", "Node.js", "Superbase","Stackblitz"],
    link: "https://udafa.vercel.app",
    github: "https://stackblitz.com/~/github.com/Murphine22/Udacu-App",
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

export const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [featuredProject, setFeaturedProject] = useState(projects.find(p => p.featured) || projects[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter projects based on selected category
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (selectedCategory === "All") {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(projects.filter(project => project.category === selectedCategory));
      }
      setIsLoading(false);
    }, 300);
  }, [selectedCategory]);

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
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          My Projects
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Explore my portfolio of projects spanning web development, mobile applications, AI solutions, and more. Each project represents my passion for creating innovative digital experiences.
        </p>
      </div>

      {/* Featured Project */}
      <AnimatePresence mode="wait">
          <motion.div
          key={featuredProject.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-xl blur-xl -z-10" />
          <Card className="border-none shadow-xl overflow-hidden bg-background/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative h-[300px] lg:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-white px-3 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3" /> Featured Project
                  </Badge>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{featuredProject.title}</h3>
                  <p className="text-muted-foreground mb-4">{featuredProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-background/50 backdrop-blur-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90" asChild>
                    <a href={featuredProject.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={featuredProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Source Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Category Filter */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Filter className="h-5 w-5" /> Browse Projects
        </h3>
        <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="bg-background/50 backdrop-blur-sm">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="data-[state=active]:bg-primary data-[state=active]:text-white">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex justify-center py-20"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSelectedCategory("All")}
                >
                  Show all projects
                      </Button>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {filteredProjects
                .filter(project => !project.featured || selectedCategory !== "All")
                .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                  onHoverStart={() => setHoveredProject(project.title)}
                  onHoverEnd={() => setHoveredProject(null)}
                >
                  <Card className="h-full overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={project.featured}
                        loading={project.featured ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-background/70 backdrop-blur-sm text-foreground">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5 relative z-10">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
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
                    <CardFooter className="p-5 pt-0 flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="View source code">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                          <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="View live demo">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-xs group-hover:text-primary transition-colors duration-300 group-hover:translate-x-1 transition-transform"
                        onClick={() => setFeaturedProject(project)}
                      >
                        Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
            </Card>
          </motion.div>
        ))}
            </AnimatePresence>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}


"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code, 
  Palette, 
  Database, 
  Globe, 
  Smartphone, 
  Cloud, 
  Shield, 
  Zap,
  Brain,
  Cpu,
  GitBranch,
  Terminal,
  Layers,
  Sparkles,
  TrendingUp,
  Award,
  Star,
  Rocket,
  Lightbulb,
  Users,
  MessageCircle
} from "lucide-react"
import { EditableContent } from "@/components/editable-content"

interface AdvancedSkillsProps {
  onNavigate?: (page: string) => void
}

export const AdvancedSkills = ({ onNavigate }: AdvancedSkillsProps) => {
  const [activeTab, setActiveTab] = useState("technical")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const technicalSkills = [
    {
      category: "Frontend Development",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      lightColor: "from-blue-500/20 to-cyan-500/20",
      skills: [
        { name: "React/Next.js", level: 95, description: "Expert in modern React ecosystem" },
        { name: "TypeScript", level: 90, description: "Strong typing and advanced patterns" },
        { name: "Tailwind CSS", level: 95, description: "Utility-first CSS framework" },
        { name: "Framer Motion", level: 85, description: "Advanced animations and interactions" },
        { name: "Vue.js", level: 80, description: "Progressive JavaScript framework" },
      ]
    },
    {
      category: "Backend Development",
      icon: Database,
      color: "from-green-500 to-emerald-500",
      lightColor: "from-green-500/20 to-emerald-500/20",
      skills: [
        { name: "Node.js", level: 85, description: "Server-side JavaScript runtime" },
        { name: "Express.js", level: 80, description: "Web application framework" },
        { name: "MongoDB", level: 75, description: "NoSQL database management" },
        { name: "PostgreSQL", level: 70, description: "Relational database systems" },
        { name: "REST APIs", level: 90, description: "API design and implementation" },
      ]
    },
    {
      category: "UI/UX Design",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      lightColor: "from-purple-500/20 to-pink-500/20",
      skills: [
        { name: "Figma", level: 85, description: "Collaborative design tool" },
        { name: "Adobe XD", level: 80, description: "UI/UX design platform" },
        { name: "Responsive Design", level: 95, description: "Mobile-first approach" },
        { name: "Design Systems", level: 85, description: "Scalable design patterns" },
        { name: "User Research", level: 75, description: "UX research methodologies" },
      ]
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      color: "from-orange-500 to-red-500",
      lightColor: "from-orange-500/20 to-red-500/20",
      skills: [
        { name: "Vercel", level: 90, description: "Frontend deployment platform" },
        { name: "Netlify", level: 85, description: "JAMstack deployment" },
        { name: "Git/GitHub", level: 90, description: "Version control and collaboration" },
        { name: "CI/CD", level: 75, description: "Continuous integration/deployment" },
        { name: "Docker", level: 70, description: "Containerization" },
      ]
    }
  ]

  const softSkills = [
    {
      icon: Brain,
      title: "Problem Solving",
      description: "Analytical thinking and creative solutions",
      level: 95,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Effective communication and teamwork",
      level: 90,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Creative thinking and ideation",
      level: 85,
      color: "from-orange-500 to-red-500"
    },
    {
      icon: TrendingUp,
      title: "Adaptability",
      description: "Quick learning and flexibility",
      level: 90,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Project Management",
      description: "Planning and execution skills",
      level: 85,
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: MessageCircle,
      title: "Communication",
      description: "Clear and effective articulation",
      level: 88,
      color: "from-pink-500 to-rose-500"
    }
  ]

  const tools = [
    { name: "VS Code", category: "IDE", icon: Code, level: 95 },
    { name: "Chrome DevTools", category: "Debugging", icon: Terminal, level: 90 },
    { name: "Postman", category: "API Testing", icon: Globe, level: 85 },
    { name: "Webpack", category: "Build Tools", icon: Zap, level: 80 },
    { name: "ESLint", category: "Code Quality", icon: Shield, level: 90 },
    { name: "Jest", category: "Testing", icon: Award, level: 85 },
    { name: "Storybook", category: "Documentation", icon: Layers, level: 80 },
    { name: "Figma", category: "Design", icon: Palette, level: 85 },
  ]

  const achievements = [
    { icon: Star, title: "50+ Projects Completed", description: "Successfully delivered diverse projects" },
    { icon: Award, title: "10+ Years Experience", description: "Professional development journey" },
    { icon: Users, title: "30+ Happy Clients", description: "Long-term client relationships" },
    { icon: Rocket, title: "Launch Expert", description: "Rapid deployment and iteration" },
  ]

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
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
          style={{
            left: `${(i * 137.5) % 100}%`,
            top: `${(i * 89.3) % 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + (i * 2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Skills & Expertise
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Technical Excellence
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive skill set spanning frontend development, backend technologies, 
            design principles, and modern development practices.
          </p>
        </motion.div>

        {/* Main Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-white/5 backdrop-blur-sm border border-white/10">
              <TabsTrigger 
                value="technical" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <Code className="w-4 h-4 mr-2" />
                Technical
              </TabsTrigger>
              <TabsTrigger 
                value="soft"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <Brain className="w-4 h-4 mr-2" />
                Soft Skills
              </TabsTrigger>
              <TabsTrigger 
                value="tools"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
              >
                <Zap className="w-4 h-4 mr-2" />
                Tools
              </TabsTrigger>
              <TabsTrigger 
                value="achievements"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
              >
                <Award className="w-4 h-4 mr-2" />
                Achievements
              </TabsTrigger>
            </TabsList>

            {/* Technical Skills Tab */}
            <TabsContent value="technical" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {technicalSkills.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                            <category.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{category.category}</h3>
                            <p className="text-sm text-gray-400">{category.skills.length} technologies</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                              onMouseEnter={() => setHoveredSkill(skill.name)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              className="group"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-white">{skill.name}</span>
                                  {hoveredSkill === skill.name && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      className="text-xs text-gray-400"
                                    >
                                      {skill.description}
                                    </motion.div>
                                  )}
                                </div>
                                <span className="text-sm text-gray-400">{skill.level}%</span>
                              </div>
                              
                              <div className="relative">
                                <Progress 
                                  value={hoveredSkill === skill.name ? skill.level : 0} 
                                  className="h-2 bg-white/10"
                                />
                                <motion.div
                                  className="absolute top-0 left-0 h-2 bg-gradient-to-r rounded-full"
                                  style={{ 
                                    width: `${skill.level}%`,
                                    background: `linear-gradient(to right, ${category.color.replace('from-', '').replace(' to-', ', ')})`
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ 
                                    duration: 1, 
                                    delay: categoryIndex * 0.1 + skillIndex * 0.05,
                                    ease: "easeOut"
                                  }}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Soft Skills Tab */}
            <TabsContent value="soft" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={skill.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center mx-auto mb-4`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <skill.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <h3 className="text-lg font-bold text-white mb-2">{skill.title}</h3>
                        <p className="text-sm text-gray-400 mb-4">{skill.description}</p>
                        
                        <div className="relative">
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ 
                                duration: 1.5, 
                                delay: index * 0.2,
                                ease: "easeOut"
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 mt-1">{skill.level}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                      <CardContent className="p-4 text-center">
                        <tool.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                        <h4 className="text-sm font-medium text-white mb-1">{tool.name}</h4>
                        <p className="text-xs text-gray-400 mb-2">{tool.category}</p>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${tool.level}%` }}
                            transition={{ 
                              duration: 1, 
                              delay: index * 0.1,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-4"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                        >
                          <achievement.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <Rocket className="w-4 h-4 mr-2" />
            Ready to collaborate?
          </Badge>
          
          <p className="text-xl text-gray-300 mb-6">
            Let's discuss how my skills can help bring your vision to life
          </p>
          
          <button
            onClick={() => onNavigate?.("contact")}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

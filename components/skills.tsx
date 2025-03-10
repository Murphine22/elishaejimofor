"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, FileText, Terminal, Database, Globe, Lightbulb, Layers } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditableContent } from "@/components/editable-content"
import { useAdmin } from "@/components/admin-context"
import { useEffect } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const progressVariants = {
  hidden: { width: 0 },
  visible: (value: number) => ({
    width: `${value}%`,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  })
}

const technicalSkills = [
  {
    title: "Front-End Development",
    icon: Code,
    color: "from-blue-500 to-blue-600",
    lightColor: "from-blue-500/20 to-blue-600/20",
    accentColor: "blue",
    description: "Building responsive and interactive user interfaces with modern frameworks and libraries",
    proficiency: 85,
    technologies: [
      { name: "HTML5/CSS3", level: 95 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "React.js", level: 80 },
      { name: "Next.js", level: 75 },
      { name: "TypeScript", level: 83 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 82 },
      { name: "WordPress", level: 80 },
    ]
  },
  {
    title: "Back-End Development",
    icon: Database,
    color: "from-purple-500 to-purple-600",
    lightColor: "from-purple-500/20 to-purple-600/20",
    accentColor: "purple",
    description: "Creating robust server-side applications and APIs to power web applications",
    proficiency: 65,
    technologies: [
      { name: "Node.js", level: 60 },
      { name: "Express.js", level: 55 },
      { name: "Python", level: 60 },
      { name: "PHP", level: 60 },
      { name: "MySQL", level: 65 },
      { name: "APIs Integration", level: 80 },
    ]
  },
  {
    title: "Database Management",
    icon: Layers,
    color: "from-emerald-500 to-emerald-600",
    lightColor: "from-emerald-500/20 to-emerald-600/20",
    accentColor: "emerald",
    description: "Designing and optimizing database structures for efficient data storage and retrieval",
    proficiency: 60,
    technologies: [
      { name: "MongoDB", level: 55 },
      { name: "Superbase", level: 75 },
      { name: "MySQL", level: 55 },
      { name: "PostgreSQL", level: 50 },
      { name: "Firebase", level: 70 },
    ]
  },
  {
    title: "Web Performance",
    icon: Globe,
    color: "from-red-500 to-red-600",
    lightColor: "from-red-500/20 to-red-600/20",
    accentColor: "red",
    description: "Optimizing websites for speed, accessibility, and search engine visibility",
    proficiency: 80,
    technologies: [
      { name: "Lighthouse Optimization", level: 70 },
      { name: "Core Web Vitals", level: 75 },
      { name: "SEO Best Practices", level: 80 },
      { name: "Web Accessibility (WCAG)", level: 70 },
      { name: "Progressive Web Apps", level: 75 },
    ]
  }
]

const creativeSkills = [
  {
    title: "Graphics Design",
    icon: Palette,
    color: "from-pink-500 to-pink-600",
    lightColor: "from-pink-500/20 to-pink-600/20",
    accentColor: "pink",
    description: "Creating visually appealing designs for digital and print media",
    proficiency: 75,
    technologies: [
      { name: "Canva Pro", level: 90 },
      { name: "Adobe Photoshop", level: 50 },
      { name: "Adobe Illustrator", level: 52 },
      { name: "UI/UX Design", level: 75 },
      { name: "Brand Identity Design", level: 80 },
      { name: "Figma", level: 65 },
    ]
  },
  {
    title: "Content Creation",
    icon: FileText,
    color: "from-green-500 to-green-600",
    lightColor: "from-green-500/20 to-green-600/20",
    accentColor: "green",
    description: "Producing engaging and SEO-optimized content for various digital platforms",
    proficiency: 88,
    technologies: [
      { name: "Blog Writing", level: 90 },
      { name: "Copywriting", level: 85 },
      { name: "Social Media Content", level: 92 },
      { name: "Email Marketing", level: 65 },
      { name: "Content Strategy", level: 85 },
      { name: "SEO Writing", level: 88 },
    ]
  },
  {
    title: "Prompt Engineering",
    icon: Terminal,
    color: "from-amber-500 to-amber-600",
    lightColor: "from-amber-500/20 to-amber-600/20",
    accentColor: "amber",
    description: "Crafting effective prompts for AI language models to generate high-quality outputs",
    proficiency: 90,
    technologies: [
      { name: "GPT Prompt Design", level: 90 },
      { name: "AI Content Generation", level: 95 },
      { name: "Prompt Chaining", level: 90 },
      { name: "AI Workflow Integration", level: 85 },
      { name: "Prompt Debugging", level: 80 },
    ]
  },
  {
    title: "Creative Problem Solving",
    icon: Lightbulb,
    color: "from-cyan-500 to-cyan-600",
    lightColor: "from-cyan-500/20 to-cyan-600/20",
    accentColor: "cyan",
    description: "Applying innovative thinking to solve complex problems and create unique solutions",
    proficiency: 92,
    technologies: [
      { name: "Design Thinking", level: 90 },
      { name: "Agile Methodology", level: 85 },
      { name: "User-Centered Design", level: 88 },
      { name: "Rapid Prototyping", level: 80 },
      { name: "A/B Testing", level: 65 },
    ]
  }
]

export const Skills = () => {
  const { isAdmin, isEditMode } = useAdmin()

  useEffect(() => {
    console.log("Skills component mounted")
    console.log("Technical skills:", technicalSkills)
    console.log("Creative skills:", creativeSkills)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
        >
          Skills & Expertise
        </motion.h2>
      </div>

      <Tabs defaultValue="technical" className="space-y-4">
        <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <TabsTrigger value="technical" className="relative z-10">Technical Skills</TabsTrigger>
          <TabsTrigger value="creative" className="relative z-10">Creative Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="technical">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {technicalSkills.map((skill, index) => {
              console.log("Rendering technical skill:", skill.title)
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group"
                >
                  <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-t-primary">
                    <CardContent className="p-6 relative">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      />
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} text-white`}>
                          <skill.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                          {skill.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{skill.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Overall Proficiency</span>
                          <span className="text-primary">{skill.proficiency}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            variants={progressVariants}
                            custom={skill.proficiency}
                            className={`h-full bg-gradient-to-r ${skill.color}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        {skill.technologies.map((tech, i) => (
                          <motion.div
                            key={i}
                            initial="hidden"
                            animate="visible"
                            className="space-y-1"
                          >
                            <div className="flex justify-between text-sm">
                              <span>{tech.name}</span>
                              <span className="text-primary">{tech.level}%</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                variants={progressVariants}
                                custom={tech.level}
                                className={`h-full bg-gradient-to-r ${skill.color}`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </TabsContent>

        <TabsContent value="creative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {creativeSkills.map((skill, index) => {
              console.log("Rendering creative skill:", skill.title)
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group"
                >
                  <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-t-primary">
                    <CardContent className="p-6 relative">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      />
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} text-white`}>
                          <skill.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                          {skill.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{skill.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Overall Proficiency</span>
                          <span className="text-primary">{skill.proficiency}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            variants={progressVariants}
                            custom={skill.proficiency}
                            className={`h-full bg-gradient-to-r ${skill.color}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        {skill.technologies.map((tech, i) => (
                          <motion.div
                            key={i}
                            initial="hidden"
                            animate="visible"
                            className="space-y-1"
                          >
                            <div className="flex justify-between text-sm">
                              <span>{tech.name}</span>
                              <span className="text-primary">{tech.level}%</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                variants={progressVariants}
                                custom={tech.level}
                                className={`h-full bg-gradient-to-r ${skill.color}`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </TabsContent>
      </Tabs>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-10 p-6 bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-lg border border-primary/20 hover:shadow-lg transition-all duration-300"
      >
        <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Continuous Learning
        </h3>
        <EditableContent
          section="skills"
          field="continuousLearning"
          type="text"
          multiline
          defaultValue="I believe in the power of continuous learning and regularly update my skills through online courses, workshops, and industry conferences. Currently, I'm expanding my knowledge in AI application development, Back-End Development, and Advance Prototyping."
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground"
          >
            I believe in the power of continuous learning and regularly update my skills through online courses, workshops, and industry conferences. Currently, I'm expanding my knowledge in AI application development, Back-End Development, and Advance Prototyping.
          </motion.p>
        </EditableContent>
      </motion.div>
    </motion.div>
  )
}


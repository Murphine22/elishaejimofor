"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, FileText, Terminal, Database, Globe, Lightbulb, Layers, Sparkles } from "lucide-react"
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
  },
  {
    title: "Generative AI",
    icon: Sparkles,
    color: "from-violet-500 to-violet-600",
    lightColor: "from-violet-500/20 to-violet-600/20",
    accentColor: "violet",
    description: "Leveraging AI models and tools to create intelligent applications and automate workflows",
    proficiency: 88,
    technologies: [
      { name: "OpenAI GPT Integration", level: 90 },
      { name: "Google Gemini AI", level: 92 },
      { name: "AI Chatbot Development", level: 88 },
      { name: "LLM Fine-tuning", level: 75 },
      { name: "AI Prompt Engineering", level: 95 },
      { name: "AI API Integration", level: 85 },
      { name: "AI-Powered Automation", level: 80 },
    ]
  }
]

const creativeSkills = [
  {
    title: "Visual Design & Branding",
    icon: Palette,
    color: "from-pink-500 to-pink-600",
    lightColor: "from-pink-500/20 to-pink-600/20",
    accentColor: "pink",
    description: "Crafting stunning visual identities and immersive brand experiences that captivate audiences and drive engagement across all digital touchpoints",
    proficiency: 85,
    technologies: [
      { name: "Canva Pro (Advanced)", level: 95 },
      { name: "Adobe Creative Suite", level: 72 },
      { name: "UI/UX Design Mastery", level: 82 },
      { name: "Brand Identity & Strategy", level: 88 },
      { name: "Figma Prototyping", level: 78 },
      { name: "Motion Graphics", level: 70 },
      { name: "Color Theory & Typography", level: 90 },
      { name: "Design Systems", level: 75 },
    ]
  },
  {
    title: "Strategic Content Creation",
    icon: FileText,
    color: "from-green-500 to-green-600",
    lightColor: "from-green-500/20 to-green-600/20",
    accentColor: "green",
    description: "Producing compelling, conversion-focused content that resonates with audiences, tells powerful stories, and drives measurable business results",
    proficiency: 92,
    technologies: [
      { name: "Storytelling & Narrative Design", level: 95 },
      { name: "SEO-Optimized Copywriting", level: 90 },
      { name: "Social Media Strategy", level: 94 },
      { name: "Email Marketing Campaigns", level: 78 },
      { name: "Content Marketing Strategy", level: 88 },
      { name: "Video Script Writing", level: 82 },
      { name: "Technical Documentation", level: 85 },
      { name: "Brand Voice Development", level: 90 },
    ]
  },
  {
    title: "AI Prompt Engineering",
    icon: Terminal,
    color: "from-amber-500 to-amber-600",
    lightColor: "from-amber-500/20 to-amber-600/20",
    accentColor: "amber",
    description: "Mastering the art and science of AI communication to unlock unprecedented creative possibilities and automate complex workflows with precision",
    proficiency: 95,
    technologies: [
      { name: "Advanced GPT Prompt Design", level: 96 },
      { name: "AI Content Generation", level: 98 },
      { name: "Multi-Model Prompt Chaining", level: 92 },
      { name: "AI Workflow Automation", level: 90 },
      { name: "Prompt Optimization & Testing", level: 88 },
      { name: "Context Engineering", level: 94 },
      { name: "AI Ethics & Best Practices", level: 85 },
    ]
  },
  {
    title: "Innovation & Problem Solving",
    icon: Lightbulb,
    color: "from-cyan-500 to-cyan-600",
    lightColor: "from-cyan-500/20 to-cyan-600/20",
    accentColor: "cyan",
    description: "Transforming complex challenges into elegant solutions through creative thinking, strategic planning, and human-centered design methodologies",
    proficiency: 94,
    technologies: [
      { name: "Design Thinking Framework", level: 93 },
      { name: "Agile & Scrum Methodology", level: 88 },
      { name: "User-Centered Design", level: 92 },
      { name: "Rapid Prototyping & MVP", level: 85 },
      { name: "A/B Testing & Optimization", level: 80 },
      { name: "Creative Ideation Techniques", level: 95 },
      { name: "Strategic Planning", level: 87 },
      { name: "Innovation Management", level: 82 },
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
        className="mt-10 p-8 bg-gradient-to-br from-primary/10 via-purple-600/10 to-cyan-500/10 rounded-2xl border-2 border-primary/30 hover:shadow-2xl hover:border-primary/50 transition-all duration-500 relative overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{ x: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-2 rounded-full bg-gradient-to-r from-primary to-purple-600"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-cyan-500">
              Continuous Innovation & Growth
            </h3>
          </div>
          <EditableContent
            section="skills"
            field="continuousLearning"
            type="text"
            multiline
            defaultValue="I'm passionate about staying at the cutting edge of technology and creativity. Through immersive online courses, hands-on workshops, and industry conferences, I continuously evolve my expertise. Currently mastering: Advanced AI/ML Integration, Full-Stack Development Architecture, Generative AI Applications, and Next-Generation UX Design. My commitment to lifelong learning ensures I deliver innovative, future-proof solutions that exceed expectations."
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              I'm passionate about staying at the cutting edge of technology and creativity. Through immersive online courses, hands-on workshops, and industry conferences, I continuously evolve my expertise. Currently mastering: <span className="font-semibold text-primary">Advanced AI/ML Integration</span>, <span className="font-semibold text-purple-600">Full-Stack Development Architecture</span>, <span className="font-semibold text-cyan-600">Generative AI Applications</span>, and <span className="font-semibold text-pink-600">Next-Generation UX Design</span>. My commitment to lifelong learning ensures I deliver innovative, future-proof solutions that exceed expectations.
            </motion.p>
          </EditableContent>
        </div>
      </motion.div>
    </motion.div>
  )
}


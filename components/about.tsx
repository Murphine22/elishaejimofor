"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Briefcase, GraduationCap, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { EditableContent } from "@/components/editable-content"
import { useState, useEffect } from "react"
import { useAdmin } from "@/components/admin-context"

export const About = () => {
  const { isAdmin, isEditMode } = useAdmin()
  const [timeline, setTimeline] = useState([
    { year: 2022, event: "Freelance Graphics Designer" },
    { year: 2023, event: "Started Web Development Journey" },
    { year: 2024, event: "Web Developer at OS Concept(DSDP) " },
    { year: 2024, event: "Launched Personal Brand as Content Creator(Murphine Tech)" },
    { year: 2024, event: "Front-End Developer at Periscope Consulting(Intern)" },
    { year: 2025, event: "Front-End Developer at Zimcrest Technologies" },
  ])

  const workExperience = [
    {
      title: "Senior Front-End Developer",
      company: "Zimcrest Technologies",
      period: "2025 - Present",
      color: "from-blue-500 to-blue-600",
      lightColor: "from-blue-500/20 to-blue-600/20",
      responsibilities: [
        "Joined a team of developers in building responsive web applications using Tailwind CSS and Next.js",
        "Implemented CI/CD pipelines that reduced deployment time by 40%",
        "Optimized application performance resulting in 30% faster load times",
        "Collaborated with UI/UX designers to implement pixel-perfect designs"
      ]
    },
    {
      title: "Web Developer",
      company: "Murphine Technologies",
      period: "2024 - 2025",
      color: "from-purple-500 to-purple-600",
      lightColor: "from-purple-500/20 to-purple-600/20",
      responsibilities: [
        "Developed and maintained client websites using React, Next.js, Tailwind CSS, JavaScript)",
        "Created custom WordPress for sites",
        "Implemented responsive designs for mobile and tablet devices",
        "Worked directly with clients to gather requirements and provide technical solutions",
        "Trained new developers on the company's technologies"
      ]
    },
    {
      title: "Web Developer Intern",
      company: "Periscope Consultings",
      period: "2024 August - 2024 September",
      color: "from-purple-500 to-purple-600",
      lightColor: "from-purple-500/20 to-purple-600/20",
      responsibilities: [
        "Led high-profile project (Daily Gist website), API Integration, and implemented best practices in development.",
        "Developed and maintained client websites using JavaScript, HTML, and CSS",
        "Integrated third-party APIs and services",
        "Implemented responsive designs for mobile and tablet devices",
        "Worked directly with clients to gather requirements and provide technical solutions",
        "Assisted in guiding the team on the project"
      ],
      location: "Abuja, Nigeria"
    },
    {
      title: "Junior Front End Developer & Graphics Designer Bootcamp",
      company: "OS Concept Solutions",
      period: "Jan 2024 - July 2024",
      color: "from-green-500 to-green-600",
      lightColor: "from-green-500/20 to-green-600/20",
      description: "Collaborated with senior developers to build user-friendly websites, create engaging content, and design visually appealing graphics while enhancing skills in SEO and prompt engineering.",
      responsibilities: [
        "Designed and updated web pages using HTML, CSS, JavaScript, PHP, MySQL AND WordPress",
        "Created graphics and content for marketing and branding purposes",
        "Optimized website performance and improved SEO rankings",
        "Developed and refined AI prompts for content generation",
        "Worked closely with a team to deliver projects on time"
      ],
      location: "Abuja, Nigeria"
    },
    {
      title: "Freelance Graphics Designer",
      company: "Self-employed",
      period: "2022 - 2024",
      color: "from-amber-500 to-amber-600",
      lightColor: "from-amber-500/20 to-amber-600/20",
      responsibilities: [
        "Created brand identities including logos, Posters, and Banners",
        "Designed marketing materials for social media campaigns",
        "Produced print-ready designs for business cards, flyers, and brochures",
        "Managed client relationships and delivered projects within tight deadlines"
      ]
    },
    {
      title: "Affiliate Marketer",
      company: "Timoyex Int'l",
      period: "April 2019 - November 2024",
      color: "from-yellow-500 to-yellow-600",
      lightColor: "from-yellow-500/20 to-yellow-600/20",
      responsibilities: [
        "Promoted solar energy products through strategic affiliate partnerships and innovative digital marketing campaigns",
        "Generated multiple new customer leads, resulting in significant growth for solar energy adoption",
        "Expanded the affiliate network by onboarding new high-performing partners",
        "Designed and implemented targeted marketing funnels that improved conversion rates by 30%"
      ],
      location: "Remote"
    },
    {
      title: "Business Developer (Branch Manager)",
      company: "Forgo Battery Company Ltd",
      period: "Feb 2017 - April 2022",
      color: "from-green-500 to-green-600",
      lightColor: "from-green-500/20 to-green-600/20",
      responsibilities: [
        "Managing branch operations, developing business strategies, and driving sales growth",
        "Increased branch revenue by 35% in the first quarter",
        "Implemented a new inventory management system to improve efficiency",
        "Developed and trained a high-performing sales team, enhancing overall productivity"
      ],
      location: "Ilorin, Nigeria"
    },
  ]

  const education = [
    {
      degree: "BSc in Geography & Meteorology",
      institution: "Nnamdi Azikiwe University, Awka",
      period: "2010 - 2014",
      color: "from-cyan-500 to-cyan-600",
      lightColor: "from-cyan-500/20 to-cyan-600/20",
      achievements: [
        "Earned a degree in Geography and Meteorology",
        "Specialized in Meteorology, Climate Data Analysis, and Web Mapping Technologies",
        "Final year project: Effect of climate and weather variations on Sugarcane Farming",
        "Applied meteorological data visualization techniques to web applications",
        "Developed interactive maps for geographical and climate data analysis"
      ]
      
    },
  ]

  const training = [
    {
      title: "Advanced React and Next.js",
      provider: "Murphine Technologies",
      year: "2024",
      color: "from-indigo-500 to-indigo-600",
      lightColor: "from-indigo-500/20 to-indigo-600/20",
      description: "Comprehensive training on building scalable applications with React and Next.js, including server components, data fetching strategies, and performance optimization."
    },
    {
      title: "Web Development Bootcamp",
      provider: "Dunamis SKills Aquisition Program(DSAP)",
      year: "2024",
      color: "from-emerald-500 to-emerald-600",
      lightColor: "from-emerald-500/20 to-emerald-600/20",
      description: "Web Development Bootcamp with HTML, CSS, and JavaScript & Graphic Design with Adobe Photoshop"
    },
    {
      title: "UI/UX Design Using Figma",
      provider: "Alison(Online)",
      year: "2023",
      color: "from-rose-500 to-rose-600",
      lightColor: "from-rose-500/20 to-rose-600/20",
      description: "In-depth course on user-centered design principles, wireframing, prototyping, and usability testing methodologies."
    },
    {
      title: "Digital Marketing",
      provider: "Apparel Business Consult",
      year: "2022 - 2023",
      color: "from-rose-500 to-rose-600",
      lightColor: "from-rose-500/20 to-rose-600/20",
      description: "Comprehensive course covering social media marketing, social media management, Facebook and Google advertisement setups, SEO optimization, content creation, and search engine marketing(SEM). Focused on data-driven strategies to enhance online visibility and audience engagement."
    },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const profileImages = [
    "https://i.pinimg.com/474x/4b/0e/2b/4b0e2b4c967ed625e7c7c1ae05743ced.jpg",
    "https://i.pinimg.com/474x/a2/03/97/a20397082fc6d98261e54e2431e2508c.jpg"
  ]
  
  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % profileImages.length)
    }, 4000) // Change image every 4 seconds
    
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 bg-background p-8 rounded-lg shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            <EditableContent section="about" field="title" type="text" defaultValue="About Me">
              About Me
            </EditableContent>
          </h2>
          <div className="space-y-4">
            <EditableContent section="about" field="vision" type="text" multiline defaultValue="My vision is to create innovative digital solutions that make a positive impact on people's lives. I believe in the power of technology to transform businesses and enhance user experiences.">
              <p>
                My vision is to create innovative digital solutions that make a positive impact on people's lives. I believe in the power of technology to transform businesses and enhance user experiences.
              </p>
            </EditableContent>
            
            <EditableContent section="about" field="journey" type="text" multiline defaultValue="With over 3 years of experience in web development and digital solutions, I've had the privilege of working on diverse projects that have shaped my expertise in creating user-centric applications.">
              <p>
                With over 3 years of experience in web development and digital solutions, I've had the privilege of working on diverse projects that have shaped my expertise in creating user-centric applications.
              </p>
            </EditableContent>
          </div>
          
          <div className="flex gap-4 mt-6">
            <Button 
              className="flex items-center gap-2"
              onClick={() => {
                window.open("https://www.dropbox.com/scl/fi/wrrsvzw86euu58ekc18el/Elisha-s-Resume-Oct.-24.pdf?rlkey=8bi8dldb4pvb8zcdzvtpptwky&st=eze78m8l&dl=1", "_blank")
              }}
            >
              <Download className="h-4 w-4" />
              <EditableContent section="about" field="resumeButton" type="text" defaultValue="Download CV">
                Download CV
              </EditableContent>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <EditableContent section="about" field="portfolioButton" type="text" defaultValue="Portfolio">
                Portfolio
              </EditableContent>
            </Button>
          </div>
        </div>
        
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 rounded-xl blur-md opacity-75"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "linear" 
            }}
            style={{ backgroundSize: "200% 200%" }}
          />
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <motion.div 
              className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-white text-xs font-medium">Available for hire</span>
            </motion.div>
            
            <div className="absolute inset-0 z-10 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-white/70"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/0 z-10"></div>
            
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={profileImages[currentImageIndex]}
                    alt="Elisha Ejimofor"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-16 left-0 right-0 z-20 flex justify-center gap-2">
                {profileImages.map((_, index) => (
                  <button
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-20"
              initial={{ y: 100 }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white text-sm font-medium">Elisha Ejimofor</p>
              <p className="text-white/80 text-xs">Web Developer & Designer</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Card className="overflow-hidden border-none shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 -z-10"></div>
          <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">My Journey</h3>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                <span className="text-primary font-bold bg-primary/10 px-2 py-1 rounded">{item.year}</span>
                <div className="flex-1 border-b border-primary/20"></div>
                <span className="text-muted-foreground">{item.event}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

      <Tabs defaultValue="experience" className="mt-10">
        <TabsList className="grid w-full grid-cols-3 bg-background border border-primary/20">
          <TabsTrigger value="experience" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-purple-600/20">
            <Briefcase className="h-4 w-4" /> Work Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-purple-600/20">
            <GraduationCap className="h-4 w-4" /> Education
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-purple-600/20">
            <Award className="h-4 w-4" /> Training & Certifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="experience" className="mt-6">
          <div className="space-y-6">
            {workExperience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-300">
                  <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${job.lightColor} -z-10`}></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full bg-gradient-to-br ${job.color} text-white mr-3`}>
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                      </div>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{job.period}</span>
                    </div>
                    <h4 className="text-lg text-muted-foreground mb-4 ml-10">{job.company}</h4>
                    <ul className="list-disc list-inside space-y-2 ml-10">
                      {job.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="text-muted-foreground">{responsibility}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="education" className="mt-6">
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-t-4 border-t-cyan-500 hover:shadow-lg transition-all duration-300">
                  <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${edu.lightColor} -z-10`}></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full bg-gradient-to-br ${edu.color} text-white mr-3`}>
                          <GraduationCap className="h-4 w-4" />
                        </div>
                        <h3 className="text-xl font-bold">{edu.degree}</h3>
                      </div>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{edu.period}</span>
                    </div>
                    <h4 className="text-lg text-muted-foreground mb-4 ml-10">{edu.institution}</h4>
                    <ul className="list-disc list-inside space-y-2 ml-10">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-muted-foreground">{achievement}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="training" className="mt-6">
          <div className="space-y-6">
            {training.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-t-4 border-t-indigo-500 hover:shadow-lg transition-all duration-300">
                  <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${course.lightColor} -z-10`}></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full bg-gradient-to-br ${course.color} text-white mr-3`}>
                          <Award className="h-4 w-4" />
                        </div>
                        <h3 className="text-xl font-bold">{course.title}</h3>
                      </div>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{course.year}</span>
                    </div>
                    <h4 className="text-lg text-muted-foreground mb-4 ml-10">{course.provider}</h4>
                    <p className="text-muted-foreground ml-10">{course.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}


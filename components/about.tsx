"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Briefcase, GraduationCap, Award, Sparkles, TrendingUp, Rocket, Star, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { EditableContent } from "@/components/editable-content"
import { useState, useEffect } from "react"
import { useAdmin } from "@/components/admin-context"

interface AboutProps {
  onNavigate: (page: string) => void
}

export const About = ({ onNavigate }: AboutProps) => {
  const { isAdmin, isEditMode } = useAdmin()
  const [timeline, setTimeline] = useState([
    { 
      year: 2017, 
      event: "Business Developer/Branch Manager",
      company: "Forgo Battery Company Ltd",
      period: "2017-2022",
      icon: Briefcase,
      gradient: "from-orange-500 to-red-500",
      description: "Led business development and branch operations"
    },
    { 
      year: 2019, 
      event: "Affiliate Marketer",
      company: "Timoyex Int'l",
      period: "2019-2024",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
      description: "Drove digital marketing campaigns and affiliate partnerships"
    },
    { 
      year: 2022, 
      event: "Freelance Graphics Designer",
      company: "Self-employed",
      period: "2022-2024",
      icon: Sparkles,
      gradient: "from-pink-500 to-rose-500",
      description: "Created visual identities and marketing materials for clients"
    },
    { 
      year: 2023, 
      event: "Started Web Development Journey",
      company: "Self-Learning",
      period: "2023-2024",
      icon: Rocket,
      gradient: "from-purple-500 to-violet-500",
      description: "Embarked on intensive web development training"
    },
    { 
      year: 2024, 
      event: "Web Developer",
      company: "OS Concept (DSDP)",
      period: "2024",
      icon: Zap,
      gradient: "from-blue-500 to-cyan-500",
      description: "Built responsive web applications and collaborated with teams"
    },
    { 
      year: 2024, 
      event: "Web and Graphics Designer",
      company: "DSAP",
      period: "Trainee 2024",
      icon: Star,
      gradient: "from-amber-500 to-yellow-500",
      description: "Designed user interfaces and marketing graphics"
    },
    { 
      year: 2024, 
      event: "Front-End Developer",
      company: "Periscope Consulting",
      period: "Intern 2024",
      icon: Briefcase,
      gradient: "from-indigo-500 to-purple-500",
      description: "Developed dynamic web applications with modern frameworks"
    },
    { 
      year: 2024, 
      event: "Launched Personal Brand as Digital Specialist",
      company: "Murphine Technologies",
      period: "2024 - Present",
      icon: Rocket,
      gradient: "from-purple-500 to-pink-500",
      description: "Founded digital agency offering web development and AI solutions",
      featured: true
    },
    { 
      year: 2025, 
      event: "Front-End Developer",
      company: "Zimcrest Technologies",
      period: "2025",
      icon: Zap,
      gradient: "from-cyan-500 to-blue-500",
      description: "Building scalable SPAs with Next.js and modern tech stack",
      featured: true
    },
  ])
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null)

  const workExperience = [
    {
      title: "Web Developer",
      company: "Murphine Technologies",
      period: "2024 - Present" ,
      color: "from-purple-500 to-purple-600",
      lightColor: "from-purple-500/20 to-purple-600/20",
      responsibilities: [
        "Applied critical thinking and problem-solving during UI optimization and bugs-fixing tasks, reducing turnaround time on critical features)",
        "Built responsive, interactive Single Page Applications (SPAs) (e.g., Udacu, Ush-App) using React.js, Bootstrap, and Supabase, increasing organizational transparency and digital functionality by 65%",
        "Designed full frontend development curriculum with live coding sessions, assessments, and real-world project simulations.",
        "Developed custom WordPress for sites",
        "Created marketing assets using Canva that increased client business engagement by 60% across digital platforms",
        "Worked directly with clients to gather requirements and provide technical solutions",
        "Led AI-in-business workshops for SMEs, resulting in 30% improvement in workflow automation adoption",
        "Trained over 20 students in frontend and backend development technologies, achieving 60% job placement success rate",
        "Delivered hands-on training with real projects, enhancing students portfolio readiness, problem-solving, and team collaboration."
      ]
    },
    {
      title: "Senior Front-End Developer",
      company: "Zimcrest Technologies",
      period: "2025",
      color: "from-blue-500 to-blue-600",
      lightColor: "from-blue-500/20 to-blue-600/20",
      responsibilities: [
        "Developed Single Page Applications (SPA) with mobile-first design and cross-browser compatibility using Next.js and Tailwind CSS, achieving 35% faster load times and improved user engagement",
        "Integrated AI tools (AI Chat Assistant) for smart interaction modules, improving user satisfaction by 40%",
        "Translated Figma UI/UX prototypes into high-performance interfaces, reducing design-to-code turnaround by 25%.",
        "Deployed projects using CI/CD workflows via Vercel, improving scalability and deployment speed by 50%",
        "Applied Agile methodologies using GitHub, Trello, and Slack to maintain code quality and streamline delivery.",
      ]
    },

    {
      title: "Web Developer Intern",
      company: "Periscope Consultings",
      period: "2024 August - 2024 September",
      color: "from-purple-500 to-purple-600",
      lightColor: "from-purple-500/20 to-purple-600/20",
      responsibilities: [
        "Built a fully responsive, cross-browser compatible, mobile-first news website with dynamic search,comments, and API integration, improving user engagement by 40% and increasing traffic by 25%",
        "Implemented RESTful API integration using JSONPlaceholder for dynamic content flow and real-time updates.",
        "Ensured 100% accessibility compliance and responsiveness across all devices and browsers.",
        "Contributed to SEO-optimized features that elevated site visibility and organic search rankings.",
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
        "Collaborated on frontend and backend features using HTML, JavaScript, PHP, and MySQL for multiple client sites, contributing to feature delivery and QA testing.",
        "Created graphics and content for marketing and branding purposes, increasing client engagement by 50%",
        "Collaborated with senior developers and UI/UX designers to implement on-brand, SEO-optimized, and accessibility-compliant websites.",
        "Participated in building responsive UIs, implementing basic API endpoints, and managing version control using Git.",
        "Contributed to backend development with PHP and MySQL, improving database-driven content delivery for small business clients.",
        "Joined brainstorming sessions for UI enhancement and workflow automation, resulting in improved client feedback and delivery alignment",
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
        "Created brand identities including logos, Posters, and Banners using Canva",
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
        "Promoted solar energy products through strategic affiliate partnerships and innovative digital marketing campaigns using Facebook and Google",
        "Generated multiple new customer leads, resulting in significant growth for solar energy adoption by 30%",
        "Expanded the affiliate network by onboarding new high-performing partners by 20%",
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
        "Directed daily branch operations, ensuring seamless workflow, accurate account reconciliation, and achievement of company objectives.",
        "Streamlined inventory and ordering systems, reducing stock delays and cutting operational inefficiencies by 30%.",
        "Led local marketing campaigns and strategic outreach initiatives, increasing brand visibility and driving a 30% growth in customer base.",
        "Engineered a 25% boost in monthly sales through data-driven business development and targeted market penetration strategies.",
        "Managed customer relations, resolving complaints promptly and maintaining a 90%+ satisfaction rate.",
        "Fostered a performance-focused work culture and maintained a healthy, collaborative team environment.",
        "Designed and implemented effective onboarding and training programs, accelerating new staff productivity by 40%"
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
      title: "Generative AI Mastermind",
      provider: "Outskill",
      year: "2025",
      color: "from-indigo-500 to-indigo-600",
      lightColor: "from-indigo-500/20 to-orange-600/20",
      description: "Completed an advanced global program focused on the strategic and technical applications of Generative AI in business, design, and digital innovation."
    },
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
    "https://i.imgur.com/QwVIarl.jpeg",
    "https://i.imgur.com/vPOk177.jpeg",
    "https://i.imgur.com/L8HmeD3.jpeg",
    "https://i.imgur.com/6M86mxE.jpeg",
    "https://i.imgur.com/cTIFMyY.jpeg",
    "https://i.imgur.com/8Blt9Eo.jpeg"
  ]
  
  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % profileImages.length)
    }, 5000) // Change image every 5 seconds
    
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
              Hey there — I’m Elisha Ejimofor, the creative mind behind Murphine Technologies.
              I’m a Frontend Developer, Digital Creator, and AI Prompt Engineer with a relentless drive to turn bold ideas into beautiful, functional realities. My mission? To build intelligent, human-centered digital experiences that empower businesses and inspire people across the globe.
              </p>
            </EditableContent>
            
            <EditableContent section="about" field="journey" type="text" multiline defaultValue="With over 3 years of experience in web development and digital solutions, I've had the privilege of working on diverse projects that have shaped my expertise in creating user-centric applications.">
              <p>
                With over 2 years of hands-on experience in web development and 5+ years in digital solutions, marketing, and business growth, I’ve had the privilege of designing and developing high-performing web applications that merge creativity with technology.
              </p>
              <p>
                I work at the intersection of design, code, and strategy — crafting interactive, scalable, and visually captivating platforms using tools like React.js, Next.js, Supabase, and Tailwind CSS. Whether it’s developing seamless user interfaces, mentoring tech talents, or creating AI-driven digital experiences, I bring clarity, emotion, and innovation to every project I touch.
                At Murphine Technologies, I believe technology should feel alive — adaptive, intuitive, and impactful. I’m passionate about leveraging AI and modern development frameworks to shape the next wave of smart, sustainable, and inclusive digital solutions.
              </p>
              <p>
                Every pixel matters. Every interaction counts. Every line of code is a story waiting to be told.
                Let’s build the future — one idea, one experience, and one transformation at a time.
              </p>
            </EditableContent>
          </div>
          
          <div className="flex gap-4 mt-6">
            <Button 
              className="flex items-center gap-2"
              onClick={() => {
                window.open("https://www.dropbox.com/scl/fi/vnfp18qd73ezquk5fad9y/Elisha-s-Frontend-CV-Updated.pdf?rlkey=s7x2z9j6bvv4ag9mbxotq1mk3&st=sao2augz&dl=0")
              }}
            >
              <Download className="h-4 w-4" />
              <EditableContent section="about" field="resumeButton" type="text" defaultValue="Download CV">
                Download CV
              </EditableContent>
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={() => onNavigate("projects")}
            >
              <ExternalLink className="h-4 w-4" />
              <EditableContent section="about" field="portfolioButton" type="text" defaultValue="Portfolio">
                Portfolio
              </EditableContent>
            </Button>
          </div>
        </div>
        
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 rounded-xl blur-lg opacity-80"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "linear" 
            }}
            style={{ backgroundSize: "200% 200%" }}
          />
          <div className="relative h-[650px] rounded-xl overflow-hidden shadow-2xl">
            <motion.div 
              className="absolute top-4 right-4 z-30 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
            >
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-white text-xs font-semibold">Let's Collaborate </span>
            </motion.div>
            
            {/* Removed the star animation for simplicity */}
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
            
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.4, 0.0, 0.2, 1.0],
                  }}
                >
                  <Image
                    src={profileImages[currentImageIndex]}
                    alt="Elisha Ejimofor"
                    fill
                    className="object-cover object-center"
                    style={{ objectPosition: "center" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {profileImages.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-20"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="text-white text-sm font-semibold">Elisha Ejimofor</p>
              <p className="text-white/80 text-xs">Web Developer & Designer</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* My Journey Section - Ultra Modern & Interactive */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-purple-600/5 to-pink-600/5 border-2 border-primary/10 p-8 md:p-12">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-600/10 px-4 py-2 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">Career Timeline</span>
            </motion.div>
            
            <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600">
              My Journey
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From business development to digital innovation — a story of continuous growth and transformation
            </p>
          </motion.div>

          {/* Interactive Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-600 to-pink-600 transform md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0
                const isHovered = hoveredIndex === index
                const isSelected = selectedMilestone === index

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`relative flex items-center ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-row`}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    {/* Year Badge (Mobile & Desktop) */}
                    <motion.div
                      className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-20"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-xl cursor-pointer border-4 border-background`}
                        onClick={() => setSelectedMilestone(isSelected ? null : index)}
                      >
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                      className={`ml-28 md:ml-0 ${
                        isLeft ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'
                      } md:w-5/12 w-full`}
                      animate={{
                        scale: isHovered || isSelected ? 1.05 : 1,
                        x: isHovered ? (isLeft ? -10 : 10) : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Card
                        className={`overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                          item.featured
                            ? 'border-primary shadow-2xl bg-gradient-to-br from-primary/5 to-purple-600/5'
                            : isHovered || isSelected
                            ? 'border-primary/50 shadow-xl'
                            : 'border-border shadow-lg'
                        }`}
                        onClick={() => setSelectedMilestone(isSelected ? null : index)}
                      >
                        {/* Top Accent Bar */}
                        <div className={`h-2 bg-gradient-to-r ${item.gradient}`} />

                        <CardContent className="p-6">
                          {/* Year Badge */}
                          <div className="flex items-center justify-between mb-3">
                            <motion.div
                              className={`px-3 py-1 rounded-full bg-gradient-to-r ${item.gradient} text-white text-sm font-bold shadow-lg`}
                              animate={{ scale: isHovered ? 1.1 : 1 }}
                            >
                              {item.year}
                            </motion.div>
                            {item.featured && (
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                              </motion.div>
                            )}
                          </div>

                          {/* Title */}
                          <h4 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            {item.event}
                          </h4>

                          {/* Company */}
                          <p className="text-primary font-semibold mb-2">
                            {item.company}
                          </p>

                          {/* Period */}
                          <p className="text-sm text-muted-foreground mb-3">
                            {item.period}
                          </p>

                          {/* Description */}
                          <AnimatePresence>
                            {(isSelected || isHovered) && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-muted-foreground text-sm leading-relaxed"
                              >
                                {item.description}
                              </motion.p>
                            )}
                          </AnimatePresence>

                          {/* Hover Indicator */}
                          {!isSelected && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: isHovered ? 1 : 0 }}
                              className="text-xs text-primary mt-2 font-medium"
                            >
                              Click to expand →
                            </motion.p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {[
              { icon: Briefcase, label: "Years Experience", value: "8+" },
              { icon: Rocket, label: "Career Milestones", value: "9" },
              { icon: TrendingUp, label: "Industries", value: "5+" },
              { icon: Star, label: "Current Roles", value: "2" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-primary/10 hover:border-primary/30 transition-all"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

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


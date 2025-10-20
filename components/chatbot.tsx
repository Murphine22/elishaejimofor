"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample responses for the chatbot
const chatbotResponses = {
  greeting: [
    "Hello! I'm Elisha's virtual assistant. How can I help you today?",
    "Hi there! Welcome to Elisha's portfolio. What would you like to know?",
    "Greetings! I'm here to assist you with any questions about Elisha's work.",
  ],
  skills: [
    "Elisha is skilled in front-end development (React, Next.js, TypeScript), UI/UX design, content creation, and AI prompt engineering. Elisha has over 5 years of experience in web development and has worked with various frameworks and technologies. Which specific skill would you like to know more about?",
    "Elisha's core skills include:\n\n• Front-end: React, Next.js, TypeScript, Tailwind CSS\n• UI/UX: Figma, Adobe XD, responsive design\n• Content Creation: Blog writing, technical documentation\n• AI: Prompt engineering, LLM integration\n\nNeed more specific information on any of these areas?",
  ],
  contact: [
    "You can contact Elisha via email at elisha.ejimofor@example.com or through the contact form on this website. Elisha typically responds within 24-48 hours.",
    "The best way to reach Elisha is through the contact form or via WhatsApp at +2348160589186. For urgent inquiries, WhatsApp is recommended.",
  ],
  projects: [
    "Elisha has worked on various projects including:\n\n• E-commerce Platform: A full-stack solution with React and Node.js\n• AI-Powered Chatbot: Using natural language processing\n• Portfolio Website: Responsive design showcasing creative work\n• Mobile Fitness App: Cross-platform app for tracking fitness goals\n• Data Visualization Dashboard: Interactive dashboard for complex datasets\n• Blockchain Wallet Application: Secure cryptocurrency wallet\n• African Marketplace: Connecting artisans with global buyers\n\nCheck out the Projects section for more details!",
    "Recent projects include data visualization dashboards, mobile fitness apps, and custom web applications. Each project showcases different skills and technologies. Would you like me to highlight any specific project?",
  ],
  services: [
    "Elisha offers the following services:\n\n• Web Development: Custom websites, web applications, e-commerce solutions\n• UI/UX Design: User interface design, user experience optimization, wireframing\n• Content Creation: Blog posts, technical writing, copywriting\n• Prompt Engineering: AI prompt design, LLM integration, chatbot development\n• Performance Optimization: Website speed optimization, SEO improvements\n• Consultation: Technical advice, project planning, technology selection\n\nWhich service are you interested in?",
    "Services include custom website development, graphics design, content writing, and AI consultation. Each service is available in Basic, Standard, and Premium packages to suit different needs and budgets. Need more information on any of these?",
  ],
  about: [
    "Elisha is a skilled web developer and digital creative based in Nigeria. With a passion for creating beautiful, functional digital experiences, Elisha combines technical expertise with creative vision. Elisha has worked with clients across Africa and internationally, delivering high-quality solutions that meet business objectives.",
    "Elisha is a full-stack developer with a focus on front-end technologies. With a background in computer science and years of industry experience, Elisha specializes in creating responsive, user-friendly web applications. Elisha is passionate about using technology to solve real-world problems, particularly in the African context.",
  ],
  blog: [
    "The blog section features the latest tech news and innovations from across Africa. It covers topics like startup funding, technological advancements, educational initiatives, and more. The blog is regularly updated with new content, and you can filter posts by category or search for specific topics.",
    "The blog showcases tech news from various African countries, highlighting innovations, startups, and technological advancements. Premium content is available for registered users, offering deeper insights and analysis. You can like, comment, and save posts that interest you.",
  ],
  website: [
    "This portfolio website was built using Next.js, TypeScript, and Tailwind CSS. It features sections for About, Skills, Projects, Services, and Blog. The site includes interactive elements like animations, a chatbot (that's me!), and a dark/light mode toggle. It's fully responsive and optimized for all devices.",
    "This website showcases Elisha's work and services. It includes:\n\n• Home page with featured projects and services\n• About section with professional background\n• Skills section highlighting technical expertise\n• Projects portfolio with detailed case studies\n• Services offered with pricing information\n• Blog with tech news and insights\n• Contact form for inquiries\n\nThe site also features a theme toggle, animations, and interactive elements for an engaging user experience.",
  ],
  default: [
    "I'm not sure I understand. Could you please rephrase your question?",
    "Interesting question! Let me connect you with Elisha for a more detailed response.",
    "I don't have that information right now, but you can find more details in the portfolio sections above.",
  ],
}

// Function to get a response based on the input
const getChatbotResponse = (input: string) => {
  const lowerInput = input.toLowerCase()

  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
    return chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)]
  } else if (lowerInput.includes("skill") || lowerInput.includes("can") || lowerInput.includes("able") || lowerInput.includes("know")) {
    return chatbotResponses.skills[Math.floor(Math.random() * chatbotResponses.skills.length)]
  } else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("phone") || lowerInput.includes("reach")) {
    return chatbotResponses.contact[Math.floor(Math.random() * chatbotResponses.contact.length)]
  } else if (lowerInput.includes("project") || lowerInput.includes("work") || lowerInput.includes("portfolio")) {
    return chatbotResponses.projects[Math.floor(Math.random() * chatbotResponses.projects.length)]
  } else if (lowerInput.includes("service") || lowerInput.includes("offer") || lowerInput.includes("provide") || lowerInput.includes("help")) {
    return chatbotResponses.services[Math.floor(Math.random() * chatbotResponses.services.length)]
  } else if (lowerInput.includes("about") || lowerInput.includes("who") || lowerInput.includes("background") || lowerInput.includes("experience")) {
    return chatbotResponses.about[Math.floor(Math.random() * chatbotResponses.about.length)]
  } else if (lowerInput.includes("blog") || lowerInput.includes("news") || lowerInput.includes("article") || lowerInput.includes("post")) {
    return chatbotResponses.blog[Math.floor(Math.random() * chatbotResponses.blog.length)]
  } else if (lowerInput.includes("website") || lowerInput.includes("site") || lowerInput.includes("portfolio") || lowerInput.includes("built") || lowerInput.includes("made")) {
    return chatbotResponses.website[Math.floor(Math.random() * chatbotResponses.website.length)]
  } else {
    return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)]
  }
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { 
      role: "assistant", 
      content: "Hi there! I'm Elisha's AI-powered assistant, enhanced with Google Gemini. I have comprehensive knowledge about Elisha's skills, projects, services, and this website. How can I help you today?" 
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]) //Corrected dependency

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    const userMessage = input
    // Add user message
    setMessages([...messages, { role: "user", content: userMessage }])
    setInput("")

    // Show typing indicator
    setIsTyping(true)

    try {
      // Call Gemini API through our backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      // Add AI response
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Chat error:", error)
      // Fallback to local responses if API fails
      const fallbackResponse = getChatbotResponse(userMessage)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: fallbackResponse + "\n\n(Note: Using offline mode. For enhanced responses, please check your connection.)",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <motion.button
        className="relative group bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full shadow-lg hover:shadow-blue-500/25 hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <motion.div
          className="absolute inset-0 bg-white/25 rounded-full"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <MessageSquare className="w-6 h-6 text-white relative z-10" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-20 right-4 w-80 md:w-96 z-50"
          >
            <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-primary">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=E" />
                      <AvatarFallback>E</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Elisha's Assistant</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        Powered by Gemini AI
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-background/50">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {message.role === "user" ? (
                            <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center">
                              <User className="w-3 h-3" />
                            </div>
                          ) : (
                            <div className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2 max-w-[80%]">
                        <div className="flex-shrink-0 mt-1">
                          <div className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center">
                            <Bot className="w-3 h-3" />
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-muted flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="bg-gradient-to-r from-primary to-purple-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


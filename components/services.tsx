"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { 
  Code, Palette, FileText, Terminal, Zap, Users, Clock, DollarSign, Check, 
  ArrowRight, Sparkles, Star, TrendingUp, Package, Shield, Rocket, Award, X
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/components/admin-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Exchange rate: 1 USD = 1,500 NGN (approximate)
const exchangeRate = 1500;

// Define the service type
interface ServicePackage {
  name: string;
  description: string;
  priceNGN: number;
  duration: string;
  features: string[];
}

interface Service {
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  details: string[];
  packages: ServicePackage[];
  category: string;
  iconColor: string;
  gradient: string;
}

const services: Service[] = [
  {
    title: "Web Development",
    icon: Code,
    category: "Development",
    iconColor: "text-blue-500",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    description: "Custom websites and web applications tailored to your needs",
    details: [
      "Responsive design for all devices",
      "Performance optimization",
      "SEO-friendly development",
      "Integration with various APIs and services",
    ],
    packages: [
      {
        name: "Basic",
        description: "Simple landing page or brochure website (up to 5 pages)",
        priceNGN: 200000,
        duration: "1-2 weeks",
        features: [
          "Responsive design",
          "Basic SEO setup",
          "Contact form",
          "Social media integration",
          "1 month of support"
        ]
      },
      {
        name: "Standard",
        description: "Multi-page website with custom features (up to 10 pages)",
        priceNGN: 400000,
        duration: "2-3 weeks",
        features: [
          "All Basic features",
          "Content Management System",
          "Blog functionality",
          "Advanced SEO optimization",
          "Google Analytics integration",
          "3 months of support"
        ]
      },
      {
        name: "Premium",
        description: "Full-featured web application or e-commerce site",
        priceNGN: 1000000,
        duration: "4-6 weeks",
        features: [
          "All Standard features",
          "E-commerce functionality",
          "Payment gateway integration",
          "Custom database design",
          "User authentication system",
          "Advanced security features",
          "6 months of support"
        ]
      }
    ]
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    category: "Design",
    iconColor: "text-purple-500",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    description: "User-centered design solutions that enhance user experience",
    details: [
      "User research and persona development",
      "Wireframing and prototyping",
      "Visual design and branding",
      "Usability testing and iteration"
    ],
    packages: [
      {
        name: "Basic",
        description: "Simple UI design for existing products or websites",
        priceNGN: 500000,
        duration: "3-5 days",
        features: [
          "UI audit and recommendations",
          "Basic redesign of key screens",
          "Style guide",
          "1 round of revisions"
        ]
      },
      {
        name: "Standard",
        description: "Comprehensive UI/UX design for new or existing products",
        priceNGN: 250000,
        duration: "1-2 weeks",
        features: [
          "User research",
          "Wireframing",
          "High-fidelity mockups",
          "Interactive prototype",
          "Comprehensive style guide",
          "2 rounds of revisions"
        ]
      },
      {
        name: "Premium",
        description: "End-to-end UX/UI design process with extensive research",
        priceNGN: 300000,
        duration: "2-4 weeks",
        features: [
          "In-depth user research",
          "User personas and journey mapping",
          "Information architecture",
          "Wireframing and prototyping",
          "High-fidelity designs for all screens",
          "Animation and interaction specifications",
          "Comprehensive design system",
          "Usability testing",
          "3 rounds of revisions"
        ]
      }
    ]
  },
  {
    title: "Content Creation",
    icon: FileText,
    category: "Content",
    iconColor: "text-green-500",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    description: "Engaging content that resonates with your target audience",
    details: [
      "Blog posts and articles",
      "Website copy",
      "Social media content",
      "Technical documentation"
    ],
    packages: [
      {
        name: "Basic",
        description: "Essential content for small websites or projects",
        priceNGN: 50000,
        duration: "3-5 days",
        features: [
          "Up to 5 pages of website copy",
          "SEO optimization",
          "1 round of revisions",
          "Basic keyword research"
        ]
      },
      {
        name: "Standard",
        description: "Comprehensive content package for growing businesses",
        priceNGN: 100000,
        duration: "1-2 weeks",
        features: [
          "Up to 10 pages of website copy",
          "2 blog posts per month",
          "Social media content calendar",
          "Advanced SEO optimization",
          "2 rounds of revisions",
          "Competitor analysis"
        ]
      },
      {
        name: "Premium",
        description: "Full-scale content strategy and creation",
        priceNGN: 250000,
        duration: "2-3 weeks",
        features: [
          "Complete website copy",
          "4 blog posts per month",
          "Social media content creation and management",
          "Email newsletter content",
          "Technical documentation",
          "Content style guide",
          "Comprehensive SEO strategy",
          "3 rounds of revisions",
          "Monthly performance reports"
        ]
      }
    ]
  },
  {
    title: "AI Integration",
    icon: Terminal,
    category: "AI",
    iconColor: "text-amber-500",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    description: "Expert AI prompt design and integration for optimal results",
    details: [
      "Custom prompt design",
      "AI system optimization",
      "Chatbot development",
      "Training and fine-tuning"
    ],
    packages: [
      {
        name: "Basic",
        description: "Essential prompt engineering for specific use cases",
        priceNGN: 25000,
        duration: "2-3 days",
        features: [
          "Prompt analysis and optimization",
          "Basic prompt templates",
          "Documentation",
          "1 round of revisions"
        ]
      },
      {
        name: "Standard",
        description: "Comprehensive prompt engineering for business applications",
        priceNGN: 50000,
        duration: "1-2 weeks",
        features: [
          "Custom prompt design",
          "System message optimization",
          "Response formatting",
          "Error handling strategies",
          "Integration guidance",
          "2 rounds of revisions"
        ]
      },
      {
        name: "Premium",
        description: "End-to-end AI solution development with advanced prompting",
        priceNGN: 100000,
        duration: "2-3 weeks",
        features: [
          "Advanced prompt engineering",
          "Custom AI system development",
          "Chatbot or assistant creation",
          "Fine-tuning recommendations",
          "Integration with existing systems",
          "Performance optimization",
          "Comprehensive documentation",
          "Training session",
          "3 months of support"
        ]
      }
    ]
  },
  {
    title: "Performance Optimization",
    icon: Zap,
    category: "Technical",
    iconColor: "text-red-500",
    gradient: "from-red-500 via-pink-500 to-purple-500",
    description: "Speed up your website or application for better user experience",
    details: [
      "Website speed optimization",
      "Code refactoring",
      "Database optimization",
      "Server configuration"
    ],
    packages: [
      {
        name: "Basic",
        description: "Essential performance audit and basic optimizations",
        priceNGN: 75000,
        duration: "2-3 days",
        features: [
          "Performance audit",
          "Image optimization",
          "Basic caching implementation",
          "Simple code optimizations",
          "Performance report"
        ]
      },
      {
        name: "Standard",
        description: "Comprehensive performance optimization for websites",
        priceNGN: 150000,
        duration: "1 week",
        features: [
          "Detailed performance audit",
          "Advanced image and asset optimization",
          "Code minification and bundling",
          "Database query optimization",
          "Caching strategy implementation",
          "CDN configuration",
          "Before/after performance comparison"
        ]
      },
      {
        name: "Premium",
        description: "Full-scale optimization for complex applications",
        priceNGN: 250000,
        duration: "2 weeks",
        features: [
          "Comprehensive system audit",
          "Front-end optimization",
          "Back-end optimization",
          "Database restructuring and indexing",
          "Server configuration optimization",
          "Load balancing setup",
          "Custom caching solutions",
          "Performance monitoring setup",
          "Documentation and recommendations",
          "1 month of monitoring and adjustments"
        ]
      }
    ]
  },
  {
    title: "Consultation",
    icon: Users,
    category: "Advisory",
    iconColor: "text-cyan-500",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    description: "Expert advice on technology strategy and implementation",
    details: [
      "Technology stack selection",
      "Project planning and roadmapping",
      "Technical architecture design",
      "Team structure and workflow optimization"
    ],
    packages: [
      {
        name: "Basic",
        description: "One-time consultation session for specific issues",
        priceNGN: 50000,
        duration: "2 hours",
        features: [
          "2-hour consultation session",
          "Problem analysis",
          "Recommendations document",
          "Email follow-up"
        ]
      },
      {
        name: "Standard",
        description: "Ongoing consultation for projects or teams",
        priceNGN: 100000,
        duration: "1 month",
        features: [
          "Weekly consultation sessions",
          "Project review and feedback",
          "Technical documentation review",
          "Best practices guidance",
          "Email support between sessions"
        ]
      },
      {
        name: "Premium",
        description: "Comprehensive technical advisory for organizations",
        priceNGN: 150000,
        duration: "3 months",
        features: [
          "Bi-weekly strategy sessions",
          "Technical architecture planning",
          "Team structure recommendations",
          "Technology stack evaluation",
          "Vendor selection assistance",
          "Implementation roadmap",
          "Risk assessment",
          "Priority email and phone support",
          "Technology roadmap development"
        ]
      }
    ]
  },
  {
    title: "Digital Marketing",
    icon: TrendingUp,
    category: "Marketing",
    iconColor: "text-pink-500",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    description: "Strategic digital marketing campaigns that drive growth and engagement",
    details: [
      "Social media marketing",
      "SEO and content marketing",
      "Email marketing campaigns",
      "Analytics and reporting"
    ],
    packages: [
      {
        name: "Basic",
        description: "Essential digital marketing for startups and small businesses",
        priceNGN: 80000,
        duration: "1 month",
        features: [
          "Social media management (2 platforms)",
          "3 posts per week",
          "Basic SEO optimization",
          "Monthly performance report",
          "Email support"
        ]
      },
      {
        name: "Standard",
        description: "Comprehensive marketing for growing businesses",
        priceNGN: 150000,
        duration: "1 month",
        popular: true,
        features: [
          "Social media management (4 platforms)",
          "5 posts per week",
          "Advanced SEO strategy",
          "Email marketing campaign",
          "Content calendar",
          "Bi-weekly performance reports",
          "Priority support"
        ]
      },
      {
        name: "Premium",
        description: "Full-scale digital marketing with advanced strategies",
        priceNGN: 300000,
        duration: "1 month",
        features: [
          "All Standard features",
          "Daily content posting",
          "Paid advertising management",
          "Influencer outreach",
          "Video content creation",
          "Comprehensive analytics dashboard",
          "Weekly strategy calls",
          "24/7 priority support"
        ]
      }
    ]
  },
  {
    title: "AI Promotion & Optimization",
    icon: Sparkles,
    category: "AI Marketing",
    iconColor: "text-violet-500",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    description: "Leverage AI tools to optimize and promote your business effectively",
    details: [
      "AI-powered content generation",
      "Automated marketing workflows",
      "AI chatbot implementation",
      "Predictive analytics"
    ],
    packages: [
      {
        name: "Basic",
        description: "Introduction to AI marketing tools and automation",
        priceNGN: 60000,
        duration: "One-time setup",
        features: [
          "AI tool selection and setup",
          "Basic chatbot implementation",
          "Content generation templates",
          "1 hour training session",
          "Documentation"
        ]
      },
      {
        name: "Standard",
        description: "Comprehensive AI marketing automation",
        priceNGN: 120000,
        duration: "Setup + 1 month support",
        popular: true,
        features: [
          "All Basic features",
          "Advanced chatbot with custom training",
          "AI content generation system",
          "Email automation with AI",
          "Social media AI scheduling",
          "2 training sessions",
          "1 month of optimization support"
        ]
      },
      {
        name: "Premium",
        description: "Enterprise AI marketing solution with ongoing optimization",
        priceNGN: 250000,
        duration: "Setup + 3 months support",
        features: [
          "All Standard features",
          "Custom AI model fine-tuning",
          "Predictive analytics dashboard",
          "Multi-channel AI automation",
          "A/B testing with AI insights",
          "Personalization engine",
          "Weekly optimization reports",
          "3 months of dedicated support"
        ]
      }
    ]
  },
  {
    title: "Digital Skills Tutoring",
    icon: Award,
    category: "Education",
    iconColor: "text-indigo-500",
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    description: "One-on-one tutoring to master in-demand digital skills",
    details: [
      "Web development fundamentals",
      "UI/UX design principles",
      "Digital marketing basics",
      "AI tools and prompt engineering"
    ],
    packages: [
      {
        name: "Basic",
        description: "Introduction to digital skills (4 sessions)",
        priceNGN: 40000,
        duration: "4 sessions (1 hour each)",
        features: [
          "4 one-hour sessions",
          "Choose 1 skill area",
          "Learning materials included",
          "Practice assignments",
          "Email support between sessions"
        ]
      },
      {
        name: "Standard",
        description: "Comprehensive skill development (8 sessions)",
        priceNGN: 70000,
        duration: "8 sessions (1.5 hours each)",
        popular: true,
        features: [
          "8 sessions (1.5 hours each)",
          "Choose up to 2 skill areas",
          "Comprehensive learning materials",
          "Hands-on projects",
          "Code/design reviews",
          "Certificate of completion",
          "Priority email support"
        ]
      },
      {
        name: "Premium",
        description: "Intensive mentorship program (12 sessions)",
        priceNGN: 120000,
        duration: "12 sessions (2 hours each)",
        features: [
          "12 sessions (2 hours each)",
          "All skill areas covered",
          "Personalized learning path",
          "Real-world project development",
          "Portfolio building assistance",
          "Job interview preparation",
          "Lifetime access to materials",
          "Certificate of completion",
          "3 months post-training support"
        ]
      }
    ]
  },
]

interface SectionContent {
  "services-title": string;
  "services-subtitle": string;
  [key: string]: string;
}

export const Services = () => {
  const { isAdmin, isEditMode } = useAdmin()
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Function to format price in NGN and USD
  const formatPrice = (priceNGN: number) => {
    const priceUSD = priceNGN / exchangeRate;
    return {
      ngn: new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(priceNGN),
      usd: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceUSD)
    };
  };

  // Function to handle tab change for a specific service
  const handleTabChange = (service: string, value: string) => {
    setSelectedTabs(prev => ({
      ...prev,
      [service]: value
    }));
  };

  // Function to open the packages dialog
  const openPackagesDialog = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  // Function to navigate to contact section
  const navigateToContact = (packageName: string) => {
    setIsDialogOpen(false);
    // Set the subject in sessionStorage to be used by the contact form
    sessionStorage.setItem('contactSubject', `Inquiry about ${selectedService?.title} - ${packageName} Package`);
    
    // Use the app's navigation function to switch to the contact page
    // This will update the URL and trigger the page change
    window.location.hash = "contact";
    
    // Give a moment for the page to update before scrolling
    setTimeout(() => {
      // Ensure the contact section is visible
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen py-16 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-600/10 px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Rocket className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary">Professional Services</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600">
            Services I Offer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to your needs, combining <span className="font-bold text-primary">technical expertise</span> with <span className="font-bold text-purple-600">creative vision</span>
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
          >
            {[
              { icon: Package, label: "Services", value: "9+" },
              { icon: Star, label: "Satisfaction", value: "100%" },
              { icon: TrendingUp, label: "Success Rate", value: "98%" },
              { icon: Award, label: "Projects", value: "30+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              <Card className="h-full overflow-hidden border-2 border-transparent hover:border-primary/50 transition-all duration-500 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm">
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  animate={hoveredCard === index ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Top accent bar */}
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />

                <CardContent className="p-8 relative">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-xl relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <service.icon className="w-8 h-8 text-white relative z-10" />
                  </motion.div>

                  {/* Category Badge */}
                  <Badge className={`mb-4 bg-gradient-to-r ${service.gradient} text-white border-none`}>
                    {service.category}
                  </Badge>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-3 mb-6">
                    {service.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + detailIndex * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Button */}
                  <Button
                    onClick={() => openPackagesDialog(service)}
                    className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group/btn`}
                  >
                    <span>View Packages</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      
      {/* Service Packages Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center">
                  <div className={`p-2 rounded-full ${selectedService.iconColor.replace('text-', 'bg-')}/10 mr-3`}>
                    <selectedService.icon className={`h-6 w-6 ${selectedService.iconColor}`} />
                  </div>
                  {selectedService.title} Packages
                </DialogTitle>
                <DialogDescription>
                  Choose the package that best fits your needs
                </DialogDescription>
              </DialogHeader>
              
              {/* View toggle for mobile */}
              <div className="md:hidden mb-4">
                <Tabs defaultValue="cards" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cards">Card View</TabsTrigger>
                    <TabsTrigger value="table">Table View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="cards" className="mt-4">
                    <div className="grid grid-cols-1 gap-4">
                      {selectedService.packages.map((pkg, index) => {
                        const price = formatPrice(pkg.priceNGN);
                        return (
                          <Card key={index} className={`overflow-hidden border-2 ${index === 1 ? 'border-primary' : 'border-border'} h-full`}>
                            <div className={`h-2 w-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-primary' : 'bg-purple-600'}`}></div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                              {index === 1 && (
                                <Badge className="bg-primary text-white mb-2">Recommended</Badge>
                              )}
                              <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                              
                              <div className="mb-4">
                                <div className="text-2xl font-bold">{price.ngn}</div>
                                <div className="text-sm text-muted-foreground">({price.usd})</div>
                                <div className="text-xs text-muted-foreground mt-1">{pkg.duration}</div>
                              </div>
                              
                              <div className="border-t border-border pt-4 mt-4">
                                <h4 className="font-medium mb-2">Features:</h4>
                                <ul className="space-y-2">
                                  {pkg.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start text-sm">
                                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                              <Button 
                                className={`w-full ${index === 1 ? 'bg-primary hover:bg-primary/90' : 'bg-muted hover:bg-muted/90'}`}
                                onClick={() => navigateToContact(pkg.name)}
                              >
                                Contact for {pkg.name}
                              </Button>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="table" className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="text-left p-3 border-b">Feature</th>
                            {selectedService.packages.map((pkg, index) => (
                              <th key={pkg.name} className="text-center p-3 border-b">
                                {pkg.name}
                                {index === 1 && (
                                  <div className="mt-1">
                                    <Badge className="bg-primary text-white text-xs">Recommended</Badge>
                                  </div>
                                )}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-3 border-b">Price</td>
                            {selectedService.packages.map((pkg) => {
                              const price = formatPrice(pkg.priceNGN);
                              return (
                                <td key={pkg.name} className="text-center p-3 border-b">
                                  <div>{price.ngn}</div>
                                  <div className="text-xs text-muted-foreground">({price.usd})</div>
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <td className="p-3 border-b">Duration</td>
                            {selectedService.packages.map((pkg) => (
                              <td key={pkg.name} className="text-center p-3 border-b">
                                {pkg.duration}
                              </td>
                            ))}
                          </tr>
                          {/* Create a combined list of all features across all packages */}
                          {Array.from(new Set(selectedService.packages.flatMap(pkg => pkg.features))).map((feature, index) => (
                            <tr key={index}>
                              <td className="p-3 border-b">{feature}</td>
                              {selectedService.packages.map((pkg) => (
                                <td key={pkg.name} className="text-center p-3 border-b">
                                  {pkg.features.includes(feature) ? (
                                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                                  ) : (
                                    <span className="text-muted-foreground">-</span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {selectedService.packages.map((pkg, index) => (
                        <Button 
                          key={index}
                          className={`w-full ${index === 1 ? 'bg-primary hover:bg-primary/90' : 'bg-muted hover:bg-muted/90'}`}
                          onClick={() => navigateToContact(pkg.name)}
                        >
                          {pkg.name}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Desktop view - always show cards */}
              <div className="hidden md:grid md:grid-cols-3 gap-4 mt-4">
                {selectedService.packages.map((pkg, index) => {
                  const price = formatPrice(pkg.priceNGN);
                  return (
                    <Card key={index} className={`overflow-hidden border-2 ${index === 1 ? 'border-primary' : 'border-border'} h-full`}>
                      <div className={`h-2 w-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-primary' : 'bg-purple-600'}`}></div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                        {index === 1 && (
                          <Badge className="bg-primary text-white mb-2">Recommended</Badge>
                        )}
                        <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                        
                        <div className="mb-4">
                          <div className="text-2xl font-bold">{price.ngn}</div>
                          <div className="text-sm text-muted-foreground">({price.usd})</div>
                          <div className="text-xs text-muted-foreground mt-1">{pkg.duration}</div>
                        </div>
                        
                        <div className="border-t border-border pt-4 mt-4">
                          <h4 className="font-medium mb-2">Features:</h4>
                          <ul className="space-y-2">
                            {pkg.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start text-sm">
                                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button
                          className={`w-full ${
                            index === 1
                              ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                              : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                          }`}
                          onClick={() => navigateToContact(pkg.name)}
                        >
                          Contact for {pkg.name}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
              
              {/* Comparison Table - Visible only on larger screens */}
              <div className="mt-8 hidden md:block">
                <h3 className="text-lg font-semibold mb-4">Package Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left p-3 border-b">Feature</th>
                        {selectedService.packages.map((pkg, index) => (
                          <th key={pkg.name} className="text-center p-3 border-b">
                            {pkg.name}
                            {index === 1 && (
                              <div className="mt-1">
                                <Badge className="bg-primary text-white text-xs">Recommended</Badge>
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-b">Price</td>
                        {selectedService.packages.map((pkg) => {
                          const price = formatPrice(pkg.priceNGN);
                          return (
                            <td key={pkg.name} className="text-center p-3 border-b">
                              <div>{price.ngn}</div>
                              <div className="text-xs text-muted-foreground">({price.usd})</div>
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-3 border-b">Duration</td>
                        {selectedService.packages.map((pkg) => (
                          <td key={pkg.name} className="text-center p-3 border-b">
                            {pkg.duration}
                          </td>
                        ))}
                      </tr>
                      {/* Create a combined list of all features across all packages */}
                      {Array.from(new Set(selectedService.packages.flatMap(pkg => pkg.features))).map((feature, index) => (
                        <tr key={index}>
                          <td className="p-3 border-b">{feature}</td>
                          {selectedService.packages.map((pkg) => (
                            <td key={pkg.name} className="text-center p-3 border-b">
                              {pkg.features.includes(feature) ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  All prices are shown in Nigerian Naira (₦) with US Dollar ($) equivalent
                </p>
                <p className="flex items-center mt-2">
                  <Clock className="h-4 w-4 mr-2" />
                  Duration indicates the typical timeframe for service delivery or subscription period
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
        {/* Custom Solutions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-purple-600/10 to-pink-600/10 border-2 border-primary/20 p-8 md:p-12"
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl" />
          </motion.div>

          <div className="relative z-10 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-purple-600 mb-6"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600">
              Need Something Custom?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don't see what you're looking for? I offer <span className="font-bold text-primary">fully customized solutions</span> tailored to your unique requirements. Let's discuss your project and create something amazing together!
            </p>
            <Button
              onClick={() => {
                window.location.hash = "contact"
                setTimeout(() => {
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }, 300)
              }}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-bold px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              size="lg"
            >
              <span>Get Custom Quote</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-sm text-muted-foreground mt-6">
              <strong>Note:</strong> All prices are in Nigerian Naira (₦) with USD equivalent. Exchange rate: ₦{exchangeRate} = $1
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

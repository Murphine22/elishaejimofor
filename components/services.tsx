"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Code, Palette, FileText, Terminal, Zap, Users, Clock, DollarSign, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { EditableContent, EditableContentProps } from "@/components/editable-content"
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
}

const services: Service[] = [
  {
    title: "Web Development",
    icon: Code,
    category: "Development",
    iconColor: "text-blue-500",
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
    title: "Prompt Engineering",
    icon: Terminal,
    category: "AI",
    iconColor: "text-amber-500",
    description: "Expert AI prompt design for optimal results with language models",
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
]

interface SectionContent {
  "services-title": string;
  "services-subtitle": string;
  [key: string]: string;
}

export const Services = () => {
  const { isAdmin, isEditMode } = useAdmin()
  const [expandedService, setExpandedService] = useState<string | null>(null)
  // Create a map to store the selected tab for each service
  const [selectedTabs, setSelectedTabs] = useState<Record<string, string>>({})
  // State for the selected service packages dialog
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-background p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">
        <EditableContent id="services-title" type="text" defaultValue="Services I Offer">
          Services I Offer
        </EditableContent>
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        <EditableContent id="services-subtitle" type="text" multiline defaultValue="I provide comprehensive solutions tailored to your specific needs, combining technical expertise with creative vision to deliver exceptional results.">
          I provide comprehensive solutions tailored to your specific needs, combining technical expertise with creative vision to deliver exceptional results.
        </EditableContent>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden border-none shadow-lg">
              <div className={`absolute inset-0 bg-gradient-to-br ${service.iconColor.replace('text-', 'from-')}/10 to-purple-600/10 -z-10`}></div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-full ${service.iconColor.replace('text-', 'bg-')}/10 mr-3`}>
                    <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold">
                    <EditableContent id={`service-title-${index}`} type="text" defaultValue={service.title}>
                      {service.title}
                    </EditableContent>
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  <EditableContent id={`service-description-${index}`} type="text" multiline defaultValue={service.description}>
                    {service.description}
                  </EditableContent>
                </p>
                <ul className="space-y-2 mb-4">
                  {service.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <EditableContent id={`service-detail-${index}-${detailIndex}`} type="text" defaultValue={detail}>
                        {detail}
                      </EditableContent>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-2 bg-gradient-to-r hover:text-white hover:from-primary hover:to-purple-600 transition-all duration-300"
                  onClick={() => openPackagesDialog(service)}
                >
                  View Packages
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
      
      <div className="mt-10 p-6 bg-primary/5 rounded-lg border border-primary/20">
        <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Custom Solutions</h3>
        <p className="text-muted-foreground mb-4">
          Need something that doesn't fit into these packages? I offer custom solutions tailored to your specific requirements. Contact me to discuss your project, and I'll provide a personalized quote.
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> All prices are subject to change based on project complexity and specific requirements. The USD equivalent is approximate and based on an exchange rate of ₦{exchangeRate} to $1.
        </p>
      </div>
    </motion.div>
  )
}

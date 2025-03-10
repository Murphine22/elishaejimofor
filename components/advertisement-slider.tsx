"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Sample advertisement data
const advertisements = [
  {
    id: 1,
    title: "Premium Web Development Services",
    description: "Get your business online with our professional web development services",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    link: "#Contact",
  },
  {
    id: 2,
    title: "UI/UX Design Workshop",
    description: "Join our exclusive workshop and learn the secrets of effective UI/UX design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    link: "#Contact",
  },
  {
    id: 3,
    title: "Digital Marketing Solutions",
    description: "Boost your online presence with our comprehensive digital marketing packages",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    link: "#Contact",
  },
  {
    id: 4,
    title: "E-commerce Platform Development",
    description: "Launch your online store with our secure and scalable e-commerce solutions",
    image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "#Contact",
  },
  {
    id: 5,
    title: "SEO Optimization Services",
    description: "Improve your search engine rankings and drive more organic traffic",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    link: "#",
  },
  {
    id: 6,
    title: "Content Creation Services",
    description: "Engage your audience with compelling and SEO-friendly content",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "#",
  },
  {
    id: 7,
    title: "AI Implementation Services",
    description: "Integrate artificial intelligence into your business processes",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "#",
  },
  {
    id: 8,
    title: "IT Training Programs",
    description: "Upskill your team with our comprehensive IT training programs",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "#",
  },
  {
    id: 9,
    title: "Tech Consulting Services",
    description: "Get expert advice on technology strategy and implementation",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "#",
  },
]

export const AdvertisementSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + advertisements.length) % advertisements.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg shadow-lg relative h-[300px]">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="relative h-40 md:h-full">
                    <Image
                      src={advertisements[currentIndex].image || "/placeholder.svg"}
                      alt={advertisements[currentIndex].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2">{advertisements[currentIndex].title}</h3>
                    <p className="text-muted-foreground mb-4">{advertisements[currentIndex].description}</p>
                    <Button asChild className="self-start">
                      <a href={advertisements[currentIndex].link}>Learn More</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm z-10"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm z-10"
        onClick={handleNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {advertisements.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}


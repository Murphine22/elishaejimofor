"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  Search, 
  TrendingUp,
  Clock,
  Eye,
  ExternalLink,
  Loader2,
  Sparkles,
  Filter,
  X,
  Send,
  ThumbsUp,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import Image from "next/image"
import { additionalBlogPosts } from "@/data/additional-blog-posts"

// News API Response Types
interface NewsArticle {
  article_id: string
  title: string
  link: string
  keywords: string[] | null
  creator: string[] | null
  video_url: string | null
  description: string
  content: string
  pubDate: string
  image_url: string | null
  source_id: string
  source_priority: number
  source_url: string
  source_icon: string | null
  language: string
  country: string[]
  category: string[]
  ai_tag: string
  sentiment: string
  sentiment_stats: string
  ai_region: string
  ai_org: string
  duplicate: boolean
}

interface NewsResponse {
  status: string
  totalResults: number
  results: NewsArticle[]
  nextPage: string
}

// Local state types
interface ArticleState {
  likes: number
  comments: Comment[]
  isLiked: boolean
  isBookmarked: boolean
  views: number
}

interface Comment {
  id: string
  user: string
  content: string
  timestamp: string
  likes: number
}

export const BlogRedesigned = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [articleStates, setArticleStates] = useState<Record<string, ArticleState>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [commentText, setCommentText] = useState("")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(10) // Show all 10 articles at once
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Fetch news from API
  useEffect(() => {
    fetchNews()
  }, [])

  // Reset display count when search or category changes
  useEffect(() => {
    setDisplayCount(10)
  }, [searchTerm, selectedCategory])

  // Generate random comments for an article
  const generateRandomComments = (count: number): Comment[] => {
    const sampleUsers = [
      "Tech Enthusiast", "Innovation Seeker", "Science Lover", "Future Thinker",
      "Digital Nomad", "AI Researcher", "Code Master", "Data Scientist",
      "Product Designer", "Startup Founder", "Tech Blogger", "Developer",
      "Engineering Lead", "UX Designer", "Growth Hacker", "Tech Investor"
    ]
    
    const sampleComments = [
      "This is absolutely fascinating! Can't wait to see how this develops.",
      "Great article! Very insightful and well-researched.",
      "This could be a game-changer for the industry.",
      "Interesting perspective on the future of technology.",
      "Thanks for sharing this! Very informative.",
      "This is exactly what we need in today's world.",
      "Amazing innovation! The future is here.",
      "I've been following this trend closely. Exciting times ahead!",
      "This technology has so much potential.",
      "Well written and thoroughly explained.",
      "The implications of this are huge!",
      "This is the kind of innovation we need more of.",
      "Brilliant work by the team behind this.",
      "Can't believe how fast technology is advancing.",
      "This will definitely disrupt the market.",
      "Love seeing progress like this!",
      "The future of tech looks bright with innovations like this.",
      "This could solve so many problems we're facing today.",
      "Impressive! Looking forward to seeing this in action.",
      "This is why I love following tech news!"
    ]
    
    const comments: Comment[] = []
    for (let i = 0; i < count; i++) {
      const randomUser = sampleUsers[Math.floor(Math.random() * sampleUsers.length)]
      const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)]
      const randomDaysAgo = Math.floor(Math.random() * 30) + 1
      const timestamp = new Date(Date.now() - randomDaysAgo * 24 * 60 * 60 * 1000).toISOString()
      
      comments.push({
        id: `comment-${Date.now()}-${i}`,
        user: randomUser,
        content: randomComment,
        timestamp: timestamp,
        likes: Math.floor(Math.random() * 50),
      })
    }
    
    return comments
  }

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log("Starting news fetch...")
      
      let fetchedArticles: NewsArticle[] = []
      let nextPage: string | null = null
      let fetchCount = 0
      const maxFetches = 3 // Fetch up to 3 pages to ensure we get 10+ articles
      const targetArticles = 10 // Target number of unique articles
      
      // Fetch multiple pages to get at least 10 unique articles
      while (fetchCount < maxFetches && fetchedArticles.length < 30) {
        const url: string = nextPage 
          ? `https://newsdata.io/api/1/latest?apikey=pub_4d2953330db646e080671676a5fc1821&q=news&page=${nextPage}`
          : "https://newsdata.io/api/1/latest?apikey=pub_4d2953330db646e080671676a5fc1821&q=news"
        
        console.log(`Fetching page ${fetchCount + 1}...`)
        
        const response: Response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
        
        console.log(`Response status for page ${fetchCount + 1}:`, response.status)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error("API Error:", errorText)
          // If first page fails, throw error. Otherwise, use what we have
          if (fetchCount === 0) {
            throw new Error(`API returned ${response.status}: ${response.statusText}`)
          }
          break
        }

        const data: NewsResponse = await response.json()
        console.log(`Page ${fetchCount + 1} data received:`, data)
        
        if (data.status === "success" && data.results && data.results.length > 0) {
          fetchedArticles = [...fetchedArticles, ...data.results]
          console.log(`Total articles so far: ${fetchedArticles.length}`)
          
          fetchCount++
          
          // Check if there's a next page and we should continue
          if (data.nextPage && fetchCount < maxFetches && fetchedArticles.length < 30) {
            nextPage = data.nextPage
            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000))
          } else {
            console.log("Stopping fetch - reached limit or no more pages")
            break
          }
        } else {
          console.log("No results in response, stopping fetch")
          break
        }
      }
      
      // Remove duplicates based on multiple criteria
      const seenIds = new Set<string>()
      const seenTitles = new Set<string>()
      const uniqueArticles: NewsArticle[] = []
      
      fetchedArticles.forEach(article => {
        // Normalize title for comparison (lowercase, trim spaces)
        const normalizedTitle = article.title.toLowerCase().trim()
        
        // Only add if we haven't seen this article_id or title before
        if (!seenIds.has(article.article_id) && !seenTitles.has(normalizedTitle)) {
          seenIds.add(article.article_id)
          seenTitles.add(normalizedTitle)
          uniqueArticles.push(article)
        }
      })
      
      console.log(`Total fetched: ${fetchedArticles.length}, After deduplication: ${uniqueArticles.length}`)
      
      if (uniqueArticles.length === 0) {
        throw new Error("No articles found in the API response")
      }
      
      // Shuffle articles to add variety and limit to 10
      const shuffledArticles = uniqueArticles
        .sort(() => Math.random() - 0.5)
        .slice(0, 10) // Take only first 10 articles
      
      // Combine with additional static blog posts
      const allArticles = [...shuffledArticles, ...additionalBlogPosts]
      
      console.log(`Final articles to display: ${allArticles.length} (${shuffledArticles.length} from API + ${additionalBlogPosts.length} static)`)
      
      setArticles(allArticles)
      
      // Initialize article states with random comments
      const initialStates: Record<string, ArticleState> = {}
      allArticles.forEach((article: NewsArticle) => {
        const randomCommentCount = Math.floor(Math.random() * 15)
        initialStates[article.article_id] = {
          likes: Math.floor(Math.random() * 500) + 50,
          comments: generateRandomComments(randomCommentCount),
          isLiked: false,
          isBookmarked: false,
          views: Math.floor(Math.random() * 5000) + 100,
        }
      })
      setArticleStates(initialStates)
      
    } catch (err) {
      console.error("Fetch error details:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      
      // Use static posts as fallback when API fails
      console.log("API failed, loading static blog posts as fallback...")
      setArticles(additionalBlogPosts)
      
      // Initialize article states for static posts
      const initialStates: Record<string, ArticleState> = {}
      additionalBlogPosts.forEach((article: NewsArticle) => {
        const randomCommentCount = Math.floor(Math.random() * 15)
        initialStates[article.article_id] = {
          likes: Math.floor(Math.random() * 500) + 50,
          comments: generateRandomComments(randomCommentCount),
          isLiked: false,
          isBookmarked: false,
          views: Math.floor(Math.random() * 5000) + 100,
        }
      })
      setArticleStates(initialStates)
      
      // Clear error since we have fallback content
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  // Fallback sample data (in case API is down)
  const loadSampleData = () => {
    const sampleArticles: NewsArticle[] = [
      {
        article_id: "sample-1",
        title: "Latest Advances in AI Technology Transform Industries",
        link: "https://example.com/ai-advances",
        keywords: ["AI", "technology", "innovation"],
        creator: ["Tech News"],
        video_url: null,
        description: "Artificial Intelligence continues to revolutionize various sectors with groundbreaking applications and improvements.",
        content: "Full article content here...",
        pubDate: new Date().toISOString(),
        image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        source_id: "Sample News",
        source_priority: 1,
        source_url: "https://example.com",
        source_icon: null,
        language: "en",
        country: ["us"],
        category: ["technology"],
        ai_tag: "technology",
        sentiment: "positive",
        sentiment_stats: "{}",
        ai_region: "global",
        ai_org: "",
        duplicate: false,
      },
    ]
    
    setArticles(sampleArticles)
    const initialStates: Record<string, ArticleState> = {}
    sampleArticles.forEach((article) => {
      initialStates[article.article_id] = {
        likes: 150,
        comments: generateRandomComments(5),
        isLiked: false,
        isBookmarked: false,
        views: 1200,
      }
    })
    setArticleStates(initialStates)
  }

  // Handle like
  const handleLike = (articleId: string) => {
    setArticleStates((prev) => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        isLiked: !prev[articleId].isLiked,
        likes: prev[articleId].isLiked 
          ? prev[articleId].likes - 1 
          : prev[articleId].likes + 1,
      },
    }))
  }

  // Handle bookmark
  const handleBookmark = (articleId: string) => {
    setArticleStates((prev) => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        isBookmarked: !prev[articleId].isBookmarked,
      },
    }))
  }

  // Handle comment
  const handleAddComment = (articleId: string) => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      user: "You",
      content: commentText,
      timestamp: new Date().toISOString(),
      likes: 0,
    }

    setArticleStates((prev) => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        comments: [...prev[articleId].comments, newComment],
      },
    }))

    setCommentText("")
  }

  // Handle share
  const handleShare = async (article: NewsArticle) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.link,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(article.link)
      setShareDialogOpen(true)
      setTimeout(() => setShareDialogOpen(false), 2000)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(articles.flatMap((a) => a.category || [])))]

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = 
      selectedCategory === "all" || 
      article.category?.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  // Paginated articles - show only displayCount articles
  const displayedArticles = filteredArticles.slice(0, displayCount)
  const hasMore = displayCount < filteredArticles.length

  // Load more articles (not needed since we only have 10, but keeping for future)
  const loadMore = () => {
    setDisplayCount(prev => prev + 10)
  }

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
              i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-purple-500' : 'bg-pink-500'
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Latest Tech News</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600 animate-gradient">
              Innovations & Technology
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest breakthroughs in science, technology, and innovation from around the world
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
            />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">{articles.length} Articles</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchNews}
              disabled={loading}
              className="gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
            </Button>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap capitalize ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary to-purple-600"
                  : ""
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading latest news...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 space-y-4 max-w-md mx-auto"
          >
            <AlertCircle className="w-16 h-16 text-red-500" />
            <h3 className="text-xl font-bold text-red-500">Failed to Load News</h3>
            <p className="text-muted-foreground text-center">{error}</p>
            <div className="flex gap-3">
              <Button onClick={fetchNews} variant="outline" className="gap-2">
                <span>Try Again</span>
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
                variant="default"
                className="bg-gradient-to-r from-primary to-purple-600"
              >
                Reload Page
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Check your internet connection or try again in a few moments
            </p>
          </motion.div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedArticles.map((article, index) => {
              const state = articleStates[article.article_id] || {
                likes: 0,
                comments: [],
                isLiked: false,
                isBookmarked: false,
                views: 0,
              }

              return (
                <motion.div
                  key={article.article_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredCard(article.article_id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="overflow-hidden h-full flex flex-col border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 bg-background/50 backdrop-blur-sm">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-purple-600/20">
                      <Image
                        src={article.image_url || `https://images.unsplash.com/photo-${[
                          '1451187580459-43490279c0fa', // Tech background
                          '1488590528505-98d2b5aba04b', // Technology
                          '1518770660439-4636190af475', // Code
                          '1526374965328-7f61d4dc18c5', // Data
                          '1550751827-4bd374c3f58b', // Science
                          '1485827404703-89b55fcc595e', // Innovation
                          '1519389950473-47ba0277781c', // Digital
                          '1504384308090-c894fdcc538d', // Computer
                          '1531297484001-80022131f5a1', // Laptop
                          '1563986768494-4dee2763ff3f' // Network
                        ][index % 10]}?w=800`}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback to different placeholder images based on index
                          const target = e.target as HTMLImageElement
                          const fallbackImages = [
                            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
                            'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800',
                            'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
                            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
                            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
                            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
                            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
                            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
                            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800',
                            'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800'
                          ]
                          target.src = fallbackImages[index % 10]
                        }}
                        unoptimized
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      {article.category && article.category[0] && (
                        <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
                          {article.category[0]}
                        </Badge>
                      )}
                      
                      {/* Bookmark Icon */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleBookmark(article.article_id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${state.isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-white'}`}
                        />
                      </motion.button>

                      {/* Views Counter */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                        <Eye className="w-3 h-3" />
                        <span>{state.views}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="flex-grow p-4 space-y-3">
                      {/* Source and Date */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">{article.source_id}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(article.pubDate)}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.description || "No description available"}
                      </p>

                      {/* Keywords */}
                      {article.keywords && article.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {article.keywords.slice(0, 3).map((keyword, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                            >
                              #{keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>

                    {/* Footer Section */}
                    <CardFooter className="border-t p-4 bg-muted/30">
                      <div className="flex items-center justify-between w-full">
                        {/* Engagement Buttons */}
                        <div className="flex items-center gap-3">
                          {/* Like */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleLike(article.article_id)}
                            className="flex items-center gap-1 text-sm"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                state.isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                              }`}
                            />
                            <span className={state.isLiked ? 'text-red-500' : 'text-muted-foreground'}>
                              {state.likes}
                            </span>
                          </motion.button>

                          {/* Comment */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedArticle(article)}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                              >
                                <MessageSquare className="w-4 h-4" />
                                <span>{state.comments.length}</span>
                              </motion.button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-xl">{article.title}</DialogTitle>
                                <DialogDescription className="text-sm">
                                  {article.description}
                                </DialogDescription>
                              </DialogHeader>
                              
                              {/* Comments Section */}
                              <div className="space-y-4 mt-4">
                                <h4 className="font-semibold">Comments ({state.comments.length})</h4>
                                
                                {/* Comment Input */}
                                <div className="flex gap-2">
                                  <Textarea
                                    placeholder="Add a comment..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="flex-1"
                                    rows={2}
                                  />
                                  <Button
                                    onClick={() => handleAddComment(article.article_id)}
                                    size="icon"
                                    className="self-end"
                                  >
                                    <Send className="w-4 h-4" />
                                  </Button>
                                </div>

                                {/* Comments List */}
                                <div className="space-y-3">
                                  {state.comments.map((comment) => (
                                    <div
                                      key={comment.id}
                                      className="p-3 rounded-lg bg-muted/50 space-y-2"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium text-sm">{comment.user}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {formatDate(comment.timestamp)}
                                        </span>
                                      </div>
                                      <p className="text-sm">{comment.content}</p>
                                    </div>
                                  ))}
                                  
                                  {state.comments.length === 0 && (
                                    <p className="text-center text-muted-foreground text-sm py-4">
                                      No comments yet. Be the first to comment!
                                    </p>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* Share */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleShare(article)}
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Share2 className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Read More */}
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="gap-1 text-primary hover:text-primary/80"
                        >
                          <a href={article.link} target="_blank" rel="noopener noreferrer">
                            <span>Read</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Load More Button */}
        {!loading && !error && hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={loadMore}
              size="lg"
              className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:opacity-90 px-8 py-6 text-lg font-semibold group"
            >
              <span>Load More Articles</span>
              <motion.span
                className="ml-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </Button>
          </motion.div>
        )}

        {/* Showing X of Y */}
        {!loading && !error && filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-muted-foreground"
          >
            <p>
              Showing <span className="font-bold text-primary">{displayedArticles.length}</span> of{" "}
              <span className="font-bold text-primary">{filteredArticles.length}</span> articles
            </p>
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 space-y-4"
          >
            <Search className="w-16 h-16 mx-auto text-muted-foreground" />
            <h3 className="text-2xl font-bold">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>

      {/* Share Success Toast */}
      <AnimatePresence>
        {shareDialogOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-500 text-white shadow-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span>Link copied to clipboard!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

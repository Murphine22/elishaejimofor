/**
 * Performance monitoring utilities for optimal website performance
 */

// Web Vitals tracking
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    // Log to console in development
    console.log(metric)
    
    // In production, you can send to analytics service
    // Example: sendToAnalytics(metric)
  }
}

// Lazy load images with Intersection Observer
export const lazyLoadImage = (img: HTMLImageElement) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement
          const src = target.dataset.src
          if (src) {
            target.src = src
            target.classList.add('loaded')
            observer.unobserve(target)
          }
        }
      })
    },
    {
      rootMargin: '50px',
    }
  )

  observer.observe(img)
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// Preload critical resources
export const preloadResource = (href: string, as: string) => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = as
  link.href = href
  document.head.appendChild(link)
}

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get device performance tier
export const getDevicePerformanceTier = (): 'high' | 'medium' | 'low' => {
  if (typeof window === 'undefined') return 'medium'

  const memory = (navigator as any).deviceMemory
  const cores = navigator.hardwareConcurrency

  if (memory >= 8 && cores >= 8) return 'high'
  if (memory >= 4 && cores >= 4) return 'medium'
  return 'low'
}

// Adaptive loading based on network conditions
export const getNetworkSpeed = (): 'fast' | 'slow' | 'offline' => {
  if (typeof window === 'undefined') return 'fast'
  if (!navigator.onLine) return 'offline'

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  
  if (!connection) return 'fast'

  const effectiveType = connection.effectiveType

  if (effectiveType === '4g') return 'fast'
  if (effectiveType === '3g') return 'slow'
  return 'slow'
}

// Measure component render time
export const measureRenderTime = (componentName: string, callback: () => void) => {
  const start = performance.now()
  callback()
  const end = performance.now()
  console.log(`${componentName} rendered in ${(end - start).toFixed(2)}ms`)
}

// Cache management
export class CacheManager {
  private cache: Map<string, { data: any; timestamp: number }>

  constructor() {
    this.cache = new Map()
  }

  set(key: string, data: any, ttl: number = 300000) {
    // Default TTL: 5 minutes
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.timestamp) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear() {
    this.cache.clear()
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false
    if (Date.now() > item.timestamp) {
      this.cache.delete(key)
      return false
    }
    return true
  }
}

// Singleton cache instance
export const globalCache = new CacheManager()

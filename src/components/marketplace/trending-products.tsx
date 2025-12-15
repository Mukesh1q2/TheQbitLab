'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Star, Download, Eye, ArrowRight, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrendingProduct {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  downloads: number
  views: number
  category: string
  trendScore: number
  image?: string
  timeAgo: string
  tags: string[]
}

const trendingProducts: TrendingProduct[] = [
  {
    id: 'nextjs-dashboard',
    title: 'Next.js Admin Dashboard',
    description: 'Modern admin dashboard built with Next.js 14, featuring dark mode and real-time updates.',
    price: 79,
    originalPrice: 99,
    rating: 4.9,
    reviews: 234,
    downloads: 5400,
    views: 12800,
    category: 'Admin Templates',
    trendScore: 95,
    timeAgo: '2 hours ago',
    tags: ['Next.js', 'TypeScript', 'Dark Mode']
  },
  {
    id: 'ai-chat-ui',
    title: 'AI Chat Interface',
    description: 'Beautiful chat interface components for AI applications with streaming responses.',
    price: 49,
    rating: 4.8,
    reviews: 156,
    downloads: 3200,
    views: 8900,
    category: 'AI Components',
    trendScore: 88,
    timeAgo: '4 hours ago',
    tags: ['React', 'AI', 'Chat']
  },
  {
    id: 'react-native-kit',
    title: 'React Native UI Kit',
    description: 'Complete UI kit for React Native apps with 100+ components and screens.',
    price: 89,
    rating: 4.7,
    reviews: 89,
    downloads: 2100,
    views: 6700,
    category: 'Mobile UI',
    trendScore: 82,
    timeAgo: '6 hours ago',
    tags: ['React Native', 'Mobile', 'UI Kit']
  },
  {
    id: 'vue-ecommerce',
    title: 'Vue E-commerce Theme',
    description: 'Full-featured e-commerce theme for Vue.js with payment integration.',
    price: 69,
    originalPrice: 89,
    rating: 4.6,
    reviews: 145,
    downloads: 3800,
    views: 9200,
    category: 'E-commerce',
    trendScore: 78,
    timeAgo: '8 hours ago',
    tags: ['Vue.js', 'E-commerce', 'Payment']
  }
]

const timeFilters = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'All Time', value: 'all' }
]

export function TrendingProducts() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('today')
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const getTrendColor = (score: number) => {
    if (score >= 90) return 'text-red-500'
    if (score >= 80) return 'text-orange-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getTrendBg = (score: number) => {
    if (score >= 90) return 'from-red-500/20 to-orange-500/20'
    if (score >= 80) return 'from-orange-500/20 to-yellow-500/20'
    if (score >= 70) return 'from-yellow-500/20 to-green-500/20'
    return 'from-green-500/20 to-blue-500/20'
  }

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Trending Now
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the hottest products that everyone's talking about. Updated in real-time.
          </p>
        </motion.div>

        {/* Time Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {timeFilters.map((filter) => (
            <motion.button
              key={filter.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTimeFilter(filter.value)}
              className={cn(
                'px-6 py-3 rounded-xl font-medium transition-all duration-300',
                selectedTimeFilter === filter.value
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-muted/50 hover:bg-muted border border-muted-foreground/20'
              )}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Trending Products */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="group cursor-pointer"
              >
                <div className={cn(
                  'relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 overflow-hidden',
                  'bg-gradient-to-r from-white/10 to-white/5 border-white/20',
                  'hover:border-orange-500/50 hover:shadow-xl'
                )}>
                  {/* Background Trend Gradient */}
                  <div className={cn(
                    'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    `bg-gradient-to-r ${getTrendBg(product.trendScore)}`
                  )} />

                  <div className="relative z-10 flex flex-col lg:flex-row gap-6">
                    {/* Product Rank and Trend */}
                    <div className="flex items-center gap-4 lg:w-32 lg:flex-col lg:items-start lg:justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-500">#{index + 1}</div>
                        <div className="text-xs text-muted-foreground">Rank</div>
                      </div>
                      <div className={cn(
                        'flex items-center gap-1 text-sm font-medium',
                        getTrendColor(product.trendScore)
                      )}>
                        <TrendingUp className="w-4 h-4" />
                        <span>{product.trendScore}%</span>
                      </div>
                    </div>

                    {/* Product Image/Icon */}
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="text-3xl lg:text-4xl opacity-60">🔥</div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1 group-hover:text-orange-500 transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {product.category}
                          </p>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              ${product.price}
                            </div>
                            {product.originalPrice && (
                              <div className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats and Time */}
                      <div className="flex flex-wrap items-center gap-6 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{product.rating}</span>
                          <span>({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{product.downloads.toLocaleString()} downloads</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{product.views.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{product.timeAgo}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:shadow-lg transition-all duration-300"
                        >
                          View Product
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-muted-foreground/20 hover:border-orange-500/50 transition-all duration-300"
                        >
                          <span>Preview</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <AnimatePresence>
                    {hoveredProduct === product.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Trending */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <TrendingUp className="w-5 h-5" />
            View All Trending Products
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
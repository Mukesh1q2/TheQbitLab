'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Download, Heart, ShoppingCart, Filter, Grid, List } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  downloads: number
  category: string
  tags: string[]
  image?: string
  featured?: boolean
  bestseller?: boolean
  new?: boolean
}

const allProducts: Product[] = [
  {
    id: 'react-admin',
    title: 'React Admin Dashboard',
    description: 'Complete admin dashboard with authentication, charts, and table components.',
    price: 59,
    rating: 4.8,
    reviews: 234,
    downloads: 3200,
    category: 'Admin Templates',
    tags: ['React', 'TypeScript', 'Charts'],
    bestseller: true
  },
  {
    id: 'vue-landing',
    title: 'Vue.js Landing Page',
    description: 'Beautiful landing page template built with Vue.js and modern CSS.',
    price: 39,
    originalPrice: 59,
    rating: 4.6,
    reviews: 89,
    downloads: 1800,
    category: 'Landing Pages',
    tags: ['Vue.js', 'CSS3', 'Responsive']
  },
  {
    id: 'mobile-ui-kit',
    title: 'Mobile UI Kit',
    description: 'Comprehensive mobile UI components for iOS and Android apps.',
    price: 79,
    rating: 4.9,
    reviews: 156,
    downloads: 2100,
    category: 'Mobile UI',
    tags: ['Figma', 'Sketch', 'Mobile'],
    new: true
  },
  {
    id: 'ecommerce-theme',
    title: 'E-commerce Theme',
    description: 'Complete e-commerce theme with payment integration and product catalog.',
    price: 99,
    rating: 4.7,
    reviews: 98,
    downloads: 1200,
    category: 'E-commerce',
    tags: ['WordPress', 'WooCommerce', 'Payment']
  },
  {
    id: 'ai-components',
    title: 'AI Components Library',
    description: 'Specialized UI components for AI and machine learning applications.',
    price: 69,
    rating: 4.8,
    reviews: 67,
    downloads: 890,
    category: 'AI Components',
    tags: ['React', 'AI', 'Charts'],
    new: true
  },
  {
    id: 'portfolio-template',
    title: 'Developer Portfolio',
    description: 'Modern portfolio template designed specifically for developers.',
    price: 29,
    rating: 4.5,
    reviews: 145,
    downloads: 2500,
    category: 'Portfolio',
    tags: ['HTML', 'CSS', 'JavaScript']
  }
]

const categories = ['All', 'Admin Templates', 'Landing Pages', 'Mobile UI', 'E-commerce', 'AI Components', 'Portfolio']
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' }
]

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  // Filter products
  const filteredProducts = allProducts.filter(product =>
    selectedCategory === 'All' || product.category === selectedCategory
  )

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return (b.new ? 1 : 0) - (a.new ? 1 : 0)
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default: // popular
        return b.downloads - a.downloads
    }
  })

  const toggleWishlist = (productId: string) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId)
    } else {
      newWishlist.add(productId)
    }
    setWishlist(newWishlist)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            All Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our complete collection of premium templates and components.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-xl font-medium transition-all duration-300',
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background hover:bg-muted border border-muted-foreground/20'
                  )}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-muted-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 p-1 rounded-xl border border-muted-foreground/20 bg-background">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-lg transition-all duration-300',
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted/50'
                  )}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-lg transition-all duration-300',
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted/50'
                  )}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className={cn(
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4 max-w-4xl mx-auto'
        )}>
          <AnimatePresence mode="wait">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className={cn(
                  'group cursor-pointer',
                  viewMode === 'list' ? 'flex gap-4' : ''
                )}
              >
                <div className={cn(
                  'relative rounded-2xl overflow-hidden bg-background border border-muted-foreground/20 hover:border-primary/50 hover:shadow-lg transition-all duration-300',
                  viewMode === 'list' ? 'flex-1 flex gap-4' : ''
                )}>
                  {/* Product Image */}
                  <div className={cn(
                    'bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative',
                    viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'aspect-video'
                  )}>
                    <div className="text-4xl opacity-30">📦</div>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      {product.bestseller && (
                        <span className="px-1.5 py-0.5 text-xs bg-orange-500 text-white rounded">
                          BS
                        </span>
                      )}
                      {product.new && (
                        <span className="px-1.5 py-0.5 text-xs bg-green-500 text-white rounded">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white transition-colors"
                    >
                      <Heart className={cn(
                        'w-3 h-3',
                        wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      )} />
                    </motion.button>
                  </div>

                  {/* Product Info */}
                  <div className={cn('p-4', viewMode === 'list' ? 'flex-1' : '')}>
                    <div className="mb-2">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 text-xs rounded bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <span>{(product.downloads / 1000).toFixed(1)}k</span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-primary">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <ShoppingCart className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Load More Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
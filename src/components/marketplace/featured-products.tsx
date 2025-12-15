'use client'

import { motion } from 'framer-motion'
import { Star, Download, Eye, Heart, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeaturedProduct {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  downloads: number
  category: string
  image: string
  tags: string[]
  featured: boolean
  bestseller?: boolean
  new?: boolean
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: 'ai-landing-template',
    title: 'AI Startup Landing Page Template',
    description: 'Modern, responsive landing page template specifically designed for AI startups and tech companies.',
    price: 49,
    originalPrice: 79,
    rating: 4.9,
    reviews: 127,
    downloads: 1250,
    category: 'Web Templates',
    image: '/images/ai-landing.jpg',
    tags: ['React', 'Next.js', 'Tailwind', 'Responsive'],
    featured: true,
    bestseller: true
  },
  {
    id: 'dashboard-kit',
    title: 'Complete Admin Dashboard Kit',
    description: 'Comprehensive admin dashboard with 50+ components, charts, and pre-built pages.',
    price: 89,
    rating: 4.8,
    reviews: 89,
    downloads: 980,
    category: 'UI Kits',
    image: '/images/dashboard-kit.jpg',
    tags: ['React', 'TypeScript', 'Charts', 'Dark Mode'],
    featured: true,
    new: true
  },
  {
    id: 'ecommerce-components',
    title: 'E-commerce Component Library',
    description: 'Complete set of e-commerce UI components including product cards, checkout, and cart.',
    price: 69,
    originalPrice: 99,
    rating: 4.7,
    reviews: 156,
    downloads: 2100,
    category: 'UI Components',
    image: '/images/ecommerce-components.jpg',
    tags: ['Vue.js', 'SCSS', 'E-commerce', 'Payment'],
    featured: true
  }
]

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hand-picked premium templates and components that our community loves most.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                {/* Product Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl opacity-20">🚀</div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.bestseller && (
                      <span className="px-2 py-1 text-xs bg-orange-500 text-white rounded-full">
                        Bestseller
                      </span>
                    )}
                    {product.new && (
                      <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-full">
                        New
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                    {product.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                        +{product.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{product.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300"
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  description: string
  productCount: number
  icon: string
  color: string
  trending?: boolean
  featured?: boolean
}

const categories: Category[] = [
  {
    id: 'web-templates',
    name: 'Web Templates',
    description: 'Complete website templates and landing pages',
    productCount: 150,
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500',
    trending: true,
    featured: true
  },
  {
    id: 'ui-kits',
    name: 'UI Kits',
    description: 'Design systems and component libraries',
    productCount: 89,
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
    featured: true
  },
  {
    id: 'mobile-apps',
    name: 'Mobile Apps',
    description: 'iOS and Android app templates',
    productCount: 67,
    icon: '📱',
    color: 'from-green-500 to-emerald-500',
    trending: true
  },
  {
    id: 'admin-dashboard',
    name: 'Admin Dashboards',
    description: 'Analytics and admin panel templates',
    productCount: 45,
    icon: '📊',
    color: 'from-orange-500 to-red-500',
    featured: true
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online store templates and components',
    productCount: 78,
    icon: '🛒',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'ai-templates',
    name: 'AI Templates',
    description: 'Templates for AI and ML applications',
    productCount: 34,
    icon: '🤖',
    color: 'from-indigo-500 to-purple-500',
    trending: true,
    featured: true
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Professional portfolio templates',
    productCount: 56,
    icon: '💼',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'icons-fonts',
    name: 'Icons & Fonts',
    description: 'Icon sets and typography resources',
    productCount: 92,
    icon: '🎯',
    color: 'from-pink-500 to-rose-500'
  }
]

export function CategoriesSection() {
  const featuredCategories = categories.filter(cat => cat.featured)
  const trendingCategories = categories.filter(cat => cat.trending)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Browse Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover templates and resources organized by category to find exactly what you need.
          </p>
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-2xl font-bold">Featured Categories</h3>
            <span className="px-3 py-1 text-sm bg-gradient-to-r from-primary to-primary/80 text-white rounded-full">
              Popular
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={cn(
                    'absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300',
                    `bg-gradient-to-br ${category.color}`
                  )} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{category.icon}</div>
                      {category.trending && (
                        <div className="flex items-center gap-1 text-xs text-orange-500">
                          <TrendingUp className="w-3 h-3" />
                          <span>Trending</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {category.productCount} products
                      </span>
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8">All Categories</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="p-4 rounded-xl bg-muted/50 hover:bg-muted border border-muted-foreground/20 hover:border-primary/50 transition-all duration-300 text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {category.productCount} items
                  </p>
                  
                  {category.trending && (
                    <div className="mt-2 inline-flex items-center gap-1 text-xs text-orange-500">
                      <TrendingUp className="w-3 h-3" />
                      <span>Hot</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trending Categories Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h3 className="text-xl font-bold">Trending Categories</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              These categories are currently hot! Check out the latest trends in web development and design.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {trendingCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 transition-all duration-300"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                  <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                    {category.productCount}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
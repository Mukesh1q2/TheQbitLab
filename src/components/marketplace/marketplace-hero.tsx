'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, Star, TrendingUp, Zap, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const marketplaceStats = [
  { label: 'Available Templates', value: '500+', icon: '📋' },
  { label: 'Active Developers', value: '2.5K+', icon: '👨‍💻' },
  { label: 'Downloads', value: '50K+', icon: '📥' },
  { label: 'Success Rate', value: '98%', icon: '⭐' }
]

const featuredCategories = [
  { name: 'AI Templates', count: 150, icon: '🤖', trending: true },
  { name: 'Web Components', count: 200, icon: '🌐', trending: true },
  { name: 'Mobile Apps', count: 75, icon: '📱', trending: false },
  { name: 'Dashboard Kits', count: 100, icon: '📊', trending: true },
  { name: 'E-commerce', count: 60, icon: '🛒', trending: false },
  { name: 'Landing Pages', count: 80, icon: '🚀', trending: false }
]

export function MarketplaceHero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-40 left-1/4 w-16 h-16 bg-primary/15 rounded-full blur-lg"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Marketplace</span>
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Premium
            </span>
            <br />
            <span className="text-foreground">
              Development Assets
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Discover, download, and deploy premium AI templates, web components, and 
            development assets to accelerate your next project.
          </motion.p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates, components, or assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-muted-foreground/20 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 text-lg"
              />
            </div>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-muted-foreground/20 bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </motion.button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-2xl border border-muted-foreground/20 bg-background/50 backdrop-blur-sm">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-3 rounded-xl transition-all duration-300',
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'hover:bg-muted/50'
                )}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-3 rounded-xl transition-all duration-300',
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'hover:bg-muted/50'
                )}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3">
            {['All Categories', 'AI/ML', 'React', 'Next.js', 'TypeScript', 'Templates', 'Components'].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl bg-muted/50 hover:bg-muted border border-muted-foreground/20 transition-all duration-300 text-sm font-medium"
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {marketplaceStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm text-center group-hover:border-primary/50 group-hover:shadow-xl transition-all duration-300">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-sm mb-2">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{category.count} items</p>
                  {category.trending && (
                    <div className="flex items-center justify-center gap-1 text-xs text-orange-500">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Secure Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Instant Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
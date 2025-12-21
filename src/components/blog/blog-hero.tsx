'use client'

import { motion } from 'framer-motion'
import { Search, Filter, BookOpen } from 'lucide-react'

export function BlogHero() {
  return (
    <section className="relative py-20 pt-32 px-6 bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Latest Articles</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            Tech Blog
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Insights, tutorials, and thoughts on web development, AI, and cutting-edge technology.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all outline-none"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </motion.button>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-2 justify-center mt-8"
        >
          {['All', 'React', 'Next.js', 'AI/ML', 'TypeScript', 'CSS', 'Performance'].map((cat, index) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${index === 0
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
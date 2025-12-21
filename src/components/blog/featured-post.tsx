'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react'

const featuredPost = {
  title: 'Building Scalable React Applications with Next.js 14',
  excerpt: 'Learn how to leverage the latest features in Next.js 14 to build high-performance, scalable web applications with server components and improved routing.',
  author: 'Mukesh Kumar',
  date: '2024-12-15',
  readTime: '8 min read',
  tags: ['Next.js', 'React', 'Performance']
}

export function FeaturedPost() {
  return (
    <section className="py-12 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
        >
          {/* Thumbnail */}
          <div className="aspect-video bg-gradient-to-br from-primary/20 via-cyan-500/10 to-primary/20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30">📄</span>
            </div>
            {/* Featured Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Featured Post</span>
            </div>
          </div>

          <div className="p-8">
            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {featuredPost.readTime}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {featuredPost.title}
            </h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {featuredPost.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {featuredPost.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  MK
                </div>
                <span className="font-medium text-foreground">{featuredPost.author}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all font-medium"
              >
                Read More
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
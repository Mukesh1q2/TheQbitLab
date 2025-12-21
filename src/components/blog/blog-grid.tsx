'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react'

const blogPosts = [
  {
    title: 'Getting Started with TypeScript in React',
    excerpt: 'A comprehensive guide to adding type safety to your React applications with practical examples.',
    author: 'Mukesh Kumar',
    date: '2024-12-15',
    readTime: '6 min read',
    views: 1250,
    tags: ['TypeScript', 'React'],
    category: 'Tutorial',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'Optimizing Web Performance in 2024',
    excerpt: 'Latest techniques and tools for building lightning-fast web applications that users love.',
    author: 'Mukesh Kumar',
    date: '2024-12-12',
    readTime: '10 min read',
    views: 2340,
    tags: ['Performance', 'Optimization'],
    category: 'Guide',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    title: 'AI Integration in Modern Web Apps',
    excerpt: 'How to seamlessly integrate AI capabilities into your web applications using modern APIs.',
    author: 'Mukesh Kumar',
    date: '2024-12-08',
    readTime: '12 min read',
    views: 3120,
    tags: ['AI/ML', 'Integration'],
    category: 'Tutorial',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'Understanding the differences and choosing the right layout method for your projects.',
    author: 'Mukesh Kumar',
    date: '2024-12-05',
    readTime: '7 min read',
    views: 890,
    tags: ['CSS', 'Layout'],
    category: 'Guide',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  {
    title: 'Building Accessible Web Components',
    excerpt: 'Best practices for creating inclusive user interfaces that work for everyone.',
    author: 'Mukesh Kumar',
    date: '2024-12-03',
    readTime: '9 min read',
    views: 1567,
    tags: ['Accessibility', 'WCAG'],
    category: 'Tutorial',
    gradient: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    title: 'State Management in 2024: Zustand vs Redux',
    excerpt: 'Comparing modern state management solutions for React applications.',
    author: 'Mukesh Kumar',
    date: '2024-12-01',
    readTime: '8 min read',
    views: 2890,
    tags: ['State Management', 'React'],
    category: 'Comparison',
    gradient: 'from-yellow-500/20 to-orange-500/20'
  }
]

export function BlogGrid() {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="h-full rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300">
                {/* Thumbnail */}
                <div className={`aspect-video bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-30">📝</span>
                  </div>
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full text-primary border border-primary/20">
                    {post.category}
                  </span>
                </div>

                <div className="p-5">
                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-primary to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        MK
                      </div>
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center text-primary text-sm font-medium"
                    >
                      Read
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Load More Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
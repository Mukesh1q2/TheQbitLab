'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    title: 'Getting Started with TypeScript in React',
    excerpt: 'A comprehensive guide to adding type safety to your React applications.',
    author: 'Sarah Johnson',
    date: '2024-01-12',
    readTime: '6 min read',
    tags: ['TypeScript', 'React'],
    category: 'Tutorial'
  },
  {
    title: 'Optimizing Web Performance in 2024',
    excerpt: 'Latest techniques and tools for building lightning-fast web applications.',
    author: 'Michael Rodriguez',
    date: '2024-01-10',
    readTime: '10 min read',
    tags: ['Performance', 'Optimization'],
    category: 'Guide'
  },
  {
    title: 'AI Integration in Modern Web Apps',
    excerpt: 'How to seamlessly integrate AI capabilities into your web applications.',
    author: 'Emily Zhang',
    date: '2024-01-08',
    readTime: '12 min read',
    tags: ['AI/ML', 'Integration'],
    category: 'Tutorial'
  },
  {
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'Understanding the differences and choosing the right layout method.',
    author: 'Lisa Thompson',
    date: '2024-01-05',
    readTime: '7 min read',
    tags: ['CSS', 'Layout'],
    category: 'Guide'
  },
  {
    title: 'Building Accessible Web Components',
    excerpt: 'Best practices for creating inclusive user interfaces.',
    author: 'David Kim',
    date: '2024-01-03',
    readTime: '9 min read',
    tags: ['Accessibility', 'WCAG'],
    category: 'Tutorial'
  },
  {
    title: 'State Management in 2024: Zustand vs Redux',
    excerpt: 'Comparing modern state management solutions for React applications.',
    author: 'Alex Chen',
    date: '2024-01-01',
    readTime: '8 min read',
    tags: ['State Management', 'React'],
    category: 'Comparison'
  }
]

export function BlogGrid() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-400"></div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{post.author}</span>
                  </div>
                  
                  <button className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium">
                    Read
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
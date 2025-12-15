'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const featuredPost = {
  title: 'Building Scalable React Applications with Next.js 14',
  excerpt: 'Learn how to leverage the latest features in Next.js 14 to build high-performance, scalable web applications.',
  author: 'Alex Chen',
  date: '2024-01-15',
  readTime: '8 min read',
  image: '/blog/featured-post.jpg',
  tags: ['Next.js', 'React', 'Performance']
}

export function FeaturedPost() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-500"></div>
          <div className="p-8">
            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {featuredPost.date}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {featuredPost.readTime}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {featuredPost.title}
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {featuredPost.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  AC
                </div>
                <span className="font-medium text-slate-900 dark:text-white">{featuredPost.author}</span>
              </div>
              
              <button className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
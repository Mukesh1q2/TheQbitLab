'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'

export function NewsletterSignup() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Mail className="w-12 h-12 text-white mx-auto mb-6" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Our Newsletter
          </h2>
          
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get the latest articles, tutorials, and insights delivered directly to your inbox. 
            No spam, unsubscribe anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          
          <p className="text-sm text-purple-200 mt-4">
            Join 1,234+ developers already subscribed
          </p>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowRight, Sparkles } from 'lucide-react'

export function NewsletterSignup() {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-cyan-500/5 to-primary/10 border border-primary/20 overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
              <Mail className="w-7 h-7 text-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Updated with Our Newsletter
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest articles, tutorials, and insights delivered directly to your inbox.
              No spam, unsubscribe anytime.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl bg-background border border-white/10 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary/30 outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all font-semibold flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Join 1,234+ developers already subscribed
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
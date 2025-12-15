'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code, Zap } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Ready to Build with AI?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start experimenting with our LLM playground and discover the power of AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Code className="w-5 h-5" />
              Start Building
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              View Pricing
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
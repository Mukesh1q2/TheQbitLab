'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Code, MessageCircle } from 'lucide-react'

export function PlaygroundHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI LLM Playground
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experiment with large language models, test prompts, and explore AI capabilities in our interactive playground.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { ArrowDown, User } from 'lucide-react'
import Link from 'next/link'

export function AboutHero() {
  return (
    <section className="relative py-20 pt-32 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <User className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">About Me</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            Mukesh Kumar
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed"
        >
          I'm a multidisciplinary developer exploring the intersection of
          <span className="text-primary font-medium"> ancient wisdom</span> and
          <span className="text-cyan-400 font-medium"> modern AI</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto"
        >
          With a background in Deep Learning, Computer Vision, and Full-Stack Development,
          I build AI systems that feel <span className="text-primary font-semibold">alive</span>—clean,
          reliable, and human-centered. From architecting self-evolving AI environments to building
          specialized LLM tools, I create technology that learns and adapts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 font-semibold"
            >
              View Projects
            </motion.button>
          </Link>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-primary/50 text-primary rounded-xl hover:bg-primary/10 transition-all duration-300 font-semibold"
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
      </motion.div>
    </section>
  )
}
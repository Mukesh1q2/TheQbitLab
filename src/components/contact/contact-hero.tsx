'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export function ContactHero() {
  return (
    <section className="relative py-20 pt-32 overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <MessageCircle className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Let's Connect</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            Get In Touch
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Ready to bring your ideas to life? Let's discuss your next project and create something extraordinary together.
        </motion.p>

        {/* Quick Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-primary/10">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <span className="text-foreground">mukesh@theqbitlabs.com</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <Phone className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-foreground">+91-9716966182</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-green-500/10">
              <MapPin className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-foreground">New Delhi, India</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
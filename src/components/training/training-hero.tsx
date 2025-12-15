'use client'

import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react'

export function TrainingHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Avadhan Training
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Comprehensive training programs in AI, web development, and emerging technologies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
              <GraduationCap className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold">Expert-Led</h3>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold">Hands-on</h3>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold">Community</h3>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold">Certified</h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
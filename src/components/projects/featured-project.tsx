'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, Users, Calendar } from 'lucide-react'

export function FeaturedProject() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Featured Project
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer"
          >
            <div className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all duration-500 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-full">
                      ⭐ Featured
                    </span>
                    <span className="px-3 py-1 text-sm bg-green-500 text-white rounded-full">
                      Completed
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    AI-Powered Analytics Dashboard
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    A comprehensive analytics platform that uses machine learning to provide 
                    real-time insights and predictive analytics for business intelligence.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['React', 'Python', 'TensorFlow', 'PostgreSQL', 'Docker'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">4.9</div>
                      <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        Rating
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">50+</div>
                      <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                        <Users className="w-4 h-4" />
                        Users
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">3mo</div>
                      <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Duration
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-muted-foreground/20 hover:border-primary/50 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </motion.button>
                  </div>
                </div>
                
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl opacity-60">📊</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
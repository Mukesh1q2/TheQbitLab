'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Calendar } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Ready to Start Your
            </span>
            <br />
            <span className="text-foreground">
              Next Project?
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Let's collaborate and bring your vision to life. From concept to deployment, 
            we create solutions that make an impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule a Call</span>
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">48h</div>
              <div className="text-muted-foreground">Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

export function ContactHero() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-6"
        >
          Get In Touch
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-slate-300 mb-8"
        >
          Ready to bring your ideas to life? Let's discuss your next project.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <div className="flex items-center text-slate-300">
            <Mail className="w-5 h-5 mr-3" />
            <span>hello@theqbitlabs.com</span>
          </div>
          <div className="flex items-center text-slate-300">
            <Phone className="w-5 h-5 mr-3" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center text-slate-300">
            <MapPin className="w-5 h-5 mr-3" />
            <span>San Francisco, CA</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
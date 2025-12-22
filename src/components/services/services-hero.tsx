'use client'

import { motion } from 'framer-motion'
import { Zap, Code, Smartphone, Brain } from 'lucide-react'

const services = [
  { icon: Brain, title: 'AI System Design', description: 'From idea to deployable intelligence' },
  { icon: Code, title: 'Full-Stack Engineering', description: 'Frontend, backend, data, and deployment — end to end' },
  { icon: Smartphone, title: 'Product Prototyping', description: 'Turning complex ideas into usable products' },
  { icon: Zap, title: 'Technical Consulting', description: 'Architecture, performance, and scalability guidance' }
]

export function ServicesHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            How I Can Help
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            If your problem is complex — I'm interested.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
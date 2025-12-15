'use client'

import { motion } from 'framer-motion'

const clients = [
  { id: 1, name: 'TechCorp', logo: '🏢' },
  { id: 2, name: 'InnovateLab', logo: '🧪' },
  { id: 3, name: 'DataFlow', logo: '📊' },
  { id: 4, name: 'CloudTech', logo: '☁️' },
  { id: 5, name: 'AI Solutions', logo: '🤖' },
  { id: 6, name: 'Digital Agency', logo: '🎨' },
  { id: 7, name: 'StartupXYZ', logo: '🚀' },
  { id: 8, name: 'Enterprise Co', logo: '🏭' }
]

export function ClientLogos() {
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
            Trusted by Leading Companies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've had the privilege of working with amazing companies across various industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="group cursor-pointer"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {client.logo}
                </div>
                <div className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {client.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
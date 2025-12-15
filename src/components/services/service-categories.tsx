'use client'

import { motion } from 'framer-motion'

const categories = [
  { id: 1, name: 'AI & Machine Learning', count: 12, icon: '🤖' },
  { id: 2, name: 'Web Development', count: 18, icon: '🌐' },
  { id: 3, name: 'Mobile Development', count: 8, icon: '📱' },
  { id: 4, name: 'Cloud Solutions', count: 10, icon: '☁️' },
  { id: 5, name: 'DevOps & Automation', count: 6, icon: '⚙️' },
  { id: 6, name: 'Consulting', count: 15, icon: '💼' }
]

export function ServiceCategories() {
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
            Service Categories
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-lg font-bold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} services available</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'

const paths = [
  { id: 1, name: 'Frontend Developer', steps: 4, icon: '🎨' },
  { id: 2, name: 'Backend Developer', steps: 5, icon: '⚙️' },
  { id: 3, name: 'AI Engineer', steps: 6, icon: '🤖' },
  { id: 4, name: 'DevOps Engineer', steps: 4, icon: '🔧' }
]

export function LearningPath() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Learning Paths
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm text-center"
            >
              <div className="text-4xl mb-4">{path.icon}</div>
              <h3 className="text-lg font-bold mb-2">{path.name}</h3>
              <p className="text-sm text-muted-foreground">{path.steps} courses</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
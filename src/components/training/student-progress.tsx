'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const progress = [
  { course: 'React Fundamentals', completed: 85 },
  { course: 'Node.js Basics', completed: 60 },
  { course: 'Database Design', completed: 40 }
]

export function StudentProgress() {
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
            Student Progress
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-6">
          {progress.map((item, index) => (
            <motion.div
              key={item.course}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-background border border-muted-foreground/20"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{item.course}</h3>
                <span className="text-primary font-bold">{item.completed}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.completed}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
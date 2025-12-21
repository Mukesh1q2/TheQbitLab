'use client'

import { motion } from 'framer-motion'

export function PopularTags() {
  const tags = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'Node.js',
    'AI/ML', 'Web Development', 'Tutorial', 'Best Practices', 'Performance', 'Accessibility'
  ]

  return (
    <section className="py-12 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-foreground mb-6 text-center">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag, index) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-muted-foreground rounded-lg text-sm hover:border-primary/30 hover:text-primary cursor-pointer transition-all"
            >
              #{tag}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
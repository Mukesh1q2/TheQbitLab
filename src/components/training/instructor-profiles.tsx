'use client'

import { motion } from 'framer-motion'

const instructors = [
  { id: 1, name: 'John Doe', expertise: 'React & Next.js', experience: '8 years' },
  { id: 2, name: 'Jane Smith', expertise: 'AI & Machine Learning', experience: '10 years' },
  { id: 3, name: 'Mike Johnson', expertise: 'Cloud Architecture', experience: '12 years' }
]

export function InstructorProfiles() {
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
            Meet Our Instructors
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">👨‍🏫</div>
              </div>
              <h3 className="text-lg font-bold mb-2">{instructor.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{instructor.expertise}</p>
              <p className="text-xs text-primary">{instructor.experience} experience</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
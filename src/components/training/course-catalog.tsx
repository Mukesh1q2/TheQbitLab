'use client'

import { motion } from 'framer-motion'

const courses = [
  { id: 1, title: 'AI & Machine Learning', level: 'Intermediate', duration: '12 weeks' },
  { id: 2, title: 'Full-Stack Web Development', level: 'Beginner', duration: '16 weeks' },
  { id: 3, title: 'Cloud Architecture', level: 'Advanced', duration: '8 weeks' },
  { id: 4, title: 'DevOps Fundamentals', level: 'Intermediate', duration: '10 weeks' }
]

export function CourseCatalog() {
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
            Course Catalog
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{course.level} • {course.duration}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
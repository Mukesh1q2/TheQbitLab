'use client'

import { motion } from 'framer-motion'
import { Calendar, Video } from 'lucide-react'

const sessions = [
  { id: 1, title: 'React Advanced Patterns', date: '2024-12-15', time: '2:00 PM' },
  { id: 2, title: 'AI Model Deployment', date: '2024-12-17', time: '3:00 PM' },
  { id: 3, title: 'Cloud Architecture Best Practices', date: '2024-12-20', time: '1:00 PM' }
]

export function LiveSessions() {
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
            Live Sessions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm"
            >
              <Video className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-4">{session.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {session.date}
                </div>
                <div>{session.time}</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Register
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
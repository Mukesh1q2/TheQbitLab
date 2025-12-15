'use client'

import { motion } from 'framer-motion'
import { Code, Users, Globe, Award } from 'lucide-react'

const stats = [
  {
    icon: Code,
    label: 'Projects Completed',
    value: '50+',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: Users,
    label: 'Happy Clients',
    value: '25+',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    icon: Globe,
    label: 'Technologies Used',
    value: '20+',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    icon: Award,
    label: 'Success Rate',
    value: '98%',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  }
]

export function ProjectStats() {
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
            Project Statistics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Numbers that speak to our experience and success in delivering exceptional projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm"
              >
                <div className={`inline-flex p-4 rounded-2xl ${stat.bgColor} mb-4`}>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
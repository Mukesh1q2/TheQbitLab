'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Lightbulb, Shield, Target, Rocket } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Passion for Excellence',
    description: 'Creating exceptional digital experiences that exceed expectations and drive real business value.',
    color: 'from-red-500/20 to-pink-500/20',
    iconColor: 'text-red-400'
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Embracing cutting-edge technologies and creative problem-solving to deliver solutions that push boundaries.',
    color: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400'
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Focusing on measurable outcomes that directly impact client success and business growth.',
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400'
  },
  {
    icon: Shield,
    title: 'Integrity & Trust',
    description: 'Building lasting relationships through honesty, reliability, and delivering on commitments.',
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400'
  },
  {
    icon: Users,
    title: 'Collaborative Spirit',
    description: 'The best solutions come from diverse perspectives working together towards a common goal.',
    color: 'from-purple-500/20 to-violet-500/20',
    iconColor: 'text-purple-400'
  },
  {
    icon: Rocket,
    title: 'Scalable Solutions',
    description: 'Designing systems and applications that grow with your business, ensuring long-term success.',
    color: 'from-cyan-500/20 to-primary/20',
    iconColor: 'text-cyan-400'
  }
]

export function ValuesSection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
              Core Values
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These principles guide every project I take on and every solution I deliver.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className={`w-6 h-6 ${value.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
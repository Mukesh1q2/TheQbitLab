'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Lightbulb, Shield, Target, Rocket } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Passion for Excellence',
    description: 'We are passionate about creating exceptional digital experiences that exceed expectations and drive real business value.',
    details: [
      'Commitment to quality in every line of code',
      'Continuous improvement and learning',
      'Attention to detail in design and implementation',
      'User-centric approach to all solutions'
    ]
  },
  {
    icon: Users,
    title: 'Collaborative Spirit',
    description: 'We believe the best solutions come from diverse perspectives working together towards a common goal.',
    details: [
      'Open communication and transparency',
      'Knowledge sharing and mentorship',
      'Cross-functional team collaboration',
      'Client partnership and engagement'
    ]
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We embrace cutting-edge technologies and creative problem-solving to deliver solutions that push boundaries.',
    details: [
      'Early adoption of emerging technologies',
      'Creative problem-solving approaches',
      'Experimentation with new methodologies',
      'Staying ahead of industry trends'
    ]
  },
  {
    icon: Shield,
    title: 'Integrity & Trust',
    description: 'We build lasting relationships through honesty, reliability, and delivering on our commitments.',
    details: [
      'Transparent communication always',
      'Meeting deadlines and promises',
      'Data security and privacy protection',
      'Ethical business practices'
    ]
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'We focus on measurable outcomes that directly impact our clients\' success and business growth.',
    details: [
      'Clear success metrics and KPIs',
      'Data-driven decision making',
      'ROI-focused solution design',
      'Continuous performance monitoring'
    ]
  },
  {
    icon: Rocket,
    title: 'Scalable Solutions',
    description: 'We design systems and applications that grow with your business, ensuring long-term success.',
    details: [
      'Future-proof architecture decisions',
      'Flexible and adaptable frameworks',
      'Performance optimization strategies',
      'Maintenance and support planning'
    ]
  }
]

export function ValuesSection() {
  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            These fundamental principles guide every decision we make and every solution we deliver, 
            ensuring consistent excellence in our work and relationships.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {value.title}
                </h3>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {value.description}
              </p>
              
              <ul className="space-y-3">
                {value.details.map((detail, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Living Our Values Daily
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-6">
              These aren't just words on a page – they're the foundation of how we work, 
              how we treat our clients, and how we build lasting partnerships. 
              Every project, every interaction, and every decision is guided by these core principles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Excellence', 'Collaboration', 'Innovation', 'Integrity', 'Results', 'Scalability'].map((principle) => (
                <span
                  key={principle}
                  className="px-4 py-2 bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 rounded-full font-semibold border border-purple-200 dark:border-purple-700"
                >
                  {principle}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
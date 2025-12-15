'use client'

import { motion } from 'framer-motion'
import { Code, Brain, Globe, Zap, Shield, Rocket } from 'lucide-react'

const skills = [
  {
    category: 'Frontend Development',
    icon: Code,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    level: 95
  },
  {
    category: 'AI & Machine Learning',
    icon: Brain,
    items: ['OpenAI GPT', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP'],
    level: 90
  },
  {
    category: 'Backend & Infrastructure',
    icon: Globe,
    items: ['Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
    level: 88
  },
  {
    category: 'Emerging Technologies',
    icon: Zap,
    items: ['Web3', 'Blockchain', 'IoT', 'AR/VR', 'Quantum Computing'],
    level: 85
  },
  {
    category: 'Security & DevOps',
    icon: Shield,
    items: ['Cybersecurity', 'CI/CD', 'Kubernetes', 'Monitoring', 'Testing'],
    level: 82
  },
  {
    category: 'Innovation & R&D',
    icon: Rocket,
    items: ['Research', 'Prototyping', 'Technical Writing', 'Consulting', 'Mentoring'],
    level: 93
  }
]

export function SkillsMatrix() {
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
            Our Technical Expertise
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive overview of our technical capabilities and proficiency levels across various domains of modern technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mr-4">
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {skill.category}
                </h3>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Proficiency</span>
                  <span className="text-sm font-bold text-purple-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
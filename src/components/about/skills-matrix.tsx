'use client'

import { motion } from 'framer-motion'
import { Code, Brain, Globe, Zap, Database, Rocket } from 'lucide-react'

const skills = [
  {
    category: 'Frontend Development',
    icon: Code,
    items: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    level: 95,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400'
  },
  {
    category: 'AI & Machine Learning',
    icon: Brain,
    items: ['PyTorch', 'TensorFlow', 'OpenAI API', 'Gemini API', 'LangChain'],
    level: 92,
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400'
  },
  {
    category: 'Backend & APIs',
    icon: Globe,
    items: ['Node.js', 'Python', 'Firebase', 'REST APIs', 'GraphQL'],
    level: 88,
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400'
  },
  {
    category: 'Databases',
    icon: Database,
    items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'Supabase'],
    level: 85,
    color: 'from-orange-500/20 to-yellow-500/20',
    iconColor: 'text-orange-400'
  },
  {
    category: 'DevOps & Cloud',
    icon: Zap,
    items: ['Docker', 'Vercel', 'AWS', 'CI/CD', 'Git'],
    level: 82,
    color: 'from-cyan-500/20 to-blue-500/20',
    iconColor: 'text-cyan-400'
  },
  {
    category: 'Innovation & R&D',
    icon: Rocket,
    items: ['Vedic AI Systems', 'Quantum Concepts', 'Consciousness Computing', 'Research'],
    level: 90,
    color: 'from-primary/20 to-cyan-500/20',
    iconColor: 'text-primary'
  }
]

export function SkillsMatrix() {
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
              My Stack Is a System
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I don't treat technologies as isolated tools. I think in systems — how data flows, how decisions propagate, and how performance holds under stress. The skills you see here aren't just things I "know." They're things I've used in production.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <skill.icon className={`w-6 h-6 ${skill.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {skill.category}
                  </h3>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Proficiency</span>
                    <span className="text-sm font-bold text-primary">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-primary to-cyan-500 h-2 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, Rocket } from 'lucide-react'

const experiences = [
  {
    period: '2023 - Present',
    title: 'Founder & AI Engineer',
    company: 'TheQbitLabs',
    location: 'New Delhi, India',
    description: 'Founded a technology company focused on AI solutions, web development, and innovative digital experiences. Building products like Brahm AI, Synthesis, and VedaQ.',
    highlights: [
      'Developed Brahm AI - A Vedic-inspired cognitive AI framework',
      'Created 9+ production-grade web applications',
      'Pioneered consciousness computing research',
      'Building AI tools that bridge ancient wisdom and modern tech'
    ],
    technologies: ['React 19', 'Next.js', 'Python', 'PyTorch', 'Firebase', 'Gemini API']
  },
  {
    period: '2021 - 2023',
    title: 'Full Stack Developer',
    company: 'Freelance',
    location: 'Remote',
    description: 'Delivered high-quality web applications and AI solutions for clients across various industries. Specialized in modern JavaScript frameworks and AI integration.',
    highlights: [
      'Built enterprise dashboards and management systems',
      'Implemented AI chatbots using OpenAI and Gemini APIs',
      'Created responsive e-commerce platforms',
      'Developed automation solutions for businesses'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker']
  },
  {
    period: '2019 - 2021',
    title: 'AI/ML Research',
    company: 'Self-Directed Learning',
    location: 'Remote',
    description: 'Deep exploration of AI, machine learning, and computer vision. Built foundational knowledge in neural networks and deep learning architectures.',
    highlights: [
      'Completed multiple AI/ML courses and certifications',
      'Built computer vision projects with OpenCV',
      'Experimented with NLP and transformer models',
      'Developed expertise in Python data science stack'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'NumPy', 'Pandas']
  }
]

export function ExperienceTimeline() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey in technology, from learning AI fundamentals to building production-grade applications.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-cyan-500 to-primary/30" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative flex items-start"
              >
                {/* Timeline dot */}
                <div className="absolute left-5 w-6 h-6 bg-gradient-to-r from-primary to-cyan-500 rounded-full border-4 border-background z-10 flex items-center justify-center">
                  <Rocket className="w-3 h-3 text-white" />
                </div>

                <div className="ml-16 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-300 w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-primary mb-1">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col lg:items-end text-muted-foreground text-sm mt-2 lg:mt-0">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {exp.description}
                  </p>

                  <div className="mb-4">
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building } from 'lucide-react'

const experiences = [
  {
    period: '2022 - Present',
    title: 'Founder & CEO',
    company: 'TheQbitlabs',
    location: 'Remote',
    description: 'Leading a team of talented developers and designers to create innovative AI-powered solutions for businesses worldwide. Responsible for product strategy, client relations, and technical oversight.',
    achievements: [
      'Built a team of 15+ professionals across multiple disciplines',
      'Delivered 50+ successful projects for global clients',
      'Achieved 300% revenue growth in first 18 months',
      'Established partnerships with Fortune 500 companies'
    ],
    technologies: ['React', 'Next.js', 'Python', 'OpenAI', 'AWS', 'PostgreSQL']
  },
  {
    period: '2020 - 2022',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    description: 'Led development of enterprise-level web applications and mentored junior developers. Specialized in React ecosystems and cloud infrastructure.',
    achievements: [
      'Reduced application load times by 60% through optimization',
      'Mentored 8 junior developers to senior positions',
      'Architected microservices handling 1M+ daily users',
      'Implemented CI/CD pipelines reducing deployment time by 80%'
    ],
    technologies: ['React', 'Node.js', 'GraphQL', 'Docker', 'Kubernetes', 'AWS']
  },
  {
    period: '2018 - 2020',
    title: 'Frontend Developer',
    company: 'Digital Innovations Inc',
    location: 'Austin, TX',
    description: 'Developed responsive web applications using modern JavaScript frameworks. Collaborated with design teams to create exceptional user experiences.',
    achievements: [
      'Developed 20+ responsive web applications',
      'Improved user engagement by 45% through UX enhancements',
      'Created design system adopted company-wide',
      'Mentored 5 new team members'
    ],
    technologies: ['JavaScript', 'Vue.js', 'CSS3', 'Sass', 'Webpack', 'Jest']
  },
  {
    period: '2016 - 2018',
    title: 'Web Developer',
    company: 'StartupHub',
    location: 'New York, NY',
    description: 'Full-stack development for startup projects. Gained expertise in agile methodologies and rapid prototyping.',
    achievements: [
      'Built MVP applications from concept to deployment',
      'Participated in 3 successful startup exits',
      'Developed real-time features using WebSockets',
      'Implemented automated testing strategies'
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'jQuery', 'Bootstrap', 'Git']
  }
]

export function ExperienceTimeline() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Professional Journey
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A timeline of my professional experience, showcasing growth, achievements, and the evolution of my technical expertise.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500" />
          
          <div className="space-y-12">
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
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-white dark:border-slate-800 z-10" />
                
                <div className="ml-20 bg-slate-50 dark:bg-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-slate-600 dark:text-slate-300 mb-2">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col lg:items-end text-slate-500 dark:text-slate-400">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700"
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
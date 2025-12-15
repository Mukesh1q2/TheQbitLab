'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react'

const education = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'Stanford University',
    location: 'Stanford, CA',
    period: '2014 - 2016',
    specialization: 'Artificial Intelligence & Machine Learning',
    description: 'Focused on advanced algorithms, machine learning models, and their practical applications in real-world systems.',
    achievements: [
      'GPA: 3.9/4.0',
      'Published 3 research papers on neural networks',
      'Teaching Assistant for AI Fundamentals course',
      'Recipient of Graduate Fellowship Award'
    ],
    coursework: [
      'Advanced Machine Learning',
      'Deep Learning & Neural Networks',
      'Computer Vision',
      'Natural Language Processing',
      'Distributed Systems',
      'Algorithm Design & Analysis'
    ]
  },
  {
    degree: 'Bachelor of Science in Software Engineering',
    school: 'MIT',
    location: 'Cambridge, MA',
    period: '2010 - 2014',
    specialization: 'Software Architecture & Development',
    description: 'Comprehensive study of software engineering principles, system design, and modern development practices.',
    achievements: [
      'GPA: 3.8/4.0, Magna Cum Laude',
      'President of Computer Science Society',
      'Winner of Annual Programming Competition',
      'Internship at Google and Microsoft'
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Software Engineering',
      'Database Systems',
      'Computer Networks',
      'Operating Systems',
      'Human-Computer Interaction'
    ]
  }
]

const certifications = [
  {
    name: 'AWS Certified Solutions Architect - Professional',
    issuer: 'Amazon Web Services',
    date: '2023',
    credentialId: 'AWS-PSA-2023-001',
    description: 'Advanced certification demonstrating expertise in designing distributed applications and systems on AWS.'
  },
  {
    name: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud',
    date: '2022',
    credentialId: 'GCP-PCA-2022-045',
    description: 'Professional certification for designing, building, and deploying scalable cloud solutions.'
  },
  {
    name: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    date: '2021',
    credentialId: 'CKA-2021-789',
    description: 'Performance-based certification validating skills in Kubernetes cluster administration.'
  },
  {
    name: 'OpenAI GPT-4 Developer Certification',
    issuer: 'OpenAI',
    date: '2023',
    credentialId: 'OAI-GPT4-2023-012',
    description: 'Specialized certification for advanced AI application development using GPT-4 and related technologies.'
  }
]

export function EducationSection() {
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
            Academic Foundation
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Strong academic background complemented by continuous learning and professional certifications.
          </p>
        </motion.div>

        {/* Education */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center"
          >
            <GraduationCap className="w-8 h-8 mr-3 text-purple-600" />
            Formal Education
          </motion.h3>
          
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="mb-4 lg:mb-0">
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                      {edu.degree}
                    </h4>
                    <h5 className="text-xl text-purple-600 dark:text-purple-400 font-semibold mb-2">
                      {edu.school}
                    </h5>
                    <div className="flex flex-col sm:flex-row sm:items-center text-slate-600 dark:text-slate-300 space-y-1 sm:space-y-0 sm:space-x-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  <span className="font-semibold">Specialization:</span> {edu.specialization}
                </p>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {edu.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h6 className="font-semibold text-slate-800 dark:text-white mb-3">Academic Achievements</h6>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <Award className="w-4 h-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-300 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h6 className="font-semibold text-slate-800 dark:text-white mb-3">Key Coursework</h6>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-800 dark:text-white mb-"
          >
           8 flex items-center <Award className="w-8 h-8 mr-3 text-blue-600" />
            Professional Certifications
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-gradient-to-b from-purple-500 to-blue-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      {cert.name}
                    </h4>
                    <p className="text-purple-600 dark:text-purple-400 font-semibold mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Issued {cert.date} • ID: {cert.credentialId}
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-blue-600 flex-shrink-0" />
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
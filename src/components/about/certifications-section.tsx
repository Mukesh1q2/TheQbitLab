'use client'

import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react'

const certifications = [
  {
    category: 'Cloud & Infrastructure',
    items: [
      {
        name: 'AWS Certified Solutions Architect - Professional',
        issuer: 'Amazon Web Services',
        date: '2023',
        credentialId: 'AWS-PSA-2023-001',
        description: 'Advanced certification demonstrating expertise in designing distributed applications and systems on AWS.',
        validUntil: '2026',
        badge: '/certifications/aws-sap.png'
      },
      {
        name: 'Google Cloud Professional Cloud Architect',
        issuer: 'Google Cloud',
        date: '2022',
        credentialId: 'GCP-PCA-2022-045',
        description: 'Professional certification for designing, building, and deploying scalable cloud solutions.',
        validUntil: '2025',
        badge: '/certifications/gcp-architect.png'
      },
      {
        name: 'Microsoft Azure Solutions Architect Expert',
        issuer: 'Microsoft',
        date: '2023',
        credentialId: 'AZ-305-2023-078',
        description: 'Expert-level certification for designing solutions that run on Microsoft Azure.',
        validUntil: '2026',
        badge: '/certifications/azure-expert.png'
      }
    ]
  },
  {
    category: 'Development & Programming',
    items: [
      {
        name: 'Certified Kubernetes Administrator',
        issuer: 'Cloud Native Computing Foundation',
        date: '2021',
        credentialId: 'CKA-2021-789',
        description: 'Performance-based certification validating skills in Kubernetes cluster administration.',
        validUntil: '2024',
        badge: '/certifications/cka.png'
      },
      {
        name: 'Docker Certified Associate',
        issuer: 'Docker Inc.',
        date: '2022',
        credentialId: 'DCA-2022-234',
        description: 'Validation of container technology skills and Docker best practices.',
        validUntil: '2025',
        badge: '/certifications/dca.png'
      },
      {
        name: 'HashiCorp Certified: Terraform Associate',
        issuer: 'HashiCorp',
        date: '2023',
        credentialId: 'TFA-2023-156',
        description: 'Certification for infrastructure as code using Terraform.',
        validUntil: '2026',
        badge: '/certifications/terraform.png'
      }
    ]
  },
  {
    category: 'AI & Machine Learning',
    items: [
      {
        name: 'OpenAI GPT-4 Developer Certification',
        issuer: 'OpenAI',
        date: '2023',
        credentialId: 'OAI-GPT4-2023-012',
        description: 'Specialized certification for advanced AI application development using GPT-4 and related technologies.',
        validUntil: '2025',
        badge: '/certifications/openai.png'
      },
      {
        name: 'TensorFlow Developer Certificate',
        issuer: 'Google',
        date: '2022',
        credentialId: 'TF-2022-567',
        description: 'Professional certification demonstrating machine learning skills with TensorFlow.',
        validUntil: '2025',
        badge: '/certifications/tensorflow.png'
      },
      {
        name: 'AWS Machine Learning - Specialty',
        issuer: 'Amazon Web Services',
        date: '2023',
        credentialId: 'AWS-MLS-2023-089',
        description: 'Specialty certification for machine learning workloads on AWS.',
        validUntil: '2026',
        badge: '/certifications/aws-ml.png'
      }
    ]
  }
]

export function CertificationsSection() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Professional Certifications
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Validated expertise through industry-recognized certifications across cloud computing, AI/ML, and modern development practices.
          </p>
        </motion.div>

        <div className="space-y-12">
          {certifications.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
                <Award className="w-6 h-6 mr-3 text-purple-600" />
                {category.category}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-tight">
                          {cert.name}
                        </h4>
                        <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm mb-1">
                          {cert.issuer}
                        </p>
                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {cert.date}
                          </span>
                          <span className="flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Valid until {cert.validUntil}
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                      {cert.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        ID: {cert.credentialId}
                      </span>
                      <button className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium">
                        Verify
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
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
              Continuous Learning Commitment
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              These certifications represent our commitment to staying current with rapidly evolving technologies. 
              We regularly renew our certifications and pursue new ones to ensure we deliver cutting-edge solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
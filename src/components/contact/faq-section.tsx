'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQ {
  id: string
  question: string
  answer: string
  category: 'general' | 'services' | 'pricing' | 'technical'
  tags: string[]
}

const faqs: FAQ[] = [
  {
    id: 'what-services',
    question: 'What AI and development services do you offer?',
    answer: 'We specialize in AI engineering, LLM architecture, full-stack development, and custom software solutions. Our services include machine learning model development, web application development, API integration, cloud deployment, and AI consulting.',
    category: 'services',
    tags: ['AI', 'ML', 'Development', 'Consulting']
  },
  {
    id: 'project-timeline',
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity and scope. Simple websites take 2-4 weeks, complex AI applications take 3-6 months, and enterprise solutions may take 6-12 months. We provide detailed project timelines during our initial consultation.',
    category: 'general',
    tags: ['Timeline', 'Planning', 'Project Management']
  },
  {
    id: 'pricing-model',
    question: 'What is your pricing structure?',
    answer: 'We offer flexible pricing models: fixed price for well-defined projects, hourly rates for consulting and ongoing work, and retainer arrangements for long-term partnerships. We provide transparent pricing with detailed proposals.',
    category: 'pricing',
    tags: ['Pricing', 'Budget', 'Investment']
  },
  {
    id: 'technology-stack',
    question: 'What technologies do you work with?',
    answer: 'We work with modern technologies including React/Next.js, TypeScript, Python, TensorFlow, PyTorch, OpenAI APIs, AWS/Azure/GCP, Node.js, PostgreSQL, and more. We stay current with the latest tools and frameworks.',
    category: 'technical',
    tags: ['Technology', 'Stack', 'Tools']
  },
  {
    id: 'support-maintenance',
    question: 'Do you provide ongoing support and maintenance?',
    answer: 'Yes, we offer comprehensive support packages including bug fixes, security updates, feature enhancements, and performance optimization. We also provide training and documentation for your team.',
    category: 'services',
    tags: ['Support', 'Maintenance', 'Updates']
  },
  {
    id: 'data-security',
    question: 'How do you handle data security and privacy?',
    answer: 'We follow industry best practices for data security including encryption, secure coding practices, GDPR compliance, and regular security audits. We can work with your existing security protocols and requirements.',
    category: 'technical',
    tags: ['Security', 'Privacy', 'GDPR', 'Compliance']
  },
  {
    id: 'collaboration',
    question: 'How do we collaborate during development?',
    answer: 'We use agile methodologies with regular check-ins, project management tools, and transparent communication. You\'ll have access to project dashboards, regular demos, and direct communication channels.',
    category: 'general',
    tags: ['Collaboration', 'Communication', 'Process']
  },
  {
    id: 'hosting-deployment',
    question: 'Can you help with hosting and deployment?',
    answer: 'Absolutely! We handle cloud deployment on AWS, Azure, or Google Cloud, including CI/CD pipelines, monitoring, scaling, and maintenance. We ensure your applications are production-ready and optimized.',
    category: 'technical',
    tags: ['Deployment', 'Hosting', 'Cloud', 'DevOps']
  }
]

const categories = {
  all: { name: 'All Questions', icon: HelpCircle, color: 'text-primary' },
  general: { name: 'General', icon: MessageCircle, color: 'text-blue-500' },
  services: { name: 'Services', icon: Zap, color: 'text-green-500' },
  pricing: { name: 'Pricing', icon: HelpCircle, color: 'text-yellow-500' },
  technical: { name: 'Technical', icon: Zap, color: 'text-purple-500' }
}

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories>('all')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our services, process, and how we can help 
            bring your AI and development projects to life.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = category.icon
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(key as keyof typeof categories)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300',
                  selectedCategory === key
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                )}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </motion.button>
            )
          })}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  'rounded-2xl border backdrop-blur-sm transition-all duration-300',
                  'bg-gradient-to-r from-white/10 to-white/5 border-white/20',
                  'hover:border-primary/50'
                )}
              >
                <motion.button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-2xl"
                  whileHover={{ backgroundColor: 'rgba(var(--primary), 0.05)' }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedItems.has(faq.id) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {expandedItems.has(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px bg-gradient-to-r from-primary/20 to-transparent mb-4" />
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our team is here to help. 
              Reach out and we'll get back to you within 24 hours.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300"
            >
              Contact Our Team
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
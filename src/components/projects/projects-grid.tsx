'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Play, Star, Eye, Calendar, Code, Tag, ArrowRight, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Project {
  id: string
  title: string
  description: string
  category: string
  tech: string[]
  status: 'Completed' | 'In Progress' | 'Planning'
  rating: number
  views: number
  date: string
  image?: string
  featured: boolean
  githubUrl?: string
  demoUrl?: string
  caseStudyUrl?: string
}

const projects: Project[] = [
  {
    id: 'quantgrid',
    title: 'QuantGrid — AI-Powered Trading Platform',
    description: 'QuantGrid is an enterprise-grade, AI-powered energy trading and optimization platform featuring real-time analytics, visual knowledge graphs, and automated bidding strategies. Features ML models for predictive analytics and Kafka + WebSocket streaming.',
    category: 'SaaS',
    tech: ['Next.js 14', 'TypeScript', 'Kafka', 'WebSocket', 'Docker', 'Kubernetes', 'ML/AI'],
    status: 'Completed',
    rating: 5.0,
    views: 9240,
    date: '2024-12-22',
    image: '/images/projects/optibid-energy.jpg',
    featured: true,
    demoUrl: 'https://quantgrid.theqbitlabs.com/',
    caseStudyUrl: '/case-studies/quantgrid'
  },
  {
    id: 'brahm-ai',
    title: 'Brahm AI — The "Deep Philosophy" Experiment',
    description: 'An AI framework inspired by Vedic systems and vibrational computing. Moving beyond standard logic to simulate higher-order cognition—a mix of symbolic AI and neural hybrids.',
    category: 'AI/ML',
    tech: ['Python', 'PyTorch', 'React 19', 'TypeScript', 'Firebase'],
    status: 'Completed',
    rating: 4.9,
    views: 12450,
    date: '2024-11-15',
    image: '/images/projects/brahm-ai.jpg',
    featured: true,
    githubUrl: 'https://github.com/Mukesh1q2/brahm-ai',
    demoUrl: 'https://brahm-ai.theqbitlabs.com',
    caseStudyUrl: '/case-studies/brahm-ai'
  },
  {
    id: 'vedaq-ai',
    title: 'VedaQ AI — Spiritual Tech',
    description: 'A full-stack app bringing ancient wisdom into the 21st century with karma-scoring algorithms, mantra playback, and an LLM that speaks English, Hindi, and Hinglish.',
    category: 'AI/ML',
    tech: ['Next.js', 'OpenAI API', 'Firebase', 'TailwindCSS', 'Framer Motion'],
    status: 'Completed',
    rating: 4.8,
    views: 8934,
    date: '2024-10-22',
    image: '/images/projects/vedaq-ai.jpg',
    featured: true,
    githubUrl: 'https://github.com/Mukesh1q2/vedaq-ai',
    demoUrl: 'https://vedaq.theqbitlabs.com',
    caseStudyUrl: '/case-studies/vedaq-ai'
  },
  {
    id: 'synthesis',
    title: 'Synthesis — Cognitive Commons',
    description: 'A revolutionary platform for collaborative decision-making with AI-enhanced reasoning. Features real-time AI insights, evidence analysis, and collective wisdom generation.',
    category: 'AI/ML',
    tech: ['Next.js', 'TypeScript', 'OpenAI API', 'Real-time Collaboration', 'Firebase'],
    status: 'Completed',
    rating: 4.9,
    views: 4210,
    date: '2024-12-01',
    image: '/images/projects/synthesis.jpg',
    featured: true,
    demoUrl: 'https://synthesis.theqbitlabs.com'
  },
  {
    id: 'neurosymbiotic-codemind',
    title: 'NeuroSymbiotic CodeMind — Self-Evolving Lab',
    description: 'Interactive environment using D3.js to visualize agent lineages where AI agents mutate and learn in real-time. A playground where agents interact, evolve, and communicate.',
    category: 'AI/ML',
    tech: ['React 19', 'D3.js', 'TypeScript', 'Node.js', 'WebSocket'],
    status: 'Completed',
    rating: 4.7,
    views: 6721,
    date: '2024-09-18',
    image: '/images/projects/neurosymbiotic.jpg',
    featured: true,
    githubUrl: 'https://github.com/Mukesh1q2/neurosymbiotic-codemind',
    demoUrl: 'https://codemind.theqbitlabs.com'
  },
  {
    id: 'quantum-playground',
    title: 'The Quantum Playground',
    description: 'A visual-heavy website making quantum mechanics look as cool as it sounds. Matrix-style typography and 3D qubit simulations using Three.js with real math under the hood.',
    category: 'Web Development',
    tech: ['React', 'Three.js', 'WebGL', 'Framer Motion', 'TypeScript'],
    status: 'Completed',
    rating: 4.8,
    views: 11234,
    date: '2024-08-30',
    image: '/images/projects/quantum-playground.jpg',
    featured: true,
    githubUrl: 'https://github.com/Mukesh1q2/quantum-playground',
    demoUrl: 'https://quantum.theqbitlabs.com',
    caseStudyUrl: '/case-studies/quantum-playground'
  },
  {
    id: 'ocr-system',
    title: 'The "Everything-to-Data" OCR System',
    description: 'A pipeline using Vision Transformers to extract structured data from chaotic medical records and invoices with high accuracy. Boring-but-vital infrastructure work.',
    category: 'AI/ML',
    tech: ['Python', 'Vision Transformers', 'FastAPI', 'Docker', 'GCP'],
    status: 'Completed',
    rating: 4.7,
    views: 5432,
    date: '2024-07-15',
    image: '/images/projects/ocr-system.jpg',
    featured: true,
    githubUrl: 'https://github.com/Mukesh1q2/ocr-pipeline',
    demoUrl: 'https://ocr.theqbitlabs.com'
  },
  {
    id: 'novagen-automation',
    title: 'NovaGen Automation — Industrial Tech',
    description: 'Premium industrial automation website with AI-powered chatbot using Gemini API, dual themes, glassmorphism UI, and interactive product catalog for Siemens, Yaskawa & more.',
    category: 'Web Development',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Gemini API', 'Vercel'],
    status: 'Completed',
    rating: 4.8,
    views: 3890,
    date: '2024-12-10',
    image: '/images/projects/novagen-automation.jpg',
    featured: true,
    demoUrl: 'https://novagenautomation.com'
  },
  {
    id: 'lims',
    title: 'LIMS — Library & Institute Management',
    description: 'Comprehensive management system with student tracking, attendance, fees, library, seating, and analytics. Real-time dashboard with attendance trends and fee collection tracking.',
    category: 'SaaS',
    tech: ['Next.js', 'TypeScript', 'Firebase', 'TailwindCSS', 'Chart.js'],
    status: 'Completed',
    rating: 4.6,
    views: 3150,
    date: '2024-11-20',
    image: '/images/projects/lims.jpg',
    featured: true,
    demoUrl: 'https://lims.theqbitlabs.com'
  },
  {
    id: 'konnichiwa',
    title: 'Konnichiwa Japan & Namaste India',
    description: 'A dual-brand cultural festival website showcasing Konnichiwa Japan and Namaste India festivals with event listings, ticket booking, gallery, and interactive experiences.',
    category: 'Web Development',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Vercel'],
    status: 'Completed',
    rating: 4.7,
    views: 2890,
    date: '2024-12-15',
    image: '/images/projects/konnichiwa.jpg',
    featured: true,
    demoUrl: 'https://konnichiwa.theqbitlabs.com'
  }
]

const categories = ['All', 'AI/ML', 'Web Development', 'SaaS', 'Data Visualization', 'Mobile Apps']
const statuses = ['All', 'Completed', 'In Progress', 'Planning']
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'views', label: 'Most Viewed' }
]

interface ProjectsGridProps {
  selectedCategory?: string
  searchQuery?: string
}

export function ProjectsGrid({ selectedCategory = 'All', searchQuery = '' }: ProjectsGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesStatus && matchesSearch
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'rating':
        return b.rating - a.rating
      case 'views':
        return b.views - a.views
      default: // newest
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Planning':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Status Filter */}
            <div className="flex flex-wrap gap-3">
              {statuses.map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedStatus(status)}
                  className={cn(
                    'px-4 py-2 rounded-xl font-medium transition-all duration-300',
                    selectedStatus === status
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted/50 hover:bg-muted border border-muted-foreground/20'
                  )}
                >
                  {status}
                </motion.button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-muted-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 p-1 rounded-xl border border-muted-foreground/20 bg-background">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-lg transition-all duration-300',
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted/50'
                  )}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V10zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V10z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-lg transition-all duration-300',
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted/50'
                  )}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <div className={cn(
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
        )}>
          <AnimatePresence mode="wait">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className={cn(
                  'group cursor-pointer',
                  viewMode === 'grid' ? '' : 'flex gap-6'
                )}
              >
                <div className={cn(
                  'relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300',
                  viewMode === 'list' ? 'flex-1' : ''
                )}>
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Project Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Category and Status */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {project.category}
                    </span>
                    <span className={cn('px-3 py-1 text-sm rounded-full', getStatusColor(project.status))}>
                      {project.status}
                    </span>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, viewMode === 'grid' ? 4 : 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-muted-foreground/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > (viewMode === 'grid' ? 4 : 6) && (
                      <span className="px-2 py-1 text-xs rounded-full bg-muted/30 text-muted-foreground">
                        +{project.tech.length - (viewMode === 'grid' ? 4 : 6)}
                      </span>
                    )}
                  </div>

                  {/* Project Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{project.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{project.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(project.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      )}
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                      {project.caseStudyUrl && (
                        <motion.a
                          href={project.caseStudyUrl}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          Case Study
                          <ArrowRight className="w-3 h-3" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {sortedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedStatus('All')
                }}
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
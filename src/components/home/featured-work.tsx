'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import { ExternalLink, Github, Play, Star, GitFork, Eye } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: 'web' | 'ai' | 'mobile' | 'saas' | 'api'
  techStack: string[]
  demoUrl?: string
  githubUrl?: string
  stats: {
    stars: number
    forks: number
    views: number
  }
  featured: boolean
  caseStudy?: string
}

const projects: Project[] = [
  {
    id: 'ai-chat-platform',
    title: 'AI Chat Platform',
    description: 'Advanced conversational AI platform with multi-model support, real-time streaming, and custom prompt engineering capabilities.',
    image: '/images/projects/ai-chat-platform.jpg',
    category: 'ai',
    techStack: ['Next.js', 'OpenAI', 'TypeScript', 'Prisma', 'PostgreSQL'],
    demoUrl: 'https://ai-chat-platform.vercel.app',
    githubUrl: 'https://github.com/theqbitlabs/ai-chat-platform',
    stats: { stars: 1247, forks: 234, views: 15670 },
    featured: true,
    caseStudy: '/case-studies/ai-chat-platform',
  },
  {
    id: 'quantum-portfolio',
    title: 'Quantum Portfolio',
    description: 'Revolutionary 3D portfolio with neural network visualizations, particle systems, and AI-powered content generation.',
    image: '/images/projects/quantum-portfolio.jpg',
    category: 'web',
    techStack: ['React', 'Three.js', 'WebGL', 'Framer Motion', 'Node.js'],
    demoUrl: 'https://quantum-portfolio.dev',
    githubUrl: 'https://github.com/theqbitlabs/quantum-portfolio',
    stats: { stars: 892, forks: 156, views: 8934 },
    featured: true,
    caseStudy: '/case-studies/quantum-portfolio',
  },
  {
    id: 'ml-pipeline',
    title: 'ML Pipeline Studio',
    description: 'Visual machine learning pipeline builder with drag-and-drop interface, autoML, and deployment automation.',
    image: '/images/projects/ml-pipeline.jpg',
    category: 'ai',
    techStack: ['Vue.js', 'Python', 'FastAPI', 'Docker', 'Kubernetes'],
    demoUrl: 'https://ml-pipeline.studio',
    githubUrl: 'https://github.com/theqbitlabs/ml-pipeline',
    stats: { stars: 567, forks: 89, views: 4521 },
    featured: false,
  },
  {
    id: 'saas-analytics',
    title: 'SaaS Analytics Dashboard',
    description: 'Comprehensive analytics platform for SaaS businesses with real-time metrics, predictive analytics, and custom reporting.',
    image: '/images/projects/saas-analytics.jpg',
    category: 'saas',
    techStack: ['Next.js', 'D3.js', 'PostgreSQL', 'Redis', 'AWS'],
    demoUrl: 'https://saas-analytics.app',
    githubUrl: 'https://github.com/theqbitlabs/saas-analytics',
    stats: { stars: 743, forks: 123, views: 9876 },
    featured: true,
  },
  {
    id: 'blockchain-api',
    title: 'Blockchain API Gateway',
    description: 'Enterprise-grade blockchain API with smart contract integration, DeFi protocols, and multi-chain support.',
    image: '/images/projects/blockchain-api.jpg',
    category: 'api',
    techStack: ['Node.js', 'Web3.js', 'Express', 'MongoDB', 'Ethereum'],
    demoUrl: 'https://blockchain-api.dev',
    githubUrl: 'https://github.com/theqbitlabs/blockchain-api',
    stats: { stars: 456, forks: 78, views: 3421 },
    featured: false,
  },
  {
    id: 'ar-commerce',
    title: 'AR Commerce Platform',
    description: 'Augmented reality e-commerce platform with virtual try-on, 3D product visualization, and social shopping features.',
    image: '/images/projects/ar-commerce.jpg',
    category: 'mobile',
    techStack: ['React Native', 'ARKit', 'Firebase', 'Stripe', 'WebRTC'],
    demoUrl: 'https://ar-commerce.app',
    githubUrl: 'https://github.com/theqbitlabs/ar-commerce',
    stats: { stars: 321, forks: 45, views: 2156 },
    featured: false,
  },
]

const categories = ['all', 'web', 'ai', 'mobile', 'saas', 'api'] as const

export function FeaturedWork() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('all')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const { theme } = useAppStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const filteredProjects = projects.filter(
    project => selectedCategory === 'all' || project.category === selectedCategory
  )

  const featuredProjects = filteredProjects.filter(project => project.featured)

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={cn(
            'text-3xl sm:text-4xl lg:text-5xl font-bold mb-4',
            theme.id === 'quantum' && 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600',
            theme.id === 'terminal' && 'text-terminal-green terminal-glow font-mono',
            theme.id === 'minimalist' && 'text-minimalist-charcoal',
            theme.id === 'neumorphic' && 'text-gray-700',
            theme.id === 'vaporwave' && 'holographic font-display'
          )}>
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest projects showcasing cutting-edge technology, innovative design, 
            and scalable solutions that solve real-world problems.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize',
                selectedCategory === category
                  ? theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  || theme.id === 'terminal' && 'bg-terminal-green text-terminal-bg'
                  || theme.id === 'minimalist' && 'bg-minimalist-charcoal text-white'
                  || theme.id === 'neumorphic' && 'neumorphic-button text-gray-700'
                  || theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-pink to-vaporwave-purple text-white'
                  : theme.id === 'quantum' && 'bg-white/10 text-cyan-400 hover:bg-white/20 border border-white/20'
                  || theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/20 border border-terminal-green/20'
                  || theme.id === 'minimalist' && 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  || theme.id === 'neumorphic' && 'neumorphic-inset text-gray-600 hover:shadow-md'
                  || theme.id === 'vaporwave' && 'glass-dark text-vaporwave-cyan hover:border-white/20 border border-white/10'
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl transition-all duration-500',
                  theme.id === 'quantum' && 'bg-white/5 border border-white/10 hover:border-white/20',
                  theme.id === 'terminal' && 'bg-terminal-bg border border-terminal-green/20 hover:border-terminal-green/40',
                  theme.id === 'minimalist' && 'bg-white border border-gray-200 hover:shadow-xl',
                  theme.id === 'neumorphic' && 'neumorphic-card hover:shadow-xl',
                  theme.id === 'vaporwave' && 'glass-dark border border-white/10 hover:border-white/20'
                )}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder-project.jpg'
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                    theme.id === 'quantum' && 'from-cyan-900/60',
                    theme.id === 'terminal' && 'from-terminal-green/60',
                    theme.id === 'minimalist' && 'from-gray-900/60',
                    theme.id === 'neumorphic' && 'from-purple-900/60',
                    theme.id === 'vaporwave' && 'from-vaporwave-pink/60'
                  )} />
                  
                  {/* Action Buttons */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center gap-4"
                      >
                        {project.demoUrl && (
                          <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                              'p-3 rounded-full backdrop-blur-sm border transition-colors',
                              theme.id === 'quantum' && 'bg-cyan-500/20 border-cyan-400 text-cyan-400 hover:bg-cyan-500/30',
                              theme.id === 'terminal' && 'bg-terminal-green/20 border-terminal-green text-terminal-green hover:bg-terminal-green/30',
                              theme.id === 'minimalist' && 'bg-white/20 border-white text-white hover:bg-white/30',
                              theme.id === 'neumorphic' && 'bg-white/20 border-gray-300 text-gray-700 hover:bg-white/30',
                              theme.id === 'vaporwave' && 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                            )}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        )}
                        
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                              'p-3 rounded-full backdrop-blur-sm border transition-colors',
                              theme.id === 'quantum' && 'bg-purple-500/20 border-purple-400 text-purple-400 hover:bg-purple-500/30',
                              theme.id === 'terminal' && 'bg-terminal-green/20 border-terminal-green text-terminal-green hover:bg-terminal-green/30',
                              theme.id === 'minimalist' && 'bg-gray-800/20 border-gray-800 text-gray-800 hover:bg-gray-800/30',
                              theme.id === 'neumorphic' && 'bg-gray-600/20 border-gray-600 text-gray-600 hover:bg-gray-600/30',
                              theme.id === 'vaporwave' && 'bg-vaporwave-purple/20 border-vaporwave-purple text-vaporwave-purple hover:bg-vaporwave-purple/30'
                            )}
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        )}
                        
                        {project.caseStudy && (
                          <motion.a
                            href={project.caseStudy}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                              'p-3 rounded-full backdrop-blur-sm border transition-colors',
                              theme.id === 'quantum' && 'bg-pink-500/20 border-pink-400 text-pink-400 hover:bg-pink-500/30',
                              theme.id === 'terminal' && 'bg-terminal-green/20 border-terminal-green text-terminal-green hover:bg-terminal-green/30',
                              theme.id === 'minimalist' && 'bg-blue-500/20 border-blue-500 text-blue-500 hover:bg-blue-500/30',
                              theme.id === 'neumorphic' && 'bg-indigo-500/20 border-indigo-500 text-indigo-500 hover:bg-indigo-500/30',
                              theme.id === 'vaporwave' && 'bg-vaporwave-cyan/20 border-vaporwave-cyan text-vaporwave-cyan hover:bg-vaporwave-cyan/30'
                            )}
                          >
                            <Play className="w-5 h-5" />
                          </motion.a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn(
                      'text-xs font-medium px-3 py-1 rounded-full',
                      theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400',
                      theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green',
                      theme.id === 'minimalist' && 'bg-gray-100 text-gray-700',
                      theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                      theme.id === 'vaporwave' && 'bg-vaporwave-cyan/10 text-vaporwave-cyan'
                    )}>
                      {project.category.toUpperCase()}
                    </span>
                    
                    {project.featured && (
                      <span className={cn(
                        'text-xs font-medium px-3 py-1 rounded-full',
                        theme.id === 'quantum' && 'bg-purple-500/10 text-purple-400',
                        theme.id === 'terminal' && 'bg-terminal-amber/10 text-terminal-amber',
                        theme.id === 'minimalist' && 'bg-yellow-100 text-yellow-800',
                        theme.id === 'neumorphic' && 'bg-yellow-100 text-yellow-600',
                        theme.id === 'vaporwave' && 'bg-vaporwave-pink/10 text-vaporwave-pink'
                      )}>
                        FEATURED
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          'text-xs px-2 py-1 rounded-md',
                          theme.id === 'quantum' && 'bg-white/5 text-cyan-300',
                          theme.id === 'terminal' && 'bg-terminal-green/5 text-terminal-green',
                          theme.id === 'minimalist' && 'bg-gray-100 text-gray-600',
                          theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                          theme.id === 'vaporwave' && 'bg-white/5 text-vaporwave-cyan'
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className={cn(
                        'text-xs px-2 py-1 rounded-md',
                        theme.id === 'quantum' && 'bg-white/5 text-cyan-300',
                        theme.id === 'terminal' && 'bg-terminal-green/5 text-terminal-green',
                        theme.id === 'minimalist' && 'bg-gray-100 text-gray-600',
                        theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                        theme.id === 'vaporwave' && 'bg-white/5 text-vaporwave-cyan'
                      )}>
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      <span>{project.stats.forks}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.stats.views}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300',
              theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/25',
              theme.id === 'terminal' && 'bg-terminal-green text-terminal-bg hover:bg-opacity-80',
              theme.id === 'minimalist' && 'bg-minimalist-charcoal text-white hover:bg-opacity-90',
              theme.id === 'neumorphic' && 'neumorphic-button text-gray-700 hover:shadow-lg',
              theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-pink to-vaporwave-purple text-white hover:shadow-lg'
            )}
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { 
  Calendar,
  MapPin,
  ExternalLink,
  Github,
  Award,
  Rocket,
  Code,
  Brain,
  Palette,
  Database,
  Cloud,
  Smartphone,
  Briefcase,
  GraduationCap,
  Heart
} from 'lucide-react'

interface TimelineEvent {
  id: string
  date: Date
  title: string
  description: string
  type: 'achievement' | 'project' | 'education' | 'work' | 'personal' | 'milestone'
  category: 'career' | 'project' | 'learning' | 'personal'
  location?: string
  tags: string[]
  metadata?: {
    url?: string
    github?: string
    image?: string
    company?: string
    role?: string
    technologies?: string[]
    impact?: string
    stats?: {
      users?: number
      revenue?: string
      performance?: string
    }
  }
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: new Date('2024-12-01'),
    title: 'Launched TheQbitlabs Platform',
    description: 'Complete portfolio platform with 5 premium themes, AI integration, and marketplace functionality. Represents the culmination of 6 months of intensive development.',
    type: 'milestone',
    category: 'career',
    location: 'Remote',
    tags: ['Platform', 'Launch', 'Portfolio'],
    metadata: {
      url: 'https://theqbitlabs.com',
      technologies: ['Next.js', 'TypeScript', 'Three.js', 'AI'],
      impact: 'Showcasing advanced web development capabilities',
      stats: {
        performance: '95+ Lighthouse Score'
      }
    }
  },
  {
    id: '2',
    date: new Date('2024-11-15'),
    title: 'AI Chat Platform Reaches 1M+ Messages',
    description: 'Milestone achievement for the AI Chat Platform with over 1 million messages processed. Enhanced with advanced streaming capabilities and multi-model support.',
    type: 'achievement',
    category: 'project',
    location: 'Global',
    tags: ['AI', 'Milestone', 'Platform'],
    metadata: {
      url: 'https://ai-chat-platform.vercel.app',
      github: 'https://github.com/theqbitlabs/ai-chat-platform',
      technologies: ['OpenAI', 'WebSocket', 'React', 'Node.js'],
      impact: 'Processing 50K+ messages daily with 99.9% uptime',
      stats: {
        users: 15000,
        performance: '< 2s response time'
      }
    }
  },
  {
    id: '3',
    date: new Date('2024-10-20'),
    title: 'Enterprise Client - Fortune 500 SaaS',
    description: 'Completed a major enterprise project for a Fortune 500 SaaS company, delivering a complete analytics platform with AI-powered insights.',
    type: 'work',
    category: 'career',
    location: 'San Francisco, CA',
    tags: ['Enterprise', 'SaaS', 'Analytics'],
    metadata: {
      company: 'TechCorp Inc.',
      role: 'Lead Full-Stack Developer',
      technologies: ['Next.js', 'Python', 'PostgreSQL', 'AWS', 'AI/ML'],
      impact: 'Increased client retention by 40% and reduced churn by 25%',
      stats: {
        revenue: '$2.5M ARR impact',
        performance: '60% faster than legacy system'
      }
    }
  },
  {
    id: '4',
    date: new Date('2024-09-10'),
    title: 'Open Source Contribution - 1000 GitHub Stars',
    description: 'Quantum Portfolio template reached 1000+ stars on GitHub, becoming one of the most popular portfolio templates in the React community.',
    type: 'achievement',
    category: 'project',
    location: 'Global',
    tags: ['Open Source', 'GitHub', 'Community'],
    metadata: {
      github: 'https://github.com/theqbitlabs/quantum-portfolio',
      technologies: ['React', 'Three.js', 'Framer Motion', 'TypeScript'],
      impact: 'Helping 500+ developers showcase their work',
      stats: {
        users: 500,
        performance: 'Used by developers worldwide'
      }
    }
  },
  {
    id: '5',
    date: new Date('2024-08-15'),
    title: 'Advanced AI Certification',
    description: 'Completed advanced certification in Large Language Models and AI Application Development, specializing in production deployment and scaling.',
    type: 'education',
    category: 'learning',
    location: 'Online',
    tags: ['AI', 'Certification', 'LLM'],
    metadata: {
      technologies: ['OpenAI', 'LangChain', 'Vector Databases', 'Prompt Engineering'],
      impact: 'Enhanced expertise in AI/ML applications'
    }
  },
  {
    id: '6',
    date: new Date('2024-07-01'),
    title: 'Marketplace Launch Success',
    description: 'Launched digital marketplace with $50K+ in sales within the first month. Featuring premium templates, code libraries, and AI tools.',
    type: 'milestone',
    category: 'career',
    location: 'Global',
    tags: ['Marketplace', 'E-commerce', 'Sales'],
    metadata: {
      technologies: ['Next.js', 'Stripe', 'AWS S3', 'PostgreSQL'],
      impact: 'New revenue stream and community engagement',
      stats: {
        revenue: '$50K+ first month',
        users: 200
      }
    }
  },
  {
    id: '7',
    date: new Date('2024-06-10'),
    title: 'Healthcare Mobile App Launch',
    description: 'Deployed comprehensive healthcare mobile application serving 10,000+ healthcare professionals with patient management and telemedicine features.',
    type: 'project',
    category: 'project',
    location: 'Chicago, IL',
    tags: ['Healthcare', 'Mobile', 'Telemedicine'],
    metadata: {
      company: 'MedTech Innovations',
      role: 'Technical Lead',
      technologies: ['React Native', 'Node.js', 'WebRTC', 'HIPAA Compliance'],
      impact: 'Improving healthcare accessibility and efficiency',
      stats: {
        users: 10000,
        performance: '4.8 App Store rating'
      }
    }
  },
  {
    id: '8',
    date: new Date('2024-05-20'),
    title: 'Technical Blog - 10K+ Monthly Readers',
    description: 'Technical blog reached 10,000+ monthly readers with articles on AI development, React patterns, and modern web architecture.',
    type: 'achievement',
    category: 'personal',
    location: 'Global',
    tags: ['Blog', 'Writing', 'Education'],
    metadata: {
      url: 'https://theqbitlabs.com/blog',
      impact: 'Sharing knowledge with the developer community',
      stats: {
        users: 10000,
        performance: 'High engagement rate'
      }
    }
  },
  {
    id: '9',
    date: new Date('2024-04-15'),
    title: 'Kubernetes & DevOps Mastery',
    description: 'Achieved advanced proficiency in Kubernetes, container orchestration, and DevOps practices. Implemented CI/CD pipelines for 20+ projects.',
    type: 'education',
    category: 'learning',
    location: 'Online',
    tags: ['DevOps', 'Kubernetes', 'CI/CD'],
    metadata: {
      technologies: ['Kubernetes', 'Docker', 'Jenkins', 'AWS', 'Terraform'],
      impact: 'Enhanced deployment and scalability capabilities'
    }
  },
  {
    id: '10',
    date: new Date('2024-03-01'),
    title: 'Freelance to Agency Transition',
    description: 'Transitioned from freelance work to establishing a development agency, focusing on AI-powered solutions and enterprise applications.',
    type: 'milestone',
    category: 'career',
    location: 'Remote',
    tags: ['Agency', 'Business', 'Growth'],
    metadata: {
      role: 'Founder & Technical Director',
      impact: 'Scaling operations and team building',
      stats: {
        revenue: '300% growth',
        performance: '5 developers'
      }
    }
  }
]

const eventTypeIcons = {
  achievement: Award,
  project: Rocket,
  education: GraduationCap,
  work: Briefcase,
  personal: Heart,
  milestone: Calendar,
}

const eventTypeColors = {
  achievement: 'from-yellow-500 to-orange-500',
  project: 'from-blue-500 to-cyan-500',
  education: 'from-green-500 to-emerald-500',
  work: 'from-purple-500 to-pink-500',
  personal: 'from-red-500 to-rose-500',
  milestone: 'from-indigo-500 to-purple-500',
}

const categoryColors = {
  career: 'border-blue-500 bg-blue-500/10',
  project: 'border-green-500 bg-green-500/10',
  learning: 'border-purple-500 bg-purple-500/10',
  personal: 'border-pink-500 bg-pink-500/10',
}

export function InteractiveTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const { theme } = useAppStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const categories = [
    { id: 'all', name: 'All Events', count: timelineEvents.length },
    { id: 'career', name: 'Career', count: timelineEvents.filter(e => e.category === 'career').length },
    { id: 'project', name: 'Projects', count: timelineEvents.filter(e => e.category === 'project').length },
    { id: 'learning', name: 'Learning', count: timelineEvents.filter(e => e.category === 'learning').length },
    { id: 'personal', name: 'Personal', count: timelineEvents.filter(e => e.category === 'personal').length },
  ]

  const filteredEvents = filter === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === filter)

  const getEventIcon = (type: TimelineEvent['type']) => {
    const Icon = eventTypeIcons[type]
    return Icon
  }

  const getEventColor = (type: TimelineEvent['type']) => {
    return eventTypeColors[type]
  }

  return (
    <section ref={ref} className="py-20 bg-secondary/10">
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
            Interactive Timeline
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A journey through my professional development, major milestones, and achievements. 
            Click on any event to explore detailed information and related projects.
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
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300',
                filter === category.id
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
              <span>{category.name}</span>
              <span className="text-xs opacity-75">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-full" />

          <div className="space-y-12">
            {filteredEvents.map((event, index) => {
              const Icon = getEventIcon(event.type)
              const colorClass = getEventColor(event.type)
              const isLeft = index % 2 === 0
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={cn(
                    'relative flex items-center',
                    isLeft ? 'justify-start' : 'justify-end'
                  )}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                      onMouseEnter={() => setHoveredEvent(event.id)}
                      onMouseLeave={() => setHoveredEvent(null)}
                      className={cn(
                        'w-16 h-16 rounded-full bg-gradient-to-r flex items-center justify-center cursor-pointer border-4 transition-all duration-300',
                        theme.id === 'quantum' && 'border-white/20 hover:border-white/40',
                        theme.id === 'terminal' && 'border-terminal-green/20 hover:border-terminal-green/40',
                        theme.id === 'minimalist' && 'border-white hover:border-gray-300',
                        theme.id === 'neumorphic' && 'border-gray-200 hover:border-gray-400',
                        theme.id === 'vaporwave' && 'border-white/20 hover:border-white/40',
                        hoveredEvent === event.id && 'shadow-lg'
                      )}
                      style={{
                        boxShadow: hoveredEvent === event.id 
                          ? '0 0 20px rgba(0, 245, 255, 0.5)' 
                          : 'none'
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Event Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={cn(
                      'w-full max-w-md mx-8 p-6 rounded-2xl border cursor-pointer transition-all duration-300',
                      isLeft ? 'mr-auto' : 'ml-auto',
                      theme.id === 'quantum' && 'bg-white/5 border-white/10 hover:border-white/20',
                      theme.id === 'terminal' && 'bg-terminal-bg border-terminal-green/20 hover:border-terminal-green/40',
                      theme.id === 'minimalist' && 'bg-white border border-gray-200 hover:shadow-xl',
                      theme.id === 'neumorphic' && 'neumorphic-card hover:shadow-xl',
                      theme.id === 'vaporwave' && 'glass-dark border border-white/10 hover:border-white/20'
                    )}
                    onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                  >
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className={cn(
                        'w-4 h-4',
                        theme.id === 'quantum' && 'text-cyan-400',
                        theme.id === 'terminal' && 'text-terminal-green',
                        theme.id === 'minimalist' && 'text-gray-500',
                        theme.id === 'neumorphic' && 'text-gray-500',
                        theme.id === 'vaporwave' && 'text-vaporwave-cyan'
                      )} />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(event.date)}
                      </span>
                      {event.location && (
                        <>
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {event.location}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title and Type */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <div className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400',
                        theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green',
                        theme.id === 'minimalist' && 'bg-gray-100 text-gray-700',
                        theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                        theme.id === 'vaporwave' && 'bg-vaporwave-cyan/10 text-vaporwave-cyan'
                      )}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4">
                      {event.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            'px-2 py-1 rounded-md text-xs',
                            theme.id === 'quantum' && 'bg-white/5 text-cyan-300',
                            theme.id === 'terminal' && 'bg-terminal-green/5 text-terminal-green',
                            theme.id === 'minimalist' && 'bg-gray-100 text-gray-600',
                            theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                            theme.id === 'vaporwave' && 'bg-white/5 text-vaporwave-cyan'
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    {event.metadata?.stats && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(event.metadata.stats).map(([key, value]) => (
                          <div key={key} className="text-muted-foreground">
                            <span className="capitalize">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-2 mt-4">
                      {event.metadata?.url && (
                        <motion.a
                          href={event.metadata.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            'flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                            theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20',
                            theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/20',
                            theme.id === 'minimalist' && 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                            theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                            theme.id === 'vaporwave' && 'bg-vaporwave-cyan/10 text-vaporwave-cyan hover:bg-vaporwave-cyan/20'
                          )}
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </motion.a>
                      )}
                      {event.metadata?.github && (
                        <motion.a
                          href={event.metadata.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            'flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                            theme.id === 'quantum' && 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20',
                            theme.id === 'terminal' && 'bg-terminal-amber/10 text-terminal-amber hover:bg-terminal-amber/20',
                            theme.id === 'minimalist' && 'bg-gray-800 text-white hover:bg-gray-800',
                            theme.id === 'neumorphic' && 'bg-gray-600 text-white hover:bg-gray-700',
                            theme.id === 'vaporwave' && 'bg-vaporwave-purple/10 text-vaporwave-purple hover:bg-vaporwave-purple/20'
                          )}
                        >
                          <Github className="w-3 h-3" />
                          Code
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Event Detail Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={cn(
                  'max-w-2xl w-full p-8 rounded-2xl border max-h-[90vh] overflow-y-auto',
                  theme.id === 'quantum' && 'bg-white/10 border-white/20 backdrop-blur-md',
                  theme.id === 'terminal' && 'bg-terminal-bg border-terminal-green/30',
                  theme.id === 'minimalist' && 'bg-white border-gray-200',
                  theme.id === 'neumorphic' && 'neumorphic-card',
                  theme.id === 'vaporwave' && 'glass-dark border-white/10'
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{selectedEvent.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatDate(selectedEvent.date)}</span>
                        {selectedEvent.location && (
                          <>
                            <span>•</span>
                            <span>{selectedEvent.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={cn(
                      'p-3 rounded-xl bg-gradient-to-r',
                      getEventColor(selectedEvent.type)
                    )}>
                      {React.createElement(getEventIcon(selectedEvent.type), { 
                        className: "w-6 h-6 text-white" 
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedEvent.description}
                  </p>

                  {/* Metadata */}
                  {selectedEvent.metadata && (
                    <div className="space-y-4">
                      {selectedEvent.metadata.company && (
                        <div>
                          <h4 className="font-semibold mb-2">Company</h4>
                          <p className="text-muted-foreground">{selectedEvent.metadata.company}</p>
                        </div>
                      )}
                      
                      {selectedEvent.metadata.role && (
                        <div>
                          <h4 className="font-semibold mb-2">Role</h4>
                          <p className="text-muted-foreground">{selectedEvent.metadata.role}</p>
                        </div>
                      )}

                      {selectedEvent.metadata.impact && (
                        <div>
                          <h4 className="font-semibold mb-2">Impact</h4>
                          <p className="text-muted-foreground">{selectedEvent.metadata.impact}</p>
                        </div>
                      )}

                      {selectedEvent.metadata.technologies && (
                        <div>
                          <h4 className="font-semibold mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedEvent.metadata.technologies.map((tech) => (
                              <span
                                key={tech}
                                className={cn(
                                  'px-3 py-1 rounded-lg text-sm',
                                  theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400',
                                  theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green',
                                  theme.id === 'minimalist' && 'bg-gray-100 text-gray-700',
                                  theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                                  theme.id === 'vaporwave' && 'bg-vaporwave-cyan/10 text-vaporwave-cyan'
                                )}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedEvent.metadata.stats && (
                        <div>
                          <h4 className="font-semibold mb-2">Key Metrics</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {Object.entries(selectedEvent.metadata.stats).map(([key, value]) => (
                              <div
                                key={key}
                                className={cn(
                                  'p-3 rounded-lg border',
                                  theme.id === 'quantum' && 'bg-white/5 border-white/10',
                                  theme.id === 'terminal' && 'bg-terminal-green/5 border-terminal-green/20',
                                  theme.id === 'minimalist' && 'bg-gray-50 border-gray-200',
                                  theme.id === 'neumorphic' && 'bg-gray-50 border-gray-200',
                                  theme.id === 'vaporwave' && 'bg-white/5 border-white/10'
                                )}
                              >
                                <div className="text-sm text-muted-foreground capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                                <div className="font-semibold">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <h4 className="font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            'px-3 py-1 rounded-full text-sm',
                            theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400',
                            theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green',
                            theme.id === 'minimalist' && 'bg-gray-100 text-gray-700',
                            theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                            theme.id === 'vaporwave' && 'bg-vaporwave-cyan/10 text-vaporwave-cyan'
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {selectedEvent.metadata?.url && (
                      <motion.a
                        href={selectedEvent.metadata.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors',
                          theme.id === 'quantum' && 'bg-cyan-500 hover:bg-cyan-600 text-white',
                          theme.id === 'terminal' && 'bg-terminal-green hover:bg-opacity-80 text-terminal-bg',
                          theme.id === 'minimalist' && 'bg-minimalist-charcoal hover:bg-opacity-90 text-white',
                          theme.id === 'neumorphic' && 'neumorphic-button text-gray-700',
                          theme.id === 'vaporwave' && 'bg-vaporwave-pink hover:bg-opacity-80 text-white'
                        )}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Project
                      </motion.a>
                    )}
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className={cn(
                        'px-6 py-3 rounded-xl font-medium transition-colors',
                        theme.id === 'quantum' && 'bg-white/10 text-cyan-400 hover:bg-white/20',
                        theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/20',
                        theme.id === 'minimalist' && 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                        theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                        theme.id === 'vaporwave' && 'bg-white/10 text-vaporwave-cyan hover:bg-white/20'
                      )}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
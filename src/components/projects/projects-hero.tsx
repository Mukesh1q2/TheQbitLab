'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ArrowRight, Github, ExternalLink, Play, Star, Eye, Code, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const projectStats = [
  { label: 'Projects Completed', value: '9+', icon: '🚀' },
  { label: 'Happy Clients', value: '15+', icon: '😊' },
  { label: 'Technologies Used', value: '25+', icon: '⚡' },
  { label: 'Success Rate', value: '100%', icon: '⭐' }
]

const featuredProjects = [
  {
    id: 'brahm-ai',
    title: 'Brahm AI — Deep Philosophy',
    description: 'AI framework inspired by Vedic systems simulating higher-order cognition with symbolic AI and neural hybrids.',
    category: 'AI/ML',
    tech: ['Python', 'PyTorch', 'React 19', 'TypeScript', 'Firebase'],
    status: 'Completed',
    rating: 4.9,
    views: 12450
  },
  {
    id: 'synthesis',
    title: 'Synthesis — Cognitive Commons',
    description: 'Revolutionary platform for collaborative decision-making with AI-enhanced reasoning and real-time insights.',
    category: 'AI/ML',
    tech: ['Next.js', 'TypeScript', 'OpenAI API', 'Firebase'],
    status: 'Completed',
    rating: 4.9,
    views: 4210
  },
  {
    id: 'novagen-automation',
    title: 'NovaGen Automation',
    description: 'Premium industrial automation website with AI-powered chatbot using Gemini API and glassmorphism UI.',
    category: 'Web Development',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Gemini API'],
    status: 'Completed',
    rating: 4.8,
    views: 3890
  }
]

const categories = [
  { name: 'All Projects', count: 9, active: true },
  { name: 'AI/ML', count: 5, active: false },
  { name: 'Web Development', count: 3, active: false },
  { name: 'SaaS', count: 1, active: false }
]

export function ProjectsHero() {
  const [selectedCategory, setSelectedCategory] = useState('All Projects')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative py-20 pt-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-primary/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
              />
            ))}
          </div>
        </div>

        {/* Floating Particles */}
        <motion.div
          animate={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.3,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 200 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -0.3,
            y: mousePosition.y * -0.2,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 200 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Portfolio Showcase</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Our
            </span>
            <br />
            <span className="text-foreground">
              Project Portfolio
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Explore our collection of innovative projects spanning AI, web development,
            mobile applications, and cutting-edge technologies.
          </motion.p>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  'px-6 py-3 rounded-xl font-medium transition-all duration-300',
                  selectedCategory === category.name
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted/50 hover:bg-muted border border-muted-foreground/20'
                )}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-70">({category.count})</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Projects Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{project.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{project.views}</span>
                      </div>
                    </div>
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs',
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    )}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {projectStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Have a Project in Mind?</h3>
            <p className="text-muted-foreground mb-6">
              Let's collaborate and bring your vision to life. From concept to deployment,
              we create solutions that make an impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Code className="w-4 h-4" />
                Start a Project
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
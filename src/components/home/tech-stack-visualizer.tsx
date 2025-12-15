'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Text, OrbitControls } from '@react-three/drei'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import { 
  Code, 
  Database, 
  Cloud, 
  Palette, 
  Brain, 
  Shield,
  Smartphone,
  Globe,
  Zap,
  Layers
} from 'lucide-react'
import * as THREE from 'three'

interface TechStack {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'ai' | 'design' | 'devops' | 'mobile'
  level: number // 1-5
  icon: string
  color: string
  position: [number, number, number]
  description: string
  projects: string[]
}

const techStacks: TechStack[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', level: 5, icon: '⚛️', color: '#61DAFB', position: [-3, 2, 0], description: 'Component-based UI library', projects: ['Quantum Portfolio', 'SaaS Dashboard'] },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 5, icon: '▲', color: '#000000', position: [-2, 2.5, 1], description: 'Full-stack React framework', projects: ['AI Chat Platform', 'E-commerce'] },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 5, icon: '📘', color: '#3178C6', position: [-1, 1.8, -1], description: 'Type-safe JavaScript', projects: ['Multiple Projects'] },
  { id: 'vue', name: 'Vue.js', category: 'frontend', level: 4, icon: '💚', color: '#4FC08D', position: [-4, 1.5, 1], description: 'Progressive framework', projects: ['ML Pipeline Studio'] },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', level: 5, icon: '🟢', color: '#339933', position: [3, 2, 0], description: 'JavaScript runtime', projects: ['API Gateway', 'SaaS Backend'] },
  { id: 'python', name: 'Python', category: 'backend', level: 5, icon: '🐍', color: '#3776AB', position: [2, 2.5, 1], description: 'Versatile programming language', projects: ['ML Pipeline', 'Analytics'] },
  { id: 'postgresql', name: 'PostgreSQL', category: 'backend', level: 4, icon: '🐘', color: '#336791', position: [4, 1.8, -1], description: 'Advanced relational database', projects: ['SaaS Platform'] },
  { id: 'mongodb', name: 'MongoDB', category: 'backend', level: 4, icon: '🍃', color: '#47A248', position: [1, 1.5, 1], description: 'NoSQL document database', projects: ['Content Management'] },
  
  // AI/ML
  { id: 'openai', name: 'OpenAI', category: 'ai', level: 5, icon: '🤖', color: '#412991', position: [0, -2, 0], description: 'AI language models', projects: ['AI Chat Platform'] },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai', level: 4, icon: '🧠', color: '#FF6F00', position: [1, -2.5, 1], description: 'Machine learning framework', projects: ['ML Pipeline'] },
  { id: 'pytorch', name: 'PyTorch', category: 'ai', level: 4, icon: '🔥', color: '#EE4C2C', position: [-1, -2.5, -1], description: 'Deep learning framework', projects: ['Computer Vision'] },
  { id: 'langchain', name: 'LangChain', category: 'ai', level: 4, icon: '⛓️', color: '#1C3A3A', position: [0, -1.8, 1], description: 'LLM application framework', projects: ['RAG Systems'] },
  
  // Design
  { id: 'figma', name: 'Figma', category: 'design', level: 4, icon: '🎨', color: '#F24E1E', position: [-3, -1, 0], description: 'Collaborative design tool', projects: ['UI/UX Design'] },
  { id: 'framer', name: 'Framer', category: 'design', level: 4, icon: '⚡', color: '#0055FF', position: [-2, -1.5, 1], description: 'Interactive design tool', projects: ['Landing Pages'] },
  
  // DevOps
  { id: 'aws', name: 'AWS', category: 'devops', level: 4, icon: '☁️', color: '#FF9900', position: [3, -1, 0], description: 'Cloud infrastructure', projects: ['Scalable Deployments'] },
  { id: 'docker', name: 'Docker', category: 'devops', level: 4, icon: '🐳', color: '#2496ED', position: [2, -1.5, -1], description: 'Containerization platform', projects: ['Microservices'] },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', level: 3, icon: '⚙️', color: '#326CE5', position: [4, -1.2, 1], description: 'Container orchestration', projects: ['Production Deployments'] },
  
  // Mobile
  { id: 'react-native', name: 'React Native', category: 'mobile', level: 4, icon: '📱', color: '#20232A', position: [0, 3, 0], description: 'Cross-platform mobile', projects: ['AR Commerce'] },
]

function TechSphere({ tech, isSelected, onClick }: { 
  tech: TechStack
  isSelected: boolean
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + tech.position[0]) * 0.1
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Sphere
      ref={meshRef}
      args={[0.3, 16, 16]}
      position={tech.position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={isSelected ? '#ffffff' : tech.color}
        transparent
        opacity={isSelected ? 1 : 0.8}
        emissive={isSelected ? tech.color : '#000000'}
        emissiveIntensity={isSelected ? 0.2 : 0}
      />
    </Sphere>
  )
}

function OrbitalSystem() {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const [selectedTech, setSelectedTech] = useState<TechStack | null>(null)

  return (
    <group ref={groupRef}>
      {techStacks.map((tech) => (
        <TechSphere
          key={tech.id}
          tech={tech}
          isSelected={selectedTech?.id === tech.id}
          onClick={() => setSelectedTech(selectedTech?.id === tech.id ? null : tech)}
        />
      ))}
    </group>
  )
}

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  ai: 'from-purple-500 to-pink-500',
  design: 'from-orange-500 to-red-500',
  devops: 'from-indigo-500 to-purple-500',
  mobile: 'from-pink-500 to-rose-500',
}

const categoryIcons = {
  frontend: Code,
  backend: Database,
  ai: Brain,
  design: Palette,
  devops: Cloud,
  mobile: Smartphone,
}

export function TechStackVisualizer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTech, setSelectedTech] = useState<TechStack | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useAppStore()
  const ref = useRef(null)
  const inView = useInView(ref)
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const categories = [
    { id: 'all', name: 'All', icon: Layers },
    { id: 'frontend', name: 'Frontend', icon: Code },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'ai', name: 'AI/ML', icon: Brain },
    { id: 'design', name: 'Design', icon: Palette },
    { id: 'devops', name: 'DevOps', icon: Cloud },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
  ]

  const filteredTech = selectedCategory === 'all' 
    ? techStacks 
    : techStacks.filter(tech => tech.category === selectedCategory)

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
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className={cn(
              'text-3xl sm:text-4xl lg:text-5xl font-bold mb-4',
              theme.id === 'quantum' && 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600',
              theme.id === 'terminal' && 'text-terminal-green terminal-glow font-mono',
              theme.id === 'minimalist' && 'text-minimalist-charcoal',
              theme.id === 'neumorphic' && 'text-gray-700',
              theme.id === 'vaporwave' && 'holographic font-display'
            )}
          >
            Tech Stack Visualizer
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Explore my technology arsenal through an interactive 3D visualization. 
            Click on any technology to see detailed information and related projects.
          </motion.p>
        </motion.div>

        {/* 3D Visualization */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-12"
        >
          <motion.div 
            variants={itemVariants}
            className={cn(
              'relative h-96 rounded-2xl overflow-hidden border',
              theme.id === 'quantum' && 'bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border-white/10',
              theme.id === 'terminal' && 'bg-terminal-bg border-terminal-green/20',
              theme.id === 'minimalist' && 'bg-gray-50 border-gray-200',
              theme.id === 'neumorphic' && 'neumorphic-card',
              theme.id === 'vaporwave' && 'glass-dark border-white/10'
            )}
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <OrbitalSystem />
              <OrbitControls 
                enableZoom={true} 
                enablePan={false}
                autoRotate
                autoRotateSpeed={1}
              />
            </Canvas>
            
            {/* Floating UI Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute top-4 left-4 text-sm text-muted-foreground"
                style={{
                  transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                }}
              >
                Drag to rotate • Scroll to zoom
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300',
                  selectedCategory === category.id
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
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="text-xs opacity-75">
                  ({category.id === 'all' ? techStacks.length : techStacks.filter(t => t.category === category.id).length})
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredTech.map((tech, index) => {
            const IconComponent = categoryIcons[tech.category]
            const colorClass = categoryColors[tech.category]
            
            return (
              <motion.div
                key={tech.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                className={cn(
                  'group relative p-6 rounded-2xl cursor-pointer transition-all duration-300',
                  theme.id === 'quantum' && 'bg-white/5 border border-white/10 hover:border-white/20',
                  theme.id === 'terminal' && 'bg-terminal-bg border border-terminal-green/20 hover:border-terminal-green/40',
                  theme.id === 'minimalist' && 'bg-white border border-gray-200 hover:shadow-lg',
                  theme.id === 'neumorphic' && 'neumorphic-card hover:shadow-lg',
                  theme.id === 'vaporwave' && 'glass-dark border border-white/10 hover:border-white/20'
                )}
                onClick={() => setSelectedTech(selectedTech?.id === tech.id ? null : tech)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="text-2xl p-2 rounded-lg"
                    style={{ backgroundColor: `${tech.color}20` }}
                  >
                    {tech.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold group-hover:text-primary transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {tech.category}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Level:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'w-2 h-2 rounded-full',
                          i < tech.level ? 'bg-current' : 'bg-current/20'
                        )}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {tech.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {tech.projects.slice(0, 2).map((project) => (
                    <span
                      key={project}
                      className={cn(
                        'text-xs px-2 py-1 rounded-md',
                        theme.id === 'quantum' && 'bg-white/5 text-cyan-300',
                        theme.id === 'terminal' && 'bg-terminal-green/5 text-terminal-green',
                        theme.id === 'minimalist' && 'bg-gray-100 text-gray-600',
                        theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                        theme.id === 'vaporwave' && 'bg-white/5 text-vaporwave-cyan'
                      )}
                    >
                      {project}
                    </span>
                  ))}
                  {tech.projects.length > 2 && (
                    <span className={cn(
                      'text-xs px-2 py-1 rounded-md',
                      theme.id === 'quantum' && 'bg-white/5 text-cyan-300',
                      theme.id === 'terminal' && 'bg-terminal-green/5 text-terminal-green',
                      theme.id === 'minimalist' && 'bg-gray-100 text-gray-600',
                      theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                      theme.id === 'vaporwave' && 'bg-white/5 text-vaporwave-cyan'
                    )}>
                      +{tech.projects.length - 2}
                    </span>
                  )}
                </div>
                
                {/* Category badge */}
                <div className={cn(
                  'absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-medium',
                  `bg-gradient-to-r ${colorClass} text-white`
                )}>
                  {tech.category}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Tech Detail Modal */}
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTech(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={cn(
                'max-w-lg w-full p-8 rounded-2xl border',
                theme.id === 'quantum' && 'bg-white/10 border-white/20 backdrop-blur-md',
                theme.id === 'terminal' && 'bg-terminal-bg border-terminal-green/30',
                theme.id === 'minimalist' && 'bg-white border-gray-200',
                theme.id === 'neumorphic' && 'neumorphic-card',
                theme.id === 'vaporwave' && 'glass-dark border-white/10'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-6">
                <div 
                  className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${selectedTech.color}20` }}
                >
                  {selectedTech.icon}
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold mb-2">{selectedTech.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedTech.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="text-sm text-muted-foreground">Proficiency:</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div
                          key={i}
                          className={cn(
                            'w-3 h-3 rounded-full',
                            i < selectedTech.level 
                              ? 'bg-green-500' 
                              : 'bg-gray-200 dark:bg-gray-700'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold">
                      {selectedTech.level >= 4 ? 'Expert' : 
                       selectedTech.level >= 3 ? 'Advanced' : 
                       selectedTech.level >= 2 ? 'Intermediate' : 'Beginner'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Related Projects</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedTech.projects.map((project) => (
                      <span
                        key={project}
                        className={cn(
                          'px-3 py-1 rounded-lg text-sm',
                          theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400',
                          theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green',
                          theme.id === 'minimalist' && 'bg-gray-100 text-gray-700',
                          theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                          theme.id === 'vaporwave' && 'bg-vaporwave-cyan/10 text-vaporwave-cyan'
                        )}
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedTech(null)}
                  className={cn(
                    'px-8 py-3 rounded-xl font-medium transition-colors',
                    theme.id === 'quantum' && 'bg-cyan-500 hover:bg-cyan-600 text-white',
                    theme.id === 'terminal' && 'bg-terminal-green hover:bg-opacity-80 text-terminal-bg',
                    theme.id === 'minimalist' && 'bg-minimalist-charcoal hover:bg-opacity-90 text-white',
                    theme.id === 'neumorphic' && 'neumorphic-button text-gray-700',
                    theme.id === 'vaporwave' && 'bg-vaporwave-pink hover:bg-opacity-80 text-white'
                  )}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
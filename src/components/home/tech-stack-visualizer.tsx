'use client'

import { useState, useRef, useEffect, useMemo, Suspense } from 'react'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, OrbitControls, Line, Html, Float } from '@react-three/drei'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import {
  Code,
  Database,
  Cloud,
  Palette,
  Brain,
  Smartphone,
  Layers,
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import * as THREE from 'three'

// =====================================================
// TECH STACK DATA - Single Source of Truth
// =====================================================

interface TechStack {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'ai' | 'design' | 'devops' | 'mobile'
  level: number // 1-5
  icon: string
  color: string
  description: string
  projects: string[]
  connections: string[] // IDs of related technologies
}

const techStacks: TechStack[] = [
  // Languages (My Daily Drivers)
  { id: 'python', name: 'Python', category: 'backend', level: 5, icon: '🐍', color: '#3776AB', description: 'My first love—versatile and powerful', projects: ['Brahm AI', 'VedaQ AI', 'OCR Pipeline'], connections: ['pytorch', 'tensorflow', 'fastapi', 'opencv'] },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', level: 5, icon: '⚡', color: '#F7DF1E', description: 'The language of the web', projects: ['Quantum Playground', 'VedaQ AI'], connections: ['react', 'nodejs', 'typescript'] },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 5, icon: 'TS', color: '#3178C6', description: 'Type-safe JavaScript—because bugs are expensive', projects: ['All Projects'], connections: ['react', 'nextjs', 'nodejs'] },
  { id: 'sql', name: 'SQL', category: 'backend', level: 4, icon: '🗃️', color: '#336791', description: 'Data wrangling at its finest', projects: ['Enterprise Apps'], connections: ['firebase'] },

  // AI Brains
  { id: 'pytorch', name: 'PyTorch', category: 'ai', level: 5, icon: '🔥', color: '#EE4C2C', description: 'Deep learning framework of choice', projects: ['Brahm AI', 'NeuroSymbiotic'], connections: ['python', 'tensorflow', 'opencv'] },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai', level: 4, icon: '🧠', color: '#FF6F00', description: 'Production-ready ML', projects: ['OCR Pipeline'], connections: ['python', 'pytorch'] },
  { id: 'opencv', name: 'OpenCV', category: 'ai', level: 5, icon: '👁️', color: '#5C3EE8', description: 'Computer Vision magic', projects: ['OCR Pipeline', 'Vision Projects'], connections: ['python', 'pytorch', 'vision-transformers'] },
  { id: 'openai', name: 'OpenAI API', category: 'ai', level: 5, icon: '🤖', color: '#10A37F', description: 'LLM integration and beyond', projects: ['VedaQ AI', 'Brahm AI'], connections: ['python', 'langchain'] },
  { id: 'vision-transformers', name: 'Vision Transformers', category: 'ai', level: 5, icon: '🔮', color: '#9B59B6', description: 'State-of-the-art visual AI', projects: ['OCR Pipeline'], connections: ['pytorch', 'opencv'] },
  { id: 'langchain', name: 'LangChain', category: 'ai', level: 4, icon: '⛓️', color: '#1C3A3A', description: 'LLM application framework', projects: ['VedaQ AI'], connections: ['python', 'openai'] },

  // Front-End
  { id: 'react', name: 'React 19', category: 'frontend', level: 5, icon: '⚛️', color: '#61DAFB', description: 'The part you actually see and click', projects: ['Quantum Playground', 'VedaQ AI', 'Brahm AI'], connections: ['nextjs', 'typescript', 'framer-motion', 'tailwind'] },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 5, icon: '▲', color: '#FFFFFF', description: 'Full-stack React framework', projects: ['VedaQ AI', 'TheQbitLabs'], connections: ['react', 'typescript', 'nodejs'] },
  { id: 'tailwind', name: 'TailwindCSS', category: 'design', level: 5, icon: '💨', color: '#06B6D4', description: 'Because life is too short for raw CSS', projects: ['All Frontend Projects'], connections: ['react', 'nextjs'] },
  { id: 'framer-motion', name: 'Framer Motion', category: 'design', level: 4, icon: '🎬', color: '#0055FF', description: 'Smooth animations and micro-interactions', projects: ['Quantum Playground', 'VedaQ AI'], connections: ['react'] },

  // Back-End
  { id: 'firebase', name: 'Firebase', category: 'backend', level: 5, icon: '🔥', color: '#FFCA28', description: 'Real-time database and auth', projects: ['VedaQ AI', 'Brahm AI'], connections: ['react', 'nodejs'] },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', level: 5, icon: '⚡', color: '#009688', description: 'Modern Python web framework', projects: ['OCR Pipeline', 'APIs'], connections: ['python', 'docker'] },
  { id: 'nodejs', name: 'Node.js', category: 'backend', level: 4, icon: '🟢', color: '#339933', description: 'JavaScript runtime', projects: ['Various APIs'], connections: ['typescript', 'express'] },
  { id: 'express', name: 'Express', category: 'backend', level: 4, icon: '🚂', color: '#000000', description: 'Minimalist web framework', projects: ['REST APIs'], connections: ['nodejs', 'typescript'] },

  // DevOps & Cloud
  { id: 'gcp', name: 'GCP', category: 'devops', level: 4, icon: '☁️', color: '#4285F4', description: 'Google Cloud Platform', projects: ['OCR Pipeline', 'Production Deployments'], connections: ['docker', 'firebase'] },
  { id: 'aws', name: 'AWS', category: 'devops', level: 4, icon: '🟠', color: '#FF9900', description: 'Amazon Web Services', projects: ['Enterprise Deployments'], connections: ['docker'] },
  { id: 'docker', name: 'Docker', category: 'devops', level: 4, icon: '🐳', color: '#2496ED', description: 'Containerization for consistency', projects: ['All Production'], connections: ['gcp', 'aws', 'fastapi'] },
]

// Category configuration
const categoryConfig = {
  frontend: { color: '#61DAFB', name: 'Frontend', icon: Code, angle: 0 },
  backend: { color: '#339933', name: 'Backend', icon: Database, angle: 60 },
  ai: { color: '#FF6F00', name: 'AI/ML', icon: Brain, angle: 120 },
  design: { color: '#06B6D4', name: 'Design', icon: Palette, angle: 180 },
  devops: { color: '#FF9900', name: 'DevOps', icon: Cloud, angle: 240 },
  mobile: { color: '#61DAFB', name: 'Mobile', icon: Smartphone, angle: 300 },
}

// =====================================================
// 3D COMPONENTS
// =====================================================

// Single tech node with label
function TechNode({
  tech,
  position,
  isSelected,
  isHighlighted,
  onClick,
  onHover
}: {
  tech: TechStack
  position: [number, number, number]
  isSelected: boolean
  isHighlighted: boolean
  onClick: () => void
  onHover: (hovering: boolean) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const baseScale = isSelected ? 1.4 : isHighlighted ? 1.2 : 1

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1

      // Pulse when selected
      if (isSelected) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05
        meshRef.current.scale.setScalar(baseScale * pulse)
      } else {
        meshRef.current.scale.setScalar(baseScale)
      }
    }
  })

  const handlePointerOver = () => {
    setHovered(true)
    onHover(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    onHover(false)
    document.body.style.cursor = 'auto'
  }

  const nodeOpacity = isHighlighted || isSelected ? 1 : hovered ? 0.9 : 0.7

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        {/* Main sphere */}
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color={tech.color}
            transparent
            opacity={nodeOpacity}
            emissive={tech.color}
            emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0.1}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Glow ring when selected */}
        {isSelected && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 0.55, 32]} />
            <meshBasicMaterial color={tech.color} transparent opacity={0.6} />
          </mesh>
        )}

        {/* Icon/Emoji label */}
        <Html
          position={[0, 0, 0]}
          center
          distanceFactor={8}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            className={cn(
              "text-2xl transition-all duration-300",
              isSelected && "scale-125",
              hovered && "scale-110"
            )}
            style={{ filter: `drop-shadow(0 0 8px ${tech.color})` }}
          >
            {tech.icon.length <= 2 ? tech.icon : tech.icon.charAt(0)}
          </div>
        </Html>

        {/* Tech name label */}
        <Html
          position={[0, -0.6, 0]}
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            className={cn(
              "px-2 py-0.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-300",
              "bg-black/60 backdrop-blur-sm border border-white/20"
            )}
            style={{
              color: tech.color,
              borderColor: `${tech.color}40`,
              opacity: hovered || isSelected || isHighlighted ? 1 : 0.8,
              transform: `scale(${isSelected ? 1.1 : 1})`
            }}
          >
            {tech.name}
          </div>
        </Html>

        {/* Level indicator dots */}
        <Html
          position={[0, -0.9, 0]}
          center
          distanceFactor={12}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: hovered || isSelected ? 1 : 0
          }}
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: i < tech.level ? tech.color : 'rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </div>
        </Html>
      </group>
    </Float>
  )
}

// Connection lines between related technologies
function ConnectionLine({
  start,
  end,
  color,
  isHighlighted
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  isHighlighted: boolean
}) {
  const lineRef = useRef<any>(null)

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = isHighlighted
        ? 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.2
        : 0.15
    }
  })

  return (
    <Line
      ref={lineRef}
      points={[start, end]}
      color={color}
      lineWidth={isHighlighted ? 2 : 1}
      transparent
      opacity={isHighlighted ? 0.6 : 0.15}
      dashed={!isHighlighted}
      dashSize={0.2}
      dashScale={2}
    />
  )
}

// Category ring
function CategoryRing({
  category,
  radius
}: {
  category: keyof typeof categoryConfig
  radius: number
}) {
  const config = categoryConfig[category]
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ))
    }
    return pts
  }, [radius])

  return (
    <Line
      points={points}
      color={config.color}
      lineWidth={0.5}
      transparent
      opacity={0.15}
      dashed
      dashSize={0.3}
      dashScale={3}
    />
  )
}

// Main 3D scene
function TechStackScene({
  selectedTech,
  setSelectedTech,
  hoveredTech,
  setHoveredTech
}: {
  selectedTech: TechStack | null
  setSelectedTech: (tech: TechStack | null) => void
  hoveredTech: string | null
  setHoveredTech: (id: string | null) => void
}) {
  const { camera } = useThree()

  // Calculate positions based on category orbits
  const positions = useMemo(() => {
    const posMap: Record<string, [number, number, number]> = {}
    const categoryGroups: Record<string, TechStack[]> = {}

    // Group by category
    techStacks.forEach(tech => {
      if (!categoryGroups[tech.category]) {
        categoryGroups[tech.category] = []
      }
      categoryGroups[tech.category].push(tech)
    })

    // Position each tech in orbital rings
    Object.entries(categoryGroups).forEach(([category, techs]) => {
      const config = categoryConfig[category as keyof typeof categoryConfig]
      const baseAngle = (config.angle * Math.PI) / 180
      const radius = 3 + Math.random() * 0.5 // Slightly varied radius

      techs.forEach((tech, index) => {
        const angleOffset = (index - (techs.length - 1) / 2) * 0.4
        const angle = baseAngle + angleOffset
        const yOffset = (index % 2) * 0.6 - 0.3 // Stagger heights

        posMap[tech.id] = [
          Math.cos(angle) * radius,
          yOffset,
          Math.sin(angle) * radius
        ]
      })
    })

    return posMap
  }, [])

  // Get connected tech IDs
  const highlightedTechs = useMemo(() => {
    const active = selectedTech?.id || hoveredTech
    if (!active) return new Set<string>()

    const tech = techStacks.find(t => t.id === active)
    if (!tech) return new Set<string>()

    const connected = new Set<string>([active, ...tech.connections])
    return connected
  }, [selectedTech, hoveredTech])

  // Generate connection lines
  const connections = useMemo(() => {
    const lines: { id: string; start: [number, number, number]; end: [number, number, number]; color: string }[] = []
    const processed = new Set<string>()

    techStacks.forEach(tech => {
      tech.connections.forEach(connId => {
        const key = [tech.id, connId].sort().join('-')
        if (!processed.has(key) && positions[connId]) {
          processed.add(key)
          lines.push({
            id: key,
            start: positions[tech.id],
            end: positions[connId],
            color: tech.color
          })
        }
      })
    })

    return lines
  }, [positions])

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

      {/* Category orbital rings */}
      <CategoryRing category="frontend" radius={3.2} />
      <CategoryRing category="backend" radius={3.0} />
      <CategoryRing category="ai" radius={3.4} />

      {/* Connection lines */}
      {connections.map(conn => (
        <ConnectionLine
          key={conn.id}
          start={conn.start}
          end={conn.end}
          color={conn.color}
          isHighlighted={
            highlightedTechs.has(conn.id.split('-')[0]) ||
            highlightedTechs.has(conn.id.split('-')[1])
          }
        />
      ))}

      {/* Tech nodes */}
      {techStacks.map(tech => (
        <TechNode
          key={tech.id}
          tech={tech}
          position={positions[tech.id]}
          isSelected={selectedTech?.id === tech.id}
          isHighlighted={highlightedTechs.has(tech.id)}
          onClick={() => setSelectedTech(selectedTech?.id === tech.id ? null : tech)}
          onHover={(hovering) => setHoveredTech(hovering ? tech.id : null)}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export function TechStackVisualizer() {
  const [selectedTech, setSelectedTech] = useState<TechStack | null>(null)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const { theme } = useAppStore()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  // Filter tech for the side panel
  const filteredTech = selectedCategory === 'all'
    ? techStacks
    : techStacks.filter(tech => tech.category === selectedCategory)

  return (
    <section ref={ref} className="py-20 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">The Stuff I'm Great At</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={cn(
              'text-3xl sm:text-4xl lg:text-5xl font-bold mb-4',
              theme.id === 'quantum' && 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600',
              theme.id === 'terminal' && 'text-terminal-green terminal-glow font-mono',
              theme.id === 'minimalist' && 'text-foreground',
              theme.id === 'neumorphic' && 'text-foreground',
              theme.id === 'vaporwave' && 'holographic font-display'
            )}
          >
            🛠️ The Toolbox
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Python is my first love, but I'm fluent in the whole stack. Click around to see what I use daily—and how everything connects.
          </motion.p>
        </motion.div>

        {/* Main 3D Visualization */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-8"
        >
          <motion.div
            variants={itemVariants}
            className={cn(
              'relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border',
              theme.id === 'quantum' && 'bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 border-white/10',
              theme.id === 'terminal' && 'bg-[#0a0d0a] border-terminal-green/20',
              theme.id === 'minimalist' && 'bg-slate-50 border-border',
              theme.id === 'neumorphic' && 'neumorphic-card bg-slate-100',
              theme.id === 'vaporwave' && 'bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950 border-white/10'
            )}
          >
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-muted-foreground">Loading 3D visualization...</div>
              </div>
            }>
              <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
                <TechStackScene
                  selectedTech={selectedTech}
                  setSelectedTech={setSelectedTech}
                  hoveredTech={hoveredTech}
                  setHoveredTech={setHoveredTech}
                />
              </Canvas>
            </Suspense>

            {/* Instructions overlay */}
            <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/70 flex items-center gap-4">
              <span>🖱️ Drag to rotate</span>
              <span>🔍 Scroll to zoom</span>
              <span>👆 Click nodes for details</span>
            </div>

            {/* Category legend */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(selectedCategory === key ? 'all' : key)}
                  className={cn(
                    "px-2 py-1 rounded-md text-xs font-medium transition-all",
                    "border backdrop-blur-sm",
                    selectedCategory === key
                      ? "bg-white/20 border-white/40"
                      : "bg-black/30 border-white/10 hover:border-white/30"
                  )}
                  style={{
                    color: config.color,
                    borderColor: selectedCategory === key ? config.color : undefined
                  }}
                >
                  {config.name}
                </button>
              ))}
            </div>

            {/* Selected tech quick info */}
            <AnimatePresence>
              {selectedTech && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={cn(
                    "absolute top-4 right-4 w-72 p-4 rounded-xl",
                    "bg-black/60 backdrop-blur-md border border-white/20"
                  )}
                >
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4 text-white/60" />
                  </button>

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="text-3xl p-2 rounded-lg"
                      style={{ backgroundColor: `${selectedTech.color}20` }}
                    >
                      {selectedTech.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{selectedTech.name}</h3>
                      <p className="text-xs capitalize" style={{ color: categoryConfig[selectedTech.category].color }}>
                        {selectedTech.category}
                      </p>
                    </div>
                  </div>

                  {/* Proficiency bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Proficiency</span>
                      <span className="text-white/80">
                        {selectedTech.level >= 5 ? 'Expert' :
                          selectedTech.level >= 4 ? 'Advanced' :
                            selectedTech.level >= 3 ? 'Intermediate' : 'Beginner'}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(selectedTech.level / 5) * 100}%` }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: selectedTech.color }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-white/70 mb-3">{selectedTech.description}</p>

                  {/* Connections */}
                  <div className="mb-3">
                    <p className="text-xs text-white/50 mb-1">Connected to:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTech.connections.map(connId => {
                        const connTech = techStacks.find(t => t.id === connId)
                        return connTech ? (
                          <button
                            key={connId}
                            onClick={() => setSelectedTech(connTech)}
                            className="px-2 py-0.5 text-xs rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                            style={{ color: connTech.color }}
                          >
                            {connTech.name}
                          </button>
                        ) : null
                      })}
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <p className="text-xs text-white/50 mb-1">Used in:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTech.projects.map(project => (
                        <span
                          key={project}
                          className="px-2 py-0.5 text-xs rounded-md bg-primary/20 text-primary"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Category Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {Object.entries(categoryConfig).map(([key, config]) => {
            const count = techStacks.filter(t => t.category === key).length
            const IconComponent = config.icon
            return (
              <motion.div
                key={key}
                variants={itemVariants}
                onClick={() => setSelectedCategory(selectedCategory === key ? 'all' : key)}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all",
                  "hover:scale-105 hover:shadow-lg",
                  selectedCategory === key && "ring-2",
                  theme.id === 'quantum' && 'bg-white/5 border-white/10 hover:border-white/20',
                  theme.id === 'terminal' && 'bg-terminal-green/5 border-terminal-green/20 hover:border-terminal-green/40',
                  theme.id === 'minimalist' && 'bg-card border-border hover:border-primary/50',
                  theme.id === 'neumorphic' && 'neumorphic-card',
                  theme.id === 'vaporwave' && 'bg-white/5 border-white/10 hover:border-white/20'
                )}
                style={{
                  borderColor: selectedCategory === key ? config.color : undefined,
                  boxShadow: selectedCategory === key ? `0 0 20px ${config.color}30` : undefined
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <IconComponent className="w-5 h-5" style={{ color: config.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{config.name}</p>
                    <p className="text-xs text-muted-foreground">{count} technologies</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
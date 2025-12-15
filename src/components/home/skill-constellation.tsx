'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'

interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'ai' | 'design' | 'tools'
  level: number
  color: string
  icon?: string
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 5, color: '#61DAFB', icon: '⚛️' },
  { name: 'Next.js', category: 'frontend', level: 5, color: '#000000', icon: '▲' },
  { name: 'TypeScript', category: 'frontend', level: 5, color: '#3178C6', icon: '📘' },
  { name: 'Vue.js', category: 'frontend', level: 4, color: '#4FC08D', icon: '💚' },
  { name: 'Svelte', category: 'frontend', level: 3, color: '#FF3E00', icon: '🔥' },
  // Backend
  { name: 'Node.js', category: 'backend', level: 5, color: '#339933', icon: '💚' },
  { name: 'Python', category: 'backend', level: 5, color: '#3776AB', icon: '🐍' },
  { name: 'PostgreSQL', category: 'backend', level: 4, color: '#336791', icon: '🐘' },
  { name: 'MongoDB', category: 'backend', level: 4, color: '#47A248', icon: '🍃' },
  { name: 'GraphQL', category: 'backend', level: 4, color: '#E10098', icon: '◇' },
  // AI/ML
  { name: 'OpenAI', category: 'ai', level: 5, color: '#412991', icon: '🤖' },
  { name: 'LangChain', category: 'ai', level: 4, color: '#1C3A3A', icon: '🔗' },
  { name: 'TensorFlow', category: 'ai', level: 4, color: '#FF6F00', icon: '🧠' },
  { name: 'Hugging Face', category: 'ai', level: 4, color: '#FFD21E', icon: '🤗' },
  // Design
  { name: 'Figma', category: 'design', level: 4, color: '#F24E1E', icon: '🎨' },
  { name: 'Framer', category: 'design', level: 4, color: '#0055FF', icon: '✨' },
  // Tools
  { name: 'Docker', category: 'tools', level: 4, color: '#2496ED', icon: '🐳' },
  { name: 'AWS', category: 'tools', level: 4, color: '#FF9900', icon: '☁️' },
]

const categoryColors = {
  frontend: '#61DAFB',
  backend: '#339933',
  ai: '#412991',
  design: '#F24E1E',
  tools: '#2496ED',
}

export function SkillConstellation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const { theme, customization } = useAppStore()

  // Calculate skill positions in an orbital pattern
  const getSkillPosition = useCallback((index: number, total: number, time: number) => {
    const rings = 3
    const ring = Math.floor(index / (total / rings))
    const ringIndex = index % Math.ceil(total / rings)
    const ringTotal = Math.ceil(total / rings)

    const baseAngle = (ringIndex / ringTotal) * Math.PI * 2
    const radius = 120 + ring * 80
    const speed = 0.0005 * (ring + 1)
    const angle = baseAngle + time * speed

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.5,
      z: Math.sin(angle) * 0.3 + ring * 0.2,
    }
  }, [])

  // Mouse tracking for cursor effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    })
  }, [])

  // Don't render if disabled - check AFTER all hooks
  if (!customization?.showSkillConstellation) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto h-[500px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Center glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-24 h-24 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            background: `radial-gradient(circle, ${theme.colors.accent}40, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
      </div>

      {/* Cursor glow effect */}
      {customization.cursorEffects && isHovering && (
        <motion.div
          className="absolute pointer-events-none"
          animate={{
            x: mousePos.x + 200 - 75,
            y: mousePos.y + 250 - 75,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          style={{
            width: 150,
            height: 150,
            background: `radial-gradient(circle, ${theme.colors.accent}30, transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />
      )}

      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme.colors.secondary} stopOpacity="0.3" />
            <stop offset="50%" stopColor={theme.colors.accent} stopOpacity="0.5" />
            <stop offset="100%" stopColor={theme.colors.secondary} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Connection lines to center */}
        {skills.slice(0, 8).map((skill, i) => {
          const pos = getSkillPosition(i, skills.length, Date.now())
          return (
            <motion.line
              key={`line-${skill.name}`}
              x1="50%"
              y1="50%"
              x2={`${50 + (pos.x / 400) * 100}%`}
              y2={`${50 + (pos.y / 250) * 100}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              opacity={0.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            />
          )
        })}
      </svg>

      {/* Skill badges */}
      {skills.map((skill, index) => {
        const pos = getSkillPosition(index, skills.length, Date.now())
        const isHovered = hoveredSkill === skill.name
        const distToMouse = Math.hypot(
          (50 + (pos.x / 400) * 100) * 4 - (mousePos.x + 200),
          (50 + (pos.y / 250) * 100) * 5 - (mousePos.y + 250)
        )
        // Use badgeFollowCursor setting for badge movement
        const attraction = customization?.badgeFollowCursor && isHovering
          ? Math.max(0, 1 - distToMouse / 200) * 20
          : 0

        return (
          <motion.div
            key={skill.name}
            className="absolute cursor-pointer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: 200 + pos.x + (attraction * (mousePos.x / 200)),
              y: 250 + pos.y + (attraction * (mousePos.y / 250)),
              zIndex: isHovered ? 50 : Math.round(pos.z * 10),
            }}
            transition={{
              scale: { delay: index * 0.03, duration: 0.3 },
              opacity: { delay: index * 0.03, duration: 0.3 },
              x: { type: 'spring', damping: 20, stiffness: 150 },
              y: { type: 'spring', damping: 20, stiffness: 150 },
            }}
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => setSelectedSkill(skill)}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 2, opacity: [0, 0.5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  background: `radial-gradient(circle, ${skill.color}50, transparent 70%)`,
                }}
              />
            )}

            {/* Badge */}
            <div
              className={cn(
                'relative px-3 py-2 rounded-full backdrop-blur-md border transition-all duration-200',
                'flex items-center gap-2 whitespace-nowrap',
                isHovered ? 'shadow-lg' : '',
                theme.id === 'quantum' && 'bg-white/10 border-white/20',
                theme.id === 'terminal' && 'bg-black/80 border-green-500/50',
                theme.id === 'minimalist' && 'bg-white border-gray-200',
                theme.id === 'neumorphic' && 'bg-white/90 border-white/50',
                theme.id === 'vaporwave' && 'bg-black/50 border-pink-500/30'
              )}
              style={{
                boxShadow: isHovered ? `0 0 20px ${skill.color}50` : 'none',
              }}
            >
              <span className="text-sm">{skill.icon}</span>
              <span
                className="text-xs font-semibold"
                style={{ color: skill.color }}
              >
                {skill.name}
              </span>

              {/* Level dots */}
              <div className="flex gap-0.5 ml-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      i < skill.level ? 'opacity-100' : 'opacity-20'
                    )}
                    style={{ backgroundColor: skill.color }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Skill detail modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={cn(
                'max-w-sm p-6 rounded-2xl border shadow-xl',
                'bg-card text-card-foreground'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${selectedSkill.color}20` }}
                >
                  {selectedSkill.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedSkill.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {selectedSkill.category}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="h-2 flex-1 rounded-full"
                    style={{
                      backgroundColor: i < selectedSkill.level
                        ? selectedSkill.color
                        : `${selectedSkill.color}30`,
                    }}
                  />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {selectedSkill.level === 5 && 'Expert level - Production-ready, can mentor others'}
                {selectedSkill.level === 4 && 'Advanced - Extensive hands-on experience'}
                {selectedSkill.level === 3 && 'Intermediate - Comfortable with core concepts'}
                {selectedSkill.level <= 2 && 'Learning - Actively developing this skill'}
              </p>

              <button
                onClick={() => setSelectedSkill(null)}
                className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 text-xs">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-muted-foreground capitalize">{category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
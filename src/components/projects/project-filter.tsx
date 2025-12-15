'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const filters = [
  { id: 'all', label: 'All Projects', count: 50 },
  { id: 'ai-ml', label: 'AI/ML', count: 15 },
  { id: 'web', label: 'Web Development', count: 20 },
  { id: 'mobile', label: 'Mobile Apps', count: 8 },
  { id: 'blockchain', label: 'Blockchain', count: 7 }
]

export function ProjectFilter() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
        >
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  'px-6 py-3 rounded-xl font-medium transition-all duration-300',
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background hover:bg-muted border border-muted-foreground/20'
                )}
              >
                {filter.label}
                <span className="ml-2 text-xs opacity-70">({filter.count})</span>
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-muted-foreground/20 bg-background hover:bg-muted/50 transition-all duration-300 lg:hidden"
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
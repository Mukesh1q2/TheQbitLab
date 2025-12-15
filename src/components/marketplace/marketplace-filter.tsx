'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, ChevronDown, Star, Download, Calendar, Tag, DollarSign, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
  id: string
  name: string
  count?: number
  value?: string | number
}

interface FilterGroup {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  options: FilterOption[]
  type: 'single' | 'multiple' | 'range'
}

const filterGroups: FilterGroup[] = [
  {
    id: 'category',
    name: 'Category',
    icon: Tag,
    type: 'single',
    options: [
      { id: 'all', name: 'All Categories', count: 500 },
      { id: 'ai-ml', name: 'AI/ML Templates', count: 150 },
      { id: 'web-components', name: 'Web Components', count: 200 },
      { id: 'mobile-apps', name: 'Mobile Apps', count: 75 },
      { id: 'dashboard', name: 'Dashboard Kits', count: 100 },
      { id: 'ecommerce', name: 'E-commerce', count: 60 },
      { id: 'landing-pages', name: 'Landing Pages', count: 80 }
    ]
  },
  {
    id: 'price',
    name: 'Price Range',
    icon: DollarSign,
    type: 'multiple',
    options: [
      { id: 'free', name: 'Free', count: 120 },
      { id: 'under-50', name: 'Under $50', count: 200 },
      { id: '50-100', name: '$50 - $100', count: 100 },
      { id: '100-200', name: '$100 - $200', count: 50 },
      { id: 'over-200', name: 'Over $200', count: 30 }
    ]
  },
  {
    id: 'rating',
    name: 'Rating',
    icon: Star,
    type: 'multiple',
    options: [
      { id: '5-star', name: '5 Stars', count: 180 },
      { id: '4-star', name: '4+ Stars', count: 250 },
      { id: '3-star', name: '3+ Stars', count: 320 },
      { id: '2-star', name: '2+ Stars', count: 450 }
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: Tag,
    type: 'multiple',
    options: [
      { id: 'react', name: 'React', count: 180 },
      { id: 'nextjs', name: 'Next.js', count: 120 },
      { id: 'vue', name: 'Vue.js', count: 80 },
      { id: 'angular', name: 'Angular', count: 60 },
      { id: 'svelte', name: 'Svelte', count: 40 },
      { id: 'typescript', name: 'TypeScript', count: 150 }
    ]
  },
  {
    id: 'date',
    name: 'Release Date',
    icon: Calendar,
    type: 'single',
    options: [
      { id: 'all-time', name: 'All Time', count: 500 },
      { id: 'last-month', name: 'Last Month', count: 50 },
      { id: 'last-3-months', name: 'Last 3 Months', count: 120 },
      { id: 'last-6-months', name: 'Last 6 Months', count: 200 },
      { id: 'last-year', name: 'Last Year', count: 350 }
    ]
  },
  {
    id: 'popularity',
    name: 'Popularity',
    icon: Users,
    type: 'multiple',
    options: [
      { id: 'trending', name: 'Trending', count: 80 },
      { id: 'bestsellers', name: 'Best Sellers', count: 100 },
      { id: 'most-downloaded', name: 'Most Downloaded', count: 150 },
      { id: 'new-releases', name: 'New Releases', count: 70 }
    ]
  }
]

interface MarketplaceFiltersProps {
  onFilterChange: (filters: Record<string, string[]>) => void
  isOpen: boolean
  onToggle: () => void
}

export function MarketplaceFilter({ onFilterChange, isOpen, onToggle }: MarketplaceFiltersProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['category']))
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: ['all'],
    price: [],
    rating: [],
    technology: [],
    date: ['all-time'],
    popularity: []
  })

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId)
    } else {
      newExpanded.add(groupId)
    }
    setExpandedGroups(newExpanded)
  }

  const handleFilterChange = (groupId: string, optionId: string, type: 'single' | 'multiple') => {
    const newFilters = { ...selectedFilters }
    
    if (type === 'single') {
      newFilters[groupId] = [optionId]
    } else {
      const current = newFilters[groupId] || []
      if (current.includes(optionId)) {
        newFilters[groupId] = current.filter(id => id !== optionId)
      } else {
        newFilters[groupId] = [...current, optionId]
      }
    }
    
    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters: Record<string, string[]> = {
      category: ['all'],
      price: [],
      rating: [],
      technology: [],
      date: ['all-time'],
      popularity: []
    }
    setSelectedFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const activeFilterCount = Object.values(selectedFilters).reduce((count, filters) => {
    return count + filters.filter(filter => filter !== 'all').length
  }, 0)

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggle}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-muted-foreground/20 bg-background hover:bg-muted/50 transition-all duration-300"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-auto px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
              {activeFilterCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={onToggle}
            />
            
            {/* Filter Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:sticky lg:top-6 w-full lg:w-80 h-fit bg-background/95 backdrop-blur-sm border border-muted-foreground/20 rounded-2xl p-6 shadow-xl lg:shadow-none"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearAllFilters}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Clear All
                  </motion.button>
                  <button
                    onClick={onToggle}
                    className="lg:hidden p-1 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Filter Groups */}
              <div className="space-y-4">
                {filterGroups.map((group) => {
                  const IconComponent = group.icon
                  const isExpanded = expandedGroups.has(group.id)
                  
                  return (
                    <div key={group.id} className="border-b border-muted-foreground/10 pb-4 last:border-b-0">
                      <motion.button
                        onClick={() => toggleGroup(group.id)}
                        className="flex items-center justify-between w-full p-2 -m-2 rounded-lg hover:bg-muted/50 transition-colors"
                        whileHover={{ backgroundColor: 'rgba(var(--muted), 0.5)' }}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-primary" />
                          <span className="font-medium">{group.name}</span>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 space-y-2 pl-6">
                              {group.options.map((option) => {
                                const isSelected = selectedFilters[group.id]?.includes(option.id)
                                
                                return (
                                  <motion.label
                                    key={option.id}
                                    className="flex items-center justify-between cursor-pointer group"
                                    whileHover={{ x: 2 }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="relative">
                                        <input
                                          type={group.type === 'single' ? 'radio' : 'checkbox'}
                                          checked={isSelected}
                                          onChange={() => handleFilterChange(group.id, option.id, group.type === 'range' ? 'multiple' : group.type)}
                                          className="sr-only"
                                        />
                                        <div className={cn(
                                          'w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200',
                                          isSelected
                                            ? 'bg-primary border-primary'
                                            : 'border-muted-foreground/30 group-hover:border-primary/50'
                                        )}>
                                          {isSelected && (
                                            <motion.div
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              exit={{ scale: 0 }}
                                              transition={{ duration: 0.2 }}
                                            >
                                              {group.type === 'single' ? (
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                              ) : (
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                              )}
                                            </motion.div>
                                          )}
                                        </div>
                                      </div>
                                      <span className={cn(
                                        'text-sm transition-colors',
                                        isSelected ? 'text-primary font-medium' : 'text-muted-foreground group-hover:text-foreground'
                                      )}>
                                        {option.name}
                                      </span>
                                    </div>
                                    {option.count && (
                                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                                        {option.count}
                                      </span>
                                    )}
                                  </motion.label>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Apply Filters Button (Mobile) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onToggle}
                className="lg:hidden w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300"
              >
                Apply Filters
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
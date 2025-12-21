'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'
import {
  Github,
  Twitter,
  ExternalLink,
  Star,
  GitFork,
  Eye,
  MessageCircle,
  Heart,
  Bookmark,
  Download,
  ShoppingCart,
  Code,
  Zap,
  RefreshCw
} from 'lucide-react'

interface Activity {
  id: string
  type: 'github' | 'twitter' | 'blog' | 'project' | 'sale' | 'achievement'
  title: string
  description: string
  timestamp: Date
  metadata?: {
    url?: string
    stats?: {
      stars?: number
      forks?: number
      views?: number
      likes?: number
      comments?: number
    }
    image?: string
    tags?: string[]
  }
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'github',
    title: 'Pushed commits to ai-chat-platform',
    description: 'Added real-time streaming support and improved error handling',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    metadata: {
      url: 'https://github.com/theqbitlabs/ai-chat-platform',
      stats: { stars: 1247, forks: 234, views: 15670 },
      tags: ['OpenAI', 'WebSocket', 'React']
    }
  },
  {
    id: '2',
    type: 'sale',
    title: 'New marketplace sale',
    description: 'Sold "Quantum Dashboard Template" to a startup in Berlin',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    metadata: {
      tags: ['Template', 'Dashboard', 'React']
    }
  },
  {
    id: '3',
    type: 'twitter',
    title: 'Shared insights on AI development',
    description: 'Thread about building production-ready LLM applications',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    metadata: {
      url: 'https://twitter.com/theqbitlabs/status/123',
      stats: { likes: 89, comments: 23 },
      tags: ['AI', 'LLM', 'Development']
    }
  },
  {
    id: '4',
    type: 'project',
    title: 'Deployed new client project',
    description: 'E-commerce platform for sustainable fashion brand went live',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    metadata: {
      url: 'https://sustainable-fashion.com',
      tags: ['E-commerce', 'Next.js', 'Stripe']
    }
  },
  {
    id: '5',
    type: 'blog',
    title: 'Published new article',
    description: 'Building Scalable AI Applications with Next.js and OpenAI',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    metadata: {
      url: 'https://theqbitlabs.com/blog/scalable-ai-applications',
      stats: { views: 1247, likes: 67, comments: 12 },
      tags: ['AI', 'Next.js', 'Tutorial']
    }
  },
  {
    id: '6',
    type: 'achievement',
    title: 'Reached 1000 GitHub stars',
    description: 'Quantum Portfolio template milestone celebration! 🎉',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    metadata: {
      tags: ['Milestone', 'Open Source', 'Celebration']
    }
  },
  {
    id: '7',
    type: 'github',
    title: 'Released v2.0 of ml-pipeline-studio',
    description: 'Major update with drag-and-drop interface and autoML features',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    metadata: {
      url: 'https://github.com/theqbitlabs/ml-pipeline-studio',
      stats: { stars: 567, forks: 89, views: 4521 },
      tags: ['Machine Learning', 'Vue.js', 'Python']
    }
  },
  {
    id: '8',
    type: 'sale',
    title: 'Bulk license purchase',
    description: 'Enterprise license for design system purchased by Fortune 500 company',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 1 day 3 hours ago
    metadata: {
      tags: ['Enterprise', 'Design System', 'License']
    }
  }
]

const activityIcons = {
  github: Github,
  twitter: Twitter,
  blog: ExternalLink,
  project: Code,
  sale: ShoppingCart,
  achievement: Star,
}

const activityColors = {
  github: 'from-gray-600 to-gray-800',
  twitter: 'from-blue-400 to-blue-600',
  blog: 'from-green-500 to-green-700',
  project: 'from-purple-500 to-purple-700',
  sale: 'from-yellow-500 to-yellow-700',
  achievement: 'from-pink-500 to-pink-700',
}

export function LiveActivityFeed() {
  const [displayedActivities, setDisplayedActivities] = useState<Activity[]>([])
  const [isRealTime, setIsRealTime] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const { theme } = useAppStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Shuffle and get 5 random activities
  const getRandomActivities = () => {
    const shuffled = [...activities].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }

  useEffect(() => {
    // Show initial 5 activities
    setDisplayedActivities(getRandomActivities())
  }, [])

  // Auto-refresh every 24 hours
  useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(() => {
      setDisplayedActivities(getRandomActivities())
      setLastRefresh(new Date())
    }, 86400000) // Refresh every 24 hours

    return () => clearInterval(interval)
  }, [isRealTime])

  // Manual refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setDisplayedActivities(getRandomActivities())
      setLastRefresh(new Date())
      setIsRefreshing(false)
    }, 500)
  }

  const getActivityIcon = (type: Activity['type']) => {
    const Icon = activityIcons[type]
    return Icon
  }

  const getActivityColor = (type: Activity['type']) => {
    return activityColors[type]
  }

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className={cn(
              'text-3xl sm:text-4xl lg:text-5xl font-bold',
              theme.id === 'quantum' && 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600',
              theme.id === 'terminal' && 'text-terminal-green terminal-glow font-mono',
              theme.id === 'minimalist' && 'text-minimalist-charcoal',
              theme.id === 'neumorphic' && 'text-gray-700',
              theme.id === 'vaporwave' && 'holographic font-display'
            )}>
              Live Activity Feed
            </h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={cn(
                'w-3 h-3 rounded-full',
                theme.id === 'quantum' && 'bg-green-400',
                theme.id === 'terminal' && 'bg-terminal-green',
                theme.id === 'minimalist' && 'bg-green-500',
                theme.id === 'neumorphic' && 'bg-green-500',
                theme.id === 'vaporwave' && 'bg-green-400'
              )}
            />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Real-time updates from my development journey, including GitHub activity,
            project deployments, client work, and marketplace sales.
          </p>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300',
                theme.id === 'quantum' && 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30',
                theme.id === 'terminal' && 'bg-terminal-green/20 text-terminal-green border border-terminal-green/30',
                theme.id === 'minimalist' && 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200',
                theme.id === 'neumorphic' && 'bg-blue-100 text-blue-600 border border-blue-200',
                theme.id === 'vaporwave' && 'bg-vaporwave-cyan/20 text-vaporwave-cyan border border-vaporwave-cyan/30'
              )}
            >
              <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
              Refresh
            </motion.button>

            {/* Real-time Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRealTime(!isRealTime)}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300',
                isRealTime
                  ? theme.id === 'quantum' && 'bg-green-500/20 text-green-400 border border-green-500/30'
                  || theme.id === 'terminal' && 'bg-terminal-green/20 text-terminal-green border border-terminal-green/30'
                  || theme.id === 'minimalist' && 'bg-green-100 text-green-700 border border-green-200'
                  || theme.id === 'neumorphic' && 'bg-green-100 text-green-600 border border-green-200'
                  || theme.id === 'vaporwave' && 'bg-green-400/20 text-green-400 border border-green-400/30'
                  : theme.id === 'quantum' && 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  || theme.id === 'terminal' && 'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                  || theme.id === 'minimalist' && 'bg-gray-100 text-gray-500 border border-gray-200'
                  || theme.id === 'neumorphic' && 'bg-gray-100 text-gray-500 border border-gray-200'
                  || theme.id === 'vaporwave' && 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              )}
            >
              <div className={cn(
                'w-2 h-2 rounded-full',
                isRealTime ? 'bg-current animate-pulse' : 'bg-current/50'
              )} />
              {isRealTime ? 'Auto-Refresh (24h)' : 'Auto-Refresh Off'}
            </motion.button>
          </div>

          {/* Last Refresh Time */}
          <p className="text-xs text-muted-foreground mt-3" suppressHydrationWarning>
            Last updated: {lastRefresh.toLocaleString()}
          </p>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {displayedActivities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type)
                const colorClass = getActivityColor(activity.type)

                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={cn(
                      'group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer',
                      theme.id === 'quantum' && 'bg-white/5 border-white/10 hover:border-white/20',
                      theme.id === 'terminal' && 'bg-terminal-bg border-terminal-green/20 hover:border-terminal-green/40',
                      theme.id === 'minimalist' && 'bg-white border border-gray-200 hover:shadow-lg',
                      theme.id === 'neumorphic' && 'neumorphic-card hover:shadow-lg',
                      theme.id === 'vaporwave' && 'glass-dark border border-white/10 hover:border-white/20'
                    )}
                  >
                    {/* Activity Type Icon */}
                    <div className="absolute left-6 top-6">
                      <div className={cn(
                        'p-3 rounded-xl bg-gradient-to-r',
                        colorClass
                      )}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="ml-20">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {activity.title}
                        </h3>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {formatRelativeTime(activity.timestamp)}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">
                        {activity.description}
                      </p>

                      {/* Stats */}
                      {activity.metadata?.stats && (
                        <div className="flex items-center gap-4 mb-4">
                          {activity.metadata.stats.stars && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="w-4 h-4" />
                              <span>{activity.metadata.stats.stars}</span>
                            </div>
                          )}
                          {activity.metadata.stats.forks && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <GitFork className="w-4 h-4" />
                              <span>{activity.metadata.stats.forks}</span>
                            </div>
                          )}
                          {activity.metadata.stats.views && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Eye className="w-4 h-4" />
                              <span>{activity.metadata.stats.views}</span>
                            </div>
                          )}
                          {activity.metadata.stats.likes && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Heart className="w-4 h-4" />
                              <span>{activity.metadata.stats.likes}</span>
                            </div>
                          )}
                          {activity.metadata.stats.comments && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MessageCircle className="w-4 h-4" />
                              <span>{activity.metadata.stats.comments}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tags */}
                      {activity.metadata?.tags && (
                        <div className="flex flex-wrap gap-2">
                          {activity.metadata.tags.map((tag) => (
                            <span
                              key={tag}
                              className={cn(
                                'px-3 py-1 rounded-full text-xs font-medium',
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
                      )}

                      {/* Action Button */}
                      {activity.metadata?.url && (
                        <motion.a
                          href={activity.metadata.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            'inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                            theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20',
                            theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/20',
                            theme.id === 'minimalist' && 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                            theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                            theme.id === 'vaporwave' && 'bg-vaporwave-cyan/10 text-vaporwave-cyan hover:bg-vaporwave-cyan/20'
                          )}
                        >
                          View Details
                          <ExternalLink className="w-3 h-3" />
                        </motion.a>
                      )}
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className={cn(
                        'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 rounded-2xl pointer-events-none transition-opacity duration-300',
                        colorClass
                      )}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-8 py-4 rounded-xl font-semibold transition-all duration-300',
                theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg',
                theme.id === 'terminal' && 'bg-terminal-green text-terminal-bg hover:bg-opacity-80',
                theme.id === 'minimalist' && 'bg-minimalist-charcoal text-white hover:bg-opacity-90',
                theme.id === 'neumorphic' && 'neumorphic-button text-gray-700 hover:shadow-lg',
                theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-pink to-vaporwave-purple text-white hover:shadow-lg'
              )}
            >
              Load More Activities
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Activity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Commits This Week', value: '47', icon: Code, color: 'text-blue-500' },
            { label: 'Projects Deployed', value: '12', icon: Zap, color: 'text-green-500' },
            { label: 'Sales This Month', value: '$8.5K', icon: ShoppingCart, color: 'text-yellow-500' },
            { label: 'Community Stars', value: '2.1K', icon: Star, color: 'text-purple-500' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'text-center p-6 rounded-xl border',
                theme.id === 'quantum' && 'bg-white/5 border-white/10',
                theme.id === 'terminal' && 'bg-terminal-bg border-terminal-green/20',
                theme.id === 'minimalist' && 'bg-white border-gray-200',
                theme.id === 'neumorphic' && 'neumorphic-card',
                theme.id === 'vaporwave' && 'glass-dark border-white/10'
              )}
            >
              <stat.icon className={cn('w-8 h-8 mx-auto mb-3', stat.color)} />
              <div className={cn(
                'text-2xl font-bold mb-1',
                theme.id === 'quantum' && 'text-cyan-400',
                theme.id === 'terminal' && 'text-terminal-green',
                theme.id === 'minimalist' && 'text-minimalist-charcoal',
                theme.id === 'neumorphic' && 'text-gray-700',
                theme.id === 'vaporwave' && 'text-vaporwave-cyan'
              )}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { BarChart3, Zap, Clock } from 'lucide-react'

const stats = [
  { label: 'Tokens Used', value: '1.2K', icon: BarChart3, color: 'text-blue-500' },
  { label: 'Requests', value: '45', icon: Zap, color: 'text-green-500' },
  { label: 'Time Spent', value: '2.5h', icon: Clock, color: 'text-purple-500' }
]

export function UsageStats() {
  return (
    <div className="bg-background rounded-2xl p-6 border border-muted-foreground/20 mt-6">
      <h3 className="font-semibold mb-4">Usage Statistics</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
            >
              <IconComponent className={`w-5 h-5 ${stat.color}`} />
              <div>
                <div className="font-medium">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
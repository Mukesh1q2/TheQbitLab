'use client'

import { motion } from 'framer-motion'
import { Key, Copy, ExternalLink } from 'lucide-react'

export function APIAccess() {
  const apiKey = 'sk-proj-example123456789abcdef...'

  return (
    <div className="bg-background rounded-2xl p-6 border border-muted-foreground/20 mt-6">
      <h3 className="font-semibold mb-4">API Access</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">API Key</label>
          <div className="flex items-center gap-2">
            <input
              value={apiKey}
              readOnly
              className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-muted-foreground/20 text-sm font-mono"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-primary text-primary-foreground"
            >
              <Copy className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
          >
            View Docs
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Try API
          </motion.button>
        </div>
      </div>
    </div>
  )
}
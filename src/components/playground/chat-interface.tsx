'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'

export function ChatInterface() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) return
    setLoading(true)
    // Simulate API call
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="bg-background rounded-2xl border border-muted-foreground/20 overflow-hidden">
      <div className="p-6 border-b border-muted-foreground/20">
        <h3 className="font-semibold">Chat Interface</h3>
      </div>
      
      <div className="h-96 p-6 overflow-y-auto">
        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-lg">
            <div className="text-sm">Hello! How can I help you today?</div>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-t border-muted-foreground/20">
        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-xl border border-muted-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
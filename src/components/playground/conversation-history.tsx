'use client'

import { motion } from 'framer-motion'
import { Clock, MessageSquare } from 'lucide-react'

const conversations = [
  { id: 1, title: 'Creative Writing Session', time: '2 hours ago', messages: 15 },
  { id: 2, title: 'Code Review Discussion', time: '1 day ago', messages: 8 },
  { id: 3, title: 'Data Analysis Help', time: '3 days ago', messages: 12 }
]

export function ConversationHistory() {
  return (
    <div className="bg-background rounded-2xl p-6 border border-muted-foreground/20 mt-6">
      <h3 className="font-semibold mb-4">Conversation History</h3>
      <div className="space-y-3">
        {conversations.map((conv) => (
          <motion.div
            key={conv.id}
            whileHover={{ scale: 1.02 }}
            className="p-3 rounded-xl bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-primary" />
              <div className="font-medium text-sm">{conv.title}</div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{conv.time}</span>
              <span>•</span>
              <span>{conv.messages} messages</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
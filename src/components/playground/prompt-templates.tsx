'use client'

import { motion } from 'framer-motion'

const templates = [
  { id: 1, name: 'Creative Writing', description: 'Generate creative content' },
  { id: 2, name: 'Code Review', description: 'Review code for improvements' },
  { id: 3, name: 'Data Analysis', description: 'Analyze data and provide insights' },
  { id: 4, name: 'Summarization', description: 'Summarize long texts' }
]

export function PromptTemplates() {
  return (
    <div className="bg-background rounded-2xl p-6 border border-muted-foreground/20 mt-6">
      <h3 className="font-semibold mb-4">Prompt Templates</h3>
      <div className="space-y-3">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            className="p-3 rounded-xl bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="font-medium text-sm">{template.name}</div>
            <div className="text-xs text-muted-foreground">{template.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
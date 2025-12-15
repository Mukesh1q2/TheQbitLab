'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function ModelSelector() {
  return (
    <div className="bg-background rounded-2xl p-6 border border-muted-foreground/20">
      <h3 className="font-semibold mb-4">Select Model</h3>
      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
          <div className="font-medium">GPT-4</div>
          <div className="text-sm text-muted-foreground">Latest GPT-4 model</div>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
          <div className="font-medium">GPT-3.5</div>
          <div className="text-sm text-muted-foreground">Fast and efficient</div>
        </div>
      </div>
    </div>
  )
}
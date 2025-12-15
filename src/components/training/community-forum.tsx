'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Users, HelpCircle } from 'lucide-react'

const discussions = [
  { id: 1, title: 'React Hooks Best Practices', replies: 24, category: 'Frontend' },
  { id: 2, title: 'Deploying ML Models', replies: 18, category: 'AI/ML' },
  { id: 3, title: 'Kubernetes Basics', replies: 15, category: 'DevOps' }
]

export function CommunityForum() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Community Forum
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">2.5K+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm text-center">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">15K+</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm text-center">
              <HelpCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold mb-1">{discussion.title}</h3>
                  <span className="text-sm text-muted-foreground">{discussion.category}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {discussion.replies} replies
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
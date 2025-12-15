'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, MessageCircle, Youtube, Instagram, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialLink {
  id: string
  name: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  followers?: string
  color: string
  hoverColor: string
}

const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/theqbitlabs',
    icon: Github,
    description: 'Check out our open source projects and contributions to the developer community.',
    followers: '2.5k',
    color: 'text-gray-700 dark:text-gray-300',
    hoverColor: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/theqbitlabs',
    icon: Linkedin,
    description: 'Connect with us professionally and stay updated on our latest projects and insights.',
    followers: '1.8k',
    color: 'text-blue-600',
    hoverColor: 'hover:text-blue-700'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/theqbitlabs',
    icon: Twitter,
    description: 'Follow us for daily tech insights, AI news, and development tips.',
    followers: '3.2k',
    color: 'text-blue-400',
    hoverColor: 'hover:text-blue-500'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/@theqbitlabs',
    icon: Youtube,
    description: 'Watch our tutorials, project walkthroughs, and technology deep dives.',
    followers: '850',
    color: 'text-red-600',
    hoverColor: 'hover:text-red-700'
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:hello@theqbitlabs.com',
    icon: Mail,
    description: 'Send us a direct message for business inquiries and collaboration opportunities.',
    followers: 'Direct',
    color: 'text-green-600',
    hoverColor: 'hover:text-green-700'
  },
  {
    id: 'discord',
    name: 'Discord',
    url: 'https://discord.gg/theqbitlabs',
    icon: MessageCircle,
    description: 'Join our developer community for discussions, support, and networking.',
    followers: '1.2k',
    color: 'text-indigo-600',
    hoverColor: 'hover:text-indigo-700'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/theqbitlabs',
    icon: Instagram,
    description: 'Get a behind-the-scenes look at our work culture and creative process.',
    followers: '950',
    color: 'text-pink-600',
    hoverColor: 'hover:text-pink-700'
  },
  {
    id: 'website',
    name: 'Website',
    url: 'https://theqbitlabs.com',
    icon: Globe,
    description: 'Visit our main website for comprehensive information about our services.',
    followers: 'Live',
    color: 'text-primary',
    hoverColor: 'hover:text-primary/80'
  }
]

export function SocialLinks() {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Connect With Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow us on your favorite platforms to stay updated with our latest projects, 
            tech insights, and community contributions.
          </p>
        </motion.div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon
            return (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300',
                  'bg-gradient-to-br from-white/10 to-white/5 border-white/20',
                  'hover:border-primary/50 hover:shadow-xl',
                  'block'
                )}
              >
                {/* Icon and Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn(
                    'p-3 rounded-xl bg-gradient-to-r from-primary to-primary/60',
                    'group-hover:shadow-lg transition-all duration-300'
                  )}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{social.name}</h3>
                    <p className={cn('text-sm font-medium', social.color, social.hoverColor)}>
                      {social.followers}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {social.description}
                </p>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                {/* Arrow Icon */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <svg 
                    className="w-4 h-4 text-primary" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.a>
            )
          })}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest updates on AI trends, development tips, 
              and exclusive insights from our team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-muted-foreground/20 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </motion.div>

        {/* Social Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Total Followers', value: '10.5K+', icon: '👥' },
            { label: 'Projects Shared', value: '150+', icon: '🚀' },
            { label: 'Community Members', value: '2.8K+', icon: '🤝' },
            { label: 'Years Active', value: '5+', icon: '📅' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
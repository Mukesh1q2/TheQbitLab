'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Globe } from 'lucide-react'

const authors = [
  {
    name: 'Alex Chen',
    role: 'Founder & CEO',
    bio: 'Full-stack developer with 10+ years experience. Passionate about React, Next.js, and building scalable applications.',
    image: 'AC',
    social: {
      github: 'https://github.com/alexchen',
      linkedin: 'https://linkedin.com/in/alexchen',
      twitter: 'https://twitter.com/alexchen',
      website: 'https://alexchen.dev'
    }
  },
  {
    name: 'Sarah Johnson',
    role: 'Lead Developer',
    bio: 'Frontend specialist focused on React ecosystem and modern web technologies.',
    image: 'SJ',
    social: {
      github: 'https://github.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson'
    }
  }
]

export function AuthorSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Meet Our Authors
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            The talented developers and writers behind our technical content.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {authors.map((author, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {author.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {author.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3">
                    {author.role}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {author.bio}
                  </p>
                  <div className="flex space-x-3">
                    {author.social.github && (
                      <a href={author.social.github} className="text-slate-400 hover:text-gray-700">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.linkedin && (
                      <a href={author.social.linkedin} className="text-slate-400 hover:text-blue-600">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.twitter && (
                      <a href={author.social.twitter} className="text-slate-400 hover:text-blue-400">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.website && (
                      <a href={author.social.website} className="text-slate-400 hover:text-purple-600">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
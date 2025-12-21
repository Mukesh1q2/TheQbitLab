'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Globe } from 'lucide-react'

const author = {
  name: 'Mukesh Kumar',
  role: 'AI Engineer & Full-Stack Developer',
  bio: 'Passionate about building intelligent systems that bridge ancient wisdom and modern technology. Specializing in AI, web development, and creating experiences that feel alive.',
  initials: 'MK',
  social: {
    github: 'https://github.com/Mukesh1q2',
    linkedin: 'https://linkedin.com/in/mukesh-kumar',
    twitter: 'https://twitter.com/mukesh_kumar',
    website: 'https://theqbitlabs.com'
  }
}

export function AuthorSection() {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-foreground mb-3">
            About the Author
          </h2>
          <p className="text-muted-foreground">
            The developer behind the technical content.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/25">
              {author.initials}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {author.name}
              </h3>
              <p className="text-primary font-medium mb-4">
                {author.role}
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {author.bio}
              </p>
              <div className="flex justify-center md:justify-start gap-3">
                {author.social.github && (
                  <motion.a
                    href={author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                )}
                {author.social.linkedin && (
                  <motion.a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-blue-400 hover:border-blue-400/30 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                )}
                {author.social.twitter && (
                  <motion.a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                )}
                {author.social.website && (
                  <motion.a
                    href={author.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <Globe className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
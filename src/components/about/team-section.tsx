'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar } from 'lucide-react'

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'Founder & CEO',
    location: 'San Francisco, CA',
    bio: 'Visionary leader with 10+ years in tech. Passionate about AI and building great teams.',
    image: '/team/alex-chen.jpg',
    skills: ['Leadership', 'Strategy', 'AI/ML', 'Product'],
    social: {
      linkedin: 'https://linkedin.com/in/alexchen',
      github: 'https://github.com/alexchen',
      twitter: 'https://twitter.com/alexchen'
    },
    joinDate: '2020'
  },
  {
    name: 'Sarah Johnson',
    role: 'Lead Full Stack Developer',
    location: 'Austin, TX',
    bio: 'Expert in React, Node.js, and cloud architecture. Mentor to junior developers.',
    image: '/team/sarah-johnson.jpg',
    skills: ['React', 'Node.js', 'AWS', 'Mentoring'],
    social: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      github: 'https://github.com/sarahjohnson'
    },
    joinDate: '2021'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Senior Frontend Developer',
    location: 'New York, NY',
    bio: 'UI/UX enthusiast who crafts beautiful, accessible interfaces. Loves CSS animations.',
    image: '/team/michael-rodriguez.jpg',
    skills: ['React', 'TypeScript', 'UI/UX', 'Animations'],
    social: {
      linkedin: 'https://linkedin.com/in/michaelrodriguez',
      github: 'https://github.com/michaelrodriguez'
    },
    joinDate: '2022'
  },
  {
    name: 'Emily Zhang',
    role: 'AI/ML Engineer',
    location: 'Seattle, WA',
    bio: 'PhD in Computer Science. Specializes in computer vision and natural language processing.',
    image: '/team/emily-zhang.jpg',
    skills: ['Python', 'TensorFlow', 'Computer Vision', 'NLP'],
    social: {
      linkedin: 'https://linkedin.com/in/emilyzhang',
      github: 'https://github.com/emilyzhang'
    },
    joinDate: '2022'
  },
  {
    name: 'David Kim',
    role: 'DevOps Engineer',
    location: 'Denver, CO',
    bio: 'Infrastructure specialist ensuring our applications scale reliably and securely.',
    image: '/team/david-kim.jpg',
    skills: ['Kubernetes', 'Docker', 'CI/CD', 'Security'],
    social: {
      linkedin: 'https://linkedin.com/in/davidkim',
      github: 'https://github.com/davidkim'
    },
    joinDate: '2023'
  },
  {
    name: 'Lisa Thompson',
    role: 'Product Designer',
    location: 'Portland, OR',
    bio: 'Design thinking advocate creating intuitive user experiences that delight.',
    image: '/team/lisa-thompson.jpg',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
    social: {
      linkedin: 'https://linkedin.com/in/lisathompson',
      dribbble: 'https://dribbble.com/lisathompson'
    },
    joinDate: '2023'
  }
]

export function TeamSection() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A diverse group of passionate professionals united by our shared vision of creating 
            exceptional digital experiences that drive real business value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-semibold mb-2">
                  {member.role}
                </p>
                <div className="flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{member.location}</span>
                </div>
                <div className="flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Joined {member.joinDate}</span>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 text-center">
                {member.bio}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-center space-x-4">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    className="p-2 bg-slate-200 dark:bg-slate-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    className="p-2 bg-slate-200 dark:bg-slate-600 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    className="p-2 bg-slate-200 dark:bg-slate-600 rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {member.social.dribbble && (
                  <a
                    href={member.social.dribbble}
                    className="p-2 bg-slate-200 dark:bg-slate-600 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-4 h-4 flex items-center justify-center text-xs font-bold">Db</div>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Join Our Growing Team
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-6">
              We're always looking for talented individuals who share our passion for excellence and innovation. 
              If you're interested in working with us, we'd love to hear from you.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold">
              View Open Positions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
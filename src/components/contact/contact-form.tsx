'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, Building, FileText, MessageSquare } from 'lucide-react'

export function ContactForm() {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Send a Message
            </h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form and I'll get back to you within 24 hours.
            </p>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="relative">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Company (Optional)
                </label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Project Type
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground appearance-none cursor-pointer">
                    <option value="">Select a project type</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ai">AI/ML Solution</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                  <textarea
                    rows={5}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 font-semibold"
              >
                Send Message
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Quick Contact
              </h2>
              <p className="text-muted-foreground mb-8">
                Choose the method that works best for you.
              </p>
            </div>

            {/* Contact Methods Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Mail, title: 'Email', value: 'mukesh@theqbitlabs.com', action: 'Send Email', color: 'primary', href: 'mailto:mukesh@theqbitlabs.com' },
                { icon: () => <span className="text-xl">📞</span>, title: 'Phone', value: '+91-9716966182', action: 'Call Now', color: 'cyan', href: 'tel:+919716966182' },
                { icon: () => <span className="text-xl">💬</span>, title: 'WhatsApp', value: '+91-9716966182', action: 'Chat Now', color: 'green', href: 'https://wa.me/919716966182' },
                { icon: () => <span className="text-xl">📅</span>, title: 'Schedule', value: '30-min free call', action: 'Book Now', color: 'orange', href: '#' },
              ].map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-${method.color}-500/10 flex items-center justify-center mb-3`}>
                    {React.createElement(method.icon, { className: `w-5 h-5 text-${method.color}-400` })}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{method.value}</p>
                  <span className="text-sm font-medium text-primary group-hover:underline">{method.action} →</span>
                </motion.a>
              ))}
            </div>

            {/* Location & Hours */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-lg">📍</span> Location
                </h4>
                <p className="text-sm text-muted-foreground">
                  New Delhi, India<br />
                  <span className="text-xs">Available for remote work worldwide</span>
                </p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-lg">🕐</span> Hours
                </h4>
                <p className="text-sm text-muted-foreground">
                  Mon-Fri: 10AM - 7PM IST<br />
                  Sat: 11AM - 4PM IST
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
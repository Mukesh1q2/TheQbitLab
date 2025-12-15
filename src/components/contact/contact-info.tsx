'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email and we\'ll respond within 24 hours.',
    contact: 'hello@theqbitlabs.com',
    action: 'Send Email'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our team during business hours.',
    contact: '+1 (555) 123-4567',
    action: 'Call Now'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with us in real-time for immediate assistance.',
    contact: 'Available 9 AM - 6 PM PST',
    action: 'Start Chat'
  },
  {
    icon: Calendar,
    title: 'Schedule Meeting',
    description: 'Book a consultation to discuss your project in detail.',
    contact: '30-minute free consultation',
    action: 'Book Now'
  }
]

export function ContactInfo() {
  return (
    <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Multiple Ways to Reach Us
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Choose the communication method that works best for you. We're here to help!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <method.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {method.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                {method.description}
              </p>
              
              <p className="text-purple-600 dark:text-purple-400 font-semibold mb-4">
                {method.contact}
              </p>
              
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium text-sm">
                {method.action}
              </button>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Our Office</h4>
              <p className="text-slate-600 dark:text-slate-300">
                123 Tech Street<br />
                San Francisco, CA 94105<br />
                United States
              </p>
            </div>
            
            <div>
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Business Hours</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                Saturday: 10:00 AM - 4:00 PM PST<br />
                Sunday: Closed
              </p>
            </div>
            
            <div>
              <Phone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Emergency Contact</h4>
              <p className="text-slate-600 dark:text-slate-300">
                For urgent matters outside business hours:<br />
                <span className="text-purple-600 dark:text-purple-400 font-semibold">
                  +1 (555) 999-8888
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
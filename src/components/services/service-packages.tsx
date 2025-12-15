'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const packages = [
  {
    name: 'Starter',
    price: '$2,500',
    description: 'Perfect for small businesses',
    features: ['5 pages', 'Responsive design', 'Basic SEO', '30-day support']
  },
  {
    name: 'Professional',
    price: '$7,500',
    description: 'Ideal for growing companies',
    features: ['10 pages', 'Custom design', 'Advanced SEO', '60-day support', 'CMS'],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: ['Unlimited pages', 'Custom features', 'Full SEO', '90-day support', 'API integration']
  }
]

export function ServicePackages() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Service Packages
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                pkg.popular 
                  ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/50 shadow-xl' 
                  : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-primary/50'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-muted-foreground mb-6">{pkg.description}</p>
              
              <div className="text-3xl font-bold text-primary mb-6">{pkg.price}</div>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Office {
  id: string
  name: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  hours: string
  coordinates: [number, number]
}

const offices: Office[] = [
  {
    id: 'san-francisco',
    name: 'San Francisco HQ',
    address: '123 Innovation Drive',
    city: 'San Francisco',
    country: 'CA, USA',
    phone: '+1 (555) 123-4567',
    email: 'sf@theqbitlabs.com',
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM PST',
    coordinates: [37.7749, -122.4194]
  },
  {
    id: 'london',
    name: 'London Office',
    address: '456 Tech Square',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7123 4567',
    email: 'london@theqbitlabs.com',
    hours: 'Mon-Fri: 9:00 AM - 5:30 PM GMT',
    coordinates: [51.5074, -0.1278]
  },
  {
    id: 'tokyo',
    name: 'Tokyo Office',
    address: '789 Future Tower',
    city: 'Tokyo',
    country: 'Japan',
    phone: '+81 3 1234 5678',
    email: 'tokyo@theqbitlabs.com',
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM JST',
    coordinates: [35.6762, 139.6503]
  }
]

export function OfficeLocations() {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Our Global Offices
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with us at any of our worldwide locations. We're always excited to meet 
            new clients and discuss innovative AI solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                'group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl',
                'bg-gradient-to-br from-white/10 to-white/5 border-white/20',
                'hover:border-primary/50 hover:-translate-y-1'
              )}
            >
              {/* Office Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-primary/60">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{office.name}</h3>
                    <p className="text-sm text-muted-foreground">{office.city}, {office.country}</p>
                  </div>
                </div>
              </div>

              {/* Office Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{office.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a 
                      href={`tel:${office.phone}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a 
                      href={`mailto:${office.email}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Hours</p>
                    <p className="font-medium">{office.hours}</p>
                  </div>
                </div>
              </div>

              {/* Interactive Map Placeholder */}
              <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-dashed border-muted-foreground/20">
                <div className="text-center text-sm text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Interactive map coming soon</p>
                  <p className="text-xs mt-1">
                    Coordinates: {office.coordinates[0].toFixed(4)}, {office.coordinates[1].toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Visit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300"
              >
                Get Directions
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Schedule a Visit</h3>
            <p className="text-muted-foreground mb-6">
              Interested in visiting our offices? We'd love to show you around and discuss 
              how we can help bring your AI vision to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300"
            >
              Schedule Office Visit
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
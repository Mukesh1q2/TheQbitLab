'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechStartup Inc.',
    content: 'Working with TheQbitlabs was a game-changer for our startup. The AI-powered dashboard they built increased our user engagement significantly.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Product Manager',
    company: 'E-commerce Solutions',
    content: 'The technical execution is flawless, and the performance is exceptional. Our conversion rate improved after implementing their design system.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    role: 'Research Director',
    company: 'AI Research Lab',
    content: 'The quantum neural theme portfolio is absolutely stunning. The attention to detail and innovative approach exceeded all expectations.',
    rating: 5,
  },
]

export function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { theme } = useAppStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real feedback from real clients. See how I've helped businesses achieve their goals.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-background border border-muted-foreground/20"
            >
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-lg text-muted-foreground mb-6 italic">
                "{currentTestimonial.content}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{currentTestimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </p>
                </div>
                <div className="flex gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={nextTestimonial}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
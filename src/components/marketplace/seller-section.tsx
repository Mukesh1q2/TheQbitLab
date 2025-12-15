'use client'

import { motion } from 'framer-motion'
import { Star, Award, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Seller {
  id: string
  name: string
  title: string
  avatar: string
  rating: number
  reviewCount: number
  totalSales: number
  totalProducts: number
  followers: number
  verified: boolean
  badge: string
  badgeColor: string
  topCategories: string[]
  featuredProduct: {
    title: string
    price: number
    sales: number
  }
  joinedDate: string
  description: string
}

const topSellers: Seller[] = [
  {
    id: 'dev-master',
    name: 'DevMaster Studios',
    title: 'Full-Stack Developer & Designer',
    avatar: '/avatars/devmaster.jpg',
    rating: 4.9,
    reviewCount: 1247,
    totalSales: 15420,
    totalProducts: 89,
    followers: 8500,
    verified: true,
    badge: 'Top Seller',
    badgeColor: 'from-yellow-500 to-orange-500',
    topCategories: ['Web Templates', 'Admin Dashboards', 'UI Kits'],
    featuredProduct: {
      title: 'Complete Admin Dashboard',
      price: 79,
      sales: 2340
    },
    joinedDate: '2022',
    description: 'Creating modern, responsive web templates and admin dashboards with cutting-edge design and functionality.'
  },
  {
    id: 'ui-nexus',
    name: 'UI Nexus',
    title: 'UI/UX Design Specialist',
    avatar: '/avatars/uinnexus.jpg',
    rating: 4.8,
    reviewCount: 892,
    totalSales: 9876,
    totalProducts: 156,
    followers: 6200,
    verified: true,
    badge: 'Rising Star',
    badgeColor: 'from-blue-500 to-purple-500',
    topCategories: ['Mobile UI', 'Design Systems', 'Icons'],
    featuredProduct: {
      title: 'Mobile UI Kit Pro',
      price: 69,
      sales: 1890
    },
    joinedDate: '2021',
    description: 'Specializing in beautiful mobile interfaces and comprehensive design systems for modern applications.'
  },
  {
    id: 'react-king',
    name: 'ReactKing',
    title: 'React Specialist',
    avatar: '/avatars/reactking.jpg',
    rating: 4.7,
    reviewCount: 634,
    totalSales: 7654,
    totalProducts: 67,
    followers: 4300,
    verified: true,
    badge: 'Expert',
    badgeColor: 'from-green-500 to-teal-500',
    topCategories: ['React Components', 'Next.js', 'TypeScript'],
    featuredProduct: {
      title: 'React Component Library',
      price: 59,
      sales: 1567
    },
    joinedDate: '2020',
    description: 'Building high-quality React components and Next.js templates with modern development practices.'
  }
]

const benefits = [
  {
    icon: '💰',
    title: 'Earn Up to 70%',
    description: 'Keep most of your earnings with our competitive commission structure'
  },
  {
    icon: '🎯',
    title: 'Global Reach',
    description: 'Showcase your work to thousands of developers worldwide'
  },
  {
    icon: '📈',
    title: 'Analytics Dashboard',
    description: 'Track your sales, downloads, and performance metrics'
  },
  {
    icon: '🛡️',
    title: 'Secure Payments',
    description: 'Get paid safely and securely with multiple payment options'
  }
]

export function SellerSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Top Sellers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our most successful creators and see what makes their products stand out.
          </p>
        </motion.div>

        {/* Top Sellers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {topSellers.map((seller, index) => (
            <motion.div
              key={seller.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                {/* Badge */}
                <div className={cn(
                  'absolute -top-3 left-8 px-3 py-1 text-xs font-medium text-white rounded-full',
                  `bg-gradient-to-r ${seller.badgeColor}`
                )}>
                  {seller.badge}
                </div>

                {/* Seller Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <div className="text-2xl">👨‍💻</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold">{seller.name}</h3>
                      {seller.verified && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{seller.title}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{seller.rating}</span>
                        <span className="text-muted-foreground">({seller.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{seller.followers.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {seller.description}
                </p>

                {/* Top Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Top Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {seller.topCategories.map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 rounded-xl bg-muted/30">
                    <div className="text-lg font-bold text-primary">
                      {seller.totalSales.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Sales</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-muted/30">
                    <div className="text-lg font-bold text-primary">
                      {seller.totalProducts}
                    </div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                </div>

                {/* Featured Product */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 mb-6">
                  <h4 className="text-sm font-medium mb-2">Featured Product</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{seller.featuredProduct.title}</p>
                      <p className="text-xs text-muted-foreground">
                        ${seller.featuredProduct.price} • {seller.featuredProduct.sales} sales
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      View
                    </motion.button>
                  </div>
                </div>

                {/* Join Date */}
                <div className="text-xs text-muted-foreground text-center">
                  Member since {seller.joinedDate}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Become a Seller CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Become a Seller</h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our marketplace and start selling your templates and components to thousands of developers worldwide.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm"
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                Start Selling Today
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Active Sellers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Products Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">$2M+</div>
                <div className="text-sm text-muted-foreground">Total Earnings</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
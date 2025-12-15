'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { useAppStore } from '@/store/app-store'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Playground', href: '/playground' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Training', href: '/training' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:contact@qbitlab.dev',
      icon: Mail,
    },
  ],
  contact: [
    {
      icon: MapPin,
      text: 'San Francisco, CA',
    },
    {
      icon: Phone,
      text: '+1 (555) 123-4567',
    },
    {
      icon: Mail,
      text: 'contact@qbitlab.dev',
    },
  ],
}

export function Footer() {
  const { theme } = useAppStore()

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                QbitLab
              </span>
            </div>
            <p className="text-muted-foreground text-base">
              AI Engineer & Full-Stack Developer specializing in cutting-edge web applications, 
              AI solutions, and modern development practices.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Navigation
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Contact Info
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.contact.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-base text-muted-foreground">
                      <item.icon className="h-4 w-4" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link
                href="/privacy"
                className="text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
            <p className="mt-8 text-base text-muted-foreground md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} QbitLab. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
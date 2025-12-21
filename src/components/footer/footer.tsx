'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/Mukesh1q2',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/mukesh-kumar',
      icon: Linkedin,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/mukesh_kumar',
      icon: Twitter,
    },
    {
      name: 'Email',
      href: 'mailto:mukesh@theqbitlabs.com',
      icon: Mail,
    },
  ],
  contact: [
    {
      icon: MapPin,
      text: 'New Delhi, India',
    },
    {
      icon: Phone,
      text: '+91-9716966182',
    },
    {
      icon: Mail,
      text: 'mukesh@theqbitlabs.com',
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Mukesh Kumar
              </span>
            </div>
            <p className="text-muted-foreground text-base">
              AI Engineer & Full-Stack Developer specializing in cutting-edge AI solutions,
              web applications, and innovative digital experiences.
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
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
                <ul className="mt-4 space-y-3">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-muted-foreground hover:text-primary transition-colors duration-200"
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
                  Contact
                </h3>
                <ul className="mt-4 space-y-3">
                  {navigation.contact.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-base text-muted-foreground">
                      <item.icon className="h-4 w-4 text-primary" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
            <p className="mt-8 text-sm text-muted-foreground md:mt-0 md:order-1">
              © {new Date().getFullYear()} Mukesh Kumar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
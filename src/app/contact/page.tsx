import { Metadata } from 'next'
import { ContactHero } from '@/components/contact/contact-hero'
import { ContactForm } from '@/components/contact/contact-form'
import { FAQSection } from '@/components/contact/faq-section'
import { SocialLinks } from '@/components/contact/social-links'

export const metadata: Metadata = {
  title: 'Contact | Mukesh Kumar - TheQbitlabs',
  description: 'Get in touch with Mukesh Kumar for your next project. Specializing in AI development, web applications, and digital transformation.',
  keywords: ['contact', 'get in touch', 'project inquiry', 'consultation', 'AI developer'],
  openGraph: {
    title: 'Contact Mukesh Kumar | TheQbitlabs',
    description: 'Ready to start your next project? Let\'s discuss how we can help.',
    images: ['/og/contact.jpg'],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <ContactHero />
      <ContactForm />
      <FAQSection />
      <SocialLinks />
    </main>
  )
}
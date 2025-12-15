import { Metadata } from 'next'
import { ContactHero } from '@/components/contact/contact-hero'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'
import { OfficeLocations } from '@/components/contact/office-locations'
import { FAQSection } from '@/components/contact/faq-section'
import { SocialLinks } from '@/components/contact/social-links'

export const metadata: Metadata = {
  title: 'Contact | TheQbitlabs',
  description: 'Get in touch with TheQbitlabs for your next project. We\'re here to help with AI development, web applications, and digital transformation.',
  keywords: ['contact', 'get in touch', 'project inquiry', 'consultation', 'support'],
  openGraph: {
    title: 'Contact TheQbitlabs',
    description: 'Ready to start your next project? Let\'s discuss how we can help.',
    images: ['/og/contact.jpg'],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <OfficeLocations />
      <FAQSection />
      <SocialLinks />
    </main>
  )
}
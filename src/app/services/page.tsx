import { Metadata } from 'next'
import { ServicesHero } from '@/components/services/services-hero'
import { ServiceCategories } from '@/components/services/service-categories'
import { ServicePackages } from '@/components/services/service-packages'
import { ProcessSection } from '@/components/services/process-section'
import { PricingSection } from '@/components/services/pricing-section'
import { TestimonialsSection } from '@/components/services/testimonials-section'
import { FAQSection } from '@/components/services/faq-section'
import { CTASection } from '@/components/services/cta-section'

export const metadata: Metadata = {
  title: 'Services | TheQbitlabs',
  description: 'Explore our comprehensive range of technology services including AI development, web applications, mobile apps, and digital transformation.',
  keywords: ['services', 'AI development', 'web development', 'mobile apps', 'consulting', 'digital transformation'],
  openGraph: {
    title: 'Technology Services | TheQbitlabs',
    description: 'Professional technology services to accelerate your digital transformation.',
    images: ['/og/services.jpg'],
  },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesHero />
      <ServiceCategories />
      <ServicePackages />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}
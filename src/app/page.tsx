import { Metadata } from 'next'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedWork } from '@/components/home/featured-work'
import { CapabilitiesMatrix } from '@/components/home/capabilities-matrix'
import { TechStackVisualizer } from '@/components/home/tech-stack-visualizer'
import { ClientTestimonials } from '@/components/home/client-testimonials'
import { LiveActivityFeed } from '@/components/home/live-activity-feed'
import { InteractiveTimeline } from '@/components/home/interactive-timeline'
import { StatsSection } from '@/components/home/stats-section'
import { CTASection } from '@/components/home/cta-section'

export const metadata: Metadata = {
  title: 'TheQbitlabs - AI Engineer & Full-Stack Developer',
  description: 'Professional AI engineer, LLM architect, and full-stack developer specializing in cutting-edge web applications, AI solutions, and modern development practices.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedWork />
      <CapabilitiesMatrix />
      <TechStackVisualizer />
      <ClientTestimonials />
      <LiveActivityFeed />
      <InteractiveTimeline />
      <CTASection />
    </main>
  )
}
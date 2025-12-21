import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/home/hero-section'
import { StatsSection } from '@/components/home/stats-section'
import { FeaturedWork } from '@/components/home/featured-work'
import { CapabilitiesMatrix } from '@/components/home/capabilities-matrix'
import { CTASection } from '@/components/home/cta-section'

// Lazy load heavy below-fold sections to improve LCP and TBT
const TechStackVisualizer = dynamic(
  () => import('@/components/home/tech-stack-visualizer').then(mod => ({ default: mod.TechStackVisualizer })),
  { ssr: false, loading: () => <div className="h-96 bg-background" /> }
)

const ClientTestimonials = dynamic(
  () => import('@/components/home/client-testimonials').then(mod => ({ default: mod.ClientTestimonials })),
  { ssr: false, loading: () => <div className="h-64 bg-background" /> }
)

const LiveActivityFeed = dynamic(
  () => import('@/components/home/live-activity-feed').then(mod => ({ default: mod.LiveActivityFeed })),
  { ssr: false, loading: () => <div className="h-96 bg-background" /> }
)

const InteractiveTimeline = dynamic(
  () => import('@/components/home/interactive-timeline').then(mod => ({ default: mod.InteractiveTimeline })),
  { ssr: false, loading: () => <div className="h-64 bg-background" /> }
)

export const metadata: Metadata = {
  title: 'Mukesh Kumar | AI Engineer & Full-Stack Developer | TheQbitlabs',
  description: 'I build AI that actually works and Full-Stack apps that don\'t break. Specializing in LLMs, Computer Vision, Deep Learning, and scalable web applications.',
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
import { Metadata } from 'next'
import { AboutHero } from '@/components/about/about-hero'
import { SkillsMatrix } from '@/components/about/skills-matrix'
import { ExperienceTimeline } from '@/components/about/experience-timeline'
import { ValuesSection } from '@/components/about/values-section'

export const metadata: Metadata = {
  title: 'About | Mukesh Kumar - AI Engineer & Full-Stack Developer',
  description: 'Learn about Mukesh Kumar - AI Engineer and Full-Stack Developer specializing in AI development, web applications, and innovative digital solutions.',
  keywords: ['about', 'AI engineer', 'full-stack developer', 'skills', 'experience', 'technology'],
  openGraph: {
    title: 'About Mukesh Kumar | TheQbitlabs',
    description: 'Discover my story and expertise in cutting-edge AI and web development.',
    images: ['/og/about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <AboutHero />
      <SkillsMatrix />
      <ExperienceTimeline />
      <ValuesSection />
    </main>
  )
}
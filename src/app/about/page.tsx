import { Metadata } from 'next'
import { AboutHero } from '@/components/about/about-hero'
import { SkillsMatrix } from '@/components/about/skills-matrix'
import { ExperienceTimeline } from '@/components/about/experience-timeline'
import { EducationSection } from '@/components/about/education-section'
import { CertificationsSection } from '@/components/about/certifications-section'
import { ValuesSection } from '@/components/about/values-section'
import { TeamSection } from '@/components/about/team-section'

export const metadata: Metadata = {
  title: 'About | TheQbitlabs',
  description: 'Learn about TheQbitlabs - a cutting-edge technology company specializing in AI, web development, and digital innovation.',
  keywords: ['about', 'team', 'skills', 'experience', 'technology', 'AI', 'web development'],
  openGraph: {
    title: 'About TheQbitlabs',
    description: 'Discover our story, team, and expertise in cutting-edge technology development.',
    images: ['/og/about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <SkillsMatrix />
      <ExperienceTimeline />
      <EducationSection />
      <CertificationsSection />
      <ValuesSection />
      <TeamSection />
    </main>
  )
}
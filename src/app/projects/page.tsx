import { Metadata } from 'next'
import { ProjectsHero } from '@/components/projects/projects-hero'
import { ProjectFilter } from '@/components/projects/project-filter'
import { ProjectsGrid } from '@/components/projects/projects-grid'
import { FeaturedProject } from '@/components/projects/featured-project'
import { ProjectStats } from '@/components/projects/project-stats'
import { ClientLogos } from '@/components/projects/client-logos'
import { CTASection } from '@/components/projects/cta-section'

export const metadata: Metadata = {
  title: 'Projects | TheQbitlabs',
  description: 'Explore our portfolio of successful projects including AI applications, web platforms, mobile apps, and digital solutions.',
  keywords: ['projects', 'portfolio', 'case studies', 'AI projects', 'web applications', 'mobile apps'],
  openGraph: {
    title: 'Project Portfolio | TheQbitlabs',
    description: 'Discover our successful projects and innovative solutions.',
    images: ['/og/projects.jpg'],
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <ProjectsHero />
      <ProjectFilter />
      <ProjectsGrid />
      <FeaturedProject />
      <ProjectStats />
      <ClientLogos />
      <CTASection />
    </main>
  )
}
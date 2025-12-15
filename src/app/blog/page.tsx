import { Metadata } from 'next'
import { BlogHero } from '@/components/blog/blog-hero'
import { BlogFilter } from '@/components/blog/blog-filter'
import { FeaturedPost } from '@/components/blog/featured-post'
import { BlogGrid } from '@/components/blog/blog-grid'
import { NewsletterSignup } from '@/components/blog/newsletter-signup'
import { PopularTags } from '@/components/blog/popular-tags'
import { AuthorSection } from '@/components/blog/author-section'

export const metadata: Metadata = {
  title: 'Blog | TheQbitlabs',
  description: 'Stay updated with the latest insights on AI, web development, technology trends, and digital innovation from our expert team.',
  keywords: ['blog', 'AI insights', 'web development', 'technology trends', 'digital innovation', 'tutorials'],
  openGraph: {
    title: 'Technology Blog | TheQbitlabs',
    description: 'Expert insights and tutorials on cutting-edge technology.',
    images: ['/og/blog.jpg'],
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <BlogHero />
      <BlogFilter />
      <FeaturedPost />
      <BlogGrid />
      <NewsletterSignup />
      <PopularTags />
      <AuthorSection />
    </main>
  )
}
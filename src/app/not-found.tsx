import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | TheQbitlabs',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Go Home
          </Link>

          <div className="text-sm text-muted-foreground">
            <p>Or try one of these popular pages:</p>
            <div className="mt-4 space-x-4">
              <Link href="/projects" className="text-primary hover:underline">Projects</Link>
              <Link href="/services" className="text-primary hover:underline">Services</Link>
              <Link href="/contact" className="text-primary hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
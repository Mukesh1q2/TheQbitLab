'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">500</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">Server Error</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Something went wrong on our end. We're working to fix it.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Try Again
          </button>
          
          <div className="text-sm text-muted-foreground">
            <p>If the problem persists, please contact our support team.</p>
            <div className="mt-4">
              <a href="/contact" className="text-primary hover:underline">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
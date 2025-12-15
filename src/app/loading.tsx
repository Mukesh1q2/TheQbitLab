import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loading | TheQbitlabs',
  description: 'Loading page content...',
}

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Loading</h2>
          <p className="text-muted-foreground">
            Please wait while we load the content...
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="w-64 h-2 bg-muted rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | TheQbitlabs',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="text-center relative z-10 p-8 max-w-2xl mx-auto">
        <div className="mb-8 relative">
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50" />
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-500 to-purple-600 mb-2 tracking-tighter">
            404
          </h1>
          <div className="font-mono text-xs text-primary/60 tracking-[0.5em] uppercase mb-6">
            System Failure // Logic Gate Open
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4">
            Reality Drift Detected
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            The coordinates you requested do not exist in this dimension.
            <br />
            The system cannot propagate this signal.
          </p>
        </div>

        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary/20 bg-primary/10 text-primary font-mono rounded-xl hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
          >
            <span>▶ Initiate Reboot (Home)</span>
          </Link>

          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4 font-mono">Run diagnostics on:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/projects" className="px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium">
                featured_systems.log
              </Link>
              <Link href="/services" className="px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium">
                service_modules.exe
              </Link>
              <Link href="/contact" className="px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium">
                comm_link.sh
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { MainNav } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SettingsPanel } from '@/components/settings'
import { ThemeEffects } from '@/components/effects'
import { QbotAssistant } from '@/components/chat'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TheQbitlabs - AI Engineer & Full-Stack Developer',
  description: 'Professional AI engineer, LLM architect, and full-stack developer specializing in cutting-edge web applications, AI solutions, and modern development practices.',
  keywords: ['AI Engineer', 'Full-Stack Developer', 'LLM Architect', 'React', 'Next.js', 'TypeScript', 'Machine Learning'],
  authors: [{ name: 'TheQbitlabs' }],
  creator: 'TheQbitlabs',
  publisher: 'TheQbitlabs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://theqbitlabs.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theqbitlabs.com',
    title: 'TheQbitlabs - AI Engineer & Full-Stack Developer',
    description: 'Professional AI engineer, LLM architect, and full-stack developer specializing in cutting-edge web applications, AI solutions, and modern development practices.',
    siteName: 'TheQbitlabs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TheQbitlabs - AI Engineer & Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheQbitlabs - AI Engineer & Full-Stack Developer',
    description: 'Professional AI engineer, LLM architect, and full-stack developer specializing in cutting-edge web applications, AI solutions, and modern development practices.',
    images: ['/og-image.jpg'],
    creator: '@theqbitlabs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization script - runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theqbitlabs-app-storage');
                  if (stored) {
                    var parsed = JSON.parse(stored);
                    var themeId = parsed.state && parsed.state.theme && parsed.state.theme.id;
                    if (themeId) {
                      document.documentElement.setAttribute('data-theme', themeId);
                      document.documentElement.className = 'theme-' + themeId;
                    }
                  } else {
                    document.documentElement.setAttribute('data-theme', 'quantum');
                    document.documentElement.className = 'theme-quantum';
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'quantum');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.variable
      )}>
        <Providers>
          <ThemeEffects />
          <MainNav />
          <main className="flex-1 relative z-10">
            {children}
          </main>
          <Footer />
          <SettingsPanel />
          <QbotAssistant />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))',
              },
              success: {
                iconTheme: {
                  primary: 'hsl(var(--primary))',
                  secondary: 'hsl(var(--primary-foreground))',
                },
              },
              error: {
                iconTheme: {
                  primary: 'hsl(var(--destructive))',
                  secondary: 'hsl(var(--destructive-foreground))',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
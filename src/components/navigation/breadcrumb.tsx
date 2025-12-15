'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
    label: string
    href?: string
}

// Map of path segments to display labels
const pathLabels: Record<string, string> = {
    about: 'About Us',
    blog: 'Blog',
    contact: 'Contact',
    projects: 'Projects',
    services: 'Services',
    playground: 'Playground',
    marketplace: 'Marketplace',
    training: 'Training Arena',
    admin: 'Dashboard',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
}

export function Breadcrumb() {
    const pathname = usePathname()

    // Don't show on home page
    if (pathname === '/') return null

    const segments = pathname.split('/').filter(Boolean)

    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        ...segments.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 1).join('/')
            const isLast = index === segments.length - 1
            const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

            return {
                label,
                href: isLast ? undefined : href,
            }
        }),
    ]

    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-1 text-sm text-muted-foreground py-3 px-4 md:px-0"
        >
            {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && (
                        <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground/50" />
                    )}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className={cn(
                                'hover:text-foreground transition-colors',
                                index === 0 && 'flex items-center gap-1'
                            )}
                        >
                            {index === 0 && <Home className="w-3.5 h-3.5" />}
                            <span>{item.label}</span>
                        </Link>
                    ) : (
                        <span className="text-foreground font-medium">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    )
}

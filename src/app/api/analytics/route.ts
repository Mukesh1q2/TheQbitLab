import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Force dynamic rendering - prevents build-time data collection
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

// Check if we're in build mode (no database available)
const isBuildTime = () => {
  return !process.env.DATABASE_URL || process.env.NEXT_PHASE === 'phase-production-build'
}

// Type for analytics record
interface AnalyticsRecord {
  id: string
  date: Date
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  conversions: number
  revenue: number
}

const AnalyticsSchema = z.object({
  pageViews: z.number().optional(),
  uniqueVisitors: z.number().optional(),
  bounceRate: z.number().optional(),
  avgSessionDuration: z.number().optional(),
  conversions: z.number().optional(),
  revenue: z.number().optional(),
})

// POST /api/analytics - Create daily analytics record
export async function POST(request: NextRequest) {
  // Skip during build
  if (isBuildTime()) {
    return NextResponse.json({ success: false, error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { prisma } = await import('@/lib/prisma')
    const body = await request.json()
    const validatedData = AnalyticsSchema.parse(body)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const analytics = await prisma.analytics.upsert({
      where: {
        date: today,
      },
      update: {
        ...validatedData,
      },
      create: {
        date: today,
        ...validatedData,
      },
    })

    return NextResponse.json({
      success: true,
      analyticsId: analytics.id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid analytics data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error tracking analytics:', error)
    return NextResponse.json(
      { error: 'Failed to track analytics' },
      { status: 500 }
    )
  }
}

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
  // Skip during build
  if (isBuildTime()) {
    return NextResponse.json({
      analytics: [],
      summary: { totalRecords: 0, totalPageViews: 0, totalUniqueVisitors: 0, avgBounceRate: 0 }
    })
  }

  try {
    const { prisma } = await import('@/lib/prisma')
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = parseInt(searchParams.get('limit') || '30')

    const where: any = {}

    if (startDate || endDate) {
      where.date = {}
      if (startDate) {
        where.date.gte = new Date(startDate)
      }
      if (endDate) {
        where.date.lte = new Date(endDate)
      }
    }

    const analytics = await prisma.analytics.findMany({
      where,
      orderBy: { date: 'desc' },
      take: limit,
    })

    const totalRecords = await prisma.analytics.count({ where })
    const totalPageViews = analytics.reduce((sum: number, record: AnalyticsRecord) => sum + record.pageViews, 0)
    const totalUniqueVisitors = analytics.reduce((sum: number, record: AnalyticsRecord) => sum + record.uniqueVisitors, 0)
    const avgBounceRate = analytics.length > 0
      ? analytics.reduce((sum: number, record: AnalyticsRecord) => sum + record.bounceRate, 0) / analytics.length
      : 0

    return NextResponse.json({
      analytics,
      summary: {
        totalRecords,
        totalPageViews,
        totalUniqueVisitors,
        avgBounceRate: Math.round(avgBounceRate * 100) / 100,
        dateRange: {
          start: startDate,
          end: endDate,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Force dynamic rendering - prevents build-time data collection
export const dynamic = 'force-dynamic'

// Lazy load prisma to avoid build-time initialization issues
const getPrisma = async () => {
  const { prisma } = await import('@/lib/prisma')
  return prisma
}

const ProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  category: z.string(),
  technologies: z.array(z.string()),
  imageUrl: z.string().url(),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
})

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = { published: true }

    if (category) {
      where.category = category
    }

    if (featured === 'true') {
      where.featured = true
    }

    const prisma = await getPrisma()
    const projects = await prisma.project.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        profile: true,
        tags: true,
      },
    })

    const total = await prisma.project.count({ where })

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ProjectSchema.parse(body)

    const prisma = await getPrisma()
    const project = await prisma.project.create({
      data: {
        title: validatedData.title,
        slug: validatedData.title.toLowerCase().replace(/\s+/g, '-'),
        description: validatedData.description,
        content: validatedData.description,
        techStack: validatedData.technologies,
        category: validatedData.category as any,
        status: 'PUBLISHED',
        featured: validatedData.featured,
        profileId: 'temp-profile-id', // Would need actual profile ID in real implementation
      },
      include: {
        profile: true,
        tags: true,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid project data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
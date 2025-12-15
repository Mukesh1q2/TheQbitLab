import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering - prevents build-time data collection
export const dynamic = 'force-dynamic'

// Lazy load prisma to avoid build-time initialization issues
const getPrisma = async () => {
    const { prisma } = await import('@/lib/prisma')
    return prisma
}

// Type for Avadhan session project
interface AvadhanProject {
    id: string
    title: string
    status: string
    createdAt: Date
    updatedAt: Date
}

// GET /api/training/projects - List all training projects
export async function GET() {
    try {
        const prisma = await getPrisma()
        const projects = await prisma.avadhanSession.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50,
        })

        return NextResponse.json({
            success: true,
            projects: projects.map((p: AvadhanProject) => ({
                id: p.id,
                title: p.title,
                status: p.status,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt,
            }))
        })
    } catch (error) {
        console.error('Error fetching training projects:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch projects' },
            { status: 500 }
        )
    }
}

// POST /api/training/projects - Create new training project
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, description, config } = body

        if (!name) {
            return NextResponse.json(
                { success: false, error: 'Project name is required' },
                { status: 400 }
            )
        }

        // Default Ashta config
        const defaultConfig = {
            regime: 'ashta',
            numSlots: 8,
            encoderDim: 512,
            orthogonalityWeight: 0.1,
            contrastiveTemp: 0.07,
            controllerLR: 0.0001,
            energyConstraint: true,
        }

        const prisma = await getPrisma()
        const project = await prisma.avadhanSession.create({
            data: {
                title: name,
                objectives: description ? [{ description }] : [],
                threads: [],
                status: 'IDLE',
                userId: 'system', // TODO: Get from auth session
            },
        })

        return NextResponse.json({
            success: true,
            project: {
                id: project.id,
                title: project.title,
                status: project.status,
                config: { ...defaultConfig, ...config },
                createdAt: project.createdAt,
            }
        })
    } catch (error) {
        console.error('Error creating training project:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create project' },
            { status: 500 }
        )
    }
}


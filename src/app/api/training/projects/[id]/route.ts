import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering - prevents build-time data collection
export const dynamic = 'force-dynamic'

// Lazy load prisma to avoid build-time initialization issues
const getPrisma = async () => {
    const { prisma } = await import('@/lib/prisma')
    return prisma
}

interface RouteParams {
    params: { id: string }
}

// GET /api/training/projects/[id] - Get project details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const prisma = await getPrisma()
        const project = await prisma.avadhanSession.findUnique({
            where: { id: params.id },
        })

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            project: {
                id: project.id,
                title: project.title,
                objectives: project.objectives,
                threads: project.threads,
                results: project.results,
                status: project.status,
                createdAt: project.createdAt,
                updatedAt: project.updatedAt,
            }
        })
    } catch (error) {
        console.error('Error fetching project:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch project' },
            { status: 500 }
        )
    }
}

// PUT /api/training/projects/[id] - Update project
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const body = await request.json()
        const { title, objectives, threads, status, results } = body

        const prisma = await getPrisma()
        const project = await prisma.avadhanSession.update({
            where: { id: params.id },
            data: {
                ...(title && { title }),
                ...(objectives && { objectives }),
                ...(threads && { threads }),
                ...(status && { status }),
                ...(results && { results }),
            },
        })

        return NextResponse.json({
            success: true,
            project: {
                id: project.id,
                title: project.title,
                status: project.status,
                updatedAt: project.updatedAt,
            }
        })
    } catch (error) {
        console.error('Error updating project:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update project' },
            { status: 500 }
        )
    }
}

// DELETE /api/training/projects/[id] - Delete project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const prisma = await getPrisma()
        await prisma.avadhanSession.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting project:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete project' },
            { status: 500 }
        )
    }
}


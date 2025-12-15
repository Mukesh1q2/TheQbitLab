import { NextRequest, NextResponse } from 'next/server'
import { stopTraining, pauseTraining, getEngineState } from '@/lib/avadhan'
import { engineInstances } from '../start/route'

// Force dynamic rendering - prevents build-time data collection
export const dynamic = 'force-dynamic'

// Lazy load prisma to avoid build-time initialization issues
const getPrisma = async () => {
    const { prisma } = await import('@/lib/prisma')
    return prisma
}

// POST /api/training/stop - Stop or pause training
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { projectId, action = 'stop' } = body

        if (!projectId) {
            return NextResponse.json(
                { success: false, error: 'Project ID is required' },
                { status: 400 }
            )
        }

        // Get engine instance
        let engine = engineInstances.get(projectId)

        if (!engine) {
            return NextResponse.json(
                { success: false, error: 'No active training session found' },
                { status: 404 }
            )
        }

        const prisma = await getPrisma()

        // Apply action
        if (action === 'pause') {
            engine = pauseTraining(engine)
            await prisma.avadhanSession.update({
                where: { id: projectId },
                data: { status: 'PAUSED' },
            })
        } else {
            engine = stopTraining(engine)
            await prisma.avadhanSession.update({
                where: { id: projectId },
                data: { status: 'COMPLETED' },
            })
        }

        engineInstances.set(projectId, engine)

        return NextResponse.json({
            success: true,
            message: action === 'pause' ? 'Training paused' : 'Training stopped',
            state: getEngineState(engine),
        })
    } catch (error) {
        console.error('Error stopping training:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to stop training' },
            { status: 500 }
        )
    }
}


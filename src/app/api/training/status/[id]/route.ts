import { NextRequest, NextResponse } from 'next/server'
import { getEngineState, trainingStep } from '@/lib/avadhan'
import { engineInstances } from '../../start/route'

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

// GET /api/training/status/[id] - Get training status and run a step
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const projectId = params.id

        // Get engine instance
        let engine = engineInstances.get(projectId)

        if (!engine) {
            // Get from database if no active session
            const prisma = await getPrisma()
            const project = await prisma.avadhanSession.findUnique({
                where: { id: projectId },
            })

            if (!project) {
                return NextResponse.json(
                    { success: false, error: 'Project not found' },
                    { status: 404 }
                )
            }

            return NextResponse.json({
                success: true,
                isTraining: false,
                project: {
                    id: project.id,
                    title: project.title,
                    status: project.status,
                },
                state: null,
            })
        }

        // If training, run a step
        if (engine.status === 'training') {
            // Simulate training with random inputs
            const mockInputs = [
                { text: `Training input at epoch ${engine.currentEpoch}`, threadId: 'main' },
            ]
            engine = trainingStep(engine, mockInputs)
            engineInstances.set(projectId, engine)

            // Save metrics to database periodically
            if (engine.currentEpoch % 10 === 0) {
                const latestMetrics = engine.metrics[engine.metrics.length - 1]
                if (latestMetrics) {
                    const prisma = await getPrisma()
                    await prisma.avadhanSession.update({
                        where: { id: projectId },
                        data: {
                            results: JSON.parse(JSON.stringify({
                                epoch: engine.currentEpoch,
                                metrics: latestMetrics,
                                timestamp: new Date().toISOString(),
                            })),
                        },
                    })
                }
            }
        }

        return NextResponse.json({
            success: true,
            isTraining: engine.status === 'training',
            state: getEngineState(engine),
        })
    } catch (error) {
        console.error('Error getting training status:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to get training status' },
            { status: 500 }
        )
    }
}


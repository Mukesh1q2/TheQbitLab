import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
    createEngine,
    initializeSlots,
    startTraining,
    getEngineState,
    DEFAULT_ASHTA_CONFIG
} from '@/lib/avadhan'

// In-memory engine instances (in production, use Redis or similar)
const engineInstances = new Map<string, ReturnType<typeof createEngine>>()

// POST /api/training/start - Start training
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { projectId, config } = body

        if (!projectId) {
            return NextResponse.json(
                { success: false, error: 'Project ID is required' },
                { status: 400 }
            )
        }

        // Check project exists
        const project = await prisma.avadhanSession.findUnique({
            where: { id: projectId },
        })

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            )
        }

        // Create or get engine instance
        let engine = engineInstances.get(projectId)

        if (!engine) {
            // Merge config with defaults
            const engineConfig = {
                ...DEFAULT_ASHTA_CONFIG,
                ...config,
            }

            engine = createEngine(projectId, engineConfig)
            engine = initializeSlots(engine, engineConfig.numSlots)
            engineInstances.set(projectId, engine)
        }

        // Start training
        engine = startTraining(engine)
        engineInstances.set(projectId, engine)

        // Update project status
        await prisma.avadhanSession.update({
            where: { id: projectId },
            data: { status: 'TRAINING' },
        })

        return NextResponse.json({
            success: true,
            message: 'Training started',
            state: getEngineState(engine),
        })
    } catch (error) {
        console.error('Error starting training:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to start training' },
            { status: 500 }
        )
    }
}

// Export engine instances for other routes
export { engineInstances }

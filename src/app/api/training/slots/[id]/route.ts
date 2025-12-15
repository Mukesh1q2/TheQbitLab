import { NextRequest, NextResponse } from 'next/server'
import { engineInstances } from '../../start/route'

// Type for slot
interface Slot {
    id: string
    index: number
    priority: number
    lastActiveAt: Date | null
    metadata: Record<string, unknown>
    stateVector: number[]
}

interface RouteParams {
    params: { id: string }
}

// GET /api/training/slots/[id] - Get slot states
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const projectId = params.id
        const engine = engineInstances.get(projectId)

        if (!engine) {
            return NextResponse.json(
                { success: false, error: 'No active training session' },
                { status: 404 }
            )
        }

        const slots = engine.slotManager.slots.map((slot: Slot) => ({
            id: slot.id,
            index: slot.index,
            priority: slot.priority,
            lastActiveAt: slot.lastActiveAt,
            metadata: slot.metadata,
            vectorPreview: slot.stateVector.slice(0, 10), // First 10 values
            vectorNorm: Math.sqrt(slot.stateVector.reduce((sum: number, v: number) => sum + v * v, 0)),
        }))

        return NextResponse.json({
            success: true,
            slots,
            orthogonalityMatrix: engine.slotManager.orthogonalityMatrix,
            totalSlots: slots.length,
            maxSlots: engine.slotManager.maxSlots,
        })
    } catch (error) {
        console.error('Error getting slots:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to get slots' },
            { status: 500 }
        )
    }
}

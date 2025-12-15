import { NextRequest, NextResponse } from 'next/server'
import { engineInstances } from '../../start/route'

interface RouteParams {
    params: { id: string }
}

// GET /api/training/metrics/[id] - Get training metrics history
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const projectId = params.id
        const url = new URL(request.url)
        const limit = parseInt(url.searchParams.get('limit') || '100')

        const engine = engineInstances.get(projectId)

        if (!engine) {
            return NextResponse.json(
                { success: false, error: 'No active training session' },
                { status: 404 }
            )
        }

        const metrics = engine.metrics.slice(-limit)
        const latest = metrics[metrics.length - 1]

        return NextResponse.json({
            success: true,
            currentEpoch: engine.currentEpoch,
            latestMetrics: latest || null,
            metricsHistory: metrics,
            summary: latest ? {
                loss: latest.loss.toFixed(4),
                accuracy: (latest.recallAccuracy * 100).toFixed(1) + '%',
                purity: (latest.threadPurity * 100).toFixed(1) + '%',
                interference: (latest.interferenceRate * 100).toFixed(2) + '%',
            } : null,
        })
    } catch (error) {
        console.error('Error getting metrics:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to get metrics' },
            { status: 500 }
        )
    }
}

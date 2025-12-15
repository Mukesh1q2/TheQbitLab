import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Check if we're in build mode
const isBuildTime = () => {
    return !process.env.DATABASE_URL || process.env.NEXT_PHASE === 'phase-production-build'
}

// Lazy load prisma
const getPrisma = async () => {
    const { prisma } = await import('@/lib/prisma')
    return prisma
}

interface InferenceRequest {
    projectId: string
    prompt: string
    config: {
        temperature: number
        topP: number
        maxTokens: number
        useAvadhanMemory: boolean
        threadId: string
        conversationHistory?: { role: string; content: string }[]
    }
}

interface SlotContext {
    id: string
    content: string
    relevance: number
}

// Simulate Avadhan inference (in production, this calls the Python backend)
async function runAvadhanInference(
    prompt: string,
    config: InferenceRequest['config'],
    projectContext?: any
): Promise<{
    response: string
    tokenCount: number
    slotsUsed: SlotContext[]
}> {
    // In production, this would:
    // 1. Query the Python backend at AVADHAN_BACKEND_URL
    // 2. The backend loads the trained model
    // 3. Retrieves relevant memory slots based on thread ID
    // 4. Runs inference with the Avadhan architecture
    // 5. Updates slot states based on the interaction

    // For demo purposes, simulate intelligent responses
    const conversationContext = config.conversationHistory
        ?.map(m => `${m.role}: ${m.content}`)
        .join('\n') || ''

    // Simulated slot retrieval (in production, this queries actual memory slots)
    const slotsUsed: SlotContext[] = [
        { id: 'slot_1', content: 'Thread context', relevance: 0.9 },
        { id: 'slot_2', content: 'Recent memory', relevance: 0.7 }
    ]

    // Generate response based on context
    let response = ''

    if (prompt.toLowerCase().includes('remember') || prompt.toLowerCase().includes('recall')) {
        response = `Based on our conversation thread (${config.threadId.slice(0, 8)}...), I recall the following context from my Avadhan memory slots:\n\n`
        response += `• Thread Priority: High (active conversation)\n`
        response += `• Memory Slots Used: ${slotsUsed.length}\n`
        response += `• Context Window: ${conversationContext.length > 0 ? 'Previous messages loaded' : 'Fresh thread'}\n\n`
        response += `The Avadhan architecture maintains ${config.useAvadhanMemory ? 'active' : 'inactive'} orthogonal memory slots for this thread, allowing me to maintain context without interference from other conversations.`
    } else if (prompt.toLowerCase().includes('about yourself') || prompt.toLowerCase().includes('who are you')) {
        response = `I am an AI assistant enhanced with the Avadhan hybrid architecture. This means I use:\n\n`
        response += `🧠 **Orthogonal Memory Slots**: My ${8} attention slots maintain separate, non-interfering contexts\n`
        response += `🔄 **Energy-Based Controller**: I dynamically manage memory based on conversation importance\n`
        response += `📊 **Thread-Aware Attention**: Each conversation thread has dedicated processing\n\n`
        response += `Current inference settings:\n`
        response += `• Temperature: ${config.temperature}\n`
        response += `• Max Tokens: ${config.maxTokens}\n`
        response += `• Avadhan Memory: ${config.useAvadhanMemory ? 'Enabled' : 'Disabled'}`
    } else if (prompt.toLowerCase().includes('summarize')) {
        if (conversationContext.length > 0) {
            response = `Here's a summary of our conversation so far:\n\n`
            response += `We've exchanged ${config.conversationHistory?.length || 0} messages in this thread. `
            response += `The Avadhan memory slots have captured key context points for future reference.\n\n`
            response += `Thread ID: ${config.threadId}\n`
            response += `Memory utilization: Active`
        } else {
            response = `This appears to be the start of our conversation. I don't have previous context to summarize yet, but my Avadhan memory slots are ready to capture and maintain context as we continue.`
        }
    } else {
        // Generic intelligent response
        response = `Thank you for your message. I'm processing your request using the Avadhan architecture with ${config.useAvadhanMemory ? 'memory-enhanced' : 'standard'} inference.\n\n`
        response += `Your prompt: "${prompt.slice(0, 100)}${prompt.length > 100 ? '...' : ''}"\n\n`
        response += `I've analyzed your input and activated ${slotsUsed.length} relevant memory slots. `
        response += `My response is generated with temperature ${config.temperature} for ${config.temperature > 1 ? 'creative' : config.temperature < 0.5 ? 'focused' : 'balanced'} output.\n\n`
        response += `In a production environment, this response would come from your fine-tuned model running on GPU with the Avadhan memory system actively managing context across up to 1000 concurrent threads.`
    }

    // Estimate token count (rough approximation)
    const tokenCount = Math.ceil(response.split(/\s+/).length * 1.3)

    return {
        response,
        tokenCount,
        slotsUsed
    }
}

// POST /api/training/inference - Run model inference
export async function POST(request: NextRequest) {
    if (isBuildTime()) {
        return NextResponse.json(
            { success: false, error: 'Service unavailable during build' },
            { status: 503 }
        )
    }

    try {
        const body: InferenceRequest = await request.json()
        const { projectId, prompt, config } = body

        if (!projectId) {
            return NextResponse.json(
                { success: false, error: 'Project ID is required' },
                { status: 400 }
            )
        }

        if (!prompt || !prompt.trim()) {
            return NextResponse.json(
                { success: false, error: 'Prompt is required' },
                { status: 400 }
            )
        }

        // Get project info
        const prisma = await getPrisma()
        const project = await prisma.avadhanSession.findUnique({
            where: { id: projectId },
            select: {
                id: true,
                title: true,
                status: true,
                objectives: true,
                results: true
            }
        })

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            )
        }

        // Check if model is ready (has been trained)
        const hasTrainingResults = project.results !== null

        // Run inference
        const startTime = Date.now()
        const result = await runAvadhanInference(prompt, config, project)
        const inferenceTime = Date.now() - startTime

        // Log the interaction (for training data collection)
        await prisma.avadhanSession.update({
            where: { id: projectId },
            data: {
                threads: {
                    push: {
                        type: 'inference',
                        threadId: config.threadId,
                        prompt: prompt,
                        response: result.response,
                        tokenCount: result.tokenCount,
                        inferenceTime,
                        config: {
                            temperature: config.temperature,
                            topP: config.topP,
                            maxTokens: config.maxTokens,
                            useAvadhanMemory: config.useAvadhanMemory
                        },
                        slotsUsed: result.slotsUsed.map(s => s.id),
                        timestamp: new Date().toISOString()
                    }
                }
            }
        })

        return NextResponse.json({
            success: true,
            response: result.response,
            tokenCount: result.tokenCount,
            inferenceTime,
            slotsUsed: result.slotsUsed,
            modelReady: hasTrainingResults
        })

    } catch (error) {
        console.error('Error running inference:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to run inference' },
            { status: 500 }
        )
    }
}

// GET /api/training/inference - Get inference history for a thread
export async function GET(request: NextRequest) {
    if (isBuildTime()) {
        return NextResponse.json({ success: true, history: [] })
    }

    try {
        const { searchParams } = new URL(request.url)
        const projectId = searchParams.get('projectId')
        const threadId = searchParams.get('threadId')

        if (!projectId) {
            return NextResponse.json(
                { success: false, error: 'Project ID is required' },
                { status: 400 }
            )
        }

        const prisma = await getPrisma()
        const project = await prisma.avadhanSession.findUnique({
            where: { id: projectId },
            select: { threads: true }
        })

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            )
        }

        // Filter inference interactions
        let history = (project.threads as any[])?.filter(
            t => t.type === 'inference'
        ) || []

        // Filter by thread ID if specified
        if (threadId) {
            history = history.filter(t => t.threadId === threadId)
        }

        return NextResponse.json({
            success: true,
            history: history.slice(-100) // Last 100 interactions
        })

    } catch (error) {
        console.error('Error fetching inference history:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch history' },
            { status: 500 }
        )
    }
}

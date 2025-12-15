import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Available Gemini models
const MODELS = {
    'gemini-1.5-flash': 'gemini-1.5-flash',
    'gemini-1.5-pro': 'gemini-1.5-pro',
    'gemini-2.0-flash': 'gemini-2.0-flash-exp',
    'gemini-2.5-flash': 'gemini-2.5-flash-preview-05-20',
    'gemini-2.5-pro': 'gemini-2.5-pro-preview-05-06',
    'gemini-3.0-flash': 'gemini-exp-1206',
} as const

export async function POST(request: NextRequest) {
    try {
        const { message, model = 'gemini-1.5-flash', history = [] } = await request.json()

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 })
        }

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            return NextResponse.json({
                error: 'GEMINI_API_KEY not configured',
                demo: true,
                response: getDemoResponse(message)
            }, { status: 200 })
        }

        const genAI = new GoogleGenerativeAI(apiKey)
        const modelInstance = genAI.getGenerativeModel({
            model: MODELS[model as keyof typeof MODELS] || 'gemini-1.5-flash'
        })

        // Build chat history
        const chat = modelInstance.startChat({
            history: history.map((msg: { role: string; content: string }) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            })),
        })

        // Send message and get response
        const result = await chat.sendMessage(message)
        const response = result.response.text()

        return NextResponse.json({
            response,
            model: MODELS[model as keyof typeof MODELS] || 'gemini-1.5-flash',
            demo: false
        })

    } catch (error) {
        console.error('Gemini API error:', error)
        return NextResponse.json({
            error: 'Failed to get AI response',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

// Demo responses when API key is not configured
function getDemoResponse(message: string): string {
    const responses = [
        `That's an interesting question about "${message.slice(0, 30)}..."! In a live environment with the Gemini API configured, I would provide a detailed, thoughtful response.`,
        `I understand you're asking about "${message.slice(0, 30)}...". Once you add your GEMINI_API_KEY, I'll be powered by Google's advanced AI!`,
        `Great question! This is currently a demo mode. Add your Gemini API key to get real AI responses.`,
        `I'd love to help you with that! Configure your GEMINI_API_KEY in .env.local to enable full AI capabilities.`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
}

// GET endpoint to list available models
export async function GET() {
    return NextResponse.json({
        models: [
            { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Fast & efficient' },
            { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Capable' },
            { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Latest stable' },
            { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Preview' },
            { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Preview pro' },
            { id: 'gemini-3.0-flash', name: 'Gemini 3.0', description: 'Experimental' },
        ],
        status: process.env.GEMINI_API_KEY ? 'configured' : 'demo_mode'
    })
}

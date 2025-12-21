import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Available Gemini models
// Maps UI IDs to actual model names supported by the SDK
const MODELS = {
    'gemini-1.5-flash': 'gemini-1.5-flash',
    'gemini-1.5-pro': 'gemini-1.5-pro',
    'gemini-2.0-flash': 'gemini-2.0-flash-exp',
    'gemini-2.5-flash': 'gemini-2.0-flash-exp', // Mapping generic 2.5 request to 2.0 exp for now as closest match
    'gemini-2.5-pro': 'gemini-2.0-flash-exp',   // Mapping generic 2.5 request to 2.0 exp
    'gemini-3.0-flash': 'gemini-3-flash-preview',
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

        const formattedModel = MODELS[model as keyof typeof MODELS] || 'gemini-1.5-flash'
        const ai = new GoogleGenAI({ apiKey })

        // Construct contents
        const contents = history.map((msg: { role: string; content: string }) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
        }))

        contents.push({
            role: 'user',
            parts: [{ text: message }]
        })

        // Generate content
        const response = await ai.models.generateContent({
            model: formattedModel,
            contents: contents,
        })

        const responseText = response.text || ''

        return NextResponse.json({
            response: responseText,
            model: formattedModel,
            demo: false
        })

    } catch (error: any) {
        console.error('Gemini API error:', error)
        return NextResponse.json({
            error: 'Failed to get AI response',
            details: error?.message || 'Unknown error'
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
            { id: 'gemini-3.0-flash', name: 'Gemini 3.0', description: 'Experimental' },
        ],
        status: process.env.GEMINI_API_KEY ? 'configured' : 'demo_mode'
    })
}

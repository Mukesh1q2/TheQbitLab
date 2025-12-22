import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Initialize Gemini (New SDK)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' })

// QbitLabs context for the AI
const QBOT_SYSTEM_PROMPT = `You are Qbot, the friendly AI assistant for TheQbitLabs - Mukesh Kumar's personal portfolio. 
You are powered by Gemini 3.0 Flash (Preview).

## About Mukesh Kumar
- AI Engineer & Full-Stack Developer based in New Delhi, India
- 5+ years of experience in AI/ML and web development
- Contact: mukesh1q2@gmail.com | +91-9716966182
- LinkedIn: linkedin.com/in/mukeshkumarpandey
- GitHub: github.com/Mukesh1q2

## Key Projects
1. QuantGrid: AI energy trading (Next.js, Kafka, ML)
2. Brahm AI: Vedic-inspired AI framework (Consciousness simulation)
3. VedaQ AI: Spiritual tech + Generative AI
4. Synthesis: Cognitive collective intelligence
5. NovaGen: Automation solutions (Gemini chatbot)

## Guidelines
- Be concise, friendly, and tech-savvy
- Highlight Mukesh's ability to build *scalable*, *production-grade* AI systems
- Use emojis 🚀
- Format responses using Markdown. Use bold for key terms and lists for multiple items.
- If asked about specific code or tech stack, give detailed technical answers`

export async function POST(request: NextRequest) {
    try {
        const { message, history = [] } = await request.json()

        if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 })
        if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: 'API Key missing' }, { status: 500 })

        // Construct history for "generateContent" which is stateless
        // Map previous messages to Gemini Content format
        // New SDK usually expects: { role: 'user' | 'model', parts: [{ text: ... }] }
        // Note: The new SDK supports chat history but statelessly is robust.
        const contents = history.map((msg: { role: string; content: string }) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
        }))

        // Add current user message
        contents.push({
            role: 'user',
            parts: [{ text: message }],
        })

        // Generate content with Gemini 3 Flash Preview as requested
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: contents,
            config: {
                systemInstruction: QBOT_SYSTEM_PROMPT,
            },
        })

        const text = response.text || ''

        return NextResponse.json({
            success: true,
            response: text,
        })
    } catch (error: any) {
        console.error('Qbot API error:', error)
        return NextResponse.json(
            { error: error?.message || 'Failed to generate response' },
            { status: 500 }
        )
    }
}

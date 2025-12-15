import { NextRequest, NextResponse } from 'next/server'
import { createChatCompletion } from '@/lib/openai'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const ChatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['system', 'user', 'assistant']),
    content: z.string(),
  })),
  model: z.string().default('gpt-3.5-turbo'),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().optional(),
  userId: z.string().optional(),
})

// POST /api/openai/chat - Send chat message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ChatSchema.parse(body)

    // Save conversation to database if userId provided
    let conversation = null
    if (validatedData.userId) {
      conversation = await prisma.conversation.create({
        data: {
          userId: validatedData.userId,
          title: validatedData.messages[0]?.content?.substring(0, 50) || 'Chat Conversation',
          mode: validatedData.model,
          messages: validatedData.messages,
        },
      })
    }

    // Make request to OpenAI
    const completion = await createChatCompletion(
      validatedData.messages,
      validatedData.model,
      validatedData.temperature,
      validatedData.maxTokens
    )

    // Update conversation with response (add assistant message)
    if (conversation) {
      const updatedMessages = [...validatedData.messages, completion.choices[0].message] as any
      await prisma.conversation.update({
        where: { id: conversation.id },
        data: {
          messages: updatedMessages,
          updatedAt: new Date(),
        },
      })
    }

    return NextResponse.json({
      success: true,
      response: completion.choices[0].message,
      conversationId: conversation?.id,
    })
  } catch (error) {
    console.error('Error in OpenAI chat:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}

// GET /api/openai/chat - Get conversation history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const conversationId = searchParams.get('conversationId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (conversationId) {
      // Get specific conversation
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
      })

      if (!conversation) {
        return NextResponse.json(
          { error: 'Conversation not found' },
          { status: 404 }
        )
      }

      // Check if user has access to this conversation
      if (userId && conversation.userId !== userId) {
        return NextResponse.json(
          { error: 'Unauthorized access to conversation' },
          { status: 403 }
        )
      }

      return NextResponse.json({ conversation })
    }

    // Get user's conversations
    if (!userId) {
      return NextResponse.json(
        { error: 'userId parameter is required' },
        { status: 400 }
      )
    }

    const conversations = await prisma.conversation.findMany({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        mode: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    const total = await prisma.conversation.count({
      where: { userId },
    })

    return NextResponse.json({
      conversations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    )
  }
}

// DELETE /api/openai/chat - Delete conversation
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversationId')
    const userId = searchParams.get('userId')

    if (!conversationId || !userId) {
      return NextResponse.json(
        { error: 'conversationId and userId parameters are required' },
        { status: 400 }
      )
    }

    // Check if conversation exists and user owns it
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    if (conversation.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this conversation' },
        { status: 403 }
      )
    }

    await prisma.conversation.delete({
      where: { id: conversationId },
    })

    return NextResponse.json({
      success: true,
      message: 'Conversation deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting conversation:', error)
    return NextResponse.json(
      { error: 'Failed to delete conversation' },
      { status: 500 }
    )
  }
}
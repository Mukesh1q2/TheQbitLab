import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/lib/prisma'

// POST /api/training/upload - Upload model file
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null
        const projectId = formData.get('projectId') as string | null
        const format = formData.get('format') as string || 'custom'

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            )
        }

        if (!projectId) {
            return NextResponse.json(
                { success: false, error: 'Project ID is required' },
                { status: 400 }
            )
        }

        // Validate file format
        const validFormats = ['onnx', 'pytorch', 'tensorflow', 'safetensors', 'bin', 'custom']
        const extension = file.name.split('.').pop()?.toLowerCase() || ''

        // Create uploads directory
        const uploadsDir = join(process.cwd(), 'uploads', 'models', projectId)
        await mkdir(uploadsDir, { recursive: true })

        // Generate unique filename
        const timestamp = Date.now()
        const filename = `model_${timestamp}_${file.name}`
        const filepath = join(uploadsDir, filename)

        // Write file
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filepath, buffer)

        // Update project with model path
        const project = await prisma.avadhanSession.update({
            where: { id: projectId },
            data: {
                objectives: {
                    push: {
                        type: 'model_upload',
                        filename: file.name,
                        filepath: filepath,
                        format: format,
                        size: buffer.length,
                        uploadedAt: new Date().toISOString(),
                    }
                },
                status: 'UPLOADING',
            },
        })

        return NextResponse.json({
            success: true,
            upload: {
                filename: file.name,
                filepath: filepath.replace(process.cwd(), ''),
                format: format,
                size: buffer.length,
                sizeFormatted: formatBytes(buffer.length),
            },
            project: {
                id: project.id,
                status: 'UPLOADING',
            }
        })
    } catch (error) {
        console.error('Error uploading model:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to upload model' },
            { status: 500 }
        )
    }
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

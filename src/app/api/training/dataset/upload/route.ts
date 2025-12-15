import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { join } from 'path'

// Force dynamic rendering - prevents build-time data collection
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

// Supported formats
const SUPPORTED_FORMATS = ['json', 'jsonl', 'csv', 'tsv', 'parquet', 'txt', 'arrow', 'zip']

interface DatasetStats {
    totalSamples: number
    avgLength: number
    maxLength: number
    minLength: number
    columns: string[]
}

// Parse and analyze dataset
async function analyzeDataset(
    filepath: string,
    format: string
): Promise<{ stats: DatasetStats; preview: any[] }> {
    const content = await readFile(filepath, 'utf-8')
    let rows: any[] = []
    let columns: string[] = []

    switch (format) {
        case 'json':
            const jsonData = JSON.parse(content)
            rows = Array.isArray(jsonData) ? jsonData : [jsonData]
            columns = rows.length > 0 ? Object.keys(rows[0]) : []
            break

        case 'jsonl':
            rows = content.trim().split('\n').map(line => {
                try {
                    return JSON.parse(line)
                } catch {
                    return null
                }
            }).filter(Boolean)
            columns = rows.length > 0 ? Object.keys(rows[0]) : []
            break

        case 'csv':
        case 'tsv':
            const delimiter = format === 'csv' ? ',' : '\t'
            const lines = content.trim().split('\n')
            columns = lines[0].split(delimiter).map(c => c.trim().replace(/"/g, ''))
            rows = lines.slice(1).map(line => {
                const values = line.split(delimiter).map(v => v.trim().replace(/"/g, ''))
                return columns.reduce((obj, col, i) => ({ ...obj, [col]: values[i] }), {})
            })
            break

        case 'txt':
            rows = content.trim().split('\n').map(line => ({ text: line }))
            columns = ['text']
            break

        default:
            rows = []
            columns = []
    }

    // Calculate stats
    const textLengths = rows.map(row => {
        const textValue = row.text || row.content || row.input || row.message ||
            Object.values(row).find(v => typeof v === 'string') || ''
        return String(textValue).length
    })

    const stats: DatasetStats = {
        totalSamples: rows.length,
        avgLength: textLengths.length > 0
            ? Math.round(textLengths.reduce((a, b) => a + b, 0) / textLengths.length)
            : 0,
        maxLength: textLengths.length > 0 ? Math.max(...textLengths) : 0,
        minLength: textLengths.length > 0 ? Math.min(...textLengths) : 0,
        columns,
    }

    return {
        stats,
        preview: rows.slice(0, 10) // First 10 rows for preview
    }
}

// POST /api/training/dataset/upload - Upload dataset file
export async function POST(request: NextRequest) {
    if (isBuildTime()) {
        return NextResponse.json(
            { success: false, error: 'Service unavailable during build' },
            { status: 503 }
        )
    }

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null
        const projectId = formData.get('projectId') as string | null
        const format = formData.get('format') as string || 'txt'
        const datasetType = formData.get('type') as string || 'text_corpus'
        const configStr = formData.get('config') as string || '{}'

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

        // Validate format
        if (!SUPPORTED_FORMATS.includes(format)) {
            return NextResponse.json(
                { success: false, error: `Unsupported format: ${format}. Supported: ${SUPPORTED_FORMATS.join(', ')}` },
                { status: 400 }
            )
        }

        // Create uploads directory
        const uploadsDir = join(process.cwd(), 'uploads', 'datasets', projectId)
        await mkdir(uploadsDir, { recursive: true })

        // Generate unique filename
        const timestamp = Date.now()
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const filename = `dataset_${timestamp}_${sanitizedName}`
        const filepath = join(uploadsDir, filename)

        // Write file
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filepath, buffer)

        // Analyze dataset (for text-based formats)
        let analysis: { stats: DatasetStats; preview: any[] } | null = null
        if (['json', 'jsonl', 'csv', 'tsv', 'txt'].includes(format)) {
            try {
                analysis = await analyzeDataset(filepath, format)
            } catch (err) {
                console.error('Dataset analysis error:', err)
            }
        }

        // Parse config
        let config = {}
        try {
            config = JSON.parse(configStr)
        } catch {
            config = {}
        }

        // Update project with dataset info
        const prisma = await getPrisma()
        const project = await prisma.avadhanSession.update({
            where: { id: projectId },
            data: {
                objectives: {
                    push: {
                        type: 'dataset_upload',
                        datasetId: `ds_${timestamp}`,
                        filename: file.name,
                        filepath: filepath,
                        format: format,
                        datasetType: datasetType,
                        size: buffer.length,
                        stats: analysis?.stats || {},
                        config: config,
                        uploadedAt: new Date().toISOString(),
                    }
                },
            },
        })

        return NextResponse.json({
            success: true,
            datasetId: `ds_${timestamp}`,
            upload: {
                filename: file.name,
                filepath: filepath.replace(process.cwd(), ''),
                format: format,
                type: datasetType,
                size: buffer.length,
                sizeFormatted: formatBytes(buffer.length),
            },
            stats: analysis?.stats || null,
            preview: analysis?.preview || null,
            project: {
                id: project.id,
            }
        })
    } catch (error) {
        console.error('Error uploading dataset:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to upload dataset' },
            { status: 500 }
        )
    }
}

// GET /api/training/dataset/upload - List datasets for a project
export async function GET(request: NextRequest) {
    if (isBuildTime()) {
        return NextResponse.json({ success: true, datasets: [] })
    }

    try {
        const { searchParams } = new URL(request.url)
        const projectId = searchParams.get('projectId')

        if (!projectId) {
            return NextResponse.json(
                { success: false, error: 'Project ID is required' },
                { status: 400 }
            )
        }

        const prisma = await getPrisma()
        const project = await prisma.avadhanSession.findUnique({
            where: { id: projectId },
            select: { objectives: true }
        })

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            )
        }

        // Filter dataset uploads from objectives
        const datasets = (project.objectives as any[])?.filter(
            obj => obj.type === 'dataset_upload'
        ) || []

        return NextResponse.json({
            success: true,
            datasets,
        })
    } catch (error) {
        console.error('Error fetching datasets:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch datasets' },
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

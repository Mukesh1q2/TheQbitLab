'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Database,
    Upload,
    FileSpreadsheet,
    FileJson,
    FileText,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    Settings,
    Eye,
    Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    DatasetFormat,
    DatasetType,
    DatasetPreview,
    SUPPORTED_EXTENSIONS,
    DATASET_FORMAT_EXTENSIONS,
    DATASET_SCHEMA_TEMPLATES,
    DEFAULT_PREPROCESSING,
    DEFAULT_SPLITTING,
} from '@/lib/avadhan/dataset-types'

interface DatasetUploadProps {
    projectId?: string
    onUploadComplete?: (data: { datasetId: string; stats: any }) => void
}

export function DatasetUpload({ projectId, onUploadComplete }: DatasetUploadProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    // Configuration state
    const [showConfig, setShowConfig] = useState(false)
    const [datasetType, setDatasetType] = useState<DatasetType>('text_corpus')
    const [detectedFormat, setDetectedFormat] = useState<DatasetFormat | null>(null)

    // Preview state
    const [preview, setPreview] = useState<DatasetPreview | null>(null)
    const [showPreview, setShowPreview] = useState(false)

    const getFileIcon = (format: DatasetFormat | null) => {
        switch (format) {
            case 'json':
            case 'jsonl':
                return <FileJson className="w-12 h-12 text-amber-500" />
            case 'csv':
            case 'tsv':
            case 'parquet':
                return <FileSpreadsheet className="w-12 h-12 text-green-500" />
            case 'txt':
                return <FileText className="w-12 h-12 text-blue-500" />
            default:
                return <Database className="w-12 h-12 text-primary" />
        }
    }

    const detectFormat = (filename: string): DatasetFormat => {
        const ext = filename.split('.').pop()?.toLowerCase() || ''
        return DATASET_FORMAT_EXTENSIONS[ext] || 'txt'
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        setError(null)

        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) {
            validateAndSetFile(droppedFile)
        }
    }, [])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            validateAndSetFile(selectedFile)
        }
    }

    const validateAndSetFile = async (file: File) => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase()
        if (!SUPPORTED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext))) {
            setError(`Unsupported format. Supported: ${SUPPORTED_EXTENSIONS.join(', ')}`)
            return
        }

        const format = detectFormat(file.name)
        setDetectedFormat(format)
        setFile(file)
        setSuccess(false)

        // Generate preview for smaller files
        if (file.size < 5 * 1024 * 1024) { // Less than 5MB
            await generatePreview(file, format)
        }
    }

    const generatePreview = async (file: File, format: DatasetFormat) => {
        try {
            const text = await file.slice(0, 100000).text() // First 100KB

            let rows: Record<string, unknown>[] = []
            let columns: string[] = []

            if (format === 'json') {
                const data = JSON.parse(text)
                if (Array.isArray(data)) {
                    rows = data.slice(0, 10)
                    columns = rows.length > 0 ? Object.keys(rows[0]) : []
                }
            } else if (format === 'jsonl') {
                const lines = text.trim().split('\n').slice(0, 10)
                rows = lines.map(line => JSON.parse(line))
                columns = rows.length > 0 ? Object.keys(rows[0]) : []
            } else if (format === 'csv' || format === 'tsv') {
                const delimiter = format === 'csv' ? ',' : '\t'
                const lines = text.trim().split('\n')
                columns = lines[0].split(delimiter).map(c => c.trim().replace(/"/g, ''))
                rows = lines.slice(1, 11).map(line => {
                    const values = line.split(delimiter).map(v => v.trim().replace(/"/g, ''))
                    return columns.reduce((obj, col, i) => ({ ...obj, [col]: values[i] }), {})
                })
            } else if (format === 'txt') {
                const lines = text.trim().split('\n').slice(0, 10)
                columns = ['text']
                rows = lines.map(line => ({ text: line }))
            }

            setPreview({
                columns,
                rows,
                totalRows: rows.length,
            })
        } catch (err) {
            console.error('Failed to generate preview:', err)
        }
    }

    const uploadDataset = async () => {
        if (!file || !projectId) return

        setUploading(true)
        setUploadProgress(0)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('projectId', projectId)
            formData.append('format', detectedFormat || 'txt')
            formData.append('type', datasetType)
            formData.append('config', JSON.stringify({
                preprocessing: DEFAULT_PREPROCESSING,
                splitting: DEFAULT_SPLITTING,
            }))

            // Simulate progress for large files
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 5, 90))
            }, 300)

            const response = await fetch('/api/training/dataset/upload', {
                method: 'POST',
                body: formData,
            })

            clearInterval(progressInterval)
            setUploadProgress(100)

            const data = await response.json()
            if (!data.success) {
                throw new Error(data.error)
            }

            setSuccess(true)
            onUploadComplete?.(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const datasetTypeOptions: { value: DatasetType; label: string; description: string }[] = [
        { value: 'text_corpus', label: 'Text Corpus', description: 'Raw text for language modeling' },
        { value: 'qa_pairs', label: 'Q&A Pairs', description: 'Question-Answer dataset' },
        { value: 'instruction_tuning', label: 'Instruction Tuning', description: 'Instruction-Response pairs' },
        { value: 'multi_thread', label: 'Multi-Thread', description: 'Multi-turn conversations (Avadhan optimal)' },
        { value: 'classification', label: 'Classification', description: 'Text classification labels' },
        { value: 'embedding_pairs', label: 'Embedding Pairs', description: 'Sentence pairs for embedding' },
        { value: 'custom', label: 'Custom', description: 'Define your own schema' },
    ]

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Upload Dataset</h3>
                </div>
                {file && (
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Settings className="w-4 h-4" />
                        Configure
                        <ChevronDown className={cn("w-4 h-4 transition-transform", showConfig && "rotate-180")} />
                    </button>
                )}
            </div>

            {/* Drop zone */}
            <motion.div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={cn(
                    'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
                    isDragging ? 'border-primary bg-primary/5' : 'border-border',
                    'hover:border-primary/50 cursor-pointer'
                )}
                onClick={() => document.getElementById('dataset-input')?.click()}
            >
                <input
                    id="dataset-input"
                    type="file"
                    accept={SUPPORTED_EXTENSIONS.join(',')}
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {file ? (
                    <div className="space-y-2">
                        {getFileIcon(detectedFormat)}
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {formatBytes(file.size)} • {detectedFormat?.toUpperCase() || 'Unknown'}
                        </p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setFile(null)
                                setSuccess(false)
                                setPreview(null)
                                setDetectedFormat(null)
                            }}
                            className="text-destructive hover:underline text-sm"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className="text-foreground">
                            Drop your dataset here or <span className="text-primary">browse</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Supports: JSON, JSONL, CSV, TSV, Parquet, TXT, Arrow
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Configuration Panel */}
            <AnimatePresence>
                {showConfig && file && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 p-4 bg-secondary/30 rounded-lg space-y-4">
                            {/* Dataset Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Dataset Type
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {datasetTypeOptions.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setDatasetType(option.value)}
                                            className={cn(
                                                'p-3 rounded-lg text-left transition-colors border',
                                                datasetType === option.value
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                            )}
                                        >
                                            <p className="font-medium text-sm text-foreground">{option.label}</p>
                                            <p className="text-xs text-muted-foreground">{option.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Expected Schema */}
                            {datasetType !== 'custom' && (
                                <div className="p-3 bg-secondary/50 rounded-lg">
                                    <p className="text-xs font-medium text-muted-foreground mb-2">Expected columns:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {DATASET_SCHEMA_TEMPLATES[datasetType].columns.map(col => (
                                            <span
                                                key={col.name}
                                                className={cn(
                                                    'px-2 py-1 rounded text-xs',
                                                    col.required
                                                        ? 'bg-primary/20 text-primary'
                                                        : 'bg-muted text-muted-foreground'
                                                )}
                                            >
                                                {col.name}{col.required && '*'}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preview Panel */}
            {preview && preview.rows.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2"
                    >
                        <Eye className="w-4 h-4" />
                        Preview Data
                        <ChevronDown className={cn("w-4 h-4 transition-transform", showPreview && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {showPreview && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="overflow-x-auto rounded-lg border border-border">
                                    <table className="w-full text-sm">
                                        <thead className="bg-secondary/50">
                                            <tr>
                                                {preview.columns.map(col => (
                                                    <th key={col} className="px-3 py-2 text-left font-medium text-foreground">
                                                        {col}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {preview.rows.map((row, i) => (
                                                <tr key={i} className="border-t border-border">
                                                    {preview.columns.map(col => (
                                                        <td key={col} className="px-3 py-2 text-muted-foreground truncate max-w-[200px]">
                                                            {String(row[col] || '')}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Progress bar */}
            {uploading && (
                <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing dataset...
                        </span>
                        <span className="text-foreground">{uploadProgress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="mt-4 flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Success */}
            {success && (
                <div className="mt-4 flex items-center gap-2 text-green-500 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Dataset uploaded and processed successfully!
                </div>
            )}

            {/* Upload button */}
            {file && !success && (
                <button
                    onClick={uploadDataset}
                    disabled={uploading || !projectId}
                    className={cn(
                        'w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors',
                        'bg-primary text-primary-foreground',
                        'hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                >
                    {uploading ? 'Processing...' : 'Upload Dataset'}
                </button>
            )}

            {!projectId && (
                <p className="mt-4 text-sm text-amber-500">
                    Create a project first to upload a dataset
                </p>
            )}
        </div>
    )
}

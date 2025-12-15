'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileCode, CheckCircle, AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModelUploadProps {
    projectId?: string
    onUploadComplete?: (data: { filepath: string; format: string }) => void
}

export function ModelUpload({ projectId, onUploadComplete }: ModelUploadProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const validFormats = ['.onnx', '.pt', '.pth', '.bin', '.safetensors', '.h5', '.pb']

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

    const validateAndSetFile = (file: File) => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase()
        if (!validFormats.includes(extension)) {
            setError(`Invalid format. Supported: ${validFormats.join(', ')}`)
            return
        }
        setFile(file)
        setSuccess(false)
    }

    const uploadFile = async () => {
        if (!file || !projectId) return

        setUploading(true)
        setUploadProgress(0)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('projectId', projectId)
            formData.append('format', getFormat(file.name))

            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 10, 90))
            }, 200)

            const response = await fetch('/api/training/upload', {
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
            onUploadComplete?.(data.upload)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const getFormat = (filename: string): string => {
        const ext = filename.split('.').pop()?.toLowerCase()
        const formatMap: Record<string, string> = {
            'onnx': 'onnx',
            'pt': 'pytorch',
            'pth': 'pytorch',
            'bin': 'pytorch',
            'safetensors': 'pytorch',
            'h5': 'tensorflow',
            'pb': 'tensorflow',
        }
        return formatMap[ext || ''] || 'custom'
    }

    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Upload Model</h3>
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
                onClick={() => document.getElementById('file-input')?.click()}
            >
                <input
                    id="file-input"
                    type="file"
                    accept={validFormats.join(',')}
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {file ? (
                    <div className="space-y-2">
                        <FileCode className="w-12 h-12 mx-auto text-primary" />
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {formatBytes(file.size)} • {getFormat(file.name).toUpperCase()}
                        </p>
                        <button
                            onClick={(e) => { e.stopPropagation(); setFile(null); setSuccess(false) }}
                            className="text-destructive hover:underline text-sm"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className="text-foreground">
                            Drop your model file here or <span className="text-primary">browse</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Supports: ONNX, PyTorch, TensorFlow, SafeTensors
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Progress bar */}
            {uploading && (
                <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Uploading...</span>
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
                    Model uploaded successfully!
                </div>
            )}

            {/* Upload button */}
            {file && !success && (
                <button
                    onClick={uploadFile}
                    disabled={uploading || !projectId}
                    className={cn(
                        'w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors',
                        'bg-primary text-primary-foreground',
                        'hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                >
                    {uploading ? 'Uploading...' : 'Upload Model'}
                </button>
            )}

            {!projectId && (
                <p className="mt-4 text-sm text-amber-500">
                    Create a project first to upload a model
                </p>
            )}
        </div>
    )
}

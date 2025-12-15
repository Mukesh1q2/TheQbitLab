// Avadhan Training Module - Dataset Type Definitions
// Supports multiple data formats for training

export type DatasetFormat =
    | 'json'
    | 'jsonl'
    | 'csv'
    | 'tsv'
    | 'parquet'
    | 'txt'
    | 'arrow'
    | 'zip'
    | 'tar.gz'
    | 'huggingface'

export type DatasetType =
    | 'text_corpus'        // Raw text for language modeling
    | 'qa_pairs'           // Question-Answer pairs
    | 'instruction_tuning' // Instruction-Response pairs
    | 'multi_thread'       // Multi-turn conversations
    | 'classification'     // Text classification
    | 'embedding_pairs'    // Sentence pairs for embedding training
    | 'custom'             // Custom format with schema

export interface DatasetColumn {
    name: string
    type: 'text' | 'number' | 'boolean' | 'json' | 'embedding'
    role: 'input' | 'output' | 'context' | 'metadata' | 'thread_id'
    required: boolean
}

export interface DatasetSchema {
    columns: DatasetColumn[]
    textColumn?: string       // Primary text input column
    labelColumn?: string      // Primary label/output column
    threadIdColumn?: string   // For multi-thread conversations
    contextColumn?: string    // Additional context
    embeddingColumn?: string  // Pre-computed embeddings
}

export interface DatasetConfig {
    format: DatasetFormat
    type: DatasetType
    schema?: DatasetSchema
    preprocessing: DatasetPreprocessing
    splitting: DatasetSplitting
    batching: BatchConfig
}

export interface DatasetPreprocessing {
    // Text preprocessing
    lowercase: boolean
    removeHtml: boolean
    stripWhitespace: boolean
    maxLength?: number
    truncation: 'start' | 'end' | 'middle' | 'none'

    // Tokenization (if needed)
    tokenize: boolean
    tokenizerPath?: string

    // Filtering
    minLength?: number
    filterEmpty: boolean
    deduplication: boolean

    // Augmentation
    augmentation?: {
        enabled: boolean
        methods: ('synonym_replace' | 'back_translation' | 'random_insert' | 'shuffle')[]
        augmentRatio: number
    }
}

export interface DatasetSplitting {
    trainRatio: number      // e.g., 0.8
    validationRatio: number // e.g., 0.1
    testRatio: number       // e.g., 0.1
    seed: number
    stratifyBy?: string     // Column to stratify by
    shuffleSplit: boolean
}

export interface BatchConfig {
    batchSize: number
    shuffleBatches: boolean
    dropLastIncomplete: boolean
    numWorkers: number
    prefetchFactor: number
}

export interface DatasetMetadata {
    id: string
    projectId: string
    name: string
    description?: string
    format: DatasetFormat
    type: DatasetType
    config: DatasetConfig

    // File info
    filename: string
    filepath: string
    fileSize: number
    checksum?: string

    // Statistics
    stats: DatasetStats

    // Status
    status: DatasetStatus
    uploadedAt: Date
    processedAt?: Date
    error?: string
}

export interface DatasetStats {
    totalSamples: number
    trainSamples: number
    validationSamples: number
    testSamples: number

    // Text statistics
    avgLength?: number
    maxLength?: number
    minLength?: number
    vocabularySize?: number

    // Distribution info
    labelDistribution?: Record<string, number>
    threadDistribution?: Record<string, number>

    // Quality metrics
    duplicateRatio?: number
    emptyRatio?: number
}

export type DatasetStatus =
    | 'uploading'
    | 'validating'
    | 'preprocessing'
    | 'ready'
    | 'error'

// Dataset preview types
export interface DatasetPreview {
    columns: string[]
    rows: Record<string, unknown>[]
    totalRows: number
    schema?: DatasetSchema
}

// Upload request types
export interface UploadDatasetRequest {
    projectId: string
    file: File
    name?: string
    description?: string
    format?: DatasetFormat
    type?: DatasetType
    config?: Partial<DatasetConfig>
}

export interface DatasetUploadResponse {
    success: boolean
    dataset?: DatasetMetadata
    preview?: DatasetPreview
    error?: string
}

// Default configurations
export const DEFAULT_PREPROCESSING: DatasetPreprocessing = {
    lowercase: false,
    removeHtml: true,
    stripWhitespace: true,
    maxLength: 2048,
    truncation: 'end',
    tokenize: false,
    minLength: 1,
    filterEmpty: true,
    deduplication: true,
}

export const DEFAULT_SPLITTING: DatasetSplitting = {
    trainRatio: 0.8,
    validationRatio: 0.1,
    testRatio: 0.1,
    seed: 42,
    shuffleSplit: true,
}

export const DEFAULT_BATCH_CONFIG: BatchConfig = {
    batchSize: 32,
    shuffleBatches: true,
    dropLastIncomplete: false,
    numWorkers: 4,
    prefetchFactor: 2,
}

// Format detection utility
export const DATASET_FORMAT_EXTENSIONS: Record<string, DatasetFormat> = {
    'json': 'json',
    'jsonl': 'jsonl',
    'ndjson': 'jsonl',
    'csv': 'csv',
    'tsv': 'tsv',
    'parquet': 'parquet',
    'txt': 'txt',
    'text': 'txt',
    'arrow': 'arrow',
    'zip': 'zip',
    'gz': 'tar.gz',
    'tar': 'tar.gz',
}

export const SUPPORTED_EXTENSIONS = [
    '.json', '.jsonl', '.ndjson',
    '.csv', '.tsv',
    '.parquet',
    '.txt', '.text',
    '.arrow',
    '.zip', '.tar.gz', '.tgz'
]

// Schema templates for common dataset types
export const DATASET_SCHEMA_TEMPLATES: Record<DatasetType, DatasetSchema> = {
    text_corpus: {
        columns: [
            { name: 'text', type: 'text', role: 'input', required: true },
        ],
        textColumn: 'text',
    },
    qa_pairs: {
        columns: [
            { name: 'question', type: 'text', role: 'input', required: true },
            { name: 'answer', type: 'text', role: 'output', required: true },
            { name: 'context', type: 'text', role: 'context', required: false },
        ],
        textColumn: 'question',
        labelColumn: 'answer',
        contextColumn: 'context',
    },
    instruction_tuning: {
        columns: [
            { name: 'instruction', type: 'text', role: 'input', required: true },
            { name: 'input', type: 'text', role: 'context', required: false },
            { name: 'output', type: 'text', role: 'output', required: true },
        ],
        textColumn: 'instruction',
        labelColumn: 'output',
        contextColumn: 'input',
    },
    multi_thread: {
        columns: [
            { name: 'thread_id', type: 'text', role: 'thread_id', required: true },
            { name: 'message', type: 'text', role: 'input', required: true },
            { name: 'response', type: 'text', role: 'output', required: false },
            { name: 'turn', type: 'number', role: 'metadata', required: false },
        ],
        textColumn: 'message',
        labelColumn: 'response',
        threadIdColumn: 'thread_id',
    },
    classification: {
        columns: [
            { name: 'text', type: 'text', role: 'input', required: true },
            { name: 'label', type: 'text', role: 'output', required: true },
        ],
        textColumn: 'text',
        labelColumn: 'label',
    },
    embedding_pairs: {
        columns: [
            { name: 'text_a', type: 'text', role: 'input', required: true },
            { name: 'text_b', type: 'text', role: 'output', required: true },
            { name: 'similarity', type: 'number', role: 'metadata', required: false },
        ],
        textColumn: 'text_a',
        labelColumn: 'text_b',
    },
    custom: {
        columns: [],
    },
}

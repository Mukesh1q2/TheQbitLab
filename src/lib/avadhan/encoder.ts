// Avadhan Encoder
// Text → Vector encoding for slot state initialization
// Reference: Whitepaper Section 2.1 & 4.1

/**
 * Simple text encoder that creates vector representations
 * In production, this would use a trained encoder model (sentence-transformers, etc.)
 */

/**
 * Encode text to a vector using character/word statistics
 * This is a simplified encoder - in production use a neural encoder
 */
export function encodeText(text: string, dim: number = 512): number[] {
    const vector = new Array(dim).fill(0)

    if (!text || text.length === 0) {
        return vector.map(() => Math.random() * 0.1 - 0.05)
    }

    // Character-level features (first dim/4)
    const chars = text.toLowerCase().split('')
    for (let i = 0; i < chars.length && i < dim / 4; i++) {
        const charCode = chars[i].charCodeAt(0)
        vector[i] = (charCode % 128) / 128 - 0.5
    }

    // Word-level features (next dim/4)
    const words = text.toLowerCase().split(/\s+/)
    for (let i = 0; i < words.length && i < dim / 4; i++) {
        const hash = simpleHash(words[i])
        vector[dim / 4 + i] = (hash % 1000) / 1000 - 0.5
    }

    // N-gram features (next dim/4)
    const ngrams = getNGrams(text.toLowerCase(), 3)
    for (let i = 0; i < ngrams.length && i < dim / 4; i++) {
        const hash = simpleHash(ngrams[i])
        vector[dim / 2 + i] = (hash % 1000) / 1000 - 0.5
    }

    // Statistical features (last dim/4)
    vector[3 * dim / 4] = text.length / 1000 // Length
    vector[3 * dim / 4 + 1] = words.length / 100 // Word count
    vector[3 * dim / 4 + 2] = (text.match(/[.!?]/g) || []).length / 10 // Sentence count
    vector[3 * dim / 4 + 3] = (text.match(/[A-Z]/g) || []).length / text.length // Capital ratio

    // Add some random noise for remaining positions
    for (let i = 3 * dim / 4 + 4; i < dim; i++) {
        vector[i] = Math.random() * 0.1 - 0.05
    }

    // Normalize
    return normalize(vector)
}

/**
 * Simple hash function for strings
 */
function simpleHash(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
}

/**
 * Get character n-grams
 */
function getNGrams(text: string, n: number): string[] {
    const ngrams: string[] = []
    for (let i = 0; i <= text.length - n; i++) {
        ngrams.push(text.slice(i, i + n))
    }
    return ngrams
}

/**
 * Normalize vector to unit length
 */
function normalize(vector: number[]): number[] {
    const norm = Math.sqrt(vector.reduce((sum, x) => sum + x * x, 0))
    if (norm === 0) return vector
    return vector.map(x => x / norm)
}

/**
 * Compose two vectors (for updating slot state)
 * Uses weighted average with normalization
 */
export function composeVectors(
    existing: number[],
    update: number[],
    alpha: number = 0.7
): number[] {
    if (existing.length !== update.length) {
        throw new Error('Vector dimensions must match')
    }

    const composed = existing.map((v, i) =>
        alpha * v + (1 - alpha) * update[i]
    )

    return normalize(composed)
}

/**
 * Compute similarity between two vectors
 */
export function computeSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0

    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i]
        normA += a[i] * a[i]
        normB += b[i] * b[i]
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB)
    return denominator === 0 ? 0 : dotProduct / denominator
}

/**
 * Generate random vector (for initialization)
 */
export function randomVector(dim: number = 512): number[] {
    const vector = Array(dim).fill(0).map(() => Math.random() * 2 - 1)
    return normalize(vector)
}

/**
 * Encode multiple texts and return average vector
 */
export function encodeTexts(texts: string[], dim: number = 512): number[] {
    if (texts.length === 0) return randomVector(dim)

    const vectors = texts.map(t => encodeText(t, dim))
    const avgVector = new Array(dim).fill(0)

    for (const vec of vectors) {
        for (let i = 0; i < dim; i++) {
            avgVector[i] += vec[i]
        }
    }

    return normalize(avgVector.map(v => v / texts.length))
}

/**
 * Distance metric for vector comparison
 */
export function euclideanDistance(a: number[], b: number[]): number {
    if (a.length !== b.length) return Infinity

    let sum = 0
    for (let i = 0; i < a.length; i++) {
        const diff = a[i] - b[i]
        sum += diff * diff
    }

    return Math.sqrt(sum)
}

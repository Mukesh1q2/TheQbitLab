// Avadhan Orthogonalizer
// Implements Gram-Schmidt orthogonalization for interference control
// Reference: Whitepaper Section 5 & 13

import { Slot } from './types'

/**
 * Compute the inner product (dot product) of two vectors
 */
export function innerProduct(a: number[], b: number[]): number {
    if (a.length !== b.length) {
        throw new Error('Vectors must have same dimension')
    }
    return a.reduce((sum, val, i) => sum + val * b[i], 0)
}

/**
 * Compute the L2 norm of a vector
 */
export function norm(v: number[]): number {
    return Math.sqrt(innerProduct(v, v))
}

/**
 * Normalize a vector to unit length
 */
export function normalize(v: number[], eps: number = 1e-6): number[] {
    const n = norm(v)
    if (n < eps) return v.map(() => 0)
    return v.map(x => x / n)
}

/**
 * Subtract vector b from a (element-wise)
 */
export function subtract(a: number[], b: number[]): number[] {
    return a.map((val, i) => val - b[i])
}

/**
 * Scale vector by scalar
 */
export function scale(v: number[], s: number): number[] {
    return v.map(x => x * s)
}

/**
 * Soft Gram-Schmidt Orthogonalization
 * Enforces orthogonality across all slot state vectors
 * 
 * From whitepaper:
 * S̃_i = S_i - Σ_{j<i} (⟨S_i, S_j⟩ / |S_j|²) S_j
 * S'_i = S̃_i / |S̃_i|
 */
export function orthogonalize(slots: Slot[], eps: number = 1e-6): Slot[] {
    if (slots.length === 0) return []

    const orthSlots: Slot[] = []
    const orthVectors: number[][] = []

    for (let i = 0; i < slots.length; i++) {
        let v = [...slots[i].stateVector]

        // Subtract projections onto all previous orthogonal vectors
        for (let j = 0; j < i; j++) {
            const u = orthVectors[j]
            const uNormSq = innerProduct(u, u)
            if (uNormSq > eps) {
                const coeff = innerProduct(v, u) / uNormSq
                const projection = scale(u, coeff)
                v = subtract(v, projection)
            }
        }

        // Normalize
        const vNorm = norm(v)
        if (vNorm > eps) {
            v = scale(v, 1 / vNorm)
        }

        orthVectors.push(v)
        orthSlots.push({
            ...slots[i],
            stateVector: v,
        })
    }

    return orthSlots
}

/**
 * Compute orthogonality matrix: ⟨S_i, S_j⟩ for all pairs
 * Ideal: all off-diagonal elements should be 0
 */
export function computeOrthogonalityMatrix(slots: Slot[]): number[][] {
    const n = slots.length
    const matrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(0))

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = innerProduct(
                normalize(slots[i].stateVector),
                normalize(slots[j].stateVector)
            )
        }
    }

    return matrix
}

/**
 * Compute interference score
 * Lower is better; 0 means perfect orthogonality
 */
export function computeInterferenceScore(slots: Slot[]): number {
    const matrix = computeOrthogonalityMatrix(slots)
    let totalInterference = 0
    let count = 0

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (i !== j) {
                totalInterference += Math.abs(matrix[i][j])
                count++
            }
        }
    }

    return count > 0 ? totalInterference / count : 0
}

/**
 * Compute orthogonality loss for training
 * L_orth = λ Σ_{i≠j} |⟨S_i, S_j⟩|²
 */
export function computeOrthogonalityLoss(
    slots: Slot[],
    lambda: number = 0.1
): number {
    let loss = 0

    for (let i = 0; i < slots.length; i++) {
        for (let j = 0; j < slots.length; j++) {
            if (i !== j) {
                const ip = innerProduct(
                    normalize(slots[i].stateVector),
                    normalize(slots[j].stateVector)
                )
                loss += ip * ip
            }
        }
    }

    return lambda * loss
}

/**
 * Apply repulsion force to reduce interference
 * From whitepaper: Ṡ_i = -4 Σ_{j≠i} (Q_j Q_j^T) S_i
 */
export function applyRepulsion(
    slots: Slot[],
    learningRate: number = 0.01
): Slot[] {
    const normalizedVectors = slots.map(s => normalize(s.stateVector))

    return slots.map((slot, i) => {
        let repulsionForce = new Array(slot.stateVector.length).fill(0)

        for (let j = 0; j < slots.length; j++) {
            if (i !== j) {
                const qj = normalizedVectors[j]
                // Compute Q_j Q_j^T S_i (outer product applied to S_i)
                const dotProduct = innerProduct(qj, slot.stateVector)
                const contribution = scale(qj, dotProduct)
                repulsionForce = repulsionForce.map((v, k) => v + contribution[k])
            }
        }

        // Apply repulsion: S_i = S_i - 4 * lr * repulsionForce
        const newVector = slot.stateVector.map(
            (v, k) => v - 4 * learningRate * repulsionForce[k]
        )

        return {
            ...slot,
            stateVector: normalize(newVector),
        }
    })
}

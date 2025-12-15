'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function NeuralNetwork() {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
        meshRef.current.rotation.y += 0.01
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1, 64, 128]} scale={2}>
                <MeshDistortMaterial
                    color="#00F5FF"
                    attach="material"
                    distort={0.3}
                    speed={2}
                    roughness={0.2}
                    transparent
                    opacity={0.8}
                />
            </Sphere>
        </Float>
    )
}

function QuantumParticles() {
    const particlesRef = useRef<THREE.Points>(null!)

    // Reduced particle count for better performance
    const particleCount = 500
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.001
            particlesRef.current.rotation.x += 0.0005
        }
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={particleCount}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#B24BF3"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}

export default function HeroCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={[1, 1.5]} // Limit pixel ratio for performance
            performance={{ min: 0.5 }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <NeuralNetwork />
            <QuantumParticles />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3}
            />
        </Canvas>
    )
}

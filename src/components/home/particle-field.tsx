'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  color: string
  opacity: number
}

export function ParticleField() {
  const meshRef = useRef<THREE.Points>(null!)
  
  const { positions, colors, sizes, opacities } = useMemo(() => {
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const opacities = new Float32Array(particleCount)
    
    const colorPalette = [
      new THREE.Color('#00F5FF'),
      new THREE.Color('#B24BF3'),
      new THREE.Color('#FF006E'),
      new THREE.Color('#FFFFFF'),
    ]
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Random position
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
      
      // Random size and opacity
      sizes[i] = Math.random() * 3 + 1
      opacities[i] = Math.random() * 0.8 + 0.2
    }
    
    return { positions, colors, sizes, opacities }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      meshRef.current.rotation.y += 0.002
      
      // Animate particles
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.01
        positions[i] += Math.cos(state.clock.elapsedTime + positions[i + 1]) * 0.005
        
        // Wrap around edges
        if (positions[i] > 10) positions[i] = -10
        if (positions[i] < -10) positions[i] = 10
        if (positions[i + 1] > 10) positions[i + 1] = -10
        if (positions[i + 1] < -10) positions[i + 1] = 10
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={sizes.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-opacity"
          array={opacities}
          count={opacities.length}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        vertexColors
        alphaTest={0.001}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { QualityTier } from '../../lib/webgl'
import { sceneState } from '../../lib/sceneState'
import { createRadialTexture, seededRandom } from './textures'

const STAR_COUNT: Record<QualityTier, number> = { low: 350, medium: 650, high: 1100 }
const PALETTE = ['#F4F6FF', '#C9D4FF', '#7C9DFF', '#B18CFF']

/** Distant stars behind the sculpture with a slow drift and gentle pointer parallax. */
export function Starfield({ tier, reducedMotion }: { tier: QualityTier; reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const count = STAR_COUNT[tier]

  const { geometry, texture } = useMemo(() => {
    const rand = seededRandom(7)
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 40
      positions[i * 3 + 1] = (rand() - 0.5) * 26
      positions[i * 3 + 2] = -4 - rand() * 22
      color.set(PALETTE[Math.floor(rand() * PALETTE.length)]).multiplyScalar(0.55 + rand() * 0.45)
      colors.set([color.r, color.g, color.b], i * 3)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const tex = createRadialTexture(64, [
      [0, 'rgba(255,255,255,1)'],
      [0.25, 'rgba(255,255,255,0.65)'],
      [1, 'rgba(255,255,255,0)'],
    ])
    return { geometry: geo, texture: tex }
  }, [count])

  useEffect(
    () => () => {
      geometry.dispose()
      texture.dispose()
    },
    [geometry, texture],
  )

  useFrame((_, delta) => {
    const points = ref.current
    if (!points) return
    const d = Math.min(delta, 0.05)
    if (!reducedMotion) points.rotation.z += d * 0.004
    const ease = 1 - Math.exp(-d * 2)
    points.position.x += (-sceneState.pointer.x * 0.35 - points.position.x) * ease
    points.position.y += (-sceneState.pointer.y * 0.2 + sceneState.scroll * 1.2 - points.position.y) * ease
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        map={texture}
        size={0.16}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
}

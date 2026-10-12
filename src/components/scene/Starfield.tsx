import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { QualityTier } from '../../lib/webgl'
import { sceneState } from '../../lib/sceneState'
import { createRadialTexture, seededRandom } from './textures'

const STAR_COUNT: Record<QualityTier, number> = { low: 350, medium: 650, high: 1100 }
const PALETTE = ['#F4F6FF', '#C9D4FF', '#7C9DFF', '#B18CFF']

/** Depth range the stars wrap around in, so the field can fly past the camera endlessly. */
const NEAR = 2
const FAR = -26

/**
 * Stars behind the sculpture. Scrolling the page flies the camera through them
 * (a shader wraps each star back to the far plane), with pointer parallax on top.
 */
export function Starfield({ tier, reducedMotion }: { tier: QualityTier; reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const count = STAR_COUNT[tier]

  const material = useRef<THREE.PointsMaterial>(null)
  const travel = useRef({ page: 0, drift: 0, velocity: 0 })
  const { geometry, texture, uniforms, onBeforeCompile } = useMemo(() => {
    const rand = seededRandom(7)
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 40
      positions[i * 3 + 1] = (rand() - 0.5) * 26
      positions[i * 3 + 2] = FAR + rand() * (NEAR - FAR)
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
    const uniforms = { uOffset: { value: 0 } }
    const onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
      shader.uniforms.uOffset = uniforms.uOffset
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float uOffset;\nvarying float vFade;')
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          transformed.z = mod(transformed.z - ${FAR.toFixed(1)} + uOffset, ${(NEAR - FAR).toFixed(1)}) + ${FAR.toFixed(1)};
          vFade = smoothstep(${FAR.toFixed(1)}, ${(FAR + 6).toFixed(1)}, transformed.z) * (1.0 - smoothstep(${(NEAR - 3).toFixed(1)}, ${NEAR.toFixed(1)}, transformed.z));`,
        )
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying float vFade;')
        .replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.a *= vFade;')
    }
    return { geometry: geo, texture: tex, uniforms, onBeforeCompile }
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
    points.position.y += (-sceneState.pointer.y * 0.2 - points.position.y) * ease

    if (reducedMotion) return
    // Fly forward as the page scrolls, faster (and with longer, brighter stars) while scrolling quickly.
    const t = travel.current
    t.page += (sceneState.page - t.page) * (1 - Math.exp(-d * 3))
    t.velocity += (sceneState.velocity - t.velocity) * (1 - Math.exp(-d * 8))
    sceneState.velocity *= Math.exp(-d * 3)
    t.drift += d * (0.35 + t.velocity * 6)
    uniforms.uOffset.value = t.page * 36 + t.drift
    if (material.current) material.current.size = 0.16 * (1 + t.velocity * 0.8)
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        ref={material}
        onBeforeCompile={onBeforeCompile}
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

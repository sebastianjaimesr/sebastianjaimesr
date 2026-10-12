import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { sceneState } from '../../lib/sceneState'
import type { QualityTier } from '../../lib/webgl'
import { createRadialTexture, seededRandom } from './textures'

const DETAIL: Record<QualityTier, number> = { low: 14, medium: 24, high: 36 }
const DUST_COUNT: Record<QualityTier, number> = { low: 160, medium: 320, high: 560 }
/** Diameter of the outermost ring in local units; used to fit the group to its DOM stage. */
const OUTER_DIAMETER = 5

/**
 * Builds a smooth, organically displaced sphere: layered low-frequency waves
 * create soft folds that catch the environment reflections.
 */
function createSculptureGeometry(detail: number) {
  const base = new THREE.IcosahedronGeometry(1, detail)
  base.deleteAttribute('normal')
  base.deleteAttribute('uv')
  const geo = mergeVertices(base)
  base.dispose()
  const pos = geo.attributes.position as THREE.BufferAttribute
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize()
    const { x, y, z } = v
    const d =
      0.055 * Math.sin(3.1 * x + 1.7) * Math.sin(2.7 * y + 0.4) * Math.sin(3.3 * z + 2.1) +
      0.026 * Math.sin(6.2 * x + 4.1 * y + 0.8) +
      0.014 * Math.sin(9.0 * z - 5.0 * x + 1.3) +
      0.006 * Math.sin(14.0 * y + 3.0 * z)
    v.multiplyScalar(1 + d)
    pos.setXYZ(i, v.x, v.y, v.z)
  }
  geo.computeVertexNormals()
  return geo
}

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const atmosphereFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uIntensity;
  varying vec3 vNormal;
  void main() {
    float rim = pow(clamp(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 2.4);
    vec3 color = mix(uColorA, uColorB, clamp(vNormal.y * 0.5 + 0.5, 0.0, 1.0));
    gl_FragColor = vec4(color * rim * uIntensity, rim);
  }
`

const RINGS = [
  { radius: 1.72, tube: 0.006, rotation: [1.18, 0.22, 0] as const, color: '#7C9DFF', opacity: 0.75, speed: 0.22, satellite: '#A1F3DC' },
  { radius: 2.08, tube: 0.0045, rotation: [1.86, -0.42, 0.3] as const, color: '#B18CFF', opacity: 0.55, speed: -0.15, satellite: '#B18CFF' },
  { radius: 2.42, tube: 0.0035, rotation: [0.62, 0.92, -0.2] as const, color: '#C9D4FF', opacity: 0.35, speed: 0.09, satellite: null },
]

export function Sculpture({ tier, reducedMotion }: { tier: QualityTier; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.MeshPhysicalMaterial>(null)
  const shell = useRef<THREE.LineSegments>(null)
  const dust = useRef<THREE.Points>(null)
  const ringGroups = useRef<(THREE.Group | null)[]>([])
  const motion = useRef({ px: 0, py: 0, scroll: 0, spin: 0, hover: 0, hovering: false })

  const detail = DETAIL[tier]
  const dustCount = DUST_COUNT[tier]

  const resources = useMemo(() => {
    const sculpture = createSculptureGeometry(detail)
    const shellSource = new THREE.IcosahedronGeometry(1.3, 1)
    const shellEdges = new THREE.EdgesGeometry(shellSource)
    shellSource.dispose()

    const rand = seededRandom(21)
    const dustPositions = new Float32Array(dustCount * 3)
    const p = new THREE.Vector3()
    for (let i = 0; i < dustCount; i++) {
      p.set(rand() * 2 - 1, (rand() * 2 - 1) * 0.6, rand() * 2 - 1).normalize()
      p.multiplyScalar(1.5 + Math.pow(rand(), 0.7) * 1.6)
      dustPositions.set([p.x, p.y, p.z], i * 3)
    }
    const dustGeometry = new THREE.BufferGeometry()
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))

    const dot = createRadialTexture(64, [
      [0, 'rgba(255,255,255,1)'],
      [0.3, 'rgba(255,255,255,0.5)'],
      [1, 'rgba(255,255,255,0)'],
    ])
    const glow = createRadialTexture(256, [
      [0, 'rgba(124,157,255,0.55)'],
      [0.35, 'rgba(120,110,255,0.22)'],
      [0.7, 'rgba(177,140,255,0.06)'],
      [1, 'rgba(177,140,255,0)'],
    ])
    const atmosphere = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertex,
      fragmentShader: atmosphereFragment,
      uniforms: {
        uColorA: { value: new THREE.Color('#7C9DFF') },
        uColorB: { value: new THREE.Color('#B18CFF') },
        uIntensity: { value: 0.95 },
      },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    })
    return { sculpture, shellEdges, dustGeometry, dot, glow, atmosphere }
  }, [detail, dustCount])

  useEffect(
    () => () => {
      resources.sculpture.dispose()
      resources.shellEdges.dispose()
      resources.dustGeometry.dispose()
      resources.dot.dispose()
      resources.glow.dispose()
      resources.atmosphere.dispose()
    },
    [resources],
  )

  useEffect(
    () => () => {
      document.body.style.cursor = ''
    },
    [],
  )

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const d = Math.min(delta, 0.05)
    const m = motion.current
    const follow = 1 - Math.exp(-d * (reducedMotion ? 30 : 3.5))

    m.px += (sceneState.pointer.x - m.px) * follow
    m.py += (sceneState.pointer.y - m.py) * follow
    m.scroll += (sceneState.scroll - m.scroll) * follow
    m.hover += ((m.hovering ? 1 : 0) - m.hover) * (1 - Math.exp(-d * 6))
    m.spin *= Math.exp(-d * 1.6)

    // Fit the sculpture to the DOM stage measured by the hero.
    const { width, height } = state.viewport
    const anchor = sceneState.anchor
    const fit = (anchor.size * height) / OUTER_DIAMETER
    const parallax = reducedMotion ? 0 : 1
    const since = (performance.now() - sceneState.pulseAt) / 1000
    const pulse = !reducedMotion && since < 1.1 ? Math.sin((since / 1.1) * Math.PI) * 0.045 : 0

    g.position.set(
      (anchor.x * width) / 2 + m.px * 0.18 * parallax,
      (anchor.y * height) / 2 + m.py * 0.12 * parallax + m.scroll * height * 0.22,
      0,
    )
    g.scale.setScalar(fit * (1 - m.scroll * 0.18) * (1 + pulse + m.hover * 0.02))
    g.rotation.x = -m.py * 0.22 * parallax + m.scroll * 0.7
    g.rotation.y = m.px * 0.35 * parallax

    const auto = reducedMotion ? 0 : 1
    if (core.current) {
      core.current.rotation.y += d * (0.14 * auto + m.spin)
      core.current.rotation.x += d * 0.035 * auto
    }
    if (shell.current) {
      shell.current.rotation.y -= d * (0.07 * auto + m.spin * 0.4)
      shell.current.rotation.z += d * 0.02 * auto
    }
    if (dust.current) dust.current.rotation.y += d * (0.05 * auto + m.spin * 0.2)
    RINGS.forEach((ring, i) => {
      const rg = ringGroups.current[i]
      if (rg) rg.rotation.z += d * (ring.speed * auto + m.spin * 0.3 * Math.sign(ring.speed))
    })
    if (material.current) {
      material.current.iridescence = 0.55 + m.hover * 0.35
      material.current.envMapIntensity = 1.15 + m.hover * 0.35 + pulse * 4
    }
    if (reducedMotion && (Math.abs(sceneState.pointer.x - m.px) > 0.001 || Math.abs(sceneState.scroll - m.scroll) > 0.001)) {
      state.invalidate()
    }
  })

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    sceneState.pulseAt = performance.now()
    motion.current.spin += 2.4
  }
  const handleOver = () => {
    motion.current.hovering = true
    document.body.style.cursor = 'grab'
  }
  const handleOut = () => {
    motion.current.hovering = false
    document.body.style.cursor = ''
  }

  return (
    <group ref={group}>
      <sprite scale={6.2} renderOrder={-1}>
        <spriteMaterial map={resources.glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </sprite>

      <mesh ref={core} geometry={resources.sculpture} onPointerDown={handlePointerDown} onPointerOver={handleOver} onPointerOut={handleOut}>
        <meshPhysicalMaterial
          ref={material}
          color="#aebcff"
          metalness={1}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.12}
          iridescence={0.55}
          iridescenceIOR={1.45}
          iridescenceThicknessRange={[140, 520]}
          envMapIntensity={1.15}
        />
      </mesh>

      <mesh scale={1.16} material={resources.atmosphere}>
        <sphereGeometry args={[1, 48, 48]} />
      </mesh>

      <lineSegments ref={shell} geometry={resources.shellEdges}>
        <lineBasicMaterial color="#7C9DFF" transparent opacity={0.16} depthWrite={false} toneMapped={false} />
      </lineSegments>

      {RINGS.map((ring, i) => (
        <group key={ring.radius} rotation={ring.rotation}>
          <group ref={(el) => void (ringGroups.current[i] = el)}>
            <mesh>
              <torusGeometry args={[ring.radius, ring.tube, 8, 220]} />
              <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} depthWrite={false} toneMapped={false} />
            </mesh>
            {ring.satellite && (
              <mesh position={[ring.radius, 0, 0]}>
                <sphereGeometry args={[0.035, 16, 16]} />
                <meshBasicMaterial color={ring.satellite} toneMapped={false} />
              </mesh>
            )}
          </group>
        </group>
      ))}

      <points ref={dust} geometry={resources.dustGeometry}>
        <pointsMaterial
          map={resources.dot}
          size={0.05}
          sizeAttenuation
          color="#C9D4FF"
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  )
}

/**
 * La escultura 3D: esfera metálica deformada, halo de atmósfera, malla de
 * alambre, anillos orbitales con satélites y polvo de partículas.
 *
 * En cada frame lee sceneState (scroll y puntero) y se mueve suavemente hacia
 * la posición y color que le corresponden. Al tocarla gira y "pulsa".
 */
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { sceneState } from '../../lib/sceneState'
import type { QualityTier } from '../../lib/webgl'
import { createRadialTexture, seededRandom } from './textures'

// Detalle de la geometría y cantidad de partículas de polvo según la calidad del dispositivo.
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
    // Desplazamiento: suma de ondas seno de distinta frecuencia y amplitud (un "ruido" simple y suave).
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

// Shaders GLSL (programas que corren en la tarjeta gráfica) del halo de atmósfera.
// El fragment shader pinta más fuerte los bordes de la esfera (efecto "rim").
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

/** Primary and secondary colours per section; the journey blends between neighbours. */
const PALETTES: [string, string][] = [
  ['#7C9DFF', '#B18CFF'], // hero
  ['#A1F3DC', '#7C9DFF'], // about
  ['#B18CFF', '#7C9DFF'], // skills
  ['#7C9DFF', '#A1F3DC'], // projects
  ['#C9D4FF', '#B18CFF'], // approach
  ['#A1F3DC', '#B18CFF'], // contact
]
const PALETTE_COLORS = PALETTES.map(([a, b]) => [new THREE.Color(a), new THREE.Color(b)] as const)

function blendPalette(tint: number, primary: THREE.Color, secondary: THREE.Color) {
  const i = Math.min(PALETTES.length - 1, Math.max(0, Math.floor(tint)))
  const j = Math.min(PALETTES.length - 1, i + 1)
  const t = Math.min(1, Math.max(0, tint - i))
  primary.copy(PALETTE_COLORS[i][0]).lerp(PALETTE_COLORS[j][0], t)
  secondary.copy(PALETTE_COLORS[i][1]).lerp(PALETTE_COLORS[j][1], t)
}

// Configuración de los 3 anillos: radio, grosor, rotación, color, opacidad, velocidad y satélite.
const RINGS = [
  { radius: 1.72, tube: 0.006, rotation: [1.18, 0.22, 0] as const, color: '#7C9DFF', opacity: 0.75, speed: 0.22, satellite: '#A1F3DC' },
  { radius: 2.08, tube: 0.0045, rotation: [1.86, -0.42, 0.3] as const, color: '#B18CFF', opacity: 0.55, speed: -0.15, satellite: '#B18CFF' },
  { radius: 2.42, tube: 0.0035, rotation: [0.62, 0.92, -0.2] as const, color: '#C9D4FF', opacity: 0.35, speed: 0.09, satellite: null },
]

/** Componente de la escultura. motion guarda los valores suavizados que se acercan poco a poco a los de sceneState. */
export function Sculpture({ tier, reducedMotion }: { tier: QualityTier; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.MeshPhysicalMaterial>(null)
  const shell = useRef<THREE.LineSegments>(null)
  const dust = useRef<THREE.Points>(null)
  const ringGroups = useRef<(THREE.Group | null)[]>([])
  const ringMaterials = useRef<(THREE.MeshBasicMaterial | null)[]>([])
  const shellMaterial = useRef<THREE.LineBasicMaterial>(null)
  const glowMaterial = useRef<THREE.SpriteMaterial>(null)
  const motion = useRef({
    px: 0,
    py: 0,
    x: sceneState.anchor.x,
    y: sceneState.anchor.y,
    size: sceneState.anchor.size,
    tint: sceneState.tint,
    page: 0,
    spin: 0,
    hover: 0,
    hovering: false,
    primary: new THREE.Color(),
    secondary: new THREE.Color(),
  })

  const detail = DETAIL[tier]
  const dustCount = DUST_COUNT[tier]

  // Crea geometrías, texturas y materiales una sola vez (son costosos de crear).
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
      // Neutral glow, tinted per section through the sprite material colour.
      [0, 'rgba(225,232,255,0.55)'],
      [0.35, 'rgba(210,214,255,0.22)'],
      [0.7, 'rgba(220,210,255,0.06)'],
      [1, 'rgba(220,210,255,0)'],
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

  // Libera la memoria de la tarjeta gráfica al desmontar (three.js no lo hace automáticamente).
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

  // useFrame se ejecuta en cada frame (~60 veces por segundo). delta = segundos desde el frame anterior.
  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const d = Math.min(delta, 0.05)
    const m = motion.current
    // Suavizado exponencial: cada frame recorre una fracción de la distancia que falta.
    // Funciona igual a 30 o 144 FPS porque depende del tiempo (delta), no del número de frames.
    const follow = 1 - Math.exp(-d * (reducedMotion ? 30 : 3.5))

    m.px += (sceneState.pointer.x - m.px) * follow
    m.py += (sceneState.pointer.y - m.py) * follow
    // The anchor moves with scroll; a slightly slower follow makes the glide feel weighty.
    const glide = 1 - Math.exp(-d * (reducedMotion ? 30 : 4.5))
    const anchor = sceneState.anchor
    m.x += (anchor.x - m.x) * glide
    m.y += (anchor.y - m.y) * glide
    m.size += (anchor.size - m.size) * glide
    m.tint += (sceneState.tint - m.tint) * glide
    m.page += (sceneState.page - m.page) * glide
    m.hover += ((m.hovering ? 1 : 0) - m.hover) * (1 - Math.exp(-d * 6))
    m.spin *= Math.exp(-d * 1.6)

    // Place the sculpture where the scroll journey says, in viewport units.
    const { width, height } = state.viewport
    const fit = (m.size * height) / OUTER_DIAMETER
    const parallax = reducedMotion ? 0 : 1
    const since = (performance.now() - sceneState.pulseAt) / 1000
    const pulse = !reducedMotion && since < 1.1 ? Math.sin((since / 1.1) * Math.PI) * 0.045 : 0

    g.position.set((m.x * width) / 2 + m.px * 0.18 * parallax, (m.y * height) / 2 + m.py * 0.12 * parallax, 0)
    g.scale.setScalar(fit * (1 + pulse + m.hover * 0.02))
    g.rotation.x = -m.py * 0.22 * parallax + m.page * 1.4 * parallax
    g.rotation.y = m.px * 0.35 * parallax + m.page * Math.PI * 2 * parallax

    // Section colours: rings, shell, atmosphere and glow.
    blendPalette(m.tint, m.primary, m.secondary)
    ringMaterials.current[0]?.color.copy(m.primary)
    ringMaterials.current[1]?.color.copy(m.secondary)
    shellMaterial.current?.color.copy(m.primary)
    glowMaterial.current?.color.copy(m.primary)
    resources.atmosphere.uniforms.uColorA.value.copy(m.primary)
    resources.atmosphere.uniforms.uColorB.value.copy(m.secondary)

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
    if (reducedMotion && (Math.abs(anchor.y - m.y) > 0.0005 || Math.abs(sceneState.pointer.x - m.px) > 0.001)) {
      state.invalidate()
    }
  })

  // Al tocar la escultura: dispara el pulso y le da un impulso de giro.
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
      {/* Brillo difuso detrás de la escultura. */}
      <sprite scale={6.2} renderOrder={-1}>
        <spriteMaterial ref={glowMaterial} map={resources.glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
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
        <lineBasicMaterial ref={shellMaterial} color="#7C9DFF" transparent opacity={0.16} depthWrite={false} toneMapped={false} />
      </lineSegments>

      {RINGS.map((ring, i) => (
        <group key={ring.radius} rotation={ring.rotation}>
          <group ref={(el) => void (ringGroups.current[i] = el)}>
            <mesh>
              <torusGeometry args={[ring.radius, ring.tube, 8, 220]} />
              <meshBasicMaterial
                ref={(el) => void (ringMaterials.current[i] = el)}
                color={ring.color}
                transparent opacity={ring.opacity} depthWrite={false} toneMapped={false} />
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

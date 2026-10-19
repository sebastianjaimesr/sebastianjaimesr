/**
 * Entorno de reflejos generado por código (sin descargar archivos HDR).
 */
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'

interface Panel {
  shape: 'rect' | 'ring'
  color: string
  intensity: number
  position: [number, number, number]
  scale: [number, number]
}

/** Light panels that the metallic surfaces reflect: blue and violet strips, a white ring, a mint floor strip. */
// Paneles de luz que se reflejan en las superficies metálicas.
const PANELS: Panel[] = [
  { shape: 'rect', color: '#7C9DFF', intensity: 2.6, position: [-5, 1.5, -1], scale: [10, 2.2] },
  { shape: 'rect', color: '#B18CFF', intensity: 2.1, position: [5, -1, -1], scale: [10, 3] },
  { shape: 'ring', color: '#F4F6FF', intensity: 3.2, position: [0, 5, 2], scale: [2.2, 2.2] },
  { shape: 'rect', color: '#A1F3DC', intensity: 1.2, position: [0, -5, 0], scale: [6, 1] },
  { shape: 'rect', color: '#FFFFFF', intensity: 0.8, position: [0, 0, 6], scale: [4, 4] },
]

/**
 * Renders a tiny procedural "studio" once into a prefiltered environment map
 * (PMREM). This replaces HDR files: nothing is downloaded and it costs one
 * render at start-up.
 */
export function StudioEnvironment({ size = 256 }: { size?: number }) {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const studio = new THREE.Scene()
    studio.background = new THREE.Color('#04060c')
    const disposables: { dispose: () => void }[] = []

    // Dim navy dome with a lighter horizon so reflections never fall to pure black.
    const domeGeometry = new THREE.SphereGeometry(40, 32, 16)
    const domeMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader:
        'varying vec3 vDir; void main(){ float h = vDir.y; vec3 top = vec3(0.05,0.06,0.16); vec3 mid = vec3(0.16,0.17,0.38); vec3 bottom = vec3(0.02,0.025,0.06); vec3 c = h > 0.0 ? mix(mid, top, h) : mix(mid, bottom, -h); gl_FragColor = vec4(c, 1.0); }',
    })
    studio.add(new THREE.Mesh(domeGeometry, domeMaterial))
    disposables.push(domeGeometry, domeMaterial)

    for (const panel of PANELS) {
      const geometry = panel.shape === 'ring' ? new THREE.RingGeometry(0.42, 0.5, 64) : new THREE.PlaneGeometry(1, 1)
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(panel.color).multiplyScalar(panel.intensity),
        side: THREE.DoubleSide,
        toneMapped: false,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...panel.position)
      mesh.scale.set(panel.scale[0], panel.scale[1], 1)
      mesh.lookAt(0, 0, 0)
      studio.add(mesh)
      disposables.push(geometry, material)
    }

    // Renderiza el "estudio" una vez a un mapa de entorno que todos los materiales usan para sus reflejos.
    const target = pmrem.fromScene(studio, 0.035, 0.1, 100, { size })
    scene.environment = target.texture
    invalidate()

    return () => {
      scene.environment = null
      target.dispose()
      pmrem.dispose()
      disposables.forEach((item) => item.dispose())
    }
  }, [gl, scene, invalidate, size])

  return null
}

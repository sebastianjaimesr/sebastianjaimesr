/**
 * "Límite de errores" de React.
 *
 * Si un componente hijo lanza un error al renderizar, este componente lo
 * atrapa y muestra un respaldo en lugar de dejar la página en blanco.
 * Se usa alrededor de la escena 3D. Debe ser una clase: React solo ofrece
 * los métodos getDerivedStateFromError y componentDidCatch en clases.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  fallback: ReactNode
  onError?: (error: Error) => void
  children: ReactNode
}

/** Keeps a failing subtree (the WebGL scene) from taking the whole page down. */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }

  // React lo llama cuando un hijo falla: cambia el estado a "fallido".
  static getDerivedStateFromError() {
    return { failed: true }
  }

  // Se ejecuta después del error: lo muestra en consola (solo en desarrollo) y avisa al padre.
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.warn('3D scene disabled:', error, info.componentStack)
    this.props.onError?.(error)
  }

  // Si falló, muestra el respaldo; si no, muestra los hijos normalmente.
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

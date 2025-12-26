/**
 * Convert pixels to the original format (try to preserve units)
 */
export function pixelsToPosition(pixels: number, original: string, isVertical: boolean): string {
  if (!original) return `${pixels}px`

  const str = String(original).trim()

  if (str.endsWith('vw')) {
    if (typeof window === 'undefined') return `${pixels}px`
    const vw = (pixels / window.innerWidth) * 100
    return `${vw}vw`
  }

  if (str.endsWith('vh')) {
    if (typeof window === 'undefined') return `${pixels}px`
    const vh = (pixels / window.innerHeight) * 100
    return `${vh}vh`
  }

  if (str.endsWith('%')) {
    if (typeof window === 'undefined') return `${pixels}px`
    const containerSize = isVertical ? window.innerHeight : window.innerWidth
    const percent = (pixels / containerSize) * 100
    return `${percent}%`
  }

  return `${pixels}px`
}

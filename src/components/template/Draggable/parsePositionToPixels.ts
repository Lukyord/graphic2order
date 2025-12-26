export function parsePositionToPixels(position: string, isVertical: boolean): number {
  if (!position) return 0

  const str = String(position).trim()
  const numericValue = parseFloat(str)

  if (str.endsWith('px')) return numericValue
  if (str.endsWith('vw')) {
    if (typeof window === 'undefined') return 0
    return (numericValue / 100) * window.innerWidth
  }
  if (str.endsWith('vh')) {
    if (typeof window === 'undefined') return 0
    return (numericValue / 100) * window.innerHeight
  }
  if (str.endsWith('%')) {
    if (typeof window === 'undefined') return 0
    const containerSize = isVertical ? window.innerHeight : window.innerWidth
    return (numericValue / 100) * containerSize
  }

  return numericValue || 0
}

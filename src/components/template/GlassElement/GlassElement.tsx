import { CSSProperties, ReactNode } from 'react'
import { getDisplacementFilter } from './getDisplacementFilter'
import { getDisplacementMap } from './getDisplacementMap'

type SizeValue = number | string

type GlassElementProps = {
  width: SizeValue
  height: SizeValue
  radius: SizeValue
  widthMb?: SizeValue
  heightMb?: SizeValue
  radiusMb?: SizeValue
  depth: number
  strength?: number
  chromaticAberration?: number
  children?: ReactNode | undefined
  blur?: number
  debug?: boolean
  style?: CSSProperties
}

/**
 * Formats a size value for CSS (preserves units)
 */
const formatForCSS = (value: SizeValue): string => {
  if (typeof value === 'number') {
    return `${value}px`
  }
  return String(value)
}

/**
 * Converts a size value to pixels for SSR (uses default viewport)
 * Supports: px, vw, vh, %
 */
const convertToPixelsForSSR = (
  value: SizeValue,
  isHeight = false,
  containerSize?: number,
): number => {
  if (typeof value === 'number') {
    return value
  }

  const str = String(value).trim()
  const defaultViewportWidth = 1440
  const defaultViewportHeight = 810

  if (str.endsWith('px')) {
    return parseFloat(str)
  }

  if (str.endsWith('vw')) {
    return (parseFloat(str) / 100) * defaultViewportWidth
  }

  if (str.endsWith('vh')) {
    return (parseFloat(str) / 100) * defaultViewportHeight
  }

  if (str.endsWith('%')) {
    if (containerSize !== undefined) {
      return (parseFloat(str) / 100) * containerSize
    }
    const base = isHeight ? defaultViewportHeight : defaultViewportWidth
    return (parseFloat(str) / 100) * base
  }

  return parseFloat(str) || 0
}

export function GlassElement({
  width,
  height,
  radius,
  widthMb,
  heightMb,
  radiusMb,
  depth,
  children,
  strength,
  chromaticAberration,
  blur = 2,
  debug = false,
  style: externalStyle,
}: GlassElementProps) {
  // Calculate pixel values for displacement filter (using PC values for SSR)
  // These are used for generating the SVG filter, actual rendering uses CSS variables
  const widthPx = convertToPixelsForSSR(width)
  const heightPx = convertToPixelsForSSR(height, true)
  const radiusPx = convertToPixelsForSSR(radius, false, Math.min(widthPx, heightPx))

  // Generate displacement filter using PC values (for SSR consistency)
  const backdropFilterValue = `blur(${blur / 2}px) url('${getDisplacementFilter({
    height: heightPx,
    width: widthPx,
    radius: radiusPx,
    depth,
    strength,
    chromaticAberration,
  })}') blur(${blur}px) brightness(1.1) saturate(1.5) `

  const style: CSSProperties = {
    // Set CSS variables for responsive values (set once, CSS handles switching)
    '--width-pc': formatForCSS(width),
    '--height-pc': formatForCSS(height),
    '--radius-pc': formatForCSS(radius),
    '--width-mb': formatForCSS(widthMb !== undefined ? widthMb : width),
    '--height-mb': formatForCSS(heightMb !== undefined ? heightMb : height),
    '--radius-mb': formatForCSS(radiusMb !== undefined ? radiusMb : radius),
    backdropFilter: backdropFilterValue,
    WebkitBackdropFilter: backdropFilterValue,
    ...externalStyle,
  } as CSSProperties

  /* Debug mode: display the displacement map instead of actual effect */
  if (debug === true) {
    style.background = `url("${getDisplacementMap({
      height: heightPx,
      width: widthPx,
      radius: radiusPx,
      depth,
    })}")`
    style.boxShadow = 'none'
  }

  return (
    <div className={`liquid-glass`} style={style}>
      {children}
    </div>
  )
}

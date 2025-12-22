'use client'

import { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react'
import { getDisplacementFilter, DisplacementOptions } from './getDisplacementFilter'
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
  animation?: 0 | 1 | 2 | 3
  pcPosition?: {
    top?: string
    left?: string
  }
  mbPosition?: {
    top?: string
    left?: string
  }
}

/**
 * Converts a size value (number or string with units) to pixels
 * Supports: px, vw, vh, %
 */
const convertToPixels = (value: SizeValue, containerSize?: number): number => {
  if (typeof value === 'number') {
    return value
  }

  const str = String(value).trim()

  if (str.endsWith('px')) {
    return parseFloat(str)
  }

  if (str.endsWith('vw')) {
    if (typeof window === 'undefined') return 0
    return (parseFloat(str) / 100) * window.innerWidth
  }

  if (str.endsWith('vh')) {
    if (typeof window === 'undefined') return 0
    return (parseFloat(str) / 100) * window.innerHeight
  }

  if (str.endsWith('%')) {
    if (!containerSize) {
      // Default to 100 if no container size provided
      return parseFloat(str)
    }
    return (parseFloat(str) / 100) * containerSize
  }

  // Fallback: try to parse as number
  return parseFloat(str) || 0
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

export const GlassElement = ({
  width,
  height,
  radius,
  widthMb,
  heightMb,
  radiusMb,
  depth: baseDepth,
  children,
  strength,
  chromaticAberration,
  blur = 2,
  debug = false,
  style: externalStyle,
  animation = 0,
  pcPosition = {
    top: '0',
    left: '0',
  },
  mbPosition = {
    top: '0',
    left: '0',
  },
}: GlassElementProps) => {
  /* Change element depth on click */
  const [clicked, setClicked] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  /* Drag functionality */
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null)
  const [elementStartPos, setElementStartPos] = useState({ top: 0, left: 0 })
  const [currentPosition, setCurrentPosition] = useState({
    pc: { top: pcPosition.top || '0', left: pcPosition.left || '0' },
    mb: { top: mbPosition.top || '0', left: mbPosition.left || '0' },
  })

  // Update position when props change
  useEffect(() => {
    setCurrentPosition({
      pc: { top: pcPosition.top || '0', left: pcPosition.left || '0' },
      mb: { top: mbPosition.top || '0', left: mbPosition.left || '0' },
    })
  }, [pcPosition.top, pcPosition.left, mbPosition.top, mbPosition.left])

  // Helper to calculate pixel values consistently for SSR
  const getSSRPixelValues = useCallback(() => {
    // Use a standard desktop viewport for SSR consistency (1920x1080)
    const defaultViewportWidth = 1920
    const defaultViewportHeight = 1080

    const getPx = (val: SizeValue, isHeight = false, containerSize?: number): number => {
      if (typeof val === 'number') return val
      const str = String(val).trim()
      if (str.endsWith('px')) return parseFloat(str)
      if (str.endsWith('vw')) return (parseFloat(str) / 100) * defaultViewportWidth
      if (str.endsWith('vh')) return (parseFloat(str) / 100) * defaultViewportHeight
      if (str.endsWith('%')) {
        if (containerSize !== undefined) {
          return (parseFloat(str) / 100) * containerSize
        }
        // For radius, default to using the smaller dimension
        const base = isHeight ? defaultViewportHeight : defaultViewportWidth
        return (parseFloat(str) / 100) * base
      }
      return parseFloat(str) || 0
    }

    const widthPx = getPx(width)
    const heightPx = getPx(height, true)
    // For radius in %, use the smaller of width/height as container
    const radiusPx = getPx(radius, false, Math.min(widthPx, heightPx))

    return { widthPx, heightPx, radiusPx }
  }, [width, height, radius])

  // Helper to get current values and calculate pixels
  const getCurrentValues = useCallback(
    (isMounted: boolean) => {
      // During SSR and initial render, use desktop values to ensure hydration match
      if (!isMounted || typeof window === 'undefined') {
        const { widthPx, heightPx, radiusPx } = getSSRPixelValues()
        return {
          isMobile: false,
          width: width,
          height: height,
          radius: radius,
          widthPx,
          heightPx,
          radiusPx,
        }
      }

      const mobile = window.innerWidth <= 991
      const currentWidth = mobile && widthMb !== undefined ? widthMb : width
      const currentHeight = mobile && heightMb !== undefined ? heightMb : height
      const currentRadius = mobile && radiusMb !== undefined ? radiusMb : radius

      const widthPx = convertToPixels(currentWidth)
      const heightPx = convertToPixels(currentHeight)
      const radiusPx = convertToPixels(currentRadius, Math.min(widthPx, heightPx))

      return {
        isMobile: mobile,
        width: currentWidth,
        height: currentHeight,
        radius: currentRadius,
        widthPx,
        heightPx,
        radiusPx,
      }
    },
    [width, height, radius, widthMb, heightMb, radiusMb, getSSRPixelValues],
  )

  // Initialize with SSR-safe values (lazy initialization to match SSR)
  const [values, setValues] = useState(() => {
    // Use the same calculation as SSR
    const { widthPx, heightPx, radiusPx } = getSSRPixelValues()
    return {
      isMobile: false,
      width: width,
      height: height,
      radius: radius,
      widthPx,
      heightPx,
      radiusPx,
    }
  })

  // Detect Safari browser and backdrop-filter support
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check for backdrop-filter support first (most reliable)
    let supportsBackdropFilter = false
    try {
      supportsBackdropFilter =
        CSS.supports('backdrop-filter', 'blur(1px)') ||
        CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
    } catch (e) {
      // CSS.supports might not be available in some environments
      supportsBackdropFilter = false
    }

    // If backdrop-filter is not supported, use fallback
    if (!supportsBackdropFilter) {
      setIsSafari(true)
      return
    }

    // Additional Safari detection (for cases where backdrop-filter exists but doesn't work well)
    const userAgent = window.navigator.userAgent.toLowerCase()
    const vendor = navigator.vendor?.toLowerCase() || ''

    // Safari detection (excluding Chrome which also has Safari in userAgent)
    const isSafariBrowser =
      (vendor.indexOf('apple') > -1 && userAgent.indexOf('chrome') === -1) ||
      (userAgent.indexOf('safari') > -1 &&
        userAgent.indexOf('chrome') === -1 &&
        userAgent.indexOf('chromium') === -1)

    setIsSafari(isSafariBrowser)
  }, [])

  // Update values after mount and on resize
  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setValues(getCurrentValues(true))
    }

    // Update immediately after mount
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [getCurrentValues])

  // Parse position string to pixels
  const parsePositionToPixels = (position: string, isVertical: boolean): number => {
    if (!position) return 0
    const str = String(position).trim()
    if (str.endsWith('px')) return parseFloat(str)
    if (str.endsWith('vw')) {
      if (typeof window === 'undefined') return 0
      return (parseFloat(str) / 100) * window.innerWidth
    }
    if (str.endsWith('vh')) {
      if (typeof window === 'undefined') return 0
      return (parseFloat(str) / 100) * window.innerHeight
    }
    if (str.endsWith('%')) {
      if (typeof window === 'undefined') return 0
      const containerSize = isVertical ? window.innerHeight : window.innerWidth
      return (parseFloat(str) / 100) * containerSize
    }
    return parseFloat(str) || 0
  }

  // Convert pixels to the original format (try to preserve units)
  const pixelsToPosition = (pixels: number, original: string, isVertical: boolean): string => {
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

  // Track potential drag start
  const [dragThreshold, setDragThreshold] = useState(5) // pixels to move before considering it a drag
  const [hasMoved, setHasMoved] = useState(false)

  // Handle mouse down - prepare for potential drag or click
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setHasMoved(false)

    // Get initial mouse position
    const startX = e.clientX
    const startY = e.clientY
    setDragStartPos({ x: startX, y: startY })

    // Get current element position
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 991
      const currentTop = isMobile ? currentPosition.mb.top : currentPosition.pc.top
      const currentLeft = isMobile ? currentPosition.mb.left : currentPosition.pc.left

      const topPx = parsePositionToPixels(currentTop, true)
      const leftPx = parsePositionToPixels(currentLeft, false)

      setElementStartPos({ top: topPx, left: leftPx })
    }

    // Set clicked state for depth change (will be cancelled if drag occurs)
    setClicked(true)
  }

  // Handle drag
  useEffect(() => {
    if (typeof window === 'undefined' || !dragStartPos) return

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate delta
      const deltaX = e.clientX - dragStartPos!.x
      const deltaY = e.clientY - dragStartPos!.y

      // Check if movement exceeds threshold
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance > dragThreshold && !isDragging) {
        // Start dragging
        setIsDragging(true)
        setHasMoved(true)
        setClicked(false) // Cancel click if dragging
        document.body.style.cursor = 'grabbing'
        document.body.style.userSelect = 'none'
      }

      // If dragging, update position
      if (isDragging || distance > dragThreshold) {
        // Calculate new position in pixels
        const newLeftPx = elementStartPos.left + deltaX
        const newTopPx = elementStartPos.top + deltaY

        // Get current viewport
        const isMobile = window.innerWidth <= 991

        // Convert back to original format
        const originalTop = isMobile ? currentPosition.mb.top : currentPosition.pc.top
        const originalLeft = isMobile ? currentPosition.mb.left : currentPosition.pc.left

        const newTop = pixelsToPosition(newTopPx, originalTop, true)
        const newLeft = pixelsToPosition(newLeftPx, originalLeft, false)

        // Update position state
        if (isMobile) {
          setCurrentPosition((prev) => ({
            ...prev,
            mb: { top: newTop, left: newLeft },
          }))
        } else {
          setCurrentPosition((prev) => ({
            ...prev,
            pc: { top: newTop, left: newLeft },
          }))
        }
      }
    }

    const handleMouseUp = () => {
      // If we dragged, don't trigger click
      if (hasMoved || isDragging) {
        setClicked(false)
      }

      setIsDragging(false)
      setHasMoved(false)
      setDragStartPos(null)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStartPos, elementStartPos, currentPosition, dragThreshold, hasMoved])

  let depth = baseDepth / (clicked ? 0.7 : 1)

  /* Dynamic CSS properties */
  const backdropFilterValue = `blur(${blur / 2}px) url('${getDisplacementFilter({
    height: values.heightPx,
    width: values.widthPx,
    radius: values.radiusPx,
    depth,
    strength,
    chromaticAberration,
  })}') blur(${blur}px) brightness(1.1) saturate(1.5) `

  const style: CSSProperties = {
    height: formatForCSS(values.height),
    width: formatForCSS(values.width),
    borderRadius: formatForCSS(values.radius),
    '--pc-top': currentPosition.pc.top,
    '--pc-left': currentPosition.pc.left,
    '--mb-top': currentPosition.mb.top,
    '--mb-left': currentPosition.mb.left,
    cursor: isDragging ? 'grabbing' : 'grab',
    backdropFilter: backdropFilterValue,
    WebkitBackdropFilter: backdropFilterValue,
    ...externalStyle,
  } as CSSProperties

  /* Debug mode: display the displacement map instead of actual effect */
  if (debug === true) {
    style.background = `url("${getDisplacementMap({
      height: values.heightPx,
      width: values.widthPx,
      radius: values.radiusPx,
      depth,
    })}")`
    style.boxShadow = 'none'
  }

  const handleMouseUp = () => {
    // Only reset clicked if it wasn't a drag
    if (!hasMoved && !isDragging) {
      // Small delay to allow click to complete
      setTimeout(() => setClicked(false), 100)
    }
  }

  return (
    <div
      className={`liquid-glass hover`}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      data-animation={animation}
      data-safari={isSafari ? 'true' : undefined}
    >
      {children}
    </div>
  )
}

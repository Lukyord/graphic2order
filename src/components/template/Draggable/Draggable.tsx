'use client'

import { CSSProperties, ReactNode, useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { isMobileViewport } from '@/utils/utils'
import { parsePositionToPixels } from './parsePositionToPixels'
import { pixelsToPosition } from './pixelsToPosition'
import { getViewportPosition } from './getViewportPosition'
import { calculateDistance } from './calculateDistance'
import { DEFAULT_POSITION, normalizePosition } from './normalizePosition'
import { Position, PositionState } from './drag-type'
import { useSafari } from '@/app/context/SafariContext'

type DraggableProps = {
    children: ReactNode
    pcPosition?: Position
    mbPosition?: Position
    className?: string
    style?: CSSProperties
    onPositionChange?: (position: { pc: Position; mb: Position }) => void
    dragThreshold?: number
    enabled?: boolean
    animation?: 0 | 1 | 2 | 3
}

export function Draggable({
    children,
    pcPosition = { top: DEFAULT_POSITION, left: DEFAULT_POSITION },
    mbPosition = { top: DEFAULT_POSITION, left: DEFAULT_POSITION },
    className = '',
    style: externalStyle,
    onPositionChange,
    dragThreshold = 5,
    enabled = true,
    animation = 0,
}: DraggableProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null)
    const [elementStartPos, setElementStartPos] = useState({ top: 0, left: 0 })
    const [isMobile, setIsMobile] = useState(false)
    const [currentPosition, setCurrentPosition] = useState<PositionState>(() => ({
        pc: normalizePosition(pcPosition),
        mb: normalizePosition(mbPosition),
    }))
    const { isSafari } = useSafari()

    const positionRef = useRef(currentPosition)
    const elementRef = useRef<HTMLDivElement>(null)

    // Update position ref when it changes
    useEffect(() => {
        positionRef.current = currentPosition
    }, [currentPosition])

    // Update position when props change
    useEffect(() => {
        setCurrentPosition({
            pc: normalizePosition(pcPosition),
            mb: normalizePosition(mbPosition),
        })
    }, [pcPosition, mbPosition])

    // Notify parent of position changes
    useEffect(() => {
        onPositionChange?.(currentPosition)
    }, [currentPosition, onPositionChange])

    // Track viewport size to determine which position to use
    useEffect(() => {
        if (typeof window === 'undefined') return

        const checkMobile = () => {
            setIsMobile(isMobileViewport())
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    /**
     * Get current element position in pixels
     */
    const getCurrentElementPosition = useCallback((): { top: number; left: number } => {
        const viewportPosition = getViewportPosition(positionRef.current, isMobileViewport())
        const topPx = parsePositionToPixels(viewportPosition.top || DEFAULT_POSITION, true)
        const leftPx = parsePositionToPixels(viewportPosition.left || DEFAULT_POSITION, false)
        return { top: topPx, left: leftPx }
    }, [])

    /**
     * Initialize drag from a point
     */
    const initializeDrag = useCallback(
        (clientX: number, clientY: number) => {
            if (!enabled) return

            setDragStartPos({ x: clientX, y: clientY })
            setElementStartPos(getCurrentElementPosition())
        },
        [enabled, getCurrentElementPosition],
    )

    /**
     * Handle mouse down - prepare for potential drag
     */
    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            if (!enabled) return
            e.preventDefault()
            initializeDrag(e.clientX, e.clientY)
        },
        [enabled, initializeDrag],
    )

    /**
     * Handle touch start - prepare for potential drag
     */
    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            if (!enabled) return
            e.preventDefault()
            const touch = e.touches[0]
            if (touch) {
                initializeDrag(touch.clientX, touch.clientY)
            }
        },
        [enabled, initializeDrag],
    )

    // Attach touchstart listener directly to element with passive: false
    useEffect(() => {
        const element = elementRef.current
        if (!element || typeof window === 'undefined') return

        element.addEventListener('touchstart', handleTouchStart, { passive: false })

        return () => {
            element.removeEventListener('touchstart', handleTouchStart)
        }
    }, [handleTouchStart])

    /**
     * Start dragging state and update body styles
     */
    const startDragging = useCallback(() => {
        setIsDragging(true)
        document.body.style.cursor = 'grabbing'
        document.body.style.userSelect = 'none'
    }, [])

    /**
     * End dragging state and reset body styles
     */
    const endDrag = useCallback(() => {
        setIsDragging(false)
        setDragStartPos(null)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
    }, [])

    /**
     * Update position state based on new coordinates
     */
    const updatePositionState = useCallback(
        (newTopPx: number, newLeftPx: number, isMobileView: boolean) => {
            const currentPos = positionRef.current
            const viewportPosition = getViewportPosition(currentPos, isMobileView)

            const newTop = pixelsToPosition(
                newTopPx,
                viewportPosition.top || DEFAULT_POSITION,
                true,
            )
            const newLeft = pixelsToPosition(
                newLeftPx,
                viewportPosition.left || DEFAULT_POSITION,
                false,
            )

            setCurrentPosition((prev) => {
                if (isMobileView) {
                    return { ...prev, mb: { top: newTop, left: newLeft } }
                }
                return { ...prev, pc: { top: newTop, left: newLeft } }
            })
        },
        [],
    )

    /**
     * Handle position update from coordinates
     */
    const updatePosition = useCallback(
        (clientX: number, clientY: number) => {
            if (!dragStartPos) return

            const deltaX = clientX - dragStartPos.x
            const deltaY = clientY - dragStartPos.y
            const distance = calculateDistance(deltaX, deltaY)

            // Start dragging if threshold exceeded
            if (distance > dragThreshold && !isDragging) {
                startDragging()
            }

            // Update position if dragging or threshold exceeded
            if (isDragging || distance > dragThreshold) {
                const newLeftPx = elementStartPos.left + deltaX
                const newTopPx = elementStartPos.top + deltaY
                const isMobileView = isMobileViewport()

                updatePositionState(newTopPx, newLeftPx, isMobileView)
            }
        },
        [
            isDragging,
            dragStartPos,
            elementStartPos,
            dragThreshold,
            startDragging,
            updatePositionState,
        ],
    )

    // ========================================================================
    // Effects - Drag Event Listeners
    // ========================================================================

    useEffect(() => {
        if (typeof window === 'undefined' || !dragStartPos || !enabled) return

        const handleMouseMove = (e: MouseEvent) => {
            updatePosition(e.clientX, e.clientY)
        }

        const handleMouseUp = () => {
            endDrag()
        }

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault() // Prevent scrolling while dragging
            const touch = e.touches[0]
            if (touch) {
                updatePosition(touch.clientX, touch.clientY)
            }
        }

        const handleTouchEnd = () => {
            endDrag()
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('touchmove', handleTouchMove, { passive: false })
        window.addEventListener('touchend', handleTouchEnd)
        window.addEventListener('touchcancel', handleTouchEnd)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('touchend', handleTouchEnd)
            window.removeEventListener('touchcancel', handleTouchEnd)
        }
    }, [dragStartPos, enabled, updatePosition, endDrag])

    // ========================================================================
    // Computed Values
    // ========================================================================

    const viewportPosition = useMemo(() => {
        return getViewportPosition(currentPosition, isMobile)
    }, [isMobile, currentPosition])

    const currentTop = useMemo(() => viewportPosition.top || DEFAULT_POSITION, [viewportPosition])
    const currentLeft = useMemo(() => viewportPosition.left || DEFAULT_POSITION, [viewportPosition])

    // ========================================================================
    // Render
    // ========================================================================

    const style: CSSProperties = useMemo(
        () => ({
            position: 'absolute',
            top: currentTop,
            left: currentLeft,
            '--pc-top': currentPosition.pc.top,
            '--pc-left': currentPosition.pc.left,
            '--mb-top': currentPosition.mb.top,
            '--mb-left': currentPosition.mb.left,
            cursor: enabled ? (isDragging ? 'grabbing' : 'grab') : 'default',
            ...externalStyle,
        }),
        [currentTop, currentLeft, currentPosition, enabled, isDragging, externalStyle],
    ) as CSSProperties

    return (
        <div
            ref={elementRef}
            className={`draggable hover ${className}`}
            data-safari={isSafari}
            style={style}
            onMouseDown={handleMouseDown}
            data-animation={animation !== 0 ? animation : undefined}
        >
            {children}
        </div>
    )
}

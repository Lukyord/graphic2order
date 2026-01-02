'use client'

import { useEffect, useRef, useState, type PropsWithChildren } from 'react'
import { onWindowResize } from '@/utils/utils'

type PackageDetailsToggleProps = PropsWithChildren<{
    className?: string
    showMoreText?: string
    showLessText?: string
}>

export function PackageDetailsToggle({
    children,
    className = '',
    showMoreText = 'Show More Details',
    showLessText = 'Show Less Details',
}: PackageDetailsToggleProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [maxHeight, setMaxHeight] = useState<string>('0px')
    const detailsRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const calculateHeight = () => {
        if (!contentRef.current) return

        // Temporarily set height to auto to get natural height
        contentRef.current.style.height = 'auto'
        const naturalHeight = contentRef.current.scrollHeight
        contentRef.current.style.height = ''

        setMaxHeight(`${naturalHeight}px`)
    }

    useEffect(() => {
        // Calculate initial height
        calculateHeight()

        // Recalculate on window resize
        const cleanup = onWindowResize(() => {
            calculateHeight()
        })

        return cleanup
    }, [children])

    const handleToggle = () => {
        setIsExpanded((prev) => !prev)
    }

    return (
        <div className={`package-details-wrapper ${className}`.trim()}>
            <div
                ref={detailsRef}
                className="package-details"
                style={{
                    maxHeight: isExpanded ? maxHeight : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out',
                }}
            >
                <div ref={contentRef} className="package-details-inner">
                    {children}
                </div>
            </div>
            <button
                type="button"
                className="package-details-toggle"
                onClick={handleToggle}
                aria-expanded={isExpanded}
            >
                <span className="package-details-toggle-text">
                    {isExpanded ? showLessText : showMoreText}
                </span>
            </button>
        </div>
    )
}

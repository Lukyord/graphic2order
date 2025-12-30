'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Custom hook to detect if the current page is a not-found (404) page
 * @returns boolean indicating if the page is not found
 */
export function useNotFound() {
    const pathname = usePathname()
    const [isNotFound, setIsNotFound] = useState(false)

    useEffect(() => {
        // Check if the main element has the not-found-page class
        const checkNotFound = () => {
            const mainElement = document.querySelector('main#main.not-found-page')
            setIsNotFound(!!mainElement)
        }

        // Immediate synchronous check if DOM is ready
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            checkNotFound()
        } else {
            // Wait for DOM to be ready
            document.addEventListener('DOMContentLoaded', checkNotFound, { once: true })
        }

        // Use MutationObserver to watch for DOM changes
        const observer = new MutationObserver(checkNotFound)
        const targetNode = document.body

        // Observe changes
        if (targetNode) {
            observer.observe(targetNode, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class'],
            })
        }

        return () => {
            observer.disconnect()
            document.removeEventListener('DOMContentLoaded', checkNotFound)
        }
    }, [pathname])

    return isNotFound
}

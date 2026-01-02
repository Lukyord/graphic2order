'use client'

import { useEffect, useRef } from 'react'
import { onWindowResize } from '@/utils/utils'

type MatchHeightsOptions = {
    /**
     * Selector for the container that holds all elements to match
     * @default '.packages-container'
     */
    containerSelector?: string
    /**
     * Selector for the parent elements that contain the target elements
     * If not provided, will search directly in container
     */
    parentSelector?: string
    /**
     * Selectors for elements whose heights should be matched
     * Each selector will be matched independently
     */
    targetSelectors: string[]
    /**
     * Active class name to filter elements
     * @default 'active'
     */
    activeClass?: string
    /**
     * Delay in milliseconds before matching heights (to ensure DOM is ready)
     * @default 100
     */
    delay?: number
    /**
     * Additional delay after tab changes (to account for closing animations)
     * @default 600
     */
    tabChangeDelay?: number
}

/**
 * Hook to match heights of multiple elements across a container
 *
 * @example
 * // Match heights of headers and contents across all package comparisons
 * useMatchHeights({
 *   targetSelectors: ['.package-header', '.package-content'],
 *   parentSelector: '.tab-content.active .tab-content-inner',
 *   containerSelector: '.packages-container',
 * })
 */
export function useMatchHeights(options: MatchHeightsOptions) {
    const {
        containerSelector = '.packages-container',
        parentSelector,
        targetSelectors,
        activeClass = 'active',
        delay = 100,
        tabChangeDelay = 10,
    } = options

    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const matchHeights = () => {
        const container = document.querySelector(containerSelector)
        if (!container) return

        // Find parent elements
        let parentElements: NodeListOf<HTMLElement>
        if (parentSelector) {
            parentElements = container.querySelectorAll<HTMLElement>(parentSelector)
        } else {
            // If no parent selector, use container as parent
            parentElements = container.querySelectorAll<HTMLElement>(':scope > *')
        }

        if (parentElements.length === 0) return

        // Filter to only active elements if needed
        const elementsToProcess = Array.from(parentElements)

        if (elementsToProcess.length === 0) return

        // Process each target selector independently
        targetSelectors.forEach((targetSelector) => {
            // Reset heights to auto to get natural heights
            elementsToProcess.forEach((parent) => {
                const target = parent.querySelector<HTMLElement>(targetSelector)
                if (target) {
                    target.style.height = 'auto'
                }
            })

            // Find all target elements
            const targets = elementsToProcess
                .map((parent) => parent.querySelector<HTMLElement>(targetSelector))
                .filter((el): el is HTMLElement => el !== null)

            if (targets.length === 0) return

            // Calculate max height
            const maxHeight = Math.max(...targets.map((el) => el.offsetHeight), 0)

            // Apply max height to all targets
            if (maxHeight > 0) {
                targets.forEach((target) => {
                    target.style.height = `${maxHeight}px`
                })
            }
        })
    }

    useEffect(() => {
        // Initial match after a delay to ensure DOM is ready
        timeoutRef.current = setTimeout(() => {
            matchHeights()
        }, delay)

        // Match heights on window resize
        const cleanup = onWindowResize(() => {
            matchHeights()
        })

        // Watch for changes in the container (e.g., when tabs change)
        const container = document.querySelector(containerSelector)
        if (container) {
            // Track previous active tab content to detect changes
            let previousActiveElements: Element[] = []

            const observer = new MutationObserver(() => {
                // Find current active tab content elements
                const currentActiveElements = Array.from(
                    container.querySelectorAll(`.tab-content.${activeClass}`),
                )

                // Check if active elements have changed (tab switch detected)
                const hasTabChanged =
                    currentActiveElements.length !== previousActiveElements.length ||
                    currentActiveElements.some((el, index) => el !== previousActiveElements[index])

                if (hasTabChanged) {
                    // Update previous active elements
                    previousActiveElements = currentActiveElements

                    // Clear any pending timeout
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current)
                    }

                    // Use tabChangeDelay for tab changes to account for closing animations
                    timeoutRef.current = setTimeout(() => {
                        matchHeights()
                    }, tabChangeDelay)
                } else {
                    // For other changes, use regular delay
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current)
                    }
                    timeoutRef.current = setTimeout(() => {
                        matchHeights()
                    }, delay)
                }
            })

            // Observe class changes on tab-content elements and the container
            observer.observe(container, {
                attributes: true,
                attributeFilter: ['class'],
                subtree: true,
                childList: false,
            })

            // Initialize previous active elements
            previousActiveElements = Array.from(
                container.querySelectorAll(`.tab-content.${activeClass}`),
            )

            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }
                cleanup()
                observer.disconnect()
            }
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            cleanup()
        }
    }, [
        containerSelector,
        parentSelector,
        targetSelectors.join(','),
        activeClass,
        delay,
        tabChangeDelay,
    ])
}

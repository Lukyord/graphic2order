'use client'

import { useEffect } from 'react'

export default function ContactCardObserver(): null {
    useEffect(() => {
        const findCard = () => {
            return document.querySelector(
                '[data-section="contact-info"] .contact-card',
            ) as HTMLElement
        }

        let cleanup: (() => void) | null = null
        let checkInterval: NodeJS.Timeout | null = null

        const setupObserver = (card: HTMLElement) => {
            const checkIfCentered = () => {
                const rect = card.getBoundingClientRect()
                const viewportHeight = window.innerHeight
                const viewportWidth = window.innerWidth

                // Calculate the center point of the card
                const cardCenterY = rect.top + rect.height / 2
                const cardCenterX = rect.left + rect.width / 2

                // Calculate the center point of the viewport
                const viewportCenterY = viewportHeight / 2
                const viewportCenterX = viewportWidth / 2

                // Check if card center is within 30% of viewport center (threshold)
                const thresholdY = viewportHeight * 0.2
                const thresholdX = viewportWidth * 0.3

                const isCenteredY = Math.abs(cardCenterY - viewportCenterY) < thresholdY
                const isCenteredX = Math.abs(cardCenterX - viewportCenterX) < thresholdX

                if (isCenteredY && isCenteredX) {
                    card.classList.add('active')
                } else {
                    card.classList.remove('active')
                }
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            checkIfCentered()
                        } else {
                            card.classList.remove('active')
                        }
                    })
                },
                {
                    threshold: [0, 0.25, 0.5, 0.75, 1],
                    rootMargin: '0px',
                },
            )

            observer.observe(card)

            // Also check on scroll for more accurate tracking
            const handleScroll = () => {
                const rect = card.getBoundingClientRect()
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    checkIfCentered()
                } else {
                    card.classList.remove('active')
                }
            }

            window.addEventListener('scroll', handleScroll, { passive: true })
            window.addEventListener('resize', checkIfCentered, { passive: true })

            // Initial check
            checkIfCentered()

            cleanup = () => {
                observer.disconnect()
                window.removeEventListener('scroll', handleScroll)
                window.removeEventListener('resize', checkIfCentered)
            }
        }

        let card = findCard()

        // Wait for DOM to be ready if card is not found immediately
        if (!card) {
            checkInterval = setInterval(() => {
                card = findCard()
                if (card) {
                    if (checkInterval) clearInterval(checkInterval)
                    setupObserver(card)
                }
            }, 100)

            // Cleanup after 5 seconds if card still not found
            setTimeout(() => {
                if (checkInterval) clearInterval(checkInterval)
            }, 5000)
        } else {
            setupObserver(card)
        }

        return () => {
            if (checkInterval) clearInterval(checkInterval)
            if (cleanup) cleanup()
        }
    }, [])

    return null
}

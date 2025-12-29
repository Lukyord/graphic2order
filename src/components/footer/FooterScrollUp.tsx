'use client'

import { useLenis } from 'lenis/react'

export default function FooterScrollUp() {
    const lenis = useLenis()

    const handleScrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: false })
        } else {
            // Fallback if Lenis is not available
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <button className="footer-scroll-up" onClick={handleScrollToTop} aria-label="Scroll to top">
            <i className="ic ic-arrow-up size-icon-xs"></i>
        </button>
    )
}

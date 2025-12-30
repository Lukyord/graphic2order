'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { onWindowResize } from '@/utils/utils'

import AnimateOnScroll from '../common/animate-on-scroll'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

type ServiceCounterProps = {
    totalServices: number
}

export default function ServiceCounter({ totalServices }: ServiceCounterProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const counterRef = useRef<HTMLDivElement>(null)
    const digit1WrapperRef = useRef<HTMLDivElement>(null)
    const digit2WrapperRef = useRef<HTMLDivElement>(null)
    const isInitialized = useRef(false)

    const scrollTriggersRef = useRef<ScrollTrigger[]>([])

    useEffect(() => {
        if (!counterRef.current) return

        const serviceItems = document.querySelectorAll(
            '[data-section="services"] .service-item .item-ttl',
        )
        const headerHeight = document.querySelector('#header')?.clientHeight || 0

        if (serviceItems.length === 0) return

        // Kill existing triggers
        scrollTriggersRef.current.forEach((trigger) => trigger.kill())
        scrollTriggersRef.current = []

        // Create ScrollTrigger for each service item
        serviceItems.forEach((item, index) => {
            const trigger = ScrollTrigger.create({
                trigger: item as HTMLElement,
                start: `top ${headerHeight * 3}px`,
                end: 'bottom top',
                onEnter: () => {
                    setCurrentIndex(index)
                },
                onEnterBack: () => {
                    setCurrentIndex(index)
                },
            })
            scrollTriggersRef.current.push(trigger)
        })

        // Cleanup
        return () => {
            scrollTriggersRef.current.forEach((trigger) => trigger.kill())
            scrollTriggersRef.current = []
        }
    }, [totalServices])

    // Handle window resize to refresh ScrollTrigger
    useEffect(() => {
        const cleanup = onWindowResize(
            () => {
                ScrollTrigger.refresh()
            },
            {
                delay: 150,
                executeOnLoad: false,
            },
        )

        return cleanup
    }, [])

    // Initialize and animate digits when currentIndex changes
    useEffect(() => {
        const newValue = String(currentIndex + 1).padStart(2, '0')
        const digit1 = parseInt(newValue[0])
        const digit2 = parseInt(newValue[1])

        if (digit1WrapperRef.current && digit2WrapperRef.current) {
            const strip1 = digit1WrapperRef.current.querySelector('.digit-strip') as HTMLElement
            const strip2 = digit2WrapperRef.current.querySelector('.digit-strip') as HTMLElement

            const fontSize = getComputedStyle(counterRef.current as HTMLElement).fontSize
            const parsedFontSize = parseFloat(fontSize.replace('px', ''))

            if (strip1 && strip2) {
                if (!isInitialized.current) {
                    // Initial setup without animation
                    gsap.set(strip1, { y: `0` })
                    gsap.set(strip2, { y: `-${parsedFontSize}` })
                    isInitialized.current = true
                } else {
                    // Animate to new value
                    gsap.to(strip1, {
                        y: `-${digit1 * parsedFontSize}`,
                        duration: 0.6,
                        ease: 'power2.out',
                    })
                    gsap.to(strip2, {
                        y: `-${digit2 * parsedFontSize}`,
                        duration: 0.6,
                        ease: 'power2.out',
                    })
                }
            }
        }
    }, [currentIndex])

    return (
        <div ref={counterRef} className="service-counter">
            <AnimateOnScroll triggerClass="fadeIn" className="counter-digits">
                <div ref={digit1WrapperRef} className="digit-wrapper">
                    <div className="digit-strip">
                        {Array.from({ length: 10 }, (_, i) => (
                            <div key={i} className="digit-item">
                                {i}
                            </div>
                        ))}
                    </div>
                </div>
                <div ref={digit2WrapperRef} className="digit-wrapper">
                    <div className="digit-strip">
                        {Array.from({ length: 10 }, (_, i) => (
                            <div key={i} className="digit-item">
                                {i}
                            </div>
                        ))}
                    </div>
                </div>
            </AnimateOnScroll>
        </div>
    )
}

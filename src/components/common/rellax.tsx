'use client'

import React, { useEffect, useRef } from 'react'
import Rellax from 'rellax'

type RellaxElementProps = {
    children: React.ReactNode
    speed?: number
    center?: boolean
}

export default function RellaxElement({ children, speed = -1, center = true }: RellaxElementProps) {
    const rellaxRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        new Rellax(rellaxRef.current, {
            speed,
            center,
        })
    }, [speed, center])

    return <div ref={rellaxRef}>{children}</div>
}

'use client'

import { ReactNode } from 'react'
import useFancybox from '@/hooks/useFancybox'

type FancyboxGalleryProps = {
    children: ReactNode
    className?: string
    fancyboxClass?: string
}

export default function FancyboxGallery({
    children,
    className,
    fancyboxClass,
}: FancyboxGalleryProps) {
    const [fancyboxRef] = useFancybox({
        mainClass: fancyboxClass,
        Carousel: {
            Toolbar: {
                display: {
                    left: [],
                    middle: [],
                    right: ['close'],
                },
            },
            Thumbs: {
                showOnStart: false,
            },
        },
    })

    return (
        <div ref={fancyboxRef} className={className}>
            {children}
        </div>
    )
}

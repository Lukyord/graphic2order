'use client'

import { useNotFound } from '@/hooks/useNotFound'

interface FooterWrapperProps {
    children: React.ReactNode
}

export default function FooterWrapper({ children }: FooterWrapperProps) {
    const isNotFound = useNotFound()

    if (isNotFound) {
        return null
    }

    return <>{children}</>
}

'use client'

import { useState, useRef, useEffect } from 'react'

type FilterOption = {
    id: number
    name: string
    slug: string
}

type FilterProps = {
    options: FilterOption[]
    onFilterChange: (selectedId: number | null) => void
    allLabel?: string
    className?: string
    triggerClassName?: string
    menuClassName?: string
    itemClassName?: string
}

export default function Filter({
    options,
    onFilterChange,
    allLabel = 'All',
    className = '',
    triggerClassName = '',
    menuClassName = '',
    itemClassName = '',
}: FilterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const filterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const handleSelect = (id: number | null) => {
        setSelectedId(id)
        setIsOpen(false)
        onFilterChange(id)
    }

    const selectedOption = selectedId ? options.find((option) => option.id === selectedId) : null

    const displayText = selectedOption ? selectedOption.name : allLabel

    return (
        <div ref={filterRef} className={`filter ${className} ${isOpen ? 'active' : ''}`}>
            <button
                type="button"
                className={`filter-trigger ${triggerClassName}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="filter-trigger-text">{displayText}</span>
                <span className={`filter-trigger-icon`} aria-hidden="true">
                    <i className="ic ic-chevron-down size-icon-3xs"></i>
                </span>
            </button>

            <div className={`filter-menu ${menuClassName}`}>
                <button
                    type="button"
                    className={`filter-item ${selectedId === null ? 'is-active' : ''} ${itemClassName}`}
                    onClick={() => handleSelect(null)}
                >
                    {allLabel}
                </button>
                {options.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        className={`filter-item ${selectedId === option.id ? 'is-active' : ''} ${itemClassName}`}
                        onClick={() => handleSelect(option.id)}
                    >
                        {option.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

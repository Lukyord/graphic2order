'use client'

import { useState, useMemo, useEffect, ReactNode, Fragment } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Counter from '@/components/template/Counter'
import Filter from '@/components/template/Filter'
import CollectionEmptyState from '@/components/template/CollectionEmptyState'
import AnimateOnScroll from '../common/animate-on-scroll'
import useFancybox from '@/hooks/useFancybox'

type FilterOption = {
    id: number
    name: string
    slug: string
}

type CollectionItem = {
    id: number | string
    [key: string]: any
}

type CollectionContainerProps<T extends CollectionItem, TOption extends FilterOption> = {
    items: T[]
    options: TOption[]
    allLabel?: string
    collectionClassName: string
    typeKey: keyof T
    gridItems: ReactNode[]
    listItems?: ReactNode[]
    enableViewMode?: boolean
    viewModeStorageKey?: string
    enableScrollTrigger?: boolean
}

type ViewMode = 'grid' | 'list'

export default function CollectionContainer<
    T extends CollectionItem,
    TOption extends FilterOption,
>({
    items,
    options,
    allLabel = 'All',
    collectionClassName,
    typeKey,
    gridItems,
    listItems,
    enableViewMode = false,
    viewModeStorageKey,
    enableScrollTrigger = false,
}: CollectionContainerProps<T, TOption>) {
    const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null)
    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const [fancyboxRef] = useFancybox()

    // LOAD VIEW MODE ===========
    useEffect(() => {
        if (enableViewMode && viewModeStorageKey) {
            const saved = localStorage.getItem(viewModeStorageKey)
            if (saved === 'grid' || saved === 'list') {
                setViewMode(saved)
            }
        }
    }, [enableViewMode, viewModeStorageKey])

    // SAVE VIEW MODE ===========
    useEffect(() => {
        if (enableViewMode && viewModeStorageKey) {
            localStorage.setItem(viewModeStorageKey, viewMode)
        }
    }, [viewMode, enableViewMode, viewModeStorageKey])

    // FILTER ITEMS ===========
    const filteredItems = useMemo(() => {
        if (selectedTypeId === null) {
            return items
        }

        return items.filter((item) => {
            const itemType = item[typeKey]

            return itemType.some((type: TOption | number) => {
                if (typeof type === 'object' && type !== null) {
                    return (type as TOption).id === selectedTypeId
                }
                return type === selectedTypeId
            })
        })
    }, [items, selectedTypeId, typeKey])

    // CREATE ITEM INDEX MAP ===========
    const itemIndexMap = useMemo(() => {
        const map = new Map<T['id'], number>()
        items.forEach((item, index) => {
            map.set(item.id, index)
        })
        return map
    }, [items])

    // REFRESH SCROLL TRIGGER ===========
    useEffect(() => {
        if (enableScrollTrigger && typeof window !== 'undefined') {
            const rafId = requestAnimationFrame(() => {
                setTimeout(() => {
                    ScrollTrigger.refresh()
                }, 0)
            })

            return () => {
                cancelAnimationFrame(rafId)
            }
        }
    }, [selectedTypeId, viewMode, filteredItems.length, enableScrollTrigger])

    // HANDLE FILTER CHANGE ===========
    const handleFilterChange = (selectedId: number | null) => {
        setSelectedTypeId(selectedId)
    }

    return (
        <section>
            <div className="sc-inner pc-b-200 mb-b-200">
                <div className="container">
                    <AnimateOnScroll className="collection-action" triggerClass="fadeIn">
                        <div className="left">
                            <Counter count={filteredItems.length} />
                            {enableViewMode && (
                                <div className="view-toggle">
                                    <button
                                        type="button"
                                        className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                        onClick={() => setViewMode('grid')}
                                        aria-label="Grid view"
                                    >
                                        Grid
                                    </button>
                                    <button
                                        type="button"
                                        className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                        aria-label="List view"
                                    >
                                        List
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="right">
                            <Filter
                                options={options}
                                onFilterChange={handleFilterChange}
                                allLabel={allLabel}
                            />
                        </div>
                    </AnimateOnScroll>

                    <div
                        ref={fancyboxRef}
                        className={`collection-content ${collectionClassName} ${enableViewMode ? viewMode : ''}`}
                    >
                        {filteredItems.length === 0 ? (
                            <CollectionEmptyState />
                        ) : (
                            <>
                                <div className={`${collectionClassName}-grid`}>
                                    {filteredItems.map((item) => {
                                        const index = itemIndexMap.get(item.id)
                                        return index !== undefined ? (
                                            <Fragment key={item.id}>{gridItems[index]}</Fragment>
                                        ) : null
                                    })}
                                </div>

                                <div className={`${collectionClassName}-list`}>
                                    {filteredItems.map((item) => {
                                        const index = itemIndexMap.get(item.id)
                                        return index !== undefined && listItems?.[index] ? (
                                            <Fragment key={item.id}>{listItems[index]}</Fragment>
                                        ) : null
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

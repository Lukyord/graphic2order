'use client'

import { Media, type Package } from '@/payload-types'
import { Popup, PopupTrigger, PopupContent } from '@/components/common/popup'
import RenderMedia from '@/components/common/media'
import { LexicalToHTML } from '@/components/common/lexicaltoHTML'
import {
    TabContainer,
    TabItem,
    TabLink,
    TabContent,
    TabContents,
    useTabContext,
} from '../common/tab'
import { useMatchHeights } from '@/hooks/use-match-heights'
import { PackageDetailsToggle } from './PackageDetailsToggle'

type PackageComparisonProps = {
    containerId: string
    packages: Package[]
    defaultPackageIndex?: number
}

function PackageTrigger({ packages }: { packages: Package[] }) {
    const { activeTab } = useTabContext()
    const activePackage = packages.find((p) => activeTab === `#package-${p.id}`)
    const displayText = activePackage
        ? activePackage.title || activePackage.code || `Package ${activePackage.id}`
        : 'Compare Packages'

    return <span>{displayText}</span>
}

export function PackageComparison({
    containerId,
    packages,
    defaultPackageIndex = 0,
}: PackageComparisonProps) {
    const defaultPackage = packages[defaultPackageIndex] || packages[0]
    const defaultActiveTab = defaultPackage ? `#package-${defaultPackage.id}` : undefined

    useMatchHeights({
        targetSelectors: ['.package-header', '.package-content'],
        parentSelector: '.tab-content.active .tab-content-inner',
        containerSelector: '.packages-container',
    })

    return (
        <TabContainer
            containerId={containerId}
            defaultActiveTab={defaultActiveTab}
            updateUrlHash={false}
        >
            <Popup position="center" className="package-popup">
                <PopupTrigger as="button" className="package-trigger">
                    <PackageTrigger packages={packages} />
                </PopupTrigger>
                <PopupContent className="package-popup-content">
                    <div className="package-tab-links">
                        {packages.map((p) => {
                            const tabId = `#package-${p.id}`
                            return (
                                <TabItem key={p.id} tabId={tabId}>
                                    <TabLink tabId={tabId} className="package-tab-link">
                                        {p.title || p.code || `Package ${p.id}`}
                                    </TabLink>
                                </TabItem>
                            )
                        })}
                    </div>
                </PopupContent>
            </Popup>

            <TabContents>
                {packages.map((pkg) => {
                    const tabId = `#package-${pkg.id}`
                    const mediaUrl = (pkg.mainMedia as Media)?.url || ''

                    return (
                        <TabContent key={pkg.id} tabId={tabId}>
                            <div className="tab-content-inner">
                                {mediaUrl && (
                                    <div className="package-media">
                                        <RenderMedia src={mediaUrl} alt={pkg.title || ''} />
                                    </div>
                                )}

                                <div className="package-content">
                                    <div className="package-header">
                                        {pkg.title && (
                                            <div className="package-title">
                                                <h3 className="size-h5">{pkg.title}</h3>
                                            </div>
                                        )}
                                        {pkg.price && (
                                            <div className="package-price">
                                                <span className="code">{pkg.code} : </span>
                                                <span className="price">
                                                    {new Intl.NumberFormat('th-TH', {
                                                        style: 'decimal',
                                                    }).format(pkg.price)}
                                                </span>
                                                <span className="package-price-unit"> THB</span>
                                            </div>
                                        )}
                                    </div>

                                    {pkg.description && (
                                        <div className="package-description">
                                            <p>{pkg.description}</p>
                                        </div>
                                    )}

                                    {pkg.summary && pkg.summary.length > 0 && (
                                        <ul className="package-summary">
                                            {pkg.summary.map((item) => (
                                                <li key={item.id}>{item.description}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {pkg.details && pkg.details.length > 0 && (
                                    <PackageDetailsToggle>
                                        <div className="package-details-content">
                                            {pkg.details.map((detail) => (
                                                <div
                                                    key={detail.id}
                                                    className="package-detail-item"
                                                >
                                                    {detail.title && (
                                                        <div className="package-detail-title">
                                                            <h4 className="size-h6">
                                                                {detail.title}
                                                            </h4>
                                                        </div>
                                                    )}
                                                    {detail.content && (
                                                        <div className="package-detail-content">
                                                            <LexicalToHTML data={detail.content} />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </PackageDetailsToggle>
                                )}
                            </div>
                        </TabContent>
                    )
                })}
            </TabContents>
        </TabContainer>
    )
}

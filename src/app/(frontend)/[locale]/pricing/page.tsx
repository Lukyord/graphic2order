import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getPackages } from '@/payload/services/packages'
import { getPricingSettings } from '@/payload/services/pricingSetting'
import { Locale } from '@/i18n/routing'
import { Draggable } from '@/components/template/Draggable/Draggable'
import { GlassElement } from '@/components/template/GlassElement/GlassElement'
import { SplitTextComponent } from '@/components/common/split-text'
import {
    AccordionContainer,
    AccordionItem,
    AccordionTitle,
    AccordionPanel,
} from '@/components/common/accordion/index'
import { PackageComparison } from '@/components/pricing/PackageComparison'
import AnimateOnScroll from '@/components/common/animate-on-scroll'

export const dynamic = 'force-dynamic'

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const tPricing = await getTranslations('Pricing')

    const pricingSettings = await getPricingSettings(locale as Locale)
    const packages = await getPackages(locale as Locale)

    return (
        <main id="main" className="pricing-page">
            <h1 className="visually-hidden">{tPricing('h1')}</h1>

            <section data-section="pricing" className="header-padding">
                <div className="sc-inner pc-t-150 pc-b-150 mb-t-150 mb-b-150">
                    <div className="container">
                        <div className="sc-title-text-wrapper">
                            <Draggable
                                pcPosition={{ top: '-50%', left: '10%' }}
                                mbPosition={{ top: '0', left: '0' }}
                                animation={2}
                            >
                                <GlassElement
                                    width="200px"
                                    height="200px"
                                    radius="50%"
                                    widthMb="120px"
                                    heightMb="120px"
                                    radiusMb="50%"
                                    depth={10}
                                    blur={2}
                                    chromaticAberration={1}
                                    debug={false}
                                />
                            </Draggable>

                            <Draggable
                                pcPosition={{ top: '-70%', left: '70%' }}
                                mbPosition={{ top: '0', left: '55%' }}
                                animation={1}
                            >
                                <GlassElement
                                    width="200px"
                                    height="200px"
                                    radius="50%"
                                    widthMb="80px"
                                    heightMb="80px"
                                    radiusMb="50%"
                                    depth={12}
                                    blur={4}
                                    chromaticAberration={1}
                                    debug={false}
                                />
                            </Draggable>

                            <div className="sc-title-text">
                                <SplitTextComponent
                                    as="h2"
                                    className="vw-ttl"
                                    type="chars,words"
                                    from={{ y: '100%' }}
                                    to={{ y: '0%' }}
                                    duration={0.8}
                                    stagger={0.01}
                                    ease="power3.out"
                                    animateOnScroll={true}
                                    scrollStart="top bottom"
                                >
                                    Find Your Perfect Plan
                                </SplitTextComponent>
                            </div>
                        </div>

                        <div className="block-content-center">
                            <AnimateOnScroll triggerClass="fadeIn" className="block-desc">
                                <p>{tPricing('pricing-hero-desc')}</p>
                            </AnimateOnScroll>
                        </div>

                        {packages && packages.length > 0 && (
                            <AnimateOnScroll triggerClass="fadeIn" className="packages-container">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <PackageComparison
                                        key={`package-comparison-${i}`}
                                        containerId={`packages-tab-container-${i}`}
                                        packages={packages}
                                        defaultPackageIndex={i}
                                    />
                                ))}
                            </AnimateOnScroll>
                        )}
                    </div>
                </div>
            </section>

            <section data-section="faq">
                <div className="sc-inner pc-t-150 pc-b-200 mb-t-200 mb-b-200">
                    <div className="container">
                        <div className="sc-ttl">
                            <SplitTextComponent
                                as="h2"
                                className="vw-ttl"
                                type="chars,words"
                                from={{ y: '100%' }}
                                to={{ y: '0%' }}
                                duration={0.8}
                                stagger={0.01}
                                ease="power3.out"
                                animateOnScroll={true}
                                scrollStart="top bottom"
                            >
                                FAQ
                            </SplitTextComponent>
                        </div>

                        {pricingSettings.faq && pricingSettings.faq.length > 0 && (
                            <AccordionContainer>
                                {pricingSettings.faq
                                    .filter((faq) => faq.id)
                                    .map((faq) => (
                                        <AccordionItem key={faq.id} itemId={faq.id!}>
                                            <AccordionTitle itemId={faq.id!}>
                                                <h3 className="size-h5">{faq.question}</h3>
                                            </AccordionTitle>
                                            <AccordionPanel
                                                itemId={faq.id!}
                                                innerClassName="entry-panel-inner"
                                            >
                                                <p>{faq.answer}</p>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    ))}
                            </AccordionContainer>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}

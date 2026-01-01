import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Locale } from '@/i18n/routing'

import AnimateOnScroll from '@/components/common/animate-on-scroll'
import { SplitTextComponent } from '@/components/common/split-text'
import { Draggable } from '@/components/template/Draggable/Draggable'
import { GlassElement } from '@/components/template/GlassElement/GlassElement'
import ServicesSection from '@/components/services/ServicesSection'

export const dynamic = 'force-dynamic'

export default async function ServicePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const tService = await getTranslations('Service')

    return (
        <main id="main" className="service-page">
            <h1 className="visually-hidden">{tService('h1')}</h1>

            {/* HERO INFO */}
            <section data-section="service-hero" className="header-padding">
                <div className="sc-inner pc-t-200 pc-b-200 mb-t-200 mb-b-200">
                    <div className="container">
                        <div className="sc-title-text-wrapper">
                            <Draggable
                                pcPosition={{ top: '10%', left: '10%' }}
                                mbPosition={{ top: '30%', left: '30%' }}
                                animation={3}
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
                                pcPosition={{ top: '-2%', left: '70%' }}
                                mbPosition={{ top: '0', left: '55%' }}
                                animation={2}
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
                                    Logos. Branding.
                                </SplitTextComponent>

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
                                    delay={0.3}
                                >
                                    Packaging.
                                </SplitTextComponent>

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
                                    delay={0.5}
                                >
                                    All In One Place
                                </SplitTextComponent>
                            </div>
                        </div>

                        <div className="hero-desc">
                            <div className="block-content-start">
                                <AnimateOnScroll className="block-desc" triggerClass="fadeEntry">
                                    <p>{tService('service-hero-desc-1')}</p>
                                </AnimateOnScroll>
                            </div>

                            <div className="block-content-start">
                                <AnimateOnScroll className="block-desc" triggerClass="fadeEntry">
                                    <p>{tService('service-hero-desc-2')}</p>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <ServicesSection locale={locale as Locale} />
        </main>
    )
}

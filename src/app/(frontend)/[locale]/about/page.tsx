export const dynamic = 'force-dynamic'

import AnimateOnScroll from '@/components/common/animate-on-scroll'
import { SplitTextComponent } from '@/components/common/split-text'
import { Draggable } from '@/components/template/Draggable/Draggable'
import { GlassElement } from '@/components/template/GlassElement/GlassElement'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const tAbout = await getTranslations('About')
    return (
        <main id="main" className="about-page">
            <h1 className="visually-hidden">Graphic2order - About Page</h1>

            {/* HERO INFO */}
            <section data-section="about-hero" className="header-padding">
                <div className="sc-inner pc-t-200 pc-b-200 mb-t-200 mb-b-200">
                    <div className="container">
                        <div className="sc-title-text-wrapper">
                            <Draggable
                                pcPosition={{ top: '0', left: '10%' }}
                                mbPosition={{ top: '15%', left: '0%' }}
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
                                pcPosition={{ top: '-10%', left: '70%' }}
                                mbPosition={{ top: '-10%', left: '75%' }}
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
                                    We Don't Just Design
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
                                    We Define
                                </SplitTextComponent>
                            </div>
                        </div>

                        <div className="hero-desc">
                            <div className="block-content-start">
                                <AnimateOnScroll className="block-desc" triggerClass="fadeEntry">
                                    <p>{tAbout('about-hero-desc-1')}</p>
                                </AnimateOnScroll>
                            </div>

                            <div className="block-content-start">
                                <AnimateOnScroll className="block-desc" triggerClass="fadeEntry">
                                    <p>{tAbout('about-hero-desc-2')}</p>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section data-section="about-info">
                <div className="sc-inner pc-t-100 pc-b-200 mb-t-100 mb-b-200">
                    <div className="container">
                        <AnimateOnScroll triggerClass="fadeIn" className="sc-ttl">
                            <h2 className="size-h1">Who We Are</h2>
                        </AnimateOnScroll>

                        <AnimateOnScroll triggerClass="fadeIn" className="about-desc">
                            <p>
                                <span className="highlight">Graphic2Order</span>
                                <span>{tAbout('brand-desc')}</span>
                            </p>

                            <p>
                                {tAbout('minssion-1')}
                                <span className="highlight">{tAbout('mission-2')}</span>
                                {tAbout('mission-3')}
                            </p>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>
        </main>
    )
}

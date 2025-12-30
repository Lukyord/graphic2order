import { routing } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'

import { SplitTextComponent } from '@/components/common/split-text'
import { Draggable } from '@/components/template/Draggable/Draggable'
import { GlassElement } from '@/components/template/GlassElement/GlassElement'

export default async function LocaleNotFound({ params }: { params?: Promise<{ locale: string }> }) {
    const resolvedParams = await params
    const locale = resolvedParams?.locale || routing.defaultLocale
    setRequestLocale(locale)

    const tNotFound = await getTranslations('NotFound')

    return (
        <main id="main" className="not-found-page">
            <section data-section="not-found">
                <div className="no-found-content">
                    <Draggable
                        pcPosition={{ top: '10%', left: '30%' }}
                        mbPosition={{ top: '20%', left: '60%' }}
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
                        pcPosition={{ top: '50%', left: '0%' }}
                        mbPosition={{ top: '10%', left: '35%' }}
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
                            404
                        </SplitTextComponent>

                        <SplitTextComponent
                            as="h2"
                            className="vw-ttl hidden-device-md"
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
                            SORRY
                        </SplitTextComponent>

                        <SplitTextComponent
                            as="h2"
                            className="vw-ttl with-arrow show-md"
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
                            <span>SORRY</span> <span>↓↓↓</span>
                        </SplitTextComponent>

                        <div className="sc-subttl">
                            <p>{tNotFound('not-found-subttl')}</p>
                        </div>

                        <SplitTextComponent
                            as="h2"
                            className="vw-ttl hidden-device-md"
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
                            ↓↓↓
                        </SplitTextComponent>
                    </div>

                    <Link className="not-found-cta" href="/">
                        <span>Back To Homepage</span>
                    </Link>
                </div>
            </section>
        </main>
    )
}

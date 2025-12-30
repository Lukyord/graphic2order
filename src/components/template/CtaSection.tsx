import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { SplitTextComponent } from '../common/split-text'
import { Draggable } from './Draggable/Draggable'
import { GlassElement } from './GlassElement/GlassElement'
import AnimateOnScroll from '../common/animate-on-scroll'

export default async function CtaSection() {
    const tGeneralButton = await getTranslations('General.Button')
    const tCta = await getTranslations('Cta')

    return (
        <section data-section="cta">
            <div className="sc-inner pc-t-150 pc-b-150 mb-t-100 mb-b-100">
                <div className="container">
                    <div className="sc-title-text-wrapper">
                        <Draggable
                            pcPosition={{ top: '30%', left: '0%' }}
                            mbPosition={{ top: '30%', left: '0%' }}
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
                            pcPosition={{ top: '-15%', left: '80%' }}
                            mbPosition={{ top: '-10%', left: '70%' }}
                            animation={3}
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
                                as="p"
                                className="size-h0"
                                type="chars,words"
                                from={{ y: '100%' }}
                                to={{ y: '0%' }}
                                duration={0.8}
                                stagger={0.01}
                                delay={0.3}
                            >
                                Special Offer
                            </SplitTextComponent>

                            <SplitTextComponent
                                as="p"
                                className="size-h0"
                                type="chars,words"
                                from={{ y: '100%' }}
                                to={{ y: '0%' }}
                                duration={0.8}
                                stagger={0.01}
                                delay={0.5}
                            >
                                For
                            </SplitTextComponent>

                            <SplitTextComponent
                                as="p"
                                className="size-h0"
                                type="chars,words"
                                from={{ y: '100%' }}
                                to={{ y: '0%' }}
                                duration={0.8}
                                stagger={0.01}
                                delay={0.7}
                            >
                                New Clients
                            </SplitTextComponent>
                        </div>
                    </div>

                    <div className="block-content-start">
                        <div className="block-body">
                            <AnimateOnScroll
                                triggerClass="fadeIn"
                                className="block-desc"
                                delay={1200}
                            >
                                <p>{tCta('cta-desc')}</p>
                            </AnimateOnScroll>

                            <AnimateOnScroll
                                triggerClass="fadeIn"
                                className="block-cta"
                                delay={1500}
                            >
                                <Link href="/contact" className="button">
                                    <span>{tGeneralButton('get-in-touch')}</span>
                                </Link>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

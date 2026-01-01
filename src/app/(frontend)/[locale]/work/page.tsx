import { getWorks } from '@/payload/services/works'
import { getWorkTypes } from '@/payload/services/workTypes'

import { Locale } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import CollectionContainer from '@/components/template/CollectionContainer'
import WorkGridItem from '@/components/work/WorkGridItem'
import { SplitTextComponent } from '@/components/common/split-text'
import AnimateOnScroll from '@/components/common/animate-on-scroll'
import { Draggable } from '@/components/template/Draggable/Draggable'
import { GlassElement } from '@/components/template/GlassElement/GlassElement'
import WorkCardList from '@/components/work/WorkCardList'

export const dynamic = 'force-dynamic'

const STORAGE_KEY = 'work-view-mode'

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const tWork = await getTranslations('Work')

    const works = await getWorks(locale as Locale)
    const workTypes = await getWorkTypes()

    return (
        <main id="main" className="work-page">
            <h1 className="visually-hidden">{tWork('h1')}</h1>

            {/* HERO INFO */}
            <section data-section="work-hero" className="header-padding">
                <div className="sc-inner pc-t-200 pc-b-200 mb-t-200 mb-b-200">
                    <div className="container">
                        <div className="sc-title-text-wrapper">
                            <Draggable
                                pcPosition={{ top: '10%', left: '10%' }}
                                mbPosition={{ top: '30%', left: '30%' }}
                                animation={3}
                            >
                                <GlassElement
                                    width="300px"
                                    height="300px"
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
                                    Our Works Speak
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
                                    Louder Than Words
                                </SplitTextComponent>
                            </div>
                        </div>

                        <div className="block-content-start">
                            <AnimateOnScroll className="block-desc" triggerClass="fadeEntry">
                                <p>{tWork('work-hero-desc')}</p>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* WORK */}
            <CollectionContainer
                items={works}
                options={workTypes}
                allLabel={tWork('work-filter-all')}
                collectionClassName="work-collection"
                typeKey="workTypes"
                gridItems={works.map((work) => (
                    <WorkGridItem key={work.id} work={work} />
                ))}
                listItems={works.map((work) => (
                    <WorkCardList key={work.id} work={work} />
                ))}
                enableViewMode={true}
                viewModeStorageKey={STORAGE_KEY}
                enableScrollTrigger={true}
            />
        </main>
    )
}

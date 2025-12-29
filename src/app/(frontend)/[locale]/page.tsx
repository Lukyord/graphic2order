import Link from 'next/link'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { generateMeta } from '@/lib/generateMeta'
import { getWorkTypes } from '@/payload/services/workTypes'
import { getHomepageSettings } from '@/payload/services/homepageSettings'
import { Work } from '@/payload-types'
import { Locale } from '@/i18n/routing'

import { SplitTextComponent } from '@/components/common/split-text'
import AnimateOnScroll from '@/components/common/animate-on-scroll'
import { GlassElement } from '@/components/template/GlassElement/GlassElement'
import { Draggable } from '@/components/template/Draggable/Draggable'
import HorizontalMarquee from '@/components/common/horizontal-marquee'
import WorkGridItem from '@/components/work/WorkGridItem'
import FancyboxGallery from '@/components/template/FancyboxGallery'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params
    const siteSettings = await getHomepageSettings(locale as Locale)

    return generateMeta({
        meta: siteSettings.meta,
    })
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const tHomepage = await getTranslations('Homepage')
    const tGeneralButton = await getTranslations('General.Button')

    // HOMEPAGE SETTINGS ================================
    const homepageSettings = await getHomepageSettings(locale as Locale)
    const featuredWorks = (homepageSettings.featuredWorks as Work[]) || []

    // Calculate year range from featured works
    const getYearRange = () => {
        const years = featuredWorks
            .filter((work): work is Exclude<typeof work, number> => typeof work !== 'number')
            .map((work) => work.date)
            .filter((date): date is string => Boolean(date))
            .map((date) => new Date(date).getFullYear())

        if (years.length === 0) return 'Present'

        const oldestYear = Math.min(...years)
        const newestYear = Math.max(...years)
        const currentYear = new Date().getFullYear()

        if (newestYear === currentYear) {
            return `${oldestYear} - Present`
        }

        return `${oldestYear} - ${newestYear}`
    }

    // WORK TYPES ================================
    const workTypes = await getWorkTypes()

    return (
        <main id="main" className="index-page">
            {/* HERO */}
            <section data-section="homepage-hero" className="header-padding">
                <div className="sc-inner pc-t-150 pc-b-75 mb-t-125 mb-b-125">
                    <div className="container" style={{ position: 'relative' }}>
                        <Draggable
                            pcPosition={{ top: '25%', left: '10%' }}
                            mbPosition={{ top: '20%', left: '0%' }}
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
                            pcPosition={{ top: '-2%', left: '59%' }}
                            mbPosition={{ top: '-2%', left: '75%' }}
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
                                as="p"
                                className="vw-ttl"
                                type="chars,words"
                                from={{ y: '100%' }}
                                to={{ y: '0%' }}
                                duration={0.8}
                                stagger={0.01}
                                delay={0.3}
                            >
                                Design Studio
                            </SplitTextComponent>

                            <SplitTextComponent
                                as="p"
                                className="vw-ttl"
                                type="chars,words"
                                from={{ y: '100%' }}
                                to={{ y: '0%' }}
                                duration={0.8}
                                stagger={0.01}
                                delay={0.5}
                            >
                                With
                            </SplitTextComponent>

                            <SplitTextComponent
                                as="p"
                                className="vw-ttl"
                                type="chars,words"
                                from={{ y: '100%' }}
                                to={{ y: '0%' }}
                                duration={0.8}
                                stagger={0.01}
                                delay={0.7}
                            >
                                Creativity and
                            </SplitTextComponent>

                            <SplitTextComponent
                                as="p"
                                className="vw-ttl"
                                type="chars,words"
                                from={{ y: '100%' }}
                                to={{ y: '0%' }}
                                duration={0.8}
                                stagger={0.01}
                                delay={0.9}
                            >
                                Passion
                            </SplitTextComponent>
                        </div>

                        <div className="block-content-start">
                            <div className="block-body">
                                <AnimateOnScroll
                                    triggerClass="fadeIn"
                                    className="block-desc"
                                    delay={1200}
                                >
                                    <p>{tHomepage('hero-desc')}</p>
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

            {/* ABOUT */}
            <section data-section="about-cta">
                <div className="sc-inner pc-t-75 pc-b-150 mb-t-100 mb-b-100">
                    <div className="container">
                        <div className="block-content-start">
                            <div className="block-ttl">
                                <SplitTextComponent
                                    as="h2"
                                    className="size-h0"
                                    type="chars,words"
                                    from={{ y: '100%' }}
                                    to={{ y: '0%' }}
                                    duration={0.8}
                                    stagger={0.01}
                                >
                                    ABOUT
                                </SplitTextComponent>
                            </div>

                            <div className="block-body show-md">
                                <AnimateOnScroll triggerClass="fadeIn" className="block-desc">
                                    <p>{tHomepage('about-cta.about-desc')}</p>
                                </AnimateOnScroll>

                                <AnimateOnScroll triggerClass="fadeIn" className="block-cta">
                                    <Link href="/about" className="button">
                                        <span>{tGeneralButton('explore')}</span>
                                    </Link>
                                </AnimateOnScroll>
                            </div>
                        </div>

                        <div className="about-stats-container">
                            <div className="about-stat-card">
                                <div className="stat">
                                    <span className="size-h1">
                                        {homepageSettings.about?.projectsCount || 0}
                                    </span>
                                    <span className="size-h4">
                                        {tHomepage('about-cta.about-project')}
                                    </span>
                                </div>

                                <div className="stat-desc">
                                    <p>{tHomepage('about-cta.about-projects-desc')}</p>
                                </div>
                            </div>

                            <div className="about-stat-card">
                                <div className="stat">
                                    <span className="size-h1">
                                        {homepageSettings.about?.partnersCount || 0}
                                    </span>
                                    <span className="size-h4">
                                        {tHomepage('about-cta.about-partner')}
                                    </span>
                                </div>

                                <div className="stat-desc">
                                    <p>{tHomepage('about-cta.about-partners-desc')}</p>
                                </div>
                            </div>

                            <div className="about-stat-card">
                                <div className="stat">
                                    <span className="size-h1">2025</span>
                                    <span className="size-h4">
                                        {tHomepage('about-cta.about-est')}
                                    </span>
                                </div>

                                <div className="stat-desc">
                                    <p>{tHomepage('about-cta.about-est-desc')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="block-content-start hidden-device-md">
                            <div className="block-body">
                                <AnimateOnScroll triggerClass="fadeIn" className="block-desc">
                                    <p>{tHomepage('about-cta.about-desc')}</p>
                                </AnimateOnScroll>

                                <AnimateOnScroll triggerClass="fadeIn" className="block-cta">
                                    <Link href="/about" className="button">
                                        <span>{tGeneralButton('explore')}</span>
                                    </Link>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WORK */}
            <section data-section="featured-works">
                <div className="sc-inner pc-t-150 pc-b-150 mb-t-100 mb-b-100">
                    <div className="container">
                        <div className="sc-header">
                            <div className="sc-ttl">
                                <h2 className="size-h0">WORK</h2>
                            </div>

                            <div className="work-time-range">
                                <span>{tHomepage('featured-works.selected-works')}</span>
                                <span>{getYearRange()}</span>
                            </div>
                        </div>

                        <HorizontalMarquee speed={50} direction="left">
                            <div className="work-type-marquee">
                                {workTypes.map((workType) => (
                                    <div key={workType.id} className="work-type-item">
                                        <span>{workType.name}</span>
                                        <span>·</span>
                                    </div>
                                ))}
                            </div>
                        </HorizontalMarquee>

                        <FancyboxGallery
                            className="work-collection-grid"
                            fancyboxClass="work-fancybox"
                        >
                            {featuredWorks.map((work) => (
                                <WorkGridItem key={work.id} work={work} />
                            ))}
                        </FancyboxGallery>

                        <div className="sc-cta">
                            <p className="size-h3">Explore our creative track record</p>
                            <Link href="/work" className="button">
                                <span>{tGeneralButton('view-all-portfolio')}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

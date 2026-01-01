export const dynamic = 'force-dynamic'

import Link from 'next/link'

import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSiteSettings } from '@/payload/services/siteSettings'
import { Locale } from '@/i18n/routing'
import { getContactSettings } from '@/payload/services/contactSettings'

import AnimateOnScroll from '@/components/common/animate-on-scroll'
import CtaSection from '@/components/template/CtaSection'
import ContactCardObserver from '@/components/contact/ContactCardObserver'

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const tContact = await getTranslations('Contact')
    const siteSettings = await getSiteSettings(locale as Locale)

    const contactSettings = await getContactSettings()
    return (
        <main id="main" className="contact-page">
            <h1 className="visually-hidden">{tContact('h1')}</h1>

            {/* CTA */}
            <CtaSection />

            {/* CONTACT INFO */}
            <section data-section="contact-info">
                <div className="sc-inner pc-t-200 pc-b-200 mb-t-200 mb-b-200">
                    <div className="container">
                        {/* Contact Card */}
                        <AnimateOnScroll triggerClass="fadeIn" className="contact-card">
                            <div className="card-inner">
                                <div className="front">
                                    <div className="card-ttl">
                                        <h3 className="size-h1">{tContact('get-in-touch')}</h3>
                                    </div>
                                </div>
                                <div className="back">
                                    <div className="back-inner">
                                        <div className="card-desc">
                                            <p>{tContact('card-message')}</p>
                                        </div>

                                        <div className="card-contact-info">
                                            <div className="item">
                                                <div className="item-subttl">
                                                    <p className="size-h6">
                                                        {tContact('lets-talk')}
                                                    </p>
                                                </div>
                                                <div className="item-content">
                                                    <Link
                                                        target="_blank"
                                                        rel="noopener noreferrer nofollow"
                                                        href={`mailto:${siteSettings.contactInfo?.email}`}
                                                    >
                                                        {siteSettings.contactInfo?.email}
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="item-subttl">
                                                    <p className="size-h6">{tContact('or-call')}</p>
                                                </div>
                                                <div className="item-content">
                                                    <Link
                                                        target="_blank"
                                                        rel="noopener noreferrer nofollow"
                                                        href={`tel:${siteSettings.contactInfo?.phone}`}
                                                    >
                                                        {siteSettings.contactInfo?.phone}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimateOnScroll>

                        <div className="content">
                            <div className="follers-count">
                                <AnimateOnScroll triggerClass="fadeIn" className="followers">
                                    <p className="size-h1">{contactSettings.followersCount}</p>
                                </AnimateOnScroll>

                                <div className="unit">
                                    <p className="size-h2">{tContact('followers')}</p>
                                </div>
                            </div>

                            <AnimateOnScroll triggerClass="fadeIn" className="text">
                                <p className="size-h3">
                                    {tContact('desc')}
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        href={`${siteSettings.contactInfo?.facebook}`}
                                    >
                                        Facebook
                                    </Link>
                                    ,{' '}
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        href={`${siteSettings.contactInfo?.instagram}`}
                                    >
                                        Instagram
                                    </Link>
                                    ,{' '}
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        href={`${siteSettings.contactInfo?.line}`}
                                    >
                                        Line
                                    </Link>
                                    , {tContact('and')}{' '}
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        href={`${siteSettings.contactInfo?.tiktok}`}
                                    >
                                        Tiktok
                                    </Link>
                                </p>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            <ContactCardObserver />
        </main>
    )
}

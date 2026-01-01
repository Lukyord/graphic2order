import { getTranslations } from 'next-intl/server'

import { Locale } from '@/i18n/routing'
import { getSiteSettings } from '@/payload/services/siteSettings'

import RenderMedia from '../common/media'
import Link from 'next/link'
import FooterScrollUp from './FooterScrollUp'

type FooterProps = {
    locale: Locale
}

export default async function Footer({ locale }: FooterProps) {
    const tFooter = await getTranslations('Footer')
    const siteSettings = await getSiteSettings(locale)

    const infoItems = [
        {
            icon: 'ic-mail',
            label: tFooter('email'),
            value: `mailto:${siteSettings.contactInfo?.email}`,
        },
        {
            icon: 'ic-phone',
            label: tFooter('phone'),
            value: `tel:${siteSettings.contactInfo?.phone}`,
        },
        {
            icon: 'ic-facebook',
            label: tFooter('facebook'),
            value: siteSettings.contactInfo?.facebook,
        },
        {
            icon: 'ic-instagram',
            label: tFooter('instagram'),
            value: siteSettings.contactInfo?.instagram,
        },
        {
            icon: 'ic-line',
            label: tFooter('line'),
            value: siteSettings.contactInfo?.line,
        },
        {
            icon: 'ic-tiktok',
            label: tFooter('tiktok'),
            value: siteSettings.contactInfo?.tiktok,
        },
    ]

    return (
        <footer id="footer">
            <div className="footer-nav">
                <div className="footer-logo">
                    <Link href="/" className="link-overlay">
                        &nbsp;
                    </Link>
                    <RenderMedia
                        src="/media/logo-full-hrz-white.webp"
                        alt="Graphic2Order Logo"
                        priority
                    />
                </div>

                <div className="footer-info">
                    <div className="info-header">
                        <div className="info-ttl">
                            <h3 className="size-h3">{tFooter('contact-us')}</h3>
                        </div>

                        <div className="info-address">
                            <address>{tFooter('address')}</address>
                        </div>
                    </div>

                    <div className="info-grid">
                        {infoItems.map((item) => (
                            <div className="info-item hover-color" key={item.label}>
                                <Link
                                    href={item.value}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="link-overlay"
                                >
                                    &nbsp;
                                </Link>

                                <div className="info-item-icon">
                                    <i className={`ic ${item.icon} size-icon-sm`}></i>
                                </div>

                                <div className="item-label">
                                    <span className="label-text">{item.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="footer-copy">
                <p className="size-small">Graphic2Order ©{new Date().getFullYear()}</p>
            </div>

            <FooterScrollUp />
        </footer>
    )
}

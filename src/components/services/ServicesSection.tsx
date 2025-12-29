import { Locale } from '@/i18n/routing'

import { getSiteSettings } from '@/payload/services/siteSettings'

import ServiceCounter from './ServiceCounter'
import AnimateOnScroll from '../common/animate-on-scroll'

type ServicesSectionProps = {
    locale: Locale
}

export default async function ServicesSection({ locale }: ServicesSectionProps) {
    const siteSettings = await getSiteSettings(locale)
    const servicesCount = siteSettings.services?.length || 0

    return (
        <section data-section="services">
            <div className="sc-inner pc-t-150 mb-t-100">
                <div className="container">
                    <div className="sc-header">
                        <AnimateOnScroll triggerClass="fadeIn" className="sc-ttl">
                            <h2 className="size-h0">SERVICES</h2>
                        </AnimateOnScroll>

                        <ul className="services-list">
                            {siteSettings.services?.map((service, index) => (
                                <li key={service.id}>
                                    <AnimateOnScroll triggerClass="fadeIn" className="list-item">
                                        <span className="count">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <h3>{service.title}</h3>
                                    </AnimateOnScroll>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="content">
                        <ServiceCounter totalServices={servicesCount} />

                        <div className="service-items-container">
                            {siteSettings.services?.map((service) => (
                                <AnimateOnScroll
                                    triggerClass="fadeIn"
                                    key={service.id}
                                    className="service-item"
                                >
                                    <div className="item-ttl">
                                        <h3>{service.title}</h3>
                                    </div>
                                    <div className="item-desc">
                                        <p>{service.description}</p>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

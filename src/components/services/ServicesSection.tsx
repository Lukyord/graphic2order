import { Locale } from '@/i18n/routing'
import { getSiteSettings } from '@/payload/services/siteSettings'

type ServicesSectionProps = {
    locale: Locale
}

export default async function ServicesSection({ locale }: ServicesSectionProps) {
    const siteSettings = await getSiteSettings(locale)

    return (
        <section data-section="services">
            <div className="sc-inner pc-t-150 pc-b-150 mb-t-100 mb-b-100">
                <div className="container">
                    <div className="sc-header">
                        <div className="sc-ttl">
                            <h2 className="size-h0">SERVICES</h2>
                        </div>

                        <ul className="services-list"></ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

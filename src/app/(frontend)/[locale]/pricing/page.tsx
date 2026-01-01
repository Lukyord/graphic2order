import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getPackages } from '@/payload/services/packages'
import { getPricingSettings } from '@/payload/services/pricingSetting'
import { Locale } from '@/i18n/routing'

export const dynamic = 'force-dynamic'

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const tPricing = await getTranslations('Pricing')

    const pricingSettings = await getPricingSettings(locale as Locale)
    const packages = await getPackages(locale as Locale)

    return (
        <main id="main" className="pricing-page">
            <h1 className="visually-hidden">{tPricing('h1')}</h1>
        </main>
    )
}

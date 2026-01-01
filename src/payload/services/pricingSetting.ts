import { getPayloadClient } from './payload'
import type { Locale } from '@/i18n/routing'

export async function getPricingSettings(locale: Locale = 'en') {
    const client = await getPayloadClient()
    const settings = await client.findGlobal({
        slug: 'pricing-settings',
        locale,
    })

    return settings
}

import { getPayloadClient } from './payload'
import type { Locale } from '@/i18n/routing'

export async function getSiteSettings(locale: Locale = 'en') {
    const client = await getPayloadClient()
    const siteSettings = await client.findGlobal({
        slug: 'site-settings',
        locale,
    })
    return siteSettings
}

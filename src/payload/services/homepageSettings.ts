import { getPayloadClient } from './payload'
import type { Locale } from '@/i18n/routing'

export async function getHomepageSettings(locale: Locale = 'en') {
    const client = await getPayloadClient()
    const settings = await client.findGlobal({
        slug: 'homepage-settings',
        locale,
    })

    return settings
}

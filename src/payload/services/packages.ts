import { getPayloadClient } from './payload'
import type { Locale } from '@/i18n/routing'

export async function getPackages(locale: Locale = 'en') {
    const client = await getPayloadClient()
    const packages = await client.find({
        collection: 'package',
        sort: 'code',
        locale,
    })

    return packages.docs
}

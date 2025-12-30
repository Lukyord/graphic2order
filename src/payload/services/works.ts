import { getPayloadClient } from './payload'
import type { Locale } from '@/i18n/routing'

export async function getWorks(locale: Locale = 'en') {
    const client = await getPayloadClient()
    const works = await client.find({
        collection: 'work',
        sort: '-date',
        locale,
    })

    return works.docs
}

import { getPayloadClient } from './payload'

export async function getWorks() {
    const client = await getPayloadClient()
    const works = await client.find({
        collection: 'work',
        sort: '-date',
    })

    return works.docs
}

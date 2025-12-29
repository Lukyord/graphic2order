import { getPayloadClient } from './payload'

export async function getWorkTypes() {
    const client = await getPayloadClient()
    const workTypes = await client.find({
        collection: 'work-type',
    })

    return workTypes.docs
}

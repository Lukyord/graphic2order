import { getPayloadClient } from './payload'

export async function getContactSettings() {
    const client = await getPayloadClient()
    const contactSettings = await client.findGlobal({
        slug: 'contact-settings',
    })
    return contactSettings
}

import { getPayloadClient } from './payload'

export async function getHomepageSettings() {
    const client = await getPayloadClient()
    const settings = await client.findGlobal({
        slug: 'homepage-settings',
    })

    return settings
}

// storage-adapter-import-placeholder
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite' // database-adapter-import
import { lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, Locale } from 'payload'
import type { Locale as DefinedLocale } from '@/i18n/routing'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { OverviewField } from '@payloadcms/plugin-seo/fields'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'

import { ContactSettings } from './payload/globals/ContactSetting'
import { WorkSettings } from './payload/globals/WorkSetting'
import { AboutSettings } from './payload/globals/AboutSetting'
import { ServiceSettings } from './payload/globals/ServiceSetting'
import { PricingSettings } from './payload/globals/PricingSetting'
import { HomepageSettings } from './payload/globals/HomepageSetting'
import { SiteSettings } from './payload/globals/SiteSetting'

import { WorkTypes } from './payload/collections/WorkTypes'
import { Works } from './payload/collections/Works'
import { Packages } from './payload/collections/Packages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cloudflareRemoteBindings = process.env.NODE_ENV === 'production'
const cloudflare =
    process.argv.find((value) => value.match(/^(generate|migrate):?/)) || !cloudflareRemoteBindings
        ? await getCloudflareContextFromWrangler()
        : await getCloudflareContext({ async: true })

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        meta: {
            titleSuffix: ' | Admin',
        },
        components: {
            graphics: {
                Icon: {
                    path: '@/payload/components/PayloadIcon',
                },
                Logo: {
                    path: '@/payload/components/PayloadLogo',
                },
            },
        },
    },
    localization: {
        locales: [
            {
                code: 'en',
                label: 'English',
            },
            {
                code: 'th',
                label: 'Thai',
            },
        ] as (Locale & {
            code: DefinedLocale
        })[],
        defaultLocale: 'en',
    },
    collections: [Users, Media, WorkTypes, Works, Packages],
    globals: [
        SiteSettings,
        HomepageSettings,
        ContactSettings,
        WorkSettings,
        AboutSettings,
        ServiceSettings,
        PricingSettings,
    ],
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            LinkFeature({
                fields: ({ defaultFields }) => [
                    ...defaultFields,
                    {
                        name: 'rel',
                        label: 'Rel Attribute',
                        type: 'select',
                        hasMany: true,
                        options: ['noopener', 'noreferrer', 'nofollow'],
                        admin: {
                            description:
                                'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
                        },
                    },
                ],
            }),
        ],
    }),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    // database-adapter-config-start
    db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
    // database-adapter-config-end
    plugins: [
        // storage-adapter-placeholder
        r2Storage({
            bucket: cloudflare.env.R2,
            collections: { media: true },
        }),
        seoPlugin({
            globals: [
                'homepage-settings',
                'work-settings',
                'contact-settings',
                'about-settings',
                'pricing-settings',
                'service-settings',
            ],
            uploadsCollection: 'media',
            tabbedUI: true,
            fields: ({ defaultFields }) => [
                ...defaultFields,
                OverviewField({
                    imagePath: 'meta.image',
                }),
            ],
        }),
    ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
    return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
        ({ getPlatformProxy }) =>
            getPlatformProxy({
                environment: process.env.CLOUDFLARE_ENV,
                experimental: { remoteBindings: cloudflareRemoteBindings },
            } satisfies GetPlatformProxyOptions),
    )
}

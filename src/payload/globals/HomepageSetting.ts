import type { GlobalConfig } from 'payload'

export const HomepageSettings: GlobalConfig = {
    slug: 'homepage-settings',
    label: 'Homepage Settings',
    fields: [
        {
            name: 'about',
            label: 'About',
            type: 'group',
            fields: [
                {
                    name: 'projectsCount',
                    label: 'Projects Count',
                    type: 'text',
                    admin: {
                        description: 'The number of projects to display on the homepage',
                    },
                },
                {
                    name: 'partnersCount',
                    label: 'Partners Count',
                    type: 'text',
                    admin: {
                        description: 'The number of partners to display on the homepage',
                    },
                },
            ],
        },
        {
            name: 'featuredWorks',
            label: 'Featured Works',
            type: 'relationship',
            relationTo: 'work',
            hasMany: true,
            admin: {
                description: 'The works to display on the homepage',
            },
        },
    ],
}

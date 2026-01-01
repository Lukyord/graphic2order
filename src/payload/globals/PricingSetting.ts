import type { GlobalConfig } from 'payload'

export const PricingSettings: GlobalConfig = {
    slug: 'pricing-settings',
    label: 'Pricing Settings',
    fields: [
        {
            name: 'faq',
            label: 'FAQ',
            type: 'array',
            localized: true,
            fields: [
                {
                    name: 'question',
                    label: 'Question',
                    type: 'text',
                },
                {
                    name: 'answer',
                    label: 'Answer',
                    type: 'text',
                },
            ],
        },
    ],
}

import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  fields: [
    {
      name: 'contactInfo',
      label: 'Contact Info',
      type: 'group',
      fields: [
        {
          name: 'address',
          label: 'Address',
          type: 'text',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          admin: {
            description: 'Email in the format of example@example.com',
          },
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          admin: {
            description: 'Phone number in the format of +66800000000',
          },
        },
        {
          name: 'facebook',
          label: 'Facebook',
          type: 'text',
          admin: {
            description: 'Url to facebook page',
          },
        },
        {
          name: 'instagram',
          label: 'Instagram',
          type: 'text',
          admin: {
            description: 'Url to instagram page',
          },
        },
        {
          name: 'line',
          label: 'Line',
          type: 'text',
          admin: {
            description: 'Url to line account',
          },
        },
        {
          name: 'tiktok',
          label: 'Tiktok',
          type: 'text',
          admin: {
            description: 'Url to tiktok account',
          },
        },
      ],
    },
    {
      name: 'services',
      label: 'Services',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
        },
      ],
    },
  ],
}

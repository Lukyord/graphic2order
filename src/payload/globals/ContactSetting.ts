import type { GlobalConfig } from 'payload'

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: 'Contact Settings',
  fields: [
    {
      name: 'followersCount',
      label: 'Followers Count',
      type: 'text',
      admin: {
        description: 'The number of followers to display on the contact page',
      },
    },
  ],
}

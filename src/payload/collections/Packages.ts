import type { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'package',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'code', 'price', 'updatedAt', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      admin: {
        description: 'The title of the package',
      },
    },
    {
      name: 'code',
      label: 'Code',
      type: 'text',
      admin: {
        description: 'The code of the package',
      },
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      admin: {
        description: 'Price in THB',
      },
    },
    {
      name: 'description',
      label: 'Description',
      localized: true,
      type: 'text',
      admin: {
        description: 'Short description of the package',
      },
    },
    {
      name: 'summary',
      label: 'Summary',
      localized: true,
      type: 'array',
      fields: [
        {
          name: 'description',
          label: 'Description',
          type: 'text',
        },
      ],
      admin: {
        description: 'Summary of the package in bullet points',
      },
    },
    {
      name: 'details',
      label: 'Details',
      localized: true,
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'content',
          label: 'Content',
          type: 'richText',
        },
      ],
      admin: {
        description: 'Details of the package',
      },
    },
  ],
}

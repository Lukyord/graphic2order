import type { CollectionConfig } from 'payload'

export const Works: CollectionConfig = {
  slug: 'work',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'mainMedia', 'workTypes', 'updatedAt', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      localized: true,
      admin: {
        description: 'The title of the work',
      },
    },
    {
      name: 'orientation',
      label: 'Orientation',
      type: 'select',
      options: ['Horizontal', 'Square'],
      defaultValue: 'Square',
      admin: {
        description: 'The orientation of the work',
      },
    },
    {
      name: 'workTypes',
      label: 'Work Types',
      type: 'relationship',
      relationTo: 'work-type',
      hasMany: true,
      admin: {
        description: 'The work types of the work',
      },
    },
    {
      name: 'industry',
      label: 'Industry',
      type: 'text',
      localized: true,
      hasMany: true,
      admin: {
        description: 'The industry of the work',
      },
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      admin: {
        description: 'Date when this work was published',
      },
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Information about the work',
      },
    },
    {
      name: 'mainMedia',
      label: 'Main Media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'The main media of the work',
      },
    },
    {
      name: 'gallery',
      label: 'Gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'The gallery of the work',
      },
    },
  ],
}

import type { CollectionConfig } from 'payload'
import { generateSlug } from './collection-util'

export const WorkTypes: CollectionConfig = {
  slug: 'work-type',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate slug from name whenever name exists
        if (data?.name) {
          data.slug = generateSlug(data.name)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      admin: {
        description: 'The name of the work type (will be displayed in the website)',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated on save from the name field',
      },
    },
  ],
}

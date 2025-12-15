import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
    slug: 'services',
    admin: {
        useAsTitle: 'title',
        group: 'Content',
        description: 'Services offered',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'icon',
            type: 'text',
            admin: {
                description: 'Lucide icon name (e.g., "Code", "Brain", "Rocket")',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'features',
            type: 'array',
            fields: [
                { name: 'feature', type: 'text' },
            ],
        },
        {
            name: 'pricing',
            type: 'group',
            fields: [
                { name: 'startingAt', type: 'number' },
                { name: 'unit', type: 'text', defaultValue: 'project' },
            ],
        },
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}

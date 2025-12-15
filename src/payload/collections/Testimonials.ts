import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
    slug: 'testimonials',
    admin: {
        useAsTitle: 'clientName',
        group: 'Content',
        description: 'Client testimonials',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'clientName',
            type: 'text',
            required: true,
        },
        {
            name: 'clientRole',
            type: 'text',
            required: true,
        },
        {
            name: 'company',
            type: 'text',
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'quote',
            type: 'textarea',
            required: true,
        },
        {
            name: 'rating',
            type: 'number',
            min: 1,
            max: 5,
            defaultValue: 5,
        },
        {
            name: 'project',
            type: 'relationship',
            relationTo: 'projects',
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}

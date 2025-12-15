import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
    slug: 'team',
    admin: {
        useAsTitle: 'name',
        group: 'Content',
        description: 'Team members',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'role',
            type: 'text',
            required: true,
        },
        {
            name: 'bio',
            type: 'textarea',
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'email',
            type: 'email',
        },
        {
            name: 'social',
            type: 'group',
            fields: [
                { name: 'twitter', type: 'text' },
                { name: 'linkedin', type: 'text' },
                { name: 'github', type: 'text' },
                { name: 'website', type: 'text' },
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

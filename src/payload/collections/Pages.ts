import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
        group: 'Content',
        description: 'Dynamic pages',
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
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'layout',
            type: 'select',
            defaultValue: 'default',
            options: [
                { label: 'Default', value: 'default' },
                { label: 'Full Width', value: 'full-width' },
                { label: 'Landing Page', value: 'landing' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'meta',
            type: 'group',
            fields: [
                { name: 'title', type: 'text', label: 'Meta Title' },
                { name: 'description', type: 'textarea', label: 'Meta Description', maxLength: 160 },
            ],
        },
    ],
}

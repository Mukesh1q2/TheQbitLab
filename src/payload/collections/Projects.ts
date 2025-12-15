import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'name',
        group: 'Content',
        description: 'Portfolio projects',
        defaultColumns: ['name', 'category', 'featured', 'status'],
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
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
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
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'gallery',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            options: [
                { label: 'Web Application', value: 'web-app' },
                { label: 'Mobile App', value: 'mobile' },
                { label: 'AI/ML Project', value: 'ai-ml' },
                { label: 'API/Backend', value: 'api' },
                { label: 'E-commerce', value: 'ecommerce' },
                { label: 'SaaS', value: 'saas' },
            ],
        },
        {
            name: 'technologies',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'tech',
                    type: 'text',
                },
            ],
        },
        {
            name: 'liveUrl',
            type: 'text',
            label: 'Live URL',
        },
        {
            name: 'githubUrl',
            type: 'text',
            label: 'GitHub URL',
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'completedAt',
            type: 'date',
            label: 'Completion Date',
            admin: {
                position: 'sidebar',
            },
        },
    ],
}

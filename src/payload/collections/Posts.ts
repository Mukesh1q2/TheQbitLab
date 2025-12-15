import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
        group: 'Content',
        description: 'Blog posts and articles',
        defaultColumns: ['title', 'category', 'status', 'publishedAt'],
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
            name: 'excerpt',
            type: 'textarea',
            required: true,
            maxLength: 300,
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            options: [
                { label: 'AI & Machine Learning', value: 'ai-ml' },
                { label: 'Web Development', value: 'web-dev' },
                { label: 'DevOps', value: 'devops' },
                { label: 'Tutorials', value: 'tutorials' },
                { label: 'News', value: 'news' },
                { label: 'Case Studies', value: 'case-studies' },
            ],
        },
        {
            name: 'tags',
            type: 'array',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                },
            ],
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'team',
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'meta',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    label: 'Meta Title',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Meta Description',
                    maxLength: 160,
                },
            ],
        },
    ],
}

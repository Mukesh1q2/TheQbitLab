import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Pages } from './collections/Pages'
import { Team } from './collections/Team'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        meta: {
            titleSuffix: '- QbitLab CMS',
        },
        components: {
            // Custom admin components can be added here
        },
    },

    routes: {
        admin: '/cms',
    },

    editor: lexicalEditor({}),

    collections: [
        Users,
        Media,
        Posts,
        Projects,
        Pages,
        Team,
        Services,
        Testimonials,
    ],

    db: mongooseAdapter({
        url: process.env.MONGODB_URI || 'mongodb://localhost:27017/qbitlab',
    }),

    secret: process.env.PAYLOAD_SECRET || 'your-super-secret-key-change-in-production',

    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },

    graphQL: {
        schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
    },

    upload: {
        limits: {
            fileSize: 10000000, // 10MB
        },
    },

    cors: [
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.NEXT_PUBLIC_SITE_URL || '',
    ].filter(Boolean),

    csrf: [
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.NEXT_PUBLIC_SITE_URL || '',
    ].filter(Boolean),
})

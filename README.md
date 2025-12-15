# TheQbitlabs - Advanced Portfolio Platform

A cutting-edge portfolio platform built with the most advanced technologies, featuring 5 premium themes, interactive 3D visualizations, AI integration, and a complete e-commerce marketplace.

## 🚀 Features

### 5 Premium Themes
- **Quantum Neural**: AI-focused with neural network animations and particle systems
- **Minimalist Pro**: Clean Swiss design with kinetic typography
- **Terminal Hacker**: CRT monitor effects with phosphor glow
- **Neumorphic Glass**: Modern 3D with soft tactile elements
- **Retro Vaporwave**: 80s/90s aesthetic with holographic effects

### Advanced Home Page
- Interactive 3D hero section with multiple variants
- Real-time statistics counter
- Skill constellation with interactive nodes
- Featured work showcase with filtering
- Capabilities matrix with detailed modals
- Tech stack visualizer with 3D orbital system
- Client testimonials with video support
- Live activity feed integration
- Interactive timeline of achievements

### Portfolio System
- Advanced filtering by category, tech stack, year
- Multiple view modes (grid, list, timeline, map)
- Interactive project cards with video previews
- Detailed case studies with technical deep dives
- Project analytics and performance metrics

### Marketplace
- E-commerce platform for selling digital products
- Advanced product discovery with recommendations
- Multi-license support (Single, Multiple, Extended)
- Secure checkout with Stripe integration
- Review and rating system
- Protected download system

### Services & Booking
- Professional service listings
- Smart booking system with calendar integration
- Multi-step inquiry forms with file uploads
- Project estimator tool
- Automated email confirmations

### LLM Playground
- Advanced chat interface with streaming
- Multiple AI modes (Code Reviewer, UX Mentor, etc.)
- Conversation management and export
- Prompt engineering tools
- Model comparison features

### Avadhan Training Module
- Multi-threaded attention visualization
- Interactive 3D interface options
- Real-time reasoning display
- Session management and export

### Admin Panel
- Complete CMS for content management
- Order and customer management
- Analytics dashboard with real-time metrics
- Inventory tracking and file management
- Review moderation tools

### Advanced Features
- Progressive Web App (PWA) support
- Real-time analytics and heatmaps
- SEO optimization with structured data
- Accessibility compliance (WCAG 2.1 AA)
- Multi-language support framework
- Advanced security measures
- Performance optimization (95+ Lighthouse score)

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Three.js + React Three Fiber** - 3D graphics
- **GSAP** - High-performance animations

### Backend & Database
- **Next.js API Routes** - Serverless backend
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions

### Authentication & Payments
- **NextAuth.js** - Authentication system
- **Stripe** - Payment processing
- **AWS S3** - File storage and CDN

### AI Integration
- **OpenAI API** - GPT models integration
- **Anthropic Claude** - Alternative AI model
- **LangChain** - LLM application framework

### Development Tools
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Storybook** - Component development
- **ESLint + Prettier** - Code quality
- **Husky** - Git hooks

### Performance & Monitoring
- **Vercel** - Deployment platform
- **Sentry** - Error tracking
- **Google Analytics** - Analytics
- **Web Vitals** - Performance monitoring

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles and themes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── portfolio/         # Portfolio pages
│   ├── marketplace/       # E-commerce pages
│   ├── services/          # Services pages
│   ├── playground/        # LLM playground
│   ├── avadhan/           # Training module
│   └── admin/             # Admin panel
├── components/            # Reusable components
│   ├── home/             # Home page components
│   ├── portfolio/        # Portfolio components
│   ├── marketplace/      # Marketplace components
│   ├── ui/               # Base UI components
│   └── providers.tsx     # App providers
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── store/                # State management
├── types/                # TypeScript definitions
└── config/               # Configuration files
```

## 🎨 Theme System

Each theme includes:
- Unique color palettes and gradients
- Custom animations and micro-interactions
- Specialized typography and iconography
- Theme-specific component variants
- Smooth transitions between themes

## 🔧 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/theqbitlabs.git
cd theqbitlabs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/theqbitlabs"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GITHUB_CLIENT_ID="your-github-client-id"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# AI APIs
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."

# AWS S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="your-bucket-name"
```

5. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

6. Seed the database (optional):
```bash
npx prisma db seed
```

7. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Testing

Run the test suite:
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Component tests
npm run storybook
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm start
```

## 📊 Performance Targets

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 200KB (initial load)

## 🔒 Security Features

- HTTPS everywhere
- CSRF protection
- XSS prevention
- SQL injection prevention (via Prisma)
- Rate limiting on API routes
- Secure headers (CSP, HSTS, X-Frame-Options)
- Input sanitization
- Protected download tokens

## 🎯 Key Differentiators

1. **5 Premium Themes** - Unique visual experiences
2. **3D Interactive Elements** - Cutting-edge web graphics
3. **AI Integration** - Working LLM playground
4. **E-commerce Platform** - Sell digital products
5. **Avadhan Module** - Multi-threaded attention visualization
6. **Performance Excellence** - Optimized for speed
7. **Accessibility First** - WCAG 2.1 AA compliant
8. **Enterprise Security** - Production-ready security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- Three.js community for 3D graphics
- OpenAI for AI capabilities
- All contributors and supporters

---

Built with ❤️ by TheQbitlabs
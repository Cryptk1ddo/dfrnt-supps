# 🧬 DFRNT E-Commerce

A modern, high-performance e-commerce platform for biohacking supplements, blue-light blocking glasses, and performance optimization products.

## 🚀 Tech Stack

- **Framework:** Next.js 14+ (App Router) + TypeScript
- **Styling:** TailwindCSS + CVA (Class Variance Authority)
- **Animations:** GSAP with custom hooks
- **State Management:** Zustand (UI state) + React Query (server data)
- **CMS:** Strapi (products, content)
- **Database/Auth:** Supabase (PostgreSQL + Authentication)
- **Payment:** Stripe
- **Deployment:** Vercel
- **Validation:** Zod
- **Analytics:** PostHog / Plausible
- **Monitoring:** Sentry

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── products/          # Product listing and detail pages
│   └── checkout/          # Checkout flow
├── components/            # Shared UI components
│   ├── ui/               # Base components (Button, Card, Input, etc.)
│   └── layout/           # Layout components (Header, Footer)
├── domains/              # Domain-organized business logic
│   ├── cart/            # Cart store and components
│   ├── catalog/         # Product catalog components
│   └── checkout/        # Checkout logic
├── hooks/               # Custom React hooks (GSAP, etc.)
├── lib/                 # Utilities and API clients
│   ├── strapi/         # Strapi CMS client
│   ├── supabase/       # Supabase client
│   └── utils.ts        # Helper functions
└── types/              # TypeScript type definitions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- (Optional) Supabase account
- (Optional) Strapi CMS instance
- (Optional) Stripe account

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Copy the example env file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

For development, the app uses mock data by default, so you can skip Supabase/Strapi setup initially.

3. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🎨 Key Features

### Products
- 8 pre-configured products including supplement stacks and blue-light glasses
- Product filtering by category
- Detailed product pages with images, benefits, and ingredients
- Mock data for development (no CMS required initially)

### Shopping Cart
- Persistent cart with Zustand
- Real-time cart updates
- Sliding cart sidebar with GSAP animations
- Subtotal, tax, and shipping calculations

### UI Components
- Fully typed components with CVA variants
- Responsive design with Tailwind CSS
- GSAP animations for smooth interactions
- Accessible and semantic HTML

### Animations
- Custom GSAP hooks (`useGsapFadeIn`, `useGsapScale`, `useGsapSlide`)
- Page transitions and micro-interactions
- Smooth cart and modal animations

## 🔧 Development

### Mock Data vs. Real CMS

The app uses mock data by default in development. To switch to a real Strapi CMS:

1. Set up a Strapi instance
2. Configure `NEXT_PUBLIC_STRAPI_URL` in `.env.local`
3. Create the product content type in Strapi matching the schema in `src/types/index.ts`

### Type Safety

All components and functions are fully typed with TypeScript. Zod schemas validate data at runtime.

### Code Quality

```bash
npm run lint        # Run ESLint
npm run type-check  # Type checking
```

## 🎯 Product Categories

1. **Supplement Stacks**
   - Neuro Focus Stack
   - Energy Optimization Stack
   - Sleep & Recovery Stack
   - Immunity & Resilience Stack
   - Gut Health Stack

2. **Blue-Light Blocking Glasses**
   - Pro Edition (Premium)
   - Classic Edition (Affordable)

3. **Testing & Wearables**
   - Performance Testing Kit

## 📦 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
```

The app is optimized for Vercel with automatic deployments from Git.

### Environment Variables for Production

Ensure these are set in your production environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRAPI_URL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## 🧠 Copilot Context

This project uses a **custom Copilot configuration** to guide AI-generated code toward DFRNT conventions.

**Architecture principles:**
- Domain-organized code structure
- Typed API clients for all external services
- Server components for static content, client components for interactivity
- React Query for server data, Zustand for UI state
- Tailwind utility-first with CVA for variants
- GSAP for animations via custom hooks

**Copilot config:** `.copilot/rules.yaml`

## 📄 License

Proprietary - DFRNT © 2025

## 🤝 Contributing

This is a private project. For questions or access, contact the development team.

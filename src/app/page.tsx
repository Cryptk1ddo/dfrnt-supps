'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Shield, TrendingUp, Package } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useGsapFadeIn } from '@/hooks/useGsap'

const features = [
  {
    name: 'Science-Backed',
    description: 'Every product is formulated based on peer-reviewed research and clinical studies.',
    icon: Shield,
  },
  {
    name: 'Peak Performance',
    description: 'Optimize your cognitive function, energy, and recovery for maximum output.',
    icon: Zap,
  },
  {
    name: 'Transparent Sourcing',
    description: 'We disclose all ingredients, dosages, and sources. No proprietary blends.',
    icon: TrendingUp,
  },
  {
    name: 'Fast Shipping',
    description: 'Free shipping on orders over $75. Get your products within 2-3 business days.',
    icon: Package,
  },
]

const productCategories = [
  {
    name: 'Cognitive Enhancement Stack',
    description: 'Premium nootropics engineered for peak mental performance and clarity',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80&fit=crop&auto=format',
    href: '/products?category=cognitive',
    badge: 'Best Seller',
    stats: '4.9★ · 2,100+ Reviews',
  },
  {
    name: 'Blue-Light Defense System',
    description: 'Italian-crafted frames with 99% blue-light blocking for optimal circadian rhythm',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=80&fit=crop&auto=format',
    href: '/products?category=blue-light-glasses',
    badge: 'Premium',
    stats: '4.8★ · 1,800+ Reviews',
  },
  {
    name: 'Recovery & Sleep Stack',
    description: 'Science-backed formulations for deep recovery and restorative sleep cycles',
    image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=1200&q=80&fit=crop&auto=format',
    href: '/products?category=recovery',
    badge: 'New',
    stats: '5.0★ · 890+ Reviews',
  },
  {
    name: 'Energy & Performance',
    description: 'Clean, sustained energy without jitters or crashes—powered by science',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&fit=crop&auto=format',
    href: '/products?category=energy',
    badge: 'Popular',
    stats: '4.9★ · 1,500+ Reviews',
  },
  {
    name: 'Stress & Adaptogen Stack',
    description: 'Pharmaceutical-grade adaptogens to optimize cortisol and stress resilience',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80&fit=crop&auto=format',
    href: '/products?category=stress',
    badge: 'Featured',
    stats: '4.9★ · 1,200+ Reviews',
  },
  {
    name: 'Complete System Bundle',
    description: 'The full DFRNT arsenal—comprehensive optimization at 25% savings',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80&fit=crop&auto=format',
    href: '/products?category=bundles',
    badge: 'Save 25%',
    stats: '5.0★ · 650+ Reviews',
  },
]

export default function HomePage() {
  const heroRef = useGsapFadeIn({ delay: 0.2 })
  const featuresRef = useGsapFadeIn({ stagger: 0.1, delay: 0.4 })
  const categoriesRef = useGsapFadeIn({ stagger: 0.15, delay: 0.3 })

  return (
    <div>
      {/* Hero Section - Ultra Premium, Animated Gradient Mesh */}
      <section className="relative overflow-hidden bg-black min-h-[100vh] flex items-center">
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/50 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neutral-50/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Noise texture overlay for grain effect */}
        <div className="absolute inset-0 opacity-[0.015] bg-noise-pattern mix-blend-overlay pointer-events-none"></div>
        
        <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 relative z-10 w-full">
          <div
            ref={heroRef as React.RefObject<HTMLDivElement>}
            className="grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:gap-20 items-center"
          >
            {/* Left: Copy - Kinetic Typography */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              {/* Eyebrow - Premium detail */}
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50/5 backdrop-blur-sm border border-neutral-50/10 w-fit group hover:bg-neutral-50/10 transition-all duration-300">
                <Zap className="h-3.5 w-3.5 text-accent stroke-[2.5] animate-pulse" />
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-300">
                  Est. 2024 · Science-First
                </span>
              </div>

              {/* Main Headline - Staggered reveal */}
              <h1 className="mb-8 font-display text-6xl md:text-7xl lg:text-[5.5rem] xl:text-8xl font-bold leading-[0.95] tracking-tighter">
                <span className="block text-neutral-50 hover:text-accent transition-colors duration-500 cursor-default">
                  Wear the
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent animate-gradient bg-[length:200%_auto] mt-2">
                  contradiction.
                </span>
              </h1>

              {/* Subheadline - Generous spacing */}
              <p className="mb-10 text-xl lg:text-2xl text-neutral-300 leading-relaxed max-w-2xl font-light">
                Science-backed systems for <span className="text-neutral-50 font-medium">high-drive individuals</span> who refuse to blend in. 
                <span className="block mt-2 text-neutral-400 text-lg">Authority. Autonomy. Refined rebellion.</span>
              </p>

              {/* CTA Group - Elevated styling */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 mb-12">
                <Button size="lg" variant="primary" asChild className="group relative overflow-hidden shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300">
                  <Link href="/products" className="relative z-10">
                    <span className="relative z-10">Explore Collections</span>
                    <ArrowRight className="ml-2 h-5 w-5 stroke-[2] group-hover:translate-x-1 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="group border-neutral-700 hover:border-neutral-500 hover:bg-neutral-50/5 backdrop-blur-sm">
                  <Link href="/finder">
                    <Shield className="mr-2 h-5 w-5 stroke-[2] text-accent" />
                    Find Your Stack
                  </Link>
                </Button>
              </div>

              {/* Social Proof - Premium Glassmorphism Cards */}
              <div className="flex flex-wrap items-center gap-6 lg:gap-8">
                <div className="group px-6 py-4 rounded-xl bg-neutral-50/5 backdrop-blur-md border border-neutral-50/10 hover:bg-neutral-50/10 hover:border-accent/30 transition-all duration-300">
                  <p className="font-display text-4xl font-bold text-neutral-50 mb-1 group-hover:text-accent transition-colors">10K+</p>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Sovereigns</p>
                </div>
                
                <div className="group px-6 py-4 rounded-xl bg-neutral-50/5 backdrop-blur-md border border-neutral-50/10 hover:bg-neutral-50/10 hover:border-accent/30 transition-all duration-300">
                  <p className="font-display text-4xl font-bold text-neutral-50 mb-1 group-hover:text-accent transition-colors">4.9★</p>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Rated</p>
                </div>
                
                <div className="group px-6 py-4 rounded-xl bg-neutral-50/5 backdrop-blur-md border border-neutral-50/10 hover:bg-neutral-50/10 hover:border-accent/30 transition-all duration-300">
                  <p className="font-display text-4xl font-bold text-neutral-50 mb-1 group-hover:text-accent transition-colors">100%</p>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Transparent</p>
                </div>
              </div>

              {/* Trust Signals - Minimal */}
              <div className="mt-10 flex items-center gap-6 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 stroke-[2]" />
                  <span>60-Day Guarantee</span>
                </div>
                <div className="h-4 w-px bg-neutral-800"></div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 stroke-[2]" />
                  <span>Free Shipping $75+</span>
                </div>
              </div>
            </div>
            
            {/* Right: Hero Visuals - Floating 3D Product Showcase */}
            <div className="relative h-[600px] lg:h-[750px] order-1 lg:order-2">
              {/* Main product image with parallax effect */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden group">
                {/* Glow effects */}
                <div className="absolute -inset-8 bg-gradient-to-br from-accent/20 via-transparent to-accent/10 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-[100px] animate-pulse"></div>
                
                {/* Main hero image */}
                <div className="relative h-full rounded-3xl overflow-hidden border border-neutral-50/10 shadow-2xl shadow-black/50 group-hover:border-accent/30 transition-all duration-500">
                  <Image
                    src="https://i.pinimg.com/736x/fb/32/f2/fb32f286b87d2b00b010b485e56e65fd.jpg"
                    alt="DFRNT supplements and performance tools"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Floating badge - Premium detail */}
                <div className="absolute bottom-8 left-8 px-6 py-3 rounded-xl bg-black/80 backdrop-blur-xl border border-accent/30 shadow-lg shadow-accent/20 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-accent rounded-full animate-pulse"></div>
                    <p className="text-sm font-bold text-neutral-50">Limited Edition Available</p>
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 animate-float-slow"></div>
              <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-neutral-50/5 backdrop-blur-sm border border-neutral-50/10 animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured In Section - Press & Media Credibility */}
      <section className="relative bg-black py-16 lg:py-20 border-b border-neutral-800 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-accent blur-[100px]"></div>
        </div>

        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
          {/* Section label */}
          <div className="mb-12 text-center">
            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-neutral-500">
              Featured In
            </p>
          </div>

          {/* Magazine logos grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 items-center justify-items-center">
            {/* Forbes */}
            <div className="group flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300">
              <div className="text-neutral-400 group-hover:text-neutral-50 transition-colors duration-300">
                <svg className="h-8 w-auto" viewBox="0 0 120 30" fill="currentColor">
                  <text x="0" y="22" fontFamily="serif" fontSize="24" fontWeight="700" letterSpacing="-0.5">FORBES</text>
                </svg>
              </div>
            </div>

            {/* GQ */}
            <div className="group flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300">
              <div className="text-neutral-400 group-hover:text-neutral-50 transition-colors duration-300">
                <svg className="h-10 w-auto" viewBox="0 0 60 30" fill="currentColor">
                  <text x="0" y="24" fontFamily="serif" fontSize="28" fontWeight="900" letterSpacing="2">GQ</text>
                </svg>
              </div>
            </div>

            {/* Wired */}
            <div className="group flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300">
              <div className="text-neutral-400 group-hover:text-neutral-50 transition-colors duration-300">
                <svg className="h-8 w-auto" viewBox="0 0 100 30" fill="currentColor">
                  <text x="0" y="22" fontFamily="sans-serif" fontSize="20" fontWeight="700" letterSpacing="1">WIRED</text>
                </svg>
              </div>
            </div>

            {/* Vogue */}
            <div className="group flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300">
              <div className="text-neutral-400 group-hover:text-neutral-50 transition-colors duration-300">
                <svg className="h-8 w-auto" viewBox="0 0 110 30" fill="currentColor">
                  <text x="0" y="22" fontFamily="serif" fontSize="22" fontWeight="400" fontStyle="italic" letterSpacing="2">VOGUE</text>
                </svg>
              </div>
            </div>

            {/* Men's Health */}
            <div className="group flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300">
              <div className="text-neutral-400 group-hover:text-neutral-50 transition-colors duration-300">
                <svg className="h-7 w-auto" viewBox="0 0 100 30" fill="currentColor">
                  <text x="0" y="16" fontFamily="sans-serif" fontSize="11" fontWeight="900" letterSpacing="0.5">MEN'S</text>
                  <text x="0" y="28" fontFamily="sans-serif" fontSize="11" fontWeight="900" letterSpacing="0.5">HEALTH</text>
                </svg>
              </div>
            </div>

            {/* Fast Company */}
            <div className="group flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300">
              <div className="text-neutral-400 group-hover:text-neutral-50 transition-colors duration-300">
                <svg className="h-7 w-auto" viewBox="0 0 100 30" fill="currentColor">
                  <text x="0" y="15" fontFamily="sans-serif" fontSize="10" fontWeight="700" letterSpacing="1">FAST</text>
                  <text x="0" y="27" fontFamily="sans-serif" fontSize="10" fontWeight="700" letterSpacing="1">COMPANY</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Optional: Ticker-style animation for additional logos */}
          <div className="mt-12 pt-8 border-t border-neutral-800/50">
            <div className="flex items-center justify-center gap-12 text-xs font-bold uppercase tracking-widest text-neutral-600 flex-wrap">
              <span className="hover:text-neutral-400 transition-colors">The New York Times</span>
              <span className="text-neutral-800">•</span>
              <span className="hover:text-neutral-400 transition-colors">Wall Street Journal</span>
              <span className="text-neutral-800">•</span>
              <span className="hover:text-neutral-400 transition-colors">Bloomberg</span>
              <span className="text-neutral-800">•</span>
              <span className="hover:text-neutral-400 transition-colors">TechCrunch</span>
              <span className="text-neutral-800">•</span>
              <span className="hover:text-neutral-400 transition-colors">Harvard Business Review</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Premium Glassmorphism Cards */}
      <section className="relative bg-brand-jet-graphite py-24 lg:py-32 border-y border-neutral-800 overflow-hidden">
        {/* Ambient background elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neutral-50/5 rounded-full blur-[100px]"></div>

        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
          {/* Section header */}
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50/5 backdrop-blur-sm border border-neutral-50/10">
              <Shield className="h-3.5 w-3.5 text-accent stroke-[2.5]" />
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-300">
                The DFRNT Standard
              </span>
            </div>
            <h2 className="mb-6 font-display text-4xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-tight">
              Authority. Sovereignty.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                Craft.
              </span>
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Every product is formulated with precision, backed by science, and designed for those who demand excellence.
            </p>
          </div>

          {/* Features grid */}
          <div
            ref={featuresRef as React.RefObject<HTMLDivElement>}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div 
                  key={feature.name} 
                  className="group relative p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-neutral-800 hover:border-accent/30 hover:bg-black/60 transition-all duration-500 text-center"
                >
                  {/* Icon with gradient border */}
                  <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-500">
                    <Icon className="h-9 w-9 text-accent stroke-[2] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-4 font-sans text-lg font-bold uppercase tracking-wide text-neutral-50 group-hover:text-accent transition-colors duration-300">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover glow */}
                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-accent/10 rounded-2xl"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Product Categories - Premium Cards with Floating Effects */}
      <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-accent rounded-full blur-[140px] animate-pulse"></div>
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-noise-pattern mix-blend-overlay pointer-events-none"></div>

        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
          {/* Section header */}
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50/5 backdrop-blur-sm border border-neutral-50/10">
              <Package className="h-3.5 w-3.5 text-accent stroke-[2.5]" />
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-300">
                Product Systems
              </span>
            </div>
            <h2 className="mb-6 font-display text-4xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-tight">
              Precision{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent animate-gradient bg-[length:200%_auto]">
                Engineering
              </span>
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Six meticulously crafted systems. Each targeting specific performance vectors.
              <span className="block mt-2 text-neutral-400">Modular by design. Comprehensive in synergy.</span>
            </p>
          </div>

          {/* Product cards grid */}
          <div
            ref={categoriesRef as React.RefObject<HTMLDivElement>}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {productCategories.map((category, i) => (
              <Link key={category.name} href={category.href} className="group">
                <div className="relative overflow-hidden rounded-3xl border border-neutral-800 hover:border-accent/50 transition-all duration-500 bg-brand-jet-graphite group-hover:transform group-hover:scale-[1.03] shadow-xl shadow-black/20 group-hover:shadow-accent/20">
                  {/* Image container */}
                  <div className="relative h-96 overflow-hidden">
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 z-10"></div>
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-700 z-10"></div>
                    
                    {/* Image */}
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-115 saturate-75 group-hover:saturate-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                    />

                    {/* Dynamic badge with different colors */}
                    <div className={`absolute top-6 right-6 z-20 px-4 py-2 rounded-full backdrop-blur-xl border shadow-lg ${
                      category.badge === 'Best Seller' 
                        ? 'bg-accent/90 border-accent text-neutral-50' 
                        : category.badge === 'Save 25%'
                        ? 'bg-green-500/90 border-green-400 text-neutral-50'
                        : 'bg-black/90 border-accent/30 text-accent'
                    }`}>
                      <span className="text-xs font-bold uppercase tracking-wider">{category.badge}</span>
                    </div>

                    {/* Stats overlay - Bottom Left */}
                    <div className="absolute bottom-6 left-6 z-20 px-4 py-2.5 rounded-xl bg-black/90 backdrop-blur-xl border border-neutral-800 group-hover:border-accent/30 transition-all duration-300">
                      <p className="text-xs font-bold text-neutral-300 group-hover:text-neutral-50 transition-colors">
                        {category.stats}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6 bg-gradient-to-b from-black/90 to-black">
                    <h3 className="mb-3 font-display text-xl font-bold text-neutral-50 group-hover:text-accent transition-colors duration-300 leading-tight">
                      {category.name}
                    </h3>
                    <p className="mb-5 text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                      {category.description}
                    </p>
                    
                    {/* CTA with arrow */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent group-hover:gap-3 transition-all duration-300">
                        <span>Shop Now</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
                      </div>
                      
                      {/* Decorative accent line */}
                      <div className="h-px w-12 bg-gradient-to-r from-accent/50 to-transparent group-hover:w-16 transition-all duration-300"></div>
                    </div>
                  </div>

                  {/* Enhanced glow effect on hover */}
                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl bg-accent/30 rounded-3xl"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Ultra Premium with Parallax Feel */}
      <section className="relative overflow-hidden bg-brand-jet-graphite py-32 lg:py-40 border-y border-neutral-800">
        {/* Dramatic background elements */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent rounded-full blur-[160px] animate-pulse"></div>
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-noise-pattern mix-blend-overlay pointer-events-none"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-neutral-50/5 backdrop-blur-sm border border-neutral-50/10 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="mx-auto max-w-4xl px-6 text-center relative z-10 lg:px-12">
          {/* Icon cluster */}
          <div className="mb-10 flex items-center justify-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 animate-pulse">
              <Zap className="h-7 w-7 text-accent stroke-[2]" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="mb-8 font-display text-5xl lg:text-7xl font-bold text-neutral-50 tracking-tight leading-[1.05]">
            Understated power,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent animate-gradient bg-[length:200%_auto]">
              exacted in craft.
            </span>
          </h2>

          {/* Subheadline */}
          <p className="mb-12 text-2xl lg:text-3xl text-neutral-300 leading-relaxed font-light max-w-3xl mx-auto">
            Join the DFRNT community.{' '}
            <span className="text-neutral-50 font-medium">Be different with dignity.</span>
          </p>

          {/* Stats row */}
          <div className="mb-14 flex flex-wrap justify-center gap-6 lg:gap-10">
            <div className="px-8 py-5 rounded-2xl bg-black/40 backdrop-blur-md border border-neutral-50/10 hover:border-accent/30 hover:bg-black/60 transition-all duration-300 group">
              <p className="font-display text-4xl font-bold text-neutral-50 mb-2 group-hover:text-accent transition-colors">10K+</p>
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Sovereigns</p>
            </div>
            <div className="px-8 py-5 rounded-2xl bg-black/40 backdrop-blur-md border border-neutral-50/10 hover:border-accent/30 hover:bg-black/60 transition-all duration-300 group">
              <p className="font-display text-4xl font-bold text-neutral-50 mb-2 group-hover:text-accent transition-colors">4.9★</p>
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Rated</p>
            </div>
            <div className="px-8 py-5 rounded-2xl bg-black/40 backdrop-blur-md border border-neutral-50/10 hover:border-accent/30 hover:bg-black/60 transition-all duration-300 group">
              <p className="font-display text-4xl font-bold text-neutral-50 mb-2 group-hover:text-accent transition-colors">100%</p>
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Science</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button 
              size="xl" 
              variant="primary" 
              asChild 
              className="group relative overflow-hidden min-w-[260px] shadow-xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300"
            >
              <Link href="/products">
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="ml-2 h-6 w-6 stroke-[2] group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              asChild 
              className="min-w-[260px] border-neutral-700 hover:border-accent hover:bg-neutral-50/5 backdrop-blur-sm"
            >
              <Link href="/about">
                <Shield className="mr-2 h-5 w-5 stroke-[2] text-accent" />
                The Philosophy
              </Link>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 stroke-[2]" />
              <span>60-Day Money Back</span>
            </div>
            <div className="h-4 w-px bg-neutral-800"></div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 stroke-[2]" />
              <span>Free Shipping $75+</span>
            </div>
            <div className="h-4 w-px bg-neutral-800"></div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 stroke-[2]" />
              <span>Science-Backed</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

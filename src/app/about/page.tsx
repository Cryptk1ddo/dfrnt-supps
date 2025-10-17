'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, TrendingUp, Target, Users, Sparkles, Award, Heart, Brain, Flame, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const principles = [
  {
    icon: Target,
    title: 'Authority',
    description: 'Expert, decisive, credible. We stand behind every formulation with peer-reviewed research and transparent sourcing.',
    color: 'from-accent to-accent-light',
  },
  {
    icon: Shield,
    title: 'Sovereignty',
    description: 'Understated power. Quiet confidence. Your autonomy is non-negotiable—we provide the systems, you own the results.',
    color: 'from-neutral-50 to-neutral-300',
  },
  {
    icon: Flame,
    title: 'Refined Rebellion',
    description: 'Attention-grabbing when it matters. We reject conformity without sacrificing sophistication.',
    color: 'from-accent-light to-accent-dark',
  },
  {
    icon: Sparkles,
    title: 'Craft & Materiality',
    description: 'Elevated systems and tactile details. Every product reflects obsessive attention to formulation and presentation.',
    color: 'from-neutral-300 to-neutral-50',
  },
]

const values = [
  {
    icon: Brain,
    title: 'Science-First',
    headline: 'Evidence Over Marketing',
    description: 'Every ingredient is backed by peer-reviewed research. No proprietary blends, no marketing fluff—just transparent dosages and clinical evidence.',
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    headline: 'See Everything',
    description: 'Full disclosure of all ingredients, dosages, and sourcing. We publish our formulations openly because we have nothing to hide.',
  },
  {
    icon: Award,
    title: 'Uncompromising Quality',
    headline: 'No Shortcuts',
    description: "Premium ingredients, third-party testing, pharmaceutical-grade manufacturing. If it doesn't meet our standards, it doesn't ship.",
  },
  {
    icon: Heart,
    title: 'Community First',
    headline: 'Built With You',
    description: "Your feedback shapes every product iteration. We're building this with high-performers, not for them.",
  },
]

const manifesto = [
  "You don't optimize to blend in.",
  "You don't pursue excellence to be average.",
  "You don't invest in yourself to settle for mediocrity.",
  'You are DFRNT.',
]

export default function AboutPage() {
  return (
    <div className="bg-black">
      {/* Hero Section - Cinematic Manifesto */}
      <section className="relative overflow-hidden bg-black min-h-[90vh] flex items-center">
        {/* Dramatic gradient mesh */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/60 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-noise-pattern mix-blend-overlay pointer-events-none"></div>

        <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 relative z-10 w-full">
          <div className="max-w-5xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-50/5 backdrop-blur-sm border border-neutral-50/10 group hover:bg-neutral-50/10 transition-all duration-300">
              <Sparkles className="h-4 w-4 text-accent stroke-[2.5] animate-pulse" />
              <span className="text-sm font-sans font-bold uppercase tracking-widest text-neutral-300">
                The Philosophy
              </span>
            </div>

            {/* Main headline - Massive, centered */}
            <h1 className="mb-10 font-display text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold leading-[0.95] tracking-tighter">
              <span className="block text-neutral-50">
                Wear the
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent animate-gradient bg-[length:200%_auto] mt-3">
                contradiction.
              </span>
            </h1>

            {/* Manifesto statements */}
            <div className="mb-12 space-y-3 max-w-3xl mx-auto">
              {manifesto.map((line, i) => (
                <p
                  key={i}
                  className="text-xl lg:text-2xl text-neutral-300 font-light leading-relaxed"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Subheadline */}
            <p className="mb-14 text-2xl lg:text-3xl text-neutral-50 font-display font-semibold max-w-4xl mx-auto leading-tight">
              Empower high-drive individuals to be different with dignity.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button size="lg" variant="primary" asChild className="group shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300">
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 stroke-[2] group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-neutral-700 hover:border-neutral-500 hover:bg-neutral-50/5">
                <Link href="/finder">
                  Find Your Stack
                </Link>
              </Button>
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

      {/* Core Principles - Grid */}
      <section className="relative bg-brand-jet-graphite py-24 lg:py-32 border-y border-neutral-800">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Section header */}
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="mb-6 font-display text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
              Built on Four Pillars
            </h2>
            <p className="text-lg lg:text-xl text-neutral-400 leading-relaxed">
              These principles guide every decision, every formulation, every interaction.
            </p>
          </div>

          {/* Principles grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, i) => {
              const Icon = principle.icon
              return (
                <div
                  key={i}
                  className="group relative p-8 rounded-2xl bg-black border border-neutral-800 hover:border-accent/30 transition-all duration-500 hover:transform hover:scale-105"
                >
                  {/* Icon with gradient */}
                  <div className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${principle.color} p-[2px]`}>
                    <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                      <Icon className="h-7 w-7 text-accent stroke-[2]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-4 font-display text-2xl font-bold text-neutral-50 group-hover:text-accent transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {principle.description}
                  </p>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-accent/10 rounded-2xl"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section - Asymmetric Layout */}
      <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2"></div>

        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
          <div className="grid gap-16 lg:grid-cols-[1fr,1.2fr] items-center">
            {/* Image side */}
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group">
              <div className="absolute -inset-4 bg-accent/20 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
              <div className="relative h-full rounded-3xl overflow-hidden border border-neutral-50/10 shadow-2xl shadow-black/50">
                <Image
                  src="https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=1200"
                  alt="DFRNT Philosophy"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Content side */}
            <div>
              <h2 className="mb-6 font-display text-4xl lg:text-5xl font-bold text-neutral-50 leading-tight">
                For the high-drive{' '}
                <span className="text-accent">individual.</span>
              </h2>
              <div className="space-y-6 text-lg text-neutral-300 leading-relaxed">
                <p>
                  You're 28–45, building something that matters. You're status-conscious but privately selective. 
                  You don't buy supplements—you invest in systems.
                </p>
                <p>
                  You're time-poor but refuse to compromise on quality. You demand transparency because you've 
                  been burned by marketing hype before. You want results, not promises.
                </p>
                <p className="text-neutral-50 font-semibold text-xl">
                  DFRNT was built for you.
                </p>
                <p>
                  Every product is formulated with obsessive attention to clinical evidence. Every ingredient 
                  is disclosed with complete transparency. Every claim is backed by peer-reviewed research.
                </p>
                <p className="text-neutral-400 italic border-l-2 border-accent pl-6">
                  "We don't create followers. We equip sovereigns."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Cards */}
      <section className="relative bg-brand-jet-graphite py-24 lg:py-32 border-y border-neutral-800">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Section header */}
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="mb-6 font-display text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
              Our Commitments
            </h2>
            <p className="text-lg lg:text-xl text-neutral-400 leading-relaxed">
              Non-negotiable standards that define everything we create.
            </p>
          </div>

          {/* Values grid */}
          <div className="grid gap-10 md:grid-cols-2">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <div
                  key={i}
                  className="group p-10 rounded-2xl bg-black/50 backdrop-blur-sm border border-neutral-800 hover:border-accent/30 hover:bg-black/70 transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                        <Icon className="h-7 w-7 text-accent stroke-[2]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="mb-2 text-xs font-sans font-bold uppercase tracking-widest text-accent">
                        {value.title}
                      </p>
                      <h3 className="mb-4 font-display text-2xl font-bold text-neutral-50">
                        {value.headline}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent rounded-full blur-[160px] animate-pulse"></div>
        </div>

        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon group */}
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20">
                <Users className="h-7 w-7 text-accent stroke-[2]" />
              </div>
            </div>

            <h2 className="mb-6 font-display text-4xl lg:text-6xl font-bold text-neutral-50 leading-tight">
              Join 10,000+ Sovereigns
            </h2>
            <p className="mb-12 text-xl lg:text-2xl text-neutral-300 leading-relaxed max-w-3xl mx-auto">
              Be different with dignity. Build systems that compound. Refuse to settle for average.
            </p>

            {/* Stats */}
            <div className="mb-12 flex flex-wrap justify-center gap-8 lg:gap-12">
              <div className="px-8 py-5 rounded-xl bg-neutral-50/5 backdrop-blur-md border border-neutral-50/10">
                <p className="font-display text-4xl font-bold text-neutral-50 mb-2">10K+</p>
                <p className="text-sm text-neutral-400 uppercase tracking-widest font-bold">Sovereigns</p>
              </div>
              <div className="px-8 py-5 rounded-xl bg-neutral-50/5 backdrop-blur-md border border-neutral-50/10">
                <p className="font-display text-4xl font-bold text-neutral-50 mb-2">4.9★</p>
                <p className="text-sm text-neutral-400 uppercase tracking-widest font-bold">Rated</p>
              </div>
              <div className="px-8 py-5 rounded-xl bg-neutral-50/5 backdrop-blur-md border border-neutral-50/10">
                <p className="font-display text-4xl font-bold text-neutral-50 mb-2">100%</p>
                <p className="text-sm text-neutral-400 uppercase tracking-widest font-bold">Transparent</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button size="xl" variant="primary" asChild className="group shadow-xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 min-w-[240px]">
                <Link href="/products">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-6 w-6 stroke-[2] group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="border-neutral-700 hover:border-accent hover:bg-neutral-50/5 min-w-[240px]">
                <Link href="/finder">
                  Take the Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

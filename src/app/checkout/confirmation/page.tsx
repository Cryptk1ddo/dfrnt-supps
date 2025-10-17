'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle, Package, Mail, ArrowRight, Truck, Shield, Award, Sparkles, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { useCartStore } from '@/domains/cart/stores/useCartStore'

// Upsell products based on what was purchased
const upsellProducts = [
  {
    id: 'blue-light-glasses',
    name: 'Premium Blue-Light Glasses',
    description: 'Protect your circadian rhythm and reduce eye strain. Perfect complement to any cognitive stack.',
    price: '$149',
    originalPrice: '$179',
    savings: 'Save $30',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400',
    badge: 'Most Popular Pairing',
    benefits: ['Blocks 99% blue light', 'Premium Italian frames', 'Anti-glare coating'],
  },
  {
    id: 'recovery-stack',
    name: 'Recovery Stack',
    description: 'Accelerate muscle repair and reduce inflammation. Essential for active lifestyles.',
    price: '$79',
    originalPrice: '$89',
    savings: 'Save $10',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    badge: 'Complete Your System',
    benefits: ['Faster recovery', 'Reduce soreness', '30-day supply'],
  },
  {
    id: 'sleep-stack',
    name: 'Sleep Stack',
    description: 'Optimize deep sleep and wake refreshed. Science-backed ingredients for better rest.',
    price: '$85',
    originalPrice: '$95',
    savings: 'Save $10',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    badge: 'Limited Time Offer',
    benefits: ['Deeper sleep', 'No grogginess', 'Non-habit forming'],
  },
]

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || `ORD-${Date.now()}`
  const [selectedUpsell, setSelectedUpsell] = useState<string | null>(null)
  const [upsellAdded, setUpsellAdded] = useState(false)

  useEffect(() => {
    // Premium confetti celebration! 🎉
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // DFRNT brand colors for confetti
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF4A1A', '#F7F6F5', '#BDB9B6'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FF4A1A', '#F7F6F5', '#BDB9B6'],
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  const handleAddUpsell = (productId: string) => {
    setSelectedUpsell(productId)
    setUpsellAdded(true)
    
    // Add to cart (mock implementation)
    // In production, this would actually add the product
    setTimeout(() => {
      setSelectedUpsell(null)
    }, 2000)
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Success Hero Section */}
      <section className="relative overflow-hidden bg-brand-jet-graphite py-16 lg:py-20 border-b border-neutral-800">
        {/* Background glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="mx-auto max-w-4xl px-6 lg:px-12 relative z-10">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30 mb-8 animate-scale-in">
              <CheckCircle className="h-14 w-14 text-accent stroke-[2]" />
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping"></div>
            </div>
            
            <h1 className="mb-4 font-display text-4xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-tight">
              Order Confirmed!
            </h1>
            <p className="text-xl lg:text-2xl text-neutral-300 mb-3">
              Thank you for joining the DFRNT community
            </p>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Your order <span className="font-mono text-accent font-semibold">#{orderId}</span> has been confirmed. 
              We&apos;ll send you tracking information once it ships.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            <div className="p-5 rounded-xl bg-black/60 backdrop-blur-sm border border-neutral-800 text-center">
              <Truck className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-bold text-neutral-50 mb-1">2-3 Days</p>
              <p className="text-xs text-neutral-400">Fast Shipping</p>
            </div>
            <div className="p-5 rounded-xl bg-black/60 backdrop-blur-sm border border-neutral-800 text-center">
              <Shield className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-bold text-neutral-50 mb-1">60-Day</p>
              <p className="text-xs text-neutral-400">Money Back</p>
            </div>
            <div className="p-5 rounded-xl bg-black/60 backdrop-blur-sm border border-neutral-800 text-center">
              <Award className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-bold text-neutral-50 mb-1">100%</p>
              <p className="text-xs text-neutral-400">Transparent</p>
            </div>
          </div>
        </div>
      </section>

      {/* One-Time Upsell Offer */}
      <section className="relative py-16 lg:py-24 bg-black border-b border-neutral-800">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/30">
              <Sparkles className="h-4 w-4 text-accent stroke-[2.5] animate-pulse" />
              <span className="text-sm font-sans font-bold uppercase tracking-wider text-accent">
                Exclusive One-Time Offer
              </span>
            </div>
            <h2 className="mb-4 font-display text-3xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
              Complete Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                System
              </span>
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Add these complementary products at special post-purchase pricing—available only on this page.
            </p>
            
            {/* Urgency Timer */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-400">
              <Clock className="h-4 w-4 text-accent animate-pulse" />
              <span>This offer expires in <span className="text-accent font-bold">15 minutes</span></span>
            </div>
          </div>

          {/* Upsell Products Grid */}
          <div className="grid gap-6 lg:grid-cols-3 mb-12">
            {upsellProducts.map((product) => (
              <div
                key={product.id}
                className={`group relative rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
                  selectedUpsell === product.id
                    ? 'border-accent bg-accent/5 scale-[0.98]'
                    : 'border-neutral-800 hover:border-accent/50 bg-brand-jet-graphite hover:scale-[1.02]'
                }`}
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider">
                    {product.badge}
                  </div>
                )}

                {/* Product Image */}
                <div className="relative h-48 overflow-hidden bg-neutral-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 font-display text-xl font-bold text-neutral-50 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Benefits */}
                  <ul className="mb-6 space-y-2">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                        <CheckCircle className="h-3.5 w-3.5 text-accent stroke-[2.5] flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing */}
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-neutral-50">{product.price}</span>
                    <span className="text-sm text-neutral-500 line-through">{product.originalPrice}</span>
                    <Badge className="bg-accent/10 text-accent border-accent/30 text-xs px-2 py-0.5">
                      {product.savings}
                    </Badge>
                  </div>

                  {/* Add Button */}
                  <Button
                    size="lg"
                    fullWidth
                    onClick={() => handleAddUpsell(product.id)}
                    disabled={selectedUpsell === product.id}
                    className={`group/btn ${
                      selectedUpsell === product.id
                        ? 'bg-accent/20 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {selectedUpsell === product.id ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5 animate-scale-in" />
                        Added to Order!
                      </>
                    ) : (
                      <>
                        Add to Order
                        <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-accent/10 rounded-3xl"></div>
              </div>
            ))}
          </div>

          {/* Skip CTA */}
          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-3">
              Not interested right now? No problem.
            </p>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-neutral-700 hover:border-neutral-500"
            >
              <Link href="/products">
                Continue to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Order Timeline */}
      <section className="py-16 lg:py-20 bg-brand-jet-graphite border-b border-neutral-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <h2 className="mb-10 font-display text-3xl font-bold text-neutral-50 text-center">
            What Happens Next?
          </h2>

          <div className="space-y-6">
            {[
              {
                step: '1',
                icon: Package,
                title: 'Order Processing',
                description: "We're preparing your items for shipment. This typically takes 1-2 business days.",
                time: 'Within 24 hours',
              },
              {
                step: '2',
                icon: Truck,
                title: 'Shipping & Tracking',
                description: "Your order ships via express carrier. You'll receive tracking information by email.",
                time: '2-3 business days',
              },
              {
                step: '3',
                icon: CheckCircle,
                title: 'Delivery & Enjoy',
                description: 'Your DFRNT products arrive at your doorstep, ready to elevate your performance.',
                time: '3-5 business days',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.step}
                  className="flex gap-6 p-6 rounded-2xl bg-black/40 border border-neutral-800 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 border border-accent/30">
                      <Icon className="h-7 w-7 text-accent stroke-[2]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-neutral-50">{item.title}</h3>
                      <span className="text-xs text-accent font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/30">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support & Resources */}
      <section className="py-12 bg-black">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Email Confirmation */}
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center">
              <Mail className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-bold text-neutral-50 mb-2">Check Your Email</h3>
              <p className="text-sm text-neutral-400 mb-4">
                Order confirmation sent to your inbox with full details and tracking.
              </p>
              <Link
                href={`/orders/${orderId}`}
                className="text-sm text-accent hover:underline font-semibold"
              >
                View Order Details →
              </Link>
            </div>

            {/* Customer Support */}
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center">
              <Shield className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-bold text-neutral-50 mb-2">Need Help?</h3>
              <p className="text-sm text-neutral-400 mb-4">
                Our team is here 24/7 to answer any questions about your order.
              </p>
              <a
                href="mailto:support@dfrnt.com"
                className="text-sm text-accent hover:underline font-semibold"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-neutral-400">Loading confirmation...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}

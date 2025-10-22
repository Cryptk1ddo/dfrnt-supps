'use client'

import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { 
  ShoppingCart, 
  Shield, 
  Package, 
  CheckCircle, 
  Minus, 
  Plus, 
  Star,
  Truck,
  Award,
  Clock,
  Zap,
  Heart,
  Share2,
  ChevronRight,
  TrendingUp,
  Users,
  RefreshCw
} from 'lucide-react'
import { getProductBySlug } from '@/lib/strapi/client'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/domains/cart/stores/useCartStore'
import { useGsapFadeIn } from '@/hooks/useGsap'
import { ProductReviews } from '@/domains/catalog/components/ProductReviews'
import { ProductUpsell } from '@/domains/catalog/components/ProductUpsell'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { ProductExitIntentHandler } from '@/components/modals/ProductExitIntentHandler'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { LimitedOfferTimer } from '@/components/ui/LimitedOfferTimer'
import { FreeShippingProgress } from '@/components/ui/FreeShippingProgress'
import { FrequentlyBoughtTogether } from '@/components/catalog/FrequentlyBoughtTogether'
import { YouMayAlsoLike } from '@/components/catalog/YouMayAlsoLike'
import { VolumePricing } from '@/components/catalog/VolumePricing'
import { SubscriptionComparison } from '@/components/catalog/SubscriptionComparison'
import InteractiveIngredients from '@/components/catalog/InteractiveIngredients'
import BenefitsTimeline from '@/components/catalog/BenefitsTimeline'
import BeforeAfterSlider from '@/components/catalog/BeforeAfterSlider'
import { getFrequentlyBoughtTogether, getYouMayAlsoLike } from '@/lib/recommendations'
import { getAllProducts, mockIngredients, mockBenefitsTimeline } from '@/lib/mock-data'

// Subscription frequency tiers with progressive discounts
const subscriptionTiers = [
  { 
    id: 'weekly', 
    label: 'Every Week', 
    interval: 7,
    discount: 25,
    badge: 'Maximum Savings',
    description: 'Perfect for daily users'
  },
  { 
    id: 'biweekly', 
    label: 'Every 2 Weeks', 
    interval: 14,
    discount: 20,
    badge: 'Popular Choice',
    description: 'Most popular option'
  },
  { 
    id: 'monthly', 
    label: 'Every Month', 
    interval: 30,
    discount: 15,
    badge: 'Best Value',
    description: 'Standard supply'
  },
  { 
    id: 'bimonthly', 
    label: 'Every 2 Months', 
    interval: 60,
    discount: 10,
    badge: 'Flexible',
    description: 'Occasional use'
  },
]

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showStickyButton, setShowStickyButton] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'benefits' | 'ingredients' | 'reviews'>('description')
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'subscribe'>('onetime')
  const [selectedFrequency, setSelectedFrequency] = useState(subscriptionTiers[1].id) // Default to biweekly
  const [showScrollTop, setShowScrollTop] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)
  
  const contentRef = useGsapFadeIn({ delay: 0.2 })

  // Sticky button and scroll-to-top on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Show sticky button after scrolling 500px
      setShowStickyButton(scrollPosition > 500)
      // Show scroll-to-top after scrolling 800px
      setShowScrollTop(scrollPosition > 800)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.slug],
    queryFn: () => getProductBySlug(params.slug),
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="h-[600px] animate-pulse rounded-lg bg-brand-jet-graphite border border-neutral-800" />
          <div className="space-y-6">
            <div className="h-10 animate-pulse rounded bg-brand-jet-graphite border border-neutral-800" />
            <div className="h-32 animate-pulse rounded bg-brand-jet-graphite border border-neutral-800" />
            <div className="h-16 animate-pulse rounded bg-brand-jet-graphite border border-neutral-800" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0

  // Calculate subscription price based on selected frequency
  const getSubscriptionDiscount = () => {
    const tier = subscriptionTiers.find(t => t.id === selectedFrequency)
    return tier?.discount || 0
  }

  const getSubscriptionPrice = () => {
    const tier = subscriptionTiers.find(t => t.id === selectedFrequency)
    if (!tier) return product.price
    return product.price * (1 - tier.discount / 100)
  }

  const getTotalSavings = () => {
    if (purchaseType === 'subscribe') {
      return (product.price - getSubscriptionPrice()) * quantity
    }
    return 0
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    openCart()
  }

  // Mock reviews data - in production, this would come from an API
  const mockReviews = [
    {
      id: 1,
      author: 'Michael R.',
      rating: 5 as const,
      date: 'January 15, 2024',
      title: 'Game changer for my morning routine',
      content: 'I\'ve been using this for 3 weeks now and the difference is night and day. More energy, better focus, and no afternoon crash. Highly recommend.',
      verified: true,
      helpful: 24,
    },
    {
      id: 2,
      author: 'Sarah K.',
      rating: 5 as const,
      date: 'January 10, 2024',
      title: 'Actually works',
      content: 'Skeptical at first, but the science backs it up. Noticed improved clarity within the first week. Will definitely reorder.',
      verified: true,
      helpful: 18,
    },
    {
      id: 3,
      author: 'David L.',
      rating: 4 as const,
      date: 'January 5, 2024',
      title: 'Solid product',
      content: 'Good quality and effective. Only wish the price point was a bit lower, but you get what you pay for.',
      verified: true,
      helpful: 12,
    },
  ]

  // Get recommendation data
  const allProducts = getAllProducts()
  const frequentlyBoughtTogether = getFrequentlyBoughtTogether(product, allProducts, 2)
  const youMayAlsoLike = getYouMayAlsoLike(product, allProducts, 6)

  return (
    <>
      {/* Premium Product Detail - CRO Optimized */}
      <div className="relative bg-black">
        {/* Ambient background effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent rounded-full blur-[140px] animate-pulse"></div>
        </div>

        <div className="mx-auto max-w-[1600px] px-6 py-12 lg:px-12 lg:py-20 relative z-10">
          <div
            ref={contentRef as React.RefObject<HTMLDivElement>}
            className="grid gap-12 lg:grid-cols-[1.1fr,1fr] lg:gap-20"
          >
            {/* LEFT: Product Images - Enhanced Gallery */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              {/* Main Image */}
              <div className="relative mb-6 aspect-square overflow-hidden rounded-3xl bg-brand-jet-graphite border border-neutral-800 group">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 via-transparent to-accent/10 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
                
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover saturate-75 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  quality={95}
                />

                {/* Badges & Actions Overlay */}
                <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10">
                  {discount > 0 && (
                    <div className="px-4 py-2 rounded-full bg-accent backdrop-blur-xl border border-accent-light shadow-lg shadow-accent/30 animate-pulse">
                      <span className="text-sm font-bold uppercase tracking-wider text-white">
                        Save {discount}%
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-3 rounded-full backdrop-blur-xl border transition-all ${
                        isWishlisted 
                          ? 'bg-accent/90 border-accent text-white' 
                          : 'bg-black/80 border-neutral-700 text-neutral-400 hover:text-accent hover:border-accent'
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`h-5 w-5 stroke-[2] ${isWishlisted ? 'fill-white' : ''}`} />
                    </button>
                    <button
                      className="p-3 rounded-full bg-black/80 backdrop-blur-xl border border-neutral-700 text-neutral-400 hover:text-accent hover:border-accent transition-all"
                      aria-label="Share product"
                    >
                      <Share2 className="h-5 w-5 stroke-[2]" />
                    </button>
                  </div>
                </div>

                {/* Low Stock Indicator */}
                {product.inStock && product.inventory < 10 && (
                  <div className="absolute bottom-6 left-6 px-4 py-2.5 rounded-xl bg-black/90 backdrop-blur-xl border border-amber-500/50">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500 stroke-[2]" />
                      <p className="text-sm font-bold text-amber-500">
                        Only {product.inventory} left in stock!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-accent shadow-lg shadow-accent/30 scale-105' 
                          : 'border-neutral-800 hover:border-neutral-600 hover:scale-105'
                      }`}
                    >
                      <Image 
                        src={image} 
                        alt={`${product.name} view ${index + 1}`} 
                        fill 
                        className="object-cover" 
                        sizes="150px" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Information - Optimized for Conversion */}
            <div className="space-y-8">
              {/* Breadcrumb / Category */}
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <span>Products</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-accent font-medium">{product.category}</span>
              </div>

              {/* Product Title & Rating */}
              <div>
                <h1 className="mb-4 font-display text-4xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1.05]">
                  {product.name}
                </h1>
                
                {/* Ratings & Social Proof */}
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="font-bold text-neutral-50">4.9</span>
                    <span className="text-neutral-400">(2,847 reviews)</span>
                  </div>
                  <div className="h-5 w-px bg-neutral-800"></div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent stroke-[2]" />
                    <span className="text-neutral-400">
                      <span className="font-bold text-neutral-50">5,231</span> customers
                    </span>
                  </div>
                </div>

                {/* Urgency & Scarcity Badges */}
                <div className="flex flex-wrap gap-3">
                  {/* Live Viewers */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 animate-pulse">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </div>
                    <span className="text-sm font-bold text-amber-500">23 people viewing</span>
                  </div>

                  {/* Low Stock Alert */}
                  {product.inStock && product.inventory < 20 && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30">
                      <Clock className="h-4 w-4 text-red-500 stroke-[2]" />
                      <span className="text-sm font-bold text-red-500">Low stock - Only {product.inventory} left!</span>
                    </div>
                  )}

                  {/* Recent Purchase */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                    <CheckCircle className="h-4 w-4 text-green-500 stroke-[2]" />
                    <span className="text-sm font-bold text-green-500">14 sold in last 24 hours</span>
                  </div>
                </div>

                {/* Limited Time Offer Timer */}
                <LimitedOfferTimer
                  endTime={new Date(Date.now() + 4 * 60 * 60 * 1000)} // 4 hours from now
                  offerText="25% OFF - Flash Sale Ending Soon"
                  urgencyThresholdMinutes={30}
                  className="animate-scale-in"
                />
              </div>

              {/* Short Description */}
              <p className="text-xl text-neutral-300 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Purchase Type Toggle - Subscribe vs One-Time */}
              <div className="p-2 rounded-2xl bg-black border-2 border-neutral-800 flex gap-2">
                <button
                  onClick={() => setPurchaseType('subscribe')}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold uppercase tracking-wide text-sm transition-all duration-300 relative overflow-hidden group ${
                    purchaseType === 'subscribe'
                      ? 'bg-accent text-white shadow-lg shadow-accent/30'
                      : 'bg-transparent text-neutral-400 hover:text-neutral-300'
                  }`}
                >
                  {purchaseType === 'subscribe' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-dark to-accent opacity-100"></div>
                  )}
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5 stroke-[2.5]" />
                    <span>Subscribe & Save</span>
                    {purchaseType === 'subscribe' && (
                      <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">
                        Up to 25%
                      </span>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setPurchaseType('onetime')}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold uppercase tracking-wide text-sm transition-all duration-300 ${
                    purchaseType === 'onetime'
                      ? 'bg-brand-jet-graphite text-neutral-50 border border-neutral-700'
                      : 'bg-transparent text-neutral-400 hover:text-neutral-300'
                  }`}
                >
                  One-Time Purchase
                </button>
              </div>

              {/* Subscription Frequency Selector */}
              {purchaseType === 'subscribe' && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-2 border-accent/30 animate-scale-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20">
                      <RefreshCw className="h-6 w-6 text-accent stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-50 text-lg">Choose Your Frequency</h3>
                      <p className="text-sm text-neutral-400">More frequent = More savings</p>
                    </div>
                  </div>

                  <div className="grid gap-3 mb-6">
                    {subscriptionTiers.map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedFrequency(tier.id)}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 text-left group ${
                          selectedFrequency === tier.id
                            ? 'border-accent bg-accent/5 shadow-lg shadow-accent/20'
                            : 'border-neutral-800 bg-black/40 hover:border-neutral-700 hover:bg-black/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedFrequency === tier.id
                                ? 'border-accent bg-accent'
                                : 'border-neutral-600'
                            }`}>
                              {selectedFrequency === tier.id && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-neutral-50 text-base">{tier.label}</p>
                              <p className="text-xs text-neutral-400">{tier.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="px-3 py-1 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider">
                              {tier.discount}% OFF
                            </div>
                            {tier.badge && (
                              <p className="text-xs text-accent mt-1 font-semibold">{tier.badge}</p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Subscription Benefits */}
                  <div className="pt-5 border-t border-accent/20 space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent stroke-[2] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-neutral-300">
                        <span className="font-bold text-neutral-50">Never run out</span> - Automatic delivery
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent stroke-[2] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-neutral-300">
                        <span className="font-bold text-neutral-50">Pause or cancel anytime</span> - Full flexibility
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent stroke-[2] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-neutral-300">
                        <span className="font-bold text-neutral-50">Free shipping always</span> - On all subscriptions
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent stroke-[2] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-neutral-300">
                        <span className="font-bold text-neutral-50">Modify frequency</span> - Change schedule anytime
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing Display - Shows calculated price */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-jet-graphite to-black border border-neutral-800">
                <div className="flex items-end gap-4 mb-4">
                  <span className="font-display text-6xl font-bold text-accent">
                    {purchaseType === 'subscribe' 
                      ? formatPrice(getSubscriptionPrice())
                      : formatPrice(product.price)
                    }
                  </span>
                  {purchaseType === 'subscribe' && (
                    <>
                      <span className="text-2xl text-neutral-500 line-through mb-2">
                        {formatPrice(product.price)}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-2">
                        Save {getSubscriptionDiscount()}%
                      </span>
                    </>
                  )}
                  {purchaseType === 'onetime' && product.compareAtPrice && (
                    <>
                      <span className="text-2xl text-neutral-500 line-through mb-2">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-2">
                        Save {formatPrice(product.compareAtPrice - product.price)}
                      </span>
                    </>
                  )}
                </div>

                {/* Subscription frequency reminder */}
                {purchaseType === 'subscribe' && (
                  <div className="mb-4 p-4 rounded-xl bg-accent/5 border border-accent/20">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-accent stroke-[2]" />
                      <div>
                        <p className="text-sm font-bold text-neutral-50">
                          {subscriptionTiers.find(t => t.id === selectedFrequency)?.label}
                        </p>
                        <p className="text-xs text-neutral-400">
                          Automatic delivery every {subscriptionTiers.find(t => t.id === selectedFrequency)?.interval} days
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Stock & Urgency */}
                <div className="flex items-center gap-3 mb-4">
                  {product.inStock ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500 stroke-[2]" />
                      <span className="font-semibold text-neutral-50">
                        In Stock
                        {product.inventory < 20 && (
                          <span className="text-amber-500"> • Only {product.inventory} left</span>
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-5 w-5 text-red-500 stroke-[2]" />
                      <span className="font-semibold text-red-500">Out of Stock</span>
                    </>
                  )}
                </div>

                {/* Quantity Selector - Enhanced */}
                <div className="mb-6">
                  <label className="mb-3 block font-sans font-bold uppercase tracking-wide text-xs text-neutral-400">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-xl border-2 border-neutral-700 bg-black overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-4 hover:bg-neutral-800 hover:text-accent transition-colors text-neutral-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-5 w-5 stroke-[2.5]" />
                      </button>
                      <span className="w-20 text-center font-bold text-2xl text-neutral-50">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                        className="p-4 hover:bg-neutral-800 hover:text-accent transition-colors text-neutral-50"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-5 w-5 stroke-[2.5]" />
                      </button>
                    </div>
                    <div className="text-sm">
                      <p className="text-neutral-400">Total:</p>
                      <p className="font-display text-xl font-bold text-neutral-50">
                        {purchaseType === 'subscribe' 
                          ? formatPrice(getSubscriptionPrice() * quantity)
                          : formatPrice(product.price * quantity)
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Savings Display */}
                {purchaseType === 'subscribe' && getTotalSavings() > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="h-6 w-6 text-green-500 stroke-[2]" />
                        <div>
                          <p className="text-sm font-bold text-neutral-50">Your Subscription Savings</p>
                          <p className="text-xs text-neutral-400">Per delivery</p>
                        </div>
                      </div>
                      <p className="font-display text-2xl font-bold text-green-500">
                        {formatPrice(getTotalSavings())}
                      </p>
                    </div>
                  </div>
                )}

                {/* Primary CTA - Large & Prominent */}
                <Button
                  size="xl"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="h-16 text-lg font-bold shadow-xl shadow-accent/30 hover:shadow-accent/50 mb-4 group relative overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center">
                    {purchaseType === 'subscribe' ? (
                      <>
                        <RefreshCw className="mr-3 h-6 w-6 stroke-[2.5] group-hover:rotate-180 transition-transform duration-500" />
                        Subscribe Now
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-3 h-6 w-6 stroke-[2.5] group-hover:scale-110 transition-transform" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </>
                    )}
                  </div>
                  {purchaseType === 'subscribe' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </Button>

                {/* Free Shipping Progress Bar */}
                <FreeShippingProgress 
                  currentTotal={product.price * quantity}
                  freeShippingThreshold={75}
                  className="mb-6"
                />

                {/* Subscription CTA Enhancement */}
                {purchaseType === 'subscribe' && (
                  <div className="mb-4 text-center">
                    <p className="text-sm text-neutral-400">
                      First delivery ships immediately • Cancel anytime
                    </p>
                  </div>
                )}

                {/* Secondary Actions - Only for one-time */}
                {purchaseType === 'onetime' && (
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    className="border-neutral-700 hover:border-accent group"
                    onClick={() => {
                      handleAddToCart()
                      // Navigate to checkout
                    }}
                  >
                    <Zap className="mr-2 h-5 w-5 stroke-[2] group-hover:text-accent" />
                    Buy Now
                  </Button>
                )}
              </div>

              {/* Flash Sale Countdown */}
              {discount > 0 && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30">
                  <CountdownTimer
                    endDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                    title="🔥 Flash Sale Ends In"
                  />
                </div>
              )}

              {/* Trust Badges - Premium Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-5 rounded-xl bg-black/40 border border-neutral-800 hover:border-accent/30 transition-all group">
                  <Shield className="h-7 w-7 text-accent stroke-[2] mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-neutral-50 mb-1">60-Day Guarantee</p>
                  <p className="text-xs text-neutral-400">Money-back promise</p>
                </div>
                <div className="p-5 rounded-xl bg-black/40 border border-neutral-800 hover:border-accent/30 transition-all group">
                  <Truck className="h-7 w-7 text-accent stroke-[2] mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-neutral-50 mb-1">Free Shipping</p>
                  <p className="text-xs text-neutral-400">On orders $75+</p>
                </div>
                <div className="p-5 rounded-xl bg-black/40 border border-neutral-800 hover:border-accent/30 transition-all group">
                  <Award className="h-7 w-7 text-accent stroke-[2] mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-neutral-50 mb-1">Science-Backed</p>
                  <p className="text-xs text-neutral-400">Clinically tested</p>
                </div>
                <div className="p-5 rounded-xl bg-black/40 border border-neutral-800 hover:border-accent/30 transition-all group">
                  <TrendingUp className="h-7 w-7 text-accent stroke-[2] mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-neutral-50 mb-1">Top Rated</p>
                  <p className="text-xs text-neutral-400">4.9★ average</p>
                </div>
              </div>

              {/* Security & Payment Badges */}
              <div className="p-6 rounded-xl bg-black/60 border border-neutral-800">
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4 text-center">Secure Checkout Guaranteed</p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* Payment Methods */}
                  <div className="px-4 py-2 rounded-lg bg-neutral-50/5 border border-neutral-800 flex items-center gap-2">
                    <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none">
                      <rect width="48" height="32" rx="4" fill="#1434CB"/>
                      <text x="24" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">VISA</text>
                    </svg>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-neutral-50/5 border border-neutral-800 flex items-center gap-2">
                    <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none">
                      <rect width="48" height="32" rx="4" fill="#EB001B"/>
                      <circle cx="24" cy="16" r="10" fill="#F79E1B" opacity="0.7"/>
                    </svg>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-neutral-50/5 border border-neutral-800">
                    <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none">
                      <rect width="48" height="32" rx="4" fill="#003087"/>
                      <text x="24" y="20" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PayPal</text>
                    </svg>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-neutral-50/5 border border-neutral-800">
                    <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none">
                      <rect width="48" height="32" rx="4" fill="#00D924"/>
                      <text x="24" y="20" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Shop</text>
                    </svg>
                  </div>
                  
                  {/* Security Badges */}
                  <div className="h-6 w-px bg-neutral-800"></div>
                  
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-50/5 border border-neutral-800">
                    <Shield className="h-4 w-4 text-green-500 stroke-[2]" />
                    <span className="text-xs font-bold text-neutral-300">SSL Secure</span>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-50/5 border border-neutral-800">
                    <CheckCircle className="h-4 w-4 text-green-500 stroke-[2]" />
                    <span className="text-xs font-bold text-neutral-300">PCI Compliant</span>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-50/5 border border-neutral-800">
                    <Award className="h-4 w-4 text-green-500 stroke-[2]" />
                    <span className="text-xs font-bold text-neutral-300">FDA Registered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content Section - Premium Design */}
      <div className="relative bg-brand-jet-graphite border-t border-neutral-800">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
          {/* Tab Navigation */}
          <div className="mb-12 flex flex-wrap gap-3 border-b border-neutral-800">
            {['description', 'benefits', 'ingredients', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`pb-4 px-6 font-bold uppercase tracking-wider text-sm transition-all relative ${
                  activeTab === tab
                    ? 'text-accent'
                    : 'text-neutral-400 hover:text-neutral-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'description' && (
              <div className="max-w-4xl animate-scale-in">
                <h2 className="mb-6 font-display text-4xl font-bold text-neutral-50 tracking-tight">
                  Product Description
                </h2>
                <p className="text-lg text-neutral-300 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === 'benefits' && product.benefits && product.benefits.length > 0 && (
              <div className="max-w-4xl animate-scale-in">
                <h2 className="mb-8 font-display text-4xl font-bold text-neutral-50 tracking-tight">
                  Key Benefits
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-black/40 border border-neutral-800 hover:border-accent/30 transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <CheckCircle className="h-6 w-6 text-accent stroke-[2]" />
                        </div>
                        <div className="flex-1">
                          <span className="text-neutral-50 leading-relaxed font-medium">{benefit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && product.ingredients && product.ingredients.length > 0 && (
              <div className="max-w-4xl animate-scale-in">
                <h2 className="mb-8 font-display text-4xl font-bold text-neutral-50 tracking-tight">
                  Premium Ingredients
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="p-5 rounded-xl bg-black/40 border border-neutral-800 hover:border-accent/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                        <span className="text-neutral-300 font-medium">{ingredient}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-scale-in">
                <ProductReviews
                  productId={product.id}
                  averageRating={4.9}
                  totalReviews={mockReviews.length}
                  reviews={mockReviews}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Features Grid - Visual Highlight */}
      {product.features && product.features.length > 0 && (
        <div className="relative bg-black py-20 border-t border-neutral-800">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <h2 className="mb-12 text-center font-display text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
              Product{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                Features
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.features.map((feature, index) => (
                <div key={index} className="p-8 rounded-2xl bg-brand-jet-graphite border border-neutral-800 hover:border-accent/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/10 transition-colors">
                      <Zap className="h-7 w-7 text-accent stroke-[2]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-neutral-50 leading-relaxed font-medium text-lg">{feature}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Customer Testimonials Carousel - Social Proof */}
      <div className="relative bg-brand-jet-graphite py-20 border-t border-neutral-800">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/30 mb-6">
              <Award className="h-4 w-4 text-accent stroke-[2.5]" />
              <span className="text-sm font-bold uppercase tracking-wider text-accent">
                Customer Love
              </span>
            </div>
            <h2 className="mb-4 font-display text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
              What Our Customers{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                Are Saying
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-neutral-800 hover:border-accent/30 active:scale-[0.98] transition-all group touch-manipulation">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-neutral-300 leading-relaxed mb-6 italic">
                "This has completely transformed my morning routine. I wake up energized and stay focused throughout the day. No more afternoon crashes!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-bold text-accent text-lg">MR</span>
                </div>
                <div>
                  <p className="font-bold text-neutral-50">Michael Rodriguez</p>
                  <p className="text-sm text-neutral-400">Tech Entrepreneur</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <CheckCircle className="h-4 w-4 stroke-[2]" />
                  <span className="font-semibold">Verified Purchase</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-neutral-800 hover:border-accent/30 active:scale-[0.98] transition-all group touch-manipulation">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-neutral-300 leading-relaxed mb-6 italic">
                "I've tried countless supplements over the years. This is the only one that actually delivers on its promises. Results within the first week!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-bold text-accent text-lg">SK</span>
                </div>
                <div>
                  <p className="font-bold text-neutral-50">Sarah Kim</p>
                  <p className="text-sm text-neutral-400">Marketing Director</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <CheckCircle className="h-4 w-4 stroke-[2]" />
                  <span className="font-semibold">Verified Purchase</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-neutral-800 hover:border-accent/30 active:scale-[0.98] transition-all group touch-manipulation">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-neutral-300 leading-relaxed mb-6 italic">
                "Outstanding quality and the subscription model is genius. Never have to worry about running out. Customer service is top-notch too!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-bold text-accent text-lg">DL</span>
                </div>
                <div>
                  <p className="font-bold text-neutral-50">David Lee</p>
                  <p className="text-sm text-neutral-400">Fitness Coach</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <CheckCircle className="h-4 w-4 stroke-[2]" />
                  <span className="font-semibold">Verified Purchase</span>
                </div>
              </div>
            </div>
          </div>

          {/* Press Mentions */}
          <div className="mt-16 pt-12 border-t border-neutral-800">
            <p className="text-center text-sm text-neutral-500 uppercase tracking-wider mb-8">As Featured In</p>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-40 hover:opacity-60 transition-opacity">
              <span className="font-serif text-2xl text-neutral-400">Forbes</span>
              <span className="font-sans text-2xl font-bold text-neutral-400">GQ</span>
              <span className="font-sans text-xl text-neutral-400">Men's Health</span>
              <span className="font-serif italic text-xl text-neutral-400">Vogue</span>
              <span className="font-sans text-xl text-neutral-400">WIRED</span>
            </div>
          </div>
        </div>
      </div>

      {/* UGC (User-Generated Content) Section - Instagram-style Gallery */}
      <div className="relative bg-black py-20 border-t border-neutral-800 overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent blur-[120px]"></div>
        </div>

        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/30 mb-6">
              <Users className="h-4 w-4 text-accent stroke-[2.5]" />
              <span className="text-sm font-bold uppercase tracking-wider text-accent">
                Real Results from Real People
              </span>
            </div>
            <h2 className="mb-4 font-display text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
              Join 5,000+{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                Satisfied Customers
              </span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              See how {product.name} is transforming lives. Real photos, real stories, real results.
            </p>
          </div>

          {/* UGC Grid - Instagram-style */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
            {/* Mock UGC Post 1 - Before/After */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 hover:border-accent/50 active:border-accent transition-all cursor-pointer touch-manipulation">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&fit=crop&auto=format"
                alt="Customer transformation"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent"></div>
                    <div>
                      <p className="text-sm font-bold text-neutral-50">@mike_fitness</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    "3 months of consistency. Down 22lbs and feeling incredible!"
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-xs text-neutral-400">2,847 likes</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Verified</span>
              </div>
            </div>

            {/* Mock UGC Post 2 - Lifestyle */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 hover:border-accent/50 transition-all cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop&auto=format"
                alt="Customer using product"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent"></div>
                    <div>
                      <p className="text-sm font-bold text-neutral-50">@sarah_wellness</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    "My morning routine isn't complete without this. Game changer!"
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-xs text-neutral-400">1,923 likes</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Verified</span>
              </div>
            </div>

            {/* Mock UGC Post 3 - Product Shot */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 hover:border-accent/50 transition-all cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&q=80&fit=crop&auto=format"
                alt="Customer product photo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent"></div>
                    <div>
                      <p className="text-sm font-bold text-neutral-50">@david_performance</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    "Quality you can see and feel. Worth every penny!"
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-xs text-neutral-400">3,156 likes</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Verified</span>
              </div>
            </div>

            {/* Mock UGC Post 4 - Action Shot */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 hover:border-accent/50 transition-all cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=600&q=80&fit=crop&auto=format"
                alt="Customer action shot"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent"></div>
                    <div>
                      <p className="text-sm font-bold text-neutral-50">@alex_athlete</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    "Crushing PRs! This stack is essential for my training."
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-xs text-neutral-400">4,892 likes</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Verified</span>
              </div>
            </div>

            {/* Mock UGC Post 5 - Daily Use */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 hover:border-accent/50 transition-all cursor-pointer hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80&fit=crop&auto=format"
                alt="Customer daily routine"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent"></div>
                    <div>
                      <p className="text-sm font-bold text-neutral-50">@emma_focused</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    "Best decision I made for my productivity. Highly recommend!"
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-xs text-neutral-400">2,341 likes</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Verified</span>
              </div>
            </div>

            {/* Mock UGC Post 6 - Results */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 hover:border-accent/50 transition-all cursor-pointer hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80&fit=crop&auto=format"
                alt="Customer results"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent"></div>
                    <div>
                      <p className="text-sm font-bold text-neutral-50">@jake_entrepreneur</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    "Finally something that actually works. No placebo here!"
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-xs text-neutral-400">5,678 likes</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Verified</span>
              </div>
            </div>

            {/* Mock UGC Post 7 - Testimonial */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 hover:border-accent/50 transition-all cursor-pointer hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80&fit=crop&auto=format"
                alt="Customer testimonial"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent"></div>
                    <div>
                      <p className="text-sm font-bold text-neutral-50">@lisa_healthy</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    "6 weeks in and I'm already seeing amazing results!"
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-xs text-neutral-400">3,421 likes</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Verified</span>
              </div>
            </div>

            {/* Mock UGC Post 8 - Community */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 hover:border-accent/50 transition-all cursor-pointer hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80&fit=crop&auto=format"
                alt="Customer community"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent"></div>
                    <div>
                      <p className="text-sm font-bold text-neutral-50">@chris_strong</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <Star className="h-3 w-3 fill-accent text-accent" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    "Part of my championship prep. Can't imagine training without it!"
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-xs text-neutral-400">6,234 likes</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Verified</span>
              </div>
            </div>
          </div>

          {/* UGC Stats Bar - Animated Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-gradient-to-br from-brand-jet-graphite to-black border border-neutral-800 hover:border-accent/30 transition-all">
            <div className="text-center group">
              <div className="font-display text-4xl font-bold text-accent mb-2">
                <AnimatedCounter end={5231} separator="," className="inline-block" />
              </div>
              <p className="text-sm text-neutral-400 uppercase tracking-wider group-hover:text-neutral-300 transition-colors">
                Photos Shared
              </p>
            </div>
            <div className="text-center group">
              <div className="font-display text-4xl font-bold text-accent mb-2">
                <AnimatedCounter end={4.9} decimals={1} className="inline-block" />
                <span>★</span>
              </div>
              <p className="text-sm text-neutral-400 uppercase tracking-wider group-hover:text-neutral-300 transition-colors">
                Average Rating
              </p>
            </div>
            <div className="text-center group">
              <div className="font-display text-4xl font-bold text-accent mb-2">
                <AnimatedCounter end={2847} separator="," className="inline-block" />
              </div>
              <p className="text-sm text-neutral-400 uppercase tracking-wider group-hover:text-neutral-300 transition-colors">
                Reviews
              </p>
            </div>
            <div className="text-center group">
              <div className="font-display text-4xl font-bold text-accent mb-2">
                <AnimatedCounter end={98} suffix="%" className="inline-block" />
              </div>
              <p className="text-sm text-neutral-400 uppercase tracking-wider group-hover:text-neutral-300 transition-colors">
                Would Recommend
              </p>
            </div>
          </div>

          {/* CTA to Share */}
          <div className="mt-12 text-center">
            <p className="text-neutral-300 mb-4">Share your results and get featured!</p>
            <Button variant="outline" size="lg" className="border-neutral-700 hover:border-accent">
              <Share2 className="mr-2 h-5 w-5 stroke-[2]" />
              Tag us @DFRNT
            </Button>
          </div>
        </div>
      </div>

      {/* Subscription Upsell Banner - Show only for one-time purchases */}
      {purchaseType === 'onetime' && (
        <div className="relative bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border-y border-accent/30 py-16 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-accent rounded-full blur-[120px]"></div>
            <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-green-500 rounded-full blur-[100px]"></div>
          </div>

          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 mb-6">
                <RefreshCw className="h-4 w-4 text-accent stroke-[2.5]" />
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                  Smarter Way to Buy
                </span>
              </div>
              <h2 className="mb-4 font-display text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
                Why Subscribe to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                  {product.name}?
                </span>
              </h2>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                Join thousands who never run out and save up to 25% on every delivery
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
              {subscriptionTiers.map((tier) => {
                const savingsPerMonth = ((product.price * tier.discount) / 100) * (30 / tier.interval)
                return (
                  <div key={tier.id} className="p-6 rounded-2xl bg-black/60 backdrop-blur-sm border border-neutral-800 hover:border-accent/50 transition-all group">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition-all mb-4">
                        <span className="font-display text-2xl font-bold text-accent">{tier.discount}%</span>
                      </div>
                      <h3 className="font-bold text-neutral-50 text-lg mb-1">{tier.label}</h3>
                      <p className="text-sm text-neutral-400 mb-3">{tier.description}</p>
                      {tier.badge && (
                        <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <div className="pt-4 border-t border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-400">You Pay:</span>
                        <span className="font-display text-lg font-bold text-accent">
                          {formatPrice(product.price * (1 - tier.discount / 100))}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-400">You Save:</span>
                        <span className="font-bold text-green-500">
                          {formatPrice(product.price * tier.discount / 100)}
                        </span>
                      </div>
                      <div className="pt-2 text-xs text-neutral-500 text-center">
                        ≈ {formatPrice(savingsPerMonth)}/month in savings
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="text-center">
              <Button
                size="xl"
                onClick={() => {
                  setPurchaseType('subscribe')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="min-w-[300px] shadow-2xl shadow-accent/40 group"
              >
                <RefreshCw className="mr-3 h-6 w-6 stroke-[2.5] group-hover:rotate-180 transition-transform duration-500" />
                Switch to Subscribe & Save
              </Button>
              <p className="mt-4 text-sm text-neutral-400">
                Free shipping • Cancel anytime • Modify schedule anytime
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose DFRNT - Comparison */}
      <div className="relative bg-black py-20 border-t border-neutral-800">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
              <Award className="h-4 w-4" />
              The DFRNT Difference
            </span>
            <h2 className="mb-4 font-display text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                DFRNT
              </span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              We don't cut corners. Here's how we compare to typical supplement brands.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="relative">
            {/* Mobile Scroll Indicator */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-10 lg:hidden"></div>
            <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 pb-2">
              <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-accent">
                  <th className="p-4 text-left text-neutral-400 font-normal text-sm"></th>
                  <th className="p-4 text-center bg-accent/10 border-2 border-accent rounded-t-2xl">
                    <div className="font-display text-2xl font-bold text-accent mb-1">DFRNT</div>
                    <div className="text-xs text-accent-light">Premium Quality</div>
                  </th>
                  <th className="p-4 text-center text-neutral-500">
                    <div className="font-display text-xl font-bold text-neutral-400 mb-1">Other Brands</div>
                    <div className="text-xs text-neutral-600">Industry Standard</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-800">
                  <td className="p-3 sm:p-4 font-semibold text-neutral-300 text-sm sm:text-base">Ingredient Transparency</td>
                  <td className="p-3 sm:p-4 text-center bg-accent/5">
                    <span className="inline-flex items-center gap-1 text-green-500 font-bold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Full Disclosure
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-neutral-600">Proprietary Blends</span>
                  </td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="p-4 font-semibold text-neutral-300">Clinical Dosages</td>
                  <td className="p-4 text-center bg-accent/5">
                    <span className="inline-flex items-center gap-1 text-green-500 font-bold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Research-Backed
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-neutral-600">Underdosed</span>
                  </td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="p-4 font-semibold text-neutral-300">Third-Party Testing</td>
                  <td className="p-4 text-center bg-accent/5">
                    <span className="inline-flex items-center gap-1 text-green-500 font-bold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Every Batch
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-neutral-600">Rarely</span>
                  </td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="p-4 font-semibold text-neutral-300">Manufacturing Standards</td>
                  <td className="p-4 text-center bg-accent/5">
                    <span className="inline-flex items-center gap-1 text-green-500 font-bold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      FDA-Registered
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-neutral-600">Varies</span>
                  </td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="p-4 font-semibold text-neutral-300">Money-Back Guarantee</td>
                  <td className="p-4 text-center bg-accent/5">
                    <span className="inline-flex items-center gap-1 text-green-500 font-bold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      60 Days
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-neutral-600">30 Days or None</span>
                  </td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="p-4 font-semibold text-neutral-300">Subscription Benefits</td>
                  <td className="p-4 text-center bg-accent/5">
                    <span className="inline-flex items-center gap-1 text-green-500 font-bold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Up to 25% Off
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-neutral-600">5-10% Off</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-300">Customer Support</td>
                  <td className="p-4 text-center bg-accent/5 rounded-b-2xl">
                    <span className="inline-flex items-center gap-1 text-green-500 font-bold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      24/7 Live Chat
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-neutral-600">Email Only</span>
                  </td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-300 mb-6 text-lg">
              <span className="font-bold text-accent">98% of customers</span> say they'd recommend DFRNT to a friend
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent-dark">
              Experience The Difference
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ Section - Address Objections */}
      <div className="relative bg-black py-20 border-t border-neutral-800">
        <div className="mx-auto max-w-[900px] px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-display text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                Questions
              </span>
            </h2>
            <p className="text-xl text-neutral-300">Everything you need to know</p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="group p-5 sm:p-6 rounded-2xl bg-brand-jet-graphite border border-neutral-800 hover:border-accent/30 active:border-accent/50 transition-all touch-manipulation">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-bold text-neutral-50 text-base sm:text-lg pr-4">How long until I see results?</h3>
                <ChevronRight className="h-5 w-5 text-neutral-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-neutral-300 leading-relaxed">
                Most customers report noticeable improvements within 7-14 days. However, for best results, we recommend consistent use for at least 30 days. Everyone's body is different, so individual results may vary. Our 60-day money-back guarantee ensures you can try risk-free.
              </p>
            </details>

            {/* FAQ Item 2 */}
            <details className="group p-6 rounded-2xl bg-brand-jet-graphite border border-neutral-800 hover:border-accent/30 transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-bold text-neutral-50 text-lg">Is this safe to take with other supplements?</h3>
                <ChevronRight className="h-5 w-5 text-neutral-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-neutral-300 leading-relaxed">
                Our products are formulated with safety in mind and use clinically-tested ingredients. While generally safe, we always recommend consulting with your healthcare provider before combining supplements, especially if you're taking prescription medications or have pre-existing conditions.
              </p>
            </details>

            {/* FAQ Item 3 */}
            <details className="group p-6 rounded-2xl bg-brand-jet-graphite border border-neutral-800 hover:border-accent/30 transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-bold text-neutral-50 text-lg">Can I cancel my subscription anytime?</h3>
                <ChevronRight className="h-5 w-5 text-neutral-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-neutral-300 leading-relaxed">
                Absolutely! You have complete control over your subscription. Cancel, pause, or modify your delivery schedule anytime from your account dashboard. No questions asked, no cancellation fees. We're confident you'll love the product, but we understand flexibility is important.
              </p>
            </details>

            {/* FAQ Item 4 */}
            <details className="group p-6 rounded-2xl bg-brand-jet-graphite border border-neutral-800 hover:border-accent/30 transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-bold text-neutral-50 text-lg">What's your return policy?</h3>
                <ChevronRight className="h-5 w-5 text-neutral-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-neutral-300 leading-relaxed">
                We offer a 60-day money-back guarantee. If you're not completely satisfied with your purchase, contact us within 60 days for a full refund—no questions asked. We'll even cover return shipping. Your satisfaction is our priority.
              </p>
            </details>

            {/* FAQ Item 5 */}
            <details className="group p-6 rounded-2xl bg-brand-jet-graphite border border-neutral-800 hover:border-accent/30 transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-bold text-neutral-50 text-lg">How is DFRNT different from other brands?</h3>
                <ChevronRight className="h-5 w-5 text-neutral-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-neutral-300 leading-relaxed">
                We're radically transparent. Every ingredient, dosage, and source is disclosed—no proprietary blends. Our formulations are based on peer-reviewed research and clinically effective doses. Plus, we manufacture in FDA-registered, GMP-certified facilities. Quality over everything.
              </p>
            </details>

            {/* FAQ Item 6 */}
            <details className="group p-6 rounded-2xl bg-brand-jet-graphite border border-neutral-800 hover:border-accent/30 transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-bold text-neutral-50 text-lg">Do you ship internationally?</h3>
                <ChevronRight className="h-5 w-5 text-neutral-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-neutral-300 leading-relaxed">
                Currently, we ship within the United States only. Free shipping on orders over $75 with delivery in 2-3 business days. International shipping is coming soon—sign up for our newsletter to be notified when it's available.
              </p>
            </details>
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-400 mb-4">Still have questions?</p>
            <Button variant="outline" size="lg">
              Contact Our Support Team
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive Ingredients Visualization - Science-Backed Formula */}
      <div className="relative bg-gradient-to-b from-black via-brand-jet-graphite to-black py-20 border-t border-neutral-800">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <InteractiveIngredients ingredients={mockIngredients.foundation} />
        </div>
      </div>

      {/* Benefits Timeline - Expected Results Week by Week */}
      <div className="relative bg-black py-20 border-t border-neutral-800">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <BenefitsTimeline 
            phases={mockBenefitsTimeline.foundation}
            productName={product.name}
          />
        </div>
      </div>

      {/* Before/After Results Slider */}
      <div className="relative bg-gradient-to-b from-black via-brand-jet-graphite to-black py-20 border-t border-neutral-800">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop"
            afterImage="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&h=800&fit=crop"
            title="Real Results from Real People"
            description="See the transformation our customers experience. These are actual before and after photos from verified customers who consistently used DFRNT Foundation for 8+ weeks."
            timeframe="8 weeks"
          />
        </div>
      </div>

      {/* Frequently Bought Together - Smart Bundle Recommendations */}
      {frequentlyBoughtTogether.length > 0 && (
        <div className="relative bg-black py-16 border-t border-neutral-800">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <FrequentlyBoughtTogether
              currentProduct={product}
              suggestedProducts={frequentlyBoughtTogether}
            />
          </div>
        </div>
      )}

      {/* You May Also Like - Cross-Sell Carousel */}
      {youMayAlsoLike.length > 0 && (
        <div className="relative bg-black border-t border-neutral-800">
          <YouMayAlsoLike products={youMayAlsoLike} />
        </div>
      )}

      {/* Volume Pricing - Buy More Save More */}
      <VolumePricing
        basePrice={product.price}
        productName={product.name}
        productId={product.id}
        onAddToCart={(quantity) => {
          for (let i = 0; i < quantity; i++) {
            addItem(product, 1)
          }
          openCart()
        }}
      />

      {/* Subscription vs One-Time Comparison */}
      <SubscriptionComparison
        basePrice={product.price}
        subscriptionDiscount={getSubscriptionDiscount()}
        productName={product.name}
      />

      {/* Subscription Savings Calculator - ROI */}
      {purchaseType === 'subscribe' && (
        <div className="relative bg-brand-jet-graphite py-20 border-t border-neutral-800">
          <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="mb-4 font-display text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
                Your Annual{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                  Savings
                </span>
              </h2>
              <p className="text-xl text-neutral-300">See how much you save with a subscription</p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30">
              <div className="grid gap-8 md:grid-cols-3 mb-8">
                <div className="text-center">
                  <p className="text-neutral-400 mb-2 uppercase text-sm tracking-wider">One-Time Purchase</p>
                  <p className="font-display text-4xl font-bold text-neutral-50 mb-1">{formatPrice(product.price * 12)}</p>
                  <p className="text-xs text-neutral-500">Per year (12 months)</p>
                </div>
                <div className="text-center">
                  <p className="text-neutral-400 mb-2 uppercase text-sm tracking-wider">With Subscription</p>
                  <p className="font-display text-4xl font-bold text-accent mb-1">
                    {formatPrice(getSubscriptionPrice() * 12)}
                  </p>
                  <p className="text-xs text-neutral-500">Per year (12 deliveries)</p>
                </div>
                <div className="text-center">
                  <p className="text-neutral-400 mb-2 uppercase text-sm tracking-wider">You Save</p>
                  <p className="font-display text-4xl font-bold text-green-500 mb-1">
                    {formatPrice((product.price - getSubscriptionPrice()) * 12)}
                  </p>
                  <p className="text-xs text-green-400 font-bold">{getSubscriptionDiscount()}% discount</p>
                </div>
              </div>

              <div className="pt-8 border-t border-accent/20 text-center">
                <p className="text-lg text-neutral-300 mb-2">
                  That's like getting <span className="font-display text-2xl font-bold text-accent">{Math.floor(12 * (getSubscriptionDiscount() / 100))}</span> months FREE
                </p>
                <p className="text-sm text-neutral-400">Plus free shipping on every order</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upsell/Cross-sell - Bundle offers */}
      <div className="relative bg-brand-jet-graphite border-t border-neutral-800">
        <ProductUpsell 
          currentProductId={product.id}
          currentProductPrice={product.price}
        />
      </div>

    {/* Advanced Sticky Product Summary Bar - Enhanced CRO */}
    {showStickyButton && product.inStock && (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-brand-jet-graphite/98 to-black/98 backdrop-blur-xl border-t-2 border-accent/30 shadow-2xl shadow-accent/10 transition-all duration-500 animate-slide-up">
        {/* Glow Effect */}
        <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
        
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Product Info */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="relative h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-xl border-2 border-neutral-700 hover:border-accent/50 transition-all flex-shrink-0 group">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="64px"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="font-bold text-neutral-50 text-xs sm:text-sm line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2">
                  {purchaseType === 'subscribe' ? (
                    <>
                      <p className="font-display text-accent text-base sm:text-lg font-bold">
                        {formatPrice(getSubscriptionPrice())}
                      </p>
                      <span className="text-xs text-green-500 font-semibold hidden sm:inline">
                        Save {getSubscriptionDiscount()}%
                      </span>
                    </>
                  ) : (
                    <p className="font-display text-accent text-base sm:text-lg font-bold">
                      {formatPrice(product.price)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Purchase Type Toggle - Desktop Only */}
            <div className="hidden lg:flex items-center gap-2 bg-black/60 rounded-lg p-1 border border-neutral-700">
              <button
                onClick={() => setPurchaseType('onetime')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  purchaseType === 'onetime'
                    ? 'bg-neutral-700 text-neutral-50'
                    : 'text-neutral-400 hover:text-neutral-50'
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setPurchaseType('subscribe')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  purchaseType === 'subscribe'
                    ? 'bg-accent text-white'
                    : 'text-neutral-400 hover:text-neutral-50'
                }`}
              >
                Subscribe
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 bg-black/60 rounded-lg border border-neutral-700 hover:border-accent/50 transition-all">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-neutral-800 active:scale-95 transition-all text-neutral-50 rounded-l-lg touch-manipulation"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
              </button>
              <span className="w-6 sm:w-8 text-center font-bold text-sm text-neutral-50">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                className="p-2 hover:bg-neutral-800 active:scale-95 transition-all text-neutral-50 rounded-r-lg touch-manipulation"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart} 
              className="bg-accent hover:bg-accent-dark shadow-lg shadow-accent/30 hover:shadow-accent/50 active:scale-95 transition-all touch-manipulation whitespace-nowrap"
              size="sm"
            >
              <ShoppingCart className="mr-1 sm:mr-2 h-4 w-4 stroke-[2.5]" />
              <span className="hidden sm:inline font-bold">Add to Cart</span>
              <span className="sm:hidden font-bold">Add</span>
            </Button>
          </div>

          {/* Subscription Frequency - Expandable on Mobile */}
          {purchaseType === 'subscribe' && (
            <div className="mt-2 pt-2 border-t border-neutral-800 hidden lg:block animate-scale-in">
              <div className="flex items-center gap-2 justify-center">
                <span className="text-xs text-neutral-400">Delivery:</span>
                {subscriptionTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedFrequency(tier.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      selectedFrequency === tier.id
                        ? 'bg-accent/20 text-accent border border-accent/50'
                        : 'bg-black/40 text-neutral-400 border border-neutral-700 hover:border-neutral-600'
                    }`}
                  >
                    {tier.label.replace('Every ', '')}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Scroll to Top Button - Mobile Enhancement */}
    {showScrollTop && (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-6 z-50 p-4 rounded-full bg-accent hover:bg-accent-dark shadow-lg shadow-accent/30 text-white transition-all hover:scale-110 active:scale-95 touch-manipulation"
        aria-label="Scroll to top"
      >
        <ChevronRight className="h-5 w-5 -rotate-90" />
      </button>
    )}

    {/* Exit Intent - Cart Abandonment Prevention */}
    <ProductExitIntentHandler
      productId={product.id}
      productName={product.name}
      productPrice={product.price}
      productImage={product.images[0]}
      onAddToCart={handleAddToCart}
    />
  </>
  )
}

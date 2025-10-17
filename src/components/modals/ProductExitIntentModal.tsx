'use client'

import { useState, useEffect } from 'react'
import { X, Gift, ShoppingCart, Star, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

interface ProductExitIntentModalProps {
  productId: string
  productName: string
  productPrice: number
  productImage: string
  onClose: () => void
  onAddToCart: () => void
}

export function ProductExitIntentModal({
  productId,
  productName,
  productPrice,
  productImage,
  onClose,
  onAddToCart,
}: ProductExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [discountCode] = useState('FIRSTORDER10')
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  useEffect(() => {
    // Show modal with slight delay for animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const handleAddToCartWithDiscount = () => {
    onAddToCart()
    handleClose()
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In production, send email to backend for abandoned cart recovery
      console.log('Email captured for cart abandonment:', email)
      setEmailSubmitted(true)
      
      // Auto-close after 2 seconds
      setTimeout(handleClose, 2000)
    }
  }

  const discountAmount = productPrice * 0.1

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-brand-jet-graphite to-black shadow-2xl shadow-accent/20 transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Accent Glow */}
        <div className="absolute -inset-1 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-xl opacity-50 -z-10"></div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-neutral-400 hover:bg-black hover:text-neutral-50 transition-all hover:rotate-90"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 stroke-[2.5]" />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {!emailSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 border-2 border-accent/50 animate-pulse">
                  <Gift className="h-7 w-7 text-accent stroke-[2.5]" />
                </div>
                <h2 className="mb-2 font-display text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight">
                  Wait! Special Offer 🎉
                </h2>
                <p className="text-base text-neutral-300">
                  Get <span className="font-bold text-accent">10% OFF</span> your first order
                </p>
              </div>

              {/* Product Preview */}
              <div className="mb-6 p-4 rounded-xl bg-black/40 border border-neutral-800">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-neutral-700 flex-shrink-0">
                    <Image
                      src={productImage}
                      alt={productName}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-50 text-sm sm:text-base mb-1 line-clamp-2">
                      {productName}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                        ))}
                      </div>
                      <span className="text-xs text-neutral-400">(4.9)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg font-bold text-accent">
                        {formatPrice(productPrice - discountAmount)}
                      </span>
                      <span className="text-sm text-neutral-500 line-through">
                        {formatPrice(productPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offer Details */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span><strong className="text-neutral-50">Save {formatPrice(discountAmount)}</strong> instantly</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Free shipping on orders over $75</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>60-day money-back guarantee</span>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mb-6 p-4 rounded-lg border-2 border-dashed border-accent/50 bg-accent/5 text-center">
                <p className="text-xs text-neutral-400 mb-1 uppercase tracking-wider">Your Exclusive Code</p>
                <p className="font-mono text-xl font-bold text-accent tracking-wider">{discountCode}</p>
                <p className="text-xs text-neutral-400 mt-1">Applied automatically at checkout</p>
              </div>

              {/* Email Capture Form */}
              <form onSubmit={handleEmailSubmit} className="mb-4">
                <label className="block text-sm font-semibold text-neutral-300 mb-2">
                  Get reminder email (optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-black border border-neutral-700 text-neutral-50 placeholder:text-neutral-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                  <Button type="submit" variant="outline" size="sm" className="border-neutral-700">
                    Save
                  </Button>
                </div>
              </form>

              {/* CTA */}
              <Button
                onClick={handleAddToCartWithDiscount}
                size="lg"
                className="w-full bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/30 mb-3"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Claim Discount & Add to Cart
              </Button>

              {/* Timer */}
              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                <Clock className="h-4 w-4 text-accent" />
                <span>This offer expires in <strong className="text-accent">5 minutes</strong></span>
              </div>
            </>
          ) : (
            // Thank You State
            <div className="text-center py-8">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/50">
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-neutral-50 mb-2">
                Thank You!
              </h3>
              <p className="text-neutral-300">
                We'll send you a reminder about your discount code.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

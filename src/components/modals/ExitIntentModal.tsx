'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Truck, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

interface ExitIntentModalProps {
  cartTotal: number
  cartItemCount: number
  onClose: () => void
  onContinueShopping: () => void
}

export function ExitIntentModal({
  cartTotal,
  cartItemCount,
  onClose,
  onContinueShopping,
}: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [discountCode] = useState('COMEBACK10')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Show modal with slight delay for animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(discountCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const freeShippingRemaining = Math.max(0, 75 - cartTotal)
  const discountAmount = cartTotal * 0.1

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl rounded-xl border border-accent/30 bg-brand-jet-graphite shadow-2xl shadow-accent/10 transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-neutral-400 hover:bg-black hover:text-neutral-50 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 stroke-[2]" />
        </button>

        {/* Content */}
        <div className="p-8 sm:p-12">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/30">
              <Gift className="h-8 w-8 text-accent stroke-[2]" />
            </div>
            <h2 className="mb-3 font-display text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
              Wait! Don't Leave Yet
            </h2>
            <p className="text-lg text-neutral-300">
              You're about to abandon{' '}
              <span className="font-bold text-accent">{cartItemCount}</span>{' '}
              {cartItemCount === 1 ? 'item' : 'items'} worth{' '}
              <span className="font-bold text-accent">{formatPrice(cartTotal)}</span>
            </p>
          </div>

          {/* Offer */}
          <div className="mb-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="mb-2 font-bold text-neutral-50 text-lg">
                  Here's <span className="text-accent">10% OFF</span> Your Order
                </h3>
                <p className="text-sm text-neutral-300 mb-4">
                  Complete your purchase now and save{' '}
                  <span className="font-bold text-accent">{formatPrice(discountAmount)}</span>
                </p>
                
                {/* Discount Code */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-lg border-2 border-dashed border-accent/50 bg-black px-4 py-3">
                    <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">
                      Discount Code
                    </p>
                    <p className="font-mono text-xl font-bold text-accent tracking-wider">
                      {discountCode}
                    </p>
                  </div>
                  <Button
                    onClick={handleCopyCode}
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-white"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Incentives */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {/* Free Shipping */}
            {freeShippingRemaining > 0 ? (
              <div className="flex items-start gap-3 rounded-lg border border-neutral-800 bg-black p-4">
                <Truck className="h-5 w-5 text-accent stroke-[2] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-neutral-50 mb-1">
                    Almost Free Shipping!
                  </p>
                  <p className="text-xs text-neutral-400">
                    Add {formatPrice(freeShippingRemaining)} more
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
                <Truck className="h-5 w-5 text-accent stroke-[2] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-accent mb-1">
                    Free Shipping!
                  </p>
                  <p className="text-xs text-neutral-400">
                    Qualified for free delivery
                  </p>
                </div>
              </div>
            )}

            {/* 30-Day Returns */}
            <div className="flex items-start gap-3 rounded-lg border border-neutral-800 bg-black p-4">
              <Gift className="h-5 w-5 text-accent stroke-[2] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-neutral-50 mb-1">
                  30-Day Returns
                </p>
                <p className="text-xs text-neutral-400">
                  Risk-free guarantee
                </p>
              </div>
            </div>

            {/* Limited Time */}
            <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
              <Clock className="h-5 w-5 text-accent stroke-[2] mt-0.5 flex-shrink-0 animate-pulse" />
              <div>
                <p className="text-sm font-bold text-accent mb-1">
                  Limited Time
                </p>
                <p className="text-xs text-neutral-400">
                  Offer expires in 15 min
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onContinueShopping}
              size="lg"
              className="flex-1 h-14"
            >
              Complete My Order
            </Button>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="lg"
              className="flex-1 border border-neutral-700 hover:border-accent h-14"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Small Print */}
          <p className="mt-6 text-center text-xs text-neutral-500">
            * Discount code valid for 15 minutes. One-time use only.
          </p>
        </div>
      </div>
    </div>
  )
}

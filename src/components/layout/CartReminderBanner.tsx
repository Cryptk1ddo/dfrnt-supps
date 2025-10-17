'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/domains/cart/stores/useCartStore'
import { formatPrice } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export function CartReminderBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const { items, total, openCart } = useCartStore()
  const pathname = usePathname()

  useEffect(() => {
    // Don't show on checkout or cart pages
    if (pathname === '/checkout' || pathname === '/checkout/confirmation') {
      setIsVisible(false)
      return
    }

    // Check if user has items in cart and hasn't dismissed the banner
    const dismissed = sessionStorage.getItem('dfrnt-cart-reminder-dismissed')
    
    if (items.length > 0 && !dismissed) {
      // Show banner after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [items.length, pathname])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem('dfrnt-cart-reminder-dismissed', 'true')
  }

  const handleViewCart = () => {
    openCart()
    setIsVisible(false)
  }

  if (!isVisible || isDismissed || items.length === 0) {
    return null
  }

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 animate-slide-down">
      <div className="relative rounded-xl border-2 border-accent/50 bg-brand-jet-graphite/95 backdrop-blur-lg shadow-lg shadow-accent/20 p-4">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 via-accent/10 to-accent/30 blur-lg opacity-50 -z-10"></div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute -right-2 -top-2 p-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-neutral-50 hover:border-accent/50 transition-all"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 border-2 border-accent/50 flex items-center justify-center relative">
            <ShoppingCart className="h-6 w-6 text-accent stroke-[2]" />
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
              <span className="text-xs font-bold text-white">{items.length}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-neutral-50 text-sm mb-0.5">
              You have {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
            <p className="text-xs text-neutral-400">
              Total: <span className="font-bold text-accent">{formatPrice(total())}</span>
            </p>
          </div>

          <Button
            onClick={handleViewCart}
            size="sm"
            className="bg-accent hover:bg-accent-dark text-white whitespace-nowrap"
          >
            View Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

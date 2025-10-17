'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, MapPin, X } from 'lucide-react'

interface Purchase {
  id: string
  customerName: string
  location: string
  productName: string
  timeAgo: string
}

const mockPurchases: Purchase[] = [
  { id: '1', customerName: 'Sarah M.', location: 'New York, NY', productName: 'Nootropic Stack', timeAgo: '2 minutes ago' },
  { id: '2', customerName: 'Michael R.', location: 'Los Angeles, CA', productName: 'Blue Light Glasses', timeAgo: '5 minutes ago' },
  { id: '3', customerName: 'Jessica T.', location: 'Chicago, IL', productName: 'Sleep Support', timeAgo: '8 minutes ago' },
  { id: '4', customerName: 'David K.', location: 'Austin, TX', productName: 'Energy Blend', timeAgo: '12 minutes ago' },
  { id: '5', customerName: 'Emily Chen', location: 'Seattle, WA', productName: 'Focus Formula', timeAgo: '15 minutes ago' },
  { id: '6', customerName: 'James L.', location: 'Miami, FL', productName: 'Recovery Stack', timeAgo: '18 minutes ago' },
]

export function LivePurchaseNotifications() {
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [purchaseIndex, setPurchaseIndex] = useState(0)

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialDelay = setTimeout(() => {
      setCurrentPurchase(mockPurchases[0])
      setIsVisible(true)
    }, 5000)

    return () => clearTimeout(initialDelay)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Hide notification after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    // Show next notification after 8 seconds (3 seconds gap)
    const nextTimer = setTimeout(() => {
      const nextIndex = (purchaseIndex + 1) % mockPurchases.length
      setPurchaseIndex(nextIndex)
      setCurrentPurchase(mockPurchases[nextIndex])
      setIsVisible(true)
    }, 8000)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(nextTimer)
    }
  }, [isVisible, purchaseIndex])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!currentPurchase) return null

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 max-w-sm transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="relative rounded-xl border border-accent/30 bg-brand-jet-graphite/95 backdrop-blur-lg shadow-2xl shadow-accent/20 p-4 pr-12">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent blur-lg opacity-50 -z-10 rounded-xl"></div>

        {/* Animated Pulse Border */}
        <div className="absolute inset-0 rounded-xl border border-accent/0 animate-ping opacity-20"></div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 rounded-full text-neutral-400 hover:text-neutral-50 hover:bg-black/40 transition-all"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-accent stroke-[2]" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-neutral-50 mb-1">
              <span className="text-accent">{currentPurchase.customerName}</span> just purchased
            </p>
            <p className="text-sm text-neutral-300 mb-2 line-clamp-1">
              {currentPurchase.productName}
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <MapPin className="h-3 w-3" />
              <span>{currentPurchase.location}</span>
              <span>•</span>
              <span>{currentPurchase.timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/50 backdrop-blur-sm">
          <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Verified</span>
        </div>
      </div>
    </div>
  )
}

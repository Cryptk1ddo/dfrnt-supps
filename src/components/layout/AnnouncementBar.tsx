'use client'

import { Truck, Shield, Zap } from 'lucide-react'
import { useState } from 'react'
import { X } from 'lucide-react'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-accent text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-8 px-6 py-2.5 text-sm font-semibold">
        {/* Main message */}
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 stroke-[2]" />
          <span className="uppercase tracking-wide">Free Shipping on Orders $75+</span>
        </div>

        {/* Secondary trust signals - hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs">
            <Shield className="h-3.5 w-3.5 stroke-[2]" />
            <span>30-Day Returns</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Zap className="h-3.5 w-3.5 stroke-[2]" />
            <span>Science-Backed</span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-75 transition-opacity"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4 stroke-[2]" />
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Truck, Sparkles } from 'lucide-react'

interface FreeShippingProgressProps {
  currentTotal: number
  freeShippingThreshold?: number
  className?: string
}

export function FreeShippingProgress({
  currentTotal,
  freeShippingThreshold = 75,
  className = '',
}: FreeShippingProgressProps) {
  const [progress, setProgress] = useState(0)
  const remaining = Math.max(0, freeShippingThreshold - currentTotal)
  const targetProgress = Math.min(100, (currentTotal / freeShippingThreshold) * 100)
  const hasReachedThreshold = currentTotal >= freeShippingThreshold

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => {
      setProgress(targetProgress)
    }, 100)

    return () => clearTimeout(timer)
  }, [targetProgress])

  if (currentTotal === 0) return null

  return (
    <div className={`${className}`}>
      <div className="relative">
        {/* Progress Bar Container */}
        <div className="relative h-3 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
          {/* Progress Fill */}
          <div
            className={`h-full transition-all duration-1000 ease-out rounded-full ${
              hasReachedThreshold
                ? 'bg-gradient-to-r from-green-500 to-green-400'
                : 'bg-gradient-to-r from-accent-dark via-accent to-accent-light'
            }`}
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>

          {/* Truck Icon - Moves with progress */}
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
            style={{ left: `${Math.min(progress, 95)}%` }}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
              hasReachedThreshold ? 'bg-green-500 animate-bounce' : 'bg-accent'
            }`}>
              <Truck className="h-3 w-3 text-white stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mt-3 text-center">
          {hasReachedThreshold ? (
            <div className="flex items-center justify-center gap-2 text-green-500 font-bold animate-scale-in">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm">You've unlocked FREE SHIPPING! 🎉</span>
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
          ) : (
            <p className="text-sm text-neutral-400">
              Add <span className="font-bold text-accent">${remaining.toFixed(2)}</span> more to unlock{' '}
              <span className="font-bold text-neutral-50">FREE SHIPPING</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

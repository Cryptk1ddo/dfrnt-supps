'use client'

import { useState } from 'react'
import { RefreshCw, Calendar, DollarSign, TrendingUp, Check, X } from 'lucide-react'

interface SubscriptionComparisonProps {
  basePrice: number
  subscriptionDiscount: number
  productName: string
}

/**
 * Subscription vs One-Time Comparison Component
 * 
 * Animated flip card showing savings comparison
 * Expected Impact: +25-35% subscription adoption rate
 * 
 * Features:
 * - Interactive flip card animation
 * - Annual savings calculator
 * - Feature comparison matrix
 * - Visual ROI presentation
 */
export function SubscriptionComparison({
  basePrice,
  subscriptionDiscount,
  productName,
}: SubscriptionComparisonProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const subscriptionPrice = basePrice * (1 - subscriptionDiscount / 100)
  const annualSavings = (basePrice - subscriptionPrice) * 12
  const freeMonths = Math.floor((annualSavings / basePrice) * 10) / 10

  return (
    <section className="relative bg-gradient-to-br from-brand-jet-graphite via-black to-brand-jet-graphite py-16 border-t border-neutral-800">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-4">
            <RefreshCw className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-accent">Smart Savings</span>
          </div>
          <h2 className="mb-4 font-display text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight">
            Subscribe &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              Save Big
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Compare one-time purchase vs subscription and see how much you'll save annually
          </p>
        </div>

        {/* Flip Card Container */}
        <div className="perspective-1000 mb-12">
          <div
            className={`
              relative w-full transition-transform duration-700 transform-style-3d cursor-pointer
              ${isFlipped ? 'rotate-y-180' : ''}
            `}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front Side - Visual Comparison */}
            <div
              className={`
                backface-hidden
                ${isFlipped ? 'invisible' : 'visible'}
              `}
            >
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-3xl p-8 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* One-Time Purchase */}
                  <div className="bg-black/40 rounded-2xl p-6 border border-neutral-800">
                    <div className="text-center mb-6">
                      <div className="text-sm text-neutral-400 uppercase tracking-wider mb-2">
                        One-Time Purchase
                      </div>
                      <div className="text-5xl font-display font-bold text-neutral-50 mb-2">
                        ${basePrice.toFixed(2)}
                      </div>
                      <div className="text-sm text-neutral-500">per bottle</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Check className="w-4 h-4 text-neutral-500" />
                        <span>Buy once, ship once</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <X className="w-4 h-4 text-neutral-600" />
                        <span>No automatic discounts</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <X className="w-4 h-4 text-neutral-600" />
                        <span>Remember to reorder</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <X className="w-4 h-4 text-neutral-600" />
                        <span>Pay shipping each time</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-neutral-800">
                      <div className="text-center">
                        <div className="text-xs text-neutral-500 mb-1">Annual Cost</div>
                        <div className="text-2xl font-bold text-neutral-50">
                          ${(basePrice * 12).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subscription */}
                  <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl p-6 border-2 border-accent relative overflow-hidden">
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
                    
                    <div className="relative">
                      <div className="absolute -top-3 -right-3">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          SAVE {subscriptionDiscount}%
                        </div>
                      </div>

                      <div className="text-center mb-6">
                        <div className="text-sm text-accent uppercase tracking-wider mb-2 font-bold">
                          Subscribe & Save
                        </div>
                        <div className="text-5xl font-display font-bold text-neutral-50 mb-2">
                          ${subscriptionPrice.toFixed(2)}
                        </div>
                        <div className="text-sm text-neutral-300">
                          per bottle{' '}
                          <span className="text-green-400 font-semibold">
                            (${(basePrice - subscriptionPrice).toFixed(2)} off)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-neutral-200">
                          <Check className="w-4 h-4 text-accent stroke-[2.5]" />
                          <span className="font-medium">Automatic {subscriptionDiscount}% discount</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-200">
                          <Check className="w-4 h-4 text-accent stroke-[2.5]" />
                          <span className="font-medium">Never run out</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-200">
                          <Check className="w-4 h-4 text-accent stroke-[2.5]" />
                          <span className="font-medium">Free shipping always</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-200">
                          <Check className="w-4 h-4 text-accent stroke-[2.5]" />
                          <span className="font-medium">Cancel anytime</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-accent/30">
                        <div className="text-center">
                          <div className="text-xs text-neutral-400 mb-1">Annual Cost</div>
                          <div className="text-2xl font-bold text-accent">
                            ${(subscriptionPrice * 12).toFixed(2)}
                          </div>
                          <div className="text-xs text-green-400 font-bold mt-1">
                            Save ${annualSavings.toFixed(2)}/year
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flip Indicator */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="text-sm text-neutral-400 hover:text-accent transition-colors flex items-center gap-2 mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Click to see annual breakdown
                  </button>
                </div>
              </div>
            </div>

            {/* Back Side - Annual Breakdown */}
            <div
              className={`
                absolute inset-0 backface-hidden rotate-y-180
                ${isFlipped ? 'visible' : 'invisible'}
              `}
            >
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-3xl p-8 shadow-2xl h-full">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-display font-bold text-neutral-50 mb-2">
                    Annual Savings Breakdown
                  </h3>
                  <p className="text-neutral-400">Your financial advantage with a subscription</p>
                </div>

                <div className="space-y-6 max-w-2xl mx-auto">
                  {/* Total Spent */}
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-neutral-800">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-neutral-400" />
                      <div>
                        <div className="text-sm text-neutral-400">Total Spent (12 months)</div>
                        <div className="text-xl font-bold text-neutral-50">
                          One-Time: ${(basePrice * 12).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-400">vs Subscription</div>
                      <div className="text-xl font-bold text-accent">
                        ${(subscriptionPrice * 12).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Annual Savings */}
                  <div className="p-6 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl border-2 border-green-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-8 h-8 text-green-400" />
                      <div className="text-sm text-green-400 font-semibold uppercase tracking-wider">
                        Your Annual Savings
                      </div>
                    </div>
                    <div className="text-5xl font-display font-bold text-green-400 mb-2">
                      ${annualSavings.toFixed(2)}
                    </div>
                    <div className="text-neutral-300">
                      That's like getting <span className="font-bold text-accent">{freeMonths} months FREE</span>
                    </div>
                  </div>

                  {/* Monthly Savings */}
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-neutral-800">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-accent" />
                      <div>
                        <div className="text-sm text-neutral-400">Monthly Savings</div>
                        <div className="text-xl font-bold text-accent">
                          ${((annualSavings) / 12).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-400">
                      {subscriptionDiscount}% off
                    </div>
                  </div>
                </div>

                {/* Flip Back */}
                <div className="text-center mt-8">
                  <button
                    onClick={() => setIsFlipped(false)}
                    className="text-sm text-neutral-400 hover:text-accent transition-colors flex items-center gap-2 mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Click to flip back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-brand-jet-graphite border border-neutral-800 rounded-xl p-6 text-center">
            <div className="text-4xl font-display font-bold text-accent mb-2">
              {subscriptionDiscount}%
            </div>
            <div className="text-sm text-neutral-400">Automatic Discount</div>
          </div>

          <div className="bg-brand-jet-graphite border border-neutral-800 rounded-xl p-6 text-center">
            <div className="text-4xl font-display font-bold text-green-400 mb-2">
              ${annualSavings.toFixed(0)}
            </div>
            <div className="text-sm text-neutral-400">Annual Savings</div>
          </div>

          <div className="bg-brand-jet-graphite border border-neutral-800 rounded-xl p-6 text-center">
            <div className="text-4xl font-display font-bold text-accent mb-2">
              {freeMonths}
            </div>
            <div className="text-sm text-neutral-400">Free Months</div>
          </div>
        </div>
      </div>
    </section>
  )
}

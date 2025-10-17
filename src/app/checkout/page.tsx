'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCheckoutStore, CheckoutStep } from '@/domains/checkout/stores/useCheckoutStore'
import { useCartStore } from '@/domains/cart/stores/useCartStore'
import { ShippingForm } from '@/domains/checkout/components/ShippingForm'
import { PaymentForm } from '@/domains/checkout/components/PaymentForm'
import { OrderReview } from '@/domains/checkout/components/OrderReview'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { Check, Lock, Shield, CreditCard, Truck } from 'lucide-react'

const steps: { id: CheckoutStep; label: string }[] = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { currentStep, orderSummary, calculateOrderSummary } = useCheckoutStore()
  const { items, total } = useCartStore()

  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      router.push('/products')
      return
    }

    // Calculate order summary
    calculateOrderSummary(total())
  }, [items, total, calculateOrderSummary, router])

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="mb-4 font-display text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight">
          Checkout
        </h1>
        <p className="text-lg text-neutral-300 leading-relaxed-reading">
          Complete your order in just a few steps
        </p>
      </div>

      {/* Progress Steps - Red-orange accent for progress */}
      <div className="mb-16">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isCurrent = step.id === currentStep
            const isUpcoming = index > currentStepIndex

            return (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex items-center gap-3">
                  {/* Step Circle */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isCompleted
                        ? 'border-accent bg-accent text-white'
                        : isCurrent
                        ? 'border-accent bg-black shadow-accent'
                        : 'border-neutral-700 bg-brand-jet-graphite'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-6 w-6 stroke-[2]" />
                    ) : (
                      <span
                        className={`text-sm font-bold ${
                          isCurrent ? 'text-accent' : 'text-neutral-500'
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Step Label */}
                  <span
                    className={`text-sm font-bold uppercase tracking-wide ${
                      isCurrent ? 'text-neutral-50' : isCompleted ? 'text-neutral-400' : 'text-neutral-600'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="mx-4 flex-1">
                    <div
                      className={`h-1 rounded-full ${
                        isCompleted ? 'bg-accent' : 'bg-neutral-800'
                      } transition-all`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-12 lg:grid-cols-3">
        {/* Checkout Forms */}
        <div className="lg:col-span-2">
          {currentStep === 'shipping' && <ShippingForm />}
          {currentStep === 'payment' && <PaymentForm />}
          {currentStep === 'review' && <OrderReview />}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="border border-neutral-800 rounded-lg bg-brand-jet-graphite p-8">
              <h3 className="mb-6 font-display text-2xl font-bold text-neutral-50 tracking-tight">
                Order Summary
              </h3>
              <div className="mb-6 space-y-4 border-b border-neutral-800 pb-6">
                <div className="flex justify-between text-sm text-neutral-300">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-semibold">{formatPrice(orderSummary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-300">
                  <span>Shipping</span>
                  <span>
                    {orderSummary.shipping === 0 ? (
                      <Badge variant="success" className="text-xs bg-accent text-white border-none">
                        FREE
                      </Badge>
                    ) : (
                      <span className="font-semibold">{formatPrice(orderSummary.shipping)}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-neutral-300">
                  <span>Tax</span>
                  <span className="font-semibold">{formatPrice(orderSummary.tax)}</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold uppercase tracking-wide text-neutral-50">Total</span>
                <span className="text-3xl font-bold text-accent">
                  {formatPrice(orderSummary.total)}
                </span>
              </div>

              {orderSummary.subtotal < 75 && orderSummary.subtotal > 0 && (
                <div className="mt-6 rounded-lg border border-accent/30 bg-accent/10 p-4">
                  <p className="text-sm text-accent font-semibold">
                    Add {formatPrice(75 - orderSummary.subtotal)} more for free shipping!
                  </p>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="mt-6 rounded-lg border border-neutral-800 bg-black p-6">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-4 w-4 text-accent stroke-[2]" />
                <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-50">
                  Secure Checkout
                </h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Your payment information is encrypted and secure. We never store your full card
                details.
              </p>
              
              {/* Payment Method Icons - CRO Trust Signals */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <CreditCard className="h-4 w-4 stroke-[2]" />
                  <span className="font-semibold">Visa</span>
                </div>
                <div className="h-4 w-px bg-neutral-700"></div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <CreditCard className="h-4 w-4 stroke-[2]" />
                  <span className="font-semibold">Mastercard</span>
                </div>
                <div className="h-4 w-px bg-neutral-700"></div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <CreditCard className="h-4 w-4 stroke-[2]" />
                  <span className="font-semibold">Amex</span>
                </div>
              </div>
            </div>

            {/* Estimated Delivery - CRO Enhancement */}
            <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-6">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-accent stroke-[2] mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-50 mb-1">
                    Estimated Delivery
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                    {' - '}
                    {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

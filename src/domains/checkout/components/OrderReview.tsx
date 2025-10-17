'use client'

import { useRouter } from 'next/navigation'
import { useCheckoutStore } from '../stores/useCheckoutStore'
import { useCartStore } from '@/domains/cart/stores/useCartStore'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { Package, CreditCard, MapPin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

export function OrderReview() {
  const router = useRouter()
  const { shippingInfo, paymentInfo, orderSummary, goToPreviousStep, resetCheckout } =
    useCheckoutStore()
  const { items, clearCart } = useCartStore()

  const handlePlaceOrder = async () => {
    // In a real app, this would make an API call to create the order
    // For now, we'll simulate it
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a mock order ID
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`

    // Clear cart and checkout
    clearCart()
    resetCheckout()

    // Redirect to confirmation page
    router.push(`/checkout/confirmation?orderId=${orderId}`)
  }

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-6 font-display text-2xl font-semibold text-gray-100">Order Items</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-dark-800 border border-dark-700">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-100">{item.product.name}</h3>
                    <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-neon-cyan">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-neon-cyan" />
            <h2 className="font-display text-xl font-semibold text-gray-100">
              Shipping Information
            </h2>
          </div>
          <div className="space-y-2 text-gray-300">
            <p>
              {shippingInfo.firstName} {shippingInfo.lastName}
            </p>
            <p>{shippingInfo.address}</p>
            {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
            <p>
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
            </p>
            <p>{shippingInfo.country}</p>
            <div className="mt-4 flex items-center gap-4 border-t border-dark-700 pt-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{shippingInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{shippingInfo.phone}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToPreviousStep()}
            className="mt-4 text-neon-cyan hover:text-neon-cyan"
          >
            Edit Shipping Info
          </Button>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-neon-cyan" />
            <h2 className="font-display text-xl font-semibold text-gray-100">Payment Method</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-dark-700 bg-dark-800">
              <CreditCard className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="text-gray-300">Card ending in {paymentInfo.cardNumber}</p>
              <p className="text-sm text-gray-500">{paymentInfo.cardName}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToPreviousStep()}
            className="mt-4 text-neon-cyan hover:text-neon-cyan"
          >
            Edit Payment Info
          </Button>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-6 font-display text-2xl font-semibold text-gray-100">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>{formatPrice(orderSummary.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>
              <span>
                {orderSummary.shipping === 0 ? (
                  <Badge variant="success" className="text-xs">
                    FREE
                  </Badge>
                ) : (
                  formatPrice(orderSummary.shipping)
                )}
              </span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Tax</span>
              <span>{formatPrice(orderSummary.tax)}</span>
            </div>
            <div className="border-t border-dark-700 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-100">Total</span>
                <span className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                  {formatPrice(orderSummary.total)}
                </span>
              </div>
            </div>
          </div>

          {orderSummary.shipping === 0 && (
            <div className="mt-4 rounded-lg border border-neon-green/20 bg-neon-green/5 p-3">
              <p className="text-sm text-neon-green">
                🎉 You've qualified for free shipping!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Place Order Button */}
      <div className="flex justify-between gap-4">
        <Button variant="outline" size="lg" onClick={goToPreviousStep}>
          Back to Payment
        </Button>
        <Button size="lg" onClick={handlePlaceOrder} className="min-w-[200px]">
          <Package className="mr-2 h-5 w-5" />
          Place Order
        </Button>
      </div>

      {/* Terms Notice */}
      <p className="text-center text-sm text-gray-500">
        By placing your order, you agree to our{' '}
        <a href="/terms" className="text-neon-cyan hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-neon-cyan hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}

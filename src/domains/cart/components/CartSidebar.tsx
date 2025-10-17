'use client'

import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/domains/cart/stores/useCartStore'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { useGsapSlide } from '@/hooks/useGsap'
import { FreeShippingProgress } from '@/components/ui/FreeShippingProgress'

export function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    tax,
    shipping,
    total,
    itemCount,
  } = useCartStore()

  const elementRef = useGsapSlide('right')

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-dark-900 shadow-2xl border-l border-dark-800"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dark-800 bg-dark-900/95 backdrop-blur-xl p-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-neon-cyan" />
              <h2 className="font-display text-xl font-semibold text-gray-100">
                Cart ({itemCount()})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="rounded-full p-2 text-gray-400 hover:bg-dark-800 hover:text-neon-cyan transition-all duration-300"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 bg-dark-950">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingCart className="mb-4 h-16 w-16 text-gray-600" />
                <h3 className="mb-2 font-display text-lg font-semibold text-gray-100">
                  Your cart is empty
                </h3>
                <p className="mb-6 text-sm text-gray-400">
                  Add some biohacking essentials to get started!
                </p>
                <Button onClick={closeCart} asChild>
                  <Link href="/products">Shop Now</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 rounded-lg border border-dark-800 bg-dark-900/50 p-4 hover:border-dark-700 transition-colors"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-dark-800 border border-dark-700">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="mb-1 font-medium text-gray-100 hover:text-neon-cyan line-clamp-1 transition-colors"
                        onClick={closeCart}
                      >
                        {item.product.name}
                      </Link>
                      <p className="mb-2 text-sm font-semibold text-neon-cyan">
                        {formatPrice(item.product.price)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="rounded-md border border-dark-700 bg-dark-800 p-1 hover:bg-dark-700 hover:border-neon-cyan transition-all"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3 text-gray-300" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-gray-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="rounded-md border border-dark-700 bg-dark-800 p-1 hover:bg-dark-700 hover:border-neon-cyan transition-all"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3 text-gray-300" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-dark-800 bg-dark-900/95 backdrop-blur-xl p-6">
              {/* Free Shipping Progress */}
              <FreeShippingProgress 
                currentTotal={subtotal()} 
                freeShippingThreshold={75}
                className="mb-6"
              />

              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-100">{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span className="font-medium text-gray-100">{formatPrice(tax())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="font-medium text-gray-100">
                    {shipping() === 0 ? <span className="text-neon-green">FREE</span> : formatPrice(shipping())}
                  </span>
                </div>
                <div className="border-t border-dark-800 pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-100">Total</span>
                    <span className="font-display text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                      {formatPrice(total())}
                    </span>
                  </div>
                </div>
              </div>

              <Button fullWidth size="lg" asChild>
                <Link href="/checkout" onClick={closeCart}>
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

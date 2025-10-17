'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Plus, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/domains/cart/stores/useCartStore'

interface UpsellProduct {
  id: string
  name: string
  price: number
  image: string
  slug: string
}

interface ProductUpsellProps {
  currentProductId: string
  currentProductPrice: number
}

export function ProductUpsell({ currentProductId, currentProductPrice }: ProductUpsellProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set([currentProductId]))
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)

  // Mock related products - in production, this would come from an API
  const relatedProducts: UpsellProduct[] = [
    {
      id: '2',
      name: 'Cognitive Stack',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      slug: 'cognitive-stack',
    },
    {
      id: '3',
      name: 'Blue-Light Glasses - Classic',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400',
      slug: 'blue-light-glasses-classic',
    },
    {
      id: '4',
      name: 'Recovery Stack',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
      slug: 'recovery-stack',
    },
  ]

  const toggleProduct = (productId: string) => {
    const newSelected = new Set(selectedItems)
    if (productId === currentProductId) return // Can't deselect main product
    
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedItems(newSelected)
  }

  const calculateTotal = () => {
    let total = currentProductPrice
    relatedProducts.forEach((product) => {
      if (selectedItems.has(product.id)) {
        total += product.price
      }
    })
    return total
  }

  const calculateSavings = () => {
    const itemCount = selectedItems.size
    if (itemCount >= 3) return calculateTotal() * 0.15 // 15% bundle discount
    if (itemCount >= 2) return calculateTotal() * 0.10 // 10% bundle discount
    return 0
  }

  const total = calculateTotal()
  const savings = calculateSavings()
  const finalPrice = total - savings

  const handleAddBundle = () => {
    // In production, would add all selected products
    openCart()
  }

  return (
    <div className="mt-24">
      <div className="border border-neutral-800 rounded-lg bg-brand-jet-graphite p-8">
        <div className="mb-8">
          <h2 className="mb-2 font-display text-3xl font-bold text-neutral-50 tracking-tight">
            Frequently Bought Together
          </h2>
          <p className="text-neutral-400">
            Complete your stack and <span className="text-accent font-bold">save up to 15%</span>
          </p>
        </div>

        {/* Product Selection Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Current Product - Always selected */}
          <div className="relative border-2 border-accent rounded-lg bg-black p-4">
            <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs border-none">
              Current
            </Badge>
            <div className="relative h-32 mb-3 rounded-lg overflow-hidden bg-neutral-900">
              <Image
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"
                alt="Current product"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <Check className="h-5 w-5 text-accent stroke-[2]" />
              <span className="text-sm font-bold text-accent">{formatPrice(currentProductPrice)}</span>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.map((product) => {
            const isSelected = selectedItems.has(product.id)
            return (
              <button
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className={`relative border-2 rounded-lg p-4 transition-all text-left hover:border-accent/50 ${
                  isSelected
                    ? 'border-accent bg-accent/5'
                    : 'border-neutral-700 bg-black'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-accent flex items-center justify-center">
                    <Check className="h-4 w-4 text-white stroke-[2]" />
                  </div>
                )}
                <div className="relative h-32 mb-3 rounded-lg overflow-hidden bg-neutral-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <h3 className="text-sm font-bold text-neutral-50 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <Plus className={`h-4 w-4 stroke-[2] ${isSelected ? 'text-accent' : 'text-neutral-400'}`} />
                  <span className={`text-sm font-bold ${isSelected ? 'text-accent' : 'text-neutral-400'}`}>
                    {formatPrice(product.price)}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Pricing Summary */}
        <div className="border-t border-neutral-800 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-neutral-400">Total for {selectedItems.size} items:</span>
                {savings > 0 && (
                  <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">
                    Save {formatPrice(savings)}
                  </Badge>
                )}
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-accent">
                  {formatPrice(finalPrice)}
                </span>
                {savings > 0 && (
                  <span className="text-lg text-neutral-500 line-through">
                    {formatPrice(total)}
                  </span>
                )}
              </div>
            </div>
            <Button 
              onClick={handleAddBundle}
              size="lg"
              disabled={selectedItems.size === 1}
              className="whitespace-nowrap"
            >
              <ShoppingCart className="mr-2 h-5 w-5 stroke-[2]" />
              Add Bundle to Cart
            </Button>
          </div>

          {/* Bundle Discount Tiers */}
          {selectedItems.size < 3 && (
            <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-sm text-neutral-300">
                {selectedItems.size === 1 ? (
                  <>Add <span className="text-accent font-bold">1 more item</span> to get <span className="text-accent font-bold">10% off</span></>
                ) : (
                  <>Add <span className="text-accent font-bold">1 more item</span> to get <span className="text-accent font-bold">15% off</span></>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

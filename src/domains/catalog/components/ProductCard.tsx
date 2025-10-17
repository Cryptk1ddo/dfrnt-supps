'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, TrendingUp, Zap, Heart, GitCompare } from 'lucide-react'
import type { Product } from '@/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/domains/cart/stores/useCartStore'
import { useWishlistStore } from '@/domains/wishlist/stores/useWishlistStore'
import { useComparisonStore } from '@/domains/catalog/stores/useComparisonStore'
import { useGsapScale } from '@/hooks/useGsap'

interface ProductCardProps {
  product: Product
  isBestSeller?: boolean
}

export function ProductCard({ product, isBestSeller }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlistStore()
  const { toggleItem: toggleComparison, isInComparison, openComparison } = useComparisonStore()
  const { elementRef, scaleIn, scaleOut } = useGsapScale()

  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0

  const inWishlist = isInWishlist(product.id)

  // CRO: Low stock warning threshold
  const isLowStock = product.inStock && product.inventory <= 10
  const isVeryLowStock = product.inStock && product.inventory <= 5

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, 1)
    openCart()
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className="group overflow-hidden rounded-lg border border-neutral-800 hover:border-accent transition-all duration-300 bg-brand-jet-graphite"
        onMouseEnter={scaleIn}
        onMouseLeave={scaleOut}
      >
        <div className="relative aspect-square overflow-hidden bg-black">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 saturate-50 group-hover:saturate-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Wishlist Button - CRO: Save for later */}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                slug: product.slug,
                inStock: product.inStock,
              })
            }}
            className="absolute top-3 left-3 z-10 p-2 rounded-full bg-black/80 backdrop-blur-sm border border-neutral-700 hover:border-accent transition-all group/wishlist"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart 
              className={`h-4 w-4 stroke-[2] transition-all ${
                inWishlist 
                  ? 'fill-accent text-accent' 
                  : 'text-neutral-400 group-hover/wishlist:text-accent'
              }`} 
            />
          </button>

          {/* Compare Button - CRO: Product comparison */}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleComparison({
                id: product.id,
                name: product.name,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
                image: product.images[0],
                slug: product.slug,
                category: product.category,
                shortDescription: product.shortDescription || '',
                benefits: product.benefits,
                ingredients: product.ingredients,
                features: product.features,
              })
            }}
            className="absolute top-14 left-3 z-10 p-2 rounded-full bg-black/80 backdrop-blur-sm border border-neutral-700 hover:border-accent transition-all group/compare"
            aria-label={isInComparison(product.id) ? 'Remove from comparison' : 'Add to comparison'}
          >
            <GitCompare 
              className={`h-4 w-4 stroke-[2] transition-all ${
                isInComparison(product.id)
                  ? 'fill-accent text-accent' 
                  : 'text-neutral-400 group-hover/compare:text-accent'
              }`} 
            />
          </button>
          
          {/* CRO: Best Seller Badge */}
          {isBestSeller && (
            <div className="absolute right-3 top-3 z-10">
              <Badge className="bg-accent text-white font-bold uppercase tracking-wide flex items-center gap-1">
                <TrendingUp className="h-3 w-3 stroke-[2]" />
                Best Seller
              </Badge>
            </div>
          )}
          
          {/* Discount Badge */}
          {discount > 0 && !isBestSeller && (
            <div className="absolute right-3 top-3 z-10">
              <Badge variant="danger" className="bg-black/80 backdrop-blur-sm text-accent border border-accent font-bold">
                Save {discount}%
              </Badge>
            </div>
          )}
          
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-10">
              <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 uppercase tracking-wide">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <Badge variant="default" className="text-xs uppercase tracking-wider bg-black text-accent border-accent/30">
              {product.category}
            </Badge>
            
            {/* CRO: Low stock urgency indicator */}
            {isVeryLowStock && (
              <span className="text-xs font-bold text-accent flex items-center gap-1">
                <Zap className="h-3 w-3 stroke-[2]" />
                Only {product.inventory} left!
              </span>
            )}
          </div>

          <h3 className="mb-2 font-sans text-lg font-bold uppercase tracking-wide text-neutral-50 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {product.shortDescription && (
            <p className="mb-4 text-sm text-neutral-400 line-clamp-2 leading-relaxed">{product.shortDescription}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-neutral-50">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-neutral-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <Button
              size="icon"
              variant="primary"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="shrink-0"
            >
              <ShoppingCart className="h-4 w-4 stroke-[2]" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

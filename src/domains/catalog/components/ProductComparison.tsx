'use client'

import { X, Check, Minus, ShoppingCart, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useComparisonStore } from '@/domains/catalog/stores/useComparisonStore'
import { useCartStore } from '@/domains/cart/stores/useCartStore'

export function ProductComparison() {
  const { items, isOpen, closeComparison, removeItem, clearComparison } = useComparisonStore()
  const addToCart = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)

  if (!isOpen) return null

  const handleAddToCart = (product: any) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.shortDescription,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        images: [product.image],
        category: product.category,
        shortDescription: product.shortDescription,
        inStock: true,
        inventory: 100,
        sku: `SKU-${product.id}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      1
    )
    openCart()
  }

  // Find longest array for row count
  const maxBenefits = Math.max(...items.map((item) => item.benefits?.length || 0))
  const maxIngredients = Math.max(...items.map((item) => item.ingredients?.length || 0))
  const maxFeatures = Math.max(...items.map((item) => item.features?.length || 0))

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-7xl max-h-[90vh] overflow-auto rounded-xl border border-neutral-800 bg-brand-jet-graphite shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-800 bg-brand-jet-graphite px-6 py-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-50 tracking-tight">
              Compare Products
            </h2>
            <p className="text-sm text-neutral-400">
              {items.length} of 3 products selected
            </p>
          </div>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearComparison} className="text-neutral-400">
                Clear All
              </Button>
            )}
            <button
              onClick={closeComparison}
              className="rounded-full p-2 text-neutral-400 hover:bg-black hover:text-neutral-50 transition-colors"
              aria-label="Close comparison"
            >
              <X className="h-5 w-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-6">
            <div className="mb-4 text-neutral-600">
              <ArrowRight className="h-16 w-16 stroke-[1.5]" />
            </div>
            <h3 className="mb-2 font-display text-xl font-bold text-neutral-50">
              No Products to Compare
            </h3>
            <p className="text-neutral-400 text-center max-w-md">
              Add products to compare by clicking the compare button on product cards
            </p>
            <Button onClick={closeComparison} className="mt-6">
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {/* Product Images & Basic Info */}
                <tr className="border-b border-neutral-800">
                  <td className="sticky left-0 bg-brand-jet-graphite p-4 font-bold text-neutral-50 uppercase text-sm tracking-wide w-48">
                    Product
                  </td>
                  {items.map((product) => (
                    <td key={product.id} className="p-4 min-w-[280px]">
                      <div className="relative">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="absolute -right-2 -top-2 z-10 rounded-full bg-black border border-neutral-700 p-1.5 hover:border-accent transition-colors"
                        >
                          <X className="h-4 w-4 text-neutral-400 hover:text-accent stroke-[2]" />
                        </button>
                        <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-black border border-neutral-800">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="280px"
                          />
                        </div>
                        <Link href={`/products/${product.slug}`} className="group">
                          <h3 className="font-bold text-neutral-50 mb-2 group-hover:text-accent transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <Badge className="bg-neutral-800 text-neutral-400 text-xs mb-2">
                          {product.category}
                        </Badge>
                        <p className="text-sm text-neutral-400 line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Price */}
                <tr className="border-b border-neutral-800 bg-black/30">
                  <td className="sticky left-0 bg-black/30 p-4 font-bold text-neutral-50 uppercase text-sm tracking-wide">
                    Price
                  </td>
                  {items.map((product) => {
                    const discount = product.compareAtPrice
                      ? calculateDiscount(product.price, product.compareAtPrice)
                      : 0
                    return (
                      <td key={product.id} className="p-4">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-2xl font-bold text-accent">
                            {formatPrice(product.price)}
                          </span>
                          {product.compareAtPrice && (
                            <>
                              <span className="text-sm text-neutral-500 line-through">
                                {formatPrice(product.compareAtPrice)}
                              </span>
                              <Badge className="bg-accent/10 text-accent text-xs border-accent/20">
                                Save {discount}%
                              </Badge>
                            </>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>

                {/* Benefits */}
                {maxBenefits > 0 && (
                  <>
                    <tr className="border-b border-neutral-800">
                      <td className="sticky left-0 bg-brand-jet-graphite p-4 font-bold text-neutral-50 uppercase text-sm tracking-wide">
                        Benefits
                      </td>
                      {items.map((product) => (
                        <td key={product.id} className="p-4">
                          <ul className="space-y-2">
                            {product.benefits && product.benefits.length > 0 ? (
                              product.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-neutral-300">
                                  <Check className="h-4 w-4 text-accent stroke-[2] mt-0.5 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))
                            ) : (
                              <li className="flex items-center gap-2 text-sm text-neutral-500">
                                <Minus className="h-4 w-4 stroke-[2]" />
                                <span>No benefits listed</span>
                              </li>
                            )}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </>
                )}

                {/* Ingredients */}
                {maxIngredients > 0 && (
                  <tr className="border-b border-neutral-800 bg-black/30">
                    <td className="sticky left-0 bg-black/30 p-4 font-bold text-neutral-50 uppercase text-sm tracking-wide">
                      Key Ingredients
                    </td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4">
                        {product.ingredients && product.ingredients.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {product.ingredients.slice(0, 6).map((ingredient, index) => (
                              <Badge key={index} className="bg-neutral-800 text-neutral-300 text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                            {product.ingredients.length > 6 && (
                              <Badge className="bg-neutral-800 text-neutral-500 text-xs">
                                +{product.ingredients.length - 6} more
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-neutral-500">Not specified</span>
                        )}
                      </td>
                    ))}
                  </tr>
                )}

                {/* Features */}
                {maxFeatures > 0 && (
                  <tr className="border-b border-neutral-800">
                    <td className="sticky left-0 bg-brand-jet-graphite p-4 font-bold text-neutral-50 uppercase text-sm tracking-wide">
                      Features
                    </td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4">
                        <ul className="space-y-2">
                          {product.features && product.features.length > 0 ? (
                            product.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-neutral-300">
                                <Check className="h-4 w-4 text-accent stroke-[2] mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-center gap-2 text-sm text-neutral-500">
                              <Minus className="h-4 w-4 stroke-[2]" />
                              <span>No features listed</span>
                            </li>
                          )}
                        </ul>
                      </td>
                    ))}
                  </tr>
                )}

                {/* Actions */}
                <tr className="bg-black/50">
                  <td className="sticky left-0 bg-black/50 p-4"></td>
                  {items.map((product) => (
                    <td key={product.id} className="p-4">
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          size="sm"
                          fullWidth
                          className="h-10"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4 stroke-[2]" />
                          Add to Cart
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          fullWidth
                          className="h-10 border-neutral-700 hover:border-accent"
                        >
                          <Link href={`/products/${product.slug}`}>View Details</Link>
                        </Button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

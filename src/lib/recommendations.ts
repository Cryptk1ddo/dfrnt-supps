import type { Product } from '@/types'

/**
 * Product Recommendation Engine
 * 
 * Smart algorithms for cross-selling and upselling
 * Based on category, price range, and complementary products
 */

/**
 * Get frequently bought together products
 * Returns products that complement the current product
 */
export function getFrequentlyBoughtTogether(
  currentProduct: Product,
  allProducts: Product[],
  maxResults: number = 2
): Product[] {
  // Filter out current product
  const otherProducts = allProducts.filter((p) => p.id !== currentProduct.id)

  // Priority 1: Same category products (complementary stacks)
  const sameCategoryProducts = otherProducts.filter(
    (p) => p.category === currentProduct.category
  )

  // Priority 2: Related categories based on product type
  const relatedProducts = getRelatedCategoryProducts(
    currentProduct,
    otherProducts
  )

  // Combine and deduplicate
  const combined = [...sameCategoryProducts, ...relatedProducts]
  const unique = Array.from(new Map(combined.map((p) => [p.id, p])).values())

  // Sort by price (lower to higher for upsell opportunity)
  const sorted = unique.sort((a, b) => a.price - b.price)

  return sorted.slice(0, maxResults)
}

/**
 * Get related category products based on product synergies
 */
function getRelatedCategoryProducts(
  currentProduct: Product,
  allProducts: Product[]
): Product[] {
  const categoryMap: Record<string, string[]> = {
    supplements: ['nootropics', 'performance', 'recovery'],
    nootropics: ['supplements', 'performance', 'blue-light-glasses'],
    performance: ['supplements', 'nootropics', 'recovery', 'wearables'],
    recovery: ['performance', 'supplements'],
    'blue-light-glasses': ['nootropics', 'supplements'],
    wearables: ['performance', 'supplements'],
  }

  const relatedCategories = categoryMap[currentProduct.category] || []

  return allProducts.filter((p) =>
    relatedCategories.includes(p.category)
  )
}

/**
 * Get "You May Also Like" recommendations
 * Returns diverse product suggestions based on browsing behavior
 */
export function getYouMayAlsoLike(
  currentProduct: Product,
  allProducts: Product[],
  maxResults: number = 6
): Product[] {
  // Filter out current product
  const otherProducts = allProducts.filter((p) => p.id !== currentProduct.id)

  // Get products from same and related categories
  const recommendations = getRelatedCategoryProducts(
    currentProduct,
    otherProducts
  )

  // Add same category products
  const sameCategoryProducts = otherProducts.filter(
    (p) => p.category === currentProduct.category
  )

  // Combine and deduplicate
  const combined = [...recommendations, ...sameCategoryProducts]
  const unique = Array.from(new Map(combined.map((p) => [p.id, p])).values())

  // Prioritize products with discounts and good availability
  const sorted = unique.sort((a, b) => {
    // Products with compareAtPrice (on sale) get priority
    const aOnSale = a.compareAtPrice ? 1 : 0
    const bOnSale = b.compareAtPrice ? 1 : 0
    if (aOnSale !== bOnSale) return bOnSale - aOnSale

    // Then by price (mix of price points)
    return Math.abs(a.price - currentProduct.price) - Math.abs(b.price - currentProduct.price)
  })

  return sorted.slice(0, maxResults)
}

/**
 * Get complementary products for complete solutions
 * E.g., if buying supplement, suggest testing kit or glasses
 */
export function getComplementaryProducts(
  currentProduct: Product,
  allProducts: Product[]
): Product[] {
  const complementaryMap: Record<string, string[]> = {
    supplements: ['wearables', 'blue-light-glasses'],
    nootropics: ['blue-light-glasses', 'wearables'],
    performance: ['wearables', 'recovery'],
    recovery: ['performance', 'supplements'],
  }

  const complementaryCategories =
    complementaryMap[currentProduct.category] || []

  return allProducts.filter(
    (p) =>
      p.id !== currentProduct.id &&
      complementaryCategories.includes(p.category)
  )
}

/**
 * Calculate bundle discount based on number of items
 */
export function calculateBundleDiscount(itemCount: number): {
  percentage: number
  minItems: number
} {
  if (itemCount >= 3) {
    return { percentage: 15, minItems: 3 }
  } else if (itemCount >= 2) {
    return { percentage: 10, minItems: 2 }
  }
  return { percentage: 0, minItems: 0 }
}

/**
 * Get smart cart recommendations based on current cart
 */
export function getCartRecommendations(
  cartItems: Product[],
  allProducts: Product[],
  maxResults: number = 4
): Product[] {
  if (cartItems.length === 0) {
    // Show best sellers if cart is empty
    return allProducts
      .filter((p) => p.compareAtPrice) // Products on sale
      .slice(0, maxResults)
  }

  // Get cart product IDs
  const cartProductIds = new Set(cartItems.map((p) => p.id))

  // Find complementary products not in cart
  const recommendations: Product[] = []

  for (const cartItem of cartItems) {
    const complementary = getComplementaryProducts(cartItem, allProducts)
    recommendations.push(...complementary)
  }

  // Filter out duplicates and cart items
  const unique = Array.from(
    new Map(
      recommendations
        .filter((p) => !cartProductIds.has(p.id))
        .map((p) => [p.id, p])
    ).values()
  )

  return unique.slice(0, maxResults)
}

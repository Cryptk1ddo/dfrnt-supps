import type { Product } from '@/types'

// Use mock data for development, real Strapi in production
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_STRAPI_URL

/**
 * Get all products
 * Uses mock data in development, Strapi API in production
 */
export async function getProducts(params?: {
  category?: string
  page?: number
  pageSize?: number
}): Promise<{ products: Product[]; total: number }> {
  if (USE_MOCK_DATA) {
    const { getProducts: getMockProducts } = await import('./mock-client')
    return getMockProducts(params)
  }

  // Real Strapi implementation would go here
  throw new Error('Strapi not configured. Please set NEXT_PUBLIC_STRAPI_URL')
}

/**
 * Get product by slug
 * Uses mock data in development, Strapi API in production
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_MOCK_DATA) {
    const { getProductBySlug: getMockProduct } = await import('./mock-client')
    return getMockProduct(slug)
  }

  // Real Strapi implementation would go here
  throw new Error('Strapi not configured. Please set NEXT_PUBLIC_STRAPI_URL')
}

/**
 * Get featured products
 * Uses mock data in development, Strapi API in production
 */
export async function getFeaturedProducts(limit: number = 4): Promise<Product[]> {
  if (USE_MOCK_DATA) {
    const { getFeaturedProducts: getMockFeatured } = await import('./mock-client')
    return getMockFeatured(limit)
  }

  // Real Strapi implementation would go here
  throw new Error('Strapi not configured. Please set NEXT_PUBLIC_STRAPI_URL')
}

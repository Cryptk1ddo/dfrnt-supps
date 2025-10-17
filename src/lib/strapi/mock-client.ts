import type { Product } from '@/types'
import { mockProducts } from '../mock-data'

/**
 * Mock implementation of Strapi client for development
 * Replace with actual Strapi API calls in production
 */

export async function getProducts(params?: {
  category?: string
  page?: number
  pageSize?: number
}): Promise<{ products: Product[]; total: number }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filteredProducts = mockProducts

  // Filter by category
  if (params?.category) {
    filteredProducts = mockProducts.filter((p) => p.category === params.category)
  }

  return {
    products: filteredProducts,
    total: filteredProducts.length,
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const product = mockProducts.find((p) => p.slug === slug)
  return product || null
}

export async function getFeaturedProducts(limit: number = 4): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return first N products as "featured"
  return mockProducts.slice(0, limit)
}

'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import { Filter, ArrowUpDown, TrendingUp } from 'lucide-react'
import { getProducts } from '@/lib/strapi/client'
import { ProductCard } from '@/domains/catalog/components/ProductCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useGsapFadeIn } from '@/hooks/useGsap'

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'supplements', name: 'Supplements' },
  { id: 'blue-light-glasses', name: 'Blue-Light Glasses' },
  { id: 'nootropics', name: 'Nootropics' },
  { id: 'wearables', name: 'Wearables' },
  { id: 'recovery', name: 'Recovery' },
  { id: 'sleep', name: 'Sleep' },
]

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') || 'all'
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const productsRef = useGsapFadeIn({ stagger: 0.1 })

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () =>
      getProducts({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        pageSize: 12,
      }),
  })

  // Sort products
  const sortedProducts = useMemo(() => {
    if (!data?.products) return []
    
    const products = [...data.products]
    
    switch (sortBy) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price)
      case 'name':
        return products.sort((a, b) => a.name.localeCompare(b.name))
      case 'featured':
      default:
        return products
    }
  }, [data?.products, sortBy])

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="mb-4 font-display text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight">
          {selectedCategory === 'all'
            ? 'All Products'
            : categories.find((c) => c.id === selectedCategory)?.name}
        </h1>
        <p className="text-lg text-neutral-300 leading-relaxed-reading max-w-2xl">
          Discover our science-backed systems designed for peak performance and refined rebellion.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-accent stroke-[2]" />
            <h2 className="font-sans font-bold uppercase tracking-wide text-neutral-50 text-sm">Category</h2>
            {data?.products && (
              <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
              </Badge>
            )}
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <ArrowUpDown className="h-4 w-4 text-neutral-400 stroke-[2]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-brand-jet-graphite border border-neutral-700 rounded-lg px-4 py-2 text-sm text-neutral-50 font-semibold hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? '' : 'border border-neutral-700 hover:border-accent'}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {isLoading && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[500px] animate-pulse rounded-lg bg-brand-jet-graphite border border-neutral-800" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-accent/50 bg-accent/10 backdrop-blur-sm p-8 text-center">
          <p className="text-neutral-300">Error loading products. Please try again later.</p>
        </div>
      )}

      {data && data.products.length === 0 && (
        <div className="rounded-lg border border-neutral-800 bg-brand-jet-graphite p-16 text-center">
          <p className="text-lg text-neutral-400">No products found in this category.</p>
        </div>
      )}

      {data && sortedProducts.length > 0 && (
        <>
          <div
            ref={productsRef as React.RefObject<HTMLDivElement>}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sortedProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product}
                isBestSeller={index < 3 && sortBy === 'featured'} // Mark top 3 as best sellers
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

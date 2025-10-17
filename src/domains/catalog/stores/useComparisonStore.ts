'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ComparisonProduct {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  image: string
  slug: string
  category: string
  shortDescription: string
  benefits?: string[]
  ingredients?: string[]
  features?: string[]
}

interface ComparisonStore {
  items: ComparisonProduct[]
  isOpen: boolean
  addItem: (item: ComparisonProduct) => void
  removeItem: (itemId: string) => void
  toggleItem: (item: ComparisonProduct) => void
  isInComparison: (itemId: string) => boolean
  clearComparison: () => void
  openComparison: () => void
  closeComparison: () => void
}

const MAX_COMPARISON_ITEMS = 3

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (!existingItem && items.length < MAX_COMPARISON_ITEMS) {
          set({ items: [...items, item] })
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }))
      },

      toggleItem: (item) => {
        const isInComparison = get().isInComparison(item.id)
        if (isInComparison) {
          get().removeItem(item.id)
        } else if (get().items.length < MAX_COMPARISON_ITEMS) {
          get().addItem(item)
        }
      },

      isInComparison: (itemId) => {
        return get().items.some((item) => item.id === itemId)
      },

      clearComparison: () => {
        set({ items: [] })
      },

      openComparison: () => {
        set({ isOpen: true })
      },

      closeComparison: () => {
        set({ isOpen: false })
      },
    }),
    {
      name: 'dfrnt-comparison-storage',
    }
  )
)

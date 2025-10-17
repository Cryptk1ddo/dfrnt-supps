import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  slug: string
  inStock: boolean
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (itemId: string) => void
  isInWishlist: (itemId: string) => boolean
  toggleItem: (item: WishlistItem) => void
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (!existingItem) {
          set({ items: [...items, item] })
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }))
      },

      isInWishlist: (itemId) => {
        return get().items.some((item) => item.id === itemId)
      },

      toggleItem: (item) => {
        const isInWishlist = get().isInWishlist(item.id)
        if (isInWishlist) {
          get().removeItem(item.id)
        } else {
          get().addItem(item)
        }
      },

      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'dfrnt-wishlist-storage',
    }
  )
)

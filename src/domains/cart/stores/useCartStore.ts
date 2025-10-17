import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Getters
  itemCount: () => number
  subtotal: () => number
  tax: () => number
  shipping: () => number
  total: () => number
  
  // Actions
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

const TAX_RATE = 0.08 // 8% tax
const FREE_SHIPPING_THRESHOLD = 75
const SHIPPING_COST = 9.99

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Getters
      itemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      subtotal: () => {
        return get().items.reduce((total, item) => {
          return total + item.product.price * item.quantity
        }, 0)
      },

      tax: () => {
        return get().subtotal() * TAX_RATE
      },

      shipping: () => {
        const subtotal = get().subtotal()
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
      },

      total: () => {
        return get().subtotal() + get().tax() + get().shipping()
      },

      // Actions
      addItem: (product: Product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find((item) => item.productId === product.id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          set({
            items: [...items, { productId: product.id, quantity, product }],
          })
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },
    }),
    {
      name: 'dfrnt-cart-storage',
    }
  )
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CheckoutStep = 'shipping' | 'payment' | 'review'

export interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface PaymentInfo {
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  saveCard: boolean
}

export interface OrderSummary {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

interface CheckoutState {
  currentStep: CheckoutStep
  shippingInfo: Partial<ShippingInfo>
  paymentInfo: Partial<PaymentInfo>
  orderSummary: OrderSummary
  
  // Actions
  setCurrentStep: (step: CheckoutStep) => void
  setShippingInfo: (info: Partial<ShippingInfo>) => void
  setPaymentInfo: (info: Partial<PaymentInfo>) => void
  calculateOrderSummary: (subtotal: number) => void
  resetCheckout: () => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

const steps: CheckoutStep[] = ['shipping', 'payment', 'review']

const initialOrderSummary: OrderSummary = {
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      currentStep: 'shipping',
      shippingInfo: {},
      paymentInfo: {},
      orderSummary: initialOrderSummary,

      setCurrentStep: (step) => set({ currentStep: step }),

      setShippingInfo: (info) =>
        set((state) => ({
          shippingInfo: { ...state.shippingInfo, ...info },
        })),

      setPaymentInfo: (info) =>
        set((state) => ({
          paymentInfo: { ...state.paymentInfo, ...info },
        })),

      calculateOrderSummary: (subtotal) => {
        const shipping = subtotal >= 75 ? 0 : 9.99
        const tax = subtotal * 0.08 // 8% tax
        const total = subtotal + shipping + tax

        set({
          orderSummary: {
            subtotal,
            shipping,
            tax,
            total,
          },
        })
      },

      resetCheckout: () =>
        set({
          currentStep: 'shipping',
          shippingInfo: {},
          paymentInfo: {},
          orderSummary: initialOrderSummary,
        }),

      goToNextStep: () => {
        const currentIndex = steps.indexOf(get().currentStep)
        if (currentIndex < steps.length - 1) {
          set({ currentStep: steps[currentIndex + 1] })
        }
      },

      goToPreviousStep: () => {
        const currentIndex = steps.indexOf(get().currentStep)
        if (currentIndex > 0) {
          set({ currentStep: steps[currentIndex - 1] })
        }
      },
    }),
    {
      name: 'checkout-storage',
      partialize: (state) => ({
        shippingInfo: state.shippingInfo,
      }),
    }
  )
)

'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { ExitIntentModal } from '@/components/modals/ExitIntentModal'
import { useCartStore } from '@/domains/cart/stores/useCartStore'

export function ExitIntentHandler() {
  const [showModal, setShowModal] = useState(false)
  const [modalDismissed, setModalDismissed] = useState(false)
  const pathname = usePathname()
  const { items, total } = useCartStore()

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger if:
    // 1. Mouse is leaving through the top of the viewport
    // 2. Cart has items
    // 3. User hasn't dismissed the modal in this session
    // 4. Not already showing modal
    if (
      e.clientY <= 0 &&
      items.length > 0 &&
      !modalDismissed &&
      !showModal
    ) {
      setShowModal(true)
      // Store in sessionStorage that we've shown the modal
      sessionStorage.setItem('dfrnt-exit-intent-shown', 'true')
    }
  }, [items.length, modalDismissed, showModal])

  useEffect(() => {
    // Check if we've already shown the modal this session
    const alreadyShown = sessionStorage.getItem('dfrnt-exit-intent-shown')
    if (alreadyShown) {
      setModalDismissed(true)
    }

    // Add event listener
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseLeave])

  const handleClose = () => {
    setShowModal(false)
    setModalDismissed(true)
  }

  const handleContinueShopping = () => {
    setShowModal(false)
    setModalDismissed(true)
    // In production, this would apply the discount code automatically
    // and redirect to checkout
  }

  // Don't show modal on checkout page or if no items in cart
  if (pathname === '/checkout' || pathname === '/checkout/confirmation' || items.length === 0) {
    return null
  }

  if (!showModal) {
    return null
  }

  return (
    <ExitIntentModal
      cartTotal={total()}
      cartItemCount={items.length}
      onClose={handleClose}
      onContinueShopping={handleContinueShopping}
    />
  )
}

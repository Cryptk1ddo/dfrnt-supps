'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProductExitIntentModal } from './ProductExitIntentModal'

interface ProductExitIntentHandlerProps {
  productId: string
  productName: string
  productPrice: number
  productImage: string
  onAddToCart: () => void
}

export function ProductExitIntentHandler({
  productId,
  productName,
  productPrice,
  productImage,
  onAddToCart,
}: ProductExitIntentHandlerProps) {
  const [showModal, setShowModal] = useState(false)
  const [timeOnPage, setTimeOnPage] = useState(0)

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger if:
    // 1. Mouse is leaving through the top of the viewport
    // 2. User has been on page for at least 10 seconds (engaged)
    // 3. Haven't shown modal yet in this session
    // 4. Not already showing modal
    const modalShown = sessionStorage.getItem(`dfrnt-exit-intent-${productId}`)
    
    if (
      e.clientY <= 0 &&
      timeOnPage >= 10 &&
      !modalShown &&
      !showModal
    ) {
      setShowModal(true)
      sessionStorage.setItem(`dfrnt-exit-intent-${productId}`, 'true')
    }
  }, [timeOnPage, showModal, productId])

  useEffect(() => {
    // Track time on page
    const interval = setInterval(() => {
      setTimeOnPage((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Add event listener after user has been on page for 10 seconds
    if (timeOnPage >= 10) {
      document.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [timeOnPage, handleMouseLeave])

  const handleClose = () => {
    setShowModal(false)
  }

  const handleAddToCartWithDiscount = () => {
    onAddToCart()
    // In production, apply discount code automatically
    console.log('Applying discount code: FIRSTORDER10')
  }

  if (!showModal) {
    return null
  }

  return (
    <ProductExitIntentModal
      productId={productId}
      productName={productName}
      productPrice={productPrice}
      productImage={productImage}
      onClose={handleClose}
      onAddToCart={handleAddToCartWithDiscount}
    />
  )
}

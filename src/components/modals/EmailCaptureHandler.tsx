'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { EmailCaptureModal } from '@/components/modals/EmailCaptureModal'

export function EmailCaptureHandler() {
  const [showModal, setShowModal] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user has already subscribed
    const hasSubscribed = localStorage.getItem('dfrnt-email-subscribed')
    const modalDismissed = sessionStorage.getItem('dfrnt-email-modal-dismissed')
    
    if (hasSubscribed || modalDismissed) {
      return
    }

    // Show modal after 30 seconds on first visit
    const timer = setTimeout(() => {
      setShowModal(true)
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setShowModal(false)
    sessionStorage.setItem('dfrnt-email-modal-dismissed', 'true')
  }

  const handleSubmit = (email: string) => {
    // In production, this would send to your email service (Mailchimp, SendGrid, etc.)
    console.log('Email submitted:', email)
    localStorage.setItem('dfrnt-email-subscribed', 'true')
    localStorage.setItem('dfrnt-discount-code', 'WELCOME15')
    
    // Show success notification (you could create a toast component)
    alert(`Thanks for subscribing! Your discount code is: WELCOME15`)
  }

  // Don't show on checkout pages
  if (pathname?.includes('/checkout') || pathname?.includes('/orders')) {
    return null
  }

  if (!showModal) {
    return null
  }

  return <EmailCaptureModal onClose={handleClose} onSubmit={handleSubmit} />
}

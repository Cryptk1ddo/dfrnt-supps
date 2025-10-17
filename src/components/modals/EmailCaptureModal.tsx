'use client'

import { useState, useEffect } from 'react'
import { X, Mail, Gift, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface EmailCaptureModalProps {
  onClose: () => void
  onSubmit: (email: string) => void
}

export function EmailCaptureModal({ onClose, onSubmit }: EmailCaptureModalProps) {
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setError('')
    onSubmit(email)
    handleClose()
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Decorative glow */}
        <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full"></div>

        <div className="relative rounded-xl border border-accent/30 bg-brand-jet-graphite shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-neutral-400 hover:bg-black hover:text-neutral-50 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 stroke-[2]" />
          </button>

          {/* Content */}
          <div className="p-8 sm:p-12">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse"></div>
                <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/30">
                  <Gift className="h-10 w-10 text-accent stroke-[2]" />
                </div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="mb-3 text-center font-display text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
              Unlock <span className="text-accent">15% OFF</span>
            </h2>
            <p className="mb-6 text-center text-neutral-300 leading-relaxed">
              Join the DFRNT community and get exclusive access to science-backed insights, 
              early product launches, and your welcome discount.
            </p>

            {/* Benefits */}
            <div className="mb-8 space-y-3">
              {[
                'Early access to new products',
                'Exclusive research & insights',
                'Members-only discounts',
                'Free shipping on first order',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-accent stroke-[2] flex-shrink-0" />
                  <span className="text-sm text-neutral-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500 stroke-[2]" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder="your.email@example.com"
                    className="pl-12 h-12 bg-black border-neutral-700 focus:border-accent"
                    required
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                fullWidth
                className="h-12 text-base"
              >
                Get My 15% OFF
              </Button>
            </form>

            {/* Privacy */}
            <p className="mt-4 text-center text-xs text-neutral-500">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>

            {/* No Thanks Link */}
            <button
              onClick={handleClose}
              className="mt-4 w-full text-center text-sm text-neutral-400 hover:text-neutral-300 transition-colors underline"
            >
              No thanks, I'll pay full price
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

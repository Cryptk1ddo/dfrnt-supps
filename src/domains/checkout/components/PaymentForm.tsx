'use client'

import { useState } from 'react'
import { useCheckoutStore } from '../stores/useCheckoutStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { CreditCard, Lock } from 'lucide-react'

export function PaymentForm() {
  const { paymentInfo, setPaymentInfo, goToNextStep, goToPreviousStep } = useCheckoutStore()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`
    }
    return v
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newErrors: Record<string, string> = {}

    // Validation
    const cardNumber = formData.get('cardNumber') as string
    const cardName = formData.get('cardName') as string
    const expiryDate = formData.get('expiryDate') as string
    const cvv = formData.get('cvv') as string

    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number'
    }

    if (!cardName) {
      newErrors.cardName = 'Cardholder name is required'
    }

    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)'
    } else {
      const [month, year] = expiryDate.split('/')
      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1

      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Invalid month'
      } else if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = 'Card has expired'
      }
    }

    if (!cvv || cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Save payment info (in real app, this would be tokenized)
    setPaymentInfo({
      cardNumber: cardNumber.slice(-4), // Only store last 4 digits
      cardName,
      expiryDate,
      cvv: '', // Never store CVV
      saveCard: formData.get('saveCard') === 'on',
    })

    goToNextStep()
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-gray-100">Payment Information</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Lock className="h-4 w-4" />
            <span>Secure Checkout</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Number */}
          <div>
            <label htmlFor="cardNumber" className="mb-1 block text-sm font-medium text-gray-300">
              Card Number *
            </label>
            <div className="relative">
              <Input
                id="cardNumber"
                name="cardNumber"
                defaultValue={paymentInfo.cardNumber ? `**** **** **** ${paymentInfo.cardNumber}` : ''}
                error={errors.cardNumber}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                onChange={(e) => {
                  e.target.value = formatCardNumber(e.target.value)
                }}
              />
              <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
            {errors.cardNumber && <p className="mt-1 text-sm text-red-400">{errors.cardNumber}</p>}
          </div>

          {/* Cardholder Name */}
          <div>
            <label htmlFor="cardName" className="mb-1 block text-sm font-medium text-gray-300">
              Cardholder Name *
            </label>
            <Input
              id="cardName"
              name="cardName"
              defaultValue={paymentInfo.cardName || ''}
              error={errors.cardName}
              placeholder="John Doe"
            />
            {errors.cardName && <p className="mt-1 text-sm text-red-400">{errors.cardName}</p>}
          </div>

          {/* Expiry Date and CVV */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="expiryDate" className="mb-1 block text-sm font-medium text-gray-300">
                Expiry Date *
              </label>
              <Input
                id="expiryDate"
                name="expiryDate"
                defaultValue={paymentInfo.expiryDate || ''}
                error={errors.expiryDate}
                placeholder="MM/YY"
                maxLength={5}
                onChange={(e) => {
                  e.target.value = formatExpiryDate(e.target.value)
                }}
              />
              {errors.expiryDate && <p className="mt-1 text-sm text-red-400">{errors.expiryDate}</p>}
            </div>

            <div>
              <label htmlFor="cvv" className="mb-1 block text-sm font-medium text-gray-300">
                CVV *
              </label>
              <Input
                id="cvv"
                name="cvv"
                type="password"
                error={errors.cvv}
                placeholder="123"
                maxLength={4}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '')
                }}
              />
              {errors.cvv && <p className="mt-1 text-sm text-red-400">{errors.cvv}</p>}
            </div>
          </div>

          {/* Save Card Option */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveCard"
              name="saveCard"
              defaultChecked={paymentInfo.saveCard}
              className="h-4 w-4 rounded border-dark-700 bg-dark-800 text-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
            />
            <label htmlFor="saveCard" className="text-sm text-gray-300">
              Save this card for future purchases
            </label>
          </div>

          {/* Security Notice */}
          <div className="rounded-lg border border-dark-700 bg-dark-900/50 p-4">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 shrink-0 text-neon-cyan" />
              <div className="text-sm text-gray-400">
                <p className="font-medium text-gray-300">Your payment information is secure</p>
                <p className="mt-1">
                  We use industry-standard encryption to protect your card details. Your information
                  is never stored on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <Button type="button" variant="outline" size="lg" onClick={goToPreviousStep}>
              Back to Shipping
            </Button>
            <Button type="submit" size="lg" className="min-w-[200px]">
              Review Order
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

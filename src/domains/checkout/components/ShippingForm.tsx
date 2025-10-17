'use client'

import { useState } from 'react'
import { useCheckoutStore } from '../stores/useCheckoutStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { UserPlus, Mail } from 'lucide-react'

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
]

export function ShippingForm() {
  const { shippingInfo, setShippingInfo, goToNextStep } = useCheckoutStore()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [checkoutMode, setCheckoutMode] = useState<'guest' | 'account'>('guest')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newErrors: Record<string, string> = {}

    // Validation
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zipCode',
      'country',
    ]

    requiredFields.forEach((field) => {
      if (!formData.get(field)) {
        newErrors[field] = 'This field is required'
      }
    })

    // Email validation
    const email = formData.get('email') as string
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    const phone = formData.get('phone') as string
    if (phone && !/^\+?[\d\s\-()]+$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Zip code validation
    const zipCode = formData.get('zipCode') as string
    if (zipCode && !/^\d{5}(-\d{4})?$/.test(zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code (e.g., 12345 or 12345-6789)'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Save shipping info
    setShippingInfo({
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      apartment: formData.get('apartment') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
    })

    goToNextStep()
  }

  return (
    <div className="border border-neutral-800 rounded-lg bg-brand-jet-graphite p-8">
      <h2 className="mb-6 font-display text-3xl font-bold text-neutral-50 tracking-tight">
        Shipping Information
      </h2>

      {/* CRO: Guest vs Account Checkout Toggle */}
      <div className="mb-8 flex gap-3">
        <button
          type="button"
          onClick={() => setCheckoutMode('guest')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
            checkoutMode === 'guest'
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-neutral-700 bg-black text-neutral-400 hover:border-neutral-600'
          }`}
        >
          <Mail className="h-4 w-4 stroke-[2]" />
          <span className="font-bold text-sm">Guest Checkout</span>
          <Badge className="ml-1 bg-accent/20 text-accent text-xs border-none">Faster</Badge>
        </button>
        <button
          type="button"
          onClick={() => setCheckoutMode('account')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
            checkoutMode === 'account'
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-neutral-700 bg-black text-neutral-400 hover:border-neutral-600'
          }`}
        >
          <UserPlus className="h-4 w-4 stroke-[2]" />
          <span className="font-bold text-sm">Create Account</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-wide text-accent">
            Contact Information
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-neutral-50">
                First Name *
              </label>
                <Input
                  id="firstName"
                  name="firstName"
                  defaultValue={shippingInfo.firstName || ''}
                  error={errors.firstName}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-300">
                  Last Name *
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  defaultValue={shippingInfo.lastName || ''}
                  error={errors.lastName}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-300">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={shippingInfo.email || ''}
                  error={errors.email}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-300">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={shippingInfo.phone || ''}
                  error={errors.phone}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-neon-cyan">Shipping Address</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-300">
                  Street Address *
                </label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={shippingInfo.address || ''}
                  error={errors.address}
                  placeholder="123 Main Street"
                />
                {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="apartment" className="mb-1 block text-sm font-medium text-gray-300">
                  Apartment, suite, etc. (optional)
                </label>
                <Input
                  id="apartment"
                  name="apartment"
                  defaultValue={shippingInfo.apartment || ''}
                  placeholder="Apt 4B"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="city" className="mb-1 block text-sm font-medium text-gray-300">
                    City *
                  </label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={shippingInfo.city || ''}
                    error={errors.city}
                    placeholder="New York"
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-400">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="mb-1 block text-sm font-medium text-gray-300">
                    State *
                  </label>
                  <select
                    id="state"
                    name="state"
                    defaultValue={shippingInfo.state || ''}
                    className={`w-full rounded-md border ${
                      errors.state ? 'border-red-500' : 'border-dark-700'
                    } bg-dark-800 px-3 py-2 text-gray-100 transition-colors focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20`}
                  >
                    <option value="">Select</option>
                    {US_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && <p className="mt-1 text-sm text-red-400">{errors.state}</p>}
                </div>

                <div>
                  <label htmlFor="zipCode" className="mb-1 block text-sm font-medium text-gray-300">
                    Zip Code *
                  </label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    defaultValue={shippingInfo.zipCode || ''}
                    error={errors.zipCode}
                    placeholder="10001"
                  />
                  {errors.zipCode && <p className="mt-1 text-sm text-red-400">{errors.zipCode}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-300">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  defaultValue={shippingInfo.country || 'United States'}
                  className="w-full rounded-md border border-dark-700 bg-dark-800 px-3 py-2 text-gray-100 transition-colors focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg" className="min-w-[200px]">
              Continue to Payment
            </Button>
          </div>
        </form>
      </div>
  )
}

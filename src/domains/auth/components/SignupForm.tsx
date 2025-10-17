'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '../stores/useAuthStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react'

export function SignupForm() {
  const router = useRouter()
  const { signUp, isLoading } = useAuthStore()
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsSubmitting(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsSubmitting(false)
      return
    }

    const { error } = await signUp(email, password, {
      first_name: firstName,
      last_name: lastName,
    })

    if (error) {
      setError(error.message || 'Failed to create account')
      setIsSubmitting(false)
      return
    }

    setSuccess(true)
    // Redirect after a short delay
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  if (success) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neon-green/10 shadow-neon-green">
              <CheckCircle className="h-8 w-8 text-neon-green" />
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold text-gray-100">
              Account Created!
            </h2>
            <p className="text-gray-400">
              Please check your email to verify your account.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="mb-2 font-display text-2xl font-bold text-gray-100">Create Account</h2>
            <p className="text-gray-400">Join DFRNT and start your biohacking journey</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 rounded-lg border border-red-500/50 bg-red-900/20 p-4">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-300">
                First Name
              </label>
              <div className="relative">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="John"
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-300">
                Last Name
              </label>
              <div className="relative">
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Doe"
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john.doe@example.com"
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="pl-10"
                minLength={8}
              />
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
            <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                className="pl-10"
                minLength={8}
              />
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 h-4 w-4 rounded border-dark-700 bg-dark-800 text-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
            />
            <label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the{' '}
              <Link href="/terms" className="text-neon-cyan hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-neon-cyan hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button type="submit" fullWidth size="lg" disabled={isSubmitting || isLoading}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-neon-cyan hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

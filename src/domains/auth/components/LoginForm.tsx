'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '../stores/useAuthStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Mail, Lock, AlertCircle } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const { signIn, isLoading } = useAuthStore()
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message || 'Failed to sign in')
      setIsSubmitting(false)
      return
    }

    // Redirect to home or previous page
    router.push('/')
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="mb-2 font-display text-2xl font-bold text-gray-100">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 rounded-lg border border-red-500/50 bg-red-900/20 p-4">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

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
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-neon-cyan hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="pl-10"
              />
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <Button type="submit" fullWidth size="lg" disabled={isSubmitting || isLoading}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-neon-cyan hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

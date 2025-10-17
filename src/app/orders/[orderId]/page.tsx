'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, Package, MapPin, CreditCard, Download } from 'lucide-react'

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.orderId as string

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      {/* Back Button */}
      <Link href="/products" className="mb-6 inline-flex items-center text-neon-cyan hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continue Shopping
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-display text-3xl font-bold text-gray-100">
          Order Details
        </h1>
        <div className="flex items-center gap-4">
          <p className="font-mono text-lg text-gray-400">{orderId}</p>
          <Badge variant="success">Confirmed</Badge>
        </div>
      </div>

      {/* Order Status */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-gray-100">Order Status</h2>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Package className="h-5 w-5 text-neon-cyan" />
                <h3 className="font-semibold text-gray-100">Status</h3>
              </div>
              <p className="text-gray-300">Processing</p>
              <p className="text-sm text-gray-500">Expected to ship in 1-2 days</p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Package className="h-5 w-5 text-neon-cyan" />
                <h3 className="font-semibold text-gray-100">Tracking</h3>
              </div>
              <p className="text-gray-300">Not available yet</p>
              <p className="text-sm text-gray-500">We'll email you when it ships</p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Package className="h-5 w-5 text-neon-cyan" />
                <h3 className="font-semibold text-gray-100">Estimated Delivery</h3>
              </div>
              <p className="text-gray-300">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="text-sm text-gray-500">5-7 business days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Need Help */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-semibold text-gray-100">Need Help?</h2>
          <p className="mb-4 text-gray-400">
            Have questions about your order? Our support team is here to help.
          </p>
          <div className="flex gap-4">
            <Button variant="outline">
              Contact Support
            </Button>
            <Button variant="outline">
              Track Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

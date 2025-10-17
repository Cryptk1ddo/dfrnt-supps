'use client'

import { Star, ThumbsUp, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

interface Review {
  id: number
  author: string
  rating: 5 | 4 | 3 | 2 | 1
  date: string
  title: string
  content: string
  verified: boolean
  helpful: number
}

interface ProductReviewsProps {
  productId: string
  averageRating: number
  totalReviews: number
  reviews: Review[]
}

export function ProductReviews({
  averageRating,
  totalReviews,
  reviews,
}: ProductReviewsProps) {
  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const sizeClass = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating
                ? 'fill-accent text-accent'
                : 'fill-neutral-700 text-neutral-700'
            } stroke-[2]`}
          />
        ))}
      </div>
    )
  }

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
    return { rating, count, percentage }
  })

  return (
    <div className="mt-24">
      <div className="border border-neutral-800 rounded-lg bg-brand-jet-graphite p-8">
        <h2 className="mb-8 font-display text-3xl font-bold text-neutral-50 tracking-tight">
          Customer Reviews
        </h2>

        {/* Rating Overview */}
        <div className="mb-12 grid gap-8 lg:grid-cols-3">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center border border-neutral-800 rounded-lg bg-black p-8">
            <div className="mb-2 font-display text-6xl font-bold text-accent">
              {averageRating.toFixed(1)}
            </div>
            {renderStars(Math.round(averageRating), 'lg')}
            <p className="mt-3 text-sm text-neutral-400">
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="lg:col-span-2 space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-24">
                  <span className="text-sm font-bold text-neutral-50">{rating}</span>
                  <Star className="h-4 w-4 fill-accent text-accent stroke-[2]" />
                </div>
                <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-neutral-400 w-16 text-right">
                  {count} {count === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-neutral-800 rounded-lg bg-black p-6 hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-neutral-50">{review.author}</span>
                    {review.verified && (
                      <Badge
                        variant="secondary"
                        className="bg-accent/10 text-accent border-accent/20 text-xs"
                      >
                        <CheckCircle className="h-3 w-3 mr-1 stroke-[2]" />
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {renderStars(review.rating)}
                    <span className="text-sm text-neutral-500">{review.date}</span>
                  </div>
                </div>
              </div>

              <h3 className="mb-2 font-bold text-neutral-50">{review.title}</h3>
              <p className="text-neutral-300 leading-relaxed mb-4">{review.content}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
                <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-accent transition-colors group">
                  <ThumbsUp className="h-4 w-4 stroke-[2] group-hover:fill-accent" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to write review */}
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
          <p className="text-neutral-300 mb-4">
            Have you tried this product? Share your experience!
          </p>
          <button className="px-6 py-3 bg-accent text-white font-bold uppercase tracking-wide text-sm rounded-lg hover:bg-accent/90 transition-colors">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  )
}

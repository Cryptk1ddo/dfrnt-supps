'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Star, ThumbsUp, MessageCircle, Check, Filter, ChevronDown, Image as ImageIcon, Shield, Camera } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface Review {
  id: string
  author: string
  authorImage?: string
  rating: 1 | 2 | 3 | 4 | 5
  date: string
  title: string
  content: string
  verified: boolean
  helpfulCount: number
  images?: string[]
  variant?: string
  size?: string
}

interface Question {
  id: string
  question: string
  author: string
  date: string
  answerCount: number
  answers: Answer[]
  helpfulCount: number
}

interface Answer {
  id: string
  author: string
  content: string
  date: string
  helpful: number
  verified: boolean
  isExpert?: boolean
}

interface AdvancedReviewsProps {
  reviews: Review[]
  questions: Question[]
  productName: string
  averageRating: number
  totalReviews: number
  ratingDistribution: { [key: number]: number }
}

type FilterType = 'all' | '5-star' | '4-star' | '3-star' | 'verified' | 'with-photos'
type SortType = 'most-helpful' | 'most-recent' | 'highest-rated' | 'lowest-rated'

export default function AdvancedReviews({
  reviews,
  questions,
  productName,
  averageRating,
  totalReviews,
  ratingDistribution
}: AdvancedReviewsProps) {
  const [activeTab, setActiveTab] = useState<'reviews' | 'questions'>('reviews')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [sortType, setSortType] = useState<SortType>('most-helpful')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set())
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Filter reviews
  const filteredReviews = useMemo(() => {
    let filtered = [...reviews]

    switch (filterType) {
      case '5-star':
        filtered = filtered.filter(r => r.rating === 5)
        break
      case '4-star':
        filtered = filtered.filter(r => r.rating === 4)
        break
      case '3-star':
        filtered = filtered.filter(r => r.rating === 3)
        break
      case 'verified':
        filtered = filtered.filter(r => r.verified)
        break
      case 'with-photos':
        filtered = filtered.filter(r => r.images && r.images.length > 0)
        break
    }

    return filtered
  }, [reviews, filterType])

  // Sort reviews
  const sortedReviews = useMemo(() => {
    const sorted = [...filteredReviews]

    switch (sortType) {
      case 'most-helpful':
        sorted.sort((a, b) => b.helpfulCount - a.helpfulCount)
        break
      case 'most-recent':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'highest-rated':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'lowest-rated':
        sorted.sort((a, b) => a.rating - b.rating)
        break
    }

    return sorted
  }, [filteredReviews, sortType])

  // Get all review images for gallery
  const allReviewImages = useMemo(() => {
    return reviews
      .filter(r => r.images && r.images.length > 0)
      .flatMap(r => r.images!)
  }, [reviews])

  const toggleReviewExpanded = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews)
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId)
    } else {
      newExpanded.add(reviewId)
    }
    setExpandedReviews(newExpanded)
  }

  const toggleQuestionExpanded = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId)
    } else {
      newExpanded.add(questionId)
    }
    setExpandedQuestions(newExpanded)
  }

  const openLightbox = (imageIndex: number) => {
    setLightboxIndex(imageIndex)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    }

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const getRatingPercentage = (rating: number) => {
    return totalReviews > 0 ? Math.round((ratingDistribution[rating] / totalReviews) * 100) : 0
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Customer Reviews & Questions</h2>
        <p className="text-gray-600">Real feedback from verified customers</p>
      </div>

      {/* Rating Overview */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-6xl font-bold mb-2">{averageRating.toFixed(1)}</div>
            {renderStars(Math.round(averageRating), 'lg')}
            <p className="text-gray-600 mt-2">Based on {totalReviews.toLocaleString()} reviews</p>
            <Button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600">
              Write a Review
            </Button>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilterType(rating >= 3 ? `${rating}-star` as FilterType : 'all')}
                className="w-full flex items-center gap-3 hover:bg-white/50 rounded-lg p-2 transition-colors"
              >
                <span className="text-sm font-medium w-12">{rating} star</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-500"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {getRatingPercentage(rating)}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Review Photos Gallery */}
      {allReviewImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-gray-600" />
            <h3 className="text-xl font-bold">Customer Photos ({allReviewImages.length})</h3>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {allReviewImages.slice(0, 16).map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`Customer photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === 'reviews' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Reviews ({filteredReviews.length})
          {activeTab === 'reviews' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === 'questions' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Questions ({questions.length})
          {activeTab === 'questions' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
          )}
        </button>
      </div>

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value as SortType)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="most-helpful">Most Helpful</option>
              <option value="most-recent">Most Recent</option>
              <option value="highest-rated">Highest Rated</option>
              <option value="lowest-rated">Lowest Rated</option>
            </select>
          </div>

          {/* Filter Pills */}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {(['all', '5-star', '4-star', '3-star', 'verified', 'with-photos'] as FilterType[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterType(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterType === filter
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter === 'all' && 'All Reviews'}
                  {filter === '5-star' && '5 Stars'}
                  {filter === '4-star' && '4 Stars'}
                  {filter === '3-star' && '3 Stars'}
                  {filter === 'verified' && 'Verified Only'}
                  {filter === 'with-photos' && 'With Photos'}
                </button>
              ))}
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {sortedReviews.map((review) => {
              const isExpanded = expandedReviews.has(review.id)
              const shouldTruncate = review.content.length > 300

              return (
                <div
                  key={review.id}
                  className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
                >
                  {/* Review Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {review.authorImage && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={review.authorImage}
                          alt={review.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{review.author}</h4>
                        {review.verified && (
                          <Badge className="bg-green-100 text-green-700 text-xs flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        {renderStars(review.rating, 'sm')}
                        <span>•</span>
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                        {review.variant && (
                          <>
                            <span>•</span>
                            <span className="text-gray-500">{review.variant}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Review Title */}
                  {review.title && (
                    <h5 className="font-semibold mb-2">{review.title}</h5>
                  )}

                  {/* Review Content */}
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {shouldTruncate && !isExpanded
                      ? `${review.content.slice(0, 300)}...`
                      : review.content}
                  </p>

                  {shouldTruncate && (
                    <button
                      onClick={() => toggleReviewExpanded(review.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
                    >
                      {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                  )}

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {review.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const globalIndex = allReviewImages.indexOf(image)
                            if (globalIndex !== -1) openLightbox(globalIndex)
                          }}
                          className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer"
                        >
                          <Image
                            src={image}
                            alt={`Review photo ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Review Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpfulCount})
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Incentive to Review */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
            <p className="mb-4 opacity-90">
              Write a review and get 100 reward points + enter to win a free month&apos;s supply!
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Write a Review
            </Button>
          </div>
        </div>
      )}

      {/* Questions Tab */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Ask Question CTA */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <MessageCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold mb-1">Have a question about {productName}?</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Get answers from the community, our team, and health experts
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Ask a Question
                </Button>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {questions.map((question) => {
              const isExpanded = expandedQuestions.has(question.id)

              return (
                <div
                  key={question.id}
                  className="border rounded-xl p-6 bg-white hover:shadow-lg transition-shadow"
                >
                  {/* Question */}
                  <div className="flex items-start gap-4 mb-4">
                    <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{question.question}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{question.author}</span>
                        <span>•</span>
                        <span>{new Date(question.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{question.answerCount} answers</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleQuestionExpanded(question.id)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      {isExpanded ? 'Hide' : 'View'} Answers
                    </button>
                  </div>

                  {/* Answers */}
                  {isExpanded && question.answers.length > 0 && (
                    <div className="ml-9 space-y-4 pt-4 border-t">
                      {question.answers.map((answer) => (
                        <div key={answer.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{answer.author}</span>
                              {answer.verified && (
                                <Badge className="bg-blue-100 text-blue-700 text-xs">
                                  Verified Buyer
                                </Badge>
                              )}
                              {answer.isExpert && (
                                <Badge className="bg-purple-100 text-purple-700 text-xs">
                                  Expert
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(answer.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">{answer.content}</p>
                          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                            <ThumbsUp className="w-3 h-3" />
                            Helpful ({answer.helpful})
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl"
          >
            ×
          </button>
          <div className="relative w-full max-w-4xl aspect-square">
            <Image
              src={allReviewImages[lightboxIndex]}
              alt="Review photo"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {lightboxIndex + 1} / {allReviewImages.length}
          </div>
        </div>
      )}
    </div>
  )
}

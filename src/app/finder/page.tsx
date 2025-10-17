'use client'

import { ProductFinderQuiz } from '@/components/quiz/ProductFinderQuiz'

export default function FinderPage() {
  return (
    <div className="min-h-screen bg-black py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4 font-display text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight">
            Find Your <span className="text-accent">Perfect Stack</span>
          </h1>
          <p className="text-lg text-neutral-300 leading-relaxed-reading max-w-2xl mx-auto">
            Answer a few questions and we'll recommend the ideal products for your goals, 
            experience level, and lifestyle.
          </p>
        </div>

        {/* Quiz */}
        <ProductFinderQuiz />
      </div>
    </div>
  )
}

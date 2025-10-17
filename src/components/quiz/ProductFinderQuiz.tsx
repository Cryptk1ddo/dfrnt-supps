'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle, Target, Zap, Moon, Brain, Award, TrendingUp, Users, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import Image from 'next/image'

interface QuizQuestion {
  id: string
  question: string
  subtitle: string
  options: {
    id: string
    label: string
    description: string
    icon: any
    value: string
  }[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'goal',
    question: "What's your primary goal?",
    subtitle: 'Choose the area you want to optimize first',
    options: [
      { 
        id: 'focus', 
        label: 'Sharper Focus', 
        description: 'Enhance cognitive clarity and concentration',
        icon: Target, 
        value: 'cognitive' 
      },
      { 
        id: 'energy', 
        label: 'More Energy', 
        description: 'Sustained vitality throughout the day',
        icon: Zap, 
        value: 'energy' 
      },
      { 
        id: 'sleep', 
        label: 'Better Sleep', 
        description: 'Deeper rest and faster recovery',
        icon: Moon, 
        value: 'sleep' 
      },
      { 
        id: 'performance', 
        label: 'Peak Performance', 
        description: 'Total optimization across all systems',
        icon: Brain, 
        value: 'performance' 
      },
    ],
  },
  {
    id: 'experience',
    question: 'Experience with supplements?',
    subtitle: 'Help us recommend the right complexity level',
    options: [
      { 
        id: 'beginner', 
        label: 'Just Starting', 
        description: 'New to supplements and biohacking',
        icon: Sparkles, 
        value: 'beginner' 
      },
      { 
        id: 'intermediate', 
        label: 'Some Experience', 
        description: 'Tried a few products, know the basics',
        icon: TrendingUp, 
        value: 'intermediate' 
      },
      { 
        id: 'advanced', 
        label: 'Very Experienced', 
        description: 'Deep knowledge of stacks and protocols',
        icon: Award, 
        value: 'advanced' 
      },
    ],
  },
  {
    id: 'lifestyle',
    question: 'What describes your lifestyle?',
    subtitle: 'Context helps us personalize your stack',
    options: [
      { 
        id: 'athlete', 
        label: 'Athletic/Active', 
        description: 'Regular training and physical demands',
        icon: Zap, 
        value: 'active' 
      },
      { 
        id: 'professional', 
        label: 'High-Stress Work', 
        description: 'Demanding career, long hours',
        icon: Brain, 
        value: 'professional' 
      },
      { 
        id: 'student', 
        label: 'Student/Learning', 
        description: 'Studying, exams, heavy mental load',
        icon: Target, 
        value: 'student' 
      },
      { 
        id: 'entrepreneur', 
        label: 'Entrepreneur', 
        description: 'Building, scaling, multiple priorities',
        icon: TrendingUp, 
        value: 'entrepreneur' 
      },
    ],
  },
  {
    id: 'budget',
    question: 'Investment level?',
    subtitle: 'We have options for every commitment level',
    options: [
      { 
        id: 'starter', 
        label: 'Starter ($50-100)', 
        description: 'Essential single stack',
        icon: CheckCircle, 
        value: 'starter' 
      },
      { 
        id: 'optimized', 
        label: 'Optimized ($100-200)', 
        description: '2-3 complementary stacks',
        icon: TrendingUp, 
        value: 'optimized' 
      },
      { 
        id: 'complete', 
        label: 'Complete ($200+)', 
        description: 'Full system optimization',
        icon: Award, 
        value: 'complete' 
      },
    ],
  },
]

const productRecommendations: Record<string, any> = {
  'cognitive-beginner-professional-starter': {
    title: 'Focus Essentials',
    products: [
      { name: 'Cognitive Stack', price: '$79', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
    ],
    description: 'Perfect entry point for mental clarity and sustained focus during high-stress work.',
    savings: 'Save 15% vs buying individually',
  },
  'energy-intermediate-active-optimized': {
    title: 'Performance Athlete Bundle',
    products: [
      { name: 'Energy Stack', price: '$89', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
      { name: 'Recovery Stack', price: '$79', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
    ],
    description: 'Fuel intense training with sustained energy and accelerated recovery protocols.',
    savings: 'Bundle discount: Save $25',
  },
  'sleep-advanced-professional-optimized': {
    title: 'Sleep Mastery System',
    products: [
      { name: 'Sleep Stack', price: '$85', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
      { name: 'Blue-Light Glasses', price: '$149', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400' },
    ],
    description: 'Advanced sleep optimization combining supplements and circadian rhythm tools.',
    savings: 'Bundle discount: Save $35',
  },
  'performance-advanced-entrepreneur-complete': {
    title: 'Total Sovereignty Stack',
    products: [
      { name: 'Cognitive Stack', price: '$79', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
      { name: 'Energy Stack', price: '$89', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
      { name: 'Recovery Stack', price: '$79', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
      { name: 'Sleep Stack', price: '$85', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
    ],
    description: 'Complete 24/7 optimization system for entrepreneurs who demand excellence in every hour.',
    savings: 'Complete System: Save $65',
  },
  default: {
    title: 'Recommended Performance Stack',
    products: [
      { name: 'Cognitive Stack', price: '$79', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
      { name: 'Energy Stack', price: '$89', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
    ],
    description: 'Our most popular combination for balanced mental and physical performance.',
    savings: 'Bundle discount: Save $20',
  },
}

export function ProductFinderQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const currentQuestion = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  const handleAnswer = (value: string) => {
    setSelectedOption(value)
    
    // Animate selection before moving forward
    setTimeout(() => {
      const newAnswers = {
        ...answers,
        [currentQuestion.id]: value,
      }
      setAnswers(newAnswers)

      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep(currentStep + 1)
        setSelectedOption(null)
      } else {
        setShowResults(true)
      }
    }, 300)
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setSelectedOption(null)
    }
  }

  const getRecommendation = () => {
    const key = `${answers.goal}-${answers.experience}-${answers.lifestyle}-${answers.budget}`
    return productRecommendations[key] || productRecommendations.default
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
    setSelectedOption(null)
  }

  const calculateTotalPrice = (products: any[]) => {
    return products.reduce((sum, product) => {
      const price = parseInt(product.price.replace('$', ''))
      return sum + price
    }, 0)
  }

  if (showResults) {
    const recommendation = getRecommendation()
    const totalPrice = calculateTotalPrice(recommendation.products)
    
    return (
      <div className="mx-auto max-w-4xl">
        {/* Success Animation Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30 mb-6 animate-scale-in">
            <CheckCircle className="h-12 w-12 text-accent stroke-[2]" />
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping"></div>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-50 mb-4 tracking-tight">
            Your Perfect Stack
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Based on your answers, we've curated the optimal system for{' '}
            <span className="text-accent font-semibold">{recommendation.title.toLowerCase()}</span>
          </p>
        </div>

        {/* Recommendation Card */}
        <div className="relative rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-brand-jet-graphite to-black p-8 lg:p-10 mb-8 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Badge */}
            <Badge className="bg-accent/10 text-accent border-accent/30 mb-6 text-sm px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 inline" />
              Personalized for You
            </Badge>

            {/* Title & Description */}
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-neutral-50 mb-4">
              {recommendation.title}
            </h3>
            <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
              {recommendation.description}
            </p>

            {/* Product Grid */}
            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              {recommendation.products.map((product: any, index: number) => (
                <div
                  key={index}
                  className="group relative p-5 rounded-2xl bg-black/60 backdrop-blur-sm border border-neutral-800 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-900">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                        sizes="64px"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-neutral-50 group-hover:text-accent transition-colors leading-tight">
                          {product.name}
                        </h4>
                        <CheckCircle className="h-5 w-5 text-accent stroke-[2] flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="text-sm text-neutral-400 mt-1">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Summary */}
            <div className="rounded-2xl bg-accent/5 border border-accent/20 p-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-neutral-400">Bundle Total:</span>
                <span className="font-display text-2xl font-bold text-neutral-50">${totalPrice}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-accent/20">
                <span className="text-accent font-bold flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  {recommendation.savings}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="xl" 
                className="flex-1 group shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all"
              >
                <Link href="/products">
                  <span className="relative z-10">Add to Cart</span>
                  <ArrowRight className="ml-2 h-5 w-5 stroke-[2] group-hover:translate-x-1 transition-transform relative z-10" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={resetQuiz}
                className="border-neutral-700 hover:border-accent hover:bg-neutral-50/5"
              >
                <ArrowLeft className="mr-2 h-5 w-5 stroke-[2]" />
                Retake Quiz
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center">
            <Users className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-sm text-neutral-400">Trusted by 10K+</p>
          </div>
          <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center">
            <Award className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-sm text-neutral-400">Science-Backed</p>
          </div>
          <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center">
            <CheckCircle className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-sm text-neutral-400">60-Day Guarantee</p>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-500">
          Questions about your stack?{' '}
          <Link href="#" className="text-accent hover:underline font-semibold">
            Chat with our experts
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-wide">
              Step {currentStep + 1} of {quizQuestions.length}
            </span>
            {currentStep > 0 && (
              <button
                onClick={goBack}
                className="text-sm text-neutral-500 hover:text-accent transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            )}
          </div>
          <span className="text-sm font-bold text-accent tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
        
        {/* Progress Bar with Steps */}
        <div className="relative">
          <div className="h-2 bg-neutral-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-dark via-accent to-accent-light transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-accent border-accent scale-110'
                    : index === currentStep
                    ? 'bg-accent border-accent scale-125 shadow-lg shadow-accent/50'
                    : 'bg-neutral-900 border-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question Header */}
      <div className="text-center mb-10">
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50/5 backdrop-blur-sm border border-neutral-50/10">
          <Target className="h-3.5 w-3.5 text-accent stroke-[2.5]" />
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-300">
            Question {currentStep + 1}
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-50 mb-3 tracking-tight leading-tight">
          {currentQuestion.question}
        </h2>
        <p className="text-lg text-neutral-400">{currentQuestion.subtitle}</p>
      </div>

      {/* Options Grid */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {currentQuestion.options.map((option) => {
          const Icon = option.icon
          const isSelected = selectedOption === option.value
          
          return (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.value)}
              disabled={selectedOption !== null}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
                isSelected
                  ? 'border-accent bg-accent/10 scale-[0.98]'
                  : 'border-neutral-800 bg-brand-jet-graphite hover:border-accent/50 hover:bg-accent/5 hover:scale-[1.02]'
              }`}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-accent/10 rounded-2xl"></div>
              
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-accent shadow-lg shadow-accent/30'
                    : 'bg-black border border-neutral-700 group-hover:border-accent group-hover:bg-accent/10'
                }`}>
                  <Icon className={`h-7 w-7 stroke-[2] transition-colors ${
                    isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-accent'
                  }`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-lg mb-1.5 transition-colors ${
                    isSelected ? 'text-accent' : 'text-neutral-50 group-hover:text-accent'
                  }`}>
                    {option.label}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* Checkmark for selected */}
                {isSelected && (
                  <CheckCircle className="absolute top-4 right-4 h-6 w-6 text-accent stroke-[2.5] animate-scale-in" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Help Text */}
      <p className="text-center text-sm text-neutral-500">
        Your data is private and never shared. Learn more about our{' '}
        <Link href="#" className="text-accent hover:underline">
          privacy policy
        </Link>
      </p>
    </div>
  )
}

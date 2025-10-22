'use client'

import { useState, useMemo } from 'react'
import { Calculator, Target, Activity, User, Calendar, TrendingUp, CheckCircle, AlertCircle, Zap, Clock, Package } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

interface DosageGuideProps {
  productName: string
  servingsPerContainer: number
  pricePerContainer: number
  servingSize: string
}

type Goal = 'general-health' | 'athletic-performance' | 'recovery' | 'hormone-optimization'
type ActivityLevel = 'sedentary' | 'moderate' | 'active' | 'very-active'
type WeightRange = 'under-150' | '150-180' | '180-210' | 'over-210'

interface QuizAnswers {
  goal?: Goal
  activityLevel?: ActivityLevel
  weight?: WeightRange
  currentlyTaking?: boolean
}

interface DosageRecommendation {
  servingsPerDay: number
  timingRecommendation: string[]
  daysSupply: number
  monthlyContainers: number
  monthlyInvestment: number
  reorderDay: number
  additionalTips: string[]
  stackSuggestions?: string[]
}

export default function InteractiveDosageGuide({
  productName,
  servingsPerContainer,
  pricePerContainer,
  servingSize
}: DosageGuideProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: 'goal',
      question: 'What&apos;s your primary health goal?',
      icon: Target,
      options: [
        { value: 'general-health', label: 'General Health & Wellness', description: 'Maintain optimal baseline health' },
        { value: 'athletic-performance', label: 'Athletic Performance', description: 'Maximize strength and endurance' },
        { value: 'recovery', label: 'Recovery & Sleep', description: 'Improve recovery and sleep quality' },
        { value: 'hormone-optimization', label: 'Hormone Optimization', description: 'Optimize testosterone and hormones' }
      ]
    },
    {
      id: 'activityLevel',
      question: 'How active are you?',
      icon: Activity,
      options: [
        { value: 'sedentary', label: 'Sedentary', description: 'Desk job, minimal exercise' },
        { value: 'moderate', label: 'Moderately Active', description: 'Exercise 2-3 times per week' },
        { value: 'active', label: 'Active', description: 'Exercise 4-5 times per week' },
        { value: 'very-active', label: 'Very Active', description: 'Daily training or physical job' }
      ]
    },
    {
      id: 'weight',
      question: 'What&apos;s your weight range?',
      icon: User,
      options: [
        { value: 'under-150', label: 'Under 150 lbs', description: 'Lower body mass' },
        { value: '150-180', label: '150-180 lbs', description: 'Average body mass' },
        { value: '180-210', label: '180-210 lbs', description: 'Above average body mass' },
        { value: 'over-210', label: 'Over 210 lbs', description: 'Higher body mass' }
      ]
    },
    {
      id: 'currentlyTaking',
      question: 'Are you currently taking similar supplements?',
      icon: Package,
      options: [
        { value: true, label: 'Yes', description: 'Already using similar products' },
        { value: false, label: 'No', description: 'New to supplementation' }
      ]
    }
  ]

  const calculateDosage = useMemo((): DosageRecommendation => {
    let servingsPerDay = 1 // Default baseline

    // Adjust based on goal
    if (answers.goal === 'athletic-performance' || answers.goal === 'hormone-optimization') {
      servingsPerDay = 1.5
    }

    // Adjust based on activity level
    if (answers.activityLevel === 'very-active') {
      servingsPerDay += 0.5
    } else if (answers.activityLevel === 'active') {
      servingsPerDay += 0.25
    }

    // Adjust based on weight
    if (answers.weight === 'over-210') {
      servingsPerDay += 0.5
    } else if (answers.weight === '180-210') {
      servingsPerDay += 0.25
    }

    // Round to nearest 0.5
    servingsPerDay = Math.round(servingsPerDay * 2) / 2
    
    // Cap at 2 servings per day
    servingsPerDay = Math.min(servingsPerDay, 2)

    const daysSupply = Math.floor(servingsPerContainer / servingsPerDay)
    const monthlyContainers = Math.ceil(30 / daysSupply)
    const monthlyInvestment = monthlyContainers * pricePerContainer
    const reorderDay = daysSupply - 3 // Reorder 3 days before running out

    // Timing recommendations
    let timingRecommendation: string[] = []
    if (servingsPerDay === 1) {
      timingRecommendation = ['Take 1 serving with breakfast']
    } else if (servingsPerDay === 1.5) {
      timingRecommendation = ['Take 1 serving with breakfast', 'Take 1/2 serving pre-workout or with lunch']
    } else {
      timingRecommendation = ['Take 1 serving with breakfast', 'Take 1 serving with dinner or pre-workout']
    }

    // Additional tips based on profile
    const additionalTips: string[] = []
    
    if (answers.goal === 'athletic-performance') {
      additionalTips.push('Consider taking 30-60 minutes before training for optimal absorption')
      additionalTips.push('Pair with a complete protein source for enhanced results')
    }

    if (answers.goal === 'recovery') {
      additionalTips.push('Take your evening dose 2-3 hours before bed for better sleep support')
      additionalTips.push('Magnesium glycinate is best absorbed away from caffeine')
    }

    if (answers.activityLevel === 'very-active' || answers.activityLevel === 'active') {
      additionalTips.push('On training days, time your dose around your workout window')
      additionalTips.push('Stay hydrated - aim for 0.5-1 oz per lb of body weight daily')
    }

    if (answers.weight === 'over-210' || answers.weight === '180-210') {
      additionalTips.push('Higher body mass may benefit from split dosing throughout the day')
      additionalTips.push('Consider getting blood work after 90 days to optimize dosage')
    }

    if (!answers.currentlyTaking) {
      additionalTips.push('Start with the recommended dose and assess tolerance for 2 weeks')
      additionalTips.push('Take with food to minimize any potential digestive discomfort')
    }

    // Stack suggestions
    const stackSuggestions: string[] = []
    if (answers.goal === 'hormone-optimization') {
      stackSuggestions.push('DFRNT Androgen for comprehensive hormone support')
    }
    if (answers.goal === 'athletic-performance') {
      stackSuggestions.push('DFRNT Androgen for strength and performance gains')
    }
    if (answers.goal === 'recovery') {
      stackSuggestions.push('DFRNT Focus for stress management and mental clarity')
    }

    return {
      servingsPerDay,
      timingRecommendation,
      daysSupply,
      monthlyContainers,
      monthlyInvestment,
      reorderDay,
      additionalTips,
      stackSuggestions
    }
  }, [answers, servingsPerContainer, pricePerContainer])

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const resetQuiz = () => {
    setStep(0)
    setAnswers({})
    setShowResults(false)
  }

  const currentQuestion = questions[step]
  const progress = ((step + 1) / questions.length) * 100

  if (showResults) {
    const dosage = calculateDosage

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 mb-4">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Your Personalized Plan</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Customized Dosage Recommendation</h2>
          <p className="text-gray-600">Based on your profile and health goals</p>
        </div>

        {/* Main Recommendation Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Daily Dosage */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-blue-600 mb-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">Recommended Dosage</span>
              </div>
              <div className="text-6xl font-bold text-gray-900 mb-2">
                {dosage.servingsPerDay}
                <span className="text-2xl text-gray-600 ml-2">serving{dosage.servingsPerDay > 1 ? 's' : ''}</span>
              </div>
              <p className="text-gray-600">per day ({servingSize} each)</p>
            </div>

            {/* Supply Duration */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-purple-600 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">Supply Duration</span>
              </div>
              <div className="text-6xl font-bold text-gray-900 mb-2">
                {dosage.daysSupply}
                <span className="text-2xl text-gray-600 ml-2">days</span>
              </div>
              <p className="text-gray-600">from 1 container ({servingsPerContainer} servings)</p>
            </div>
          </div>
        </Card>

        {/* Timing Recommendations */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold">When to Take</h3>
          </div>
          <div className="space-y-3">
            {dosage.timingRecommendation.map((timing, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{timing}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Investment */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 bg-white border">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Package className="w-5 h-5" />
              <span className="text-sm font-semibold">Monthly Need</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {dosage.monthlyContainers}
              <span className="text-lg text-gray-600 ml-2">container{dosage.monthlyContainers > 1 ? 's' : ''}</span>
            </div>
          </Card>

          <Card className="p-6 bg-white border">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold">Monthly Investment</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${dosage.monthlyInvestment.toFixed(2)}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              ${(dosage.monthlyInvestment / 30).toFixed(2)}/day
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-semibold">Reorder Alert</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              Day {dosage.reorderDay}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              We&apos;ll remind you 3 days early
            </p>
          </Card>
        </div>

        {/* Additional Tips */}
        {dosage.additionalTips.length > 0 && (
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold">Pro Tips for Best Results</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {dosage.additionalTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stack Suggestions */}
        {dosage.stackSuggestions && dosage.stackSuggestions.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-xl font-bold">Maximize Your Results</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Based on your goals, consider stacking {productName} with:
            </p>
            <div className="space-y-2">
              {dosage.stackSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Package className="w-5 h-5 mr-2" />
            Order {dosage.monthlyContainers} Container{dosage.monthlyContainers > 1 ? 's' : ''} Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={resetQuiz}
          >
            Retake Quiz
          </Button>
        </div>

        {/* Subscription Savings Callout */}
        <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
          <p className="text-gray-700 mb-2">
            💡 <strong>Save {dosage.monthlyContainers > 1 ? '20%' : '15%'}</strong> by subscribing and never run out
          </p>
          <p className="text-sm text-gray-600">
            Free shipping • Skip or cancel anytime • Adjust frequency as needed
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 mb-4">
          <Calculator className="w-5 h-5" />
          <span className="font-semibold">Personalized Dosage Quiz</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Find Your Perfect Dosage</h2>
        <p className="text-gray-600">
          Answer 4 quick questions to get a personalized recommendation
        </p>
      </div>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="max-w-3xl mx-auto p-8 border-2 border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-blue-100">
            <currentQuestion.icon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold">{currentQuestion.question}</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value.toString()}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className="text-left p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600">
                {option.label}
              </div>
              <p className="text-sm text-gray-600">{option.description}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      {step > 0 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
          >
            ← Previous Question
          </Button>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, TrendingUp, Eye, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

interface Activity {
  id: string
  type: 'purchase' | 'viewing' | 'trending'
  message: string
  timestamp: number
  location?: string
  product?: string
}

export function ActivityNotifications() {
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Mock activities - in production, this would come from a real-time API/WebSocket
  const activities: Activity[] = [
    {
      id: '1',
      type: 'purchase',
      message: 'just purchased',
      timestamp: Date.now(),
      location: 'New York, NY',
      product: 'Cognitive Stack',
    },
    {
      id: '2',
      type: 'viewing',
      message: 'people are viewing this right now',
      timestamp: Date.now(),
    },
    {
      id: '3',
      type: 'purchase',
      message: 'just purchased',
      timestamp: Date.now(),
      location: 'Los Angeles, CA',
      product: 'Blue-Light Glasses',
    },
    {
      id: '4',
      type: 'trending',
      message: 'trending in your area',
      timestamp: Date.now(),
      product: 'Recovery Stack',
    },
    {
      id: '5',
      type: 'purchase',
      message: 'just purchased',
      timestamp: Date.now(),
      location: 'Austin, TX',
      product: 'Energy Stack',
    },
  ]

  useEffect(() => {
    let activityIndex = 0
    
    const showNextActivity = () => {
      const activity = activities[activityIndex]
      setCurrentActivity(activity)
      setIsVisible(true)

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 5000)

      // Move to next activity
      activityIndex = (activityIndex + 1) % activities.length
    }

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNextActivity, 3000)

    // Show new notification every 15 seconds
    const interval = setInterval(showNextActivity, 15000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'purchase':
        return <ShoppingBag className="h-4 w-4 text-accent stroke-[2]" />
      case 'viewing':
        return <Eye className="h-4 w-4 text-accent stroke-[2]" />
      case 'trending':
        return <TrendingUp className="h-4 w-4 text-accent stroke-[2]" />
    }
  }

  const getRandomName = () => {
    const names = ['Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Casey', 'Riley']
    return names[Math.floor(Math.random() * names.length)]
  }

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 8) + 3 // 3-10
  }

  if (!currentActivity || !isVisible) return null

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 max-w-sm transform transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="rounded-lg border border-neutral-800 bg-brand-jet-graphite/95 backdrop-blur-lg shadow-lg shadow-black/50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon(currentActivity.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            {currentActivity.type === 'purchase' && (
              <p className="text-sm text-neutral-50">
                <span className="font-bold text-accent">{getRandomName()}</span>
                {currentActivity.location && (
                  <span className="text-neutral-400"> from {currentActivity.location}</span>
                )}
                <br />
                {currentActivity.message}{' '}
                <span className="font-semibold text-neutral-50">{currentActivity.product}</span>
              </p>
            )}
            
            {currentActivity.type === 'viewing' && (
              <p className="text-sm text-neutral-50">
                <span className="font-bold text-accent">{getRandomNumber()}</span>{' '}
                {currentActivity.message}
              </p>
            )}
            
            {currentActivity.type === 'trending' && (
              <p className="text-sm text-neutral-50">
                <span className="font-semibold text-neutral-50">{currentActivity.product}</span>
                <br />
                <span className="text-accent font-bold">is {currentActivity.message}</span>
              </p>
            )}
            
            <p className="mt-1 text-xs text-neutral-500">
              {new Date(currentActivity.timestamp).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </p>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-neutral-500 hover:text-neutral-300 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4 stroke-[2]" />
          </button>
        </div>

        {/* Subtle progress bar */}
        <div className="mt-3 h-0.5 w-full bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent animate-shrink-width"
            style={{ 
              animation: 'shrink-width 5s linear',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink-width {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}

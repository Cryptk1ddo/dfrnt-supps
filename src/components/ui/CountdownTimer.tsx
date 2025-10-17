'use client'

import { useState, useEffect } from 'react'
import { Clock, Zap } from 'lucide-react'

interface CountdownTimerProps {
  endDate: Date
  title?: string
  className?: string
}

export function CountdownTimer({ 
  endDate, 
  title = "Limited Time Offer",
  className = "" 
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsExpired(true)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  if (isExpired) return null

  return (
    <div className={`rounded-lg border border-accent/30 bg-accent/5 p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-accent stroke-[2] animate-pulse" />
        <h3 className="font-bold text-neutral-50 uppercase tracking-wide text-sm">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {/* Days */}
        <div className="text-center">
          <div className="rounded-lg bg-brand-jet-graphite border border-neutral-800 p-3 mb-2">
            <div className="font-display text-2xl sm:text-3xl font-bold text-accent tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">
            Days
          </div>
        </div>

        {/* Hours */}
        <div className="text-center">
          <div className="rounded-lg bg-brand-jet-graphite border border-neutral-800 p-3 mb-2">
            <div className="font-display text-2xl sm:text-3xl font-bold text-accent tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">
            Hours
          </div>
        </div>

        {/* Minutes */}
        <div className="text-center">
          <div className="rounded-lg bg-brand-jet-graphite border border-neutral-800 p-3 mb-2">
            <div className="font-display text-2xl sm:text-3xl font-bold text-accent tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">
            Mins
          </div>
        </div>

        {/* Seconds */}
        <div className="text-center">
          <div className="rounded-lg bg-brand-jet-graphite border border-neutral-800 p-3 mb-2">
            <div className="font-display text-2xl sm:text-3xl font-bold text-accent tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">
            Secs
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-center text-neutral-400">
        <Clock className="inline h-3 w-3 mr-1 stroke-[2]" />
        Offer ends {endDate.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        })}
      </p>
    </div>
  )
}

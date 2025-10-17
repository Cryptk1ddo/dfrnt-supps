'use client'

import { useState, useEffect } from 'react'
import { Clock, Zap } from 'lucide-react'

interface LimitedOfferTimerProps {
  endTime: Date
  offerText?: string
  urgencyThresholdMinutes?: number
  className?: string
  onExpire?: () => void
}

export function LimitedOfferTimer({
  endTime,
  offerText = '25% OFF - Limited Time Only',
  urgencyThresholdMinutes = 10,
  className = '',
  onExpire,
}: LimitedOfferTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = endTime.getTime()
      const difference = end - now

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, total: 0 })
        if (onExpire) onExpire()
        return
      }

      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds, total: difference })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endTime, onExpire])

  const totalMinutes = Math.floor(timeLeft.total / (1000 * 60))
  const isUrgent = totalMinutes <= urgencyThresholdMinutes && totalMinutes > 0
  const hasExpired = timeLeft.total <= 0

  if (hasExpired) return null

  const formatNumber = (num: number) => String(num).padStart(2, '0')

  return (
    <div className={`${className}`}>
      <div className={`relative overflow-hidden rounded-xl border-2 p-4 transition-all ${
        isUrgent 
          ? 'border-red-500/50 bg-gradient-to-br from-red-500/10 to-red-900/10 animate-pulse-slow'
          : 'border-accent/50 bg-gradient-to-br from-accent/10 to-accent-dark/10'
      }`}>
        {/* Glow Effect */}
        <div className={`absolute -inset-1 blur-xl opacity-30 -z-10 ${
          isUrgent ? 'bg-red-500' : 'bg-accent'
        }`}></div>

        {/* Icon & Offer Text */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {isUrgent ? (
            <Zap className="h-5 w-5 text-red-500 fill-red-500 animate-pulse" />
          ) : (
            <Clock className="h-5 w-5 text-accent" />
          )}
          <p className={`font-bold text-sm uppercase tracking-wider ${
            isUrgent ? 'text-red-400' : 'text-accent'
          }`}>
            {offerText}
          </p>
        </div>

        {/* Countdown Display */}
        <div className="flex items-center justify-center gap-2">
          {/* Hours */}
          {timeLeft.hours > 0 && (
            <>
              <div className="flex flex-col items-center">
                <div className={`min-w-[48px] h-14 flex items-center justify-center rounded-lg font-display text-2xl font-bold ${
                  isUrgent 
                    ? 'bg-red-900/40 text-red-400 border border-red-500/30'
                    : 'bg-black/60 text-neutral-50 border border-accent/30'
                }`}>
                  {formatNumber(timeLeft.hours)}
                </div>
                <span className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Hours</span>
              </div>
              <span className={`font-display text-2xl font-bold ${
                isUrgent ? 'text-red-400' : 'text-accent'
              }`}>:</span>
            </>
          )}

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className={`min-w-[48px] h-14 flex items-center justify-center rounded-lg font-display text-2xl font-bold transition-all ${
              isUrgent 
                ? 'bg-red-900/40 text-red-400 border border-red-500/30 animate-pulse'
                : 'bg-black/60 text-neutral-50 border border-accent/30'
            }`}>
              {formatNumber(timeLeft.minutes)}
            </div>
            <span className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Min</span>
          </div>

          <span className={`font-display text-2xl font-bold ${
            isUrgent ? 'text-red-400 animate-pulse' : 'text-accent'
          }`}>:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className={`min-w-[48px] h-14 flex items-center justify-center rounded-lg font-display text-2xl font-bold ${
              isUrgent 
                ? 'bg-red-900/40 text-red-400 border border-red-500/30'
                : 'bg-black/60 text-neutral-50 border border-accent/30'
            }`}>
              {formatNumber(timeLeft.seconds)}
            </div>
            <span className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Sec</span>
          </div>
        </div>

        {/* Urgency Message */}
        {isUrgent && (
          <div className="mt-3 text-center animate-scale-in">
            <p className="text-xs font-bold text-red-400 uppercase tracking-wider animate-pulse">
              ⚡ Hurry! Offer ending soon ⚡
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  separator?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  separator = ',',
  decimals = 0,
  className = '',
}: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOut * end)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, end, duration])

  const formatNumber = (num: number) => {
    const fixed = decimals > 0 ? num.toFixed(decimals) : num.toString()
    const parts = fixed.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return parts.join('.')
  }

  return (
    <span ref={counterRef} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  )
}

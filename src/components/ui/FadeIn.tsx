'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  threshold?: number
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.2,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(30px)'
      case 'down':
        return 'translateY(-30px)'
      case 'left':
        return 'translateX(30px)'
      case 'right':
        return 'translateX(-30px)'
      default:
        return 'translateY(30px)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getTransform(),
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface StaggeredListProps {
  children: React.ReactNode[]
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function StaggeredList({
  children,
  staggerDelay = 100,
  direction = 'up',
  className = '',
}: StaggeredListProps) {
  return (
    <>
      {children.map((child, index) => (
        <FadeIn
          key={index}
          delay={index * staggerDelay}
          direction={direction}
          className={className}
        >
          {child}
        </FadeIn>
      ))}
    </>
  )
}

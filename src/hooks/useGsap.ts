'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface UseGsapFadeInOptions {
  duration?: number
  delay?: number
  y?: number
  stagger?: number
}

/**
 * GSAP hook for fade-in animations
 * Animates elements on mount with fade and slide up
 */
export function useGsapFadeIn(options: UseGsapFadeInOptions = {}) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const { duration = 0.6, delay = 0, y = 20, stagger = 0 } = options

    const ctx = gsap.context(() => {
      const children = elementRef.current?.children

      if (children && children.length > 0) {
        gsap.fromTo(
          children,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease: 'power2.out',
          }
        )
      } else {
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power2.out',
          }
        )
      }
    }, elementRef)

    return () => ctx.revert()
  }, [options.duration, options.delay, options.y, options.stagger])

  return elementRef
}

/**
 * GSAP hook for scale animations
 * Animates elements with scale effect
 */
export function useGsapScale() {
  const elementRef = useRef<HTMLElement>(null)

  const scaleIn = () => {
    if (!elementRef.current) return
    gsap.to(elementRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const scaleOut = () => {
    if (!elementRef.current) return
    gsap.to(elementRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return { elementRef, scaleIn, scaleOut }
}

/**
 * GSAP hook for slide animations
 * Animates elements sliding from direction
 */
export function useGsapSlide(direction: 'left' | 'right' | 'up' | 'down' = 'left') {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const directionMap = {
      left: { x: -100, y: 0 },
      right: { x: 100, y: 0 },
      up: { x: 0, y: -100 },
      down: { x: 0, y: 100 },
    }

    const { x, y } = directionMap[direction]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        }
      )
    }, elementRef)

    return () => ctx.revert()
  }, [direction])

  return elementRef
}

/**
 * GSAP hook for rotation animations
 */
export function useGsapRotate() {
  const elementRef = useRef<HTMLElement>(null)

  const rotate = (degrees: number = 360, duration: number = 0.6) => {
    if (!elementRef.current) return
    gsap.to(elementRef.current, {
      rotation: degrees,
      duration,
      ease: 'power2.inOut',
    })
  }

  return { elementRef, rotate }
}

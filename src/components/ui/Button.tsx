'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-white hover:bg-accent-hover shadow-accent-sm hover:shadow-accent focus-visible:ring-accent',
        secondary:
          'bg-brand-jet-graphite text-neutral-50 hover:bg-neutral-800 border border-neutral-700 hover:border-accent focus-visible:ring-neutral-700',
        accent:
          'bg-gradient-to-r from-accent to-accent-light text-white hover:shadow-accent-glow focus-visible:ring-accent',
        outline:
          'border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white focus-visible:ring-accent',
        ghost: 'text-neutral-300 hover:bg-brand-jet-graphite hover:text-accent focus-visible:ring-neutral-700',
        link: 'text-accent underline-offset-4 hover:underline hover:text-accent-hover',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 py-2',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, isLoading, asChild, children, disabled, ...props }, ref) => {
    // If asChild is true, clone the child element and pass props
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(buttonVariants({ variant, size, fullWidth, className })),
        ...props,
      } as React.HTMLAttributes<HTMLElement>)
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }

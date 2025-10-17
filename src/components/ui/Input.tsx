'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full rounded-lg border bg-black px-4 py-3 text-sm text-neutral-50 transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-jet-graphite disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-neutral-700 focus-visible:ring-accent focus-visible:border-accent',
        error: 'border-red-500 focus-visible:ring-red-500',
        success: 'border-accent focus-visible:ring-accent',
      },
      inputSize: {
        sm: 'h-9 text-xs px-3 py-2',
        md: 'h-12',
        lg: 'h-14 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, label, error, helperText, type, ...props }, ref) => {
    const inputVariant = error ? 'error' : variant

    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-neutral-50">
            {label}
            {props.required && <span className="ml-1 text-accent">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(inputVariants({ variant: inputVariant, inputSize, className }))}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }

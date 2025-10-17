'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan',
        secondary: 'border-dark-700 bg-dark-800 text-gray-300',
        success: 'border-green-500/30 bg-green-500/10 text-green-400',
        warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
        danger: 'border-red-500/30 bg-red-500/10 text-red-400',
        outline: 'border-dark-700 text-gray-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

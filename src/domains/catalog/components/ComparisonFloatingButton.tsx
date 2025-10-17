'use client'

import { GitCompare, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useComparisonStore } from '@/domains/catalog/stores/useComparisonStore'

export function ComparisonFloatingButton() {
  const { items, openComparison, removeItem } = useComparisonStore()

  if (items.length === 0) return null

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <div className="rounded-lg border border-accent/30 bg-brand-jet-graphite/95 backdrop-blur-lg shadow-lg shadow-black/50 p-4">
        <div className="flex items-center gap-3 mb-3">
          <GitCompare className="h-5 w-5 text-accent stroke-[2]" />
          <div>
            <h3 className="font-bold text-neutral-50 text-sm">
              Compare Products
            </h3>
            <p className="text-xs text-neutral-400">
              {items.length} of 3 selected
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2 p-2 rounded bg-black border border-neutral-800"
            >
              <span className="text-xs text-neutral-300 truncate max-w-[140px]">
                {item.name}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-neutral-500 hover:text-accent transition-colors"
                aria-label="Remove from comparison"
              >
                <X className="h-3 w-3 stroke-[2]" />
              </button>
            </div>
          ))}
        </div>

        <Button
          onClick={openComparison}
          size="sm"
          fullWidth
          className="h-9"
        >
          Compare Now
        </Button>
      </div>
    </div>
  )
}

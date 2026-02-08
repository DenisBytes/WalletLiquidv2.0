'use client'

import { cn } from '@/lib/utils/cn'

export type TypeFilter = 'ALL' | 'FUTURES' | 'OPTIONS'
export type ActionFilter = 'ALL' | 'OPEN' | 'CLOSE' | 'LIQUIDATION' | 'EXERCISE'

interface HistoryFiltersProps {
  typeFilter: TypeFilter
  actionFilter: ActionFilter
  dateFrom: string
  dateTo: string
  onTypeChange: (type: TypeFilter) => void
  onActionChange: (action: ActionFilter) => void
  onDateFromChange: (date: string) => void
  onDateToChange: (date: string) => void
}

const typeOptions: { value: TypeFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'FUTURES', label: 'Futures' },
  { value: 'OPTIONS', label: 'Options' },
]

const actionOptions: { value: ActionFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'OPEN', label: 'Open' },
  { value: 'CLOSE', label: 'Close' },
  { value: 'LIQUIDATION', label: 'Liquidation' },
  { value: 'EXERCISE', label: 'Exercise' },
]

export function HistoryFilters({
  typeFilter,
  actionFilter,
  dateFrom,
  dateTo,
  onTypeChange,
  onActionChange,
  onDateFromChange,
  onDateToChange,
}: HistoryFiltersProps) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex flex-wrap items-end gap-6">
        <div>
          <label className="text-xs text-text-muted font-medium mb-2 block">Type</label>
          <div className="flex gap-1">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onTypeChange(opt.value)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                  typeFilter === opt.value
                    ? 'gradient-accent text-white'
                    : 'bg-surface-overlay text-text-secondary hover:text-text-primary hover:bg-surface-overlay/80'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-text-muted font-medium mb-2 block">Action</label>
          <div className="flex gap-1">
            {actionOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onActionChange(opt.value)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                  actionFilter === opt.value
                    ? 'gradient-accent text-white'
                    : 'bg-surface-overlay text-text-secondary hover:text-text-primary hover:bg-surface-overlay/80'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <div>
            <label className="text-xs text-text-muted font-medium mb-2 block">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
              className="bg-surface-overlay border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary
                focus:outline-none focus:border-accent/50 transition-colors
                [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="text-xs text-text-muted font-medium mb-2 block">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
              className="bg-surface-overlay border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary
                focus:outline-none focus:border-accent/50 transition-colors
                [color-scheme:dark]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

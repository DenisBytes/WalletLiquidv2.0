'use client'

import { useMemo, useState } from 'react'
import { HistoryFilters, type TypeFilter, type ActionFilter } from '@/components/trading/history-filters'
import { HistoryTable } from '@/components/trading/history-table'
import type { tradeHistory } from '@/lib/db/schema'

type TradeRow = typeof tradeHistory.$inferSelect

interface HistoryClientProps {
  initialTrades: TradeRow[]
}

export function HistoryClient({ initialTrades }: HistoryClientProps) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL')
  const [actionFilter, setActionFilter] = useState<ActionFilter>('ALL')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = useMemo(() => {
    return initialTrades.filter((trade) => {
      if (typeFilter !== 'ALL' && trade.type !== typeFilter) return false
      if (actionFilter !== 'ALL' && trade.action !== actionFilter) return false

      if (dateFrom) {
        const from = new Date(dateFrom)
        if (new Date(trade.executedAt) < from) return false
      }

      if (dateTo) {
        const to = new Date(dateTo)
        to.setHours(23, 59, 59, 999)
        if (new Date(trade.executedAt) > to) return false
      }

      return true
    })
  }, [initialTrades, typeFilter, actionFilter, dateFrom, dateTo])

  return (
    <>
      <HistoryFilters
        typeFilter={typeFilter}
        actionFilter={actionFilter}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onTypeChange={setTypeFilter}
        onActionChange={setActionFilter}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
      />
      <HistoryTable trades={filtered} />
    </>
  )
}

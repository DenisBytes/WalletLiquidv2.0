import { getTradeHistory } from '@/lib/actions/history'
import { HistoryClient } from './history-client'

export default async function HistoryPage() {
  const trades = await getTradeHistory({ limit: 50 })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Trade History</h1>
      <HistoryClient initialTrades={trades} />
    </div>
  )
}

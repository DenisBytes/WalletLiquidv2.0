import { getBalance } from '@/lib/actions/user'
import { getOpenPositions, getTradeHistory } from '@/lib/actions/history'
import { PortfolioCard } from '@/components/dashboard/portfolio-card'
import { PositionsList } from '@/components/dashboard/positions-list'
import { RecentTrades } from '@/components/dashboard/recent-trades'
import { AllocationChart } from '@/components/dashboard/allocation-chart'

export default async function DashboardPage() {
  const [balance, positions, trades] = await Promise.all([
    getBalance(),
    getOpenPositions(),
    getTradeHistory({ limit: 10 }),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioCard balance={balance} positions={positions} />
        </div>
        <AllocationChart positions={positions} balance={balance} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PositionsList positions={positions} />
        <RecentTrades trades={trades} />
      </div>
    </div>
  )
}

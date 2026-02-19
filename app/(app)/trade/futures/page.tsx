import { getBalance } from '@/lib/actions/user'
import { getOpenPositions } from '@/lib/actions/history'
import { getAllPendingOrders } from '@/lib/actions/orders'
import { FuturesTrading } from '@/components/trading/futures-trading'

export default async function FuturesPage() {
  const [balance, positions, orders] = await Promise.all([
    getBalance(),
    getOpenPositions(),
    getAllPendingOrders(),
  ])

  return (
    <FuturesTrading
      initialBalance={balance}
      initialPositions={positions.futures}
      initialOrders={orders}
    />
  )
}

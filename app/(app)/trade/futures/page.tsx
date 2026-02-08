import { getBalance } from '@/lib/actions/user'
import { getOpenPositions } from '@/lib/actions/history'
import { FuturesTrading } from '@/components/trading/futures-trading'

export default async function FuturesPage() {
  const [balance, positions] = await Promise.all([
    getBalance(),
    getOpenPositions(),
  ])

  return <FuturesTrading initialBalance={balance} initialPositions={positions.futures} />
}

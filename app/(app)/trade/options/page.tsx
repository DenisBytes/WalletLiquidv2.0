import { getBalance } from '@/lib/actions/user'
import { getOpenPositions } from '@/lib/actions/history'
import { OptionsTrading } from '@/components/options/options-trading'

export default async function OptionsPage() {
  const [balance, positions] = await Promise.all([
    getBalance(),
    getOpenPositions(),
  ])

  return <OptionsTrading initialBalance={balance} initialPositions={positions.options} />
}

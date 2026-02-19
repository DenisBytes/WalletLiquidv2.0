import { getBalance } from '@/lib/actions/user'
import { getOpenPositions } from '@/lib/actions/history'
import { getOpenStrategies } from '@/lib/actions/strategies'
import { OptionsTrading } from '@/components/options/options-trading'

export default async function OptionsPage() {
  const [balance, positions, strategies] = await Promise.all([
    getBalance(),
    getOpenPositions(),
    getOpenStrategies(),
  ])

  return (
    <OptionsTrading
      initialBalance={balance}
      initialPositions={positions.options}
      initialStrategies={strategies}
    />
  )
}

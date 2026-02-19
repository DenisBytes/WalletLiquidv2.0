'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { usePriceStore } from '@/lib/stores/price-store'
import { shouldTriggerOrder, updateTrailingStop } from '@/lib/engine/orders'
import { executeOrder } from '@/lib/actions/orders'
import type { PositionSide } from '@/lib/engine/types'

export interface OrderWithPosition {
  order: {
    id: string
    positionId: string
    type: 'STOP_LOSS' | 'TAKE_PROFIT' | 'TRAILING_STOP'
    triggerPrice: string
    trailingDistance: string | null
    status: string
  }
  positionSide: PositionSide
  symbol: string
}

const THROTTLE_MS = 500

export function useOrderMonitor(ordersWithPositions: OrderWithPosition[]): void {
  const router = useRouter()
  const prices = usePriceStore((s) => s.prices)
  const lastCheckRef = useRef(0)
  const executingRef = useRef(new Set<string>())
  // Track locally adjusted trailing stop prices
  const trailingPricesRef = useRef(new Map<string, number>())

  const checkOrders = useCallback(() => {
    const now = Date.now()
    if (now - lastCheckRef.current < THROTTLE_MS) return
    lastCheckRef.current = now

    for (const { order, positionSide, symbol } of ordersWithPositions) {
      if (order.status !== 'PENDING') continue
      if (executingRef.current.has(order.id)) continue

      const currentPrice = prices.get(symbol)
      if (currentPrice == null) continue

      let triggerPrice = trailingPricesRef.current.get(order.id) ?? parseFloat(order.triggerPrice)

      // Update trailing stop trigger price
      if (order.type === 'TRAILING_STOP' && order.trailingDistance) {
        const distance = parseFloat(order.trailingDistance)
        const updated = updateTrailingStop(triggerPrice, distance, currentPrice, positionSide)
        if (updated !== triggerPrice) {
          triggerPrice = updated
          trailingPricesRef.current.set(order.id, updated)
        }
      }

      const triggered = shouldTriggerOrder(order.type, currentPrice, triggerPrice, positionSide)

      if (triggered) {
        executingRef.current.add(order.id)
        executeOrder(order.id, currentPrice)
          .then(() => router.refresh())
          .catch(() => {})
          .finally(() => executingRef.current.delete(order.id))
      }
    }
  }, [ordersWithPositions, prices, router])

  useEffect(() => {
    checkOrders()
  }, [checkOrders])

  // Reset trailing prices when orders change
  useEffect(() => {
    const currentIds = new Set(ordersWithPositions.map((o) => o.order.id))
    for (const id of trailingPricesRef.current.keys()) {
      if (!currentIds.has(id)) {
        trailingPricesRef.current.delete(id)
      }
    }
  }, [ordersWithPositions])
}

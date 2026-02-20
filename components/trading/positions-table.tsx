'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { usePriceStore } from '@/lib/stores/price-store'
import { calculatePnl, calculateRoe } from '@/lib/engine/futures'
import { validateOrderPrice } from '@/lib/engine/orders'
import { closeFuturesPosition } from '@/lib/actions/trade'
import { createOrder, cancelOrder } from '@/lib/actions/orders'
import { cn } from '@/lib/utils/cn'
import type { PositionSide } from '@/lib/engine/types'
import type { futuresPositions, orders } from '@/lib/db/schema'

type FuturesRow = typeof futuresPositions.$inferSelect
type OrderRow = typeof orders.$inferSelect

function formatUsd(value: number): string {
  if (Math.abs(value) >= 1000) {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return value.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

function formatPnl(value: number): string {
  const formatted = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${value >= 0 ? '+' : '-'}$${formatted}`
}

function formatRoe(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

interface PositionsTableProps {
  positions: FuturesRow[]
  orders: OrderRow[]
}

export function PositionsTable({ positions, orders: allOrders }: PositionsTableProps) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Open Positions</h2>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-muted text-accent font-numbers">
          {positions.length}
        </span>
      </div>

      {positions.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-text-muted text-sm">No open positions</p>
          <p className="text-text-muted/60 text-xs mt-1">
            Open a long or short position to get started
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Symbol', 'Side', 'Entry Price', 'Mark Price', 'Size', 'Leverage', 'Liq. Price', 'PnL', 'SL/TP', 'ROE%', ''].map(
                  (header) => (
                    <th
                      key={header || 'action'}
                      className="text-left text-text-muted text-xs font-medium pb-3 pr-4 last:pr-0 last:text-right"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {positions.map((pos) => {
                const positionOrders = allOrders.filter((o) => o.positionId === pos.id)
                return (
                  <PositionRow key={pos.id} position={pos} orders={positionOrders} />
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function PositionRow({ position, orders: positionOrders }: { position: FuturesRow; orders: OrderRow[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const prices = usePriceStore((s) => s.prices)

  const markPrice = prices.get(position.symbol)

  const entryPrice = parseFloat(position.entryPrice)
  const quantity = parseFloat(position.quantity)
  const liqPrice = parseFloat(position.liquidationPrice)
  const margin = parseFloat(position.margin)
  const side = position.side as PositionSide

  const { pnl, roe } = useMemo(() => {
    if (markPrice == null) return { pnl: null, roe: null }

    const pnlVal = calculatePnl(entryPrice, markPrice, quantity, side)
    const roeVal = calculateRoe(pnlVal, margin)
    return { pnl: pnlVal, roe: roeVal }
  }, [markPrice, entryPrice, quantity, side, margin])

  const liqProximity = useMemo(() => {
    if (markPrice == null) return false
    const distance = Math.abs(markPrice - liqPrice) / markPrice
    return distance < 0.05
  }, [markPrice, liqPrice])

  const slOrder = positionOrders.find((o) => o.type === 'STOP_LOSS')
  const tpOrder = positionOrders.find((o) => o.type === 'TAKE_PROFIT')

  function handleClose() {
    if (!markPrice) return

    startTransition(async () => {
      try {
        await closeFuturesPosition(position.id, markPrice)
        router.refresh()
      } catch {
        // silently fail - position might already be closed
      }
    })
  }

  return (
    <tr className="border-b border-border/50 last:border-0 hover:bg-surface-overlay/30 transition-colors">
      <td className="py-3 pr-4">
        <span className="text-text-primary font-medium text-sm">{position.symbol}</span>
      </td>

      <td className="py-3 pr-4">
        <span
          className={cn(
            'text-xs font-semibold px-2.5 py-1 rounded-md',
            side === 'LONG'
              ? 'bg-success-muted text-success'
              : 'bg-danger-muted text-danger'
          )}
        >
          {side}
        </span>
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-text-secondary">
        ${formatUsd(entryPrice)}
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-text-primary">
        {markPrice != null ? `$${formatUsd(markPrice)}` : '--'}
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-text-secondary">
        {quantity.toFixed(6)}
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-accent">
        {position.leverage}x
      </td>

      <td className={cn(
        'py-3 pr-4 font-numbers text-sm',
        liqProximity ? 'text-[#FB923C] font-semibold' : 'text-text-secondary'
      )}>
        ${formatUsd(liqPrice)}
      </td>

      <td className="py-3 pr-4">
        {pnl != null ? (
          <span className={cn('font-numbers text-sm font-medium', pnl >= 0 ? 'pnl-positive' : 'pnl-negative')}>
            {formatPnl(pnl)}
          </span>
        ) : (
          <span className="font-numbers text-sm text-text-muted">--</span>
        )}
      </td>

      <td className="py-3 pr-4">
        <SlTpCell
          positionId={position.id}
          entryPrice={entryPrice}
          side={side}
          slOrder={slOrder}
          tpOrder={tpOrder}
        />
      </td>

      <td className="py-3 pr-4">
        {roe != null ? (
          <span className={cn('font-numbers text-sm font-medium', roe >= 0 ? 'pnl-positive' : 'pnl-negative')}>
            {formatRoe(roe)}
          </span>
        ) : (
          <span className="font-numbers text-sm text-text-muted">--</span>
        )}
      </td>

      <td className="py-3 text-right">
        <button
          onClick={handleClose}
          disabled={isPending || !markPrice}
          className="text-xs font-medium px-3 py-1.5 rounded-lg
            bg-danger-muted text-danger hover:bg-danger/20
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors"
        >
          {isPending ? 'Closing...' : 'Close'}
        </button>
      </td>
    </tr>
  )
}

function SlTpCell({
  positionId,
  entryPrice,
  side,
  slOrder,
  tpOrder,
}: {
  positionId: string
  entryPrice: number
  side: PositionSide
  slOrder?: OrderRow
  tpOrder?: OrderRow
}) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [slPrice, setSlPrice] = useState('')
  const [tpPrice, setTpPrice] = useState('')
  const [error, setError] = useState('')

  const hasSl = !!slOrder
  const hasTp = !!tpOrder

  function handleCancel(orderId: string) {
    startTransition(async () => {
      try {
        await cancelOrder(orderId)
        router.refresh()
      } catch {
        // silently fail
      }
    })
  }

  function handleSubmit() {
    setError('')
    const slVal = slPrice.trim() ? parseFloat(slPrice) : null
    const tpVal = tpPrice.trim() ? parseFloat(tpPrice) : null

    if (slVal == null && tpVal == null) {
      setError('Enter at least one price')
      return
    }

    if (slVal != null && (isNaN(slVal) || slVal <= 0)) {
      setError('Invalid SL price')
      return
    }
    if (tpVal != null && (isNaN(tpVal) || tpVal <= 0)) {
      setError('Invalid TP price')
      return
    }

    if (slVal != null && !validateOrderPrice(slVal, entryPrice, side, 'STOP_LOSS')) {
      setError(side === 'LONG' ? 'SL must be below entry' : 'SL must be above entry')
      return
    }
    if (tpVal != null && !validateOrderPrice(tpVal, entryPrice, side, 'TAKE_PROFIT')) {
      setError(side === 'LONG' ? 'TP must be above entry' : 'TP must be below entry')
      return
    }

    startTransition(async () => {
      try {
        const promises: Promise<unknown>[] = []
        if (slVal != null) {
          promises.push(createOrder({ positionId, type: 'STOP_LOSS', triggerPrice: slVal }))
        }
        if (tpVal != null) {
          promises.push(createOrder({ positionId, type: 'TAKE_PROFIT', triggerPrice: tpVal }))
        }
        await Promise.all(promises)
        setSlPrice('')
        setTpPrice('')
        setIsEditing(false)
        router.refresh()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to create order')
      }
    })
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-1.5 min-w-[160px]">
        {!hasSl && (
          <input
            type="text"
            inputMode="decimal"
            placeholder="Stop Loss"
            value={slPrice}
            onChange={(e) => setSlPrice(e.target.value)}
            className="bg-surface-overlay border border-border rounded-lg px-3 py-1.5 font-numbers text-sm text-text-primary focus:outline-none focus:border-accent/50 w-full"
          />
        )}
        {!hasTp && (
          <input
            type="text"
            inputMode="decimal"
            placeholder="Take Profit"
            value={tpPrice}
            onChange={(e) => setTpPrice(e.target.value)}
            className="bg-surface-overlay border border-border rounded-lg px-3 py-1.5 font-numbers text-sm text-text-primary focus:outline-none focus:border-accent/50 w-full"
          />
        )}
        {error && <span className="text-[10px] text-danger">{error}</span>}
        <div className="flex gap-1">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="text-[10px] font-medium px-2 py-1 rounded bg-accent-muted text-accent hover:bg-accent/30 disabled:opacity-40 transition-colors"
          >
            {isPending ? '...' : 'Set'}
          </button>
          <button
            onClick={() => { setIsEditing(false); setError(''); setSlPrice(''); setTpPrice('') }}
            className="text-[10px] font-medium px-2 py-1 rounded bg-surface-overlay text-text-muted hover:text-text-secondary transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  if (!hasSl && !hasTp) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-1 text-text-muted hover:text-accent transition-colors group"
      >
        <span className="font-numbers text-sm">--</span>
        <svg
          className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-0.5 min-w-[120px]">
      {slOrder && (
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-danger font-medium">SL</span>
          <span className="font-numbers text-xs text-text-secondary">
            ${formatUsd(parseFloat(slOrder.triggerPrice))}
          </span>
          <button
            onClick={() => handleCancel(slOrder.id)}
            disabled={isPending}
            className="ml-auto text-text-muted hover:text-danger transition-colors disabled:opacity-40"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      {tpOrder && (
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-success font-medium">TP</span>
          <span className="font-numbers text-xs text-text-secondary">
            ${formatUsd(parseFloat(tpOrder.triggerPrice))}
          </span>
          <button
            onClick={() => handleCancel(tpOrder.id)}
            disabled={isPending}
            className="ml-auto text-text-muted hover:text-danger transition-colors disabled:opacity-40"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      {(!hasSl || !hasTp) && (
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-0.5 text-text-muted hover:text-accent transition-colors text-[10px] mt-0.5"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add {!hasSl ? 'SL' : 'TP'}
        </button>
      )}
    </div>
  )
}

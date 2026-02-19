'use client'

import { useEffect, useRef, useState } from 'react'
import { createChart, CandlestickSeries, type IChartApi, type ISeriesApi, type CandlestickData, type Time } from 'lightweight-charts'
import { cn } from '@/lib/utils/cn'

interface PriceChartProps {
  symbol: string
}

interface BinanceKline {
  0: number   // open time
  1: string   // open
  2: string   // high
  3: string   // low
  4: string   // close
  5: string   // volume
  6: number   // close time
}

function formatPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (price >= 1) return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  return price.toLocaleString('en-US', { minimumFractionDigits: 6, maximumFractionDigits: 6 })
}

export function PriceChart({ symbol }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [priceChange, setPriceChange] = useState<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      layout: {
        background: { color: '#0A0A0F' },
        textColor: '#9CA3AF',
        fontSize: 12,
      },
      grid: {
        vertLines: { color: '#1A1A25' },
        horzLines: { color: '#1A1A25' },
      },
      crosshair: {
        vertLine: { color: '#7C5CFC', width: 1, style: 2, labelBackgroundColor: '#7C5CFC' },
        horzLine: { color: '#7C5CFC', width: 1, style: 2, labelBackgroundColor: '#7C5CFC' },
      },
      rightPriceScale: {
        borderColor: '#2A2A3A',
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor: '#2A2A3A',
        timeVisible: true,
        secondsVisible: false,
      },
    })

    chartRef.current = chart

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderUpColor: '#22C55E',
      borderDownColor: '#EF4444',
      wickUpColor: '#22C55E',
      wickDownColor: '#EF4444',
    })

    seriesRef.current = series

    // Fetch historical klines
    fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1m&limit=200`)
      .then((res) => res.json())
      .then((data: BinanceKline[]) => {
        const candles: CandlestickData<Time>[] = data.map((k) => ({
          time: (k[0] / 1000) as Time,
          open: parseFloat(k[1]),
          high: parseFloat(k[2]),
          low: parseFloat(k[3]),
          close: parseFloat(k[4]),
        }))

        series.setData(candles)
        chart.timeScale().fitContent()

        if (candles.length > 0) {
          const last = candles[candles.length - 1]
          const prev = candles.length > 1 ? candles[candles.length - 2] : last
          setCurrentPrice(last.close)
          setPriceChange(((last.close - prev.close) / prev.close) * 100)
        }
      })
      .catch(() => {})

    // Connect to kline websocket
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@kline_1m`
    )
    wsRef.current = ws

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        const k = msg.k
        if (!k) return

        const candle: CandlestickData<Time> = {
          time: (k.t / 1000) as Time,
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c),
        }

        series.update(candle)
        setCurrentPrice(candle.close)
      } catch {
        // skip malformed messages
      }
    }

    // Resize handler
    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ws.close()
      wsRef.current = null
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [symbol])

  const positive = priceChange >= 0

  return (
    <div className="glass rounded-2xl h-full relative overflow-hidden">
      {/* Price overlay */}
      <div className="absolute top-4 left-4 z-10">
        <p className="text-text-muted text-xs mb-0.5">{symbol}/USDT</p>
        {currentPrice !== null && (
          <>
            <p className="font-numbers text-2xl font-bold text-text-primary">
              ${formatPrice(currentPrice)}
            </p>
            <p
              className={cn(
                'font-numbers text-xs font-medium',
                positive ? 'pnl-positive' : 'pnl-negative'
              )}
            >
              {positive ? '+' : ''}{priceChange.toFixed(2)}%
            </p>
          </>
        )}
      </div>

      <div ref={containerRef} className="w-full h-full min-h-[480px]" />
    </div>
  )
}
